import type { Metadata } from 'next';

import { ProjectCard } from '@/components/project-card';
import { ProjectFilter } from '@/components/project-filter';
import { SectionLabel } from '@/components/tag';
import { getAllTech, getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Machine learning and AI engineering projects, written up as case studies.',
};

export default function ProjectsPage() {
  const projects = getProjects();
  const techs = getAllTech();

  return (
    <div className="shell py-20 sm:py-24">
      <header className="mb-12 max-w-2xl">
        <SectionLabel>Projects</SectionLabel>
        <h1 className="text-display-sm font-bold text-fg">Case studies</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Every project below has a write-up covering the problem, why it was hard, what I built, and
          — the useful part — what broke along the way.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface/40 px-6 py-10 text-center text-sm text-muted">
          No shipped projects yet. Add an .mdx file to{' '}
          <code className="font-mono text-fg">content/projects/</code>.
        </p>
      ) : (
        <ProjectFilter
          techs={techs}
          items={projects.map((project) => ({
            slug: project.slug,
            tech: project.techStack,
            card: <ProjectCard project={project} headingLevel="h2" />,
          }))}
        />
      )}
    </div>
  );
}
