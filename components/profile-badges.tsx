import type { ProfileFrontmatter } from '@/lib/schema';

/**
 * Equal-width plain-text cards beneath the hero CTAs. Left-aligned and unconstrained
 * so they share the hero container's left edge rather than centering independently.
 * Content comes from `badges` in profile.mdx — no text lives in this component.
 */
export function ProfileBadges({
  badges,
  className = '',
}: {
  badges: ProfileFrontmatter['badges'];
  className?: string;
}) {
  if (badges.length === 0) return null;

  return (
    <ul className={`grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 ${className}`}>
      {badges.map((badge) => (
        /* min-h gives every card the same floor, so a one-line card still reads as
           deliberate next to one whose detail wraps to two lines. */
        <li
          key={badge.label}
          className="flex min-h-[7rem] flex-col rounded-lg border border-line bg-surface/40 px-5 py-5"
        >
          <p className="font-semibold leading-snug tracking-tight text-accent">{badge.label}</p>
          <p className="mt-1.5 text-sm leading-snug text-muted">{badge.detail}</p>
        </li>
      ))}
    </ul>
  );
}
