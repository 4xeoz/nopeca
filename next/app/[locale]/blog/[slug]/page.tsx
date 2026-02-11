import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPostBySlug } from "@/actions/blog";
import { getLocalizedPost } from "@/lib/blog";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n.config";
import HomePageWrapper from "@/components/layout/HomePageWrapper";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nopeca.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const localized = getLocalizedPost(post, locale);

  return {
    title: localized.metaTitle,
    description: localized.metaDesc,
    keywords: localized.keywords ?? undefined,
    openGraph: {
      type: "article",
      title: localized.metaTitle,
      description: localized.metaDesc,
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
      ...(post.coverImage && {
        images: [
          {
            url: post.coverImage,
            width: 1200,
            height: 630,
            alt: localized.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: localized.metaTitle,
      description: localized.metaDesc,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${post.slug}`,
      languages: {
        en: `${SITE_URL}/en/blog/${post.slug}`,
        fr: `${SITE_URL}/fr/blog/${post.slug}`,
        ar: `${SITE_URL}/ar/blog/${post.slug}`,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  const dict = await getDictionary(locale as Locale);
  const localized = getLocalizedPost(post, locale);

  const backLabel: Record<string, string> = {
    en: "Back to Blog",
    fr: "Retour au Blog",
    ar: "العودة إلى المدونة",
  };

  // Article structured data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: localized.title,
    description: localized.metaDesc,
    url: `${SITE_URL}/${locale}/blog/${post.slug}`,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Nopeca",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/singl_logo_colord_white_background@4x.png`,
      },
    },
    inLanguage: locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en",
    ...(post.coverImage && {
      image: {
        "@type": "ImageObject",
        url: post.coverImage,
      },
    }),
  };

  return (
    <HomePageWrapper locale={locale} dict={dict}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <Link
          href={`/${locale}/blog`}
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-[--color-brand-secondary] transition hover:text-[--color-brand-primary]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          {backLabel[locale] || backLabel.en}
        </Link>

        {post.coverImage && (
          <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-2xl">
            <Image
              src={post.coverImage}
              alt={localized.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl font-bold leading-tight text-[--color-brand-primary] sm:text-4xl">
            {localized.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-[--color-text-primary]/60">
            <span>{post.author.name}</span>
            <span>&middot;</span>
            <time dateTime={post.createdAt.toISOString()}>
              {new Date(post.createdAt).toLocaleDateString(
                locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en-GB",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </time>
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-[--color-text-primary] prose-headings:text-[--color-brand-primary] prose-a:text-[--color-brand-secondary] prose-strong:text-[--color-text-primary]">
          {localized.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </HomePageWrapper>
  );
}
