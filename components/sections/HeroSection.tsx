'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Phone, Bot, Workflow } from 'lucide-react';
import AnimatedHero from '@/components/ui/AnimatedHero';

const GridGlowBackground = dynamic(
  () => import('@/components/ui/grid-glow-background').then((m) => m.GridGlowBackground),
  { ssr: false }
);

export default function HeroSection() {
  const t = useTranslations('hero');
  const ts = useTranslations('services');
  const words = (t.raw('words') as string[]) ?? [];

  const offerings = [
    { icon: Globe, label: ts('items.web.title') },
    { icon: Phone, label: ts('items.voice.title') },
    { icon: Bot, label: ts('items.chatbots.title') },
    { icon: Workflow, label: ts('items.automation.title') },
  ];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative h-screen -mt-20 flex items-center justify-center">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_48%,transparent_78%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_48%,transparent_78%)]"
      >
        <GridGlowBackground backgroundColor="transparent" gridSize={48} />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full">
        <AnimatedHero
          badge={t('badge')}
          titleBase={t('title_base')}
          words={words}
          subtitle={t('subtitle')}
          ctaPrimary={t('cta_primary')}
          ctaSecondary={t('cta_secondary')}
          offerings={offerings}
        />
      </motion.div>
    </section>
  );
}
