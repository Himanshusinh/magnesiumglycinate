import { abs, productUrl, site, type Product } from './data';

// JSON-LD builders for search engines.

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.company,
  url: site.domain,
  logo: abs('/assets/img/brand/logo.png'),
  email: site.email,
  telephone: site.phoneIntl,
  sameAs: [site.companyUrl],
});

export const breadcrumbSchema = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([href, label], i) => ({ '@type': 'ListItem', position: i + 1, name: label, item: abs(href) })),
});

export const productSchema = (p: Product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: p.name,
  image: p.image ? abs(p.image) : undefined,
  description: p.description,
  category: p.category,
  mpn: p.cas || undefined,
  url: abs(productUrl(p)),
  brand: { '@type': 'Brand', name: site.company },
  manufacturer: { '@type': 'Organization', name: site.company, url: site.companyUrl },
  additionalProperty: [
    p.cas && { '@type': 'PropertyValue', name: 'CAS Registry Number', value: p.cas },
    p.formula && { '@type': 'PropertyValue', name: 'Molecular Formula', value: p.formula },
    p.shelfLife && { '@type': 'PropertyValue', name: 'Shelf Life', value: p.shelfLife },
  ].filter(Boolean),
});

export const faqSchema = (faqs: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
