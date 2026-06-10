'use client';

import { useTranslations } from 'next-intl';
import ScrollRevealText from '@/components/ui/ScrollRevealText';

export default function StatementSection() {
  const t = useTranslations('home');
  return (
    <section className="py-margin px-6 lg:px-10 max-w-container-max mx-auto">
      <ScrollRevealText
        text={t('statement')}
        className="max-w-5xl text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-on-surface"
      />
    </section>
  );
}
