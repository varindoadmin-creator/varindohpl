# Varindo Online Catalog

A responsive Node.js / Next.js catalog for Varindo's EDL public product browsing experience.

## Design direction

- Global font: Inter via `next/font/google`
- Premium interior-product visual style
- Responsive mobile, tablet, and desktop layouts
- Clean product cards: product image, exact product name, and price only
- WhatsApp-first enquiry flow instead of cart checkout
- Cloudinary-hosted EDL product images
- Supabase-backed catalogue, quote, and sample requests
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

Catalogue, quote, and sample persistence:

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Optional AI chat and email notifications:

```text
ANTHROPIC_API_KEY=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

`CLOUDINARY_URL` is only needed by image-import tooling; public image delivery uses the generated Cloudinary URLs.


## Typography

This version uses Manrope as the primary website font for a modern, premium interior-product catalog feel.
