'use client';

import { motion, useScroll, useTransform, type MotionStyle } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  /** Positive = moves up as you scroll past (depth). Negative = moves down. */
  speed?: number;
  /** Optional subtle opacity fade tied to scroll. */
  fade?: boolean;
  className?: string;
  style?: MotionStyle;
}

/**
 * Scroll-linked depth: the element drifts vertically relative to scroll
 * progress through the viewport, creating real parallax (not a one-shot
 * entrance). Subtle by default.
 */
export default function Parallax({ children, speed = 0.3, fade = false, className, style }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const distance = speed * 120;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.4, 1, 1, 0.4]);

  return (
    <motion.div ref={ref} style={{ y, opacity: fade ? opacity : undefined, ...style }} className={className}>
      {children}
    </motion.div>
  );
}
