'use client';

import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

export default function AboutPage() {
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
              {t('about', 'badge', lang)}
            </p>
          </div>
          <h1 className="display text-white text-5xl sm:text-6xl lg:text-7xl">
            {t('about', 'title', lang)}
          </h1>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-edl-blue/5 to-transparent pointer-events-none" />
      </div>

      <div className="shell py-14 sm:py-18 max-w-5xl">

        {/* Mission */}
        <section className="border border-edl-line bg-white mb-6">
          <div className="grid lg:grid-cols-[0.4fr_0.6fr]">
            <div className="border-b lg:border-b-0 lg:border-r border-edl-line bg-edl-50 px-8 py-10 flex flex-col justify-center">
              <div className="w-8 h-[3px] bg-edl-blue mb-5" />
              <p className="label mb-4">{t('about', 'missionLabel', lang)}</p>
              <h2 className="display text-edl-ink text-3xl sm:text-4xl">
                {t('about', 'missionTitle1', lang)}<br />
                <span className="text-edl-blue">{t('about', 'missionTitle2', lang)}</span>
              </h2>
            </div>
            <div className="px-8 py-10 space-y-5 text-[14px] leading-8 text-edl-600">
              <p>{t('about', 'mission1', lang)}</p>
              <p>{t('about', 'mission2', lang)}</p>
              <p>{t('about', 'mission3', lang)}</p>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="relative border border-edl-line bg-edl-ink text-white mb-6 px-8 py-10 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-edl-blue" />
          <p className="label mb-4">{t('about', 'visionLabel', lang)}</p>
          <h2 className="display text-white text-3xl sm:text-4xl mb-5">
            {t('about', 'visionTitle', lang)}
          </h2>
          <div className="text-[14px] leading-8 text-edl-400 max-w-2xl space-y-4">
            <p>{t('about', 'vision1', lang)}</p>
            <p>{t('about', 'vision2', lang)}</p>
          </div>
        </section>

        {/* Values */}
        <section>
          <p className="label mb-6">{t('about', 'valuesLabel', lang)}</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="relative border border-edl-line bg-edl-50 p-7 overflow-hidden">
                <span className="absolute right-4 top-2 text-[52px] font-black text-edl-line/70 leading-none select-none">
                  {String(n).padStart(2, '0')}
                </span>
                <div className="relative z-10">
                  <div className="w-8 h-[3px] bg-edl-blue mb-4" />
                  <h3 className="text-[14px] font-bold text-edl-ink mb-2">{t('about', `val${n}Title`, lang)}</h3>
                  <p className="text-[13px] leading-7 text-edl-500">{t('about', `val${n}Body`, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
