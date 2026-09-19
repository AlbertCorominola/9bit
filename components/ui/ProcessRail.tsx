'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

export type ProcessStep = { title: string; desc: string };

/**
 * Los pasos cuelgan de una línea que se va dibujando con el scroll: vertical
 * en móvil, horizontal en escritorio. Cada paso se enciende cuando la línea
 * llega a su altura, así que la animación existe en las dos vistas.
 */
export default function ProcessRail({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative">
      {/* Raíl vertical (móvil) */}
      <div
        aria-hidden
        className="absolute bottom-2 left-[15px] top-2 w-px bg-black/[0.08] md:hidden"
      >
        <motion.div
          style={{ scaleY: reduced ? 1 : progress }}
          className="h-full w-full origin-top bg-primary-container"
        />
      </div>

      {/* Raíl horizontal (escritorio) */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-[15px] hidden h-px bg-black/[0.08] md:block"
      >
        <motion.div
          style={{ scaleX: reduced ? 1 : progress }}
          className="h-full w-full origin-left bg-primary-container"
        />
      </div>

      <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
        {steps.map((step, i) => (
          <Step key={step.title} step={step} index={i} total={steps.length} progress={progress} />
        ))}
      </ol>
    </div>
  );
}

function Step({
  step,
  index,
  total,
  progress,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const reduced = useReducedMotion();
  // El paso se enciende justo cuando la línea pasa por su marca.
  const mark = total > 1 ? index / (total - 1) : 0;
  const lit = useTransform(progress, [Math.max(mark - 0.12, 0), mark], [0, 1]);
  const opacity = useTransform(lit, [0, 1], [0.45, 1]);
  const dotScale = useTransform(lit, [0, 1], [0.7, 1]);

  return (
    <motion.li
      style={reduced ? undefined : { opacity }}
      className="relative pl-12 md:pl-0"
    >
      <motion.span
        style={reduced ? undefined : { scale: dotScale }}
        className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-primary-container/35 bg-background font-mono text-[11px] font-bold tabular-nums text-primary-text md:relative md:mb-7"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>
      <h3 className="text-lg font-bold tracking-tight text-on-surface md:mt-0">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{step.desc}</p>
    </motion.li>
  );
}
