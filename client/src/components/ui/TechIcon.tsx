import { useMemo } from 'react';
import { matchTech, type TechDef } from './techGlyphs';
import { cn } from '@/lib/utils';

interface TechIconProps {
  /** Free-form tech/skill name — fuzzy-matched to the registry */
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  title?: string;
}

const SIZES = {
  xs: { box: 'w-7 h-7 rounded-lg', glyph: 13 },
  sm: { box: 'w-9 h-9 rounded-xl', glyph: 17 },
  md: { box: 'w-12 h-12 rounded-2xl', glyph: 24 },
  lg: { box: 'w-16 h-16 rounded-2xl', glyph: 32 },
} as const;

/**
 * 3D-styled technology icon chip: brand-tinted glass material with specular
 * highlight, inner shadow and subtle hover tilt (CSS-only, GPU friendly).
 */
export default function TechIcon({ name, size = 'md', className, title }: TechIconProps) {
  const def: TechDef = useMemo(() => matchTech(name), [name]);
  const s = SIZES[size];
  const Glyph = def.glyph;

  return (
    <span
      className={cn('tech-chip shrink-0', s.box, className)}
      style={{ '--tech-rgb': def.color } as React.CSSProperties}
      title={title ?? def.label}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <Glyph size={s.glyph} className="tech-glyph" />
    </span>
  );
}

/** Tech chip with an inline label — used in skill lists / floating cards */
export function TechChip({
  name,
  label,
  size = 'sm',
  className,
}: {
  name: string;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const def: TechDef = useMemo(() => matchTech(name), [name]);
  return (
    <span
      className={cn('inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-1.5', className)}
      style={{ borderColor: `rgba(${def.color}, 0.25)` }}
    >
      <TechIcon name={name} size={size} />
      <span className="text-[11px] font-semibold text-slate-200 leading-none">{label ?? def.label}</span>
    </span>
  );
}
