'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Globe,
  Phone,
  Bot,
  Workflow,
  Server,
  Sparkles,
  Headphones,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';

const SERVICE_KEYS = [
  { key: 'web', icon: Globe, core: true },
  { key: 'voice', icon: Phone, core: true },
  { key: 'chatbots', icon: Bot, core: true },
  { key: 'automation', icon: Workflow, core: true },
  { key: 'infrastructure', icon: Server, core: false },
  { key: 'consulting', icon: Sparkles, core: false },
  { key: 'support', icon: Headphones, core: false },
  { key: 'training', icon: GraduationCap, core: false },
] as const;

export default function ServicesSection() {
  const t = useTranslations('services');
  const th = useTranslations('home');
  const locale = useLocale();

  return (
    <section id="services" className="py-margin px-6 lg:px-10 max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left column */}
        <Reveal direction="right" className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-5 leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
            {t('heading')}
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8 max-w-md">
            {t('intro')}
          </p>
          <Link
            href={`/${locale}/serveis`}
            className="inline-flex items-center gap-2 text-primary-container hover:text-white transition-colors text-sm font-medium group"
          >
            {th('view_all')}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Reveal>

        {/* Right column: 4 core cards + compact "more" row */}
        <div className="lg:col-span-8">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICE_KEYS.filter((s) => s.core).map(({ key, icon }) => (
              <RevealItem key={key}>
                <ServiceCard
                  icon={icon}
                  code={t(`items.${key}.code`)}
                  title={t(`items.${key}.title`)}
                  desc={t(`items.${key}.desc`)}
                  core
                  coreLabel={t('core_tag')}
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-on-surface-variant/55 mb-4">
              {t('more_label')}
            </p>
            <RevealGroup className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SERVICE_KEYS.filter((s) => !s.core).map(({ key, icon: Icon }) => (
                <RevealItem key={key} className="h-full">
                  <div className="flex h-full flex-col items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-primary-container/30 hover:bg-white/[0.04]">
                    <div className="w-9 h-9 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-center justify-center">
                      <Icon size={16} className="text-primary-container" />
                    </div>
                    <span className="text-sm font-medium text-on-surface leading-tight">
                      {t(`items.${key}.title`)}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
