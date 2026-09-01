/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Content lives on disk and is read at build time; nothing here needs a runtime.
  experimental: {
    optimizePackageImports: ['shiki'],
  },
};

export default nextConfig;
