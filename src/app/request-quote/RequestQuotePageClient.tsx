'use client';

import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';
import { RequestQuoteForm } from './RequestQuoteForm';
import type { ProductOption } from '@/components/ProductCodeInput';

export function RequestQuotePage({ products }: { products: ProductOption[] }) {
  const { lang } = useLang();

  const infoItems = lang === 'id'
    ? ['Kode produk atau nama desain', 'Jumlah lembar per produk', 'Nama / perusahaan', 'Alamat pengiriman', 'Nomor telepon']
    : ['Product code or design name',  'Sheets needed per product', 'Name or company name', 'Delivery address', 'Phone number'];

  return (
    <div>
      <div className="relative overflow-hidden bg-[#e7eee6]">
        <div className="shell py-14 sm:py-20">
          <p className="label mb-4">{t('forms', 'quoteBadge', lang)}</p>
          <h1 className="display text-edl-ink text-5xl sm:text-7xl lg:text-8xl whitespace-pre-line">
            {t('forms', 'quoteTitle', lang)}
          </h1>
          <p className="mt-5 text-[14px] leading-7 text-edl-400 max-w-lg">
            {t('forms', 'quoteSubtitle', lang)}
          </p>
        </div>
      </div>

      <div className="shell py-12 sm:py-16 max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-start">

          {/* Left — info panel */}
          <div className="border border-edl-line bg-white">
            <div className="border-b border-edl-line px-6 py-4 bg-edl-50">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-edl-700">
                {t('forms', 'quoteInfoTitle', lang)}
              </p>
            </div>
            <div className="divide-y divide-edl-line/50">
              {infoItems.map((item) => (
                <div key={item} className="flex items-center gap-3 px-6 py-4">
                  <div className="w-4 h-[1.5px] bg-edl-blue shrink-0" />
                  <p className="text-[13px] font-medium text-edl-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 border-t border-edl-line bg-edl-50/50">
              <p className="text-[11px] text-edl-400 leading-6">
                {t('forms', 'quoteMaxNote', lang, { n: 10 })}
              </p>
            </div>
          </div>

          {/* Right — form */}
          <RequestQuoteForm products={products} />
        </div>
      </div>
    </div>
  );
}
