'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Globe, Sparkles, Zap, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ClientMarquee from '@/components/ui/ClientMarquee';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';

// ─── Medios y enlaces por caso (mismo orden que clients_page.cases) ──────────

type Media =
  | { kind: 'image'; src: string }
  | { kind: 'gallery' }
  | { kind: 'video' };

const CASE_MEDIA: Media[] = [
  { kind: 'image', src: '/cases/multiesports.webp' },
  { kind: 'image', src: '/cases/masterrats.webp' },
  { kind: 'gallery' },
  { kind: 'video' },
  { kind: 'image', src: '/cases/creuers.webp' },
  { kind: 'image', src: '/cases/massoles.webp' },
  { kind: 'image', src: '/cases/estanyol.webp' },
  { kind: 'image', src: '/cases/aguilera.webp' },
  { kind: 'image', src: '/cases/ooadditives.webp' },
];

const CASE_URLS = [
  'https://multiesportster.com/',
  '',
  '',
  '',
  'https://creuers2mes2.com/',
  'https://massoles.com/',
  'https://restaurantarestestanyol.com/',
  'https://www.gestoriaguileraperez.com/',
  'https://www.ooadditives.com/',
];

const CASE_ICONS: LucideIcon[] = [
  Globe,
  Sparkles,
  Zap,
  Zap,
  Globe,
  Globe,
  Globe,
  Briefcase,
  Globe,
];

/** Los cuatro primeros encabezan la página; el resto va en la parrilla. */
const FEATURED_COUNT = 4;

const EPICENTRE_GALLERY = [
  '/clients/pre-epicentre-in.jpeg',
  '/clients/epicentre-in.jpeg',
  '/clients/epicentre-out.jpeg',
];

const CAMPING_VIDEO = '/clients/video_camping.mp4';
// Fotograma del propio vídeo: con preload="none" la tarjeta se quedaría en
// negro hasta que el vídeo empiece a cargar.
const CAMPING_POSTER = '/clients/video_camping_poster.jpg';

type Case = {
  title: string;
  industry: string;
  tag: string;
  desc: string;
  metric?: string;
  metricLabel?: string;
  galleryLabels?: string[];
};

const CHIP =
  'inline-flex items-center gap-1.5 rounded-full border border-primary-container/25 bg-primary-container/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-text';

const VISIT =
  'group/link inline-flex w-fit items-center gap-1.5 text-sm font-semibold tracking-tight text-primary-text transition-colors hover:text-primary';

export default function ClientsPage() {
  const t = useTranslations('clients_page');
  const locale = useLocale();

  const raw = (t.raw('cases') as Case[]) ?? [];
  const cases = raw.map((c, i) => ({
    ...c,
    media: CASE_MEDIA[i],
    url: CASE_URLS[i] ?? '',
    Icon: CASE_ICONS[i] ?? Globe,
  }));
  const featured = cases.slice(0, FEATURED_COUNT);
  const rest = cases.slice(FEATURED_COUNT);

  const stats = (t.raw('stats') as { value: string; label: string }[]) ?? [];
  const testimonials =
    (t.raw('testimonials') as { name: string; company: string; quote: string; initials?: string }[]) ??
    [];

  /* ── Medio de un caso destacado ────────────────────────────────────────── */
  const renderMedia = (c: (typeof cases)[number]) => {
    if (c.media?.kind === 'gallery') {
      const labels = c.galleryLabels ?? [];
      return (
        <div className="grid h-full grid-cols-2 gap-2 p-2">
          <div className="relative col-span-2 h-48 md:h-60">
            <Image
              src={EPICENTRE_GALLERY[2]}
              alt={`${c.title} — ${labels[2] ?? ''}`}
              fill
              className="rounded-xl object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white">
              {labels[2]}
            </span>
          </div>
          {[0, 1].map((i) => (
            <div key={EPICENTRE_GALLERY[i]} className="relative h-28 md:h-32">
              <Image
                src={EPICENTRE_GALLERY[i]}
                alt={`${c.title} — ${labels[i] ?? ''}`}
                fill
                className="rounded-xl object-cover"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white">
                {labels[i]}
              </span>
            </div>
          ))}
        </div>
      );
    }

    if (c.media?.kind === 'video') {
      // Vídeo vertical de móvil (576x1024): se muestra en su proporción, nunca
      // recortado a una tira apaisada.
      return (
        <div className="flex items-center justify-center p-8">
          <video
            src={CAMPING_VIDEO}
            poster={CAMPING_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="aspect-[9/16] w-full max-w-[220px] rounded-2xl border border-black/10 object-cover shadow-[0_24px_60px_-28px_rgba(13,17,23,0.5)]"
          />
        </div>
      );
    }

    return (
      <div className="relative h-full min-h-[15rem] overflow-hidden">
        <Image
          src={c.media.kind === 'image' ? c.media.src : ''}
          alt={c.title}
          fill
          className="object-cover object-left-top"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* ── 1. Cabecera ──────────────────────────────────────────────── */}
      <section className="relative -mt-20 overflow-hidden px-6 pb-20 pt-40 lg:px-10">
        <div className="relative z-10 mx-auto max-w-container-max">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/60 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
              {t('badge')}
            </span>
            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.045em] text-on-surface md:text-7xl">
              {t('heading')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant">
              {t('subtitle')}
            </p>
          </Reveal>

          <RevealGroup className="mt-12 flex flex-wrap gap-2.5">
            {stats.map((s) => (
              <RevealItem key={s.label}>
                <div className="flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-surface-container-low px-5 py-2.5">
                  <span className="font-sans text-base font-black leading-none tracking-tight text-primary-text">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">
                    {s.label}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── 2. Logos ─────────────────────────────────────────────────── */}
      <section className="px-6 py-16 lg:px-10">
        <Reveal className="mx-auto mb-8 max-w-container-max">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60">
            {t('marquee_title')}
          </p>
        </Reveal>

        <Reveal className="relative">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="border-y border-black/[0.07]">
            <ClientMarquee />
            <ClientMarquee reverse />
          </div>
        </Reveal>
      </section>

      {/* ── 3. Casos de éxito ────────────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32 lg:px-10">
        <div className="mx-auto max-w-container-max">
          <Reveal className="mb-16 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
              {t('cases_label')}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl">
              {t('cases_title')}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-on-surface-variant">
              {t('cases_subtitle')}
            </p>
          </Reveal>

          {/* Destacados: panel a ancho completo, con el medio alternando lado. */}
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60">
            {t('highlighted_label')}
          </p>
          <div className="flex flex-col gap-6">
            {featured.map((c, i) => (
              <Reveal key={c.title} direction="up">
                <article className="group overflow-hidden rounded-3xl border border-black/[0.08] bg-surface-container-low transition-colors duration-300 hover:border-primary-container/25">
                  <div className="grid md:grid-cols-2">
                    <div
                      className={`relative bg-surface-container/40 ${
                        i % 2 === 1 ? 'md:order-2' : ''
                      }`}
                    >
                      {renderMedia(c)}
                    </div>

                    <div className="flex flex-col justify-center p-8 md:p-12">
                      <div className="mb-5 flex flex-wrap items-center gap-2.5">
                        <span className={CHIP}>
                          <c.Icon size={11} />
                          {c.tag}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant/70">
                          {c.industry}
                        </span>
                      </div>

                      <h3 className="text-3xl font-black leading-[1.05] tracking-[-0.035em] text-on-surface md:text-4xl">
                        {c.title}
                      </h3>
                      <p className="mt-4 leading-relaxed text-on-surface-variant">{c.desc}</p>

                      {c.metric && (
                        <div className="mt-7 flex items-baseline gap-2.5 border-t border-black/[0.07] pt-6">
                          <span className="font-sans text-4xl font-black tracking-tight text-primary-container">
                            {c.metric}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">
                            {c.metricLabel}
                          </span>
                        </div>
                      )}

                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-7 ${VISIT}`}
                        >
                          {t('go_to_project')}
                          <ExternalLink
                            size={14}
                            className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Resto: misma ficha para todos, cada una con su captura real. */}
          <p className="mb-6 mt-20 font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60">
            {t('more_projects_label')}
          </p>
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c) => (
              <RevealItem key={c.title} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-surface-container-low transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-container/25 hover:shadow-[0_28px_56px_-32px_rgba(13,17,23,0.4)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                    {c.media?.kind === 'image' && (
                      <Image
                        src={c.media.src}
                        alt={c.title}
                        fill
                        className="object-cover object-left-top transition-transform duration-[900ms] ease-out group-hover:scale-105"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      />
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-text backdrop-blur-sm">
                      {c.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant/70">
                      {c.industry}
                    </span>
                    <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-on-surface">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-on-surface-variant">
                      {c.desc}
                    </p>

                    {c.metric && (
                      <div className="mt-5 flex items-baseline gap-2 border-t border-black/[0.07] pt-5">
                        <span className="font-sans text-2xl font-black tracking-tight text-primary-container">
                          {c.metric}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">
                          {c.metricLabel}
                        </span>
                      </div>
                    )}

                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-5 ${VISIT}`}
                      >
                        {t('go_to_project')}
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── 4. Opiniones ─────────────────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32 lg:px-10">
        <div className="mx-auto max-w-container-max">
          <Reveal className="mb-14 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
              {t('feedback_label')}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl">
              {t('testimonials_title')}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-on-surface-variant">
              {t('testimonials_subtitle')}
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <RevealItem key={item.name} className="h-full">
                <TestimonialCard {...item} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── 5. Siguiente paso ────────────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32 lg:px-10">
        <Reveal className="mx-auto max-w-container-max">
          <div className="relative overflow-hidden rounded-3xl border border-black/[0.08] bg-gradient-to-br from-primary-container/15 via-transparent to-purple-500/10 px-8 py-16 text-center md:px-16 md:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-text">
              {t('next_label')}
            </p>
            <h2 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.04em] text-on-surface md:text-5xl">
              {t('cta_heading')}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-on-surface-variant">
              {t('cta_sub')}
            </p>
            <Link
              href={`/${locale}/contacte`}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary-container px-8 py-4 text-sm font-semibold tracking-tight text-white shadow-[0_10px_34px_-10px_rgba(0,102,255,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-10px_rgba(0,102,255,0.9)] active:translate-y-0 active:scale-[0.98]"
            >
              {t('cta_button')}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
