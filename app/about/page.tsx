import type { Metadata } from 'next';
import Image from 'next/image';
import { Badges, CertList, Crumbs, Enquire, JsonLd } from '@/components/ui';
import { site } from '@/lib/data';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'About Aditya Chemicals | Chelated Mineral Manufacturer since 1992' },
  description: 'Aditya Chemicals is a GMP-certified manufacturer of chelated minerals, APIs and excipients based in Ahmedabad, India, with a US warehouse in Boca Raton, Florida.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  const items: [string, string][] = [
    ['/', 'Home'],
    ['/about/', 'About us'],
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <div className="page-head">
        <div className="wrap">
          <Crumbs items={items} />
          <h1>About Aditya Chemicals</h1>
          <p>GMP-certified manufacturer of chelated minerals, APIs and excipients, established in 1992.</p>
        </div>
      </div>

      <section>
        <div className="wrap cols-2">
          <Image
            src="/assets/img/brand/plant.jpg"
            alt="Production hall at the Aditya Chemicals plant"
            width={1400}
            height={782}
            sizes="(max-width: 900px) 100vw, 576px"
            style={{ borderRadius: '2rem' }}
          />
          <div className="prose">
            <h2>Company overview</h2>
            <p>
              Established in 1992, {site.company} has served global markets with bulk drugs, excipients and chelated minerals for more than three
              decades. We supply the pharmaceutical, nutraceutical, food and animal nutrition industries.
            </p>
            <p>
              Over the years the company has grown from a domestic supplier into one of India&apos;s established API and food and pharma ingredient
              manufacturers. Our range includes low heavy metal excipients, custom particle size chemicals, high purity APIs and food additives made for
              international markets.
            </p>
            <p>
              This website covers our magnesium range. For the full catalogue, visit{' '}
              <a href={site.companyUrl} target="_blank" rel="noopener">
                adityachemicals.in
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="tint">
        <div className="wrap cols-2">
          <div className="card card-pad">
            <h2>Our mission</h2>
            <p className="intro">
              To develop well-researched ingredient solutions that raise standards in health and nutrition, combining sound technology with regulatory
              compliance. Every product we make should be consistent, reliable and properly documented.
            </p>
          </div>
          <div className="card card-pad">
            <h2>Our vision</h2>
            <p className="intro">
              To be a dependable global supplier of high purity APIs and functional ingredients, serving every sector from pharmaceuticals to animal
              nutrition.
            </p>
          </div>
        </div>
      </section>

      <section className="navy">
        <div className="wrap">
          <div className="head-row">
            <div>
              <span className="kicker">Locations</span>
              <h2>Where we are</h2>
            </div>
          </div>
          <div className="sites">
            {site.addresses.map((a) => (
              <div key={a.label}>
                <h3>{a.label}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certificates">
        <div className="wrap">
          <div className="quality">
            <h2>Certificates &amp; Licensing</h2>
            <p>
              We hold the drug manufacturing, laboratory, food safety and dietary compliance credentials global buyers expect. Copies are available at{' '}
              <a href={`${site.companyUrl}/certificates`} target="_blank" rel="noopener">
                adityachemicals.in/certificates
              </a>
              .
            </p>
            <Badges />
            <CertList />
          </div>
        </div>
      </section>

      <Enquire heading="Work with us" text="Whether you need a standard grade or a custom specification, our team will be glad to help." />
    </>
  );
}
