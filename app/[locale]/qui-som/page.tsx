import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import QuiSomContent from './QuiSomContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta.qui_som' });
  return buildPageMetadata({
    locale: params.locale,
    path: '/qui-som',
    title: t('title'),
    description: t('description'),
  });
}

export default function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <QuiSomContent />;
}
