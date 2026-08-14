import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPublicProducts } from '@/lib/products';
import { ProductsClient } from './ProductsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Katalog Produk EDL',
  description: 'Cari katalog produk EDL HPL Indonesia berdasarkan kode, desain, koleksi, ukuran, ketebalan, dan finishing. Harga tampil sudah termasuk PPN.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Katalog Produk EDL HPL Indonesia',
    description: 'Jelajahi produk EDL HPL lengkap dengan gambar, spesifikasi, dan harga termasuk PPN.',
    url: '/products',
  },
};

export default async function ProductsPage() {
  const products = await getPublicProducts();
  return (
    <Suspense fallback={null}>
      <ProductsClient products={products} />
    </Suspense>
  );
}
