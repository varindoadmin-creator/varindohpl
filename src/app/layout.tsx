import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LangProvider } from '@/lib/LangContext';
import { AiChat } from '@/components/AiChat';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Varindo — Dealer EDL High Pressure Laminates (HPL)',
    template: '%s | Varindo'
  },
  description:
    'Jelajahi produk EDL High Pressure Laminates (HPL) dari Varindo, dealer resmi di Indonesia. Cari kode produk, lihat harga, dan hubungi kami via WhatsApp.',
  metadataBase: new URL('https://varindo.co.id'),
  openGraph: {
    title: 'Varindo — Dealer EDL High Pressure Laminates (HPL)',
    description: 'Jelajahi produk EDL High Pressure Laminates (HPL) dari Varindo di Indonesia.',
    url: 'https://varindo.co.id',
    siteName: 'Varindo',
    locale: 'id_ID',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <LangProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <AiChat />
        </LangProvider>
      </body>
    </html>
  );
}
