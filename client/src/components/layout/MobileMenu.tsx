import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Github, Instagram, Linkedin, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PERSONAL_INFO } from '@/types';
import { soundFx } from '@/lib/sound';

export const MOBILE_NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const SOCIALS = [
  { icon: Github, href: PERSONAL_INFO.githubUrl, label: 'GitHub' },
  { icon: Linkedin, href: PERSONAL_INFO.linkedinUrl, label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@Balsplayzz2005', label: 'YouTube' },
  { icon: Instagram, href: 'https://www.instagram.com/balaa.xx', label: 'Instagram' },
];

interface MobileMenuProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
}

/**
 * Full-glass floating mobile menu. Owns its a11y/UX contract while open:
 * body scroll lock, Escape to close, backdrop click to close, sequential
 * item entrance and ≥44px touch targets throughout.
 *
 * Rendered inside an AnimatePresence by the Navbar.
 */
export default function MobileMenu({ activeSection, onNavigate, onClose }: MobileMenuProps) {
  // Scroll lock + Esc while open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-40 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* backdrop */}
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-[#050508]/85 backdrop-blur-2xl"
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={-1}
      />
      {/* floating glass panel */}
      <motion.nav
        className="glass-strong absolute inset-x-4 top-[84px] overflow-hidden rounded-3xl border-[#F59E0B]/20 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.97 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="p-3">
          {MOBILE_NAV_ITEMS.map(({ id, label }, i) => (
            <motion.button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={cn(
                'flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left transition-colors',
                activeSection === id
                  ? 'bg-[#F59E0B]/15 text-white'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              )}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.04 + i * 0.05, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              <span className="flex items-center gap-3.5">
                <span className="font-mono2 text-[10px] text-[#F59E0B]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm font-bold tracking-wide">{label}</span>
              </span>
              {activeSection === id && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
              )}
            </motion.button>
          ))}
        </div>

        {/* footer: socials + resume */}
        <div className="flex items-center justify-between gap-3 border-t border-[#F59E0B]/15 p-4">
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#94A3B8] transition-colors hover:border-[#F59E0B]/40 hover:text-[#F59E0B]"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
              window.open(PERSONAL_INFO.resumeUrl, '_blank');
            }}
            className="flex h-11 flex-shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#FBBF24] to-[#EA580C] px-4 text-xs font-bold text-[#1A1006] transition-transform active:scale-95"
          >
            <FileText size={14} /> Resume
          </button>
        </div>
      </motion.nav>
    </motion.div>
  );
}
