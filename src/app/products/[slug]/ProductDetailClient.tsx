'use client';

import Link from 'next/link';
import type { Product } from '@/types/product';
import { ProductImageZoom } from '@/components/ProductImageZoom';
import { buildProductEnquiryMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { formatIDR } from '@/lib/utils';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

export function ProductDetailClient({ product }: { product: Product }) {
  const { lang } = useLang();
  const enquiryUrl = buildWhatsAppUrl(buildProductEnquiryMessage(product));

  // `name` is the SKU string ("DA 2081N - EDL HPL 4'x8' | TITAN I"). Setting
  // that as the H1 put pipes and feet-marks into display type and repeated the
  // code that already sits in the spec table. The design name is the title.
  const title = product.design || product.name;

  const specs = [
    [t('detail', 'specCode', lang),          product.code],
    [t('detail', 'specBrand', lang),         product.brand],
    [t('detail', 'specDesign', lang),        product.design],
    [t('detail', 'specCollection', lang),    product.collection],
    [t('detail', 'specSubCollection', lang), product.category],
    [t('detail', 'specSize', lang),          product.size],
    [t('detail', 'specThickness', lang),     product.thickness],
    [t('detail', 'specColourFamily', lang),  product.colorFamily],
  ].filter(([, v]) => Boolean(v));

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-edl-line">
        <div className="shell flex items-center gap-2.5 py-4 text-[11px] uppercase tracking-[0.14em]">
          <Link href="/products" className="text-edl-500 transition-colors hover:text-edl-ink">
            {t('detail', 'breadcrumbCatalog', lang)}
          </Link>
          <span className="h-px w-3 bg-edl-300" aria-hidden="true" />
          <span className="max-w-xs truncate text-edl-ink">{title}</span>
        </div>
      </div>

      {/* Main */}
      <div className="shell py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-start">

          {/* Image */}
          <div>
            <ProductImageZoom
              src={product.imageUrl || ''}
              imageUrls={product.imageUrlCandidates || []}
              alt={title}
            />
            <p className="mt-4 border-t border-edl-line pt-4 text-[11px] leading-6 text-edl-500">
              {t('detail', 'colourNote', lang)}
            </p>
          </div>

          {/* Details */}
          <div>
            <p className="label mb-4">{product.brand || 'EDL'}</p>
            {/* Product name — NEVER translated */}
            <h1 className="display mb-3 text-5xl text-edl-ink sm:text-6xl">{title}</h1>
            <p className="spec tracking-[0.12em] uppercase text-edl-500">{product.code}</p>

            <div className="mb-8 mt-7 flex items-baseline gap-3 border-y border-edl-line py-5">
              <span className="spec text-[17px] font-medium text-edl-ink">{formatIDR(product.price)}</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-edl-400">
                {t('detail', 'inclTax', lang)}
              </span>
            </div>

            <div className="mb-12 flex flex-col gap-3 sm:flex-row">
              <a href={enquiryUrl} target="_blank" rel="noreferrer" className="btn-ink">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6L0 24l6.19-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.43l-.37-.22-3.87 1.02 1.03-3.77-.24-.38A9.93 9.93 0 0 1 2 12C2 6.49 6.49 2 12 2s10 4.49 10 10-4.49 10-10 10z"/>
                </svg>
                {t('detail', 'enquireCta', lang)}
              </a>
              <Link href="/products" className="btn-ghost">
                {t('detail', 'backCatalog', lang)}
              </Link>
            </div>

            {/* Spec table */}
            <div>
              <p className="label mb-4 border-b border-edl-line pb-3">
                {t('detail', 'specsTitle', lang)}
              </p>
              <dl>
                {specs.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-6 border-b border-edl-line/70 py-3.5">
                    <dt className="text-[10px] shrink-0 uppercase tracking-[0.16em] text-edl-400">{label}</dt>
                    <dd className="spec text-right text-edl-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {product.edgebandCode && product.edgebandSizes?.length ? (
              <div className="mt-10">
                <p className="label mb-4 border-b border-edl-line pb-3">
                  {lang === 'id' ? 'Tersedia dengan Edgeband' : 'Available with Edgeband'}
                </p>
                <p className="spec text-[15px] text-edl-ink">{product.edgebandCode}</p>
                <ul className="mt-2 space-y-1">
                  {product.edgebandSizes.map((size) => (
                    <li key={size} className="spec text-edl-500">{size}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
