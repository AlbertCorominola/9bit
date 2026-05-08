'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  heading: string;
  subtitle: string;
  buttonLabel: string;
}

export default function CTAPanel({ heading, subtitle, buttonLabel }: Props) {
  const locale = useLocale();
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className="px-6 lg:px-10 py-margin"
    >
      <div className="max-w-container-max mx-auto">
        <div className="relative rounded-3xl border border-white/[0.06] bg-gradient-to-br from-primary-container/20 via-transparent to-purple-500/10 px-8 md:px-16 py-16 md:py-24 text-center overflow-hidden">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
            {heading}
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>
          <Link
            href={`/${locale}/contacte`}
            className="inline-flex items-center gap-2 bg-primary-container text-white font-medium text-sm px-8 py-3.5 rounded-full hover:bg-primary-container/90 shadow-[0_0_25px_rgba(0,102,255,0.45)] hover:shadow-[0_0_35px_rgba(0,102,255,0.6)] transition-all active:scale-95"
          >
            {buttonLabel}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
