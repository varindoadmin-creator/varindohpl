'use client';

import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatIDR } from '@/lib/utils';
import { ProductImage } from './ProductImage';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

export function ProductCard({ product }: { product: Product }) {
  const { lang } = useLang();

  return (
    <article className="group overflow-hidden rounded-[1.35rem] bg-white border border-edl-line transition-all duration-300 hover:-translate-y-1 hover:border-edl-300 hover:shadow-card-hover">
      <Link href={`/products/${product.slug}`} aria-label={product.name} className="block">
        <div className="relative m-2 aspect-square overflow-hidden rounded-[1rem] bg-edl-50">
          <ProductImage src={product.imageUrl || ''} imageUrls={product.imageUrlCandidates || []} alt={product.name} />
          <div className="absolute inset-0 bg-edl-ink/0 transition-colors duration-300 group-hover:bg-edl-blue/[0.03]" />
        </div>
      </Link>

      <div className="px-5 pb-5 pt-3">
        {product.code && (
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-edl-400 mb-1">{product.code}</p>
        )}
        <Link href={`/products/${product.slug}`}
          className="block text-[13px] font-semibold leading-[1.45] text-edl-ink hover:text-edl-blue transition-colors line-clamp-2 min-h-[38px]">
          {product.name}
        </Link>
        {product.finish && (
          <p className="mt-1.5 text-[10px] tracking-[0.12em] uppercase text-edl-400">{product.finish}</p>
        )}
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-edl-line/60 pt-3">
          <span className="text-[14px] font-semibold text-edl-ink">{formatIDR(product.price)}</span>
          <p className="mt-0.5 text-[10px] tracking-[0.12em] uppercase text-edl-400">
            {t('card', 'inclTax', lang)}
          </p>
        </div>
      </div>
    </article>
  );
}
