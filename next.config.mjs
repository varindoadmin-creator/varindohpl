import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloud Run runs this as a container: 'standalone' emits .next/standalone
  // with a self-contained server.js and only the traced dependencies, so the
  // runtime image doesn't carry the full node_modules tree.
  output: 'standalone',
  experimental: {
    // Pin file tracing to this project. Left to infer, Next walks up, finds
    // the stray package.json in ~/Documents, and nests the standalone build
    // under .next/standalone/varindohpl/, which is not where the container's
    // CMD looks for server.js.
    outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  },
  async redirects() {
    return [
      {
        source: '/request-catalog',
        destination: '/request-catalogue',
        permanent: true,
      },
      {
        source: '/collections/new-collections',
        destination: '/collections/new-arrivals',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/varindo/image/upload/**'
      }
    ]
  }
};

export default nextConfig;
