import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

interface BALogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function BALogo({ size = 40, className, ...props }: BALogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]", className)}
      {...props}
    >
      <circle cx="50" cy="50" r="40" fill="url(#logoGlow)" />
      <path
        d="M 25 75 L 25 25 L 45 25 C 55 25 55 45 45 45 C 58 45 58 75 40 75 Z"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="8"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      <path
        d="M 55 75 L 65 25 L 75 75 M 58 55 L 72 55"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="8"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      <defs>
        <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldGradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFBEB" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#78350F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
