'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { locales, type Locale } from '@/i18n';
import { cn } from '@/lib/utils';

export default function LanguageSelector({
  openUp = false,
  alignLeft = false,
}: {
  openUp?: boolean;
  alignLeft?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const switchLocale = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04] transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe size={14} />
        {locale.toUpperCase()}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className={cn(
              'absolute min-w-[120px] rounded-xl border border-white/[0.1] bg-[#0d0f17] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50',
              alignLeft ? 'left-0' : 'right-0',
              openUp ? 'bottom-full mb-2' : 'mt-2'
            )}
          >
            {locales.map((l) => {
              const active = l === locale;
              return (
                <li key={l}>
                  <button
                    onClick={() => switchLocale(l)}
                    role="option"
                    aria-selected={active}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors',
                      active
                        ? 'bg-primary-container/15 text-primary-container font-bold'
                        : 'text-on-surface-variant hover:bg-white/[0.05] hover:text-on-surface'
                    )}
                  >
                    {l.toUpperCase()}
                    {active && <Check size={13} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
