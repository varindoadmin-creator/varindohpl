import { RequestCataloguePage } from './RequestCataloguePageClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Minta Katalog EDL',
  description: 'Ajukan permintaan katalog EDL terbaru kepada Varindo untuk referensi desain HPL dan proyek interior Anda.',
  alternates: { canonical: '/request-catalogue' },
};

export default function Page() {
  return <RequestCataloguePage />;
}
