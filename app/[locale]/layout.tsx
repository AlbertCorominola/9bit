import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { locales, type Locale } from '@/i18n';
import { Providers } from '@/components/providers';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import PortraitLock from '@/components/ui/PortraitLock';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '9bit',
  description:
    'Partner tecnològic per a empreses. Desenvolupament web, software a mida, suport IT i consultoria des del 2001 a Girona.',
  icons: {
    icon: '/logo_9bit.webp',
    shortcut: '/logo_9bit.webp',
    apple: '/logo_9bit_sin_fondo.png',
  },
  openGraph: {
    title: '9bit — Building Information Technologies',
    description: 'Partner tecnològic per a empreses que volen escalar i optimitzar els seus processos.',
    url: 'https://9-bit.com',
    siteName: '9bit',
    type: 'website',
  },
  alternates: {
    languages: {
      ca: '/ca',
      es: '/es',
      en: '/en',
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(params.locale as Locale)) notFound();
  setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <html lang={params.locale} suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="ambient-bg flex flex-col min-h-screen">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
            <CookieBanner />
            <PortraitLock />
            <WhatsAppWidget />
            <SpeedInsights />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
