import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi situs Varindo dan penanganan data untuk permintaan produk, sampel, penawaran, katalog, dan daftar harga.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
