'use client';

import { useTranslations } from 'next-intl';
import ClientMarquee from '@/components/ui/ClientMarquee';
import Reveal from '@/components/ui/Reveal';
import Parallax from '@/components/ui/Parallax';

export default function ClientsSection() {
  const t = useTranslations('clients');

  return (
    <section id="clients" className="py-margin px-6 lg:px-10 max-w-container-max mx-auto">
      <Parallax speed={0.15} className="mb-8 max-w-2xl">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
            {t('heading')}
          </h2>
        </Reveal>
      </Parallax>
      <ClientMarquee />
    </section>
  );
}
