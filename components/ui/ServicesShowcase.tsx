'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export type ShowcaseSlide = {
  /** Código corto tipo "01" o "SVC_01" */
  code: string;
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
  'inline-flex items-center justify-center gap-2 rounded-full bg-primary-container px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-[0_0_20px_var(--glow-color)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const LABEL_CLASS = 'font-mono text-xs uppercase tracking-widest text-primary-container';

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
      for (let i = 0; i < current.length; i++) {
        acc += current[i].weight ?? 1;
        if (screens < acc) {
          next = i;
          break;
        }
      }
      next = Math.max(0, next);
      setActive((prev) => (prev === next ? prev : next));
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
        window.scrollY + el.getBoundingClientRect().top + screensBefore * window.innerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    },
    [scrollMode]
  );

  const header = (
    <div>
      <p className={LABEL_CLASS}>{label}</p>
      <h2 className="mt-4 text-4xl font-black tracking-tighter leading-[1.05] text-on-surface md:text-5xl lg:text-6xl">
        {heading}
      </h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-on-surface-variant">{intro}</p>
    </div>
  );

  const totalScreens = slides.reduce((sum, s) => sum + (s.weight ?? 1), 0);

  // Desplaza el glow del panel derecho según el slide activo (-12% → +12%).
  const glowShift = slides.length > 1 ? active / (slides.length - 1) - 0.5 : 0;
  const activeSlide = slides[active];

  if (!scrollMode) {
    return (
      <section className={cn('py-20 md:py-28 px-6 lg:px-10 max-w-container-max mx-auto', className)}>
        <Reveal>{header}</Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {slides.map(({ code, title, description, Icon }) => (
            <RevealItem key={code} className="h-full">
              <article className="glass-panel glow-hover flex h-full flex-col gap-4 rounded-2xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary-container/30 bg-primary-container/10">
                    <Icon size={22} className="text-primary-container" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-on-surface-variant">
                    {code}
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
        <Reveal delay={0.1} className="mt-10">
          <Link href={ctaHref} className={CTA_CLASS}>
            {ctaLabel}
          </Link>
        </Reveal>
      </section>
    );
  }

  return (
    <section className={cn('relative', className)}>
      <div ref={wrapperRef} style={{ height: `${totalScreens * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-container-max grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 lg:gap-16 lg:px-10">
            {/* Columna izquierda */}
            <div className="md:border-r md:border-outline-variant/20 md:pr-10 lg:pr-16">
              {header}

              <nav className="mt-8 flex items-center gap-2" aria-label={heading}>
                {slides.map((slide, i) => (
                  <button
                    key={slide.code}
                    type="button"
                    aria-current={i === active}
                    aria-label={`${slide.code} — ${slide.title}`}
                    onClick={() => goToSlide(i)}
                    className={cn(
                      'h-1 rounded-full transition-all duration-300 ease-out',
                      i === active ? 'w-12 bg-primary-container' : 'w-6 bg-white/20 hover:bg-white/40'
                    )}
                  />
                ))}
              </nav>

              <div className="relative mt-8 min-h-[13rem]">
                {slides.map((slide, i) => (
                  <div
                    key={slide.code}
                    aria-hidden={i !== active}
                    className={cn(
                      'absolute inset-0 transition-all ease-out',
                      i === active
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-8 opacity-0'
                    )}
                    style={{ transitionDuration: '420ms' }}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant/60">
                      {slide.code}
                    </span>
                    <h3 className="mt-3 text-3xl font-black tracking-tighter text-on-surface lg:text-4xl">
                      {slide.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-on-surface-variant">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href={ctaHref} className={CTA_CLASS}>
                  {ctaLabel}
                </Link>
              </div>
            </div>

            {/* Columna derecha: visual abstracto generado (sin imágenes) */}
            <div className="hidden md:flex md:justify-center">
              <div className="glass-panel grid-bg relative aspect-square w-full max-w-[480px] overflow-hidden rounded-2xl">
                <div
                  aria-hidden
                  className="absolute inset-0 transition-transform duration-700 ease-out"
                  style={{
                    transform: `translate3d(${glowShift * 22}%, ${glowShift * -18}%, 0)`,
                    background:
                      'radial-gradient(45% 45% at 50% 50%, rgba(0,102,255,0.28), transparent 70%)',
                  }}
                />
                {slides.map((slide, i) => {
                  const SlideIcon = slide.Icon;
                  return (
                    <div
                      key={slide.code}
                      aria-hidden
                      className={cn(
                        'absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out',
                        i === active
                          ? 'scale-100 opacity-100'
                          : 'pointer-events-none scale-90 opacity-0'
                      )}
                    >
                      <SlideIcon
                        size={120}
                        strokeWidth={1}
                        className="text-primary-container drop-shadow-[0_0_30px_var(--glow-color)]"
                      />
                    </div>
                  );
                })}
                <span className="absolute bottom-5 right-6 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                  {activeSlide?.code}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
