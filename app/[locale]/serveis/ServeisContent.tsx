'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Globe,
  Phone,
  Bot,
  Headphones,
  Workflow,
  GraduationCap,
  Server,
  Sparkles,
  MessageSquare,
  Map,
  Hammer,
  Rocket,
  ChevronDown,
  LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import ServiceCard from '@/components/ui/ServiceCard';
import CTAPanel from '@/components/ui/CTAPanel';
import Parallax from '@/components/ui/Parallax';

const SERVICE_KEYS: { key: 'web' | 'voice' | 'chatbots' | 'automation' | 'infrastructure' | 'consulting' | 'support' | 'training'; icon: LucideIcon; core: boolean }[] = [
  { key: 'web', icon: Globe, core: true },
  { key: 'voice', icon: Phone, core: true },
  { key: 'chatbots', icon: Bot, core: true },
  { key: 'automation', icon: Workflow, core: true },
  { key: 'infrastructure', icon: Server, core: false },
  { key: 'consulting', icon: Sparkles, core: false },
  { key: 'support', icon: Headphones, core: false },
  { key: 'training', icon: GraduationCap, core: false },
];

const fadeUp = {
  initial: { opacity: 0, y: 24, filter: 'blur(5px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} as const;

export default function ServeisPage() {
  const t = useTranslations('services');
  const tp = useTranslations('serveis_page');

  const PROCESS_STEPS = [
    { number: '01', icon: MessageSquare, title: tp('process.briefing.title'), desc: tp('process.briefing.desc') },
    { number: '02', icon: Map, title: tp('process.plan.title'), desc: tp('process.plan.desc') },
    { number: '03', icon: Hammer, title: tp('process.build.title'), desc: tp('process.build.desc') },
    { number: '04', icon: Rocket, title: tp('process.launch.title'), desc: tp('process.launch.desc') },
  ];

  const FAQ_ITEMS = tp.raw('faq.items') as { q: string; a: string }[];

  return (
    <div className="min-h-screen">
      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <section className="relative -mt-20 px-6 pb-24 pt-40 lg:px-10">
        <div className="max-w-container-max mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-primary-container bg-primary-container/10 border border-primary-container/30 px-3 py-1 rounded-full uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                {tp('badge_label')}
              </span>
            </div>

            {/* Heading */}
            <Parallax speed={0.22}>
              <h1 className="mb-6 text-5xl font-black leading-[1.02] tracking-[-0.045em] text-on-surface md:text-7xl">
                {tp('heading')}
              </h1>
            </Parallax>

            {/* Subtitle */}
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Metric pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { value: '8', label: tp('metric_services') },
                { value: '+24', label: tp('metric_years') },
                { value: '100%', label: tp('metric_projects') },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-full border border-black/[0.08] bg-black/[0.02] px-4 py-2 flex items-center gap-2"
                >
                  <span className="font-bold text-primary-container text-sm">{value}</span>
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN ──────────────────────────────────────────────── */}
      <div className="px-6 pb-24 md:pb-32 lg:px-10">
        <div className="mx-auto max-w-container-max space-y-28 md:space-y-40">

          {/* ── FEATURED: WEB ─────────────────────────────────── */}
          <motion.section {...fadeUp}>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
              {tp('featured_label')}
            </p>

            <div className="rounded-2xl border border-black/[0.08] bg-black/[0.02] hover:border-primary-container/30 transition-all duration-200 overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Left half */}
                <div className="p-8 lg:p-12 flex flex-col">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center">
                      <Globe className="text-primary-container" size={22} />
                    </div>
                    <span className="rounded-full border border-primary-container/25 bg-primary-container/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-text">
                      {t('core_tag')}
                    </span>
                  </div>

                  <h2 className="mb-4 text-4xl font-black leading-[1.05] tracking-[-0.04em] text-on-surface lg:text-5xl">
                    {t('items.web.title')}
                  </h2>
                  <p className="text-on-surface-variant text-base leading-relaxed mb-7 max-w-md">
                    {t('items.web.desc')}
                  </p>

                </div>

                {/* Right half — imagen del servicio */}
                <div className="relative min-h-[18rem] border-t border-black/[0.08] lg:min-h-0 lg:border-l lg:border-t-0">
                  <Image
                    src="/services/web.png"
                    alt={t('items.web.title')}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── ALL SERVICES GRID ─────────────────────────────── */}
          <section>
            <motion.p {...fadeUp} className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
              {t('core_label')}
            </motion.p>

            {/* Core services */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {SERVICE_KEYS.filter((s) => s.core && s.key !== 'web').map(({ key, icon }) => (
                <motion.div
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <ServiceCard
                    icon={icon}
                    title={t(`items.${key}.title`)}
                    desc={t(`items.${key}.desc`)}
                    core
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Additional services */}
            <motion.p {...fadeUp} className="mb-6 mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60">
              {t('more_label')}
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {SERVICE_KEYS.filter((s) => !s.core).map(({ key, icon }) => (
                <motion.div
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <ServiceCard
                    icon={icon}
                    title={t(`items.${key}.title`)}
                    desc={t(`items.${key}.desc`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── METHODOLOGY ───────────────────────────────────── */}
          <section>
            <motion.div {...fadeUp} className="mb-10">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
                {tp('methodology_label')}
              </p>
              <h2 className="text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl">
                {tp('methodology_heading')}
              </h2>
            </motion.div>

            <div className="relative">
              {/* Connector line desktop */}
              <div
                aria-hidden
                className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
              />

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10"
              >
                {PROCESS_STEPS.map(({ number, icon: StepIcon, title, desc }) => (
                  <motion.div
                    key={number}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-container/10 border border-primary-container/30 flex items-center justify-center font-mono text-xs font-semibold text-primary-container">
                        {number}
                      </span>
                      <StepIcon className="text-on-surface-variant/70" size={20} />
                    </div>
                    <div>
                      <h3 className="text-on-surface text-lg font-semibold tracking-tight mb-1.5">
                        {title}
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────── */}
          <section>
            <motion.div {...fadeUp} className="mb-10">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
                {tp('faq.label')}
              </p>
              <h2 className="text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl">
                {tp('faq.heading')}
              </h2>
            </motion.div>

            <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-on-surface">
                    <h3 className="text-base md:text-lg font-semibold leading-snug">{q}</h3>
                    <ChevronDown
                      size={18}
                      className="mt-0.5 shrink-0 text-primary-text transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3 max-w-3xl text-on-surface-variant leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTAPanel
        heading={tp('cta_heading')}
        subtitle={tp('cta_sub')}
        buttonLabel={tp('cta_button')}
      />
    </div>
  );
}
