'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { cn } from '@/lib/utils';

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          <button
            onClick={() => switchLocale(l)}
            className={cn(
              'transition-colors',
              l === locale ? 'text-on-surface font-bold' : 'text-on-surface-variant/60 hover:text-on-surface'
            )}
          >
            {l.toUpperCase()}
          </button>
          {i < locales.length - 1 && <span className="text-on-surface-variant/30">|</span>}
        </span>
      ))}
    </div>
  );
}
