'use client';

import { useTranslations } from 'next-intl';
import ScrollRevealText from '@/components/ui/ScrollRevealText';

export default function StatementSection() {
  const t = useTranslations('home');
  return (
    <section className="mx-auto max-w-container-max px-6 py-28 md:py-40 lg:px-10">
      <ScrollRevealText
        text={t('statement')}
        className="max-w-5xl text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-on-surface"
      />
    </section>
  );
}
