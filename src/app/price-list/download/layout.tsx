import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unduh Daftar Harga EDL',
  robots: { index: false, follow: false },
};

export default function PriceListDownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
