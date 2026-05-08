'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ClientMarquee from '@/components/ui/ClientMarquee';

export default function ClientsSection() {
  const t = useTranslations('clients');

  return (
    <section id="clients" className="py-margin px-6 lg:px-10 max-w-container-max mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
        className="mb-8 max-w-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
          {t('heading')}
        </h2>
      </motion.div>
      <ClientMarquee />
    </section>
  );
}
