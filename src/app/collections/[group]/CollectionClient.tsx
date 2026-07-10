'use client';

import Link from 'next/link';
import type { Product } from '@/types/product';
import type { CollectionGroup } from '@/lib/products';
import { ProductExplorer } from '@/components/ProductExplorer';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

const groupConfig: Partial<Record<CollectionGroup, { titleKey: string; descKey: string; accentKey: string }>> = {
  'new-arrivals':   { titleKey: 'newArrivalsTitle',  descKey: 'newArrivalsDesc',  accentKey: 'newArrivalsAccent' },
  'new-collections':{ titleKey: 'newArrivalsTitle',  descKey: 'newArrivalsDesc',  accentKey: 'newArrivalsAccent' },
  'best-sellers':   { titleKey: 'bestSellersTitle',  descKey: 'bestSellersDesc',  accentKey: 'bestSellersAccent' },
  'woods':          { titleKey: 'woodsTitle',        descKey: 'woodsDesc',        accentKey: '' },
  'patterns':       { titleKey: 'patternsTitle',     descKey: 'patternsDesc',     accentKey: '' },
  'solids':         { titleKey: 'solidsTitle',       descKey: 'solidsDesc',       accentKey: '' },
  'stone':          { titleKey: 'stoneTitle',        descKey: 'stoneDesc',        accentKey: '' },
  'marble':         { titleKey: 'marbleTitle',       descKey: 'marbleDesc',       accentKey: '' },
  'metal':          { titleKey: 'metalTitle',        descKey: 'metalDesc',        accentKey: '' },
  'aptico':         { titleKey: 'apticoTitle',       descKey: 'apticoDesc',       accentKey: '' },
};

const tabOrder: CollectionGroup[] = [
  'new-arrivals', 'best-sellers',
  'woods', 'patterns', 'solids',
  'stone', 'marble', 'metal', 'aptico',
];

const filterOptions = {
  collections: ['Wood','Pattern','Solid','Stone','Marble','Metal','Aptico'],
  categories:  [
    'Abstract','Aspen','Fine Matt','Leather','Marble Matt','Metal','Nuance',
    'PianoGloss','Smart','Stone','Super Matt','Textile','Textured',
  ],
  finishes:    [],
  sizes:       ['1220 x 2440 mm', '1250 x 2500 mm', '1300 x 2800 mm', '1300 x 3050 mm', '1320 x 3050 mm'],
  colorFamilies: []
};

type Props = { group: CollectionGroup; products: Product[] };

export function CollectionClient({ group, products }: Props) {
  const { lang } = useLang();
  const config   = groupConfig[group];
  if (!config) return null;

  const title  = t('collections', config.titleKey,  lang);
  const desc   = t('collections', config.descKey,   lang);
  const accent = config.accentKey ? t('collections', config.accentKey, lang) : '';

  return (
    <div>
      {/* Header */}
      <div className="relative bg-edl-ink text-white overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-edl-blue" />
        <div className="shell py-12 sm:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase mb-8">
            <Link href="/products" className="text-edl-500 hover:text-edl-300 transition-colors">
              {t('collections', 'breadcrumbCatalog', lang)}
            </Link>
            <span className="text-edl-600">·</span>
            <span className="text-edl-400">{title}</span>
          </div>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              {accent && (
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-5 h-[2px] bg-edl-blue" />
                  <p className="label">{accent}</p>
                </div>
              )}
              <h1 className="display text-white text-5xl sm:text-6xl lg:text-7xl mb-4">{title}</h1>
              <p className="text-[14px] leading-7 text-edl-400 max-w-xl">{desc}</p>
            </div>
            <div className="border border-edl-blue/30 bg-edl-blue/10 px-6 py-4 text-center shrink-0">
              <p className="display text-4xl text-white">{products.length}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-edl-400 mt-1">
                {t('collections', 'products', lang)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Collection tabs */}
      <div className="border-b border-edl-line bg-white overflow-x-auto">
        <div className="shell flex gap-0">
          {tabOrder.filter(g => groupConfig[g]).map((g) => (
            <Link key={g} href={`/collections/${g}`}
              className={`shrink-0 px-5 py-3.5 text-[10px] font-bold tracking-[0.18em] uppercase transition-all border-b-2 ${
                g === group
                  ? 'border-edl-blue text-edl-blue'
                  : 'border-transparent text-edl-500 hover:text-edl-ink hover:border-edl-300'
              }`}>
              {t('collections', groupConfig[g]!.titleKey, lang)}
            </Link>
          ))}
        </div>
      </div>

      {/* Explorer */}
      <div className="shell py-10 sm:py-12">
        <ProductExplorer
          products={products}
          filterOptions={filterOptions}
          showCollectionTabs={false}
                />
      </div>
    </div>
  );
}
