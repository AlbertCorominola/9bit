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
  LucideIcon,
} from 'lucide-react';
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

  const TECH_STACK: { category: string; items: string[] }[] = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'Cloud / DevOps', items: ['Vercel', 'Docker', 'GitHub Actions'] },
    { category: 'IA & Veu', items: ['OpenAI', 'Claude', 'ElevenLabs', 'Twilio', 'Retell AI', 'n8n'] },
    { category: tp('tech_tools_category'), items: ['Stitch', 'Notion'] },
  ];

  return (
    <div className="min-h-screen">
      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <section className="relative -mt-20 pt-40 pb-20 px-6 lg:px-10">
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
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.95] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
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
                  className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 flex items-center gap-2"
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
      <div className="px-6 lg:px-10 pb-20">
        <div className="max-w-container-max mx-auto space-y-margin">

          {/* ── FEATURED: WEB ─────────────────────────────────── */}
          <motion.section {...fadeUp}>
            <p className="text-on-surface-variant text-sm uppercase tracking-wide font-medium mb-5">
              {tp('featured_label')}
            </p>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-primary-container/30 transition-all duration-200 overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Left half */}
                <div className="p-8 lg:p-12 flex flex-col">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center">
                      <Globe className="text-primary-container" size={22} />
                    </div>
                    <span className="font-mono text-[10px] text-on-surface-variant/70 border border-white/[0.08] px-2 py-0.5 rounded tracking-widest">
                      {t('items.web.code')}
                    </span>
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
                    {t('items.web.title')}
                  </h2>
                  <p className="text-on-surface-variant text-base leading-relaxed mb-7 max-w-md">
                    {t('items.web.desc')}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript'].map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-primary-container bg-primary-container/10 border border-primary-container/20 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right half — code window */}
                <div className="p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-white/[0.06] bg-black/20 flex items-center">
                  <div className="w-full rounded-xl border border-white/[0.08] bg-[#0c1018] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
                    <div className="px-4 py-2 border-b border-white/[0.06] flex items-center">
                      <span className="font-mono text-[11px] text-on-surface-variant/70">
                        9bit-web.config.ts
                      </span>
                    </div>
                    <pre className="px-5 py-4 text-[13px] leading-[1.7] font-mono overflow-x-auto">
                      <code>
                        <span className="text-pink-300">import</span>
                        <span className="text-zinc-300"> {'{ '}</span>
                        <span className="text-blue-300">build</span>
                        <span className="text-zinc-300">{' }'} </span>
                        <span className="text-pink-300">from</span>
                        <span className="text-emerald-300"> &apos;9bit/web&apos;</span>
                        {'\n\n'}
                        <span className="text-pink-300">export default</span>
                        <span className="text-zinc-300"> </span>
                        <span className="text-blue-300">build</span>
                        <span className="text-zinc-300">{'({'}</span>
                        {'\n  '}
                        <span className="text-zinc-200">framework</span>
                        <span className="text-zinc-300">: </span>
                        <span className="text-emerald-300">&apos;next&apos;</span>
                        <span className="text-zinc-300">,</span>
                        {'\n  '}
                        <span className="text-zinc-200">ssr</span>
                        <span className="text-zinc-300">: </span>
                        <span className="text-amber-300">true</span>
                        <span className="text-zinc-300">,</span>
                        {'\n  '}
                        <span className="text-zinc-200">i18n</span>
                        <span className="text-zinc-300">: [</span>
                        <span className="text-emerald-300">&apos;ca&apos;</span>
                        <span className="text-zinc-300">, </span>
                        <span className="text-emerald-300">&apos;es&apos;</span>
                        <span className="text-zinc-300">, </span>
                        <span className="text-emerald-300">&apos;en&apos;</span>
                        <span className="text-zinc-300">],</span>
                        {'\n  '}
                        <span className="text-zinc-200">deploy</span>
                        <span className="text-zinc-300">: {'{ '}</span>
                        <span className="text-zinc-200">vercel</span>
                        <span className="text-zinc-300">: </span>
                        <span className="text-amber-300">true</span>
                        <span className="text-zinc-300">{' }'}</span>
                        {'\n'}
                        <span className="text-zinc-300">{'})'}</span>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── ALL SERVICES GRID ─────────────────────────────── */}
          <section>
            <motion.p {...fadeUp} className="text-on-surface-variant text-sm uppercase tracking-wide font-medium mb-5">
              {tp('all_services_label')}
            </motion.p>

            {/* Core services */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {SERVICE_KEYS.filter((s) => s.core).map(({ key, icon }) => (
                <motion.div
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <ServiceCard
                    icon={icon}
                    code={t(`items.${key}.code`)}
                    title={t(`items.${key}.title`)}
                    desc={t(`items.${key}.desc`)}
                    core
                    coreLabel={t('core_tag')}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Additional services */}
            <motion.p {...fadeUp} className="text-on-surface-variant/70 text-sm uppercase tracking-wide font-medium mt-12 mb-5">
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
                    code={t(`items.${key}.code`)}
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
              <p className="text-on-surface-variant text-sm uppercase tracking-wide font-medium mb-4">
                {tp('methodology_label')}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
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

          {/* ── TECH STACK ────────────────────────────────────── */}
          <section>
            <motion.div {...fadeUp} className="mb-10">
              <p className="text-on-surface-variant text-sm uppercase tracking-wide font-medium mb-4">
                {tp('tech_label')}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
                {tp('tech_heading')}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {TECH_STACK.map(({ category, items }) => (
                <div
                  key={category}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 border-b border-white/[0.06] last:border-b-0"
                >
                  <span className="text-on-surface font-semibold text-sm sm:w-40 sm:shrink-0">
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs text-on-surface-variant border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 rounded-full hover:border-primary-container/40 hover:text-primary-container transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
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
