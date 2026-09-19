import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StatementSection from '@/components/sections/StatementSection';
import PillarsSection from '@/components/sections/PillarsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection from '@/components/sections/CtaSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return buildPageMetadata({
    locale,
    path: '',
    title: t('title'),
    description: t('description'),
    absoluteTitle: true,
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatementSection />
      <PillarsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
