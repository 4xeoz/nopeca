import type { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';
import { getAllPublishedSlugs } from '@/actions/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nopeca.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = i18n.locales.filter((l) => l !== 'ar');
  const allLocales = i18n.locales;

  // Home pages
  const routes: MetadataRoute.Sitemap = locales.map((locale) => ({
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

  // Blog listing pages
  allLocales.forEach((locale) => {
    routes.push({
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          allLocales.map((l) => [l, `${SITE_URL}/${l}/blog`])
        ),
      },
    });
  });

  // Individual blog posts
  let posts: { slug: string; updatedAt: Date }[] = [];
  try {
    posts = await getAllPublishedSlugs();
  } catch {
    // DB not available during build — skip blog posts in sitemap
  }
  posts.forEach((post) => {
    allLocales.forEach((locale) => {
      routes.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            allLocales.map((l) => [l, `${SITE_URL}/${l}/blog/${post.slug}`])
          ),
        },
      });
    });
  });

  return routes;
}
