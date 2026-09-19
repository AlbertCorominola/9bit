import { Quote } from 'lucide-react';

interface Props {
  name: string;
  company: string;
  quote: string;
  /** Iniciales del avatar; si no llegan se derivan del nombre. */
  initials?: string;
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export default function TestimonialCard({ name, company, quote, initials }: Props) {
  return (
    <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.08] bg-surface-container-low p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-primary-container/25 hover:shadow-[0_30px_60px_-32px_rgba(13,17,23,0.35)] md:p-8">
      {/* Filete superior que se dibuja al pasar por encima. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary-container via-primary-container/40 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      <Quote
        aria-hidden
        size={44}
        strokeWidth={1.25}
        className="mb-5 -scale-x-100 text-primary-container/20 transition-colors duration-500 group-hover:text-primary-container/35"
      />

      <blockquote className="flex-1 text-[17px] leading-[1.65] tracking-tight text-on-surface">
        {quote}
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-3.5 border-t border-black/[0.07] pt-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-container to-primary text-[13px] font-bold tracking-tight text-white">
          {initials || initialsOf(name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold tracking-tight text-on-surface">
            {name}
          </span>
          <span className="block truncate text-xs text-on-surface-variant">{company}</span>
        </span>
      </figcaption>
    </figure>
  );
}
