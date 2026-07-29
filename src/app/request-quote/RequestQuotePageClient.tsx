'use client';

import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';
import { RequestQuoteForm } from './RequestQuoteForm';
import type { ProductOption } from '@/components/ProductCodeInput';

export function RequestQuotePage({ products }: { products: ProductOption[] }) {
  const { lang } = useLang();
  return (
    <div>
      <div className="relative overflow-hidden bg-[#f5e6df]">
        <div className="shell py-14 sm:py-20">
          <p className="label mb-4">{t('forms', 'quoteBadge', lang)}</p>
          <h1 className="display text-edl-ink text-5xl sm:text-7xl lg:text-8xl">
            {t('forms', 'quoteTitle', lang)}
          </h1>
          <p className="mt-5 text-[14px] leading-7 text-edl-400 max-w-lg">
            {t('forms', 'quoteSubtitle', lang)}
          </p>
        </div>
      </div>
      <div className="shell py-12 sm:py-16 max-w-5xl">
        <RequestQuoteForm products={products} />
      </div>
    </div>
  );
}
