import type { Metadata } from 'next';
import { Crumbs } from '@/components/ui';
import { site } from '@/lib/data';

export const metadata: Metadata = {
  title: { absolute: `Privacy Policy | ${site.name}` },
  description: `Privacy policy for ${site.name}, operated by ${site.company}.`,
  alternates: { canonical: '/privacy-policy/' },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <Crumbs items={[['/', 'Home'], ['/privacy-policy/', 'Privacy policy']]} />
          <h1>Privacy policy</h1>
        </div>
      </div>
      <section style={{ paddingTop: 48 }}>
        <div className="wrap prose">
          <p>This website is operated by {site.company}. We collect only the information needed to answer your enquiries.</p>
          <h2>Information we collect</h2>
          <p>
            When you send an enquiry we receive the details you enter, such as your name, company, email address, phone number, country and message. We
            may also collect anonymous statistics about how the site is used.
          </p>
          <h2>How we use it</h2>
          <p>
            We use your information to reply to your enquiry, send quotations and documents, and manage our business relationship with you. We do not sell
            personal data.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask us to show, correct or delete the data we hold about you by writing to <a href={`mailto:${site.email}`}>{site.email}</a>. Our full
            policy is published at{' '}
            <a href={`${site.companyUrl}/privacy-policy`} target="_blank" rel="noopener">
              adityachemicals.in/privacy-policy
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
