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
  'solids':         { titleEN: 'Solids',        descEN: 'EDL solid colour and core surfaces.' },
  'ecru-core':      { titleEN: 'Ecru Core',     descEN: 'EDL ecru-core surfaces for coordinated interior details.' },
  'patterns':       { titleEN: 'Patterns',      descEN: 'Decorative EDL pattern surfaces.' },
  'marble-stone':   { titleEN: 'Marble & Stone', descEN: 'EDL marble and stone-effect HPL surfaces.' },
  'metal':          { titleEN: 'Metal',         descEN: 'EDL metallic HPL surfaces for premium interiors.' },
  'colour-core':    { titleEN: 'Colour Core',   descEN: 'EDL colour-core laminates with coordinated edges.' },
  'aptico-matt':    { titleEN: 'Aptico-Matt',   descEN: 'Premium Aptico-Matt HPL — made in Austria.' },
};

export function generateMetadata({ params }: { params: { group: string } }): Metadata {
  const meta = groupMeta[params.group as CollectionGroup];
  if (!meta) return { title: 'Koleksi' };
  const canonicalGroup = params.group === 'new-collections' ? 'new-arrivals' : params.group;
  return {
    title: `${meta.titleEN} EDL HPL`,
    description: `${meta.descEN} Browse specifications, images, and tax-inclusive prices from Varindo Indonesia.`,
    alternates: { canonical: `/collections/${canonicalGroup}` },
    openGraph: {
      title: `${meta.titleEN} EDL HPL | Varindo`,
      description: meta.descEN,
      url: `/collections/${canonicalGroup}`,
    },
  };
}

export default async function CollectionPage({ params }: { params: { group: string } }) {
  const group = params.group as CollectionGroup;
  if (!groupMeta[group]) notFound();

  const products = await getProductsByCollectionGroup(group);
  return <CollectionClient group={group} products={products} />;
}
