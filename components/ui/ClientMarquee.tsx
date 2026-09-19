import LogoMarquee, { type MarqueeLogo } from '@/components/ui/LogoMarquee';

const CLIENTS: MarqueeLogo[] = [
  {
    src: '/clients/logo_met_black.png',
    source: 'on-light',
    alt: 'MultiEsports Ter',
    gradient: { from: '#66B2FF', via: '#0080FF', to: '#0052A3' },
  },
  {
    src: '/clients/logo_masterrats.jpg',
    source: 'light-on-dark',
    alt: 'Mas Terrats',
    gradient: { from: '#E8C39E', via: '#C99A6B', to: '#8A6440' },
  },
  {
    src: '/clients/logo_epicentre.png',
    alt: 'Epicentre',
    gradient: { from: '#D98CFF', via: '#A855F7', to: '#6B21A8' },
  },
  {
    src: '/clients/logo_camping_les_medes.jpg',
    source: 'on-light',
    alt: 'Camping Les Medes',
    gradient: { from: '#5EEAD4', via: '#14B8A6', to: '#0F766E' },
  },
  {
    src: '/clients/logo_fadri.webp',
    alt: 'El Fadrí — Excursions Marítimes',
    gradient: { from: '#67E8F9', via: '#06B6D4', to: '#0E7490' },
  },
  {
    src: '/clients/logo_aguilera.png',
    source: 'on-light',
    alt: 'Aguilera Consulting',
    gradient: { from: '#7C9CE0', via: '#3B62C4', to: '#1E3A8A' },
  },
  {
    src: '/clients/OOA_logo.png',
    source: 'light-on-dark',
    alt: 'Oxford Oil Additives',
    gradient: { from: '#FCD34D', via: '#F59E0B', to: '#B45309' },
  },
  {
    src: '/clients/logo_abril.jpg',
    alt: 'Abril et Nature',
    gradient: { from: '#BEF264', via: '#84CC16', to: '#4D7C0F' },
  },
  {
    src: '/clients/logo_equalink.png',
    alt: 'Equalink',
    gradient: { from: '#F9A8D4', via: '#EC4899', to: '#9D174D' },
  },
];

export default function ClientMarquee({ reverse = false }: { reverse?: boolean }) {
  return <LogoMarquee logos={CLIENTS} reverse={reverse} className="py-4" />;
}
