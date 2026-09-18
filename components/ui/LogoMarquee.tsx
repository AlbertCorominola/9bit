'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export type MarqueeLogo = {
  src: string;
  alt: string;
  gradient: { from: string; via: string; to: string };
  /**
   * Cómo es el archivo de origen — medido, no supuesto: tener canal alfa no
   * implica ser transparente, y ahí es donde esto se rompía.
   * - `transparent` (por defecto): el fondo es realmente transparente.
   * - `on-light`: opaco con fondo claro; ya casa con la tarjeta.
   * - `light-on-dark`: opaco con fondo oscuro; hay que invertirlo para que funda.
   */
  source?: 'transparent' | 'on-light' | 'light-on-dark';
};

export interface LogoMarqueeProps {
  logos: MarqueeLogo[];
  /** Duración de la animación. normal = 40s, slow = 80s, fast = 20s */
  speed?: 'slow' | 'normal' | 'fast';
  /** Invierte la dirección del scroll */
  reverse?: boolean;
  /** Titular opcional encima del marquee */
  title?: string;
  /** Texto descriptivo opcional, a la derecha del titular en desktop */
  description?: string;
  className?: string;
}

const DURATIONS: Record<NonNullable<LogoMarqueeProps['speed']>, string> = {
  slow: '80s',
  normal: '40s',
  fast: '20s',
};

const EDGE_MASK = 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)';

export default function LogoMarquee({
  logos,
  speed = 'normal',
  reverse = false,
  title,
  description,
  className,
}: LogoMarqueeProps): JSX.Element {
  const loop = [...logos, ...logos];
  const hasHeader = Boolean(title || description);

  return (
    <section
      aria-label={title ?? undefined}
      className={cn('relative w-full py-12', className)}
    >
      {hasHeader && (
        <div className="mx-auto mb-10 flex max-w-container-max flex-col gap-4 px-gutter md:flex-row md:items-end md:justify-between">
          {title && (
            <h2 className="text-headline-lg font-black tracking-tighter text-on-surface">
              {title}
            </h2>
          )}
          {description && (
            <p className="max-w-md text-body-md text-on-surface-variant md:text-right">
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className="group relative overflow-hidden"
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      >
        <div
          className="flex w-max gap-4 animate-marquee will-change-transform group-hover:[animation-play-state:paused]"
          style={{
            animationDuration: DURATIONS[speed],
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {loop.map((logo, i) => (
            <div
              key={`${i}-${logo.src}`}
              aria-hidden={i >= logos.length}
              // El gradiente de marca viaja como custom properties para consumirse en clases arbitrarias
              style={
                {
                  '--from': logo.gradient.from,
                  '--via': logo.gradient.via,
                  '--to': logo.gradient.to,
                } as React.CSSProperties
              }
              className="group/card relative flex h-24 w-44 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/[0.08] bg-black/[0.02]"
            >
              <div
                aria-hidden
                className="absolute inset-0 scale-150 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)] opacity-0 transition-all duration-700 ease-out group-hover/card:scale-100 group-hover/card:opacity-100"
              />
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={48}
                className={cn(
                  'relative z-10 h-11 w-auto max-w-[80%] object-contain opacity-70 transition-all duration-500',
                  // Transparente: silueta de tinta, y al hacer hover recupera color
                  // porque detrás aparece el gradiente de marca.
                  (!logo.source || logo.source === 'transparent') &&
                    'brightness-0 group-hover/card:filter-none',
                  // Opacos: el filtro los funde con la tarjeta y se mantiene también
                  // en hover, porque si no reaparece el recuadro de su fondo.
                  logo.source === 'on-light' && 'grayscale',
                  logo.source === 'light-on-dark' && 'grayscale invert',
                  'group-hover/card:opacity-100'
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
