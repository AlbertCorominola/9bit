'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * Cada carácter entra desplazado, rotado y encogido según lo lejos que esté del
 * centro de la frase, y se endereza a medida que el bloque cruza la pantalla.
 * Va sobre el scroll nativo: no hace falta ninguna librería de scroll suave.
 */
function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const center = Math.max((total - 1) / 2, 1);
  const offset = (index - center) / center; // -1 a la izquierda, +1 a la derecha
  const start = Math.max(0, index / total - 0.1);
  const end = Math.min(1, index / total + 0.28);
  const range: [number, number] = [start, end];

  const opacity = useTransform(progress, range, [0.08, 1]);
  const y = useTransform(progress, range, [22 + Math.abs(offset) * 26, 0]);
  const x = useTransform(progress, range, [offset * 18, 0]);
  const rotate = useTransform(progress, range, [offset * 14, 0]);
  const scale = useTransform(progress, range, [0.84, 1]);

  return (
    <motion.span
      style={{ opacity, y, x, rotate, scale }}
      className="inline-block will-change-transform"
    >
      {char}
    </motion.span>
  );
}

export default function ScrollRevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.6'],
  });

  if (reduced) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(' ');
  const total = Math.max(text.replace(/\s/g, '').length, 1);
  let cursor = 0;

  return (
    // El texto se parte en caracteres, así que el lector de pantalla lee la
    // frase del aria-label y no letra a letra.
    <p
      ref={ref}
      className={className}
      aria-label={text}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="mr-[0.28em] mt-[0.1em] inline-block whitespace-nowrap">
          {Array.from(word).map((char, ci) => (
            <Char
              key={`${wi}-${ci}`}
              char={char}
              index={cursor++}
              total={total}
              progress={scrollYProgress}
            />
          ))}
        </span>
      ))}
    </p>
  );
}
