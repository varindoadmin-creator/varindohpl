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
      <div className="border-b border-edl-line bg-edl-50">
        <div className="shell py-4 flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase">
          <Link href="/products" className="text-edl-500 hover:text-edl-ink transition-colors">
            {t('detail', 'breadcrumbCatalog', lang)}
          </Link>
          <span className="text-edl-300">·</span>
          <span className="text-edl-ink font-medium truncate max-w-xs">{product.name}</span>
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
              alt={product.name}
            />
            <div className="mt-4 border border-edl-line/60 bg-edl-50 px-5 py-4">
              <p className="text-[11px] leading-6 text-edl-500">{t('detail', 'colourNote', lang)}</p>
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="label mb-3">{product.brand || 'EDL'}</p>
            {/* Product name — NEVER translated */}
            <h1 className="display text-edl-ink text-4xl sm:text-5xl mb-6">{product.name}</h1>

            <div className="border-t border-b border-edl-line py-5 mb-7">
              <span className="display text-3xl text-edl-ink">{formatIDR(product.price)}</span>
              <p className="mt-2 text-[11px] tracking-[0.14em] uppercase text-edl-400">
                {t('detail', 'inclTax', lang)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
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
            <div className="border border-edl-line">
              <div className="border-b border-edl-line px-5 py-3.5 bg-edl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-edl-700">
                  {t('detail', 'specsTitle', lang)}
                </p>
              </div>
              <dl>
                {specs.map(([label, value], i) => (
                  <div key={label}
                    className={`flex items-start gap-4 px-5 py-3.5 ${i !== specs.length - 1 ? 'border-b border-edl-line/60' : ''}`}>
                    <dt className="text-[11px] tracking-[0.14em] uppercase text-edl-400 w-28 shrink-0 pt-px">{label}</dt>
                    <dd className="text-[13px] font-medium text-edl-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {product.edgebandCode && product.edgebandSizes?.length ? (
              <div className="mt-5 border border-edl-line bg-[#edf2ea] px-5 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-edl-700">
                  {lang === 'id' ? 'Tersedia dengan Edgeband' : 'Available with Edgeband'}
                </p>
                <p className="mt-3 text-[15px] font-semibold text-edl-ink">{product.edgebandCode}</p>
                <ul className="mt-2 space-y-1">
                  {product.edgebandSizes.map((size) => (
                    <li key={size} className="text-[13px] text-edl-600">{size}</li>
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
