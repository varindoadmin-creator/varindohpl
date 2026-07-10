import type { Metadata } from 'next';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Request EDL Catalog',
  description: 'Request EDL catalog information from Varindo.'
};

export default function RequestCatalogPage() {
  const message = [
    'Halo Admin Varindo, saya ingin request katalog EDL.',
    '',
    'Nama / Perusahaan:',
    'Kota:',
    'Kebutuhan produk:',
    '',
    'Terima kasih.'
  ].join('\n');

  const whatsappUrl = buildWhatsAppUrl(message);

  return (
    <div>
      <div className="bg-edl-ink text-white border-b border-edl-800">
        <div className="shell py-14 sm:py-20">
          <p className="label text-edl-400 mb-4">Catalog Request</p>
          <h1 className="display text-white text-5xl sm:text-6xl lg:text-7xl">
            Request the<br />EDL Catalog
          </h1>
        </div>
      </div>

      <div className="shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start max-w-5xl">
          <div>
            <p className="text-[14px] leading-8 text-edl-500 max-w-md">
              Request EDL catalog information from Varindo through WhatsApp. Admin Varindo will help provide the most relevant product information based on your needs.
            </p>
          </div>
          <div className="border border-edl-line bg-white">
            <div className="border-b border-edl-line px-6 py-4 bg-edl-50">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-edl-700">Recommended Details</p>
            </div>
            <div className="p-6 grid gap-px bg-edl-line border border-edl-line sm:grid-cols-2 mb-6">
              {[
                'Name or company name',
                'City / project location',
                'Product usage or project type',
                'Preferred designs or product codes, if any'
              ].map((item) => (
                <div key={item} className="bg-white p-4">
                  <div className="w-4 h-[1.5px] bg-edl-blue mb-2" />
                  <p className="text-[12px] font-medium text-edl-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-ink w-full justify-center">
                Request via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
