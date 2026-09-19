'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CTAPanel from '@/components/ui/CTAPanel';
import Parallax from '@/components/ui/Parallax';
import ProcessRail, { type ProcessStep } from '@/components/ui/ProcessRail';
import ScrollZoomImage from '@/components/ui/ScrollZoomImage';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';

const CORE_KEYS = ['web', 'voice', 'chatbots', 'automation'] as const;
const EXTRA_KEYS = ['infrastructure', 'consulting', 'support', 'training'] as const;

const IMAGES: Record<(typeof CORE_KEYS)[number], string> = {
  web: '/services/web.png',
  voice: '/services/voice.png',
  chatbots: '/services/chatbots.png',
  automation: '/services/automation.png',
};

const LABEL = 'font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text';
const HEADING = 'text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl';

export default function ServeisPage() {
  const t = useTranslations('services');
  const tp = useTranslations('serveis_page');
  const locale = useLocale();

  const steps: ProcessStep[] = (['briefing', 'plan', 'build', 'launch'] as const).map((k) => ({
    title: tp(`process.${k}.title`),
    desc: tp(`process.${k}.desc`),
  }));

  const faq = tp.raw('faq.items') as { q: string; a: string }[];

  return (
    <div className="min-h-screen">
      {/* ── Cabecera ──────────────────────────────────────────────────── */}
      <section className="relative -mt-20 px-6 pb-20 pt-36 md:pb-28 md:pt-44 lg:px-10">
        <div className="mx-auto max-w-container-max">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/60 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
              {tp('badge_label')}
            </span>

            <Parallax speed={0.18}>
              <h1 className="mt-8 text-[2.7rem] font-black leading-[1.02] tracking-[-0.045em] text-on-surface sm:text-6xl md:text-7xl">
                {tp('heading')}
              </h1>
            </Parallax>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Servicios principales: una fila por servicio ──────────────── */}
      <section className="px-6 lg:px-10">
        <div className="mx-auto max-w-container-max">
          <Reveal>
            <p className={LABEL}>{t('core_label')}</p>
            <h2 className={`mt-4 ${HEADING}`}>{tp('core_heading')}</h2>
          </Reveal>

          <div className="mt-16 flex flex-col gap-24 md:mt-20 md:gap-32">
            {CORE_KEYS.map((key, i) => {
              const points = (t.raw(`items.${key}.points`) as string[]) ?? [];
              const mediaRight = i % 2 === 0;
              return (
                <article
                  key={key}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20"
                >
                  {/* En móvil la foto siempre va primero: es lo que engancha. */}
                  <Reveal
                    direction={mediaRight ? 'left' : 'right'}
                    className={mediaRight ? 'md:order-2' : ''}
                  >
                    <ScrollZoomImage
                      src={IMAGES[key]}
                      alt={t(`items.${key}.title`)}
                      priority={i === 0}
                      className="aspect-[4/3] w-full rounded-3xl border border-black/[0.08] bg-surface-container shadow-[0_40px_80px_-52px_rgba(13,17,23,0.6)] md:aspect-square"
                      sizes="(min-width: 768px) 46vw, 100vw"
                    />
                  </Reveal>

                  <div className={mediaRight ? 'md:order-1' : ''}>
                    <Reveal direction="up">
                      <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-on-surface-variant/45">
                        {String(i + 1).padStart(2, '0')} / 04
                      </span>
                      <h3 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.04em] text-on-surface md:text-4xl lg:text-5xl">
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className="mt-5 max-w-md text-base leading-relaxed text-on-surface-variant">
                        {t(`items.${key}.desc`)}
                      </p>
                    </Reveal>

                    <RevealGroup className="mt-8 max-w-md border-t border-black/[0.08]">
                      {points.map((point) => (
                        <RevealItem key={point}>
                          <p className="border-b border-black/[0.08] py-3 text-[15px] font-medium tracking-tight text-on-surface">
                            {point}
                          </p>
                        </RevealItem>
                      ))}
                    </RevealGroup>

                    <Reveal delay={0.1}>
                      <Link
                        href={`/${locale}/contacte`}
                        className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-primary-text transition-colors hover:text-primary"
                      >
                        {tp('cta_button')}
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Servicios especializados ──────────────────────────────────── */}
      <section className="px-6 py-28 md:py-40 lg:px-10">
        <div className="mx-auto max-w-container-max">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60">
              {t('more_label')}
            </p>
            <h2 className={`mt-4 ${HEADING}`}>{tp('more_heading')}</h2>
          </Reveal>

          <RevealGroup className="mt-12 border-t border-black/[0.08]">
            {EXTRA_KEYS.map((key) => (
              <RevealItem key={key}>
                <article className="group relative border-b border-black/[0.08] py-7 md:py-8">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-primary-container transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <div className="grid gap-3 transition-transform duration-500 ease-out group-hover:translate-x-1.5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-baseline md:gap-10">
                    <h3 className="text-2xl font-bold tracking-[-0.03em] text-on-surface md:text-3xl">
                      {t(`items.${key}.title`)}
                    </h3>
                    <div>
                      <p className="text-[15px] leading-relaxed text-on-surface-variant">
                        {t(`items.${key}.desc`)}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                        {((t.raw(`items.${key}.points`) as string[]) ?? []).map((point) => (
                          <li
                            key={point}
                            className="font-mono text-[11px] uppercase tracking-[0.12em] text-on-surface-variant/65"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Cómo lo hacemos ───────────────────────────────────────────── */}
      <section className="border-y border-black/[0.07] bg-surface-container/30 px-6 py-28 md:py-40 lg:px-10">
        <div className="mx-auto max-w-container-max">
          <Reveal className="mb-16 max-w-2xl">
            <p className={LABEL}>{tp('methodology_label')}</p>
            <h2 className={`mt-4 ${HEADING}`}>{tp('methodology_heading')}</h2>
          </Reveal>

          <ProcessRail steps={steps} />
        </div>
      </section>

      {/* ── Preguntas frecuentes ──────────────────────────────────────── */}
      <section className="px-6 py-28 md:py-40 lg:px-10">
        <div className="mx-auto grid max-w-container-max gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="md:sticky md:top-32 md:self-start">
            <p className={LABEL}>{tp('faq.label')}</p>
            <h2 className={`mt-4 ${HEADING}`}>{tp('faq.heading')}</h2>
          </Reveal>

          <RevealGroup className="border-t border-black/[0.08]">
            {faq.map(({ q, a }) => (
              <RevealItem key={q}>
                <details className="group border-b border-black/[0.08] py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-on-surface [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold leading-snug transition-colors group-open:text-primary-text md:text-lg">
                      {q}
                    </h3>
                    {/* Signo +/− dibujado con dos barras: una pieza menos que
                        mantener y encaja mejor que un icono importado. */}
                    <span aria-hidden className="relative mt-2 h-3 w-3 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-primary-text" />
                      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-primary-text transition-transform duration-300 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
                    {a}
                  </p>
                </details>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTAPanel
        heading={tp('cta_heading')}
        subtitle={tp('cta_sub')}
        buttonLabel={tp('cta_button')}
      />
    </div>
  );
}
