import type { MetadataRoute } from 'next';

const SITE = 'https://9-bit.com';
const LOCALES = ['ca', 'es', 'en'] as const;
const PATHS = ['', '/serveis', '/contacte', '/qui-som', '/clients', '/legal', '/privacitat', '/cookies'] as const;
const LEGAL_PATHS: readonly string[] = ['/legal', '/privacitat', '/cookies'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${SITE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: LEGAL_PATHS.includes(path) ? ('yearly' as const) : ('monthly' as const),
      priority: path === '' ? 1.0 : LEGAL_PATHS.includes(path) ? 0.3 : 0.8,
    }))
  );
}
