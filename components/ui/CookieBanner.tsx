'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

const STORAGE_KEY = '9bit-cookie-consent';

export default function CookieBanner() {
  const t = useTranslations('cookie_banner');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      const id = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(id);
    }
  }, []);

  const accept = () => { localStorage.setItem(STORAGE_KEY, 'accepted'); setVisible(false); };
  const reject = () => { localStorage.setItem(STORAGE_KEY, 'rejected'); setVisible(false); };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[100]"
          role="dialog"
          aria-live="polite"
          aria-label={t('title')}
        >
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-on-surface text-sm">{t('title')}</h3>
              <button
                onClick={reject}
                aria-label="Close"
                className="text-on-surface-variant hover:text-on-surface transition-colors -mt-1 -mr-1"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-on-surface-variant text-xs leading-relaxed mb-4">
              {t('body')}{' '}
              <Link
                href={`/${locale}/cookies`}
                className="text-primary-container hover:underline"
              >
                {t('policy_link')}
              </Link>
              .
            </p>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 bg-primary-container text-white text-xs font-semibold uppercase tracking-wider py-2.5 rounded-lg hover:bg-primary-container/90 transition-colors"
              >
                {t('accept')}
              </button>
              <button
                onClick={reject}
                className="flex-1 border border-white/15 text-on-surface-variant text-xs font-semibold uppercase tracking-wider py-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                {t('reject')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
