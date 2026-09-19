'use client';

import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import AnimatedHero from '@/components/ui/AnimatedHero';
import LiveCallDemo, { type CallLine } from '@/components/ui/LiveCallDemo';
import ClientMarquee from '@/components/ui/ClientMarquee';
import HeroParallax, { type ParallaxCase } from '@/components/ui/HeroParallax';

const GridGlowBackground = dynamic(
  () => import('@/components/ui/grid-glow-background').then((m) => m.GridGlowBackground),
  { ssr: false }
);

// Capturas reales de los proyectos, no ilustraciones: el muro es la prueba de
// trabajo antes que un adorno. Nueve casos, tres por fila.
const CASES: ParallaxCase[] = [
  { title: 'MultiEsports Ter', thumbnail: '/cases/multiesports.webp', href: 'https://multiesportster.com/' },
  { title: 'Restaurant Arest Estanyol', thumbnail: '/cases/estanyol.webp', href: 'https://restaurantarestestanyol.com/' },
  { title: 'Mas Terrats', thumbnail: '/cases/masterrats.webp' },
  { title: 'Creuers 2mes2 — El Fadrí', thumbnail: '/cases/creuers.webp', href: 'https://creuers2mes2.com/' },
  { title: 'Mas Soles', thumbnail: '/cases/massoles.webp', href: 'https://massoles.com/' },
  { title: 'Epicentre — Palamós', thumbnail: '/clients/epicentre-out.jpeg' },
  { title: 'Gestoria Aguilera Pérez', thumbnail: '/cases/aguilera.webp', href: 'https://www.gestoriaguileraperez.com/' },
  { title: 'Oxford Oil Additives', thumbnail: '/cases/ooadditives.webp', href: 'https://www.ooadditives.com/' },
  { title: 'Epicentre — interior', thumbnail: '/clients/epicentre-in.jpeg' },
];

export default function HeroSection() {
  const t = useTranslations('hero');
  const ts = useTranslations('services');
  const tm = useTranslations('metrics');
  const th = useTranslations('home');
  const locale = useLocale();

  const words = (t.raw('words') as string[]) ?? [];
  const lines = (t.raw('demo.lines') as CallLine[]) ?? [];

  const offerings = [
    ts('items.web.title'),
    ts('items.voice.title'),
    ts('items.chatbots.title'),
    ts('items.automation.title'),
  ];

  const metrics = [
    { value: tm('experience.value'), label: tm('experience.label') },
    { value: tm('satisfaction.value'), label: tm('satisfaction.label') },
    { value: tm('response.value'), label: tm('response.label') },
    { value: tm('interventions.value'), label: tm('interventions.label') },
  ];

  const cases = CASES.map((c) => (c.href ? c : { ...c, href: `/${locale}/clients` }));

  const proof = (
    <div className="border-t border-black/[0.08] pt-7">
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
        {metrics.map((m) => (
          <li key={m.label} className="flex items-baseline gap-2">
            <span className="font-sans text-xl font-black tracking-tight text-on-surface sm:text-2xl">
              {m.value}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">
              {m.label}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/55">
        {th('trust_strip')}
      </p>
      <div className="relative mt-1">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />
        <ClientMarquee />
      </div>
    </div>
  );

  const header = (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_62%,transparent_94%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_62%,transparent_94%)]">
        <GridGlowBackground backgroundColor="transparent" gridSize={48} />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-10 pt-24">
        <AnimatedHero
          badge={t('badge')}
          titleBase={t('title_base')}
          words={words}
          ctaPrimary={t('cta_primary')}
          ctaSecondary={t('cta_secondary')}
          offerings={offerings}
          demo={
            <LiveCallDemo
              status={t('demo.status')}
              subtitle={t('demo.subtitle')}
              agentLabel={t('demo.agent_label')}
              callerLabel={t('demo.caller_label')}
              note={t('demo.note')}
              result={t('demo.result')}
              lines={lines}
            />
          }
          proof={proof}
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
