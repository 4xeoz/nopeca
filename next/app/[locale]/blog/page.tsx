import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/actions/blog";
import { getLocalizedPost } from "@/lib/blog";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n.config";
import HomePageWrapper from "@/components/layout/HomePageWrapper";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nopeca.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const titles: Record<string, string> = {
    en: "Blog — Study Abroad Tips & Guides | Nopeca",
    fr: "Blog — Conseils et Guides pour Étudier à l'Étranger | Nopeca",
    ar: "المدونة — نصائح وإرشادات للدراسة في الخارج | Nopeca",
  };
  const descriptions: Record<string, string> = {
    en: "Read the latest tips, guides, and stories about studying abroad from Algeria to UK universities. Expert advice from Nopeca.",
    fr: "Lisez les derniers conseils, guides et récits sur les études à l'étranger depuis l'Algérie vers les universités britanniques. Conseils d'experts de Nopeca.",
    ar: "اقرأ أحدث النصائح والأدلة والقصص حول الدراسة في الخارج من الجزائر إلى الجامعات البريطانية. نصائح الخبراء من Nopeca.",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${SITE_URL}/${locale}/blog`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: {
        en: `${SITE_URL}/en/blog`,
        fr: `${SITE_URL}/fr/blog`,
        ar: `${SITE_URL}/ar/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const posts = await getPublishedPosts();

  const blogLabels: Record<string, { title: string; subtitle: string; readMore: string; noPosts: string }> = {
    en: {
      title: "Our Blog",
      subtitle: "Tips, guides, and stories about studying abroad",
      readMore: "Read more",
      noPosts: "No posts yet. Check back soon!",
    },
    fr: {
      title: "Notre Blog",
      subtitle: "Conseils, guides et récits sur les études à l'étranger",
      readMore: "Lire la suite",
      noPosts: "Pas encore d'articles. Revenez bientôt !",
    },
    ar: {
      title: "مدونتنا",
      subtitle: "نصائح وأدلة وقصص حول الدراسة في الخارج",
      readMore: "اقرأ المزيد",
      noPosts: "لا توجد مقالات حتى الآن. عد قريبًا!",
    },
  };

  const labels = blogLabels[locale] || blogLabels.en;

  return (
    <HomePageWrapper locale={locale} dict={dict}>
      {/* Blog JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: labels.title,
            description: labels.subtitle,
            url: `${SITE_URL}/${locale}/blog`,
            publisher: {
              "@type": "Organization",
              name: "Nopeca",
              url: SITE_URL,
            },
          }),
        }}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-[--color-brand-primary] sm:text-4xl">
            {labels.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[--color-text-primary]/70">
            {labels.subtitle}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-[--color-text-primary]/60">
            {labels.noPosts}
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const localized = getLocalizedPost(post, locale);
              return (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[--color-border-soft] bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {post.coverImage ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={localized.title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center bg-[--color-brand-primary]/5">
                      <svg className="h-12 w-12 text-[--color-brand-primary]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-5">
                    <time className="text-xs text-[--color-text-primary]/50">
                      {new Date(post.createdAt).toLocaleDateString(
                        locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en-GB",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </time>
                    <h2 className="mt-2 text-lg font-bold text-[--color-brand-primary] line-clamp-2">
                      {localized.title}
                    </h2>
                    <p className="mt-2 text-sm text-[--color-text-primary]/70 line-clamp-3">
                      {localized.excerpt}
                    </p>
                    <span className="mt-4 inline-block text-sm font-semibold text-[--color-brand-secondary]">
                      {labels.readMore} &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </HomePageWrapper>
  );
}
