'use client';

import { useTranslations } from 'next-intl';
import ClientMarquee from '@/components/ui/ClientMarquee';

export default function TrustStripSection() {
  const t = useTranslations('home');
  return (
    <section className="relative px-6 lg:px-10 pt-32 -mt-32">
      <div className="max-w-container-max mx-auto">
        <p className="text-center font-mono text-[11px] uppercase tracking-widest text-on-surface-variant/70 mb-6">
          {t('trust_strip')}
        </p>
        <ClientMarquee />
      </div>
    </section>
  );
}
