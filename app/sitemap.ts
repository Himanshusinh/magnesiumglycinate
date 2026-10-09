import type { MetadataRoute } from 'next';
import { abs, productUrl, products, syncedAt } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(syncedAt);
  const paths = ['/', '/products/', ...products.map(productUrl), '/about/', '/contact/', '/privacy-policy/'];
  return paths.map((p) => ({ url: abs(p), lastModified }));
}
