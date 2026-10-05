import { useId } from 'react';
import { cn } from '@/lib/utils';

interface BALogoProps {
  /** Rendered size in px (width & height) — crisp at any scale (pure vector). */
  size?: number;
  className?: string;
  /** Soft amber glow behind the plate (used on the loading screen). */
  glow?: boolean;
  title?: string;
}

/**
 * The BALA brand mark — geometric "BA" monogram on a dark rounded plate.
 * Single source of truth for the identity: reused by the loading screen,
 * navbar, footer; the favicon (client/public/favicon.svg) mirrors these paths.
 */
export default function BALogo({ size = 32, className, glow = false, title }: BALogoProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gold = `gold-${uid}`;
  const bg = `bg-${uid}`;
  const rim = `rim-${uid}`;
  const soft = `soft-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      className={cn('shrink-0', glow && 'drop-shadow-[0_0_28px_rgba(245,158,11,0.45)]', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <radialGradient id={bg} cx="0.5" cy="0.32" r="0.95">
          <stop offset="0" stopColor="#1A1A24" />
          <stop offset="0.6" stopColor="#0C0C13" />
          <stop offset="1" stopColor="#060609" />
        </radialGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="0.45" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id={rim} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" stopOpacity="0.5" />
          <stop offset="1" stopColor="#F59E0B" stopOpacity="0.14" />
        </linearGradient>
        <filter id={soft} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* dark rounded plate */}
      <rect width="512" height="512" rx="112" fill={`url(#${bg})`} />
      <rect x="5" y="5" width="502" height="502" rx="108" fill="none" stroke={`url(#${rim})`} strokeWidth="3" />

      {/* BA monogram */}
      <g filter={`url(#${soft})`} fill={`url(#${gold})`}>
        {/* B — stem */}
        <rect x="92" y="130" width="50" height="252" rx="25" />
        {/* B — upper bowl */}
        <path d="M120 130 h92 a60.5 60.5 0 0 1 0 121 h-92 z" />
        {/* B — lower bowl */}
        <path d="M120 251 h112 a65.5 65.5 0 0 1 0 131 h-112 z" />
        {/* B — circuit pins */}
        <rect x="66" y="146" width="46" height="20" rx="10" />
        <rect x="66" y="346" width="46" height="20" rx="10" />
        {/* A — with counter (evenodd) */}
        <path
          fillRule="evenodd"
          d="M374 130 L302 384 h40 l14 -52 h36 l14 52 h40 L374 130 z M374 210 L362 308 h24 L374 210 z"
        />
      </g>

      {/* cyan AI node */}
      <circle cx="312" cy="208" r="9" fill="#22D3EE" />
      <circle cx="312" cy="208" r="17" fill="none" stroke="#22D3EE" strokeOpacity="0.45" strokeWidth="4" />
    </svg>
  );
}
