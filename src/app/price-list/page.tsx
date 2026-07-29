import type { Metadata } from 'next';
import { PriceListPageClient } from './PriceListPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'EDL Price List',
  description: 'Request access to the latest EDL price list from Varindo.',
};

export default function PriceListPage() {
  return <PriceListPageClient />;
}
