'use client';

import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  code: string;
  title: string;
  desc: string;
}

export default function ServiceCard({ icon: Icon, code, title, desc }: Props) {
  return (
    <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-primary-container/40 hover:bg-white/[0.04] hover:translate-y-[-2px] transition-all duration-200 p-7 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center">
          <Icon className="text-primary-container" size={22} />
        </div>
        <span className="font-mono text-[10px] text-on-surface-variant/70 border border-white/[0.08] px-2 py-0.5 rounded tracking-widest">
          {code}
        </span>
      </div>
      <div>
        <h3 className="text-on-surface text-lg font-semibold tracking-tight mb-1.5 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
