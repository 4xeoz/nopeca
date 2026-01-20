import { i18n } from '@/i18n.config';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return (
    <div lang={locale} dir={isArabic ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}
