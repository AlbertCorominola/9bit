'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Props {
  badge: string;
  titleBase: string;
  words: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  offerings?: { icon: LucideIcon; label: string }[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Entrada escalonada de arriba abajo: cada bloque hereda su turno del padre. */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE } },
};

export default function AnimatedHero({
  badge,
  titleBase,
  words,
  ctaPrimary,
  ctaSecondary,
  offerings = [],
}: Props) {
  const locale = useLocale();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2800);
    return () => clearInterval(id);
  }, [words.length, reduced]);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
    >
      {/* Eyebrow: marca + posicionamiento en una sola línea, sin párrafo extra. */}
      <motion.div
        variants={rise}
        className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/60 px-4 py-1.5 backdrop-blur-md"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-container" />
        </span>
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
          {badge}
        </span>
      </motion.div>

      {/* Un solo titular. Sin subtítulo: el reclamo es el propio titular. */}
      <motion.h1
        variants={rise}
        className="text-balance font-sans text-[2.6rem] font-black leading-[1.02] tracking-[-0.045em] text-on-surface sm:text-6xl md:text-7xl lg:text-[5.25rem]"
      >
        <span className="block">{titleBase}</span>
        <span className="relative mt-1 block min-h-[1.14em] overflow-hidden">
          {/* Sin mode="wait": entrante y saliente se solapan para que nunca
              quede la línea vacía, que con este tamaño de titular canta mucho. */}
          <AnimatePresence initial={false}>
            <motion.span
              key={words[index]}
              initial={{ y: '58%', opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-58%', opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="absolute inset-x-0 block"
            >
              <span className="shiny-text">{words[index]}</span>
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.h1>

      {/* CTAs */}
      <motion.div
        variants={rise}
        className="mt-11 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
      >
        <Link
          href={`/${locale}/contacte`}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-container px-8 py-4 text-sm font-semibold tracking-tight text-white shadow-[0_10px_34px_-10px_rgba(0,102,255,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-10px_rgba(0,102,255,0.85)] active:translate-y-0 active:scale-[0.98] sm:w-auto"
        >
          {ctaPrimary}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
        <Link
          href={`/${locale}/clients`}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.12] bg-white/50 px-8 py-4 text-sm font-semibold tracking-tight text-on-surface backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white/80 active:translate-y-0 active:scale-[0.98] sm:w-auto"
        >
          {ctaSecondary}
          <ArrowRight
            size={16}
            className="text-on-surface-variant transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>

      {/* Capacidades: una línea discreta, sin descripciones. */}
      {offerings.length > 0 && (
        <motion.ul
          variants={rise}
          className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-0"
        >
          {offerings.map(({ icon: Icon, label }, i) => (
            <li
              key={label}
              className="flex items-center justify-center gap-2 sm:px-5 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-black/[0.09]"
            >
              <Icon size={14} className="shrink-0 text-primary-container" aria-hidden />
              <span className="text-[13px] font-medium tracking-tight text-on-surface-variant">
                {label}
              </span>
              <span className="sr-only">{i < offerings.length - 1 ? ',' : ''}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
