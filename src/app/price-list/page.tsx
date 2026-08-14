import type { Metadata } from 'next';
import { PriceListPageClient } from './PriceListPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Daftar Harga EDL HPL',
  description: 'Ajukan akses ke daftar harga EDL HPL terbaru dari Varindo. Harga produk pada website ditampilkan termasuk PPN.',
  alternates: { canonical: '/price-list' },
};

export default function PriceListPage() {
  return <PriceListPageClient />;
}
