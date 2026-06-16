'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import Button from './Button';

interface Props {
  badge: string;
  titleBase: string;
  words: string[];
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  offerings?: { icon: LucideIcon; label: string }[];
}


export default function AnimatedHero({ badge, titleBase, words, subtitle, ctaPrimary, ctaSecondary, offerings = [] }: Props) {
  const locale = useLocale();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center px-6">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-[11px] text-primary-container bg-primary-container/10 border border-primary-container/30 px-3 py-1 mb-6 inline-flex items-center gap-2 uppercase tracking-widest backdrop-blur-sm"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
        {badge}
      </motion.div>

      {/* 9bit brand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-sans font-black tracking-tighter leading-none mb-2 text-7xl sm:text-8xl md:text-9xl"
      >
        <span className="text-on-surface">9</span>
        <span className="text-primary-container">bit</span>
      </motion.div>

      {/* Construïm solucions + rotating word */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-sans text-xl sm:text-2xl md:text-3xl text-on-surface/80 mb-6 tracking-tight font-medium leading-snug text-center"
      >
        <span className="block">{titleBase}</span>
        <span className="relative block min-h-[1.2em] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ y: 32, opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -32, opacity: 0, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 130, damping: 16 }}
              className="inline-block"
            >
              <span className="shiny-text">{words[index]}</span>
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-body-lg text-on-surface-variant max-w-2xl mb-10"
      >
        {subtitle}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link href={`/${locale}/contacte`}>
          <Button variant="primary">{ctaPrimary}</Button>
        </Link>
        <Link href={`/${locale}/clients`}>
          <Button variant="secondary">{ctaSecondary}</Button>
        </Link>
      </motion.div>

      {/* Core offerings — quick visual scan of what we do */}
      {offerings.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2.5"
        >
          {offerings.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 backdrop-blur-sm transition-colors hover:border-primary-container/40 hover:bg-white/[0.06]"
            >
              <Icon size={15} className="text-primary-container" />
              <span className="text-xs sm:text-sm font-medium text-on-surface/90">{label}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
