'use client';

import { useTranslations } from 'next-intl';
import { Zap, Target, ShieldCheck, Rocket, LucideIcon } from 'lucide-react';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import Parallax from '@/components/ui/Parallax';

const PILLARS: { key: 'agility' | 'precision' | 'reliability' | 'innovation'; icon: LucideIcon }[] = [
  { key: 'agility', icon: Zap },
  { key: 'precision', icon: Target },
  { key: 'reliability', icon: ShieldCheck },
  { key: 'innovation', icon: Rocket },
];

export default function PillarsSection() {
  const t = useTranslations('pillars');
  const th = useTranslations('home');

  return (
    <section id="about" className="py-margin px-6 lg:px-10 max-w-container-max mx-auto">
      <Parallax speed={0.18} className="mb-12 max-w-2xl">
        <Reveal direction="up">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
            {th('how_we_work')}
          </h2>
        </Reveal>
      </Parallax>

      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PILLARS.map(({ key, icon: Icon }) => (
          <RevealItem
            key={key}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-primary-container/40 hover:bg-white/[0.04] hover:-translate-y-1 transition-all duration-200 p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center mb-5">
              <Icon className="text-primary-container" size={20} />
            </div>
            <h3 className="text-on-surface text-base font-semibold tracking-tight mb-1.5">
              {t(`${key}.title`)}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t(`${key}.desc`)}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
