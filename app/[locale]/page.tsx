import HeroSection from '@/components/sections/HeroSection';
import TrustStripSection from '@/components/sections/TrustStripSection';
import MetricsSection from '@/components/sections/MetricsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PillarsSection from '@/components/sections/PillarsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection from '@/components/sections/CtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <MetricsSection />
      <ServicesSection />
      <PillarsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
