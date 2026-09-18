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
    code: t(`items.${key}.code`),
    title: t(`items.${key}.title`),
    description: t(`items.${key}.desc`),
    Icon: icon,
    // Automatización es el último y quedaba a un paso del final de la sección,
    // así que pasaba de largo antes de que diera tiempo a leerlo.
    weight: key === 'automation' ? 2 : 1,
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
      <div className="py-20 md:py-28 px-6 lg:px-10 max-w-container-max mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-on-surface-variant mb-4">
          {t('more_label')}
        </p>
        <RevealGroup className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SERVICE_KEYS.filter((s) => !s.core).map(({ key, icon: Icon }) => (
            <RevealItem key={key} className="h-full">
              <Link
                href={`/${locale}/serveis`}
                className="flex h-full flex-col items-start gap-3 rounded-xl border border-black/[0.08] bg-black/[0.02] p-4 transition-colors hover:border-primary-container/30 hover:bg-black/[0.04]"
              >
                <div className="w-9 h-9 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-center justify-center">
                  <Icon size={16} className="text-primary-container" />
                </div>
                <span className="text-sm font-medium text-on-surface leading-tight">
                  {t(`items.${key}.title`)}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
