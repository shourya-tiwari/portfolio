/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /*
   * Static export: emits plain HTML/CSS/JS to out/ with no serverless functions
   * at all. Every route is already prerendered (generateStaticParams with
   * dynamicParams: false, no route handlers, no server actions), so nothing is
   * given up here except the on-demand image optimizer below.
   */
  output: 'export',
  images: {
    /*
     * Required by output: 'export' — there is no server to run the optimizer,
     * so next/image emits the source file as-is. Keep source images
     * pre-sized; `formats` (avif/webp) no longer applies.
     */
    unoptimized: true,
  },
  // Content lives on disk and is read at build time; nothing here needs a runtime.
  experimental: {
    optimizePackageImports: ['shiki'],
    /*
     * Defensive only. Shiki's 616 grammar files and 11MB dist are not currently
     * reached by the tracer — no shiki entry appears in any .nft.json, and no
     * MDX file contains a code fence for it to highlight. Measured build-trace
     * time is unchanged (6s with and without). This keeps the grammars out if
     * a future code block pulls the highlighter into the graph.
     */
    outputFileTracingExcludes: {
      '*': ['node_modules/shiki/**', 'node_modules/@shikijs/**'],
    },
  },
};

export default nextConfig;
