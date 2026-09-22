'use client';

import { Suspense } from 'react';
import type { Product } from '@/types/product';
import { ProductExplorer } from '@/components/ProductExplorer';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

const filterOptions = {
  collections:   ['Solid','Wood','Ecru Core','Pattern','Marble & Stone','Metal','Colour Core','Aptico-Matt'],
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
      <div className="border-b border-edl-line bg-edl-raised">
        <div className="shell py-16 sm:py-24">
          <p className="label mb-5">{t('products', 'badge', lang)}</p>
          <h1 className="display mb-6 text-5xl text-edl-ink sm:text-7xl">
            {t('products', 'title', lang)}
          </h1>
          <p className="max-w-xl text-[14px] leading-7 text-edl-600">
            {t('products', 'subtitle', lang)}
          </p>
        </div>
      </div>
      <div className="shell py-10 sm:py-16">
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
