import type { Metadata } from 'next';
import ContactSidebar from '@/components/ContactSidebar';
import EnquiryForm from '@/components/EnquiryForm';
import { Crumbs, JsonLd, Icon } from '@/components/ui';
import { products, site } from '@/lib/data';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Contact & Quotation | Magnesium Bisglycinate & Minerals | Aditya Chemicals' },
  description:
    'Request a quotation, batch Certificate of Analysis (COA), technical dossier, or free evaluation samples for magnesium bisglycinate and pure chelated minerals from Aditya Chemicals.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  const items: [string, string][] = [
    ['/', 'Home'],
    ['/contact/', 'Contact & Quotation'],
  ];
  const formProducts = products.map((p) => ({ name: p.name, flagship: p.flagship }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />

      {/* Hero Header */}
      <section className="contact-hero-section">
        <div className="wrap">
          <Crumbs items={items} />

          <div className="contact-hero-content">
            <span className="contact-hero-badge">Direct Manufacturer Inquiries</span>
            <h1 className="contact-hero-title">Request a Quotation & Samples</h1>
            <p className="contact-hero-desc">
              Connect directly with Aditya Chemicals. Request commercial pricing, batch Certificates of Analysis (COA),
              technical dossiers, or evaluation samples tailored to your formulation and compliance needs.
            </p>

            {/* Trust Highlights Strip */}
            <div className="contact-trust-strip">
              <div className="trust-pill-item">
                <span className="trust-pill-icon" aria-hidden="true">
                  <Icon name="bolt" />
                </span>
                <span className="trust-pill-text">24h Response Time</span>
              </div>
              <div className="trust-pill-item">
                <span className="trust-pill-icon" aria-hidden="true">
                  <Icon name="verified" />
                </span>
                <span className="trust-pill-text">WHO-GMP & ISO Certified</span>
              </div>
              <div className="trust-pill-item">
                <span className="trust-pill-icon" aria-hidden="true">
                  <Icon name="science" />
                </span>
                <span className="trust-pill-text">Free Evaluation Samples</span>
              </div>
              <div className="trust-pill-item">
                <span className="trust-pill-icon" aria-hidden="true">
                  <Icon name="public" />
                </span>
                <span className="trust-pill-text">India Plant & USA Warehouse</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Section */}
      <section className="contact-main-section">
        <div className="wrap">
          <div className="contact-layout-grid">
            <ContactSidebar site={site} />
            <EnquiryForm products={formProducts} email={site.email} endpoint={site.formEndpoint} />
          </div>
        </div>
      </section>
    </>
  );
}
