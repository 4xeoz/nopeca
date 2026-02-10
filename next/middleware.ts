import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { i18n } from '@/i18n.config';

export default auth((request) => {
  const pathname = request.nextUrl.pathname;

  // --- Admin route protection ---
  if (pathname.startsWith('/admin')) {
    // Allow the login page without auth
    if (pathname === '/admin/login') {
      // If already logged in, redirect to dashboard
      if (request.auth) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // All other /admin/* pages require authentication
    if (!request.auth) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // /admin/admins requires SUPER_ADMIN role
    if (pathname.startsWith('/admin/admins')) {
      const role = (request.auth.user as { role?: string })?.role;
      if (role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }

    return NextResponse.next();
  }

  // --- Locale routing for public pages ---
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to default locale if no locale found
  return NextResponse.redirect(
    new URL(`/${i18n.defaultLocale}${pathname}`, request.url)
  );
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest\\.json|sitemap\\.xml|robots\\.txt|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)'],
};
