import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductsByCollectionGroup } from '@/lib/products';
import type { CollectionGroup } from '@/lib/products';
import { CollectionClient } from './CollectionClient';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

const groupMeta: Partial<Record<CollectionGroup, { titleEN: string; descEN: string }>> = {
  'new-arrivals':   { titleEN: 'New Arrivals',  descEN: 'Browse newly introduced EDL designs.' },
  'new-collections':{ titleEN: 'New Arrivals',  descEN: 'Browse newly introduced EDL designs.' },
  'best-sellers':   { titleEN: 'Best Sellers',  descEN: 'Explore frequently selected EDL surfaces.' },
  'woods':          { titleEN: 'Woods',         descEN: 'EDL woodgrain surfaces for interior projects.' },
  'patterns':       { titleEN: 'Patterns',      descEN: 'Decorative EDL pattern surfaces.' },
  'solids':         { titleEN: 'Solids',        descEN: 'EDL solid colour and core surfaces.' },
  'stone':          { titleEN: 'Stone',         descEN: 'EDL stone-effect HPL surfaces.' },
  'marble':         { titleEN: 'Marble',        descEN: 'EDL marble-effect HPL surfaces.' },
  'metal':          { titleEN: 'Metal',         descEN: 'EDL metallic HPL surfaces for premium interiors.' },
  'aptico':         { titleEN: 'Aptico',        descEN: 'Premium Aptico HPL — made in Austria.' },
};

export function generateMetadata({ params }: { params: { group: string } }): Metadata {
  const meta = groupMeta[params.group as CollectionGroup];
  if (!meta) return { title: 'Koleksi' };
  return { title: meta.titleEN, description: meta.descEN };
}

export default async function CollectionPage({ params }: { params: { group: string } }) {
  const group = params.group as CollectionGroup;
  if (!groupMeta[group]) notFound();

  const products = await getProductsByCollectionGroup(group);
  return <CollectionClient group={group} products={products} />;
}
