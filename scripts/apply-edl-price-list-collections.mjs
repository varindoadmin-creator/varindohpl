import { readFileSync, writeFileSync } from 'node:fs';

const csvPath = 'public/data/edl-products.csv';

const groups = [
  { collection: 'Solid', prefixes: ['ESG'], rate: 600000, size: '1220 x 2440 mm', thickness: '0.7mm' },
  { collection: 'Solid', prefixes: ['DSK', 'DST', 'ESF'], rate: 650000, size: '1220 x 2440 mm', thickness: '0.7mm' },
  { collection: 'Solid', prefixes: ['EEG'], rate: 650000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Solid', prefixes: ['EEP', 'EEH'], rate: 710000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { collection: 'Solid', prefixes: ['DB'], rate: 700000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Solid', prefixes: ['DWA'], rate: 730000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Solid', prefixes: ['ENS'], rate: 810000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Solid', prefixes: ['ESS'], rate: 720000, size: '1250 x 2500 mm', thickness: '0.8mm' },
  { collection: 'Solid', prefixes: ['DSF', 'EST'], rate: 890000, size: '1320 x 3050 mm', thickness: '0.8mm' },
  { collection: 'Solid', prefixes: ['DYN'], rate: 780000, size: '1300 x 3050 mm', thickness: '0.8mm' },
  { collection: 'Solid', prefixes: ['DYG'], rate: 870000, size: '1300 x 3050 mm', thickness: '1.0mm' },
  { collection: 'Solid', prefixes: ['DYM'], rate: 3200000, size: '1220 x 2440 mm', thickness: '1.0mm' },

  { collection: 'Wood', prefixes: ['EWW'], rate: 680000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Wood', prefixes: ['DWK', 'DWT', 'DWW', 'DWX', 'EWD', 'EWN', 'EWP', 'EWY'], rate: 710000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Wood', prefixes: ['DWE', 'DWD', 'DWM'], rate: 730000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Wood', prefixes: ['DWC'], rate: 980000, size: '1300 x 3050 mm', thickness: '0.8mm' },
  { collection: 'Wood', prefixes: ['DSW'], rate: 990000, size: '1320 x 3050 mm', thickness: '0.8mm' },
  { collection: 'Wood', prefixes: ['DWL', 'DWV'], rate: 1100000, size: '1300 x 3050 mm', thickness: '0.8mm' },

  { collection: 'Ecru Core', prefixes: ['L-YW', 'L-YP', 'L-YS'], rate: 980000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Ecru Core', prefixes: ['L-YM'], rate: 1100000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Ecru Core', prefixes: ['L-MG'], rate: 1100000, size: '1220 x 2440 mm', thickness: '1.0mm' },

  { collection: 'Pattern', prefixes: ['DD', 'EGG', 'ELB', 'ELC'], rate: 700000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Pattern', prefixes: ['DA', 'ELS'], rate: 730000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Pattern', prefixes: ['ERS'], rate: 800000, size: '1220 x 2440 mm', thickness: '1.0mm' },

  { collection: 'Marble & Stone', prefixes: ['DMS'], rate: 750000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Marble & Stone', prefixes: ['DH', 'DY', 'DZ'], rate: 780000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Marble & Stone', prefixes: ['DX'], rate: 780000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { collection: 'Marble & Stone', prefixes: ['DHT'], rate: 920000, size: '1300 x 3050 mm', thickness: '0.8mm' },
  { collection: 'Marble & Stone', prefixes: ['DC', 'DS', 'DV'], rate: 1100000, size: '1300 x 3050 mm', thickness: '0.8mm' },
  { collection: 'Marble & Stone', prefixes: ['DSL', 'DSD'], rate: 1100000, size: '1320 x 3050 mm', thickness: '0.8mm' },

  { collection: 'Metal', prefixes: ['EMS'], rate: 1450000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Metal', prefixes: ['EMB', 'EMM', 'EMT'], rate: 2000000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Metal', prefixes: ['EME'], rate: 3900000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { collection: 'Metal', prefixes: ['DMA'], rate: 4200000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { collection: 'Metal', prefixes: ['DMB'], rate: 4350000, size: '1220 x 2440 mm', thickness: '1.0mm' },
  { collection: 'Metal', prefixes: ['DDM'], rate: 4400000, size: '1220 x 2440 mm', thickness: '0.8mm' },
  { collection: 'Metal', prefixes: ['DMC'], rate: 6900000, size: '1220 x 2440 mm', thickness: '1.5mm' },

  { collection: 'Colour Core', prefixes: ['ECG', 'ECV'], rate: 2000000, size: '1220 x 2440 mm', thickness: '0.9mm' },
  { collection: 'Colour Core', prefixes: ['DCW', 'DPC'], rate: 2300000, size: '1220 x 2440 mm', thickness: '0.9mm' },

  { collection: 'Aptico-Matt', prefixes: ['L-FA'], rate: 3500000, size: '1300 x 2800 mm', thickness: '1.0mm' },
];

const rules = new Map();
for (const group of groups) {
  for (const prefix of group.prefixes) {
    if (rules.has(prefix)) throw new Error(`Duplicate prefix rule: ${prefix}`);
    rules.set(prefix, group);
  }
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

function prefixOf(sku) {
  return sku.trim().split(/\s+/)[0].toUpperCase();
}

function sizeLabel(size) {
  if (size === '1300 x 2800 mm') return '1300x2800';
  if (size.includes('3050')) return "4'x10'";
  return "4'x8'";
}

const lines = readFileSync(csvPath, 'utf8').trim().split(/\r?\n/);
const headers = parseCsvLine(lines[0]);
const rows = lines.slice(1).map((line) => {
  const values = parseCsvLine(line);
  return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
});

for (const row of rows) {
  const sku = row['Design Name'];
  const rule = rules.get(prefixOf(sku));
  if (!rule) throw new Error(`No price-list rule for ${sku}`);
  row.Rate = String(rule.rate);
  row.Size = rule.size;
  row.Thickness = rule.thickness;
  row.Collection = rule.collection;
  row['Item Name'] = `${sku} - EDL HPL ${sizeLabel(rule.size)} | ${row.Code}`;
}

const output = [
  headers.map(csvCell).join(','),
  ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(',')),
].join('\n') + '\n';

writeFileSync(csvPath, output);
console.log(`Applied July 2026 price-list rules to ${rows.length} products.`);
