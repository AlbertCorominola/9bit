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
import ServicesShowcase, { type ShowcaseSlide } from '@/components/ui/ServicesShowcase';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

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

  const slides: ShowcaseSlide[] = SERVICE_KEYS.filter((s) => s.core).map(({ key, icon }) => ({
    title: t(`items.${key}.title`),
    description: t(`items.${key}.desc`),
    Icon: icon,
    // Una pantalla por servicio: con el índice siempre visible ya no hace falta
    // retener ninguno más tiempo para que se lea.
    weight: 1,
  }));

  return (
    <section id="services">
      <ServicesShowcase
        label={t('core_tag')}
        heading={t('heading')}
        intro={t('intro')}
        slides={slides}
        ctaLabel={th('view_all')}
        ctaHref={`/${locale}/serveis`}
      />

      {/* Servicios secundarios */}
      <div className="mx-auto max-w-container-max px-6 pb-24 md:pb-32 lg:px-10">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60">
          {t('more_label')}
        </p>
        <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SERVICE_KEYS.filter((s) => !s.core).map(({ key, icon: Icon }) => (
            <RevealItem key={key} className="h-full">
              <Link
                href={`/${locale}/serveis`}
                className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-black/[0.08] bg-surface-container-low p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-container/25 hover:shadow-[0_22px_44px_-28px_rgba(13,17,23,0.4)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-container/20 bg-primary-container/10 transition-colors duration-300 group-hover:bg-primary-container/15">
                  <Icon size={17} className="text-primary-container" />
                </div>
                <span className="flex w-full items-center justify-between gap-2 text-sm font-semibold leading-tight tracking-tight text-on-surface">
                  {t(`items.${key}.title`)}
                  <ArrowRight
                    size={14}
                    className="shrink-0 -translate-x-1 text-on-surface-variant/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-on-surface-variant/70"
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
