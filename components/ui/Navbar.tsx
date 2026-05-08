'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/serveis`, label: t('services') },
    { href: `/${locale}/qui-som`, label: t('about') },
    { href: `/${locale}/clients`, label: t('clients') },
    { href: `/${locale}/contacte`, label: t('contact') },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-background/60 border-b border-glass-border shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-container-max mx-auto flex justify-between items-center px-6 lg:px-10 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/logo_9bit_sin_fondo.png"
            alt="9bit"
            width={80}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans uppercase tracking-[0.2em] text-[10px] text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <Link
            href={`/${locale}/contacte`}
            className="hidden md:inline-block font-sans uppercase tracking-[0.2em] text-[10px] text-white bg-primary-container rounded-full shadow-[0_0_15px_rgba(0,102,255,0.4)] px-6 py-2 hover:bg-primary-container/90 hover:shadow-[0_0_20px_rgba(0,102,255,0.6)] active:scale-95 transition-all"
          >
            {t('cta')}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-on-surface"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-96 border-t border-glass-border' : 'max-h-0'
        )}
      >
        <nav className="flex flex-col gap-4 p-6 bg-background/95">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-sans uppercase tracking-[0.2em] text-xs text-on-surface-variant hover:text-on-surface"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-glass-border flex items-center justify-between">
            <LanguageSelector />
            <Link
              href={`/${locale}/contacte`}
              onClick={() => setOpen(false)}
              className="font-sans uppercase tracking-[0.2em] text-[10px] text-white bg-primary-container rounded-full px-5 py-2"
            >
              {t('cta')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
