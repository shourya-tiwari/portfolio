import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Tag } from '@/components/tag';
import { getProject, getProjects } from '@/lib/content';
import { renderMdx } from '@/lib/mdx';

type Params = { params: { slug: string } };

/**
 * Only shipped projects are enumerated, so an `in-progress` project is never built
 * and its URL 404s — the status field genuinely gates the build.
 */
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const body = await renderMdx(project.body);

  return (
    <article className="shell py-16 sm:py-20">
      <Link
        href="/projects"
        className="mb-10 inline-block text-sm text-muted transition-colors hover:text-accent"
      >
        &larr; All projects
      </Link>

      <header className="max-w-prose">
        <h1 className="text-display-sm font-bold text-fg">{project.title}</h1>

        <p className="mt-5 text-lg leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          {project.year && <span className="font-mono text-faint">{project.year}</span>}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Live demo
            </a>
          )}
        </div>

        <ul className="mt-7 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      </header>

      {/* Headline numbers — one of the few places the accent appears. */}
      {project.metrics.length > 0 && (
        <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {project.metrics.map((metric) => (
            /* flex-col-reverse so the number reads first while <dt> still precedes <dd> */
            <div key={metric.label} className="flex flex-col-reverse bg-bg px-5 py-6">
              <dt className="mt-1.5 text-sm leading-snug text-muted">{metric.label}</dt>
              <dd className="font-mono text-2xl font-semibold tracking-tight text-accent">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {project.cover && (
        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-lg border border-line">
          <Image
            src={project.cover}
            alt={project.coverAlt ?? ''}
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-14 max-w-prose">{body}</div>
    </article>
  );
}
