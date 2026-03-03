import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import UniversitiesPageClient from "@/components/sections/UniversitiesPageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.universities.pageTitle} — Nopeca`,
    description: dict.universities.pageSubtitle,
  };
}

export default async function UniversitiesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return <UniversitiesPageClient dict={dict} locale={locale} />;
}
