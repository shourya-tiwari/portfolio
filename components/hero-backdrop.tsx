/**
 * Pure CSS/SVG. No canvas, no animation loop, no client JS — it costs nothing at
 * runtime and cannot affect the Lighthouse score.
 *
 * Three layers: a soft amber radial glow, a skewed panel that gives the hero a
 * diagonal edge, and a fine grid masked to fade out before it becomes busy.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1px grid, faded top-to-bottom and toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, var(--border) 0 1px, transparent 1px 72px), repeating-linear-gradient(90deg, var(--border) 0 1px, transparent 1px 72px)',
          maskImage: 'radial-gradient(120% 85% at 50% 0%, #000 15%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(120% 85% at 50% 0%, #000 15%, transparent 72%)',
        }}
      />

      {/* Angular panel — a single skewed shape, not a pattern. Masked so its leading
          edge fades out before it reaches the badge cards. */}
      <div
        className="absolute -right-[16%] -top-[40%] h-[125%] w-[58%] origin-top-right -skew-x-[14deg] border-l border-line bg-gradient-to-br from-surface/70 via-surface/25 to-transparent"
        style={{
          maskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.35) 55%, transparent 82%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.35) 55%, transparent 82%)',
        }}
      />

      {/* The accent, at low opacity, doing the only color work on the page */}
      <div
        className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--accent) 9%, transparent) 0%, transparent 62%)',
        }}
      />

      {/* Bottom fade into the page background */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
