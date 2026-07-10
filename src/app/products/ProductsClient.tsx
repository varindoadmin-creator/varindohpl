'use client';

import { Suspense } from 'react';
import type { Product } from '@/types/product';
import { ProductExplorer } from '@/components/ProductExplorer';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

const filterOptions = {
  collections:   ['Wood','Pattern','Solid','Stone','Marble','Metal','Aptico'],
  categories:    [
    'Abstract','Aleppo','Aleve','Aptico','Ashwood','Aspen','Embossed',
    'Fine Matt','Flow','Larix','Leather','Legno','Magnetic',
    'Marble','Marble Gloss','Marble Matt','Melavaio','Melavaio Gloss','Melavaio Matt',
    'Metal','Natural Matt','Nuance','PianoGloss','Smart','Stone','Super Matt','Textile','Textured',
  ],
  finishes:      [],
  sizes:         ['1220 x 2440 mm','1250 x 2500 mm','1300 x 2800 mm','1300 x 3050 mm','1320 x 3050 mm'],
  colorFamilies: []
};

export function ProductsClient({ products }: { products: Product[] }) {
  const { lang } = useLang();
  return (
    <div>
      <div className="relative bg-edl-ink text-white overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-edl-blue" />
        <div className="shell py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-[2px] bg-edl-blue" />
            <p className="label">{t('products', 'badge', lang)}</p>
          </div>
          <h1 className="display text-white text-5xl sm:text-6xl lg:text-7xl mb-4">
            {t('products', 'title', lang)}
          </h1>
          <p className="text-[14px] leading-7 text-edl-400 max-w-xl">
            {t('products', 'subtitle', lang)}
          </p>
        </div>
      </div>
      <div className="shell py-10 sm:py-12">
        <Suspense fallback={
          <div className="border border-edl-line bg-white py-12 px-6 text-center">
            <p className="label text-edl-500">{t('products', 'loading', lang)}</p>
          </div>
        }>
          <ProductExplorer products={products} filterOptions={filterOptions} />
        </Suspense>
      </div>
    </div>
  );
}
