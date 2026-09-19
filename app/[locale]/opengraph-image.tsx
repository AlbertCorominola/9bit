import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '9bit — Infraestructura con IA para empresas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TAGLINES: Record<string, string> = {
  ca: 'Infraestructura amb IA per a empreses',
  es: 'Infraestructura con IA para empresas',
  en: 'AI infrastructure for businesses',
};

const SERVICES: Record<string, string> = {
  ca: 'Webs · Agents telefònics · Chatbots · Automatització',
  es: 'Webs · Agentes telefónicos · Chatbots · Automatización',
  en: 'Websites · Phone agents · Chatbots · Automation',
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = TAGLINES[requested] ? requested : 'es';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0a0a0f',
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 15% 0%, rgba(0,102,255,0.35), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(91,33,182,0.28), transparent 60%)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 150, fontWeight: 900, letterSpacing: '-6px' }}>
          <span style={{ color: '#e2e2e2' }}>9</span>
          <span style={{ color: '#0066ff' }}>bit</span>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#e2e2e2',
            letterSpacing: '-1.5px',
            marginTop: 8,
          }}
        >
          {TAGLINES[locale]}
        </div>

        <div style={{ fontSize: 30, color: '#c2c6d8', marginTop: 28 }}>{SERVICES[locale]}</div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 48,
            fontSize: 26,
            color: '#6aa4ff',
          }}
        >
          <div style={{ width: 48, height: 3, backgroundColor: '#0066ff' }} />
          Girona · 9-bit.com
        </div>
      </div>
    ),
    size
  );
}
