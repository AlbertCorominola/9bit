import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/serveis`, label: t('nav.services') },
    { href: `/${locale}#about`, label: t('nav.about') },
    { href: `/${locale}#clients`, label: t('nav.clients') },
    { href: `/${locale}/contacte`, label: t('nav.contact') },
  ];

  return (
    <footer className="w-full mt-auto bg-[#0a0a0c] dark:bg-[#0a0a0c] border-t border-white/5 text-white/60">
      <div className="max-w-container-max mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12 py-12">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 lg:gap-x-5 gap-y-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-white/60 hover:text-primary-container transition-colors text-[10px] font-semibold uppercase tracking-wide"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Image
              src="/logo_9bit_sin_fondo.png"
              alt="9bit"
              width={100}
              height={40}
              className="h-10 w-auto"
              style={{ filter: 'drop-shadow(rgba(0,102,255,0.4) 0px 0px 15px)' }}
            />
          </div>

          <div className="flex items-center justify-center md:justify-end gap-6 text-white/50">
            <a href="https://instagram.com/9bitinf" aria-label="Instagram" className="hover:text-primary-container transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://x.com/9bitinf" aria-label="X" className="hover:text-primary-container transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com/company/9-bit" aria-label="LinkedIn" className="hover:text-primary-container transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="w-full h-px bg-primary-container/10" />

        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/40 text-[10px] tracking-widest uppercase font-mono">
            {t('footer.copyright')}
          </div>
          <div className="flex gap-6 text-[10px] text-white/40 tracking-widest uppercase font-mono">
            <Link className="hover:text-primary-container transition-colors" href={`/${locale}/legal`}>{t('footer.terms')}</Link>
            <Link className="hover:text-primary-container transition-colors" href={`/${locale}/privacitat`}>{t('footer.privacy')}</Link>
            <Link className="hover:text-primary-container transition-colors" href={`/${locale}/cookies`}>{t('footer.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
