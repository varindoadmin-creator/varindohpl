import { readFileSync, writeFileSync } from 'node:fs';

const csvPath = 'public/data/edl-products.csv';
const storeApi = 'https://www.edleuro.com/wp-json/wc/store/v1/products';
const wordpressApi = 'https://www.edleuro.com/wp-json/wp/v2/product';

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
  return String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'")
    .replaceAll('&nbsp;', ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function extractEdgeband(html) {
  const match = html.match(
    /Available with Edgeband<\/h6>[\s\S]{0,4000}?jet-listing-dynamic-field__content[^>]*>([\s\S]*?)<\/div>/i,
  );
  if (!match) return null;

  const lines = decodeHtml(match[1])
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '\n')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const sizes = lines.filter((line) => /^\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*mm$/i.test(line));
  const code = lines.find((line) => !sizes.includes(line));
  return code && sizes.length ? { code, sizes } : null;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

async function fetchAllStoreProducts() {
  const products = [];
  for (let page = 1; ; page += 1) {
    const batch = await fetchJson(`${storeApi}?per_page=100&page=${page}`);
    products.push(...batch);
    if (batch.length < 100) break;
  }
  return products;
}

async function fetchEdgebandProductSlugs() {
  const firstResponse = await fetch(
    `${wordpressApi}?complementary=186&per_page=100&page=1&_fields=slug,link`,
  );
  if (!firstResponse.ok) throw new Error(`${firstResponse.status} EDL edgeband taxonomy`);
  const pageCount = Number(firstResponse.headers.get('x-wp-totalpages') || 1);
  const products = await firstResponse.json();
  for (let page = 2; page <= pageCount; page += 1) {
    products.push(...await fetchJson(
      `${wordpressApi}?complementary=186&per_page=100&page=${page}&_fields=slug,link`,
    ));
  }
  return products;
}

async function mapConcurrent(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

const csvLines = readFileSync(csvPath, 'utf8').trim().split(/\r?\n/);
const headers = parseCsvLine(csvLines[0]);
for (const header of ['Edgeband Code', 'Edgeband Sizes']) {
  if (!headers.includes(header)) headers.push(header);
}
const rows = csvLines.slice(1).map((line) => {
  const values = parseCsvLine(line);
  return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
});
const rowBySku = new Map(rows.map((row) => [normalize(row['Design Name']), row]));

const [storeProducts, edgebandProducts] = await Promise.all([
  fetchAllStoreProducts(),
  fetchEdgebandProductSlugs(),
]);
const storeBySlug = new Map(storeProducts.map((product) => [product.slug, product]));
const targets = edgebandProducts
  .map(({ slug, link }) => ({ ...storeBySlug.get(slug), link }))
  .filter((product) => product.sku && rowBySku.has(normalize(product.sku)));

for (const row of rows) {
  row['Edgeband Code'] = '';
  row['Edgeband Sizes'] = '';
}

let completed = 0;
const extracted = await mapConcurrent(targets, 8, async (product) => {
  const response = await fetch(product.link);
  if (!response.ok) throw new Error(`${response.status} ${product.link}`);
  const edgeband = extractEdgeband(await response.text());
  completed += 1;
  if (completed % 25 === 0 || completed === targets.length) {
    console.log(`Checked ${completed}/${targets.length} edgeband product pages.`);
  }
  return { sku: product.sku, edgeband };
});

const failures = [];
for (const { sku, edgeband } of extracted) {
  if (!edgeband) {
    failures.push(sku);
    continue;
  }
  const row = rowBySku.get(normalize(sku));
  row['Edgeband Code'] = edgeband.code;
  row['Edgeband Sizes'] = edgeband.sizes.join(' | ');
}

const output = [
  headers.map(csvCell).join(','),
  ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(',')),
].join('\n') + '\n';
writeFileSync(csvPath, output);

const populated = rows.filter((row) => row['Edgeband Code']).length;
console.log(`Added official edgeband information to ${populated} CSV products.`);
if (failures.length) console.log(`Could not parse ${failures.length}: ${failures.join(', ')}`);
