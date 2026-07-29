'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

const priceListUrl = 'https://drive.google.com/file/d/14xPAOciP7F7gTGNA-dFGAh1zFDyDeI-U/view?usp=sharing';

export default function PriceListDownloadPage() {
  const { lang } = useLang();
  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-2xl border border-edl-line bg-white text-center">
        <div className="bg-[#e9e2ef] px-8 py-12">
          <p className="label mb-4">{lang === 'id' ? 'Akses Diberikan' : 'Access Granted'}</p>
          <h1 className="display text-4xl text-edl-ink sm:text-6xl">
            {lang === 'id' ? 'Daftar Harga EDL' : 'EDL Price List'}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[14px] leading-7 text-edl-500">
            {lang === 'id'
              ? 'Terima kasih. Daftar harga terbaru siap dibuka melalui Google Drive.'
              : 'Thank you. The latest price list is ready to open through Google Drive.'}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 px-8 py-8 sm:flex-row sm:justify-center">
          <a href={priceListUrl} target="_blank" rel="noreferrer" className="btn-ink">
            {lang === 'id' ? 'Unduh Daftar Harga' : 'Download Price List'} ↗
          </a>
          <Link href="/products" className="btn-ghost">
            {lang === 'id' ? 'Lihat Produk' : 'Browse Products'}
          </Link>
        </div>
      </div>
    </div>
  );
}
