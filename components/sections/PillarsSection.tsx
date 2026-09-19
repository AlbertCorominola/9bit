'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';

const PILLARS = ['agility', 'precision', 'reliability', 'innovation'] as const;

export default function PillarsSection() {
  const t = useTranslations('pillars');
  const th = useTranslations('home');
  const locale = useLocale();

  return (
    <section
      id="about"
      className="mx-auto max-w-container-max px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Columna fija: el enunciado se queda mientras se leen los pilares. */}
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
              {th('how_we_work_label')}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl">
              {th('how_we_work')}
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-on-surface-variant">
              {th('how_we_work_intro')}
            </p>
            <Link
              href={`/${locale}/qui-som`}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-primary-text transition-colors hover:text-primary"
            >
              {th('view_all')}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Lista numerada: jerarquía clara, sin cuatro cajas iguales. */}
        <RevealGroup className="border-t border-black/[0.08]">
          {PILLARS.map((key, i) => (
            <RevealItem key={key}>
              <article className="group relative border-b border-black/[0.08] py-7 transition-colors md:py-8">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-primary-container transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <div className="flex items-start gap-5 transition-transform duration-500 ease-out group-hover:translate-x-1.5 md:gap-7">
                  <span className="mt-0.5 font-mono text-xs tabular-nums tracking-widest text-on-surface-variant/40 transition-colors duration-300 group-hover:text-primary-text">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold tracking-tight text-on-surface md:text-2xl">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-on-surface-variant">
                      {t(`${key}.desc`)}
                    </p>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
