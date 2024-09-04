/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  reactStrictMode: true,

  // TODO: remove these temporary overwirtes
  // Add this line to ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add this to ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
