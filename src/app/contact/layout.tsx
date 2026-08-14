import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak Varindo',
  description: 'Hubungi Varindo untuk produk EDL HPL, harga, stok, sampel, katalog, dan pengiriman ke seluruh Indonesia.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
