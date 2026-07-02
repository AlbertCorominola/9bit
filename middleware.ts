import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  // Fresh nonce per request. Next.js picks it up from the
  // Content-Security-Policy *request* header and stamps it on all of its
  // framework <script> tags during dynamic rendering.
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const csp = [
    "default-src 'self'",
    // 'strict-dynamic' lets nonced scripts load their own chunks; the host
    // allowlist below is the fallback for browsers without strict-dynamic
    // support (e.g. Vercel Speed Insights).
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com`,
    // framer-motion and next-themes inject inline styles; nonce for styles is
    // not practical here, so styles keep 'unsafe-inline'.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://formspree.io https://vitals.vercel-insights.com https://va.vercel-scripts.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  // IMPORTANT: always OVERWRITE (never merge) inbound values. next@14 is
  // affected by GHSA-ffhc-5mcf-pf4q, where malformed attacker-supplied
  // Content-Security-Policy request headers can be reflected into HTML.
  // Unconditionally replacing the header on every HTML route implements the
  // advisory's documented workaround (strip untrusted inbound CSP headers).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', csp);
  requestHeaders.set('x-nonce', nonce);

  const response = handleI18nRouting(
    new NextRequest(request, { headers: requestHeaders })
  );
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
