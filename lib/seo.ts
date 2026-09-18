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
    // Sin `images`: así se usa la imagen generada en `opengraph-image.tsx`
    // (1200x630 de verdad). El logo declaraba ese tamaño pero mide 350x350.
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: '9bit',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
