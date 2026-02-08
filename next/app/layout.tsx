import type { Metadata } from 'next';
import { i18n } from '@/i18n.config';
import { Toaster } from '@/components/ui/sonner';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import './globals.css';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome',
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
    <html suppressHydrationWarning>
      <body className=''>
        <LoadingOverlay />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
