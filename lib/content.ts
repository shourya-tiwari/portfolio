import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import { ZodError, type TypeOf, type ZodTypeAny } from 'zod';

import {
  otherWorkFrontmatter,
  profileFrontmatter,
  projectFrontmatter,
  SOCIAL_KEYS,
  type OtherWorkFrontmatter,
  type ProfileFrontmatter,
  type ProjectFrontmatter,
  type SocialLink,
} from './schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');

export type Project = ProjectFrontmatter & {
  /** Raw MDX body, compiled by lib/mdx.ts at render time. */
  body: string;
};

export type Profile = ProfileFrontmatter & { body: string };
export type OtherWork = OtherWorkFrontmatter & { body: string };

/**
 * Parse with a helpful, filename-tagged error instead of a bare Zod dump.
 *
 * Generic over the schema rather than over its type so `.default()` fields resolve to
 * the *output* type (required) instead of the input type (optional).
 */
function parseOrThrow<S extends ZodTypeAny>(schema: S, data: unknown, file: string): TypeOf<S> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.issues
        .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
        .join('\n');
      throw new Error(`Invalid frontmatter in ${file}:\n${issues}`);
    }
    throw error;
  }
}

function readMdx(absolutePath: string) {
  const raw = fs.readFileSync(absolutePath, 'utf8');
  return matter(raw);
}

/**
 * Every .mdx file under content/projects, regardless of status.
 * This is the only place the filesystem is enumerated — adding or deleting a file
 * is the entire "register a project" workflow.
 */
export const getAllProjects = cache((): Project[] => {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'))
    .map((file) => {
      const relative = `content/projects/${file}`;
      const { data, content } = readMdx(path.join(PROJECTS_DIR, file));
      const frontmatter = parseOrThrow(projectFrontmatter, data, relative);

      const expectedSlug = file.replace(/\.mdx$/, '');
      if (frontmatter.slug !== expectedSlug) {
        throw new Error(
          `Slug mismatch in ${relative}: frontmatter says "${frontmatter.slug}" but the ` +
            `filename implies "${expectedSlug}". They must match so URLs stay stable.`,
        );
      }

      return { ...frontmatter, body: content };
    });
});

/** Shipped projects only, in display order. `in-progress` never reaches the build. */
export const getProjects = cache((): Project[] =>
  getAllProjects()
    .filter((project) => project.status === 'shipped')
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
);

export const getFeaturedProjects = cache((): Project[] =>
  getProjects().filter((project) => project.featured),
);

/** Returns null for unknown or in-progress slugs, so callers can notFound(). */
export const getProject = cache((slug: string): Project | null =>
  getProjects().find((project) => project.slug === slug) ?? null,
);

/** Union of every techStack entry across shipped projects — powers the filter pills. */
export const getAllTech = cache((): string[] =>
  Array.from(new Set(getProjects().flatMap((project) => project.techStack))).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  ),
);

export const getProfile = cache((): Profile => {
  const { data, content } = readMdx(path.join(CONTENT_DIR, 'profile.mdx'));
  return { ...parseOrThrow(profileFrontmatter, data, 'content/profile.mdx'), body: content };
});

export const getOtherWork = cache((): OtherWork => {
  const file = path.join(CONTENT_DIR, 'other-work.mdx');
  if (!fs.existsSync(file)) return { items: [], body: '' };
  const { data, content } = readMdx(file);
  return { ...parseOrThrow(otherWorkFrontmatter, data, 'content/other-work.mdx'), body: content };
});

/**
 * The social links that are actually set in profile.mdx, in a fixed display order.
 *
 * Omitting a field from frontmatter removes its icon from the hero row and the
 * footer — nothing about the icon set is hardcoded in a component.
 */
export const getSocialLinks = cache((): SocialLink[] => {
  const profile = getProfile();

  const hrefs: Record<(typeof SOCIAL_KEYS)[number], string | undefined> = {
    email: profile.emailLink ?? (profile.email ? `mailto:${profile.email}` : undefined),
    linkedin: profile.linkedin,
    github: profile.github,
    x: profile.x,
    medium: profile.medium,
  };

  const labels: Record<(typeof SOCIAL_KEYS)[number], string> = {
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    x: 'X',
    medium: 'Medium',
  };

  return SOCIAL_KEYS.flatMap((key) => {
    const href = hrefs[key];
    return href ? [{ key, label: labels[key], href }] : [];
  });
});
