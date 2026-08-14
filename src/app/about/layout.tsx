import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Varindo — Dealer Resmi EDL Indonesia',
  description: 'Kenali CV. Varindo Forma Hutama, dealer resmi EDL High Pressure Laminates di Indonesia untuk kebutuhan interior dan proyek profesional.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
