import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LangProvider } from '@/lib/LangContext';
import { AiChat } from '@/components/AiChat';

export const metadata: Metadata = {
  title: {
    default: 'Varindo — Dealer EDL High Pressure Laminates (HPL)',
    template: '%s | Varindo'
  },
  description:
    'Jelajahi produk EDL High Pressure Laminates (HPL) dari Varindo, dealer resmi di Indonesia. Cari kode produk, lihat harga, dan hubungi kami via WhatsApp.',
  metadataBase: new URL('https://varindohpl.com'),
  alternates: {
    canonical: '/',
  },
  keywords: ['EDL HPL', 'EDL Indonesia', 'dealer EDL Indonesia', 'HPL Indonesia', 'laminate interior'],
  authors: [{ name: 'CV. Varindo Forma Hutama' }],
  creator: 'CV. Varindo Forma Hutama',
  publisher: 'CV. Varindo Forma Hutama',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Varindo — Dealer EDL High Pressure Laminates (HPL)',
    description: 'Jelajahi produk EDL High Pressure Laminates (HPL) dari Varindo di Indonesia.',
    url: 'https://varindohpl.com',
    siteName: 'Varindo',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/hero-edl-wt-62.jpg', width: 1060, height: 796, alt: 'EDL decorative laminates by Varindo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varindo — Dealer EDL High Pressure Laminates (HPL)',
    description: 'Katalog EDL HPL Indonesia dengan harga, spesifikasi, sampel, dan dukungan pengiriman.',
    images: ['/hero-edl-wt-62.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://varindohpl.com/#organization',
    name: 'CV. Varindo Forma Hutama',
    alternateName: 'Varindo',
    url: 'https://varindohpl.com',
    logo: 'https://varindohpl.com/varindo-logo-transparent.png',
    email: 'varindo.admin@gmail.com',
    telephone: '+62-811-945-224',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Branz BSD Tower A Unit 3310, Jl. BSD Boulevard Parcel 55-F',
      addressLocality: 'Tangerang',
      addressRegion: 'Banten',
      postalCode: '15339',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-811-945-224',
      contactType: 'sales',
      areaServed: 'ID',
      availableLanguage: ['Indonesian', 'English'],
    },
  };
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://varindohpl.com/#website',
    url: 'https://varindohpl.com',
    name: 'Varindo EDL HPL Indonesia',
    publisher: { '@id': 'https://varindohpl.com/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://varindohpl.com/products?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="id">
      <body className="min-h-screen font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, '\\u003c') }} />
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
