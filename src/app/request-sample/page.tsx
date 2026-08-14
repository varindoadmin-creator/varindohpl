import { getPublicProducts } from '@/lib/products';
import type { Metadata } from 'next';
import { RequestSamplePage } from './RequestSamplePageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Minta Sampel EDL HPL',
  description: 'Minta hingga lima sampel EDL HPL untuk memastikan warna, tekstur, dan finishing sebelum menentukan material interior.',
  alternates: { canonical: '/request-sample' },
};

export default async function Page() {
  const products = await getPublicProducts();
  const productOptions = products.map((p) => ({
    code:       p.code       ?? '',
    name:       p.name       ?? '',
    design:     p.design     ?? '',
    collection: p.collection ?? '',
  }));
  return <RequestSamplePage products={productOptions} />;
}
