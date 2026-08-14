import { getPublicProducts } from '@/lib/products';
import type { Metadata } from 'next';
import { RequestQuotePage } from './RequestQuotePageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Minta Penawaran EDL HPL',
  description: 'Minta penawaran produk EDL HPL berdasarkan kode dan jumlah lembar. Tim Varindo akan membantu konfirmasi harga, stok, dan pengiriman.',
  alternates: { canonical: '/request-quote' },
};

export default async function Page() {
  const products = await getPublicProducts();
  const productOptions = products.map((p) => ({
    code:       p.code       ?? '',
    name:       p.name       ?? '',
    design:     p.design     ?? '',
    collection: p.collection ?? '',
  }));
  return <RequestQuotePage products={productOptions} />;
}
