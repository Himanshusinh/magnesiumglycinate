import type { Metadata } from 'next';
import Image from 'next/image';
import { Crumbs, JsonLd, ProductCard, SourceContact } from '@/components/ui';
import { abs, category, productUrl, products } from '@/lib/data';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Bulk Magnesium Chelates & Compounds Manufacturer | Aditya Chemicals' },
  description: `${category.tagline} ${products.length} magnesium compounds from Aditya Chemicals, supplied in bulk to pharmaceutical, nutraceutical and food industries.`,
  alternates: { canonical: '/products/' },
};

// Mirrors the Magnesium category page on adityachemicals.in.
export default function ProductsPage() {
  const items: [string, string][] = [
    ['/', 'Home'],
    ['/products/', category.title],
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(items),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(productUrl(p)), name: p.name })),
          },
        ]}
      />
      <section className="pd-top">
        <div className="wrap">
          <Crumbs items={items} />
          <div className="banner">
            <Image src="/assets/img/brand/plant.jpg" alt="" width={1400} height={782} priority sizes="(max-width: 1200px) 100vw, 1152px" />
            <div className="txt">
              <span className="pill">Chelated Minerals Sub-Category</span>
              <h1>{category.title}</h1>
              <p>{category.tagline}</p>
            </div>
          </div>
          <div className="listing">
            <h2 className="card-title" style={{ fontSize: '1.35rem' }}>
              Available Compounds ({products.length})
            </h2>
            <div className="pgrid">
              {products.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <SourceContact />
    </>
  );
}
