'use client';

import { useTranslations } from 'next-intl';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';

type Item = { name: string; company: string; quote: string; initials?: string };

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const items = (t.raw('items') as Item[]) ?? [];

  return (
    <section className="mx-auto max-w-container-max px-6 py-24 md:py-32 lg:px-10">
      <Reveal direction="up" className="mb-14 max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
          {t('label')}
        </p>
        <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl">
          {t('heading')}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-on-surface-variant">{t('intro')}</p>
      </Reveal>

      {/* Móvil: carrusel con snap para que las tarjetas no queden a medias. */}
      <div className="-mx-6 overflow-x-auto px-6 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <RevealGroup className="flex w-max snap-x snap-mandatory gap-4 pb-4">
          {items.map((item, i) => (
            <RevealItem key={i} className="w-[310px] shrink-0 snap-start">
              <TestimonialCard {...item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <RevealGroup className="hidden gap-5 md:grid md:grid-cols-3">
        {items.map((item, i) => (
          <RevealItem key={i} className="h-full">
            <TestimonialCard {...item} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
