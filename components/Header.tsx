'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

type Props = {
  company: string;
  phone: string;
  phoneIntl: string;
  email: string;
  flagshipHref: string;
};

export default function Header({ company, phone, phoneIntl, email, flagshipHref }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  const nav: [string, string, boolean][] = [
    [flagshipHref, 'Magnesium Bisglycinate', pathname === flagshipHref],
    ['/products/', 'All Magnesium Products', pathname.startsWith('/products/') && pathname !== flagshipHref],
    ['/about/', 'About Us', pathname === '/about/'],
  ];

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span className="where">Manufacturer of chelated minerals since 1992 · Ahmedabad, India · Boca Raton, USA</span>
          <span className="links">
            <a href={`tel:${phoneIntl}`}>
              <Icon name="call" /> {phone}
            </a>
            <a href={`mailto:${email}`}>
              <Icon name="mail" /> {email}
            </a>
          </span>
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link className="brand" href="/">
            <Image src="/assets/img/brand/logo.png" alt={company} width={700} height={201} priority />
            <span>
              Magnesium
              <br />
              Products
            </span>
          </Link>
          <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
            {open ? 'Close' : 'Menu'}
          </button>
          <nav className={`nav${open ? ' open' : ''}`} id="nav" aria-label="Main">
            {nav.map(([href, label, active]) => (
              <Link key={href} href={href} aria-current={active ? 'page' : undefined}>
                {label}
              </Link>
            ))}
            <Link className="btn btn-primary btn-round" href="/contact/">
              Request a Quote
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
