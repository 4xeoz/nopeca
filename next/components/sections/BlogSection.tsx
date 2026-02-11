import Link from "next/link";
import Image from "next/image";
import { getRecentPosts } from "@/actions/blog";
import { getLocalizedPost } from "@/lib/blog";

interface BlogSectionProps {
  locale: string;
}

export default async function BlogSection({ locale }: BlogSectionProps) {
  const posts = await getRecentPosts(3);

  if (posts.length === 0) return null;

  const labels: Record<string, { badge: string; title: string; readMore: string; viewAll: string }> = {
    en: {
      badge: "From Our Blog",
      title: "Latest Articles & Guides",
      readMore: "Read more",
      viewAll: "View all posts",
    },
    fr: {
      badge: "Notre Blog",
      title: "Derniers Articles & Guides",
      readMore: "Lire la suite",
      viewAll: "Voir tous les articles",
    },
    ar: {
      badge: "من مدونتنا",
      title: "أحدث المقالات والأدلة",
      readMore: "اقرأ المزيد",
      viewAll: "عرض جميع المقالات",
    },
  };

  const l = labels[locale] || labels.en;

  return (
    <section id="blog" className="bg-[--color-bg-primary] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-[--color-brand-primary]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[--color-brand-primary]">
            {l.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[--color-brand-primary] sm:text-4xl">
            {l.title}
          </h2>
        </div>

        {/* Posts grid */}
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
                  <h3 className="mt-2 text-lg font-bold text-[--color-brand-primary] line-clamp-2">
                    {localized.title}
                  </h3>
                  <p className="mt-2 text-sm text-[--color-text-primary]/70 line-clamp-2">
                    {localized.excerpt}
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[--color-brand-secondary]">
                    {l.readMore} &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 rounded-full bg-[--color-brand-secondary] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {l.viewAll}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
