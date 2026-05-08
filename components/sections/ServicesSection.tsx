'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Globe,
  Cpu,
  Headphones,
  Workflow,
  GraduationCap,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';

const SERVICE_KEYS = [
  { key: 'web', icon: Globe },
  { key: 'software', icon: Cpu },
  { key: 'support', icon: Headphones },
  { key: 'automation', icon: Workflow },
  { key: 'training', icon: GraduationCap },
  { key: 'consulting', icon: Lightbulb },
] as const;

export default function ServicesSection() {
  const t = useTranslations('services');
  const th = useTranslations('home');
  const locale = useLocale();

  return (
    <section id="services" className="py-margin px-6 lg:px-10 max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-4 lg:sticky lg:top-28 self-start"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-5 leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
            {t('heading')}
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8 max-w-md">
            {t('subtitle')}
          </p>
          <Link
            href={`/${locale}/serveis`}
            className="inline-flex items-center gap-2 text-primary-container hover:text-white transition-colors text-sm font-medium group"
          >
            {th('view_all')}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Right grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {SERVICE_KEYS.map(({ key, icon }) => (
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
      </div>
    </section>
  );
}
