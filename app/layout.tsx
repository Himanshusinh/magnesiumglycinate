import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk, Manrope } from 'next/font/google';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { JsonLd } from '@/components/ui';
import { flagship, productUrl, site } from '@/lib/data';
import { organizationSchema } from '@/lib/schema';
import './globals.css';

// Same typefaces as adityachemicals.in.
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-hanken', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: site.name, template: `%s | ${site.company}` },
  description: site.tagline,
  openGraph: { type: 'website', siteName: site.name, images: [flagship.image ?? '/assets/img/brand/plant.jpg'] },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0a192f' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${hanken.variable}`}>
      <head>
        {/* Icon font used on adityachemicals.in; next/font cannot load icon fonts. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0&display=block" />
        <JsonLd data={organizationSchema()} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header company={site.company} phone={site.phone} phoneIntl={site.phoneIntl} email={site.email} flagshipHref={productUrl(flagship)} />
        <main id="main">{children}</main>
        <Footer />
        {site.gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
