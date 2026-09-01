import { SOCIAL_ICONS } from '@/components/social-icons';
import type { SocialLink } from '@/lib/schema';

/**
 * Icon row. Each icon sits in a 40px bordered tile matching the badge cards
 * (dark surface, faint border), warming to the accent on hover. Left-aligned so it
 * shares the hero container's left edge.
 *
 * Links come from profile.mdx via getSocialLinks(), so the set is content driven —
 * this component never names a URL.
 */
export function SocialLinks({
  links,
  className = '',
}: {
  links: SocialLink[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.map((link) => {
        const Icon = SOCIAL_ICONS[link.key];
        // A mailto: hands off to the visitor's own mail client, so it must not
        // open a tab; an https override (webmail compose) should.
        const isMailto = link.href.startsWith('mailto:');

        return (
          <li key={link.key}>
            <a
              href={link.href}
              {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={link.label}
              title={link.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface/40 text-muted transition-colors duration-200 ease-out hover:border-accent hover:bg-surface hover:text-accent"
            >
              <Icon className="h-[1.15rem] w-[1.15rem]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
