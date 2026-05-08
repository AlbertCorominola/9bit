'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Zap, Target, ShieldCheck, Rocket,
  Calendar, MapPin, FolderGit2, Users, Clock, ArrowRight,
  Search, PenTool, Hammer, HeartHandshake,
} from 'lucide-react';
import Link from 'next/link';

/* ─── animation helpers ─────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
});

const revealUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
});

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── data ──────────────────────────────────────────────────────────────── */

const PILLARS = [
  { icon: Zap,         key: 'agility'     as const, featured: true },
  { icon: Target,      key: 'precision'   as const, featured: false },
  { icon: ShieldCheck, key: 'reliability' as const, featured: false },
  { icon: Rocket,      key: 'innovation'  as const, featured: false },
];

/* ─── component ─────────────────────────────────────────────────────────── */

export default function QuiSomPage() {
  const t  = useTranslations('qui_som_page');
  const tp = useTranslations('pillars');
  const locale = useLocale();

  const facts = [
    { icon: Calendar,    label: t('fact_year'),     value: '2001' },
    { icon: MapPin,      label: t('fact_location'), value: 'Girona, CAT' },
    { icon: FolderGit2,  label: t('fact_projects'), value: '+500' },
    { icon: Users,       label: t('fact_clients'),  value: '+50' },
    { icon: Clock,       label: t('fact_response'), value: '<2h' },
  ];

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
          <motion.h1
            {...fadeUp(0.08)}
            className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-6 max-w-4xl leading-[1.05]"
          >
            {t('heading')}
          </motion.h1>

          {/* subtitle */}
          <motion.p {...fadeUp(0.16)} className="text-on-surface-variant text-lg max-w-2xl mb-14">
            {t('subtitle')}
          </motion.p>

          {/* metric pills */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3"
          >
            {facts.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="glass-panel flex items-center gap-3 px-4 py-2.5 rounded-full border border-outline-variant/30"
              >
                <Icon size={14} className="text-primary-container shrink-0" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">{label}</span>
                <span className="font-sans font-bold text-on-surface text-sm">{value}</span>
              </motion.div>
            ))}
          </motion.div>
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

              <span className="font-mono text-[11px] text-primary-container/70 uppercase tracking-widest mb-5 block">
                {t('about_label')}
              </span>

              <blockquote className="text-on-surface font-sans text-xl font-semibold leading-snug mb-8 tracking-tight">
                &ldquo;{t('story_p1').split('.')[0]}.&rdquo;
              </blockquote>

              <div className="space-y-4">
                {[
                  { label: t('fact_projects'), val: '+500', pct: 100 },
                  { label: t('fact_clients'),  val: '+50',  pct: 90 },
                  { label: t('fact_year'),     val: '2001', pct: 80 },
                ].map(({ label, val, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-on-surface-variant font-mono uppercase tracking-widest">{label}</span>
                      <span className="text-primary-container font-mono font-bold">{val}</span>
                    </div>
                    <div className="h-1 rounded-full bg-outline-variant/30 overflow-hidden">
                      <motion.div
                        className="h-full bg-primary-container rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
              { raw: '+500', label: t('fact_projects') },
              { raw: '+50',  label: t('fact_clients') },
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
          4. PILLARS SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto">

          <motion.div {...revealUp(0)} className="mb-4">
            <span className="font-mono text-xs text-primary-container/70 uppercase tracking-widest">
              {t('values_label')}
            </span>
          </motion.div>

          <motion.h2 {...revealUp(0.07)} className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface mt-4 mb-3">
            {t('pillars_title')}
          </motion.h2>
          <div className="h-[3px] w-14 bg-primary-container mb-12" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {PILLARS.map(({ icon: Icon, key, featured }) => (
              <motion.div
                key={key}
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
                className={[
                  'glass-panel glow-hover rounded-2xl border border-outline-variant/20 p-7 relative overflow-hidden transition-all duration-300 cursor-default',
                  featured ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-between' : '',
                ].join(' ')}
              >
                {/* top-right glow accent on featured */}
                {featured && (
                  <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary-container/15 blur-2xl" />
                )}

                <div>
                  <div className={[
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-5 border',
                    featured
                      ? 'bg-primary-container/20 border-primary-container/40'
                      : 'bg-primary-container/10 border-primary-container/20',
                  ].join(' ')}>
                    <Icon className="text-primary-container" size={featured ? 24 : 20} />
                  </div>
                  <h3 className={[
                    'font-sans font-black tracking-tight text-on-surface mb-3',
                    featured ? 'text-2xl' : 'text-lg',
                  ].join(' ')}>
                    {tp(`${key}.title`)}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{tp(`${key}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. PROCESS / METHODOLOGY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-10 bg-surface-container/30 border-y border-outline-variant/10">
        <div className="max-w-container-max mx-auto">

          <motion.div {...revealUp(0)} className="mb-4">
            <span className="font-mono text-xs text-primary-container/70 uppercase tracking-widest">
              {t('methodology_label')}
            </span>
          </motion.div>
          <motion.h2 {...revealUp(0.07)} className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface mt-4 mb-3">
            {t('methodology_heading')}
          </motion.h2>
          <div className="h-[3px] w-14 bg-primary-container mb-14" />

          {/* desktop: horizontal steps with connectors */}
          <div className="hidden md:flex items-start gap-0">
            {PROCESS.map(({ icon: Icon, step, title, desc }, i) => (
              <div key={step} className="flex items-start flex-1 min-w-0">
                <motion.div
                  {...revealUp(i * 0.1)}
                  className="flex-1 glass-panel glow-hover rounded-2xl p-6 border border-outline-variant/20 relative overflow-hidden group"
                >
                  {/* step number watermark */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-2 right-3 font-black text-7xl text-primary-container/[0.06] leading-none select-none"
                  >
                    {step}
                  </span>

                  <div className="w-10 h-10 rounded-lg bg-primary-container/15 border border-primary-container/25 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-primary-container" />
                  </div>
                  <span className="font-mono text-[10px] text-primary-container uppercase tracking-widest mb-2 block">{step}</span>
                  <h3 className="font-sans font-black text-on-surface text-lg tracking-tight mb-2">{title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{desc}</p>
                </motion.div>

                {/* arrow connector (not after last) */}
                {i < PROCESS.length - 1 && (
                  <div className="shrink-0 flex items-center px-2 pt-8">
                    <ArrowRight size={16} className="text-primary-container/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* mobile: vertical timeline */}
          <div className="md:hidden relative pl-8 border-l-2 border-primary-container/20 space-y-10">
            {PROCESS.map(({ icon: Icon, step, title, desc }, i) => (
              <motion.div key={step} {...revealUp(i * 0.1)} className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
                <div className="glass-panel rounded-xl p-5 border border-outline-variant/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-container/15 border border-primary-container/25 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary-container" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-primary-container uppercase tracking-widest block">{step}</span>
                      <h3 className="font-sans font-bold text-on-surface text-base tracking-tight">{title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. CTA SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto">
          <motion.div {...revealUp(0)} className="relative overflow-hidden">

            {/* background orb */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-primary-container/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />

            <motion.div
              whileHover={{ boxShadow: '0 0 60px rgba(0,102,255,0.25), 0 0 120px rgba(0,102,255,0.1)' }}
              transition={{ duration: 0.4 }}
              className="relative z-10 glass-panel rounded-2xl border border-primary-container/25 p-14 md:p-20 text-center"
            >
              {/* top badge */}
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary-container bg-primary-container/10 border border-primary-container/25 px-3 py-1 rounded-full uppercase tracking-widest mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                {t('cta_button')}
              </div>

              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface mb-5 max-w-2xl mx-auto leading-[1.05]">
                {t('cta_heading')}
              </h2>
              <p className="text-on-surface-variant mb-10 max-w-md mx-auto text-lg">
                {t('cta_sub')}
              </p>

              <Link
                href={`/${locale}/contacte`}
                className="inline-flex items-center gap-2 bg-primary-container text-white font-mono uppercase tracking-[0.15em] text-xs px-10 py-4 rounded-full hover:bg-primary-container/90 shadow-[0_0_20px_rgba(0,102,255,0.45)] hover:shadow-[0_0_35px_rgba(0,102,255,0.7)] transition-all active:scale-95"
              >
                {t('cta_button')}
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
