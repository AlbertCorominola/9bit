'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, Phone } from 'lucide-react';

export type CallLine = { from: 'agent' | 'caller'; text: string };

interface Props {
  status: string;
  subtitle: string;
  agentLabel: string;
  callerLabel: string;
  note: string;
  result: string;
  lines: CallLine[];
}

/** Milisegundos por carácter al «escribir» una frase. */
const CHAR_MS = 26;
/** Pausa entre una frase y la siguiente. */
const LINE_GAP_MS = 620;
/** Tiempo con la conversación completa antes de volver a empezar. */
const LOOP_HOLD_MS = 4200;

/**
 * Simula una llamada atendida por un agente de voz: las frases se escriben
 * una a una y al terminar aparece la reserva confirmada. Se repite en bucle.
 *
 * No es una grabación ni una transcripción real: el guion viene de los
 * mensajes y la etiqueta lo dice explícitamente.
 */
export default function LiveCallDemo({
  status,
  subtitle,
  agentLabel,
  callerLabel,
  note,
  result,
  lines,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: '-15%' });

  // Índice de la frase que se está escribiendo y cuántos caracteres van.
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Con reduced-motion o fuera de pantalla, la conversación se enseña entera
    // y quieta: ni se escribe ni consume temporizadores.
    if (reduced || !inView) {
      setLine(lines.length);
      setChars(0);
      setDone(true);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const run = async () => {
      while (!cancelled) {
        setDone(false);
        setLine(0);
        setChars(0);
        await wait(700);

        for (let i = 0; i < lines.length && !cancelled; i++) {
          setLine(i);
          const total = lines[i].text.length;
          for (let c = 1; c <= total && !cancelled; c++) {
            setChars(c);
            await wait(CHAR_MS);
          }
          setLine(i + 1);
          setChars(0);
          await wait(LINE_GAP_MS);
        }

        if (cancelled) return;
        setDone(true);
        await wait(LOOP_HOLD_MS);
      }
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduced, inView, lines]);

  return (
    <div ref={ref} className="w-full max-w-[26rem]">
      <div className="overflow-hidden rounded-[1.75rem] border border-black/[0.08] bg-surface shadow-[0_44px_90px_-40px_rgba(13,17,23,0.5)]">
        {/* Cabecera de llamada */}
        <div className="flex items-center gap-3 border-b border-black/[0.07] bg-surface-container-low px-6 py-4">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-container/12 text-primary-container">
            {!reduced && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-primary-container/25"
                animate={{ scale: [1, 1.5], opacity: [0.55, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <Phone size={17} className="relative" />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-sm font-semibold tracking-tight text-on-surface">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {status}
            </p>
            <p className="truncate text-[11px] text-on-surface-variant">{subtitle}</p>
          </div>
          <span className="ml-auto font-mono text-[11px] tabular-nums text-on-surface-variant/70">
            00:0{Math.min(line + 2, 9)}
          </span>
        </div>

        {/* Transcripción */}
        <div className="flex min-h-[16rem] flex-col gap-3 px-6 py-5">
          {lines.map((l, i) => {
            const isWriting = i === line && !done;
            const isWritten = i < line || done;
            if (!isWriting && !isWritten) return null;
            const text = isWriting ? l.text.slice(0, chars) : l.text;
            const mine = l.from === 'agent';

            return (
              <motion.div
                key={`${i}-${l.text}`}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={mine ? 'self-start' : 'self-end'}
              >
                {/* El color y el lado ya dicen quién habla; la etiqueta se
                    queda solo para quien escucha la página. */}
                <span className="sr-only">{mine ? agentLabel : callerLabel}: </span>
                <p
                  className={`max-w-[17rem] rounded-2xl px-4 py-2.5 text-[13px] leading-snug ${
                    mine
                      ? 'rounded-tl-sm bg-primary-container text-white'
                      : 'rounded-tr-sm border border-black/[0.07] bg-black/[0.035] text-on-surface'
                  }`}
                >
                  {text}
                  {isWriting && (
                    <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] animate-pulse bg-current align-middle" />
                  )}
                </p>
              </motion.div>
            );
          })}

          {/* Resultado */}
          <motion.div
            initial={false}
            animate={done ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-auto flex items-center gap-2.5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] px-4 py-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check size={13} strokeWidth={3} />
            </span>
            <span className="text-[13px] font-semibold tracking-tight text-on-surface">
              {result}
            </span>
          </motion.div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant/55">
        {note}
      </p>
    </div>
  );
}
