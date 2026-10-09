import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <h1>Page not found</h1>
          <p>The page you requested does not exist or has moved.</p>
        </div>
      </div>
      <section>
        <div className="wrap" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" href="/">
            Go to the home page
          </Link>
          <Link className="btn btn-line" href="/products/">
            View magnesium products
          </Link>
        </div>
      </section>
    </>
  );
}
