import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]',
          'active:scale-[0.97] select-none',
          {
            // Amber gradient primary with volumetric glow
            'bg-gradient-to-b from-[#FBBF24] via-[#F59E0B] to-[#EA580C] text-[#1A1006] font-bold':
              variant === 'primary',
            'hover:shadow-[0_8px_30px_-6px_rgba(245,158,11,0.55),0_0_60px_-12px_rgba(249,115,22,0.35)] hover:brightness-110 hover:-translate-y-0.5':
              variant === 'primary',
            'bg-transparent text-[#94A3B8] hover:text-white hover:bg-white/5': variant === 'ghost',
            'border border-[#F59E0B]/30 text-[#FBBF24] hover:border-[#F59E0B]/70 hover:bg-[#F59E0B]/10 hover:shadow-[0_0_28px_-8px_rgba(245,158,11,0.4)]':
              variant === 'outline',
            'glass text-white hover:bg-[#14141f]/90 hover:border-[#F59E0B]/40': variant === 'glass',
          },
          { 'h-8 px-3 text-xs gap-1.5': size === 'sm', 'h-10 px-5 text-sm gap-2': size === 'md', 'h-12 px-8 text-base gap-2.5': size === 'lg' },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
