import type { Product } from '@/types/product';

const DEFAULT_WA_NUMBER = '62811945224';

export function getWhatsAppNumber() {
  return process.env.NEXT_PUBLIC_VARINDO_WHATSAPP || DEFAULT_WA_NUMBER;
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function buildProductEnquiryMessage() {
  return [
    'Halo Admin Varindo, saya tertarik dengan produk berikut:',
    '',
    'Produk:',
    'Kode:',
    'Harga:',
    '',
    'Terima kasih.',
  ].join('\n');
}

export function buildSampleRequestMessage(product?: Product) {
  if (!product) {
    return [
      'Halo Admin Varindo, saya ingin request sample EDL.',
      '',
      'Kode produk:',
      '1.',
      '2.',
      '3.',
      '',
      'Nama / Perusahaan:',
      'Kota pengiriman:',
      '',
      'Terima kasih.'
    ].join('\n');
  }

  return [
    'Halo Admin Varindo, saya ingin request sample untuk produk berikut:',
    '',
    `Produk: ${product.name}`,
    `Kode: ${product.code}`,
    '',
    'Nama / Perusahaan:',
    'Kota pengiriman:',
    '',
    'Terima kasih.'
  ].join('\n');
}
