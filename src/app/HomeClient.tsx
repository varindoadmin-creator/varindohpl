'use client';

import Link from 'next/link';
import type { Product } from '@/types/product';
import { ProductGrid } from '@/components/ProductGrid';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

type Props = {
  allCount: number;
  newProducts: Product[];
  bestSellers: Product[];
};

const collections = [
  { id: 'Produk Terbaru', en: 'New Arrivals', href: '/collections/new-arrivals', image: '/collections/new-arrivals.png', tone: 'bg-[#f4d8cc]' },
  { id: 'Produk Terlaris', en: 'Best Sellers', href: '/collections/best-sellers', image: '/collections/best-sellers.png', tone: 'bg-[#e9e2ef]' },
  { id: 'Woods', en: 'Woods', href: '/collections/woods', image: '/collections/woods.png', tone: 'bg-[#dce8d8]' },
  { id: 'Solids', en: 'Solids', href: '/collections/solids', image: '/collections/solids.png', tone: 'bg-[#f4d8cc]' },
  { id: 'Ecru Core', en: 'Ecru Core', href: '/collections/ecru-core', image: '/collections/solids.png', tone: 'bg-[#eee5dc]' },
  { id: 'Patterns', en: 'Patterns', href: '/collections/patterns', image: '/collections/patterns.png', tone: 'bg-[#e7dff0]' },
  { id: 'Marble & Stone', en: 'Marble & Stone', href: '/collections/marble-stone', image: '/collections/stone.png', tone: 'bg-[#e5e9e3]' },
  { id: 'Metal', en: 'Metal', href: '/collections/metal', image: '/collections/metal.png', tone: 'bg-[#dde5e8]' },
  { id: 'Colour Core', en: 'Colour Core', href: '/collections/colour-core', image: '/collections/solids.png', tone: 'bg-[#f4d8cc]' },
  { id: 'Aptico-Matt', en: 'Aptico-Matt', href: '/collections/aptico-matt', image: '/collections/aptico.png', tone: 'bg-[#e8e3d3]' },
];

export function HomeClient({ allCount, newProducts, bestSellers }: Props) {
  const { lang } = useLang();

  const whyItems = [
    { number: '01', title: t('home', 'why1Title', lang), body: t('home', 'why1Body', lang) },
    { number: '02', title: t('home', 'why2Title', lang), body: t('home', 'why2Body', lang) },
    { number: '03', title: t('home', 'why3Title', lang), body: t('home', 'why3Body', lang) },
  ];

  return (
    <div className="overflow-hidden bg-[#fbfaf6]">
      <section className="shell pt-5 sm:pt-8">
        <div className="relative min-h-[680px] overflow-hidden rounded-[2rem] bg-[#e7eee6] lg:min-h-[720px]">
          <div className="grid min-h-[inherit] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-16">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef785f]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-edl-700">
                  {t('home', 'heroBadge', lang)}
                </p>
              </div>
              <h1 className="display max-w-[650px] text-[clamp(3.5rem,7vw,7.8rem)] leading-[0.84] text-edl-ink">
                {t('home', 'heroLine1', lang)}
                <span className="block font-serif font-normal italic text-[#4f765f]">{t('home', 'heroLine2', lang)}</span>
                {t('home', 'heroLine3', lang)}
              </h1>
              <p className="mt-8 max-w-md text-[15px] leading-7 text-edl-600">
                {t('home', 'heroBody', lang)}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/products" className="btn-primary">{t('home', 'browseCta', lang)}</Link>
                <Link href="/request-sample" className="btn-ghost">
                  {lang === 'id' ? 'Minta sampel' : 'Request samples'}
                </Link>
              </div>
            </div>

            <div className="relative min-h-[400px] overflow-hidden lg:m-4 lg:ml-0 lg:rounded-[1.5rem]">
              <div className="absolute inset-0 bg-[url('/hero-edl-wt-62.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-edl-ink/20 via-transparent to-white/10" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between rounded-2xl border border-white/40 bg-white/80 p-5 shadow-lg backdrop-blur-md">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-edl-500">
                    {lang === 'id' ? 'Jelajahi permukaan' : 'Explore the surface'}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-edl-ink">EDL Woods Collection</p>
                </div>
                <Link href="/collections/woods" aria-label="Woods collection" className="grid h-11 w-11 place-items-center rounded-full bg-edl-ink text-xl text-white transition-transform hover:rotate-[-12deg]">↗</Link>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -left-10 bottom-8 h-32 w-32 rounded-full bg-[#f3c6b6]/60 blur-3xl" />
        </div>
      </section>

      <section className="shell py-10">
        <div className="grid overflow-hidden rounded-2xl border border-edl-line bg-white sm:grid-cols-[1fr_auto]">
          <form action="/products" className="flex items-center px-5 sm:px-8">
            <span className="mr-4 text-xl text-edl-400">⌕</span>
            <input
              type="search"
              name="search"
              aria-label={t('home', 'quickSearchTitle', lang)}
              placeholder={t('home', 'searchPlaceholder', lang)}
              className="h-20 w-full bg-transparent text-[15px] text-edl-ink outline-none placeholder:text-edl-400"
            />
          </form>
          <div className="hidden items-center border-l border-edl-line px-8 text-right sm:flex">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-edl-400">
              {allCount}+ {lang === 'id' ? 'dekor tersedia' : 'decors available'}
            </p>
          </div>
        </div>
      </section>

      <section className="shell py-14 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="label mb-3">{t('home', 'collectionsSectionLabel', lang)}</p>
            <h2 className="display max-w-2xl text-4xl text-edl-ink sm:text-6xl">
              {t('home', 'collectionsSectionTitle', lang)}
            </h2>
          </div>
          <Link href="/products" className="text-link hidden sm:inline-flex">{t('home', 'collectionsViewAll', lang)} ↗</Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {collections.map((item, index) => (
            <Link key={item.href} href={item.href} className={`group relative min-h-[480px] overflow-hidden rounded-[1.6rem] ${item.tone}`}>
              <div className="absolute inset-x-3 top-3 h-[70%] overflow-hidden rounded-[1.2rem]">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${item.image}')` }} />
              </div>
              <div className="absolute inset-x-7 bottom-7 flex items-end justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-edl-500">{String(index + 1).padStart(2, '0')} / Material</p>
                  <h3 className="display text-3xl text-edl-ink sm:text-4xl">{item[lang]}</h3>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-edl-ink transition-transform group-hover:rotate-45">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#eee8d8] py-16 sm:py-24">
        <div className="shell">
          <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-white sm:min-h-[640px]">
              <div className="absolute inset-0 bg-[url('/edl-ecru-core-detail.jpg')] bg-cover bg-center" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-edl-ink/40 to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-full border border-white/50 bg-white/85 px-4 py-2 backdrop-blur-md">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-edl-700">
                  {lang === 'id' ? 'Detail Ecru Core' : 'Ecru Core detail'}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-[2rem] bg-[#fffdf7] px-7 py-12 sm:px-12 lg:px-16">
              <p className="label mb-5">EDL · Ecru Core</p>
              <h2 className="display max-w-2xl text-4xl leading-[0.95] text-edl-ink sm:text-6xl">
                {lang === 'id' ? (
                  <>Sambungan lebih <span className="font-serif font-normal italic text-[#9b7b2f]">bersih</span>, detail lebih menyatu.</>
                ) : (
                  <>Cleaner <span className="font-serif font-normal italic text-[#9b7b2f]">joints</span>, a more seamless finish.</>
                )}
              </h2>
              <p className="mt-7 max-w-xl text-[14px] leading-7 text-edl-600">
                {lang === 'id'
                  ? 'Ecru Core adalah pilihan core khusus untuk HPL EDL yang mengurangi garis gelap atau warna yang tidak serasi pada bagian tepi. Hasilnya adalah sambungan yang tampak lebih bersih dan seragam untuk kabinet serta furnitur interior modern.'
                  : 'Ecru Core is a specialized core option for EDL high-pressure laminates that reduces dark or mismatched lines at exposed edges. The result is cleaner, more uniform joint detailing for modern interior cabinetry and furniture.'}
              </p>
              <p className="mt-4 max-w-xl text-[13px] leading-6 text-edl-500">
                {lang === 'id'
                  ? 'Dikembangkan sebagai solusi di antara standard core dan colour core, teknologi ini mengurangi garis sambungan secara nyata dengan biaya yang lebih terjangkau—tanpa mengorbankan desain. Tersedia pada pilihan dekor solids dan woods.'
                  : 'Developed between standard core and colour core, this technology noticeably and affordably reduces visible lines without compromising good design. Available in selected solids and woods.'}
              </p>
              <Link href="/collections/ecru-core" className="btn-primary mt-8 self-start">
                {lang === 'id' ? 'Jelajahi Ecru Core' : 'Explore Ecru Core'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {newProducts.length > 0 && (
        <section className="bg-[#edf2ea] py-16 sm:py-24">
          <div className="shell">
            <div className="mb-10 flex items-end justify-between gap-5">
              <div>
                <p className="label mb-3">{t('home', 'newArrivalsLabel', lang)}</p>
                <h2 className="display text-4xl text-edl-ink sm:text-6xl">{t('home', 'newArrivalsTitle', lang)}</h2>
              </div>
              <Link href="/collections/new-arrivals" className="text-link hidden sm:inline-flex">{t('home', 'viewAll', lang)} ↗</Link>
            </div>
            <ProductGrid products={newProducts} />
          </div>
        </section>
      )}

      {bestSellers.length > 0 && (
        <section className="shell py-16 sm:py-24">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="label mb-3">{t('home', 'bestSellersLabel', lang)}</p>
              <h2 className="display text-4xl text-edl-ink sm:text-6xl">{t('home', 'bestSellersTitle', lang)}</h2>
            </div>
            <Link href="/collections/best-sellers" className="text-link hidden sm:inline-flex">{t('home', 'viewAll', lang)} ↗</Link>
          </div>
          <ProductGrid products={bestSellers} />
        </section>
      )}

      <section className="shell pb-16 sm:pb-24">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#e9e2ef] lg:grid-cols-2">
          <div className="min-h-[420px] bg-[url('/edl-catalogue-2027-cover.jpg')] bg-cover bg-center" />
          <div className="flex flex-col justify-center px-8 py-14 sm:px-14 lg:px-16">
            <p className="label mb-5">{t('home', 'portfolioLabel', lang)}</p>
            <h2 className="display text-4xl text-edl-ink sm:text-6xl">
              {t('home', 'portfolioTitle1', lang)} <span className="font-serif font-normal italic text-[#745f83]">{t('home', 'portfolioTitle2', lang)}</span>
            </h2>
            <p className="mt-6 max-w-md text-[14px] leading-7 text-edl-600">{t('home', 'portfolioBody', lang)}</p>
            <a href="https://drive.google.com/file/d/1et1xnLG8dbYlgOgHWPahwbDQ2JP7c75N/view?usp=drivesdk" target="_blank" rel="noreferrer" className="btn-primary mt-8 self-start">
              {t('home', 'portfolioCta', lang)}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f5e6df] py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.4fr]">
          <div>
            <p className="label mb-4">{t('home', 'whyLabel', lang)}</p>
            <h2 className="display text-4xl text-edl-ink sm:text-6xl">
              {t('home', 'whyTitle1', lang)} <span className="font-serif font-normal italic text-[#b65f4f]">{t('home', 'whyTitle2', lang)}</span>
            </h2>
            <p className="mt-6 max-w-md text-[14px] leading-7 text-edl-600">{t('home', 'whyBody', lang)}</p>
            <Link href="/about" className="text-link mt-7 inline-flex">{lang === 'id' ? 'Tentang kami' : 'About us'} ↗</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {whyItems.map((item) => (
              <article key={item.number} className="rounded-[1.4rem] bg-white/75 p-6 backdrop-blur-sm">
                <span className="text-xs font-bold text-[#d07562]">{item.number}</span>
                <h3 className="mt-12 text-lg font-semibold text-edl-ink">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-edl-500">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
