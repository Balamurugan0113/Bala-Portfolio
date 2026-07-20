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
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF] active:scale-[0.97]',
          {
            'bg-[#4F8CFF] text-white hover:bg-[#3B7BE8] shadow-lg shadow-[#4F8CFF]/20 hover:shadow-[#4F8CFF]/40': variant === 'primary',
            'bg-transparent text-[#94A3B8] hover:text-white hover:bg-white/5': variant === 'ghost',
            'border border-[rgba(79,140,255,0.2)] text-white hover:border-[#4F8CFF] hover:bg-[#4F8CFF]/5': variant === 'outline',
            'glass text-white hover:bg-[rgba(10,15,30,0.8)]': variant === 'glass',
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
