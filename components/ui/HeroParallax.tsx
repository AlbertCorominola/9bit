'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

export type ParallaxCase = {
  title: string;
  thumbnail: string;
  /** Interno (next/link) o externo; sin href la tarjeta no enlaza. */
  href?: string;
};

interface HeroParallaxProps {
  cases: ParallaxCase[];
  /** Cabecera del hero: titular, reclamo y CTAs. */
  children: ReactNode;
}

const SPRING = { stiffness: 120, damping: 30, restDelta: 0.001 };
const ROWS = 3;

function CaseCard({
  item,
  priority = false,
}: {
  item: ParallaxCase;
  priority?: boolean;
}) {
  const external = item.href?.startsWith('http');

  const card = (
    <>
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={900}
        height={506}
        priority={priority}
        sizes="(min-width: 1280px) 25rem, (min-width: 768px) 22rem, 17rem"
        className="h-full w-full object-cover object-left-top transition-transform duration-[900ms] ease-out group-hover/case:scale-[1.06]"
      />
      {/* Velo permanente muy suave: unifica capturas con luces muy distintas. */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover/case:opacity-0" />
      <span className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-inset ring-black/[0.07]" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-3.5 pt-12 text-left text-[13px] font-semibold tracking-tight text-white opacity-0 transition-all duration-300 group-hover/case:translate-y-0 group-hover/case:opacity-100">
        {item.title}
      </span>
    </>
  );

  return (
    <div className="group/case relative h-[9.5rem] w-[17rem] shrink-0 overflow-hidden rounded-[14px] bg-surface-container shadow-[0_18px_50px_-24px_rgba(13,17,23,0.45)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_34px_70px_-26px_rgba(13,17,23,0.55)] md:h-[12rem] md:w-[22rem] xl:h-[13.5rem] xl:w-[25rem]">
      {item.href ? (
        <Link
          href={item.href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="block h-full w-full"
          aria-label={item.title}
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </div>
  );
}

function Row({
  items,
  x,
  rowIndex,
}: {
  items: ParallaxCase[];
  x: MotionValue<string>;
  rowIndex: number;
}) {
  // Cada fila se duplica: así siempre desborda por los dos lados y nunca se ve
  // un extremo "colgando" al terminar el scroll, vengan 9 casos o 14.
  const loop = [...items, ...items];
  return (
    <motion.div style={{ x }} className="flex justify-center gap-4 md:gap-6">
      {loop.map((item, i) => (
        <CaseCard
          key={`${rowIndex}-${i}-${item.title}`}
          item={item}
          priority={rowIndex === 0 && i < 3}
        />
      ))}
    </motion.div>
  );
}

export default function HeroParallax({ cases, children }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // 'end end': el progreso llega a 1 con la sección totalmente recorrida, así
  // que el estado final (todo recto y centrado) se ve de verdad.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, SPRING);

  // Desplazamiento en % del ancho de cada fila: independiente del viewport.
  const xLeft = useTransform(p, [0, 1], ['-9%', '3%']);
  const xRight = useTransform(p, [0, 1], ['7%', '-4%']);
  const xSlow = useTransform(p, [0, 1], ['-4%', '2%']);

  const rotateX = useTransform(p, [0, 0.42], [17, 0]);
  const rotateZ = useTransform(p, [0, 0.42], [7, 0]);
  const scale = useTransform(p, [0, 0.42], [0.86, 1]);
  const translateY = useTransform(p, [0, 0.42], [70, 0]);
  const opacity = useTransform(p, [0, 0.16], [0.35, 1]);

  const rows: ParallaxCase[][] = Array.from({ length: ROWS }, () => []);
  cases.forEach((c, i) => rows[i % ROWS].push(c));
  const filled = rows.filter((r) => r.length > 0);
  const xs = [xLeft, xRight, xSlow];

  // Móvil y reduced-motion: tira deslizable, sin recorrido 3D.
  const strip = (
    <div className="-mx-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max snap-x snap-mandatory gap-4 px-6">
        {cases.map((c) => (
          <div key={c.title} className="snap-start">
            <CaseCard item={c} />
          </div>
        ))}
      </div>
    </div>
  );

  if (reduced) {
    return (
      <section className="relative">
        {children}
        <div className="px-6 pt-10">{strip}</div>
      </section>
    );
  }

  return (
    <section className="relative">
      {children}

      <div className="px-6 pt-8 md:hidden">{strip}</div>

      <div ref={ref} className="relative hidden h-[210vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden [perspective:1400px] [transform-style:preserve-3d]">
          {/* Se desvanece por arriba y por abajo para que el muro no choque con
              la cabecera ni con la sección siguiente. */}
          <div className="w-full [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
            <motion.div
              style={{ rotateX, rotateZ, scale, y: translateY, opacity }}
              className="flex flex-col gap-4 md:gap-6"
            >
              {filled.map((row, i) => (
                <Row key={i} items={row} x={xs[i % xs.length]} rowIndex={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
