import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/price-list/download'],
    },
    sitemap: 'https://varindohpl.com/sitemap.xml',
    host: 'https://varindohpl.com',
  };
}
