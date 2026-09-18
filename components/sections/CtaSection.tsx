'use client';

import { useTranslations } from 'next-intl';
import CTAPanel from '@/components/ui/CTAPanel';
import Reveal from '@/components/ui/Reveal';

export default function CtaSection() {
  const t = useTranslations('cta');
  return (
    <Reveal>
      <CTAPanel
        heading={t('heading')}
        subtitle={t('subtitle')}
        buttonLabel={t('button')}
      />
    </Reveal>
  );
}
