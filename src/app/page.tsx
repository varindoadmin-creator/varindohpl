import {
  getBestSellerProducts,
  getNewCollectionProducts,
  getPublicProducts
} from '@/lib/products';
import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Dealer Resmi EDL HPL Indonesia | Varindo',
  description: 'Temukan HPL EDL untuk interior di Indonesia. Jelajahi koleksi Woods, Solids, Ecru Core, Patterns, Marble & Stone, Metal, Colour Core, dan Aptico-Matt.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const [allProducts, newProducts, bestSellers] = await Promise.all([
    getPublicProducts(),
    getNewCollectionProducts(),
    getBestSellerProducts()
  ]);

  return (
    <HomeClient
      allCount={allProducts.length}
      newProducts={newProducts.slice(0, 8)}
      bestSellers={bestSellers.slice(0, 8)}
    />
  );
}
