import type { Metadata } from 'next';
import { i18n } from '@/i18n.config';
import { Toaster } from '@/components/ui/sonner';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import './globals.css';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nopeca.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Nopeca — Study Abroad from Algeria | UK Universities',
    template: '%s | Nopeca',
  },
  description:
    'Nopeca helps Algerian students study abroad at top UK universities. Applications, visas, flights and arrival support. Based in Boumerdes, Algeria.',
  keywords: [
    'study abroad Algeria',
    'étudier à l\'étranger Algérie',
    'UK universities for Algerians',
    'Nopeca',
    'study in UK from Algeria',
    'Boumerdes',
    'visa UK Algérie',
    'Oxford',
    'Cambridge',
    'UCL',
    'student support Algeria',
    'الدراسة في الخارج الجزائر',
  ],
  authors: [{ name: 'Nopeca', url: SITE_URL }],
  creator: 'Nopeca',
  publisher: 'Nopeca',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Nopeca',
    locale: 'en_DZ',
    alternateLocale: ['fr_DZ'],
    url: SITE_URL,
    title: 'Nopeca — Your Gateway to Studying Abroad from Algeria',
    description:
      'From Boumerdes to the UK\'s top universities. Nopeca guides Algerian students through every step — applications, visas, flights, and 1-to-1 arrival support.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nopeca — Study Abroad from Algeria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nopeca — Study Abroad from Algeria',
    description:
      'We help Algerian students get into top UK universities. Applications, visas, flights, and arrival support.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': `${SITE_URL}/en`,
      'fr': `${SITE_URL}/fr`,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <LoadingOverlay />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
