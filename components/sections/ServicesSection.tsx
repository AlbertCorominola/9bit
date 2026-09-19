'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ServicesShowcase, { type ShowcaseSlide } from '@/components/ui/ServicesShowcase';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';

const CORE_KEYS = ['web', 'voice', 'chatbots', 'automation'] as const;
const EXTRA_KEYS = ['infrastructure', 'consulting', 'support', 'training'] as const;

const IMAGES: Record<(typeof CORE_KEYS)[number], string> = {
  web: '/services/web.png',
  voice: '/services/voice.png',
  chatbots: '/services/chatbots.png',
  automation: '/services/automation.png',
};

export default function ServicesSection() {
  const t = useTranslations('services');
  const th = useTranslations('home');
  const locale = useLocale();

  const slides: ShowcaseSlide[] = CORE_KEYS.map((key) => ({
    title: t(`items.${key}.title`),
    description: t(`items.${key}.desc`),
    image: IMAGES[key],
    // Automatización es el último: sin una pantalla extra el scroll se lo lleva
    // por delante antes de que dé tiempo a leerlo.
    weight: key === 'automation' ? 2 : 1,
  }));

  return (
    <section id="services">
      <ServicesShowcase
        label={t('core_tag')}
        heading={t('heading')}
        intro={t('intro')}
        slides={slides}
        ctaLabel={th('view_all')}
        ctaHref={`/${locale}/serveis`}
      />

      {/* Servicios especializados: una tira de titulares, sin cajas ni iconos. */}
      <div className="mx-auto max-w-container-max px-6 pb-24 md:pb-32 lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60">
            {t('more_label')}
          </p>
        </Reveal>
        <RevealGroup className="mt-6 border-t border-black/[0.08]">
          {EXTRA_KEYS.map((key) => (
            <RevealItem key={key}>
              <Link
                href={`/${locale}/serveis`}
                className="group relative flex items-baseline justify-between gap-6 border-b border-black/[0.08] py-6 md:py-7"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-primary-container transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <span className="text-2xl font-bold tracking-[-0.03em] text-on-surface transition-transform duration-500 ease-out group-hover:translate-x-1.5 md:text-3xl">
                  {t(`items.${key}.title`)}
                </span>
                <span className="hidden max-w-md flex-1 text-right text-sm leading-relaxed text-on-surface-variant lg:block">
                  {t(`items.${key}.desc`)}
                </span>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 -translate-x-1 text-on-surface-variant/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-primary-container"
                />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
