'use client';

import { useTranslations } from 'next-intl';
import ScrollRevealText from '@/components/ui/ScrollRevealText';

export default function StatementSection() {
  const t = useTranslations('home');
  return (
    // La frase se queda sola en pantalla: es el único momento de la home en el
    // que no hay nada más que leer.
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 lg:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0,102,255,0.10), rgba(0,102,255,0) 70%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-container-max">
        <ScrollRevealText
          text={t('statement')}
          className="max-w-6xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-on-surface sm:text-5xl md:text-7xl lg:text-[5rem]"
        />
      </div>
    </section>
  );
}
