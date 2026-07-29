import type { Metadata } from 'next';
import { PriceListForm } from './PriceListForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'EDL Price List',
  description: 'Request access to the latest EDL price list from Varindo.',
};

export default function PriceListPage() {
  return (
    <div>
      <div className="relative overflow-hidden bg-[#e9e2ef]">
        <div className="shell py-14 sm:py-20">
          <p className="label mb-4">EDL · Price Information</p>
          <h1 className="display whitespace-pre-line text-5xl text-edl-ink sm:text-7xl lg:text-8xl">
            Price List{'\n'}Daftar Harga
          </h1>
          <p className="mt-5 max-w-lg text-[14px] leading-7 text-edl-400">
            Complete your details to access the latest EDL price list.
          </p>
        </div>
      </div>
      <div className="shell max-w-3xl py-12 sm:py-16">
        <PriceListForm />
      </div>
    </div>
  );
}
