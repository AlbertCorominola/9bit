'use client';

import { LucideIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
  icon: LucideIcon;
  code: string;
  title: string;
  desc: string;
  /** Core/featured service — visually emphasized vs secondary ones. */
  core?: boolean;
  coreLabel?: string;
}

export default function ServiceCard({ icon: Icon, code, title, desc, core = false, coreLabel }: Props) {
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
          ? 'border-primary-container/35 bg-primary-container/[0.06] shadow-[0_0_40px_-14px_rgba(0,102,255,0.5)] hover:border-primary-container/60'
          : 'border-white/[0.06] bg-white/[0.02] opacity-80 hover:opacity-100 hover:border-primary-container/40 hover:bg-white/[0.04]')
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
        {core && coreLabel ? (
          <span className="font-mono text-[9px] text-primary-container bg-primary-container/10 border border-primary-container/30 px-2 py-0.5 rounded uppercase tracking-widest">
            {coreLabel}
          </span>
        ) : (
          <span className="font-mono text-[10px] text-on-surface-variant/70 border border-white/[0.08] px-2 py-0.5 rounded tracking-widest">
            {code}
          </span>
        )}
      </div>
      <div className="relative">
        <h3 className="text-on-surface text-lg font-semibold tracking-tight mb-1.5 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
