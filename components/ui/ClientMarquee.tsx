const CLIENTS = [
  'Abril et Nature',
  'Aguilera Consulting',
  'Mas Terrats',
  'Excursions Marítimes El Fadrí',
  'Restaurant Arest Estanyol',
  'Oxford Oil Additives',
  'Econocom',
  'Perruqueria Lídia Duch',
  'MultiEsports Ter',
];

export default function ClientMarquee() {
  const list = [...CLIENTS, ...CLIENTS];
  return (
    <div className="overflow-hidden py-6 border-y border-outline-variant/20 group">
      <div className="flex gap-12 animate-marquee whitespace-nowrap text-on-surface-variant/60 font-bold text-xl group-hover:[animation-play-state:paused] will-change-transform" style={{ backfaceVisibility: 'hidden', perspective: 1000 }}>
        {list.map((c, i) => (
          <span key={`${i}-${c}`} className="shrink-0 flex-none">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
