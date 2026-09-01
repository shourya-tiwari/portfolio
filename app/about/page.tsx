import type { Metadata } from 'next';

import { SectionLabel } from '@/components/tag';
import { getOtherWork, getProfile } from '@/lib/content';
import { renderMdx } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, skills, and smaller projects.',
};

export default async function AboutPage() {
  const profile = getProfile();
  const otherWork = getOtherWork();
  const bio = await renderMdx(profile.body);

  return (
    <div className="shell py-20 sm:py-24">
      {/* ── Bio ────────────────────────────────────────────────────────── */}
      <header className="mb-14 max-w-prose">
        <SectionLabel>About</SectionLabel>
        <h1 className="text-display-sm font-bold text-fg">{profile.name}</h1>
        {profile.location && (
          <p className="mt-4 font-mono text-sm text-faint">{profile.location}</p>
        )}
      </header>

      <div className="max-w-prose">{bio}</div>

      {/* ── Education ──────────────────────────────────────────────────── */}
      {profile.education.length > 0 && (
        <section className="rule mt-20 pt-14">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-fg">Education</h2>
          <ul className="space-y-8">
            {profile.education.map((item) => (
              <li
                key={`${item.institution}-${item.period}`}
                className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
              >
                <p className="font-mono text-sm text-faint">{item.period}</p>
                <div>
                  <p className="font-semibold text-fg">
                    {item.degree}{' '}
                    <span className="font-normal text-muted">&middot; {item.institution}</span>
                  </p>
                  {item.detail && (
                    <p className="mt-1.5 font-mono text-sm text-accent">{item.detail}</p>
                  )}
                  {item.coursework.length > 0 && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      <span className="text-faint">Coursework &mdash; </span>
                      {item.coursework.join(', ')}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Experience ─────────────────────────────────────────────────── */}
      {profile.experience.length > 0 && (
        <section className="rule mt-20 pt-14">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-fg">Experience</h2>
          <ul className="space-y-8">
            {profile.experience.map((item) => (
              <li
                key={`${item.org}-${item.period}`}
                className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
              >
                <p className="font-mono text-sm text-faint">{item.period}</p>
                <div>
                  <p className="font-semibold text-fg">
                    {item.role}{' '}
                    <span className="font-normal text-muted">&middot; {item.org}</span>
                  </p>
                  {item.note && (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.note}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      {profile.skills.length > 0 && (
        <section className="rule mt-20 pt-14">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-fg">Skills</h2>
          <div className="grid gap-10 sm:grid-cols-2">
            {profile.skills.map((group) => (
              <div key={group.category}>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-faint">
                  {group.category}
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-line bg-surface px-2.5 py-1.5 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Certifications ─────────────────────────────────────────────── */}
      {profile.certifications.length > 0 && (
        <section className="rule mt-20 pt-14">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-fg">Certifications</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {profile.certifications.map((cert) => (
              <li
                key={cert.title}
                className="rounded-lg border border-line bg-surface/40 px-5 py-4"
              >
                <p className="font-medium leading-snug text-fg">{cert.title}</p>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Other work ─────────────────────────────────────────────────── */}
      {otherWork.items.length > 0 && (
        <section className="rule mt-20 pt-14">
          <h2 className="text-2xl font-bold tracking-tight text-fg">Other work</h2>
          <p className="mt-3 max-w-prose text-muted">
            Smaller projects, experiments, and tools &mdash; the things that were a weekend rather
            than a semester.
          </p>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {otherWork.items.map((item) => (
              <li key={item.link}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-1.5 py-5 transition-colors sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8"
                >
                  <span className="font-medium text-fg transition-colors group-hover:text-accent">
                    {item.title}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{item.oneLiner}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section className="rule mt-20 pt-14">
        <h2 className="text-2xl font-bold tracking-tight text-fg">Get in touch</h2>
        <p className="mt-3 max-w-prose text-muted">
          The fastest way to reach me is email. My resume has the short version of everything above.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="btn-primary">
            {profile.email}
          </a>
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
      </section>
    </div>
  );
}
