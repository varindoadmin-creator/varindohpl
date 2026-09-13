/**
 * EDL swatch images, served from Cloud Storage.
 *
 * Mirrored from edleuro.com by scripts/sync-edl-swatches.mjs into
 * gs://varindo-product-images/edl-swatches, one file per product code. EDL
 * gives each product code its own swatch, so the code is the key. A code with
 * no swatch 404s and ProductImage falls back to the "image coming soon" tile.
 */

const BUCKET_BASE = 'https://storage.googleapis.com/varindo-product-images/edl-swatches';

// Must match toSwatchSlug in scripts/sync-edl-swatches.mjs: DA 2081N -> da-2081n.
export function toSwatchSlug(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getSwatchUrl(code?: string | null) {
  const slug = code ? toSwatchSlug(code) : '';
  return slug ? `${BUCKET_BASE}/${slug}.webp` : '';
}

export function getSwatchUrlCandidates(code?: string | null) {
  const url = getSwatchUrl(code);
  return url ? [url] : [];
}
