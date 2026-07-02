import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { locales, type Locale } from '@/i18n';
import { Providers } from '@/components/providers';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import PortraitLock from '@/components/ui/PortraitLock';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ContactPopup from '@/components/ui/ContactPopup';
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

const SEO: Record<string, { title: string; description: string }> = {
  ca: {
    title: '9bit · Infraestructura amb IA per a empreses',
    description:
      'Webs, agents telefònics IA, chatbots i automatitzacions. T\'ajudem a captar més clients, retenir-los i reduir la càrrega de feina. Girona, des del 2001.',
  },
  es: {
    title: '9bit · Infraestructura con IA para empresas',
    description:
      'Webs, agentes telefónicos IA, chatbots y automatizaciones. Capta más clientes, retenlos y reduce tu carga de trabajo. Girona, desde 2001.',
  },
  en: {
    title: '9bit · AI infrastructure for businesses',
    description:
      'Websites, AI phone agents, chatbots and automations. Win more clients, retain them and cut your workload. Girona, since 2001.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const seo = SEO[params.locale] ?? SEO.ca;
  return {
    metadataBase: new URL('https://9-bit.com'),
    title: {
      default: seo.title,
      template: '%s · 9bit',
    },
    description: seo.description,
    keywords: [
      'desarrollo web',
      'agentes telefónicos IA',
      'chatbots IA',
      'automatización',
      'infraestructura IA',
      'inteligencia artificial',
      'Girona',
      '9bit',
    ],
    authors: [{ name: '9bit' }],
    icons: {
      icon: [{ url: '/favicon.png', type: 'image/png', sizes: '128x128' }],
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://9-bit.com/${params.locale}`,
      siteName: '9bit',
      locale: params.locale,
      type: 'website',
      images: [{ url: '/logo_9bit_sin_fondo.png', width: 1200, height: 630, alt: '9bit' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/logo_9bit_sin_fondo.png'],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://9-bit.com/${params.locale}`,
      languages: {
        ca: 'https://9-bit.com/ca',
        es: 'https://9-bit.com/es',
        en: 'https://9-bit.com/en',
        'x-default': 'https://9-bit.com/',
      },
    },
  };
}

// Per-request CSP nonces (see middleware.ts) require dynamic rendering:
// prerendered HTML cannot carry a nonce that changes on every request.
export const dynamic = 'force-dynamic';

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
  // Nonce generated per-request in middleware.ts; next-themes needs it for
  // the inline theme script it injects before hydration.
  const nonce = headers().get('x-nonce') ?? undefined;

  return (
    <html lang={params.locale} suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="ambient-bg flex flex-col min-h-screen overflow-x-hidden">
        <Providers nonce={nonce}>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
            <CookieBanner />
            <PortraitLock />
            <WhatsAppWidget />
            <ContactPopup />
            <SpeedInsights />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
