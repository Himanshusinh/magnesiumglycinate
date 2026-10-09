// Pulls magnesium product data + images from adityachemicals.in into data/products.json.
// Usage: node scripts/sync.mjs
import { writeFile, mkdir, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = 'https://www.adityachemicals.in';
const IMG_DIR = path.join(ROOT, 'public/assets/img/products');
const UA = { 'User-Agent': 'Mozilla/5.0 (magnesiumglycinate.com sync)' };

// The flagship product gets featured placement on this site.
const FLAGSHIP = 'magnesium-bis-glycinate';

const decode = (s) =>
  s
    .replace(/<!-- -->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

async function get(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function parseProduct(html, sourceSlug) {
  const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .map((m) => {
      try { return JSON.parse(m[1]); } catch { return null; }
    })
    .find((j) => j && j['@type'] === 'Product');
  if (!ld) throw new Error(`No Product JSON-LD for ${sourceSlug}`);

  const identity = {};
  const table = html.match(/Chemical Identity<\/h3>\s*<table[^>]*>(.*?)<\/table>/s);
  if (table) {
    for (const row of table[1].matchAll(/<tr[^>]*>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>/gs)) {
      identity[decode(row[1])] = decode(row[2]);
    }
  }

  const features = [];
  const feat = html.match(/Key Features &amp; Benefits<\/h2>\s*<ul[^>]*>(.*?)<\/ul>/s);
  if (feat) {
    for (const li of feat[1].matchAll(/<strong[^>]*>(.*?)<\/strong>(.*?)<\/span><\/li>/gs)) {
      features.push({ title: decode(li[1]).replace(/:$/, ''), text: decode(li[2]) });
    }
  }

  const quality = html.match(/Quality &amp; Regulatory Compliance<\/h\d>\s*<p[^>]*>(.*?)<\/p>/s);
  const name = decode(ld.name);
  const slug = slugify(name.replace(/\/.*$/, ''));

  return {
    slug,
    sourceSlug,
    sourceUrl: `${SOURCE}/products/${sourceSlug}`,
    name,
    category: ld.category || 'Magnesium (Chelated Minerals)',
    description: decode(ld.description || ''),
    cas: identity['CAS Registry No.'] || ld.mpn || '',
    formula: identity['Molecular Formula'] || '',
    iupac: identity['IUPAC Name'] || '',
    shelfLife: identity['Shelf Life'] || '',
    identity,
    features,
    quality: quality ? decode(quality[1]) : '',
    sourceImage: ld.image || '',
    flagship: sourceSlug === FLAGSHIP,
  };
}

// Shrinks a downloaded image with macOS `sips` when available; otherwise keeps the original.
function optimize(src, dest, maxPx, format) {
  try {
    execFileSync('sips', ['-s', 'format', format, '-s', 'formatOptions', '78', '-Z', String(maxPx), src, '--out', dest], { stdio: 'ignore' });
    return existsSync(dest);
  } catch {
    return false;
  }
}

async function saveImage(buf, destNoExt, maxPx, format = 'jpeg') {
  const ext = format === 'jpeg' ? '.jpg' : '.png';
  const tmp = `${destNoExt}.download`;
  await writeFile(tmp, buf);
  if (!optimize(tmp, destNoExt + ext, maxPx, format)) await writeFile(destNoExt + ext, buf);
  await rm(tmp, { force: true });
  return path.basename(destNoExt + ext);
}

// Downloads a source image once per run; products that share a card image on the source share the file here too.
const downloaded = new Map();
async function downloadImage(assetPath) {
  if (!assetPath) return null;
  if (downloaded.has(assetPath)) return downloaded.get(assetPath);
  const name = slugify(path.basename(decodeURIComponent(assetPath), path.extname(assetPath)));
  const file = `/assets/img/products/${name}.jpg`;
  let result = existsSync(path.join(ROOT, 'public', file)) ? file : null;
  try {
    const res = await fetch(SOURCE + assetPath, { headers: UA });
    if (res.ok && (res.headers.get('content-type') || '').startsWith('image/')) {
      await saveImage(Buffer.from(await res.arrayBuffer()), path.join(IMG_DIR, name), 900);
      result = file;
    }
  } catch {}
  downloaded.set(assetPath, result);
  return result;
}

// Reads the category page: heading, tagline and, per product, the card image the source shows.
function parseCategory(html) {
  const listing = html.slice(html.indexOf('Chelated Minerals Sub-Category'));
  const title = decode(listing.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1] || 'Magnesium');
  const tagline = decode(listing.match(/<\/h1>\s*<p[^>]*>(.*?)<\/p>/s)?.[1] || '');
  const cards = [];
  for (const m of listing.matchAll(/<img[^>]*?src="([^"]+)"[^>]*>.*?href="\/products\/([^"?#]+)"/gs)) {
    const url = m[1].replace(/&amp;/g, '&');
    const asset = url.startsWith('/_next/image') ? new URL(url, SOURCE).searchParams.get('url') : url;
    if (!cards.some((c) => c.slug === m[2])) cards.push({ slug: m[2], image: encodeURI(asset) });
  }
  return { title, tagline, cards };
}

async function main() {
  await mkdir(IMG_DIR, { recursive: true });
  // Mirror the Magnesium category on adityachemicals.in: same products, same order, same card images.
  const category = parseCategory(await get(`${SOURCE}/product-category/magnesium`));
  const slugs = category.cards.map((c) => c.slug);
  console.log(`Found ${slugs.length} magnesium products`);

  const overridesFile = path.join(ROOT, 'data/overrides.json');
  const overrides = existsSync(overridesFile) ? JSON.parse(await readFile(overridesFile, 'utf8')) : {};
  const products = [];
  for (const s of slugs) {
    try {
      const p = parseProduct(await get(`${SOURCE}/products/${s}`), s);
      const o = overrides[p.slug] || {};
      if (o.exclude) {
        console.log(`  - ${p.name} (excluded: ${o.reason || 'see overrides.json'})`);
        continue;
      }
      for (const [k, v] of Object.entries(o)) if (k !== 'reason' && k !== 'replace') p[k] = v;
      for (const [from, to] of o.replace || []) {
        p.description = p.description.split(from).join(to);
        for (const f of p.features) f.text = f.text.split(from).join(to);
      }
      p.image = await downloadImage(category.cards.find((c) => c.slug === s).image);
      products.push(p);
      console.log(`  ✓ ${p.name}${p.image ? '' : '  (no image)'}`);
    } catch (e) {
      console.warn(`  ✗ ${s}: ${e.message}`);
    }
  }

  await writeFile(
    path.join(ROOT, 'data/products.json'),
    JSON.stringify({ syncedAt: new Date().toISOString(), source: SOURCE, category: { title: category.title, tagline: category.tagline }, products }, null, 2) + '\n'
  );

  // Brand assets.
  for (const [src, out, maxPx, format] of [
    ['/logos/LOGO.png', 'logo', 700, 'png'],
    ['/ISO-logo.png', 'iso', 240, 'png'],
    ['/logo-gmp.png', 'gmp', 240, 'png'],
    ['/aditya%20chemicals%20images/home%20page/home%20page%20images/magnific_massive-pharmaceutical-ma_mCc5jr4hJQ.png', 'plant', 1400, 'jpeg'],
  ]) {
    const res = await fetch(SOURCE + src, { headers: UA });
    if (res.ok) await saveImage(Buffer.from(await res.arrayBuffer()), path.join(ROOT, 'public/assets/img/brand', out), maxPx, format);
  }
  // Certification badges shown on the source product pages, saved as-is.
  for (const [src, out] of [['/logo-halal.avif', 'halal.avif'], ['/logo-fssc.svg', 'fssc.svg'], ['/logo-pda.svg', 'pda.svg']]) {
    const res = await fetch(SOURCE + src, { headers: UA });
    if (res.ok) await writeFile(path.join(ROOT, 'public/assets/img/brand', out), Buffer.from(await res.arrayBuffer()));
  }
  console.log(`Wrote data/products.json (${products.length} products)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
