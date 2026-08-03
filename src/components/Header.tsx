'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { useLang } from '@/lib/LangContext';
import { t, type Lang } from '@/lib/i18n';

const collectionItems = [
  { key: 'new-arrivals', href: '/collections/new-arrivals' },
  { key: 'best-sellers', href: '/collections/best-sellers' },
  { key: 'woods',        href: '/collections/woods' },
  { key: 'solids',       href: '/collections/solids' },
  { key: 'ecru-core',    href: '/collections/ecru-core' },
  { key: 'patterns',     href: '/collections/patterns' },
  { key: 'marble-stone', href: '/collections/marble-stone' },
  { key: 'metal',        href: '/collections/metal' },
  { key: 'colour-core',  href: '/collections/colour-core' },
  { key: 'aptico-matt',  href: '/collections/aptico-matt' },
];

const collectionLabels: Record<string, { id: string; en: string }> = {
  'new-arrivals': { id: 'Produk Terbaru',  en: 'New Arrivals' },
  'best-sellers': { id: 'Produk Terlaris', en: 'Best Sellers' },
  'woods':        { id: 'Woods',           en: 'Woods' },
  'solids':       { id: 'Solids',          en: 'Solids' },
  'ecru-core':    { id: 'Ecru Core',       en: 'Ecru Core' },
  'patterns':     { id: 'Patterns',        en: 'Patterns' },
  'marble-stone': { id: 'Marble & Stone',  en: 'Marble & Stone' },
  'metal':        { id: 'Metal',           en: 'Metal' },
  'colour-core':  { id: 'Colour Core',     en: 'Colour Core' },
  'aptico-matt':  { id: 'Aptico-Matt',     en: 'Aptico-Matt' },
};

function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-0 border border-edl-line overflow-hidden shrink-0">
      {(['id', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] uppercase transition-colors ${
            lang === l
              ? 'bg-edl-blue text-white'
              : 'bg-white text-edl-600 hover:text-edl-ink'
          }`}
        >
          {l === 'id' ? 'ID' : 'EN'}
        </button>
      ))}
    </div>
  );
}

function HeaderSearch({ onSearch }: { onSearch?: () => void }) {
  const router = useRouter();
  const { lang } = useLang();
  const [search, setSearch] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = search.trim();
    router.push(query ? `/products?search=${encodeURIComponent(query)}` : '/products');
    onSearch?.();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('nav', 'searchPlaceholder', lang)}
        aria-label={t('nav', 'searchPlaceholder', lang)}
        className="h-10 w-full border border-edl-line bg-edl-50 px-4 pr-12 text-[13px] text-edl-ink outline-none transition-all duration-150 placeholder:text-edl-400 focus:border-edl-blue focus:bg-white"
      />
      <button
        type="submit"
        aria-label="Cari"
        className="absolute right-0 top-0 flex h-10 w-11 items-center justify-center bg-edl-blue text-white transition hover:bg-edl-800"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

export function Header() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      {/* Announcement bar — EDL blue */}
      <div className="bg-[#f5e6df] text-center py-2 px-4">
        <p className="text-[10px] tracking-[0.22em] uppercase font-bold text-[#8f5145]">
          {t('nav', 'announcementBar', lang)}
        </p>
      </div>

      <header className={`sticky top-0 z-50 bg-[#fbfaf6]/95 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? 'shadow-[0_12px_40px_rgba(32,48,42,0.07)]' : ''}`}>
        <div className="rule" />

        <div className="shell">
          <div className="flex h-[68px] items-center justify-between gap-6">

            {/* Logo + EDL badge */}
            <Link href="/" className="shrink-0 flex items-center gap-3" aria-label="Varindo EDL">
              <img src="/varindo-logo-transparent.png" alt="CV. Varindo Forma Hutama"
                style={{ width: '76px' }} className="h-auto object-contain" />
              <div className="h-8 w-px bg-edl-line" />
              <img src="/edl-logo-level03.png" alt="EDL"
                style={{ width: '44px' }} className="h-auto object-contain" />
              <span className="hidden sm:block border-l border-edl-line pl-3 text-[9px] font-bold uppercase leading-tight tracking-[0.18em] text-edl-700">
                Authorized<br />Dealer
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.16em] uppercase text-edl-600">
              <Link href="/" className="hover:text-edl-blue transition-colors">
                {t('nav', 'home', lang)}
              </Link>

              <div className="group relative py-6">
                <button className="flex items-center gap-1 hover:text-edl-blue transition-colors cursor-pointer">
                  {t('nav', 'collections', lang)}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="translate-y-px">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 w-52 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 z-[100]">
                  <div className="mt-2 border border-edl-line bg-white shadow-luxury py-1">
                    {collectionItems.map((item) => (
                      <Link key={item.href} href={item.href}
                        className="block px-5 py-3 text-[11px] font-semibold tracking-[0.1em] uppercase text-edl-600 hover:bg-edl-50 hover:text-edl-blue transition-colors">
                        {collectionLabels[item.key][lang]}
                      </Link>
                    ))}
                    <div className="rule mx-4 my-1" />
                    <Link href="/products"
                      className="block px-5 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-edl-blue hover:bg-edl-50 transition-colors">
                      {t('nav', 'allProducts', lang)} →
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/about" className="hover:text-edl-blue transition-colors">
                {t('nav', 'about', lang)}
              </Link>
              <Link href="/contact" className="hover:text-edl-blue transition-colors">
                {t('nav', 'contact', lang)}
              </Link>
            </nav>

            {/* Search */}
            <div className="hidden lg:block min-w-0 flex-1 max-w-xs xl:max-w-sm">
              <HeaderSearch />
            </div>

            {/* Right controls */}
            <div className="hidden sm:flex shrink-0 items-center gap-3">
              <LangSwitcher />
            </div>

            {/* Mobile hamburger */}
            <button type="button" aria-label="Toggle menu" aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] shrink-0">
              <span className={`block h-[2px] w-6 bg-edl-ink transition-all duration-200 ${isOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block h-[2px] w-6 bg-edl-ink transition-all duration-200 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-6 bg-edl-ink transition-all duration-200 ${isOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        <div className="rule" />

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-edl-line animate-fade-in">
            <div className="shell py-4">
              <HeaderSearch onSearch={() => setIsOpen(false)} />
            </div>
            <div className="rule" />
            <nav className="shell py-4">
              {[
                { href: '/',        label: t('nav', 'home', lang) },
                { href: '/products',label: t('nav', 'allProducts', lang) },
                { href: '/about',   label: t('nav', 'about', lang) },
                { href: '/contact', label: t('nav', 'contact', lang) },
              ].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                  className="block py-3 text-[11px] font-bold tracking-[0.18em] uppercase text-edl-600 hover:text-edl-blue transition-colors border-b border-edl-line/50 last:border-0">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="rule" />
            <div className="shell py-4">
              <p className="label mb-3">{t('nav', 'collections', lang)}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {collectionItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                    className="border border-edl-line bg-edl-50 px-3 py-3 text-center text-[10px] font-bold tracking-[0.14em] uppercase text-edl-600 hover:border-edl-blue hover:text-edl-blue transition-colors">
                    {collectionLabels[item.key][lang]}
                  </Link>
                ))}
              </div>
            </div>
            <div className="shell pb-5 pt-2 flex gap-3 items-center">
              <LangSwitcher />
              <a href="https://wa.me/62811945224" target="_blank" rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="btn-primary flex-1 justify-center">
                {t('nav', 'chatWithUs', lang)}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
