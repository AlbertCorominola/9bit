'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface LegalLayoutProps {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: { title: string; body: string | React.ReactNode }[];
}

export default function LegalLayout({ title, intro, lastUpdated, sections }: LegalLayoutProps) {
  const locale = useLocale();
  const t = useTranslations('legal_pages');
  return (
    <div className="min-h-screen px-6 lg:px-10 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/${locale}`}
            className="text-on-surface-variant hover:text-primary-container text-sm transition-colors inline-block mb-10"
          >
            {t('back_home')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-on-surface-variant text-lg mb-2">{intro}</p>
          <p className="text-on-surface-variant/60 text-xs font-mono uppercase tracking-widest mb-12">
            {t('last_updated')}: {lastUpdated}
          </p>
          <div className="space-y-10">
            {sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-3">{s.title}</h2>
                <div className="text-on-surface-variant leading-relaxed">{s.body}</div>
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
