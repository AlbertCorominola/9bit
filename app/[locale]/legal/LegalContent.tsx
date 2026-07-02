'use client';

import { useTranslations } from 'next-intl';
import LegalLayout from '@/components/ui/LegalLayout';

export default function LegalPage() {
  const t = useTranslations('legal_pages.legal');
  return (
    <LegalLayout
      title={t('title')}
      intro={t('intro')}
      lastUpdated="2026-05-07"
      sections={[
        { title: t('section_owner_title'), body: t('section_owner_body') },
        { title: t('section_purpose_title'), body: t('section_purpose_body') },
        { title: t('section_ip_title'), body: t('section_ip_body') },
        { title: t('section_liability_title'), body: t('section_liability_body') },
        { title: t('section_law_title'), body: t('section_law_body') },
      ]}
    />
  );
}
