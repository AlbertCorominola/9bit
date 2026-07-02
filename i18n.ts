import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

export const locales = ['ca', 'es', 'en'] as const;
export const defaultLocale = 'ca' as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  // next-intl v4: fall back to the default locale instead of calling notFound().
  // Invalid locales still render a 404 via the check in app/[locale]/layout.tsx.
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
