import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = 'primary', children, ...rest }, ref) => {
    const base = 'font-mono uppercase tracking-[0.15em] text-xs px-8 py-4 rounded-full transition-all active:scale-95';
    const variants: Record<Variant, string> = {
      primary:
        'bg-primary-container text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] hover:shadow-[0_0_25px_rgba(0,102,255,0.6)] hover:bg-primary-container/90',
      secondary:
        'border border-on-surface/20 text-on-surface bg-transparent backdrop-blur-md hover:border-primary-container hover:text-primary-container hover:bg-primary-container/5',
    };
    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
