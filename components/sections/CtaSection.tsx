'use client';

import { useTranslations } from 'next-intl';
import CTAPanel from '@/components/ui/CTAPanel';

export default function CtaSection() {
  const t = useTranslations('cta');
  return (
    <CTAPanel
      heading={t('heading')}
      subtitle={t('subtitle')}
      buttonLabel={t('button')}
    />
  );
}
