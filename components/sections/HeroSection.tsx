'use client';

import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Globe, Phone, Bot, Workflow } from 'lucide-react';
import AnimatedHero from '@/components/ui/AnimatedHero';
import HeroParallax, { type ParallaxCase } from '@/components/ui/HeroParallax';

const GridGlowBackground = dynamic(
  () => import('@/components/ui/grid-glow-background').then((m) => m.GridGlowBackground),
  { ssr: false }
);

// Capturas reales de los proyectos, no ilustraciones: el hero es la prueba de
// trabajo antes que un adorno. El orden alterna sector y formato porque las
// filas del muro se reparten en round-robin.
const CASES: ParallaxCase[] = [
  { title: 'MultiEsports Ter', thumbnail: '/cases/multiesports.webp', href: 'https://multiesportster.com/' },
  { title: 'Restaurant Arest Estanyol', thumbnail: '/cases/estanyol.webp', href: 'https://restaurantarestestanyol.com/' },
  { title: 'Mas Terrats', thumbnail: '/cases/masterrats.webp' },
  { title: 'Creuers 2mes2 — El Fadrí', thumbnail: '/cases/creuers.webp', href: 'https://creuers2mes2.com/' },
  { title: 'Mas Soles', thumbnail: '/cases/massoles.webp', href: 'https://massoles.com/' },
  { title: 'Epicentre — Palamós', thumbnail: '/clients/epicentre-out.jpeg' },
  { title: 'Gestoria Aguilera Pérez', thumbnail: '/cases/aguilera.webp', href: 'https://www.gestoriaguileraperez.com/' },
  { title: 'Oxford Oil Additives', thumbnail: '/cases/ooadditives.webp', href: 'https://www.ooadditives.com/' },
  { title: 'Camping Les Medes', thumbnail: '/clients/camping_les_medes.jpeg' },
  { title: 'Epicentre — interior', thumbnail: '/clients/epicentre-in.jpeg' },
  { title: 'Camping Les Medes — iluminación', thumbnail: '/clients/video_camping_poster.jpg' },
];

export default function HeroSection() {
  const t = useTranslations('hero');
  const ts = useTranslations('services');
  const locale = useLocale();
  const words = (t.raw('words') as string[]) ?? [];

  const offerings = [
    { icon: Globe, label: ts('items.web.title') },
    { icon: Phone, label: ts('items.voice.title') },
    { icon: Bot, label: ts('items.chatbots.title') },
    { icon: Workflow, label: ts('items.automation.title') },
  ];

  const cases = CASES.map((c) => (c.href ? c : { ...c, href: `/${locale}/clients` }));

  const header = (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_62%,transparent_94%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_62%,transparent_94%)]">
        <GridGlowBackground backgroundColor="transparent" gridSize={48} />
      </div>

      <div className="relative z-10 pt-28 pb-14 md:pt-32 md:pb-20">
        <AnimatedHero
          badge={t('badge')}
          titleBase={t('title_base')}
          words={words}
          ctaPrimary={t('cta_primary')}
          ctaSecondary={t('cta_secondary')}
          offerings={offerings}
        />
      </div>
    </div>
  );

  return (
    <section className="-mt-20">
      <HeroParallax cases={cases}>{header}</HeroParallax>
    </section>
  );
}
