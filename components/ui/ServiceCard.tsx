'use client';

import { LucideIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Core/featured service — visually emphasized vs secondary ones. */
  core?: boolean;
  coreLabel?: string;
}

export default function ServiceCard({ icon: Icon, title, desc, core = false, coreLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={
        'group relative overflow-hidden rounded-2xl border p-7 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 ' +
        (core
          ? 'border-primary-container/30 bg-primary-container/[0.05] shadow-[0_24px_48px_-30px_rgba(0,102,255,0.6)] hover:border-primary-container/55'
          : 'border-black/[0.08] bg-surface-container-low hover:border-primary-container/30 hover:shadow-[0_24px_48px_-30px_rgba(13,17,23,0.4)]')
      }
    >
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, rgba(0,102,255,0.12), transparent 70%)`,
        }}
      />
      <div className="relative flex items-start justify-between">
        <div
          className={
            'w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 border ' +
            (core
              ? 'bg-primary-container/20 border-primary-container/40'
              : 'bg-primary-container/10 border-primary-container/20 group-hover:bg-primary-container/20')
          }
        >
          <Icon className="text-primary-container" size={22} />
        </div>
        {core && coreLabel && (
          <span className="rounded-full border border-primary-container/30 bg-primary-container/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-primary-text">
            {coreLabel}
          </span>
        )}
      </div>
      <div className="relative">
        <h3 className="text-on-surface text-lg font-semibold tracking-tight mb-1.5 group-hover:text-primary-container transition-colors">
          {title}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
