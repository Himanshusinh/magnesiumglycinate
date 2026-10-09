# magnesiumglycinate.com

Magnesium product site for **Aditya Chemicals**, built with **Next.js 16** (App Router, TypeScript). It uses the adityachemicals.in theme and gets its product data from that site.

## How it works

```
adityachemicals.in ──(npm run sync)──▶ data/products.json + public/assets/img ──(next build)──▶ static pages
```

- `scripts/sync.mjs` mirrors the Magnesium category on adityachemicals.in: the same products, in the same order, with the same card images. For each product it saves the description, Quick Facts, Chemical Identity, Key Features & Benefits and Quality text.
- The product listing and product pages show only that main-site data, laid out the way the main site lays it out.
- `data/overrides.json` exists only to render formulas that are garbled on the source page (e.g. `C H MgO4 4 5` becomes `C₄H₄MgO₅`). It also supports `"replace"` for text fixes and `"exclude": true` to hide a product.
- `data/site.json` holds contact details, addresses, certifications, the form endpoint and the Google Analytics ID. Edit this file to change sitewide content.

Every page is prerendered at build time. Each page has SEO metadata, Open Graph tags and JSON-LD (Product, FAQ, Breadcrumb), and the site also serves `sitemap.xml` and `robots.txt`.

## Project layout

```
app/
  layout.tsx               header, footer, fonts, Organization schema
  page.tsx                 home (Magnesium Bisglycinate)
  products/page.tsx        Magnesium category listing
  products/[slug]/page.tsx product page (one per product, generated at build)
  about/  contact/  privacy-policy/  not-found.tsx
  sitemap.ts  robots.ts  icon.svg  globals.css
components/                Header, Footer, EnquiryForm, StructureFigure, shared UI
lib/data.ts                typed access to data/*.json
lib/schema.ts              JSON-LD builders
data/                      site.json, products.json, overrides.json
public/assets/img/         product and brand images
scripts/sync.mjs           pulls data from adityachemicals.in
```

## Commands

Requires Node 20.9 or newer.

```bash
npm install       # first time only
npm run dev       # local development at http://localhost:3000
npm run sync      # refresh product data and images from adityachemicals.in
npm run build     # production build
npm run start     # serve the production build
npm run update    # sync, then build
npm run export    # static HTML export to out/ (for hosts without Node)
```

When products change on adityachemicals.in, run `npm run sync` and redeploy.

## Hosting

- **Vercel** (recommended for Next.js): import the repo. No configuration is needed.
- **Netlify / any Node host**: build command `npm run build`, start command `npm run start`.
- **cPanel / shared hosting without Node**: run `npm run export`, then upload what's inside `out/` to `public_html/`.

Then point the `magnesiumglycinate.com` DNS at the host.

## Enquiry form

By default the form opens the visitor's email app with a pre-filled message to `info@adityachemicals.com`. To receive submissions directly, create a free form endpoint (Formspree, Getform, Basin, etc.), put its URL in `formEndpoint` in `data/site.json`, and rebuild.
# magnesiumglycinate
# magnesiumglycinate
