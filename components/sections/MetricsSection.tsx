'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';

interface Metric {
  value: string;
  label: string;
}

function MetricItem({ value, label }: Metric) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const numMatch = value.match(/(\d+)/);
    if (!numMatch) return;
    const target = parseInt(numMatch[1], 10);
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.floor(target * eased);
      setDisplay(value.replace(/\d+/, String(current)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-2 px-4 sm:px-6 py-3"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200 leading-none tabular-nums">
        {display}
      </div>
      <div className="font-mono text-[10px] sm:text-[11px] text-on-surface-variant uppercase tracking-widest leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

export default function MetricsSection() {
  const t = useTranslations('metrics');
  const metrics: Metric[] = [
    { value: t('experience.value'), label: t('experience.label') },
    { value: t('interventions.value'), label: t('interventions.label') },
    { value: t('satisfaction.value'), label: t('satisfaction.label') },
    { value: t('response.value'), label: t('response.label') },
  ];

  return (
    <section className="py-margin px-6 lg:px-10 max-w-container-max mx-auto">
      <Reveal direction="up">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] border-y border-white/[0.06]">
          {metrics.map((m, i) => (
            <MetricItem key={i} {...m} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
