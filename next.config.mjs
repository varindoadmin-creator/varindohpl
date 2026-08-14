/** @type {import('next').NextConfig} */
const nextConfig = {
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
