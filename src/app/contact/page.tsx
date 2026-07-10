'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

export default function ContactPage() {
  const { lang } = useLang();

  return (
    <div>
      {/* Page hero */}
      <div className="relative bg-edl-ink text-white overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-edl-blue" />
        <div className="shell py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-[2px] bg-edl-blue" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-edl-blue">
              {t('contact', 'badge', lang)}
            </p>
          </div>
          <h1 className="display text-white text-5xl sm:text-6xl lg:text-7xl">
            {t('contact', 'title', lang)}
          </h1>
        </div>
      </div>

      <div className="shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-[14px] leading-7 text-edl-500 max-w-lg mb-10">{t('contact', 'intro', lang)}</p>
            <div className="border border-edl-line bg-white">
              <div className="border-b border-edl-line px-6 py-5 bg-edl-50 flex items-center gap-3">
                <div className="w-1 h-8 bg-edl-blue shrink-0" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-edl-500">{t('contact', 'companyLabel', lang)}</p>
                  <p className="mt-0.5 text-[15px] font-bold text-edl-ink">CV. Varindo Forma Hutama</p>
                </div>
              </div>
              <div className="bg-white px-6 py-6">
                <p className="label mb-3">{t('contact', 'headOffice', lang)}</p>
                <address className="not-italic text-[13px] leading-7 text-edl-600">
                  Branz BSD Tower A Unit 3310<br />
                  Jl. BSD Boulevard Parcel 55-F<br />
                  Tangerang 15339<br />
                  Banten, Indonesia<br />
                  <span className="font-semibold text-edl-ink">T. 0811 945 224</span>
                </address>
              </div>
              <div className="grid sm:grid-cols-2 gap-px bg-edl-line border-t border-edl-line">
                <div className="bg-white px-6 py-5">
                  <p className="label mb-2">{t('contact', 'hours', lang)}</p>
                  <p className="text-[13px] text-edl-700 whitespace-pre-line">{t('contact', 'hoursValue', lang)}</p>
                </div>
                <div className="bg-white px-6 py-5">
                  <p className="label mb-2">{t('contact', 'email', lang)}</p>
                  <a href="mailto:varindo.ho@gmail.com" className="text-[13px] text-edl-blue underline underline-offset-2 hover:text-edl-800 transition-colors">
                    varindo.ho@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <aside className="border border-edl-line bg-white p-8">
            <div className="w-8 h-[3px] bg-edl-blue mb-5" />
            <p className="label mb-4">WhatsApp</p>
            <h2 className="display text-edl-ink text-3xl sm:text-4xl mb-4">{t('contact', 'waTitle', lang)}</h2>
            <p className="text-[14px] leading-7 text-edl-500 mb-8">{t('contact', 'waBody', lang)}</p>
            <a href="https://wa.me/62811945224" target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full justify-center mb-3">
              Chat → 0811 945 224
            </a>
            <div className="mt-8 pt-6 border-t border-edl-line">
              <p className="label mb-3">{t('contact', 'browseCatalog', lang)}</p>
              <Link href="/products" className="text-[13px] font-semibold text-edl-blue hover:text-edl-800 transition-colors">
                {t('contact', 'browseLink', lang)}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
