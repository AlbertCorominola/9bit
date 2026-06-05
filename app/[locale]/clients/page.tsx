'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  UtensilsCrossed,
  Compass,
  Factory,
  Briefcase,
  Bed,
  Cpu,
} from 'lucide-react';
import Link from 'next/link';
import ClientMarquee from '@/components/ui/ClientMarquee';

// ─── Data (non-localized) ────────────────────────────────────────────────────

const TECHNOLOGIES = ['Next.js', 'Tailwind', 'SEO Local', 'Analytics', 'Google Business'];

const CASE_COL_SPANS = [
  'md:col-span-6',
  'md:col-span-6',
  'md:col-span-5',
  'md:col-span-7',
  'md:col-span-12',
];

const CASE_URLS = [
  'https://creuers2mes2.com/',
  'https://massoles.com/',
  'https://www.gestoriaguileraperez.com/',
  'https://www.ooadditives.com/',
  '',
];

const FEATURED_URL = 'https://restaurantarestestanyol.com/';


// ─── Animation variants ───────────────────────────────────────────────────────

const revealInView: TargetAndTransition = { opacity: 1, y: 0 };
const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: revealInView,
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const floatA = {
  animate: {
    y: [0, -24, 0],
    x: [0, 12, 0],
    transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
  },
};

const floatB = {
  animate: {
    y: [0, 18, 0],
    x: [0, -14, 0],
    transition: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ─── Inline reverse marquee ───────────────────────────────────────────────────

const CLIENTS_LIST = [
  'Abril et Nature',
  'Aguilera Consulting',
  'Mas Terrats',
  'Excursions Marítimes El Fadrí',
  'Restaurant Arest Estanyol',
  'Oxford Oil Additives',
  'Econocom',
  'Perruqueria Lídia Duch',
  'MultiEsports Ter',
];

function ClientMarqueeReverse() {
  const list = [...CLIENTS_LIST, ...CLIENTS_LIST];
  return (
    <div className="overflow-hidden py-6 border-b border-outline-variant/20 group">
      <div
        className="flex gap-12 animate-marquee whitespace-nowrap text-on-surface-variant/40 font-bold text-xl group-hover:[animation-play-state:paused]"
        style={{ animationDirection: 'reverse' }}
      >
        {list.map((c, i) => (
          <span key={i} className="shrink-0">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  const t = useTranslations('clients_page');
  const locale = useLocale();

  const INDUSTRIES = [
    { label: t('industries.0.label'), Icon: UtensilsCrossed },
    { label: t('industries.1.label'), Icon: Compass },
    { label: t('industries.2.label'), Icon: Factory },
    { label: t('industries.3.label'), Icon: Briefcase },
    { label: t('industries.4.label'), Icon: Bed },
    { label: t('industries.5.label'), Icon: Cpu },
  ];

  const STATS = [
    { value: t('stats.0.value'), label: t('stats.0.label') },
    { value: t('stats.1.value'), label: t('stats.1.label') },
    { value: t('stats.2.value'), label: t('stats.2.label') },
    { value: t('stats.3.value'), label: t('stats.3.label') },
  ];

  const FEATURED_CASE = {
    badge: 'Case_01',
    title: t('featured_case.title'),
    industry: t('featured_case.industry'),
    desc: t('featured_case.desc'),
    technologies: TECHNOLOGIES,
    metric: t('featured_case.metric'),
    metricLabel: t('featured_case.metricLabel'),
  };

  const CASES = [0, 1, 2, 3, 4].map((i) => ({
    badge: t(`cases.${i}.badge`),
    title: t(`cases.${i}.title`),
    industry: t(`cases.${i}.industry`),
    desc: t(`cases.${i}.desc`),
    metric: t(`cases.${i}.metric`),
    metricLabel: t(`cases.${i}.metricLabel`),
    colSpan: CASE_COL_SPANS[i],
    url: CASE_URLS[i],
  }));

  const TESTIMONIALS = [
    {
      name: t('testimonials.0.name'),
      initials: t('testimonials.0.initials'),
      company: t('testimonials.0.company'),
      quote: t('testimonials.0.quote'),
    },
    {
      name: t('testimonials.1.name'),
      initials: t('testimonials.1.initials'),
      company: t('testimonials.1.company'),
      quote: t('testimonials.1.quote'),
    },
    {
      name: t('testimonials.2.name'),
      initials: t('testimonials.2.initials'),
      company: t('testimonials.2.company'),
      quote: t('testimonials.2.quote'),
    },
  ];

  return (
    <div className="min-h-screen">

      {/* ── 1. PAGE HERO ──────────────────────────────────────────── */}
      <section className="relative -mt-20 pt-40 pb-24 px-6 lg:px-10 overflow-hidden">

        {/* Decorative giant bg text */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[-2vw] top-1/2 -translate-y-1/2 font-black tracking-tighter text-primary-container opacity-[0.025] leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(120px, 20vw, 320px)' }}
        >
          +50
        </span>

        {/* Animated orbs */}
        <motion.div
          variants={floatA}
          animate="animate"
          className="pointer-events-none absolute -top-32 right-1/4 w-[480px] h-[480px] rounded-full bg-primary-container/10 blur-3xl"
        />
        <motion.div
          variants={floatB}
          animate="animate"
          className="pointer-events-none absolute top-20 -left-20 w-[320px] h-[320px] rounded-full bg-primary-container/10 blur-3xl"
        />

        {/* Foreground */}
        <div className="relative z-10 max-w-container-max mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 font-mono text-xs text-primary-container bg-primary-container/10 border border-primary-container/30 px-3 py-1 rounded-full uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
              {t('badge')}
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-on-surface mb-6 max-w-4xl leading-[1.05]">
              {t('heading')}
            </h1>

            {/* Subtitle */}
            <p className="text-on-surface-variant max-w-2xl text-lg lg:text-xl mb-12">
              {t('subtitle')}
            </p>

            {/* Trust stats pills */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={staggerItem}
                  className="flex items-center gap-2 glass-panel border border-primary-container/25 px-5 py-2.5 rounded-full"
                >
                  <span className="font-black font-mono text-primary-container text-lg leading-none">
                    {s.value}
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. MARQUEE BLOCK ──────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto mb-8">
          <motion.p
            {...reveal}
            className="font-mono text-xs text-on-surface-variant uppercase tracking-widest text-center"
          >
            {t('marquee_title')}
          </motion.p>
        </div>

        {/* Marquee rows with edge fade masks */}
        <motion.div {...reveal} className="relative">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-background to-transparent" />

          <div className="border-t border-outline-variant/20">
            <ClientMarquee />
            <ClientMarqueeReverse />
          </div>
        </motion.div>
      </section>

      {/* ── 3–4. CASE STUDIES ─────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto">

          {/* Section heading */}
          <motion.div {...reveal} className="mb-16">
            <p className="font-mono text-xs text-primary-container/70 uppercase tracking-widest mb-3">
              {t('cases_label')}
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-on-surface mb-4">
              {t('cases_title')}
            </h2>
            <p className="text-on-surface-variant max-w-xl text-lg">
              {t('cases_subtitle')}
            </p>
          </motion.div>

          {/* 3. Featured case */}
          <motion.div
            {...reveal}
            className="mb-8 glass-panel rounded-xl border border-primary-container/30 p-10 md:p-14 glow-hover hover:border-primary-container/60 transition-all group"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left: case info */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] bg-primary-container/15 text-primary-container border border-primary-container/40 px-2 py-1 rounded uppercase tracking-widest">
                    {FEATURED_CASE.badge}
                  </span>
                  <span className="font-mono text-[10px] bg-black/40 text-on-surface-variant border border-outline-variant/30 px-2 py-1 rounded uppercase tracking-widest">
                    {t('featured_badge')}
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                    {FEATURED_CASE.industry}
                  </span>
                </div>
                <h3 className="font-sans font-black text-2xl md:text-3xl text-on-surface mb-4 leading-tight">
                  {FEATURED_CASE.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  {FEATURED_CASE.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {FEATURED_CASE.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-on-surface-variant bg-surface-container border border-outline-variant/30 px-2.5 py-1 rounded uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={FEATURED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white bg-primary-container rounded-full px-5 py-2.5 hover:bg-primary-container/90 shadow-[0_0_15px_rgba(0,102,255,0.35)] hover:shadow-[0_0_25px_rgba(0,102,255,0.6)] transition-all active:scale-95"
                >
                  {t('go_to_project')}
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Right: big metric */}
              <div className="flex flex-col items-center md:items-end justify-center text-right">
                <span
                  className="font-black text-primary-container leading-none"
                  style={{ fontSize: 'clamp(72px, 10vw, 120px)' }}
                >
                  {FEATURED_CASE.metric}
                </span>
                <span className="font-mono text-sm text-on-surface-variant uppercase tracking-widest mt-2">
                  {FEATURED_CASE.metricLabel}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 4. Asymmetric case grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {CASES.map((c) => (
              <motion.div
                key={c.badge}
                variants={staggerItem}
                className={`${c.colSpan} glass-panel rounded-xl border border-outline-variant/20 hover:border-primary-container/40 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_var(--glow-color)] group`}
              >
                {/* Gradient header */}
                <div className="h-28 bg-gradient-to-br from-primary-container/30 via-primary-container/10 to-surface-container relative flex items-start justify-between p-3">
                  <span className="font-mono text-[10px] bg-black/70 text-primary-container border border-primary-container/50 px-2 py-1 rounded uppercase tracking-widest">
                    {c.badge}
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                    {c.industry}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-sans font-bold text-on-surface text-lg mb-2 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                    {c.desc}
                  </p>

                  {/* Metric */}
                  <div className="flex items-baseline gap-2 pt-4 border-t border-outline-variant/15 mb-5">
                    <span className="font-sans font-black text-3xl text-primary-container">
                      {c.metric}
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                      {c.metricLabel}
                    </span>
                  </div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white bg-primary-container rounded-full px-4 py-2 hover:bg-primary-container/90 shadow-[0_0_10px_rgba(0,102,255,0.3)] hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all active:scale-95"
                  >
                    {t('go_to_project')}
                    <ExternalLink size={11} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. INDUSTRY BREAKDOWN ─────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto">
          <motion.div {...reveal} className="mb-12 text-center">
            <p className="font-mono text-xs text-primary-container/70 uppercase tracking-widest mb-3">
              {t('clients_label')}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface">
              {t('industries_heading')}
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {INDUSTRIES.map(({ label, Icon }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="glass-panel rounded-full border border-outline-variant/20 hover:border-primary-container/50 px-6 py-3 flex items-center gap-3 glow-hover cursor-default transition-all"
              >
                <Icon size={18} className="text-primary-container" />
                <span className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ───────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto">
          <motion.div {...reveal} className="mb-16 text-center">
            <p className="font-mono text-xs text-primary-container/70 uppercase tracking-widest mb-3">
              {t('feedback_label')}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface">
              {t('testimonials_title')}
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {TESTIMONIALS.map((tt) => (
              <motion.div
                key={tt.name}
                variants={staggerItem}
                className="glass-panel rounded-xl border border-outline-variant/20 hover:border-primary-container/30 p-8 flex flex-col relative overflow-hidden transition-all glow-hover"
              >
                {/* Decorative huge quote mark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -top-4 -left-2 font-black text-primary-container opacity-[0.06] leading-none"
                  style={{ fontSize: '160px' }}
                >
                  &ldquo;
                </span>

                {/* 5-star row */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="text-primary-container"
                    >
                      <path d="M8 1l1.96 4.02L14 5.8l-3 2.93.71 4.1L8 10.65l-3.71 2.18.71-4.1L2 5.8l4.04-.78L8 1z" />
                    </svg>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-on-surface text-base md:text-lg leading-relaxed mb-8 flex-1 relative z-10">
                  &ldquo;{tt.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/15 relative z-10">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-container/60 to-primary-container/20 border border-primary-container/40 flex items-center justify-center shrink-0">
                    <span className="font-black text-primary-container text-sm leading-none">
                      {tt.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans font-bold text-on-surface text-sm">{tt.name}</p>
                    <p className="font-mono text-xs text-on-surface-variant">{tt.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto">
          <motion.div
            {...reveal}
            className="relative text-center glass-panel rounded-xl border border-primary-container/25 p-16 md:p-24 overflow-hidden"
          >
            {/* Decorative orb */}
            <motion.div
              variants={floatA}
              animate="animate"
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-container/10 blur-3xl"
            />

            <div className="relative z-10">
              <p className="font-mono text-xs text-primary-container/70 uppercase tracking-widest mb-6">
                {t('next_label')}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface mb-4">
                {t('cta_heading')}
              </h2>
              <p className="text-on-surface-variant mb-10 max-w-md mx-auto text-lg">
                {t('cta_sub')}
              </p>
              <Link
                href={`/${locale}/contacte`}
                className="inline-flex items-center gap-2 bg-primary-container text-white font-mono uppercase tracking-[0.15em] text-xs px-10 py-5 rounded-full hover:bg-primary-container/90 shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_35px_rgba(0,102,255,0.65)] transition-all active:scale-95"
              >
                {t('cta_button')}
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
