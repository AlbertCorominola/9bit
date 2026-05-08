import { User } from 'lucide-react';

interface Props {
  name: string;
  company: string;
  quote: string;
}

export default function TestimonialCard({ name, company, quote }: Props) {
  return (
    <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-primary-container/40 hover:bg-white/[0.04] transition-all duration-200 p-7 flex flex-col">
      <p className="text-on-surface text-base leading-relaxed mb-8 flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container/15 border border-primary-container/30 flex items-center justify-center shrink-0">
          <User className="text-primary-container" size={16} />
        </div>
        <div>
          <div className="text-on-surface text-sm font-semibold">{name}</div>
          <div className="text-on-surface-variant text-xs">{company}</div>
        </div>
      </div>
    </div>
  );
}
