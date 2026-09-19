'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type VisualVariant = 'web' | 'voice' | 'chatbots' | 'automation';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Una pieza animada por servicio, dibujada en código: ni fotos de archivo ni
 * las mismas imágenes que ya salen en la portada. Cada variante enseña cómo
 * funciona ese servicio, no una metáfora.
 *
 * Todas arrancan al entrar en pantalla y se paran al salir; con
 * prefers-reduced-motion se ven en su estado final, quietas.
 */
export default function ServiceVisual({
  variant,
  className,
}: {
  variant: VisualVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: '-20%' });
  const live = inView && !reduced;

  return (
    <div
      ref={ref}
      className={cn(
        'grid-bg relative flex items-center justify-center overflow-hidden rounded-3xl border border-black/[0.08] bg-surface-container-low',
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 45%, rgba(0,102,255,0.10), transparent 70%)',
        }}
      />
      <div className="relative w-full px-6 py-7 sm:px-8">
        {variant === 'web' && <WebVisual live={live} />}
        {variant === 'voice' && <VoiceVisual live={live} />}
        {variant === 'chatbots' && <ChatbotsVisual live={live} />}
        {variant === 'automation' && <AutomationVisual live={live} />}
      </div>
    </div>
  );
}

/* ── 01. Desarrollo web: la página se monta sola ────────────────────────── */

function WebVisual({ live }: { live: boolean }) {
  const blocks = [
    'h-3 w-2/5 rounded-full bg-on-surface/75',
    'h-2 w-3/5 rounded-full bg-on-surface/20',
    'h-2 w-1/2 rounded-full bg-on-surface/20',
  ];

  return (
    <div className="mx-auto w-full max-w-[25rem]">
      <div className="overflow-hidden rounded-2xl border border-black/[0.09] bg-surface shadow-[0_28px_60px_-34px_rgba(13,17,23,0.45)]">
        <div className="flex items-center gap-2 border-b border-black/[0.07] bg-surface-container-low px-4 py-2.5">
          <span className="flex gap-1.5">
            {['bg-black/15', 'bg-black/15', 'bg-black/15'].map((c, i) => (
              <span key={i} className={cn('h-2 w-2 rounded-full', c)} />
            ))}
          </span>
          <span className="ml-1 h-4 flex-1 rounded-full bg-black/[0.05]" />
        </div>

        <div className="space-y-3.5 p-5">
          {blocks.map((b, i) => (
            <motion.div
              key={i}
              className={b}
              initial={{ opacity: 0, x: -14 }}
              animate={live ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={
                live
                  ? { duration: 0.5, ease: EASE, delay: i * 0.12, repeat: Infinity, repeatDelay: 3.6, repeatType: 'loop' }
                  : { duration: 0 }
              }
            />
          ))}

          <motion.div
            className="inline-flex h-7 items-center rounded-full bg-primary-container px-4 text-[10px] font-semibold text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={live ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={
              live
                ? { duration: 0.5, ease: EASE, delay: 0.46, repeat: Infinity, repeatDelay: 3.6 }
                : { duration: 0 }
            }
          >
            <span className="opacity-90">···</span>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-11 rounded-lg border border-black/[0.07] bg-black/[0.03]"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={live ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={
                  live
                    ? { duration: 0.45, ease: EASE, delay: 0.6 + i * 0.1, repeat: Infinity, repeatDelay: 3.6 }
                    : { duration: 0 }
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Resultado de búsqueda: la web existe y además se encuentra. */}
      <motion.div
        className="mt-4 rounded-xl border border-black/[0.08] bg-surface px-4 py-3 shadow-[0_18px_40px_-28px_rgba(13,17,23,0.5)]"
        initial={{ opacity: 0, y: 16 }}
        animate={live ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={
          live
            ? { duration: 0.6, ease: EASE, delay: 1.1, repeat: Infinity, repeatDelay: 3.6 }
            : { duration: 0 }
        }
      >
        <span className="block h-2 w-16 rounded-full bg-primary-container/70" />
        <span className="mt-2 block h-2 w-40 rounded-full bg-on-surface/25" />
        <span className="mt-1.5 block h-2 w-28 rounded-full bg-on-surface/15" />
      </motion.div>
    </div>
  );
}

/* ── 02. Agentes telefónicos: la voz que contesta ───────────────────────── */

const BARS = Array.from({ length: 34 }, (_, i) => i);

function VoiceVisual({ live }: { live: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[25rem]">
      <div className="rounded-2xl border border-black/[0.09] bg-surface p-6 shadow-[0_28px_60px_-34px_rgba(13,17,23,0.45)]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={live ? { opacity: [1, 0.25, 1] } : {}}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            00:07
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-text">
            24/7
          </span>
        </div>

        {/* Onda de voz */}
        <div className="mt-7 flex h-24 items-center justify-between">
          {BARS.map((i) => {
            // Redondeado a propósito: sin esto el servidor serializa el float
            // con menos decimales que el cliente y React avisa de desajuste.
            const base = Number((0.18 + Math.abs(Math.sin(i * 0.55)) * 0.55).toFixed(4));
            const height = `${(base * 100).toFixed(2)}%`;
            const dim = Number((0.35 + base * 0.5).toFixed(3));
            return (
              <motion.span
                key={i}
                className="w-[3.5px] rounded-full bg-primary-container"
                style={{ height, opacity: dim }}
                animate={
                  live
                    ? { scaleY: [0.35, 1, 0.55, 0.9, 0.35] }
                    : {}
                }
                transition={{
                  duration: 1.9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (i % 7) * 0.09,
                }}
              />
            );
          })}
        </div>

        <div className="mt-7 space-y-2 border-t border-black/[0.07] pt-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2.5"
              initial={{ opacity: 0.25 }}
              animate={live ? { opacity: [0.35, 1, 1, 0.35] } : { opacity: 1 }}
              transition={
                live
                  ? { duration: 4.5, repeat: Infinity, times: [0, 0.25, 0.8, 1], delay: i * 1.1 }
                  : { duration: 0 }
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
              <span
                className="h-2 rounded-full bg-on-surface/20"
                style={{ width: `${[62, 45, 78][i]}%` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 03. Chatbots: un cerebro, tres canales ─────────────────────────────── */

const CHANNELS = [
  { label: 'Web', y: 58 },
  { label: 'WhatsApp', y: 150 },
  { label: 'Instagram', y: 242 },
];

function ChatbotsVisual({ live }: { live: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[25rem]">
      <svg viewBox="0 0 320 300" className="w-full" role="img" aria-hidden>
        {/* Núcleo */}
        <rect
          x="16"
          y="126"
          width="48"
          height="48"
          rx="14"
          className="fill-[var(--primary-container)]"
        />
        <circle cx="32" cy="150" r="3.5" fill="white" />
        <circle cx="48" cy="150" r="3.5" fill="white" />

        {CHANNELS.map((ch, i) => {
          const d = `M 64 150 C 130 150, 150 ${ch.y}, 210 ${ch.y}`;
          return (
            <g key={ch.label}>
              {/* La ruta suelta es la que sigue el pulso con <mpath>. */}
              <path id={`ch-${i}`} d={d} fill="none" stroke="none" />
              <motion.path
                d={d}
                fill="none"
                strokeWidth="1.5"
                className="stroke-[var(--primary-container)]"
                strokeOpacity={0.25}
                initial={{ pathLength: 0 }}
                animate={live ? { pathLength: 1 } : { pathLength: 1 }}
                transition={live ? { duration: 0.9, ease: EASE, delay: i * 0.15 } : { duration: 0 }}
              />
              {/* Pulso que recorre el canal */}
              {live && (
                <circle r="4" className="fill-[var(--primary-container)]" opacity="0">
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${i * 0.8}s`}
                  />
                  <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.8}s`}>
                    <mpath href={`#ch-${i}`} />
                  </animateMotion>
                </circle>
              )}

              {/* Chip del canal */}
              <motion.g
                initial={{ opacity: 0, x: 10 }}
                animate={live ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={live ? { duration: 0.5, ease: EASE, delay: 0.5 + i * 0.15 } : { duration: 0 }}
              >
                <rect
                  x="210"
                  y={ch.y - 17}
                  width="96"
                  height="34"
                  rx="17"
                  className="fill-[var(--surface)] stroke-black/[0.09]"
                  strokeWidth="1"
                />
                <text
                  x="230"
                  y={ch.y + 4}
                  className="fill-[var(--on-surface)]"
                  style={{ font: '600 11px var(--font-inter), sans-serif' }}
                >
                  {ch.label}
                </text>
                <motion.circle
                  cx="221"
                  cy={ch.y}
                  r="3.5"
                  className="fill-emerald-500"
                  animate={live ? { opacity: [0.3, 1, 0.3] } : {}}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8 + 1.1 }}
                />
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── 04. Automatización: la tarea recorre el circuito sola ──────────────── */

const NODES = [
  { x: 42, y: 52 },
  { x: 232, y: 52 },
  { x: 232, y: 176 },
  { x: 42, y: 176 },
];
const FLOW_PATH = 'M 42 52 L 232 52 L 232 176 L 42 176';

function AutomationVisual({ live }: { live: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[25rem]">
      <svg viewBox="0 0 274 228" className="w-full" role="img" aria-hidden>
        <path id="flow" d={FLOW_PATH} fill="none" stroke="none" />

        <motion.path
          d={FLOW_PATH}
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="stroke-[var(--primary-container)]"
          strokeOpacity={0.28}
          initial={{ pathLength: 0 }}
          animate={live ? { pathLength: 1 } : { pathLength: 1 }}
          transition={live ? { duration: 1.4, ease: EASE } : { duration: 0 }}
        />

        {NODES.map((n, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={live ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={live ? { duration: 0.45, ease: EASE, delay: 0.3 + i * 0.18 } : { duration: 0 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <rect
              x={n.x - 26}
              y={n.y - 17}
              width="52"
              height="34"
              rx="11"
              className="fill-[var(--surface)] stroke-black/[0.09]"
              strokeWidth="1"
            />
            <rect
              x={n.x - 14}
              y={n.y - 5}
              width="28"
              height="3"
              rx="1.5"
              className="fill-[var(--on-surface)]"
              fillOpacity={0.25}
            />
            <rect
              x={n.x - 14}
              y={n.y + 2}
              width="17"
              height="3"
              rx="1.5"
              className="fill-[var(--on-surface)]"
              fillOpacity={0.15}
            />
          </motion.g>
        ))}

        {/* La tarea viajando por el circuito */}
        {live && (
          <circle r="5" className="fill-[var(--primary-container)]">
            <animateMotion dur="4s" repeatCount="indefinite" begin="1.2s" rotate="auto">
              <mpath href="#flow" />
            </animateMotion>
          </circle>
        )}
      </svg>
    </div>
  );
}
