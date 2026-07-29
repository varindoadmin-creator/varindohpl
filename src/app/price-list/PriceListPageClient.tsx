'use client';

import { useLang } from '@/lib/LangContext';
import { PriceListForm } from './PriceListForm';

export function PriceListPageClient() {
  const { lang } = useLang();

  return (
    <div>
      <div className="relative overflow-hidden bg-[#e9e2ef]">
        <div className="shell py-14 sm:py-20">
          <p className="label mb-4">
            {lang === 'id' ? 'EDL · Informasi Harga' : 'EDL · Price Information'}
          </p>
          <h1 className="display whitespace-pre-line text-5xl text-edl-ink sm:text-7xl lg:text-8xl">
            {lang === 'id' ? 'Daftar Harga' : 'Price List'}
          </h1>
          <p className="mt-5 max-w-lg text-[14px] leading-7 text-edl-400">
            {lang === 'id'
              ? 'Lengkapi data Anda untuk mengakses daftar harga EDL terbaru.'
              : 'Complete your details to access the latest EDL price list.'}
          </p>
        </div>
      </div>
      <div className="shell max-w-3xl py-12 sm:py-16">
        <PriceListForm />
      </div>
    </div>
  );
}
