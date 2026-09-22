'use client';

import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

export function ProductGrid({ products }: { products: Product[] }) {
  const { lang } = useLang();

  if (products.length === 0) {
    return (
      <div className="border border-edl-line bg-white py-20 px-8 text-center">
        <p className="label mb-3">{t('explorer', 'noResults', lang)}</p>
        <p className="display text-4xl text-edl-ink mb-3">
          {t('explorer', 'noResultsTitle', lang)}
        </p>
        <p className="text-sm text-edl-500 max-w-sm mx-auto leading-relaxed">
          {t('explorer', 'noResultsBody', lang)}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
