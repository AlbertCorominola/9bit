'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt: string;
  /** Clases del marco: proporción, radio, etc. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Cuánto se sobredimensiona la imagen al entrar. 1.14 por defecto. */
  zoom?: number;
}

/**
 * Imagen que se va asentando mientras cruza la pantalla: entra un punto
 * ampliada y desplazada, y queda a tamaño real al centro del viewport.
 *
 * Funciona igual en móvil que en escritorio: el recorrido va en porcentaje
 * del propio marco, no en píxeles fijos.
 */
export default function ScrollZoomImage({
  src,
  alt,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  zoom = 1.14,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  const scale = useTransform(p, [0, 0.5, 1], [zoom, 1, zoom]);
  const y = useTransform(p, [0, 1], ['-6%', '6%']);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {reduced ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        </motion.div>
      )}
    </div>
  );
}
