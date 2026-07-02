import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import LegalContent from './LegalContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta.legal' });
  return buildPageMetadata({
    locale: params.locale,
    path: '/legal',
    title: t('title'),
    description: t('description'),
  });
}

export default function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <LegalContent />;
}
