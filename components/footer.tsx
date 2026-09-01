import Link from 'next/link';

import type { Profile } from '@/lib/content';
import type { SocialLink } from '@/lib/schema';
import { NAV_LINKS } from '@/lib/site';

export function Footer({ profile, socials }: { profile: Profile; socials: SocialLink[] }) {
  /* Email already has its own mailto above, so it is dropped from this list.
     `profile.socials` carries anything with no dedicated icon (e.g. Scholar). */
  const elsewhere = [
    ...socials.filter((s) => s.key !== 'email').map((s) => ({ label: s.label, href: s.href })),
    ...profile.socials,
  ];

  return (
    <footer className="mt-24 border-t border-line">
      <div className="shell flex flex-col gap-10 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-semibold tracking-tight text-fg">{profile.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{profile.tagline}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-block text-sm text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {profile.email}
          </a>
        </div>

        <div className="flex gap-14">
          <nav aria-label="Footer">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              Site
            </h2>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          {elsewhere.length > 0 && (
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                Elsewhere
              </h2>
              <ul className="space-y-2.5">
                {elsewhere.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="shell rule py-6">
        <p className="text-xs text-faint">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js and MDX.
        </p>
      </div>
    </footer>
  );
}
