'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export type ShowcaseSlide = {
  title: string;
  description: string;
  Icon: LucideIcon;
  /** Pantallas de scroll que dura este slide. 1 por defecto; súbelo para que
   *  un slide no se pase de largo antes de que dé tiempo a leerlo. */
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
  // Arranca en false para que SSR y el primer render cliente coincidan (variante apilada).
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
      // incorpora el scroll de ventana sin necesidad de sumar offsetTop de los padres
      // (que fallaría con cualquier ancestro posicionado o transformado).
      const travelled = -el.getBoundingClientRect().top;
      const screens = travelled / window.innerHeight;
      // Cada slide ocupa tantas pantallas como diga su weight, así que el índice
      // sale de en qué banda acumulada cae el scroll, no de una división directa.
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
        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {slides.map(({ title, description, Icon }, i) => (
            <RevealItem key={title} className="h-full">
              <article className="glass-panel glow-hover flex h-full flex-col gap-4 rounded-2xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary-container/25 bg-primary-container/10">
                    <Icon size={22} className="text-primary-container" />
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-on-surface-variant/50">
                    {num(i)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-on-surface">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
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

  /* ── Variante scroll: índice interactivo + panel visual ───────────────── */
  return (
    <section className={cn('relative', className)}>
      <div ref={wrapperRef} style={{ height: `${totalScreens * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-container-max grid-cols-1 items-center gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20 lg:px-10">
            {/* Columna izquierda: índice navegable. El activo se abre. */}
            <div>
              {header}

              <ul className="mt-10 border-t border-black/[0.08]" aria-label={heading}>
                {slides.map((slide, i) => {
                  const isActive = i === active;
                  const SlideIcon = slide.Icon;
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
                              'flex items-center gap-2.5 text-xl font-bold tracking-tight transition-colors duration-300 lg:text-2xl',
                              isActive
                                ? 'text-on-surface'
                                : 'text-on-surface-variant/55 group-hover:text-on-surface'
                            )}
                          >
                            <SlideIcon
                              size={18}
                              className={cn(
                                'shrink-0 transition-colors duration-300',
                                isActive ? 'text-primary-container' : 'text-on-surface-variant/40'
                              )}
                            />
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

            {/* Columna derecha: visual abstracto generado (sin imágenes) */}
            <div className="hidden md:flex md:justify-center">
              <div className="glass-panel grid-bg relative aspect-square w-full max-w-[440px] overflow-hidden rounded-3xl">
                <div
                  aria-hidden
                  className="absolute inset-0 transition-transform duration-[900ms] ease-out"
                  style={{
                    transform: `translate3d(${
                      (active / Math.max(slides.length - 1, 1) - 0.5) * 26
                    }%, ${(active / Math.max(slides.length - 1, 1) - 0.5) * -20}%, 0)`,
                    background:
                      'radial-gradient(45% 45% at 50% 50%, rgba(0,102,255,0.26), transparent 70%)',
                  }}
                />
                {/* Anillos concéntricos: profundidad sin el peso de una imagen. */}
                <div aria-hidden className="absolute inset-0 flex items-center justify-center">
                  {[0.45, 0.65, 0.85].map((s) => (
                    <span
                      key={s}
                      className="absolute rounded-full border border-primary-container/10"
                      style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
                    />
                  ))}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeSlide?.title}
                    initial={{ opacity: 0, scale: 0.82, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden
                  >
                    {activeSlide ? (
                      <activeSlide.Icon
                        size={128}
                        strokeWidth={0.9}
                        className="text-primary-container drop-shadow-[0_0_34px_var(--glow-color)]"
                      />
                    ) : null}
                  </motion.div>
                </AnimatePresence>
                <span className="absolute bottom-5 right-6 font-mono text-[10px] uppercase tracking-[0.2em] tabular-nums text-on-surface-variant/55">
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
