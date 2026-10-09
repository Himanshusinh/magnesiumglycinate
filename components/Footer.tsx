import Image from 'next/image';
import Link from 'next/link';
import { productUrl, products, site } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <Link className="logo" href="/">
              <Image src="/assets/img/brand/logo.png" alt={site.company} width={700} height={201} />
            </Link>
            <p>
              {site.name} is run by {site.company}, manufacturer of chelated minerals, APIs and excipients since 1992.
            </p>
            <p>
              <a href={site.companyUrl} target="_blank" rel="noopener">
                www.adityachemicals.in
              </a>
            </p>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              {products.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link href={productUrl(p)}>{p.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/products/">All magnesium products</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about/">About us</Link></li>
              <li><Link href="/about/#certificates">Certificates</Link></li>
              <li><Link href="/contact/">Request a quote</Link></li>
              <li><a href={site.brochure} target="_blank" rel="noopener">Company brochure (PDF)</a></li>
              <li><Link href="/privacy-policy/">Privacy policy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Addresses</h4>
            {site.addresses.map((a) => (
              <div className="addr" key={a.label}>
                <b>{a.label}</b>
                {a.text}
              </div>
            ))}
          </div>
        </div>
        <div className="bottom">
          <span>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </span>
          <span>
            Tel {site.phone} · <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
