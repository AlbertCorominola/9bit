'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Globe,
  Phone,
  Bot,
  Workflow,
  Server,
  Sparkles,
  Headphones,
  GraduationCap,
  ChevronDown,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import { MenuToggleIcon } from './menu-toggle-icon';
import { cn } from '@/lib/utils';

const PRIMARY_SERVICES: { key: string; icon: LucideIcon }[] = [
  { key: 'web', icon: Globe },
  { key: 'voice', icon: Phone },
  { key: 'chatbots', icon: Bot },
  { key: 'automation', icon: Workflow },
];

const SECONDARY_SERVICES: { key: string; icon: LucideIcon }[] = [
  { key: 'infrastructure', icon: Server },
  { key: 'consulting', icon: Sparkles },
  { key: 'support', icon: Headphones },
  { key: 'training', icon: GraduationCap },
];

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false);
  const onScroll = useCallback(() => setScrolled(window.scrollY > threshold), [threshold]);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  return scrolled;
}

export default function Navbar() {
  const t = useTranslations('nav');
  const ts = useTranslations('services');
  const th = useTranslations('home');
  const locale = useLocale();
  const scrolled = useScroll(10);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const serveisHref = `/${locale}/serveis`;

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/qui-som`, label: t('about') },
    { href: `/${locale}/clients`, label: t('clients') },
    { href: `/${locale}/contacte`, label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 border-b border-transparent transition-colors duration-300',
        scrolled && 'bg-background/80 backdrop-blur-lg border-black/[0.08] shadow-[0_4px_30px_rgba(13,17,23,0.06)]'
      )}
    >
      <div className="max-w-container-max mx-auto flex h-20 items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 rounded-md p-1 hover:opacity-90 transition-opacity">
          <Image
            src="/logo_9bit_sin_fondo.png"
            alt="9bit"
            width={80}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Inici */}
          <Link
            href={`/${locale}`}
            className="px-3 py-2 rounded-md font-sans uppercase tracking-[0.2em] text-[10px] text-on-surface-variant hover:text-on-surface hover:bg-black/[0.04] transition-colors"
          >
            {t('home')}
          </Link>

          {/* Serveis dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            // Sin esto el menú solo abre con el ratón y sus enlaces quedan
            // inalcanzables tabulando.
            onFocus={() => setServicesOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setServicesOpen(false);
            }}
          >
            <Link
              href={serveisHref}
              className="flex items-center gap-1 px-3 py-2 rounded-md font-sans uppercase tracking-[0.2em] text-[10px] text-on-surface-variant hover:text-on-surface hover:bg-black/[0.04] transition-colors"
              aria-expanded={servicesOpen}
            >
              {t('services')}
              <ChevronDown
                size={12}
                className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')}
              />
            </Link>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-0 top-full pt-3"
                >
                  <div className="w-[420px] rounded-2xl border border-black/[0.1] bg-surface p-2 shadow-[0_24px_70px_-20px_rgba(13,17,23,0.28)]">
                    {/* Principales: icono + nombre. Sin descripciones: el menú
                        es para navegar, no para vender. */}
                    <ul className="grid grid-cols-1 gap-0.5">
                      {PRIMARY_SERVICES.map(({ key, icon: Icon }) => (
                        <li key={key}>
                          <Link
                            href={serveisHref}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-black/[0.04]"
                          >
                            <span className="flex aspect-square w-8 flex-shrink-0 items-center justify-center rounded-lg border border-primary-container/25 bg-primary-container/10">
                              <Icon className="text-primary-container" size={15} />
                            </span>
                            <span className="text-on-surface text-sm font-medium tracking-tight normal-case">
                              {ts(`items.${key}.title`)}
                            </span>
                            <ArrowRight
                              size={13}
                              className="ml-auto text-on-surface-variant/0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-on-surface-variant/70"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Especializados: mismo menú, otro peso visual. */}
                    <div className="mt-2 border-t border-black/[0.08] px-3 pb-1 pt-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant/60">
                        {ts('more_label')}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                        {SECONDARY_SERVICES.map(({ key }) => (
                          <Link
                            key={key}
                            href={serveisHref}
                            className="text-on-surface-variant/75 hover:text-on-surface text-xs font-medium normal-case transition-colors"
                          >
                            {ts(`items.${key}.title`)}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={serveisHref}
                      className="mt-2 flex items-center justify-between rounded-xl bg-black/[0.03] px-4 py-2.5 transition-colors hover:bg-black/[0.05]"
                    >
                      <span className="text-on-surface text-xs font-medium normal-case">
                        {th('view_all')}
                      </span>
                      <ArrowRight size={13} className="text-primary-container" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-md font-sans uppercase tracking-[0.2em] text-[10px] text-on-surface-variant hover:text-on-surface hover:bg-black/[0.04] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <Link
            href={`/${locale}/contacte`}
            className="hidden md:inline-block font-sans uppercase tracking-[0.2em] text-[10px] text-white bg-primary-container rounded-full shadow-[0_0_15px_rgba(0,102,255,0.4)] px-6 py-2.5 hover:bg-primary-container/90 hover:shadow-[0_0_20px_rgba(0,102,255,0.6)] active:scale-95 transition-all"
          >
            {t('cta')}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-black/[0.08] text-on-surface"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu (portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-x-0 top-20 z-40 md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto bg-background/90 backdrop-blur-xl border-t border-b border-black/[0.08] shadow-[0_24px_50px_rgba(13,17,23,0.10)]"
              >
                <div className="flex flex-col gap-2 p-6">
                  <Link
                    href={`/${locale}`}
                    onClick={() => setOpen(false)}
                    className="font-sans uppercase tracking-[0.2em] text-xs text-on-surface-variant hover:text-on-surface p-3 rounded-lg hover:bg-black/[0.04]"
                  >
                    {t('home')}
                  </Link>
                  <Link
                    href={serveisHref}
                    onClick={() => setOpen(false)}
                    className="font-sans uppercase tracking-[0.2em] text-xs text-on-surface-variant hover:text-on-surface p-3 rounded-lg hover:bg-black/[0.04]"
                  >
                    {t('services')}
                  </Link>
                  <Link
                    href={`/${locale}/qui-som`}
                    onClick={() => setOpen(false)}
                    className="font-sans uppercase tracking-[0.2em] text-xs text-on-surface-variant hover:text-on-surface p-3 rounded-lg hover:bg-black/[0.04]"
                  >
                    {t('about')}
                  </Link>
                  <Link
                    href={`/${locale}/clients`}
                    onClick={() => setOpen(false)}
                    className="font-sans uppercase tracking-[0.2em] text-xs text-on-surface-variant hover:text-on-surface p-3 rounded-lg hover:bg-black/[0.04]"
                  >
                    {t('clients')}
                  </Link>
                  <Link
                    href={`/${locale}/contacte`}
                    onClick={() => setOpen(false)}
                    className="font-sans uppercase tracking-[0.2em] text-xs text-on-surface-variant hover:text-on-surface p-3 rounded-lg hover:bg-black/[0.04]"
                  >
                    {t('contact')}
                  </Link>

                  <div className="flex items-center justify-between border-t border-black/[0.08] pt-4 mt-2">
                    <LanguageSelector openUp alignLeft />
                    <Link
                      href={`/${locale}/contacte`}
                      onClick={() => setOpen(false)}
                      className="font-sans uppercase tracking-[0.2em] text-[10px] text-white bg-primary-container rounded-full px-6 py-2.5 shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                    >
                      {t('cta')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
