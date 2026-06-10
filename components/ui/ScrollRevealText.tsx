'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

/**
 * Large statement whose words light up from dim to bright as the block
 * scrolls through the viewport — a reading-paced reveal (Stripe/Apple style).
 */
export default function ScrollRevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <span key={i} className="mr-[0.28em] mt-[0.1em]">
            <Word range={[start, end]} progress={scrollYProgress}>
              {w}
            </Word>
          </span>
        );
      })}
    </p>
  );
}
