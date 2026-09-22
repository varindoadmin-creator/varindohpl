import { getPublicProducts } from '@/lib/products';
import type { Metadata } from 'next';
import { RequestQuotePage } from './RequestQuotePageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Permintaan Penawaran EDL HPL',
  description: 'Pilih produk EDL HPL beserta jumlah lembarnya dan tim Varindo akan menyiapkan penawaran harga untuk Anda.',
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
