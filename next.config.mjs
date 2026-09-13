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
      // Site paused: every URL goes to varindo.co.id. Temporary (307) so search
      // engines treat it as a pause and resuming needs no cleanup. Delete this
      // rule and deploy to bring the site back.
      {
        source: '/:path*',
        destination: 'https://varindo.co.id',
        permanent: false,
      },
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
      // Price List requests were removed from the site. /price-list was in
      // the sitemap, so send remaining links and crawlers to the nearest
      // equivalent rather than a 404.
      {
        source: '/price-list',
        destination: '/request-catalogue',
        permanent: true,
      },
      {
        source: '/price-list/download',
        destination: '/request-catalogue',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/varindo-product-images/**'
      }
    ]
  }
};

export default nextConfig;
