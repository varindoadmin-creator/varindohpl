'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Product } from '@/types/product';
import { ProductGrid } from '@/components/ProductGrid';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

type Props = {
  allCount: number;
  newProducts: Product[];
  bestSellers: Product[];
};

const HERO_IMAGES = ['/hero-1.jpg', '/hero-2.jpg'];

export function HomeClient({ newProducts, bestSellers }: Props) {
  const { lang } = useLang();
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const materialCategories = [
    { title: 'Woods',    href: '/collections/woods',    desc: t('home', 'woodsDesc', lang) },
    { title: 'Patterns', href: '/collections/patterns', desc: t('home', 'patternsDesc', lang) },
    { title: 'Solids',   href: '/collections/solids',   desc: t('home', 'solidsDesc', lang) },
  ];

  const whyItems = [
    { title: t('home', 'why1Title', lang), body: t('home', 'why1Body', lang) },
    { title: t('home', 'why2Title', lang), body: t('home', 'why2Body', lang) },
    { title: t('home', 'why3Title', lang), body: t('home', 'why3Body', lang) },
  ];

  return (
    <div>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-edl-ink min-h-[calc(100vh-100px)] flex items-center">
        {/* Background image slider */}
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 -z-10 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url('${src}')`, opacity: i === heroIndex ? 1 : 0 }}
          />
        ))}
        {/* Dark overlay — stronger at left, lighter at right */}
        <div className="absolute inset-0 -z-10 bg-edl-ink/70" />
        <div className="absolute inset-y-0 left-0 -z-10 w-2/3 bg-gradient-to-r from-edl-ink/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-edl-ink to-transparent" />

        {/* Blue accent line — left edge */}
        <div className="absolute left-0 top-0 bottom-0 -z-10 w-1 bg-edl-blue" />

        <div className="shell w-full py-20 lg:py-28">
          <div className="max-w-2xl animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-8 h-[2px] bg-edl-blue" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-edl-blue">
                {t('home', 'heroBadge', lang)}
              </p>
            </div>

            <h1 className="display text-white text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] mb-6 leading-[1.0]">
              {t('home', 'heroLine1', lang)}<br />
              <span className="text-edl-blue">{t('home', 'heroLine2', lang)}</span><br />
              {t('home', 'heroLine3', lang)}
            </h1>

            <p className="text-[15px] leading-8 text-white/60 max-w-md mb-10">
              {t('home', 'heroBody', lang)}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                {t('home', 'browseCta', lang)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUICK SEARCH BANNER ──────────────────────────────── */}
      <section className="bg-edl-blue">
        <div className="shell py-6">
          <form action="/products" className="flex items-center gap-4 max-w-2xl">
            <div className="relative flex-1">
              <input type="search" name="search" aria-label={t('home', 'quickSearchTitle', lang)}
                placeholder={t('home', 'searchPlaceholder', lang)}
                className="h-12 w-full bg-white/10 border border-white/20 text-white px-5 pr-14 text-[13px] outline-none placeholder:text-white/50 focus:bg-white/20 transition-colors" />
              <button type="submit" aria-label="Cari"
                className="absolute right-0 top-0 h-12 w-12 bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ─── MATERIAL CATEGORIES ──────────────────────────────── */}
      <section className="border-b border-edl-line">
        <div className="shell py-16 sm:py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label mb-3">{t('home', 'collectionsSectionLabel', lang)}</p>
              <h2 className="display text-edl-ink text-4xl sm:text-5xl">
                {t('home', 'collectionsSectionTitle', lang)}
              </h2>
            </div>
            <Link href="/products" className="hidden sm:block text-[11px] font-bold tracking-[0.18em] uppercase text-edl-500 hover:text-edl-blue transition-colors">
              {t('home', 'collectionsViewAll', lang)}
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {materialCategories.map((item, i) => (
              <Link key={item.href} href={item.href}
                className="group relative overflow-hidden border border-edl-line bg-edl-50 p-8 hover:border-edl-blue transition-all duration-300">
                {/* Number */}
                <span className="text-[72px] font-black text-edl-line/50 leading-none absolute right-4 top-2 select-none group-hover:text-edl-blue/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10">
                  <div className="w-8 h-[3px] bg-edl-blue mb-5 group-hover:w-12 transition-all duration-300" />
                  <p className="text-[14px] font-bold tracking-[0.15em] uppercase text-edl-ink group-hover:text-edl-blue transition-colors mb-3">
                    {item.title}
                  </p>
                  <p className="text-[13px] leading-6 text-edl-500">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─────────────────────────────────────── */}
      {newProducts.length > 0 && (
        <section className="border-b border-edl-line">
          <div className="shell py-16 sm:py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="label mb-3">{t('home', 'newArrivalsLabel', lang)}</p>
                <h2 className="display text-edl-ink text-4xl sm:text-5xl">{t('home', 'newArrivalsTitle', lang)}</h2>
                <p className="mt-3 text-[14px] leading-7 text-edl-500 max-w-lg">{t('home', 'newArrivalsBody', lang)}</p>
              </div>
              <Link href="/collections/new-arrivals" className="hidden sm:block text-[11px] font-bold tracking-[0.18em] uppercase text-edl-500 hover:text-edl-blue transition-colors shrink-0 ml-6">
                {t('home', 'viewAll', lang)}
              </Link>
            </div>
            <ProductGrid products={newProducts} />
          </div>
        </section>
      )}

      {/* ─── BEST SELLERS ─────────────────────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="border-b border-edl-line bg-edl-50">
          <div className="shell py-16 sm:py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="label mb-3">{t('home', 'bestSellersLabel', lang)}</p>
                <h2 className="display text-edl-ink text-4xl sm:text-5xl">{t('home', 'bestSellersTitle', lang)}</h2>
                <p className="mt-3 text-[14px] leading-7 text-edl-500 max-w-lg">{t('home', 'bestSellersBody', lang)}</p>
              </div>
              <Link href="/collections/best-sellers" className="hidden sm:block text-[11px] font-bold tracking-[0.18em] uppercase text-edl-500 hover:text-edl-blue transition-colors shrink-0 ml-6">
                {t('home', 'viewAll', lang)}
              </Link>
            </div>
            <ProductGrid products={bestSellers} />
          </div>
        </section>
      )}

      {/* ─── CATALOGUE CTA ────────────────────────────────────── */}
      <section>
        <div className="grid lg:grid-cols-2 min-h-[440px]">
          {/* Image side */}
          <div className="relative min-h-[280px] bg-cover bg-center order-last lg:order-first"
            style={{ backgroundImage: "url('/edl-catalogue-cover.png')" }}>
            <div className="absolute inset-0 bg-edl-ink/30" />
            {/* Blue accent corner */}
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-edl-blue" />
          </div>
          {/* Text side */}
          <div className="bg-edl-ink text-white flex flex-col justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-[2px] bg-edl-blue" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-edl-blue">
                {t('home', 'portfolioLabel', lang)}
              </p>
            </div>
            <h2 className="display text-white text-4xl sm:text-5xl mb-5">
              {t('home', 'portfolioTitle1', lang)}<br />
              <span className="text-edl-blue">{t('home', 'portfolioTitle2', lang)}</span>
            </h2>
            <p className="text-[14px] leading-7 text-edl-400 max-w-sm mb-8">
              {t('home', 'portfolioBody', lang)}
            </p>
            <a href="https://drive.google.com/file/d/161NVWNlVrvxJilA47iud-IOdrdDnbQ6r/view?usp=sharing" target="_blank" rel="noreferrer"
              className="btn-primary self-start">
              {t('home', 'portfolioCta', lang)}
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHY VARINDO ──────────────────────────────────────── */}
      <section className="border-t border-edl-line bg-white">
        <div className="shell py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <p className="label mb-4">{t('home', 'whyLabel', lang)}</p>
              <h2 className="display text-edl-ink text-4xl sm:text-5xl mb-5">
                {t('home', 'whyTitle1', lang)}<br />
                <span className="text-edl-blue">{t('home', 'whyTitle2', lang)}</span>
              </h2>
              <p className="text-[14px] leading-7 text-edl-500 max-w-md mb-8">
                {t('home', 'whyBody', lang)}
              </p>
              <Link href="/about" className="btn-ghost self-start">
                {lang === 'id' ? 'Tentang Kami' : 'About Us'}
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {whyItems.map((item, i) => (
                <div key={item.title} className="border border-edl-line bg-edl-50 p-6 relative overflow-hidden">
                  <span className="absolute right-4 top-2 text-[48px] font-black text-edl-line/70 leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative z-10">
                    <div className="w-6 h-[3px] bg-edl-blue mb-4" />
                    <h3 className="text-[13px] font-bold text-edl-ink mb-2">{item.title}</h3>
                    <p className="text-[12px] leading-6 text-edl-500">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
