import type { MetadataRoute } from 'next';

const SITE = 'https://9-bit.com';
const LOCALES = ['ca', 'es', 'en'] as const;
const PATHS = ['', '/serveis', '/contacte', '/qui-som', '/clients'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${SITE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1.0 : 0.8,
    }))
  );
}
