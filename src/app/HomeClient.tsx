'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { ProductGrid } from '@/components/ProductGrid';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

type Props = {
  allCount: number;
  newProducts: Product[];
  bestSellers: Product[];
};

// No `tone` any more: a collection is represented by its own material, never
// by a pastel panel that shifts how that material reads.
const collections = [
  { id: 'Produk Terbaru', en: 'New Arrivals',   href: '/collections/new-arrivals', image: '/collections/new-arrivals.png' },
  { id: 'Produk Terlaris', en: 'Best Sellers',  href: '/collections/best-sellers', image: '/collections/best-sellers.png' },
  { id: 'Woods', en: 'Woods',                   href: '/collections/woods',        image: '/collections/woods.png' },
  { id: 'Solids', en: 'Solids',                 href: '/collections/solids',       image: '/collections/solids.png' },
  { id: 'Ecru Core', en: 'Ecru Core',           href: '/collections/ecru-core',    image: '/collections/solids.png' },
  { id: 'Patterns', en: 'Patterns',             href: '/collections/patterns',     image: '/collections/patterns.png' },
  { id: 'Marble & Stone', en: 'Marble & Stone', href: '/collections/marble-stone', image: '/collections/stone.png' },
  { id: 'Metal', en: 'Metal',                   href: '/collections/metal',        image: '/collections/metal.png' },
  { id: 'Colour Core', en: 'Colour Core',       href: '/collections/colour-core',  image: '/collections/solids.png' },
  { id: 'Aptico-Matt', en: 'Aptico-Matt',       href: '/collections/aptico-matt',  image: '/collections/aptico.png' },
];

export function HomeClient({ allCount, newProducts, bestSellers }: Props) {
  const { lang } = useLang();

  const whyItems = [
    { number: '01', title: t('home', 'why1Title', lang), body: t('home', 'why1Body', lang) },
    { number: '02', title: t('home', 'why2Title', lang), body: t('home', 'why2Body', lang) },
    { number: '03', title: t('home', 'why3Title', lang), body: t('home', 'why3Body', lang) },
  ];

  return (
    <div className="bg-edl-paper">

      {/* ── Hero ──────────────────────────────────────────────────
          The material fills the frame. Previously this space was a
          headline beside an empty panel, so the first thing a specifier
          saw was type rather than a surface. */}
      <section className="relative">
        <div className="relative min-h-[78vh] w-full overflow-hidden lg:min-h-[86vh]">
          <Image
            src="/hero-edl-wt-62.jpg"
            alt="Interior finished with timeless EDL decorative surfaces"
            fill
            priority
            quality={82}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-edl-ink/75 via-edl-ink/25 to-edl-ink/10" />

          <div className="absolute inset-0 flex items-end">
            <div className="shell w-full pb-12 sm:pb-16 lg:pb-20">
              <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.24em] text-white/70">
                {t('home', 'heroBadge', lang)}
              </p>
              <h1 className="display max-w-[16ch] text-[clamp(2.75rem,6.2vw,6rem)] text-white">
                {t('home', 'heroLine1', lang)}{' '}
                <span className="italic">{t('home', 'heroLine2', lang)}</span>{' '}
                {t('home', 'heroLine3', lang)}
              </h1>
              <p className="mt-6 max-w-lg text-[14px] leading-7 text-white/75">
                {t('home', 'heroBody', lang)}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/products" className="btn-primary bg-white text-edl-ink hover:bg-edl-paper">
                  {t('home', 'browseCta', lang)}
                </Link>
                <Link href="/request-sample" className="btn-ghost-white">
                  {lang === 'id' ? 'Minta sampel' : 'Request samples'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search ────────────────────────────────────────────── */}
      <section className="shell -mt-px">
        <div className="grid border-b border-edl-line bg-edl-paper sm:grid-cols-[1fr_auto]">
          <form action="/products" className="flex items-center gap-4 py-6">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-edl-400">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              name="search"
              aria-label={t('home', 'quickSearchTitle', lang)}
              placeholder={t('home', 'searchPlaceholder', lang)}
              className="h-10 w-full bg-transparent text-[15px] text-edl-ink outline-none placeholder:text-edl-400"
            />
          </form>
          <div className="hidden items-center sm:flex">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-edl-400">
              {allCount}+ {lang === 'id' ? 'dekor tersedia' : 'decors available'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Collections index ─────────────────────────────────── */}
      <section className="shell py-16 sm:py-24">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-edl-line pb-6">
          <div>
            <p className="label mb-4">{t('home', 'collectionsSectionLabel', lang)}</p>
            <h2 className="display max-w-2xl text-4xl text-edl-ink sm:text-6xl">
              {t('home', 'collectionsSectionTitle', lang)}
            </h2>
          </div>
          <Link href="/products" className="text-link hidden shrink-0 sm:inline-flex">
            {t('home', 'collectionsViewAll', lang)}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-14">
          {collections.map((item, index) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-edl-100">
                <Image
                  src={item.image}
                  alt={`${item[lang]} EDL HPL collection`}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 border border-edl-ink/[0.07] transition-colors duration-300 group-hover:border-edl-ink/25" />
              </div>
              <p className="mt-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-edl-400">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 font-display text-[20px] leading-tight text-edl-ink transition-colors group-hover:text-edl-accent">
                {item[lang]}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Ecru Core ─────────────────────────────────────────── */}
      <section className="border-y border-edl-line bg-edl-raised py-16 sm:py-24">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden bg-edl-100 lg:aspect-[5/6]">
              <Image
                src="/edl-ecru-core-detail.jpg"
                alt="Close-up of an EDL Ecru Core laminate edge"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 border border-edl-ink/[0.07]" />
            </div>

            <div>
              <p className="label mb-5">EDL · Ecru Core</p>
              <h2 className="display max-w-xl text-4xl text-edl-ink sm:text-5xl">
                {lang === 'id' ? (
                  <>Sambungan lebih <span className="italic">bersih</span>, detail lebih menyatu.</>
                ) : (
                  <>Cleaner <span className="italic">joints</span>, a more seamless finish.</>
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
              <Link href="/collections/ecru-core" className="btn-primary mt-9">
                {lang === 'id' ? 'Jelajahi Ecru Core' : 'Explore Ecru Core'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Aptico-Matt ───────────────────────────────────────── */}
      <section className="bg-edl-ink py-16 text-white sm:py-24">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                EDL · Aptico-Matt
              </p>
              <h2 className="display max-w-xl text-4xl sm:text-5xl">
                {lang === 'id' ? (
                  <>Keindahan super-matt yang terasa <span className="italic">istimewa.</span></>
                ) : (
                  <>Super-matt beauty that feels <span className="italic">exceptional.</span></>
                )}
              </h2>
              <p className="mt-7 max-w-xl text-[14px] leading-7 text-white/65">
                {lang === 'id'
                  ? 'Aptico-Matt adalah permukaan premium buatan Austria dengan reflektivitas cahaya rendah, tekstur satin yang hangat, dan perlindungan anti-fingerprint. Gores mikro pada permukaan dapat dipulihkan melalui proses thermal healing.'
                  : 'Aptico-Matt is a premium surface made in Austria with low light reflectivity, a warm satin texture, and anti-fingerprint protection. Superficial micro-scratches can be restored through thermal healing.'}
              </p>

              {/* Spec table rather than tiles: this is the information an
                  architect scans before specifying. */}
              <dl className="mt-10 border-t border-white/15">
                {[
                  { value: 'Austria',          id: 'Dibuat di',                  en: 'Made in' },
                  { value: '1300 × 2800 mm',   id: 'Ukuran lembar',              en: 'Sheet size' },
                  { value: 'Anti-Fingerprint', id: 'Mudah dirawat',              en: 'Easy care' },
                  { value: 'Soft Touch',       id: 'Sentuhan satin',             en: 'Satin feel' },
                  { value: 'Thermal Healing',  id: 'Pemulihan gores mikro',      en: 'Micro-scratch repair' },
                  { value: 'Super Matt',       id: 'Refleksi cahaya rendah',     en: 'Low light reflectivity' },
                ].map((feature) => (
                  <div key={feature.value} className="flex items-baseline justify-between gap-6 border-b border-white/15 py-3.5">
                    <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                      {feature[lang]}
                    </dt>
                    <dd className="spec text-right text-white">{feature.value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/collections/aptico-matt"
                className="btn-primary mt-9 bg-white text-edl-ink hover:bg-edl-paper"
              >
                {lang === 'id' ? 'Jelajahi Aptico-Matt' : 'Explore Aptico-Matt'}
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
              <Image
                src="/edl-aptico-feature.jpg"
                alt="EDL Aptico-Matt super-matt surface palette"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 border border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── New arrivals ──────────────────────────────────────── */}
      {newProducts.length > 0 && (
        <section className="shell py-16 sm:py-24">
          <div className="mb-12 flex items-end justify-between gap-5 border-b border-edl-line pb-6">
            <div>
              <p className="label mb-4">{t('home', 'newArrivalsLabel', lang)}</p>
              <h2 className="display text-4xl text-edl-ink sm:text-6xl">{t('home', 'newArrivalsTitle', lang)}</h2>
            </div>
            <Link href="/collections/new-arrivals" className="text-link hidden shrink-0 sm:inline-flex">
              {t('home', 'viewAll', lang)}
            </Link>
          </div>
          <ProductGrid products={newProducts} />
        </section>
      )}

      {/* ── Best sellers ──────────────────────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="border-t border-edl-line bg-edl-raised py-16 sm:py-24">
          <div className="shell">
            <div className="mb-12 flex items-end justify-between gap-5 border-b border-edl-line pb-6">
              <div>
                <p className="label mb-4">{t('home', 'bestSellersLabel', lang)}</p>
                <h2 className="display text-4xl text-edl-ink sm:text-6xl">{t('home', 'bestSellersTitle', lang)}</h2>
              </div>
              <Link href="/collections/best-sellers" className="text-link hidden shrink-0 sm:inline-flex">
                {t('home', 'viewAll', lang)}
              </Link>
            </div>
            <ProductGrid products={bestSellers} />
          </div>
        </section>
      )}

      {/* ── Portfolio ─────────────────────────────────────────── */}
      <section className="border-t border-edl-line py-16 sm:py-24">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-edl-100">
              <Image
                src="/edl-portfolio-gallery.webp"
                alt="Entrance to the EDL Gallery showcasing decorative surface materials"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 border border-edl-ink/[0.07]" />
            </div>
            <div>
              <p className="label mb-5">{t('home', 'portfolioLabel', lang)}</p>
              <h2 className="display text-4xl text-edl-ink sm:text-5xl">
                {t('home', 'portfolioTitle1', lang)}{' '}
                <span className="italic">{t('home', 'portfolioTitle2', lang)}</span>
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-7 text-edl-600">{t('home', 'portfolioBody', lang)}</p>
              <a
                href="https://drive.google.com/file/d/1et1xnLG8dbYlgOgHWPahwbDQ2JP7c75N/view?usp=drivesdk"
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-9"
              >
                {t('home', 'portfolioCta', lang)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Varindo ───────────────────────────────────────── */}
      <section className="border-t border-edl-line bg-edl-raised py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
          <div>
            <p className="label mb-4">{t('home', 'whyLabel', lang)}</p>
            <h2 className="display text-4xl text-edl-ink sm:text-5xl">
              {t('home', 'whyTitle1', lang)}{' '}
              <span className="italic">{t('home', 'whyTitle2', lang)}</span>
            </h2>
            <p className="mt-6 max-w-md text-[14px] leading-7 text-edl-600">{t('home', 'whyBody', lang)}</p>
            <Link href="/about" className="text-link mt-8">
              {lang === 'id' ? 'Tentang kami' : 'About us'}
            </Link>
          </div>
          <div className="grid gap-px bg-edl-line sm:grid-cols-3">
            {whyItems.map((item) => (
              <article key={item.number} className="bg-edl-raised p-7 sm:p-8">
                <span className="text-[10px] font-medium tracking-[0.18em] text-edl-400">{item.number}</span>
                <h3 className="mt-10 font-display text-[22px] leading-tight text-edl-ink">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-edl-500">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
