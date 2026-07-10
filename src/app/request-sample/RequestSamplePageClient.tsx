'use client';

import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';
import { RequestSampleForm } from './RequestSampleForm';
import type { ProductOption } from '@/components/ProductCodeInput';

export function RequestSamplePage({ products }: { products: ProductOption[] }) {
  const { lang } = useLang();

  const infoItems = lang === 'id'
    ? ['Kode produk atau nama desain', 'Nama / perusahaan', 'Alamat pengiriman', 'Nomor telepon']
    : ['Product code or design name',  'Name or company name', 'Delivery address', 'Phone number'];

  return (
    <div>
      <div className="relative bg-edl-ink text-white overflow-hidden">
        <div className="shell py-14 sm:py-20">
          <p className="label mb-4">{t('forms', 'sampleBadge', lang)}</p>
          <h1 className="display text-white text-5xl sm:text-6xl lg:text-7xl whitespace-pre-line">
            {t('forms', 'sampleTitle', lang)}
          </h1>
          <p className="mt-5 text-[14px] leading-7 text-edl-400 max-w-lg">
            {t('forms', 'sampleSubtitle', lang)}
          </p>
        </div>
      </div>

      <div className="shell py-12 sm:py-16 max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-start">

          {/* Left — info panel */}
          <div className="border border-edl-line bg-white">
            <div className="border-b border-edl-line px-6 py-4 bg-edl-50">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-edl-700">
                {t('forms', 'sampleInfoTitle', lang)}
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
                {t('forms', 'sampleMaxNote', lang)}
              </p>
            </div>
          </div>

          {/* Right — form */}
          <RequestSampleForm products={products} />
        </div>
      </div>
    </div>
  );
}
