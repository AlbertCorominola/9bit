'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { CONSENT_EVENT } from '@/components/ui/CookieBanner';

const COOKIE_CONSENT_KEY = '9bit-cookie-consent';
const TEASER_DISMISSED_KEY = '9bit-wa-teaser';
const PHONE = '34637400350';
/** Tiempo hasta que el globo se ofrece solo. Suficiente para no interrumpir. */
const TEASER_DELAY = 7000;

type QuickReply = { label: string; message: string };

function WhatsAppGlyph({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppWidget() {
  const t = useTranslations('whatsapp');
  const reduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [typing, setTyping] = useState(false);

  const quick = useMemo(() => (t.raw('quick') as QuickReply[]) ?? [], [t]);

  const link = (message: string) =>
    `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // El banner de cookies ocupa esta misma esquina y lo taparía por completo,
    // así que este botón no aparece hasta que se haya respondido al banner.
    const answered = () => {
      try {
        return !!localStorage.getItem(COOKIE_CONSENT_KEY);
      } catch {
        return true;
      }
    };

    if (answered()) {
      setIsVisible(true);
      return;
    }

    const onConsent = () => setIsVisible(true);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  // El globo se ofrece una vez por sesión: insiste lo justo.
  useEffect(() => {
    if (!isVisible || open) return;
    try {
      if (sessionStorage.getItem(TEASER_DISMISSED_KEY)) return;
    } catch {
      return;
    }
    const id = setTimeout(() => setTeaser(true), TEASER_DELAY);
    return () => clearTimeout(id);
  }, [isVisible, open]);

  // Al abrir, el "escribiendo…" da un segundo de vida antes del mensaje.
  useEffect(() => {
    if (!open) return;
    if (reduced) {
      setTyping(false);
      return;
    }
    setTyping(true);
    const id = setTimeout(() => setTyping(false), 850);
    return () => clearTimeout(id);
  }, [open, reduced]);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_DISMISSED_KEY, '1');
    } catch {
      /* modo privado: da igual, solo se repetirá */
    }
  };

  const toggle = () => {
    dismissTeaser();
    setOpen((v) => !v);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Globo de invitación. En móvil tapaba justo la demo del hero, que es lo
          primero que hay que ver; allí basta con el halo y el contador. */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, x: 18, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 18, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative hidden max-w-[16rem] rounded-2xl rounded-br-md border border-black/[0.08] bg-surface px-4 py-3 pr-9 text-left shadow-[0_18px_44px_-18px_rgba(13,17,23,0.35)] sm:block"
          >
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label={t('dismiss')}
              className="absolute right-2 top-2 rounded-full p-1 text-on-surface-variant/60 transition-colors hover:bg-black/[0.05] hover:text-on-surface"
            >
              <X size={13} />
            </button>
            <button type="button" onClick={toggle} className="text-left">
              <span className="block text-[13px] font-semibold leading-snug tracking-tight text-on-surface">
                {t('teaser')}
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[11px] text-on-surface-variant">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                {t('online')}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{ transformOrigin: 'bottom right' }}
            className="w-[19.5rem] overflow-hidden rounded-3xl border border-black/[0.08] bg-surface shadow-[0_28px_70px_-24px_rgba(13,17,23,0.4)]"
          >
            <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/15 text-white">
                <WhatsAppGlyph size={19} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold leading-tight text-white">9bit</p>
                <p className="flex items-center gap-1.5 text-[11px] leading-tight text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {t('online')}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 transition-colors hover:text-white"
                aria-label={t('dismiss')}
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4 min-h-[3.25rem] rounded-2xl rounded-tl-sm border border-black/[0.07] bg-black/[0.03] px-4 py-3">
                {typing ? (
                  <span className="flex items-center gap-1 py-1" aria-label="…">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-on-surface-variant/50"
                        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </span>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm leading-snug text-on-surface"
                  >
                    {t('prompt')}
                  </motion.p>
                )}
              </div>

              {/* Respuestas rápidas: el visitante entra a WhatsApp con el
                  mensaje ya escrito, que es donde se cae la conversión. */}
              <div className="mb-3 flex flex-wrap gap-2">
                {quick.map((q, i) => (
                  <motion.a
                    key={q.label}
                    href={link(q.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (typing ? 0.9 : 0.05) + i * 0.06 }}
                    className="rounded-full border border-[#25D366]/35 bg-[#25D366]/10 px-3 py-1.5 text-xs font-medium text-on-surface transition-colors hover:border-[#25D366] hover:bg-[#25D366]/20"
                  >
                    {q.label}
                  </motion.a>
                ))}
              </div>

              <a
                href={link(quick[quick.length - 1]?.message ?? t('title'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
              >
                <WhatsAppGlyph size={16} />
                {t('cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <div className="relative">
        {/* Halo que respira: llama la atención sin moverse de sitio. */}
        {!open && !reduced && (
          <>
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#25D366]/35"
              animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#25D366]/25"
              animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
            />
          </>
        )}

        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.9)] transition-shadow duration-300 hover:shadow-[0_14px_38px_-8px_rgba(37,211,102,1)]"
          aria-label={t('aria')}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <X size={26} />
              </motion.span>
            ) : (
              <motion.span
                key="wa"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <WhatsAppGlyph size={28} />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Contador de mensaje sin leer: gancho clásico y eficaz. */}
          {!open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 1.2 }}
              className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-background"
            >
              1
            </motion.span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
