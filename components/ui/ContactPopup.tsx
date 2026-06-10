'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = '9bit_contact_popup_seen';
const DELAY_MS = 25_000;

export default function ContactPopup() {
  const t = useTranslations('contact_popup');
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let fired = false;
    const trigger = () => {
      if (fired) return;
      fired = true;
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
    };

    const timer = setTimeout(trigger, DELAY_MS);

    // exit-intent: mouse leaves through the top of the viewport
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  const close = () => setOpen(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0] || 'Contacte web',
          email,
          phone: '',
          message: `Sol·licito que em contacteu (pop-up de la web). Email: ${email}`,
          website: '',
        }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-surface-container-low p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary-container/20 blur-3xl" />

            <button
              onClick={close}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label={t('dismiss')}
            >
              <X size={20} />
            </button>

            {status === 'done' ? (
              <div className="relative text-center py-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-container/15 flex items-center justify-center">
                  <CheckCircle2 className="text-primary-container" size={30} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-1">{t('success_title')}</h3>
                <p className="text-on-surface-variant text-sm">{t('success_sub')}</p>
              </div>
            ) : (
              <div className="relative">
                <span className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-widest text-primary-container">
                  <span className="h-px w-6 bg-primary-container" />
                  {t('label')}
                </span>
                <h3 className="text-3xl font-black tracking-tighter leading-[1.1] text-on-surface mb-3">
                  {t('heading')}{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-container to-blue-300">
                    {t('heading_highlight')}
                  </span>
                  .
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{t('body')}</p>

                <form onSubmit={onSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('placeholder')}
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-full pl-11 pr-4 py-3.5 text-on-surface placeholder-on-surface-variant/40 text-sm focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-primary-container hover:bg-primary-container/90 text-white font-sans uppercase tracking-[0.15em] text-xs py-3.5 shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === 'sending' ? t('sending') : t('button')}
                    {status !== 'sending' && <ArrowRight size={15} />}
                  </button>
                  {status === 'error' && (
                    <p className="text-red-400 text-xs text-center font-mono">{t('error')}</p>
                  )}
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
