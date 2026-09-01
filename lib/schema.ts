import { z } from 'zod';

/**
 * Frontmatter contracts for everything under /content.
 *
 * These are the single source of truth for what an .mdx file may declare. They are
 * parsed at build time, so a typo in a content file fails `next build` with the
 * offending filename rather than rendering a half-broken card.
 */

export const projectStatus = z.enum(['shipped', 'in-progress']);
export type ProjectStatus = z.infer<typeof projectStatus>;

const metric = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const projectFrontmatter = z.object({
  // --- required ---
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be lowercase kebab-case'),
  summary: z.string().min(1),
  techStack: z.array(z.string().min(1)).min(1),
  featured: z.boolean().default(false),
  order: z.number().int().default(999),
  status: projectStatus,

  // --- optional ---
  year: z.number().int().optional(),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  /** Path under /public, rendered through next/image. */
  cover: z.string().startsWith('/').optional(),
  coverAlt: z.string().optional(),
  /** Headline numbers shown in the accent color on the case study page. */
  metrics: z.array(metric).default([]),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatter>;

export const profileFrontmatter = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  /** Short version, used on the homepage teaser. The long bio is the MDX body. */
  bio: z.string().min(1),
  email: z.string().email(),
  /** Path to the PDF under /public. */
  resume: z.string().startsWith('/'),
  location: z.string().optional(),

  /** The two plain-text badge cards under the hero CTAs. */
  badges: z
    .array(
      z.object({
        label: z.string().min(1),
        detail: z.string().min(1),
      }),
    )
    .default([]),

  /* Social profiles. Each is optional — omit a field and its icon disappears from
     the hero row and the footer. `email` above doubles as the mailto target. */
  /**
   * Overrides the email icon's href. Leave unset for `mailto:` (correct for
   * visitors — it opens whatever mail client *they* use). Set it to a webmail
   * compose URL if you'd rather force a specific one.
   */
  emailLink: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  x: z.string().url().optional(),
  medium: z.string().url().optional(),

  education: z
    .array(
      z.object({
        degree: z.string().min(1),
        institution: z.string().min(1),
        period: z.string().min(1),
        detail: z.string().optional(),
        coursework: z.array(z.string().min(1)).default([]),
      }),
    )
    .default([]),

  certifications: z
    .array(
      z.object({
        title: z.string().min(1),
        issuer: z.string().min(1),
      }),
    )
    .default([]),

  skills: z
    .array(
      z.object({
        category: z.string().min(1),
        items: z.array(z.string().min(1)).min(1),
      }),
    )
    .default([]),
  /** Extra links with no dedicated icon (Google Scholar, a blog, a paper). */
  socials: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().min(1),
      }),
    )
    .default([]),
  /** Counted for the "N internships" stat. */
  experience: z
    .array(
      z.object({
        role: z.string().min(1),
        org: z.string().min(1),
        period: z.string().min(1),
        note: z.string().optional(),
      }),
    )
    .default([]),
});

export type ProfileFrontmatter = z.infer<typeof profileFrontmatter>;

export const otherWorkFrontmatter = z.object({
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        link: z.string().min(1),
        oneLiner: z.string().min(1),
      }),
    )
    .default([]),
});

export type OtherWorkFrontmatter = z.infer<typeof otherWorkFrontmatter>;

/** The five social slots, in the order they render. */
export const SOCIAL_KEYS = ['email', 'linkedin', 'github', 'x', 'medium'] as const;
export type SocialKey = (typeof SOCIAL_KEYS)[number];

export type SocialLink = {
  key: SocialKey;
  label: string;
  href: string;
};
