import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import ServeisContent from './ServeisContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta.serveis' });
  return buildPageMetadata({
    locale: params.locale,
    path: '/serveis',
    title: t('title'),
    description: t('description'),
  });
}

export default async function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  // Marcado FAQPage: es lo que permite que estas preguntas puedan aparecer
  // desplegadas en los resultados de búsqueda.
  const t = await getTranslations({ locale: params.locale, namespace: 'serveis_page' });
  const faqItems = t.raw('faq.items') as { q: string; a: string }[];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServeisContent />
    </>
  );
}
