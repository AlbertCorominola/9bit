'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  badge: string;
  titleBase: string;
  words: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  /** Capacidades en una línea, sin descripciones. */
  offerings?: string[];
  /** Demostración del agente: la prueba visual del hero. */
  demo: ReactNode;
  /** Franja de prueba bajo el pliegue: cifras + logos. */
  proof: ReactNode;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

export default function AnimatedHero({
  badge,
  titleBase,
  words,
  ctaPrimary,
  ctaSecondary,
  offerings = [],
  demo,
  proof,
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
      className="mx-auto w-full max-w-container-max px-6 lg:px-10"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-16">
        {/* Columna de mensaje */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            variants={rise}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/60 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-container" />
            </span>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              {badge}
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="text-balance font-sans text-[2.7rem] font-black leading-[1.02] tracking-[-0.045em] text-on-surface sm:text-6xl lg:text-[4.4rem]"
          >
            <span className="block">{titleBase}</span>
            <span className="relative mt-1 block min-h-[1.14em] overflow-hidden">
              {/* Sin mode="wait": entrante y saliente se solapan para que nunca
                  quede la línea vacía, que con este tamaño canta mucho. */}
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

          <motion.div
            variants={rise}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3.5"
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

          {offerings.length > 0 && (
            <motion.ul
              variants={rise}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start"
            >
              {offerings.map((label, i) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="text-[13px] font-medium tracking-tight text-on-surface-variant">
                    {label}
                  </span>
                  {i < offerings.length - 1 && (
                    <span aria-hidden className="h-3 w-px bg-black/[0.12]" />
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Columna de demostración */}
        <motion.div variants={rise} className="flex justify-center lg:justify-end">
          {demo}
        </motion.div>
      </div>

      <motion.div variants={rise} className="mt-10">
        {proof}
      </motion.div>
    </motion.div>
  );
}
