import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  id: string;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}

/**
 * Desktop nav link. The amber "active" pill is a shared-layout element —
 * framer-motion's layoutId makes it glide between links as the active
 * section changes.
 */
export default function NavLink({ id, label, active, onClick }: NavLinkProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={cn(
        'group relative rounded-full px-3 py-1.5 font-mono2 text-[11px] font-bold tracking-wide transition-colors duration-200',
        active ? 'text-[#FFFBEB]' : 'text-[#94A3B8] hover:text-white'
      )}
      aria-current={active ? 'page' : undefined}
    >
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full border border-[#F59E0B]/45 bg-[#F59E0B]/20 shadow-[0_0_18px_-4px_rgba(245,158,11,0.5)]"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      {/* subtle hover wash (inactive only, so it never fights the pill) */}
      {!active && (
        <span className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-200 group-hover:bg-white/[0.05]" />
      )}
      <span className="relative z-10 inline-block transition-transform duration-200 group-hover:-translate-y-px">
        {label}
      </span>
    </button>
  );
}
