import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug } from '@/lib/products';
import { ProductDetailClient } from './ProductDetailClient';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Produk Tidak Ditemukan' };
  return {
    title: product.name,
    description: `${product.name}. ${product.size || 'EDL HPL'}${product.thickness ? `, tebal ${product.thickness}` : ''}. Harga ${product.price ? `Rp${product.price.toLocaleString('id-ID')}` : 'hubungi Varindo'}${product.taxIncluded ? ' termasuk PPN' : ''}.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description || `Produk EDL HPL ${product.code} tersedia melalui Varindo Indonesia.`,
      url: `/products/${product.slug}`,
      images: product.imageUrl ? [{ url: product.imageUrl, alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: `${product.code} · ${product.collection || 'EDL HPL'} · ${product.size || ''}`,
      images: product.imageUrl ? [product.imageUrl] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://varindohpl.com/products/${product.slug}#product`,
    name: product.name,
    sku: product.code,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    description: product.description,
    brand: { '@type': 'Brand', name: 'EDL' },
    category: product.collection || product.category || 'High Pressure Laminate',
    size: product.size,
    material: 'High Pressure Laminate (HPL)',
    offers: product.price ? {
      '@type': 'Offer',
      url: `https://varindohpl.com/products/${product.slug}`,
      priceCurrency: 'IDR',
      price: product.price,
      seller: { '@id': 'https://varindohpl.com/#organization' },
    } : undefined,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }} />
      <ProductDetailClient product={product} />
    </>
  );
}
