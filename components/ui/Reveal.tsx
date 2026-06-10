'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const EASE = [0.16, 1, 0.3, 1] as const; // easeOutExpo — smooth, characterful

function offset(direction: Direction) {
  switch (direction) {
    case 'up':
      return { y: 28 };
    case 'down':
      return { y: -28 };
    case 'left':
      return { x: 28 };
    case 'right':
      return { x: -28 };
    default:
      return {};
  }
}

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  blur?: boolean;
  once?: boolean;
  className?: string;
}

/**
 * Distinctive scroll reveal: blur-out → focus, combined with a directional
 * slide and a soft expo ease. Not a plain fade-up.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  blur = true,
  once = true,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: blur ? 'blur(6px)' : 'blur(0px)', ...offset(direction) }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Staggered group ──────────────────────────────────────────────────── */

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(5px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
};

export function RevealGroup({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-90px' }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
