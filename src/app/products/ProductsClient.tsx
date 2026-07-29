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
      <div className="relative overflow-hidden bg-[#e9e2ef]">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-white/50" />
        <div className="shell py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-[2px] bg-edl-blue" />
            <p className="label text-[#745f83]">{t('products', 'badge', lang)}</p>
          </div>
          <h1 className="display text-edl-ink text-5xl sm:text-7xl lg:text-8xl mb-5">
            {t('products', 'title', lang)}
          </h1>
          <p className="text-[14px] leading-7 text-edl-600 max-w-xl">
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
