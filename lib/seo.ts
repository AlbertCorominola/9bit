import type { Metadata } from 'next';

const SITE = 'https://9-bit.com';
const LOCALES = ['ca', 'es', 'en'] as const;

/**
 * Builds page-specific metadata (title, description, canonical + hreflang)
 * that overrides the locale-layout defaults on every subpage.
 *
 * `path` is the locale-relative path ('' for home, '/serveis', ...).
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = `${SITE}/${locale}${path}`;
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE}/${l}${path}`;
  }
  languages['x-default'] = `${SITE}/`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: '9bit',
      locale,
      type: 'website',
      images: [{ url: '/logo_9bit_sin_fondo.png', width: 1200, height: 630, alt: '9bit' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo_9bit_sin_fondo.png'],
    },
  };
}
