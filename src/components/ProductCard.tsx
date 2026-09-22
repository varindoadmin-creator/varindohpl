'use client';

import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatIDR } from '@/lib/utils';
import { ProductImage } from './ProductImage';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

/**
 * The swatch is the card. Chrome is a hairline and small-caps metadata, so
 * nothing frames the material with a colour that would shift how it reads.
 *
 * `name` is the raw SKU string ("DA 2081N - EDL HPL 4'x8' | TITAN I"), which is
 * a database field, not a title. `design` holds what a specifier actually
 * remembers, so that leads and the code sits under it as reference.
 */
export function ProductCard({ product }: { product: Product }) {
  const { lang } = useLang();
  const title = product.design || product.name;

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} aria-label={title} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-edl-100">
          <ProductImage
            src={product.imageUrl || ''}
            imageUrls={product.imageUrlCandidates || []}
            alt={title}
          />
          {/* Hairline sits inside the image so the swatch stays full-bleed */}
          <div className="pointer-events-none absolute inset-0 border border-edl-ink/[0.07] transition-colors duration-300 group-hover:border-edl-ink/25" />
        </div>
      </Link>

      <div className="pt-3.5">
        <Link
          href={`/products/${product.slug}`}
          className="block font-display text-[19px] leading-[1.2] text-edl-ink transition-colors group-hover:text-edl-accent"
        >
          {title}
        </Link>

        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          {product.code && (
            <span className="spec tracking-[0.1em] uppercase text-edl-500">{product.code}</span>
          )}
          {product.finish && (
            <>
              <span className="h-px w-3 bg-edl-300" aria-hidden="true" />
              <span className="text-[11px] tracking-[0.1em] uppercase text-edl-400">{product.finish}</span>
            </>
          )}
        </div>

        {/* Price is reference information, not the headline: specifiers choose
            by design and finish first, then check cost. */}
        <p className="mt-2.5 spec text-edl-600">
          {formatIDR(product.price)}
          <span className="ml-2 text-[10px] tracking-[0.1em] uppercase text-edl-400">
            {t('card', 'inclTax', lang)}
          </span>
        </p>
      </div>
    </article>
  );
}
