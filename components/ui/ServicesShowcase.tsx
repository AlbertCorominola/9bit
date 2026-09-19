'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollZoomImage from '@/components/ui/ScrollZoomImage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export type ShowcaseSlide = {
  title: string;
  description: string;
  /** Imagen cuadrada del servicio; sustituye al icono. */
  image: string;
  /** Pantallas de scroll que dura este slide. 1 por defecto. */
  weight?: number;
};

export interface ServicesShowcaseProps {
  /** Label mono pequeño encima del titular */
  label: string;
  heading: string;
  intro: string;
  slides: ShowcaseSlide[];
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}

const CTA_CLASS =
  'group inline-flex items-center justify-center gap-2 rounded-full bg-primary-container px-7 py-3.5 text-sm font-semibold tracking-tight text-white shadow-[0_10px_34px_-12px_rgba(0,102,255,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-12px_rgba(0,102,255,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const LABEL_CLASS = 'font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text';

const num = (i: number) => String(i + 1).padStart(2, '0');

export default function ServicesShowcase({
  label,
  heading,
  intro,
  slides,
  ctaLabel,
  ctaHref,
  className,
}: ServicesShowcaseProps): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const slidesRef = useRef(slides);
  slidesRef.current = slides;
  const weightKey = slides.map((s) => s.weight ?? 1).join(',');
  const [active, setActive] = useState(0);
  // Progreso 0→1 dentro del slide activo: alimenta la barra del índice.
  const [slideProgress, setSlideProgress] = useState(0);
  // Arranca en false para que SSR y el primer render cliente coincidan.
  const [scrollMode, setScrollMode] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setScrollMode(desktop.matches && !reduced.matches);

    sync();
    desktop.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    return () => {
      desktop.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!scrollMode) {
      setActive(0);
      return;
    }

    const compute = () => {
      frameRef.current = null;
      const el = wrapperRef.current;
      if (!el) return;
      // getBoundingClientRect().top ya está expresado respecto al viewport, así que
      // incorpora el scroll de ventana sin sumar offsetTop de los padres (que
      // fallaría con cualquier ancestro posicionado o transformado).
      const travelled = -el.getBoundingClientRect().top;
      const screens = travelled / window.innerHeight;
      const current = slidesRef.current;
      let acc = 0;
      let next = current.length - 1;
      let within = 1;
      for (let i = 0; i < current.length; i++) {
        const w = current[i].weight ?? 1;
        if (screens < acc + w) {
          next = i;
          within = Math.min(Math.max((screens - acc) / w, 0), 1);
          break;
        }
        acc += w;
      }
      next = Math.max(0, next);
      setActive((prev) => (prev === next ? prev : next));
      setSlideProgress(within);
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
    // `slides` se recrea en cada render, así que la dependencia es la firma de
    // los pesos: lo único de slides que usa este efecto.
  }, [scrollMode, weightKey]);

  const goToSlide = useCallback(
    (index: number) => {
      const el = wrapperRef.current;
      if (!scrollMode || !el) {
        setActive(index);
        return;
      }
      const screensBefore = slidesRef.current
        .slice(0, index)
        .reduce((sum, s) => sum + (s.weight ?? 1), 0);
      const top =
        window.scrollY + el.getBoundingClientRect().top + screensBefore * window.innerHeight + 8;
      window.scrollTo({ top, behavior: 'smooth' });
    },
    [scrollMode]
  );

  const header = (
    <div>
      <p className={LABEL_CLASS}>{label}</p>
      <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl lg:text-[3.4rem]">
        {heading}
      </h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-on-surface-variant">{intro}</p>
    </div>
  );

  const totalScreens = slides.reduce((sum, s) => sum + (s.weight ?? 1), 0);
  const activeSlide = slides[active];

  /* ── Variante apilada: móvil y reduced-motion ─────────────────────────── */
  if (!scrollMode) {
    return (
      <section className={cn('mx-auto max-w-container-max px-6 py-24 md:py-32 lg:px-10', className)}>
        <Reveal>{header}</Reveal>
        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {slides.map(({ title, description, image }, i) => (
            <RevealItem key={title} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-surface-container-low">
                <ScrollZoomImage
                  src={image}
                  alt={title}
                  className="aspect-[4/3] w-full bg-surface-container"
                  sizes="(min-width: 640px) 45vw, 100vw"
                  zoom={1.1}
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[11px] tabular-nums tracking-widest text-on-surface-variant/45">
                    {num(i)}
                  </span>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-on-surface">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {description}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.1} className="mt-12">
          <Link href={ctaHref} className={CTA_CLASS}>
            {ctaLabel}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </section>
    );
  }

  /* ── Variante scroll: índice interactivo + imagen del servicio ────────── */
  return (
    <section className={cn('relative', className)}>
      <div ref={wrapperRef} style={{ height: `${totalScreens * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-container-max grid-cols-1 items-center gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20 lg:px-10">
            {/* Columna izquierda: índice navegable. El activo se abre. */}
            <div>
              {header}

              <ul className="mt-10 border-t border-black/[0.08]" aria-label={heading}>
                {slides.map((slide, i) => {
                  const isActive = i === active;
                  return (
                    <li key={slide.title} className="relative border-b border-black/[0.08]">
                      {/* Barra de avance del slide activo */}
                      <span
                        aria-hidden
                        className={cn(
                          'absolute left-0 top-0 h-px w-full origin-left bg-primary-container transition-opacity duration-300',
                          isActive ? 'opacity-100' : 'opacity-0'
                        )}
                        style={{ transform: `scaleX(${isActive ? slideProgress : 0})` }}
                      />
                      <button
                        type="button"
                        aria-current={isActive}
                        onClick={() => goToSlide(i)}
                        className="group flex w-full items-start gap-4 py-4 text-left"
                      >
                        <span
                          className={cn(
                            'mt-1.5 font-mono text-[11px] tabular-nums tracking-widest transition-colors duration-300',
                            isActive ? 'text-primary-text' : 'text-on-surface-variant/45'
                          )}
                        >
                          {num(i)}
                        </span>
                        <span className="flex-1">
                          <span
                            className={cn(
                              'block text-xl font-bold tracking-tight transition-colors duration-300 lg:text-2xl',
                              isActive
                                ? 'text-on-surface'
                                : 'text-on-surface-variant/55 group-hover:text-on-surface'
                            )}
                          >
                            {slide.title}
                          </span>
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.span
                                key="desc"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                                className="block overflow-hidden"
                              >
                                <span className="block max-w-md pt-2.5 text-[15px] leading-relaxed text-on-surface-variant">
                                  {slide.description}
                                </span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10">
                <Link href={ctaHref} className={CTA_CLASS}>
                  {ctaLabel}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Columna derecha: la imagen del servicio activo */}
            <div className="hidden md:flex md:justify-center">
              <div className="relative aspect-square w-full max-w-[460px] overflow-hidden rounded-3xl border border-black/[0.08] bg-surface-container shadow-[0_40px_80px_-48px_rgba(13,17,23,0.55)]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeSlide?.image}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    {activeSlide ? (
                      <Image
                        src={activeSlide.image}
                        alt={activeSlide.title}
                        fill
                        priority={active === 0}
                        className="object-cover"
                        sizes="(min-width: 1024px) 460px, 40vw"
                      />
                    ) : null}
                  </motion.div>
                </AnimatePresence>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent"
                />
                <span className="absolute bottom-5 left-6 text-sm font-semibold tracking-tight text-white">
                  {activeSlide?.title}
                </span>
                <span className="absolute bottom-5 right-6 font-mono text-[10px] uppercase tracking-[0.2em] tabular-nums text-white/70">
                  {num(active)} / {num(slides.length - 1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
