'use client';

import { useTranslations } from 'next-intl';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import Parallax from '@/components/ui/Parallax';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const TESTIMONIALS = (t.raw('items') as Array<{ name: string; company: string; quote: string }>) ?? [];
  return (
    <section className="py-margin px-6 lg:px-10 max-w-container-max mx-auto">
      <Parallax speed={0.16} className="mb-12 max-w-2xl">
        <Reveal direction="up">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
            {t('heading')}
          </h2>
        </Reveal>
      </Parallax>

      {/* Móvil: carrusel horizontal con snap para que las tarjetas no queden a
          medias al soltar. Escritorio: rejilla. */}
      <div className="md:hidden -mx-6 px-6 overflow-x-auto snap-x snap-mandatory scroll-pl-6">
        <RevealGroup className="flex w-max gap-4 pb-4">
          {TESTIMONIALS.map((tt, i) => (
            <RevealItem key={i} className="w-[300px] shrink-0 snap-start">
              <TestimonialCard {...tt} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <RevealGroup className="hidden md:grid grid-cols-3 gap-5">
        {TESTIMONIALS.map((tt, i) => (
          <RevealItem key={i}>
            <TestimonialCard {...tt} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
