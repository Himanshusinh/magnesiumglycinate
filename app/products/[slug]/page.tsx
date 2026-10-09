import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badges, Crumbs, Icon, JsonLd, SourceContact, SpecRows } from '@/components/ui';
import { category, getProduct, productUrl, products, quoteUrl } from '@/lib/data';
import { breadcrumbSchema, productSchema } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

// One static page per product; unknown slugs are 404s.
export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: { absolute: `${p.name}${p.cas ? ` (CAS ${p.cas.split(' ')[0]})` : ''} Manufacturer & Bulk Supplier | Aditya Chemicals` },
    description: `Buy high-purity ${p.name}${p.cas ? ` (CAS Registry No. ${p.cas})` : ''} in bulk. GMP-certified manufacturing, reliable global shipping to USA, Europe, UK, and Asia.`,
    alternates: { canonical: productUrl(p) },
    openGraph: p.image ? { images: [p.image] } : undefined,
  };
}

// Mirrors the product page on adityachemicals.in: same sections, same data, nothing added.
export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const items: [string, string][] = [
    ['/', 'Home'],
    ['/products/', category.title],
    [productUrl(p), p.name],
  ];
  return (
    <>
      <JsonLd data={[productSchema(p), breadcrumbSchema(items)]} />
      <section className="pd-top">
        <div className="wrap">
          <Crumbs items={items} />
          <div className="pd">
            <div>
              <span className="pill">{p.category}</span>
              <h1>{p.name}</h1>
              <p className="desc">{p.description}</p>
            </div>
            <aside className="quickfacts">
              <h3>Quick Facts</h3>
              <dl>
                {p.cas && (
                  <div>
                    <dt>CAS Registry No.</dt>
                    <dd>{p.cas}</dd>
                  </div>
                )}
                {p.formula && (
                  <div>
                    <dt>Formula</dt>
                    <dd>{p.formula}</dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap stack">
          <div className="card">
            <h2 className="card-title">Chemical Identity</h2>
            <table className="table spec">
              <tbody>
                <SpecRows p={p} />
              </tbody>
            </table>
            <Link className="btn btn-primary" href={quoteUrl(p)}>
              Request Quote / COA / Samples <Icon name="mail" />
            </Link>
          </div>
          {p.features.length > 0 && (
            <div className="card">
              <h2 className="card-title">Key Features &amp; Benefits</h2>
              <ul className="checks-list">
                {p.features.map((f) => (
                  <li key={f.title}>
                    <Icon name="check_circle" />
                    <div>
                      <b>{f.title}:</b> {f.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="quality">
            <h3>Quality &amp; Regulatory Compliance</h3>
            <p>{p.quality}</p>
            <Badges />
          </div>
        </div>
      </section>
      <SourceContact />
    </>
  );
}
