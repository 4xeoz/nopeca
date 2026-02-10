import type { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nopeca.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = i18n.locales.filter((l) => l !== 'ar');

  const routes = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
  }));

  return routes;
}
