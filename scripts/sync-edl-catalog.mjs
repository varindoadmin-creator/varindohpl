import { readFileSync, writeFileSync } from 'node:fs';

// Updates the catalogue CSV only. Swatch images are mirrored separately by
// scripts/sync-edl-swatches.mjs — run it after this when products are added.

const CSV_PATH = 'public/data/edl-products.csv';

const excludedSkus = new Set([
  'N-AP 46130V',
  'T-WN 425N',
  'DMD 2551XM',
  'DMD 2553XM',
  'LS 0757FX',
  'LS 0751FX',
  'LS 0752FX',
  'LS 0660FX',
  'EO 1203HG',
  'EO 1205HG',
  'EV 5001G',
  'EV 5002G',
  'EK 2818Q',
]);

const specificationGroups = [
  { prefixes: ['ESG'], rate: 600000, size: '1220 x 2440 mm', thickness: '0.7mm' },
  { prefixes: ['DSK', 'DST', 'ESF'], rate: 650000, size: '1220 x 2440 mm', thickness: '0.7mm' },
  { prefixes: ['EEG'], rate: 650000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['EEP', 'EEH'], rate: 710000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { prefixes: ['DB'], rate: 700000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['DWA'], rate: 730000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['ENS'], rate: 810000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['ESS'], rate: 720000, size: '1250 x 2500 mm', thickness: '0.8mm' },
  { prefixes: ['DSF', 'EST'], rate: 890000, size: '1320 x 3050 mm', thickness: '0.8mm' },
  { prefixes: ['DYN'], rate: 780000, size: '1300 x 3050 mm', thickness: '0.8mm' },
  { prefixes: ['DYG'], rate: 870000, size: '1300 x 3050 mm', thickness: '1.0mm' },
  { prefixes: ['DYM'], rate: 3200000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { prefixes: ['EWW'], rate: 680000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['DWK', 'DWT', 'DWW', 'DWX', 'EWD', 'EWN', 'EWP', 'EWY'], rate: 710000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['DWE', 'DWD', 'DWM'], rate: 730000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['DWC'], rate: 980000, size: '1300 x 3050 mm', thickness: '0.8mm' },
  { prefixes: ['DSW'], rate: 990000, size: '1320 x 3050 mm', thickness: '0.8mm' },
  { prefixes: ['DWL', 'DWV'], rate: 1100000, size: '1300 x 3050 mm', thickness: '0.8mm' },
  { prefixes: ['L-YW', 'L-YP', 'L-YS'], rate: 980000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['L-YM'], rate: 1100000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['L-MG'], rate: 1100000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { prefixes: ['DD', 'EGG', 'ELB', 'ELC'], rate: 700000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['DA', 'ELS'], rate: 730000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['ERS'], rate: 800000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { prefixes: ['DMS'], rate: 750000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['DH', 'DY', 'DZ'], rate: 780000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['DX'], rate: 780000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { prefixes: ['DHT'], rate: 920000, size: '1300 x 3050 mm', thickness: '0.8mm' },
  { prefixes: ['DC', 'DS', 'DV', 'DSL', 'DSD'], rate: 1100000, size: '1300 x 3050 mm', thickness: '0.8mm' },
  { prefixes: ['EMS'], rate: 1450000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['EMB', 'EMM', 'EMT'], rate: 2000000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['EME'], rate: 3900000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { prefixes: ['DMA'], rate: 4200000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { prefixes: ['DMB'], rate: 4350000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { prefixes: ['DDM'], rate: 4400000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { prefixes: ['DMC'], rate: 6900000, size: '1220 x 2440 mm', thickness: '1.5mm' },
  { prefixes: ['ECG', 'ECV'], rate: 2000000, size: '1220 x 2440 mm', thickness: '0.9mm' },
  { prefixes: ['DCW', 'DPC'], rate: 2300000, size: '1220 x 2440 mm', thickness: '0.9mm' },
  { prefixes: ['L-FA'], rate: 3500000, size: '1300 x 2800 mm', thickness: '1.0mm' },
];

const specifications = new Map();
for (const group of specificationGroups) {
  for (const prefix of group.prefixes) specifications.set(prefix, group);
}

function parseCsvLine(line) {
  const values = [];
  let value = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      values.push(value.trim());
      value = '';
    } else {
      value += character;
    }
  }
  values.push(value.trim());
  return values;
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function normalize(value) {
  return (value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function prefixOf(sku) {
  return sku.trim().split(/\s+/)[0].toUpperCase();
}

function collectionFor(product) {
  const names = new Set(product.categories.map((category) => category.name));
  if (names.has('Aptico')) return 'Aptico';
  if (names.has('Metal')) return 'Metal';
  if (names.has('Wood')) return 'Wood';
  if (names.has('Solid')) return 'Solid';
  if (names.has('Marble')) return 'Marble';
  if (names.has('Stone') || names.has('Marble Stone')) return 'Stone';
  return 'Pattern';
}

function subCollectionFor(product, collection) {
  const ignored = new Set(['Laminate', 'Panaplast', collection, 'Marble Stone']);
  return product.categories
    .map((category) => category.name)
    .find((name) => !ignored.has(name)) || collection;
}

function sizeLabel(size) {
  if (size === '1300 x 2800 mm') return '1300x2800';
  if (size.includes('3050')) return "4'x10'";
  return "4'x8'";
}

async function fetchOfficialProducts() {
  const products = [];
  for (let page = 1; ; page += 1) {
    const response = await fetch(`https://www.edleuro.com/wp-json/wc/store/v1/products?per_page=100&page=${page}`);
    if (!response.ok) {
      if (response.status === 400) break;
      throw new Error(`EDL Store API failed on page ${page}: ${response.status}`);
    }
    const batch = await response.json();
    products.push(...batch);
    if (batch.length < 100) break;
  }
  return products.filter((product) =>
    product.sku &&
    product.categories.some((category) => category.name === 'Laminate') &&
    !excludedSkus.has(product.sku.trim().toUpperCase()),
  );
}

const csvLines = readFileSync(CSV_PATH, 'utf8').trim().split(/\r?\n/);
const headers = parseCsvLine(csvLines[0]);
const existingRows = csvLines.slice(1).map((line) => {
  const values = parseCsvLine(line);
  return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
});
const existingBySku = new Map(existingRows.map((row) => [normalize(row['Design Name']), row]));
const officialProducts = await fetchOfficialProducts();
const officialBySku = new Map(officialProducts.map((product) => [normalize(product.sku), product]));
const retainedRows = existingRows.filter((row) => officialBySku.has(normalize(row['Design Name'])));
const removedRows = existingRows.filter((row) => !officialBySku.has(normalize(row['Design Name'])));
const newProducts = officialProducts.filter((product) => !existingBySku.has(normalize(product.sku)));

for (const product of newProducts) {
  const prefix = prefixOf(product.sku);
  if (!specifications.has(prefix)) throw new Error(`No July 2026 price/specification for ${product.sku}`);
}

const newRows = newProducts.map((product) => {
  const spec = specifications.get(prefixOf(product.sku));
  const collection = collectionFor(product);
  const subCollection = subCollectionFor(product, collection);
  return {
    'Item Name': `${product.sku} - EDL HPL ${sizeLabel(spec.size)} | ${product.name.toUpperCase()}`,
    'Design Name': product.sku,
    Code: product.name.toUpperCase(),
    'New Arrivals': 'TRUE',
    'Best Sellers': 'FALSE',
    'Promo Items': 'FALSE',
    Rate: String(spec.rate),
    Status: 'Active',
    'Usage unit': 'sht',
    Unit: 'Sheet',
    Size: spec.size,
    'Sub Collection': subCollection,
    Collection: collection,
    Thickness: spec.thickness,
  };
});

const finalRows = [...retainedRows, ...newRows].sort((left, right) =>
  left['Design Name'].localeCompare(right['Design Name'], 'en', { numeric: true }),
);

const csvOutput = [
  headers.map(csvCell).join(','),
  ...finalRows.map((row) => headers.map((header) => csvCell(row[header])).join(',')),
].join('\n') + '\n';

console.log(`Current official laminate products after exclusions: ${officialProducts.length}`);
console.log(`Removing ${removedRows.length} CSV products; adding ${newProducts.length}.`);

writeFileSync(CSV_PATH, csvOutput);
console.log(`Wrote ${finalRows.length} products to ${CSV_PATH}.`);
if (newProducts.length) console.log('New products need swatches: run node scripts/sync-edl-swatches.mjs next.');
