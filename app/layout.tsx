import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { getProfile, getSocialLinks } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

import './globals.css';

/*
 * Self-hosted from app/fonts rather than next/font/google: the Google loader
 * fetches the face from fonts.gstatic.com during `next build`, which makes the
 * build depend on the network. These are the same latin-subset variable files
 * that loader produced, committed to the repo so the build is hermetic.
 */
const inter = localFont({
  src: './fonts/Inter-latin.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  adjustFontFallback: 'Arial',
  variable: '--font-sans',
});

/*
 * 'optional' rather than 'swap': mono is used for tech tags, filter pills, and the
 * metric numbers, and a late swap reflowed those enough to cost 0.12 CLS on case
 * study pages. With 'optional' the browser keeps the metric-compatible monospace
 * fallback if the face is not ready in time, and never swaps mid-paint.
 */
const jetbrainsMono = localFont({
  src: './fonts/JetBrainsMono-latin.woff2',
  weight: '100 800',
  style: 'normal',
  display: 'optional',
  adjustFontFallback: 'Arial',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
  variable: '--font-mono',
});

export function generateMetadata(): Metadata {
  const profile = getProfile();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${profile.name} — ML/AI Engineer`,
      template: `%s — ${profile.name}`,
    },
    description: profile.tagline,
    /*
     * './' resolves against metadataBase plus the current route, so every page
     * emits a self-referencing canonical rather than all of them pointing at the
     * origin. Inherited by each route unless it sets its own alternates.
     */
    alternates: { canonical: './' },
    openGraph: {
      type: 'website',
      siteName: profile.name,
      title: `${profile.name} — ML/AI Engineer`,
      description: profile.tagline,
      url: SITE_URL,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} — ML/AI Engineer`,
      description: profile.tagline,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

/*
 * data-scroll-behavior: globals.css sets `scroll-behavior: smooth` on html for
 * in-page anchors. As of Next 16 the router no longer overrides that during route
 * transitions unless this attribute is present, which would leave every navigation
 * smooth-scrolling to the top instead of jumping.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = getProfile();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-bg font-sans text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>

        <Nav name={profile.name} resume={profile.resume} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer profile={profile} socials={getSocialLinks()} />
      </body>
    </html>
  );
}
