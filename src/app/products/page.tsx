import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPublicProducts } from '@/lib/products';
import { ProductsClient } from './ProductsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Katalog Produk EDL',
  description: 'Cari produk EDL HPL dari Varindo di Indonesia berdasarkan kode, nama desain, koleksi, dan finishing.'
};

export default async function ProductsPage() {
  const products = await getPublicProducts();
  return (
    <Suspense fallback={null}>
      <ProductsClient products={products} />
    </Suspense>
  );
}
