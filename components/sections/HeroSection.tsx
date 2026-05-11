'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import AnimatedHero from '@/components/ui/AnimatedHero';

const AuroraBackground = dynamic(() => import('@/components/ui/AuroraBackground'), { ssr: false });

export default function HeroSection() {
  const t = useTranslations('hero');
  const words = (t.raw('words') as string[]) ?? [];

  return (
    <section className="relative h-screen -mt-20 flex items-center justify-center">
      <AuroraBackground />

      {/* Top vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/50 to-transparent" />
      {/* Bottom dissolve */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: '100vh',
          background: 'linear-gradient(to top, #0a0a0f 0%, rgba(10,10,15,0.97) 5%, rgba(10,10,15,0.88) 15%, rgba(10,10,15,0.72) 28%, rgba(10,10,15,0.50) 42%, rgba(10,10,15,0.28) 56%, rgba(10,10,15,0.10) 70%, rgba(10,10,15,0.02) 85%, transparent 100%)',
        }}
      />

      <AnimatedHero
        badge={t('badge')}
        titleBase={t('title_base')}
        words={words}
        subtitle={t('subtitle')}
        ctaPrimary={t('cta_primary')}
        ctaSecondary={t('cta_secondary')}
      />
    </section>
  );
}
