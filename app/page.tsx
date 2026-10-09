import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StructureFigure from '@/components/StructureFigure';
import { Badges, CertList, Enquire, JsonLd, ProductTable, SpecRows } from '@/components/ui';
import { STANDARDS, flagship, productUrl, products, quoteUrl, site } from '@/lib/data';
import { faqSchema, productSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Magnesium Bisglycinate (Glycinate) Manufacturer and Bulk Supplier | Aditya Chemicals' },
  description: `Fully reacted magnesium bisglycinate (CAS ${flagship.cas}) in bulk from Aditya Chemicals, India. ${STANDARDS} grades, GMP, Halal and Kosher certified, US stock in Florida.`,
  alternates: { canonical: '/' },
};

const faqs: [string, string][] = [
  ['Is magnesium glycinate the same as magnesium bisglycinate?', `Yes. Magnesium glycinate is the common name. Bisglycinate is the more precise term: one magnesium ion is bound to two glycine molecules (${flagship.formula}, CAS ${flagship.cas}).`],
  ['Is your bisglycinate fully reacted or buffered?', 'It is fully reacted. The magnesium is chemically bound to glycine rather than blended with magnesium oxide, which is what gives the chelate its absorption and tolerance properties.'],
  ['Which grades do you supply?', `We manufacture to ${STANDARDS} requirements. Tell us the monograph you need to meet and we will send the matching specification.`],
  ['What documents come with an order?', 'Each batch is supplied with a Certificate of Analysis. Specification sheets, allergen and GMO statements, Halal and Kosher certificates and technical dossiers are available on request.'],
  ['What is the shelf life?', `${flagship.shelfLife || '5 years'} from the date of manufacture, stored in the original sealed packaging in a cool, dry place.`],
  ['Can you deliver to the USA, UK and Europe?', 'Yes. We export from India and also hold stock at our warehouse in Boca Raton, Florida, for customers in the United States.'],
  ['Can I get a sample?', 'Yes. Use the enquiry form and tick “Sample”. Please mention your application and expected annual volume.'],
];

const COMPARE: [string, string, string][] = [
  ['Absorption', 'Peptide transport (PEPT1)', 'Ionic, competes with other minerals'],
  ['Stomach tolerance', 'Gentle', 'Laxative effect is common'],
  ['Phytates and oxalates', 'Protected by the chelate ring', 'Can bind and block uptake'],
  ['In a blend', 'Neutral, does not react with vitamins', 'Can affect stability'],
  ['Tableting', 'Compresses well', 'Abrasive'],
];

const USES: [string, string][] = [
  ['Dietary supplements', 'Capsules, tablets and powders for sleep, stress, muscle and general magnesium support.'],
  ['Pharmaceuticals', 'Supplied with the documentation needed for regulated products, made under GMP and ICH Q7.'],
  ['GLP-1 support products', 'Gentle on a slowed stomach. Used in formulas aimed at constipation and leg cramps during weight loss.'],
  ['Food and beverages', 'Chemically neutral, so it can be added without off-flavours or loss of vitamins.'],
];

export default function HomePage() {
  const others = products.filter((p) => !p.flagship);
  return (
    <>
      <JsonLd data={[productSchema(flagship), faqSchema(faqs)]} />

      <section className="hero">
        <div className="wrap">
          <div className="grid">
            <div>
              <span className="pill">Magnesium (Chelated Minerals)</span>
              <h1>Magnesium Bisglycinate</h1>
              <p className="sub">
                Fully reacted magnesium glycinate chelate, manufactured in Gujarat, India and supplied in bulk to supplement, pharmaceutical and food
                manufacturers worldwide.
              </p>
              <div className="actions">
                <Link className="btn btn-primary" href={quoteUrl(flagship)}>
                  Request a quote, COA or sample
                </Link>
                <Link className="btn btn-line" href={productUrl(flagship)}>
                  View specification
                </Link>
              </div>
            </div>
            <figure>
              <StructureFigure />
              <figcaption>
                Magnesium bis(glycinate). Each glycine binds the magnesium ion through its carboxyl oxygen and amino nitrogen, forming two stable
                five-membered rings.
              </figcaption>
            </figure>
          </div>
          <dl className="specbar">
            <div><dt>CAS No.</dt><dd className="mono">{flagship.cas}</dd></div>
            <div><dt>Formula</dt><dd className="mono">{flagship.formula}</dd></div>
            <div><dt>IUPAC name</dt><dd>{flagship.iupac}</dd></div>
            <div><dt>Shelf life</dt><dd>{flagship.shelfLife}</dd></div>
            <div><dt>Grades</dt><dd>{STANDARDS}</dd></div>
          </dl>
        </div>
      </section>

      <section>
        <div className="wrap cols-2">
          <div>
            <h2>About the product</h2>
            <p className="intro">{flagship.description}</p>
            <p className="intro">
              We have produced mineral chelates for more than 30 years. Our bisglycinate is made under GMP at our plant in Sanand, near Ahmedabad, and
              every batch is tested for purity, potency and safety before release.
            </p>
            <p>
              <Link className="link-arrow" href={productUrl(flagship)}>
                Full technical data →
              </Link>
            </p>
          </div>
          <div>
            <div className="table-frame">
              <table className="table spec">
                <tbody>
                  <SpecRows p={flagship} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <div className="head-row">
            <div>
              <span className="kicker">Properties</span>
              <h2>Why formulators choose bisglycinate</h2>
            </div>
          </div>
          <ol className="points">
            {flagship.features.map((f) => (
              <li key={f.title}>
                <b>{f.title}</b>
                {f.text}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="wrap cols-2">
          <div>
            <span className="kicker">Comparison</span>
            <h2>Bisglycinate and inorganic magnesium salts</h2>
            <p className="intro">
              Magnesium oxide and carbonate are cheaper, but they behave very differently in the gut and in a formulation. The table summarises the main
              practical differences.
            </p>
          </div>
          <div className="table-frame">
            <table className="table compare">
              <thead>
                <tr>
                  <th></th>
                  <th>Bisglycinate (chelate)</th>
                  <th>Oxide / carbonate</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([k, a, b]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{a}</td>
                    <td>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <div className="head-row">
            <div>
              <span className="kicker">Product range</span>
              <h2>Other magnesium compounds we make</h2>
            </div>
            <Link className="link-arrow" href="/products/">
              See all {products.length} products →
            </Link>
          </div>
          <ProductTable list={others.slice(0, 7)} />
        </div>
      </section>

      <section className="navy">
        <div className="wrap">
          <div className="head-row">
            <div>
              <span className="kicker">Applications</span>
              <h2>Where our customers use it</h2>
            </div>
          </div>
          <div className="uses">
            {USES.map(([h, t]) => (
              <div key={h}>
                <h3>{h}</h3>
                <p>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap plant">
          <Image src="/assets/img/brand/plant.jpg" alt="Production hall at the Aditya Chemicals plant" width={1400} height={782} sizes="(max-width: 900px) 100vw, 580px" />
          <div>
            <span className="kicker">Manufacturing</span>
            <h2>Made in our own plant</h2>
            <p className="intro">
              {site.company} was founded in 1992 in Ahmedabad. We produce chelated minerals, amino acid salts, vitamins and excipients for customers in
              pharmaceuticals, nutrition and food.
            </p>
            <div className="facts">
              <div><b>1992</b><span>Year founded</span></div>
              <div><b>100+</b><span>Products manufactured</span></div>
              <div><b>10+</b><span>Export countries</span></div>
              <div><b>USA</b><span>Warehouse in Boca Raton, FL</span></div>
            </div>
            <Link className="btn btn-line" href="/about/">
              About the company
            </Link>
          </div>
        </div>
      </section>

      <section id="certificates">
        <div className="wrap">
          <div className="quality">
            <h2>Quality &amp; Regulatory Compliance</h2>
            <p>{flagship.quality}</p>
            <Badges />
            <CertList />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap cols-2">
          <div>
            <span className="kicker">FAQ</span>
            <h2>Common questions from buyers</h2>
            <p className="intro">
              Something not covered here? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
          <div className="faq">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Enquire />
    </>
  );
}
