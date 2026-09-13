# Varindo Online Catalog

A responsive Node.js / Next.js catalog for Varindo's EDL public product browsing experience.

## Design direction

- Global font: Inter via `next/font/google`
- Premium interior-product visual style
- Responsive mobile, tablet, and desktop layouts
- Clean product cards: product image, exact product name, and price only
- WhatsApp-first enquiry flow instead of cart checkout
- EDL swatch images mirrored from edleuro.com into Cloud Storage
- Catalogue and sample requests sent to VIABooks
- Optional Anthropic-powered customer chat and SMTP notifications

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build for production

```bash
npm run build
npm run start
```

## Hostinger Node.js Web App settings

Recommended settings:

```text
Install command: npm install
Build command: npm run build
Start command: npm run start
Node.js version: 20.x or 22.x
```

## Product data

The public catalog is generated from:

```text
public/data/edl-products.csv
```

After changing the CSV, regenerate the checked-in TypeScript data:

```bash
node scripts/import-edl-products-from-csv.mjs
```

## Environment variables

Catalogue and sample requests (both have in-code defaults):

```text
VIABOOKS_API_URL=
VIABOOKS_ORGANIZATION_ID=
```

Optional AI chat and email notifications:

```text
ANTHROPIC_API_KEY=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

Swatch images live in `gs://varindo-product-images/edl-swatches/`, one WebP per
product code. After catalogue changes, run `node scripts/sync-edl-swatches.mjs`
and publish with the `gcloud storage cp` command it prints.


## Typography

This version uses Manrope as the primary website font for a modern, premium interior-product catalog feel.
