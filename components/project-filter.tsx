'use client';

import { useMemo, useState, type ReactNode } from 'react';

export type FilterItem = {
  slug: string;
  tech: string[];
  /** A server-rendered <ProjectCard />. Passing the node keeps the card on the server. */
  card: ReactNode;
};

/**
 * The only interactive piece on /projects.
 *
 * Cards arrive already rendered as Server Components, so no project body, no MDX,
 * and no content module ever reaches the client bundle. With JS disabled the initial
 * render still shows every project.
 */
export function ProjectFilter({ items, techs }: { items: FilterItem[]; techs: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(
    () => (active ? items.filter((item) => item.tech.includes(active)) : items),
    [items, active],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-xs uppercase tracking-[0.14em] text-faint">
          Filter
        </span>

        <FilterPill active={active === null} onClick={() => setActive(null)}>
          All
        </FilterPill>

        {techs.map((tech) => (
          <FilterPill key={tech} active={active === tech} onClick={() => setActive(tech)}>
            {tech}
          </FilterPill>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'} shown
        {active ? ` for ${active}` : ''}
      </p>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface/40 px-6 py-10 text-center text-sm text-muted">
          No projects use {active} yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <div key={item.slug}>{item.card}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ${
        active
          ? 'border-accent bg-accent text-accent-ink'
          : 'border-line text-muted hover:border-line-hi hover:text-fg'
      }`}
    >
      {children}
    </button>
  );
}
