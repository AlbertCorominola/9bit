import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import HeroSection from '@/components/sections/HeroSection';
import TrustStripSection from '@/components/sections/TrustStripSection';
import MetricsSection from '@/components/sections/MetricsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StatementSection from '@/components/sections/StatementSection';
import PillarsSection from '@/components/sections/PillarsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection from '@/components/sections/CtaSection';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta.home' });
  return buildPageMetadata({
    locale: params.locale,
    path: '',
    title: t('title'),
    description: t('description'),
    absoluteTitle: true,
  });
}

export default function Home({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <MetricsSection />
      <ServicesSection />
      <StatementSection />
      <PillarsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
