'use client';

import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';
import { RequestCatalogueForm } from './RequestCatalogueForm';

export function RequestCataloguePage() {
  const { lang } = useLang();
  return (
    <div>
      <div className="relative bg-edl-ink text-white overflow-hidden">
        <div className="shell py-14 sm:py-20">
          <p className="label mb-4">{t('forms', 'catalogueBadge', lang)}</p>
          <h1 className="display text-white text-5xl sm:text-6xl lg:text-7xl whitespace-pre-line">
            {t('forms', 'catalogueTitle', lang)}
          </h1>
          <p className="mt-5 text-[14px] leading-7 text-edl-400 max-w-lg">
            {t('forms', 'catalogueSubtitle', lang)}
          </p>
        </div>
      </div>
      <div className="shell py-12 sm:py-16 max-w-3xl">
        <RequestCatalogueForm />
      </div>
    </div>
  );
}
