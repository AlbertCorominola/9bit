'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ClientMarquee from '@/components/ui/ClientMarquee';

export default function TrustStripSection() {
  const t = useTranslations('home');
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: false, margin: '-100px' }}
      className="relative px-6 lg:px-10 pt-20">
      <div className="max-w-container-max mx-auto">
        <p className="text-center font-mono text-[11px] uppercase tracking-widest text-on-surface-variant/70 mb-6">
          {t('trust_strip')}
        </p>
        <ClientMarquee />
      </div>
    </motion.section>
  );
}
