import { readFileSync, writeFileSync } from 'node:fs';

const csvPath = 'public/data/edl-products.csv';
const requestedBestSellers = [
  'DWK 3169AT', 'DWK 3155AT', 'DWK 3291AT', 'DWK 3294AT', 'DWE 9021L',
  'DZ 8270J', 'DWT 3903W', 'DWT 3708W', 'DWT 3776W', 'DWK 3295AT',
  'DWE 9067L', 'DWK 3122AT', 'EWY 9750V', 'DWC 3656AT', 'DWK 3168AT',
  'ELS 8110D', 'DWE 9004L', 'EWD 2542NT', 'DWC 3655AT', 'DWT 3707W',
  'DWK 3165AT', 'DWL 4367LX', 'EWD 3452T', 'ELS 8117D', 'DWK 3163AT',
  'DWC 3659AT', 'ESG 5758N', 'DWT 3904W', 'DB 7001XT', 'ENS 2760V',
  'DWC 3643AT', 'DWK 3125AT', 'DST 5880SM', 'EMB 2718', 'ESS 5206SMA',
  'ENS 2862V', 'DST 6420SM', 'ESG 5781N', 'DSW 6313FLW', 'ELC 1132LM',
  'DA 2083N', 'L-FA 0206AP', 'ERS 1787HG', 'DSK 7250SM', 'ELS 8098SM',
  'DSW 4451SMA', 'DWT 3773W', 'DWW 9038FA',
];

function normalizeSku(value) {
  return value.replace(/\s+/g, '').toUpperCase();
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

const lines = readFileSync(csvPath, 'utf8').trim().split(/\r?\n/);
const headers = parseCsvLine(lines[0]);
const rows = lines.slice(1).map((line) => {
  const values = parseCsvLine(line);
  return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
});

const availableSkus = new Set(rows.map((row) => normalizeSku(row['Design Name'])));
const requestedSkus = new Set(requestedBestSellers.map(normalizeSku));
const missingSkus = [...requestedSkus].filter((sku) => !availableSkus.has(sku));

for (const row of rows) {
  row['Best Sellers'] = requestedSkus.has(normalizeSku(row['Design Name'])) ? 'TRUE' : 'FALSE';
}

const output = [
  headers.map(csvCell).join(','),
  ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(',')),
].join('\n') + '\n';

writeFileSync(csvPath, output);

const bestSellerCount = rows.filter((row) => row['Best Sellers'] === 'TRUE').length;
console.log(`Marked ${bestSellerCount} of ${rows.length} products as Best Sellers.`);
if (missingSkus.length) console.log(`Not found in CSV: ${missingSkus.join(', ')}`);
