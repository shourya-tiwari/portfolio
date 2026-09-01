import Image from 'next/image';
import Link from 'next/link';

import { Tag } from '@/components/tag';
import type { Project } from '@/lib/content';

/**
 * The whole card is one link. Hover is a 2px lift plus a border warming toward the
 * accent — no scale, no shadow bloom, nothing that reflows on hover.
 *
 * `headingLevel` keeps the document outline sequential: the cards sit under an <h2>
 * section header on the homepage, but directly under the <h1> on /projects.
 */
export function ProjectCard({
  project,
  headingLevel = 'h3',
}: {
  project: Project;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;

  return (
    <article className="group relative">
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface/40 transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface focus-visible:-translate-y-0.5 focus-visible:border-accent/40 motion-reduce:hover:translate-y-0"
      >
        {project.cover && (
          <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-bg">
            <Image
              src={project.cover}
              alt={project.coverAlt ?? ''}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-baseline justify-between gap-4">
            <Heading className="text-lg font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-accent">
              {project.title}
            </Heading>
            {project.year && (
              <span className="shrink-0 font-mono text-xs text-faint">{project.year}</span>
            )}
          </div>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
            {project.techStack.length > 4 && (
              <li>
                <span className="inline-flex items-center px-1 py-1 font-mono text-[0.7rem] leading-none text-faint">
                  +{project.techStack.length - 4}
                </span>
              </li>
            )}
          </ul>
        </div>
      </Link>
    </article>
  );
}
