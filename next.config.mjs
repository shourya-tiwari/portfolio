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
  },
};

export default nextConfig;
