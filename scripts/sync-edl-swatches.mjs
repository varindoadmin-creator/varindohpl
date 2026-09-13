// Mirrors EDL's official swatch images into Cloud Storage, one file per
// product code: gs://varindo-product-images/edl-swatches/<code-slug>.webp,
// which src/lib/productImages.ts points product pages at.
//
// Usage:
//   node scripts/sync-edl-swatches.mjs [out-dir]
// then publish what it wrote (the command is printed at the end).
//
// Source is edleuro.com's public WooCommerce Store API, the same feed
// scripts/sync-edl-catalog.mjs builds the catalogue from. Rerun after the
// catalogue changes; files are overwritten in place.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const CATALOGUE_PATH = 'src/data/edl-products-from-csv.ts';
const STORE_API = 'https://www.edleuro.com/wp-json/wc/store/v1/products';
const BUCKET_PATH = 'gs://varindo-product-images/edl-swatches';
const USER_AGENT = 'VarindoCatalogSync/1.0 (+https://varindohpl.com)';
const CONCURRENCY = 4;
const outDir = process.argv[2] || join(tmpdir(), 'edl-swatches');

// Catalogue codes that EDL lists under a different SKU for the same design.
const SKU_ALIASES = { 'DB 2739B': 'DD 2739B' };

// Must match toSwatchSlug in src/lib/productImages.ts.
function toSwatchSlug(code) {
  return code.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function normalizeSku(sku) {
  return sku.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function readCatalogueCodes() {
  const source = readFileSync(CATALOGUE_PATH, 'utf8');
  // Start at the array literal itself: the first '[' in the file belongs to the `Product[]` annotation.
  const products = JSON.parse(source.slice(source.indexOf('= [') + 2, source.lastIndexOf(']') + 1));
  return [...new Set(products.filter((product) => product.active).map((product) => product.code))];
}

async function fetchStoreProducts() {
  const products = [];
  for (let page = 1; ; page += 1) {
    const response = await fetch(`${STORE_API}?per_page=100&page=${page}`, { headers: { 'User-Agent': USER_AGENT } });
    if (!response.ok) {
      if (response.status === 400) break;
      throw new Error(`EDL Store API failed on page ${page}: ${response.status}`);
    }
    const batch = await response.json();
    products.push(...batch);
    if (batch.length < 100) break;
  }
  return products.filter((product) => product.sku && product.images?.length);
}

// Exact SKUs win. EDL also lists some designs a second time under a suffixed
// SKU (DCW 7404VC-1 is the Panaplast listing of DCW 7404VC), which only fills
// in when no exact listing exists.
function indexBySku(storeProducts) {
  const exact = new Map();
  const suffixed = new Map();
  for (const product of storeProducts) {
    const sku = product.sku.trim();
    const base = sku.replace(/-\d+$/, '');
    if (base === sku) exact.set(normalizeSku(sku), product);
    else if (!suffixed.has(normalizeSku(base))) suffixed.set(normalizeSku(base), product);
  }
  return (code) => {
    const key = normalizeSku(SKU_ALIASES[code] || code);
    return exact.get(key) || suffixed.get(key);
  };
}

async function mirror(code, product) {
  const sourceUrl = product.images[0].src;
  const response = await fetch(sourceUrl, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) {
    throw new Error(`Invalid image for ${code}: ${sourceUrl} (${response.status})`);
  }
  const webp = await sharp(Buffer.from(await response.arrayBuffer()))
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toBuffer();
  writeFileSync(join(outDir, `${toSwatchSlug(code)}.webp`), webp);
  return sourceUrl;
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const [codes, storeProducts] = [readCatalogueCodes(), await fetchStoreProducts()];
  const findProduct = indexBySku(storeProducts);

  const pending = [];
  const missing = [];
  for (const code of codes) {
    const product = findProduct(code);
    if (product) pending.push({ code, product });
    else missing.push(code);
  }
  console.log(`${codes.length} catalogue codes: ${pending.length} have an EDL swatch, ${missing.length} do not.`);

  const manifest = {};
  const failed = [];
  let next = 0;
  async function worker() {
    while (next < pending.length) {
      const { code, product } = pending[next++];
      try {
        manifest[code] = await mirror(code, product);
      } catch (err) {
        failed.push(`${code}: ${err.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  writeFileSync(join(outDir, 'manifest.json'), JSON.stringify({ builtAt: new Date().toISOString(), manifest, missing }, null, 2));

  console.log(`Wrote ${Object.keys(manifest).length} swatches to ${outDir}`);
  if (missing.length) console.log(`No EDL swatch (placeholder tile on the site): ${missing.join(', ')}`);
  if (failed.length) console.log(`Failed, rerun to retry:\n  ${failed.join('\n  ')}`);
  console.log(
    `Publish with:\n  gcloud storage cp '${outDir}/*.webp' ${BUCKET_PATH}/ ` +
    '--cache-control="public, max-age=86400"'
  );
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
