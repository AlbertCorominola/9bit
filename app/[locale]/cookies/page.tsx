import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import CookiesContent from './CookiesContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta.cookies' });
  return buildPageMetadata({
    locale: params.locale,
    path: '/cookies',
    title: t('title'),
    description: t('description'),
  });
}

export default function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <CookiesContent />;
}
