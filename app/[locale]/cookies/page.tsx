import { useTranslations } from 'next-intl';
import LegalLayout from '@/components/ui/LegalLayout';

export default function CookiesPage() {
  const t = useTranslations('legal_pages.cookies');
  return (
    <LegalLayout
      title={t('title')}
      intro={t('intro')}
      lastUpdated="2026-05-07"
      sections={[
        { title: t('section_what_title'), body: t('section_what_body') },
        { title: t('section_use_title'), body: t('section_use_body') },
        {
          title: t('section_types_title'),
          body: (
            <ul className="space-y-2 list-disc list-inside">
              <li>{t('section_essential')}</li>
              <li>{t('section_analytics')}</li>
            </ul>
          ),
        },
        { title: t('section_manage_title'), body: t('section_manage_body') },
        { title: t('section_contact_title'), body: t('section_contact_body') },
      ]}
    />
  );
}
