import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import ContacteContent from './ContacteContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta.contacte' });
  return buildPageMetadata({
    locale: params.locale,
    path: '/contacte',
    title: t('title'),
    description: t('description'),
  });
}

export default function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <ContacteContent />;
}
