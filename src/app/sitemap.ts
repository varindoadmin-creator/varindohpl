import type { MetadataRoute } from 'next';
import { getPublicProducts } from '@/lib/products';

const baseUrl = 'https://varindohpl.com';
const collections = [
  'new-arrivals', 'best-sellers', 'woods', 'solids', 'ecru-core',
  'patterns', 'marble-stone', 'metal', 'colour-core', 'aptico-matt',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPublicProducts();
  const staticPages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/products', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/request-sample', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/request-quote', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/request-catalogue', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/price-list', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...collections.map((collection) => ({
      url: `${baseUrl}/collections/${collection}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
