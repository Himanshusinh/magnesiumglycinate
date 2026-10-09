import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { BADGES, productUrl, quoteUrl, site, type Product } from '@/lib/data';

import { Icon } from './Icon';

export { Icon };

export const JsonLd = ({ data }: { data: object | object[] }) => (
  <>
    {(Array.isArray(data) ? data : [data]).map((d, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
    ))}
  </>
);

export function Crumbs({ items }: { items: [string, string][] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map(([href, label], i) =>
        i < items.length - 1 ? (
          <Fragment key={href}>
            <Link href={href}>{label}</Link>
            <Icon name="chevron_right" />
          </Fragment>
        ) : (
          <span key={href}>{label}</span>
        )
      )}
    </nav>
  );
}

export function SpecRows({ p }: { p: Product }) {
  const rows: [string, string][] = [
    ['Product Name', p.name],
    ['Molecular Formula', p.formula],
    ['IUPAC Name', p.iupac],
    ['CAS Registry No.', p.cas],
    ['Shelf Life', p.shelfLife],
  ];
  return (
    <>
      {rows
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td className={/CAS|Formula/.test(k) ? 'mono' : undefined}>{v}</td>
          </tr>
        ))}
    </>
  );
}

export function ProductTable({ list }: { list: Product[] }) {
  return (
    <div className="table-frame">
      <table className="table rows">
        <thead>
          <tr>
            <th>Product</th>
            <th>CAS No.</th>
            <th>Molecular formula</th>
            <th>Shelf life</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.slug}>
              <td>
                <Link className="pname" href={productUrl(p)}>
                  {p.image && <Image src={p.image} alt="" width={56} height={40} />}
                  <span>
                    {p.name}
                    {p.flagship && <span className="star">Main product</span>}
                  </span>
                </Link>
              </td>
              <td className="mono num" data-l="CAS">{p.cas || 'On request'}</td>
              <td className="mono" data-l="Formula">{p.formula || 'On request'}</td>
              <td data-l="Shelf life">{p.shelfLife || 'On request'}</td>
              <td>
                <Link className="link-arrow" href={productUrl(p)}>
                  Specification →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="pcard">
      <Link className="pcard-img" href={productUrl(p)} tabIndex={-1} aria-hidden="true">
        {p.image && <Image src={p.image} alt="" width={900} height={600} sizes="(max-width: 640px) 100vw, 300px" />}
      </Link>
      <div className="pcard-body">
        <h3>
          <Link href={productUrl(p)}>{p.name}</Link>
        </h3>
        <p>
          CAS: <span className="mono">{p.cas}</span>
        </p>
        <div className="pcard-actions">
          <Link className="btn btn-primary" href={productUrl(p)}>
            View Details
          </Link>
          <Link className="btn btn-line" href={quoteUrl(p)}>
            Quick Inquiry
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Badges() {
  return (
    <div className="badges">
      {BADGES.map((b) => (
        <div key={b.alt}>
          {b.src ? <Image src={b.src} alt={b.alt} width={64} height={64} unoptimized /> : <span className="kosher">{b.alt}</span>}
          <span>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CertList() {
  return (
    <ul className="cert-list">
      {site.certifications.map((c) => (
        <li key={c.name}>
          <b>{c.name}</b> <span>· {c.detail}</span>
        </li>
      ))}
    </ul>
  );
}

export function Enquire({
  heading = 'Request a quotation',
  text = 'Send us the product, quantity and delivery country. We reply with price, lead time and a current COA, usually within one working day. Samples are available for evaluation.',
}: {
  heading?: string;
  text?: string;
}) {
  return (
    <div className="enquire">
      <div className="wrap">
        <div className="inner">
          <div>
            <h2>{heading}</h2>
            <p>{text}</p>
          </div>
          <div className="direct">
            <a href={`tel:${site.phoneIntl}`}>
              <Icon name="call" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" />
              {site.email}
            </a>
            <Link className="btn btn-white" href="/contact/">
              Send an enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Closing contact block, worded as on adityachemicals.in.
export function SourceContact() {
  return (
    <div className="enquire">
      <div className="wrap">
        <div className="inner">
          <div>
            <h2>Contact us</h2>
            <p>
              {site.company} welcomes your interest in its products, quality, and solutions. Please feel free to contact us by the method of your
              choice.
            </p>
          </div>
          <div className="direct">
            {site.addresses
              .filter((a) => a.label !== 'Corporate Office')
              .map((a) => (
                <span key={a.label}>
                  <Icon name="location_on" />
                  <b>{a.label}:</b> {a.text}
                </span>
              ))}
            <a href={`tel:${site.phoneIntl}`}>
              <Icon name="call" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" />
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
