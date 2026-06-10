import Image from 'next/image';

type Client = { name: string; src: string };

const CLIENTS: Client[] = [
  { name: 'MultiEsports Ter', src: '/clients/logo_met_black.png' },
  { name: 'Aguilera Consulting', src: '/clients/logo_aguilera.png' },
  { name: 'El Fadrí — Excursions Marítimes', src: '/clients/logo_fadri.webp' },
  { name: 'Oxford Oil Additives', src: '/clients/OOA_logo.png' },
  { name: 'Abril et Nature', src: '/clients/logo_abril.jpg' },
  { name: 'Equalink', src: '/clients/logo_equalink.png' },
];

export default function ClientMarquee({ reverse = false }: { reverse?: boolean }) {
  const list = [...CLIENTS, ...CLIENTS];
  return (
    <div className={`overflow-hidden py-6 group ${reverse ? 'border-b' : 'border-y'} border-outline-variant/20`}>
      <div
        className="flex gap-6 animate-marquee whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
        style={{ backfaceVisibility: 'hidden', perspective: 1000, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {list.map((c, i) => (
          <div
            key={`${i}-${c.name}`}
            className="shrink-0 flex-none flex items-center justify-center h-16 w-44 rounded-xl bg-white/90 px-6 py-3 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            title={c.name}
          >
            <Image
              src={c.src}
              alt={c.name}
              width={150}
              height={48}
              className="h-10 w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
