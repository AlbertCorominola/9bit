'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Zap, Target, ShieldCheck, Rocket,
  Search, PenTool, Hammer, HeartHandshake,
} from 'lucide-react';
import Parallax from '@/components/ui/Parallax';

/* ─── animation helpers ─────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
});

const revealUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(5px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── data ──────────────────────────────────────────────────────────────── */

const PILLARS = [
  { icon: Zap, key: 'agility' as const },
  { icon: Target, key: 'precision' as const },
  { icon: ShieldCheck, key: 'reliability' as const },
  { icon: Rocket, key: 'innovation' as const },
];

/* ─── component ─────────────────────────────────────────────────────────── */

export default function QuiSomPage() {
  const t  = useTranslations('qui_som_page');
  const tp = useTranslations('pillars');

  const TIMELINE = [
    { year: '2001', label: t('timeline.t2001') },
    { year: '2005', label: t('timeline.t2005') },
    { year: '2010', label: t('timeline.t2010') },
    { year: '2016', label: t('timeline.t2016') },
    { year: '2020', label: t('timeline.t2020') },
    { year: '2024', label: t('timeline.t2024') },
  ];

  const PROCESS = [
    {
      icon: Search,
      step: '01',
      title: t('process.discovery.title'),
      desc: t('process.discovery.desc'),
    },
    {
      icon: PenTool,
      step: '02',
      title: t('process.design.title'),
      desc: t('process.design.desc'),
    },
    {
      icon: Hammer,
      step: '03',
      title: t('process.build.title'),
      desc: t('process.build.desc'),
    },
    {
      icon: HeartHandshake,
      step: '04',
      title: t('process.support.title'),
      desc: t('process.support.desc'),
    },
  ];

  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-20 pt-40 pb-24 px-6 lg:px-10 overflow-hidden">

        {/* decorative: animated orbs (subdued) */}
        <motion.div
          className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-container/[0.08] blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute top-10 left-[-100px] w-[380px] h-[380px] rounded-full bg-indigo-500/[0.08] blur-3xl"
          animate={{ x: [0, -15, 0], y: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* decorative: giant background year */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 select-none overflow-hidden"
        >
          <span
            className="font-black tracking-tighter opacity-[0.025] text-primary-container leading-none"
            style={{ fontSize: 'clamp(120px, 18vw, 280px)' }}
          >
            2001
          </span>
        </div>

        {/* foreground content */}
        <div className="relative z-10 max-w-container-max mx-auto">

          {/* badge */}
          <motion.div {...fadeUp(0)} className="mb-6">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-primary-container bg-primary-container/10 border border-primary-container/30 px-3 py-1 rounded-full uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
              {t('badge')}
            </span>
          </motion.div>

          {/* heading */}
          <Parallax speed={0.2}>
            <motion.h1
              {...fadeUp(0.08)}
              className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-6 max-w-4xl leading-[1.05]"
            >
              {t('heading')}
            </motion.h1>
          </Parallax>

          {/* subtitle */}
          <motion.p {...fadeUp(0.16)} className="text-on-surface-variant text-lg max-w-2xl mb-14">
            {t('subtitle')}
          </motion.p>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. STORY SECTION — asymmetric two-column with timeline
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">

          {/* LEFT — 60% — text + timeline */}
          <div className="lg:col-span-3">
            <motion.div {...revealUp(0)}>
              <h2 className="text-4xl font-black tracking-tighter text-on-surface mb-4">
                {t('story_title')}
              </h2>
              <div className="h-[3px] w-14 bg-primary-container mb-8" />
              <p className="text-on-surface-variant text-base leading-relaxed mb-5">{t('story_p1')}</p>
              <p className="text-on-surface-variant text-base leading-relaxed mb-12">{t('story_p2')}</p>
            </motion.div>

            {/* vertical timeline */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="relative pl-8 border-l-2 border-primary-container/20 space-y-8"
            >
              {TIMELINE.map(({ year, label }) => (
                <motion.div key={year} variants={staggerItem} className="relative">
                  {/* dot */}
                  <span className="absolute -left-[calc(2rem+5px)] top-[5px] w-2.5 h-2.5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
                  <span className="font-mono text-[11px] text-primary-container uppercase tracking-widest mb-1 block">{year}</span>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — 40% — glass card with quote */}
          <motion.div
            {...revealUp(0.15)}
            className="lg:col-span-2 sticky top-28"
          >
            <div className="glass-panel rounded-2xl border border-primary-container/20 p-8 relative overflow-hidden">
              {/* accent diagonal */}
              <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary-container/10 blur-2xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-container/40 to-transparent" />

              <span className="font-mono text-[11px] text-primary-text uppercase tracking-widest mb-5 block">
                {t('about_label')}
              </span>

              <blockquote className="text-on-surface font-sans text-xl font-semibold leading-snug mb-8 tracking-tight">
                &ldquo;{t('story_p1').split('.')[0]}.&rdquo;
              </blockquote>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. STATS BANNER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-10 bg-surface-container/40 border-y border-outline-variant/20 overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-container/5 via-transparent to-primary-container/5" />

        <div className="max-w-container-max mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center"
          >
            {[
              { raw: '2001', label: t('fact_year') },
              { raw: '100%', label: t('fact_projects') },
              { raw: '24/7',  label: t('fact_clients') },
              { raw: '<2h',  label: t('fact_response') },
            ].map(({ raw, label }) => (
              <motion.div key={label} variants={staggerItem} className="relative group">
                <div className="font-black text-7xl md:text-8xl tracking-tighter shiny-text mb-2">
                  {raw}
                </div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. PILARES — rejilla 2x2 numerada, sin tarjeta "featured" que
             rompia la simetria de la parrilla
      ══════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 md:py-32 lg:px-10">
        <div className="mx-auto max-w-container-max">
          <motion.div {...revealUp(0)} className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
              {t('values_label')}
            </span>
            <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl">
              {t('pillars_title')}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-on-surface-variant">
              {t('pillars_intro')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {PILLARS.map(({ icon: Icon, key }, i) => (
              <motion.article
                key={key}
                variants={staggerItem}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/[0.08] bg-surface-container-low p-8 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-primary-container/25 hover:shadow-[0_30px_60px_-34px_rgba(13,17,23,0.4)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary-container via-primary-container/40 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <div className="mb-6 flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-container/20 bg-primary-container/10">
                    <Icon className="text-primary-container" size={21} />
                  </span>
                  <span className="font-mono text-xs tabular-nums tracking-[0.2em] text-on-surface-variant/35 transition-colors duration-300 group-hover:text-primary-text">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-on-surface md:text-2xl">
                  {tp(`${key}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-on-surface-variant">
                  {tp(`${key}.desc`)}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. COMO TRABAJAMOS — rail numerado con hilo conductor
      ══════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-black/[0.07] bg-surface-container/30 px-6 py-24 md:py-32 lg:px-10">
        <div className="mx-auto max-w-container-max">
          <motion.div {...revealUp(0)} className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
              {t('methodology_label')}
            </span>
            <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl">
              {t('methodology_heading')}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-on-surface-variant">
              {t('methodology_intro')}
            </p>
          </motion.div>

          {/* Escritorio: cuatro pasos colgando de una misma linea. */}
          <div className="relative mt-16 hidden md:block">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-[15px] h-px bg-gradient-to-r from-transparent via-primary-container/30 to-transparent"
            />
            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="relative grid grid-cols-4 gap-8"
            >
              {PROCESS.map(({ icon: Icon, step, title, desc }) => (
                <motion.li key={step} variants={staggerItem} className="group">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-container/30 bg-background font-mono text-[11px] font-bold tabular-nums text-primary-text transition-colors duration-300 group-hover:border-primary-container group-hover:bg-primary-container group-hover:text-white">
                    {step}
                  </span>
                  <h3 className="mt-6 flex items-center gap-2.5 text-lg font-bold tracking-tight text-on-surface">
                    <Icon size={17} className="shrink-0 text-primary-container" />
                    {title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-on-surface-variant">{desc}</p>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          {/* Movil: la misma secuencia en vertical. */}
          <ol className="relative mt-14 space-y-9 border-l border-primary-container/20 pl-8 md:hidden">
            {PROCESS.map(({ icon: Icon, step, title, desc }, i) => (
              <motion.li key={step} {...revealUp(i * 0.08)} className="relative">
                <span className="absolute -left-[calc(2rem+15px)] top-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary-container/30 bg-background font-mono text-[10px] font-bold tabular-nums text-primary-text">
                  {step}
                </span>
                <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-on-surface">
                  <Icon size={15} className="shrink-0 text-primary-container" />
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
