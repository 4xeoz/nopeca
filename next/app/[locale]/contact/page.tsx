import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import ContactPageClient from "@/components/sections/ContactPageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.nav.contact} — Nopeca`,
    description: dict.footer.weWouldLove,
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return <ContactPageClient dict={dict} locale={locale} />;
}
