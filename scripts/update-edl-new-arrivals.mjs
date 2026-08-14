import { readFileSync, writeFileSync } from 'node:fs';

const csvPath = 'public/data/edl-products.csv';
const newArrivalPrefixes = new Set([
  'L-YW', 'L-YP', 'L-YS', 'L-YM', 'L-MG',
  'DD', 'DDM', 'DMC', 'DHT', 'DH', 'DY',
  'DWD', 'DWM', 'DWA',
]);

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

function prefixOf(sku) {
  return sku.trim().split(/\s+/)[0].toUpperCase();
}

const lines = readFileSync(csvPath, 'utf8').trim().split(/\r?\n/);
const headers = parseCsvLine(lines[0]);
const rows = lines.slice(1).map((line) => {
  const values = parseCsvLine(line);
  return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
});

for (const row of rows) {
  row['New Arrivals'] = newArrivalPrefixes.has(prefixOf(row['Design Name'])) ? 'TRUE' : 'FALSE';
}

const output = [
  headers.map(csvCell).join(','),
  ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(',')),
].join('\n') + '\n';

writeFileSync(csvPath, output);

const newArrivalCount = rows.filter((row) => row['New Arrivals'] === 'TRUE').length;
console.log(`Marked ${newArrivalCount} of ${rows.length} products as New Arrivals.`);
