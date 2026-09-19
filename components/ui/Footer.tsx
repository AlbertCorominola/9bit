import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const EMAIL = 'hola@9-bit.com';
const PHONE_LABEL = '+34 637 400 350';
const PHONE_HREF = '+34637400350';

const SERVICE_KEYS = ['web', 'voice', 'chatbots', 'automation'] as const;

const COLUMN_TITLE =
  'font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/55';
const COLUMN_LINK =
  'text-sm text-on-surface-variant transition-colors hover:text-primary-text';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/serveis`, label: t('nav.services') },
    { href: `/${locale}/qui-som`, label: t('nav.about') },
    { href: `/${locale}/clients`, label: t('nav.clients') },
    { href: `/${locale}/contacte`, label: t('nav.contact') },
  ];

  const legalLinks = [
    { href: `/${locale}/legal`, label: t('footer.terms') },
    { href: `/${locale}/privacitat`, label: t('footer.privacy') },
    { href: `/${locale}/cookies`, label: t('footer.cookies') },
  ];

  return (
    <footer className="mt-auto w-full border-t border-black/[0.07] bg-surface-container text-on-surface-variant">
      <div className="mx-auto max-w-container-max px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-4 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Image
              src="/logo_9bit_sin_fondo.png"
              alt="9bit"
              width={100}
              height={40}
              className="h-9 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-surface-variant">
              {t('footer.tagline')}
            </p>
            <Link
              href={`/${locale}/contacte`}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-primary-text transition-colors hover:text-primary"
            >
              {t('footer.cta')}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Navegación */}
          <nav>
            <p className={COLUMN_TITLE}>{t('footer.nav_label')}</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={COLUMN_LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <nav>
            <p className={COLUMN_TITLE}>{t('footer.services_label')}</p>
            <ul className="mt-5 space-y-3">
              {SERVICE_KEYS.map((key) => (
                <li key={key}>
                  <Link href={`/${locale}/serveis`} className={COLUMN_LINK}>
                    {t(`services.items.${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <p className={COLUMN_TITLE}>{t('footer.contact_label')}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${EMAIL}`} className={COLUMN_LINK}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_HREF}`} className={COLUMN_LINK}>
                  {PHONE_LABEL}
                </a>
              </li>
              <li className="text-sm text-on-surface-variant/80">
                {t('contact_page.info_location_value')}
              </li>
              <li className="text-sm text-on-surface-variant/80">
                {t('contact_page.info_hours_value')}
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com/9bitinf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-on-surface-variant/70 transition-colors hover:text-primary-text"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://x.com/9bitinf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-on-surface-variant/70 transition-colors hover:text-primary-text"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com/company/9-bit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-on-surface-variant/70 transition-colors hover:text-primary-text"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-black/[0.07]" />

        <div className="flex flex-col items-center justify-between gap-4 py-7 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant/70">
            {t('footer.copyright')}
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant/70 transition-colors hover:text-primary-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
