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

const SPRING = { stiffness: 200, damping: 34, bounce: 0 };

function CaseCard({ item, translate }: { item: ParallaxCase; translate: MotionValue<number> }) {
  const card = (
    <>
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={900}
        height={506}
        sizes="(min-width: 768px) 30rem, 18rem"
        className="h-full w-full rounded-xl object-cover object-left-top"
      />
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/[0.08]" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover/case:opacity-100">
        {item.title}
      </span>
    </>
  );

  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -14 }}
      className="group/case relative h-44 w-72 shrink-0 overflow-hidden rounded-xl shadow-[0_18px_50px_rgba(13,17,23,0.10)] transition-shadow duration-300 hover:shadow-[0_26px_70px_rgba(13,17,23,0.18)] md:h-64 md:w-[30rem]"
    >
      {item.href ? (
        <Link
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="block h-full w-full"
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </motion.div>
  );
}

export default function HeroParallax({ cases, children }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 640]), SPRING);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -640]), SPRING);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.25], [11, 0]), SPRING);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.25], [9, 0]), SPRING);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.25], [-120, 120]), SPRING);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.25], [0.35, 1]), SPRING);

  const perRow = Math.ceil(cases.length / 3);
  const rows = [
    cases.slice(0, perRow),
    cases.slice(perRow, perRow * 2),
    cases.slice(perRow * 2),
  ].filter((r) => r.length > 0);

  // La cabecera se renderiza UNA sola vez: montarla en las dos variantes
  // duplicaba el h1 y el hero entero en el DOM.
  const strip = (
    <div className="mt-12 overflow-x-auto pb-4 [scrollbar-width:none]">
      <div className="flex w-max gap-4 px-6">
        {cases.map((c) => (
          <div
            key={c.title}
            className="relative h-40 w-64 shrink-0 overflow-hidden rounded-xl shadow-[0_14px_40px_rgba(13,17,23,0.10)]"
          >
            <Image
              src={c.thumbnail}
              alt={c.title}
              width={900}
              height={506}
              sizes="16rem"
              className="h-full w-full rounded-xl object-cover object-left-top"
            />
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/[0.08]" />
          </div>
        ))}
      </div>
    </div>
  );

  if (reduced) {
    return (
      <section className="relative">
        {children}
        {strip}
      </section>
    );
  }

  return (
    <section className="relative">
      {children}

      {/* Móvil: tira deslizable; el recorrido 3D a esa altura solo añade scroll vacío. */}
      <div className="md:hidden">{strip}</div>

      <div
        ref={ref}
        className="relative hidden h-[160vh] overflow-hidden antialiased [perspective:1000px] [transform-style:preserve-3d] md:block"
      >
        <motion.div style={{ rotateX, rotateZ, translateY, opacity }} className="pt-4">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              className={`mb-8 flex gap-8 ${i % 2 === 1 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {row.map((item) => (
                <CaseCard
                  key={item.title}
                  item={item}
                  translate={i % 2 === 1 ? translateXReverse : translateX}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
