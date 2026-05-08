import { useTranslations } from 'next-intl';
import LegalLayout from '@/components/ui/LegalLayout';

export default function PrivacyPage() {
  const t = useTranslations('legal_pages.privacy');
  return (
    <LegalLayout
      title={t('title')}
      intro={t('intro')}
      lastUpdated="2026-05-07"
      sections={[
        { title: t('section_data_title'), body: t('section_data_body') },
        { title: t('section_use_title'), body: t('section_use_body') },
        { title: t('section_storage_title'), body: t('section_storage_body') },
        { title: t('section_rights_title'), body: t('section_rights_body') },
        { title: t('section_contact_title'), body: t('section_contact_body') },
      ]}
    />
  );
}
