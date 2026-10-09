import siteJson from '@/data/site.json';
import productsJson from '@/data/products.json';

export type Feature = { title: string; text: string };

export type Product = {
  slug: string;
  sourceSlug: string;
  sourceUrl: string;
  name: string;
  category: string;
  description: string;
  cas: string;
  formula: string;
  iupac: string;
  shelfLife: string;
  features: Feature[];
  quality: string;
  image: string | null;
  flagship: boolean;
};

export type Site = {
  domain: string;
  name: string;
  tagline: string;
  company: string;
  companyUrl: string;
  brochure: string;
  email: string;
  phone: string;
  phoneIntl: string;
  whatsapp: string;
  formEndpoint: string;
  gaId: string;
  addresses: { label: string; text: string }[];
  stats: { value: string; label: string }[];
  certifications: { name: string; detail: string }[];
};

export const site = siteJson as Site;
export const products = productsJson.products as Product[];
export const category: { title: string; tagline: string } = productsJson.category ?? { title: 'Magnesium', tagline: '' };
export const syncedAt: string = productsJson.syncedAt;
export const flagship = products.find((p) => p.flagship) ?? products[0];

export const STANDARDS = 'BP / EP / USP / FCC';

export const productUrl = (p: Product) => `/products/${p.slug}/`;
export const quoteUrl = (p: Product) => `/contact/?product=${encodeURIComponent(p.name)}`;
export const abs = (path: string) => site.domain + path;
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

// Certification badges as shown on adityachemicals.in product pages.
export const BADGES: { src: string | null; alt: string; label: string }[] = [
  { src: '/assets/img/brand/gmp.png', alt: 'GMP', label: 'Certified' },
  { src: '/assets/img/brand/iso.png', alt: 'ISO', label: '9001:2015' },
  { src: '/assets/img/brand/halal.avif', alt: 'Halal', label: 'Certified' },
  { src: null, alt: 'KOSHER', label: 'Certified' },
  { src: '/assets/img/brand/fssc.svg', alt: 'FSSC', label: '22000' },
  { src: '/assets/img/brand/pda.svg', alt: 'PDA', label: 'Member' },
];
