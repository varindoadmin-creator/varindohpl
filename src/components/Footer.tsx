'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

export function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-edl-ink text-white">
      {/* Top accent bar */}
      <div className="h-1 bg-edl-blue" />

      <div className="shell pt-14 pb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src="/varindo-logo-transparent.png" alt="Varindo"
              style={{ width: '72px', filter: 'brightness(0) invert(1)' }}
              className="h-auto object-contain opacity-80" />
            <div className="h-8 w-px bg-white/20" />
            <img src="/edl-logo.png" alt="EDL"
              style={{ width: '42px', filter: 'brightness(0) invert(1)' }}
              className="h-auto object-contain opacity-80" />
            <p className="border-l border-white/20 pl-3 text-[9px] font-bold uppercase leading-tight tracking-[0.18em] text-white/80">
              Authorized<br />Dealer
            </p>
          </div>
          <p className="text-[13px] leading-7 text-edl-400 max-w-xs">
            {t('footer', 'tagline', lang)}
          </p>
        </div>

        {/* Collections */}
        <div>
          <p className="label text-edl-500 mb-5">{t('footer', 'collections', lang)}</p>
          <ul className="space-y-3">
            {[
              { href: '/collections/new-arrivals', id: 'Produk Terbaru',  en: 'New Arrivals' },
              { href: '/collections/best-sellers', id: 'Produk Terlaris', en: 'Best Sellers' },
              { href: '/collections/woods',        id: 'Woods',           en: 'Woods' },
              { href: '/collections/solids',       id: 'Solids',          en: 'Solids' },
              { href: '/collections/ecru-core',    id: 'Ecru Core',       en: 'Ecru Core' },
              { href: '/collections/patterns',     id: 'Patterns',        en: 'Patterns' },
              { href: '/collections/marble-stone', id: 'Marble & Stone',  en: 'Marble & Stone' },
              { href: '/collections/metal',        id: 'Metal',           en: 'Metal' },
              { href: '/collections/colour-core',  id: 'Colour Core',     en: 'Colour Core' },
              { href: '/collections/aptico-matt',  id: 'Aptico-Matt',     en: 'Aptico-Matt' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[13px] text-edl-400 hover:text-white transition-colors">
                  {item[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="label text-edl-500 mb-5">{t('footer', 'company', lang)}</p>
          <ul className="space-y-3">
            {[
              { href: '/about',              label: t('footer', 'aboutLink', lang) },
              { href: '/contact',            label: t('footer', 'contactLink', lang) },
              { href: '/price-list',         label: lang === 'id' ? 'Daftar Harga' : 'Price List' },
              { href: '/request-catalogue',  label: t('footer', 'catalogueLink', lang) },
              { href: '/request-quote',      label: t('footer', 'quoteLink', lang) },
              { href: '/request-sample',     label: t('footer', 'sampleLink', lang) },
              { href: '/privacy',            label: lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[13px] text-edl-400 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="label text-edl-500 mb-5">{t('footer', 'contact', lang)}</p>
          <address className="not-italic space-y-3">
            <p className="text-[13px] text-edl-400">
              <span className="block text-edl-500 text-[10px] tracking-[0.16em] uppercase mb-1">
                {t('footer', 'phone', lang)}
              </span>
              0811 945 224
            </p>
            <p className="text-[13px] text-edl-400">
              <span className="block text-edl-500 text-[10px] tracking-[0.16em] uppercase mb-1">Email</span>
              varindo.admin@gmail.com
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="shell py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[11px] text-edl-600">
            {t('footer', 'copyright', lang, { year })}
          </p>
          <p className="text-[11px] text-edl-600">
            {t('footer', 'dealerBadge', lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}
