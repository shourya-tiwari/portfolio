import Link from 'next/link';

import { HeroBackdrop } from '@/components/hero-backdrop';
import { ProfileBadges } from '@/components/profile-badges';
import { ProjectCard } from '@/components/project-card';
import { SocialLinks } from '@/components/social-links';
import { SectionLabel } from '@/components/tag';
import { getFeaturedProjects, getProfile, getSocialLinks } from '@/lib/content';

export default function HomePage() {
  const profile = getProfile();
  const featured = getFeaturedProjects();
  const socials = getSocialLinks();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative isolate border-b border-line">
        <HeroBackdrop />

        {/* One container for the whole hero, so the eyebrow, name, tagline, CTAs,
            badge cards, and icon row all start on the same left edge. */}
        <div className="shell relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl">
            <h1 className="text-display font-extrabold text-fg">{profile.name}</h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {profile.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/projects" className="btn-primary">
                View Projects
              </Link>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Resume
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </div>

            <ProfileBadges badges={profile.badges} className="mt-16 sm:mt-20" />
            <SocialLinks links={socials} className="mt-8" />
          </div>
        </div>
      </section>

      {/* ── Featured work ──────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="shell py-20 sm:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Selected work</SectionLabel>
              <h2 className="text-display-sm font-bold text-fg">Things I built and broke</h2>
            </div>
            <Link
              href="/projects"
              className="text-sm text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              All projects &rarr;
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* ── About teaser ───────────────────────────────────────────────── */}
      <section className="shell pb-24">
        <div className="rule grid gap-8 pt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <SectionLabel>About</SectionLabel>
            <h2 className="text-2xl font-bold tracking-tight text-fg">
              Measurement before modeling
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-muted">{profile.bio}</p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              More about me &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
