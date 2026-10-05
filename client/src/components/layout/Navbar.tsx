import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';
import { Volume2, VolumeX, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '@/types';
import BALogo from '@/components/branding/BALogo';
import { useBooted } from '@/app/BootContext';
import NavLink from './NavLink';
import MobileMenu, { MOBILE_NAV_ITEMS } from './MobileMenu';

/**
 * Floating glass pill navbar — BA monogram brand (left) · section links with a
 * spring-animated active pill (center) · sound + resume (right) · morphing
 * hamburger + full-glass mobile menu below md.
 *
 * Never hides on scroll: it just gets more opaque, blurrier and slightly
 * smaller once the page is scrolled.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());
  const [menuOpen, setMenuOpen] = useState(false);
  const booted = useBooted();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40);
  });

  // Active-section detection (hero handled by the brand button)
  useEffect(() => {
    const handleScroll = () => {
      let current = 'hero';
      for (const { id } of MOBILE_NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback((id: string) => {
    soundFx.playClick();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleSound = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  const openResume = () => {
    soundFx.playClick();
    window.open(PERSONAL_INFO.resumeUrl, '_blank');
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={booted ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-2.5 sm:top-4 inset-x-0 z-50 flex justify-center px-3 pointer-events-none"
      >
        <motion.nav
          animate={{ scale: scrolled ? 0.965 : 1, y: scrolled ? -2 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'pointer-events-auto flex max-w-full items-center gap-1.5 rounded-full py-1.5 pl-2 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500',
            scrolled
              ? 'glass-strong border-[#F59E0B]/25 shadow-[0_16px_50px_rgba(0,0,0,0.5),0_0_40px_-18px_rgba(245,158,11,0.35)]'
              : 'glass border-white/10'
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* ---- Brand: BA monogram + wordmark → scrolls to hero ---- */}
          <button
            type="button"
            onClick={() => handleClick('hero')}
            className="group flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition-colors hover:bg-white/5"
            aria-label="Bala — back to top"
          >
            <BALogo
              size={30}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(245,158,11,0.55)]"
            />
            <span className="hidden min-[380px]:inline font-display text-[13px] font-extrabold tracking-[0.22em] text-white">
              BALA<span className="text-[#F59E0B]">.</span>
            </span>
          </button>

          <span
            className="h-5 w-px shrink-0 bg-gradient-to-b from-transparent via-[#F59E0B]/40 to-transparent"
            aria-hidden="true"
          />

          {/* ---- Desktop links (active pill glides via layoutId) ---- */}
          <div className="hidden md:flex items-center gap-0.5">
            {MOBILE_NAV_ITEMS.map(({ id, label }) => (
              <NavLink key={id} id={id} label={label} active={activeSection === id} onClick={handleClick} />
            ))}
          </div>

          <span
            className="hidden md:block h-5 w-px shrink-0 bg-gradient-to-b from-transparent via-[#F59E0B]/40 to-transparent"
            aria-hidden="true"
          />

          {/* ---- Sound toggle ---- */}
          <button
            type="button"
            onClick={toggleSound}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#94A3B8] transition-colors hover:bg-white/10 hover:text-white"
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? (
              <VolumeX size={16} className="text-rose-400" />
            ) : (
              <Volume2 size={16} className="text-[#F59E0B]" />
            )}
          </button>

          {/* ---- Compact resume CTA (desktop) ---- */}
          <button
            type="button"
            onClick={openResume}
            className="hidden md:flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-b from-[#FBBF24] to-[#EA580C] px-4 font-mono2 text-[11px] font-bold text-[#1A1006] shadow-[0_6px_20px_-6px_rgba(245,158,11,0.5)] transition-transform hover:scale-[1.04] active:scale-95"
          >
            <FileText size={13} /> Resume
          </button>

          {/* ---- Morphing hamburger (mobile) ---- */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setMenuOpen((v) => !v);
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#F59E0B] transition-colors hover:bg-[#F59E0B]/10"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="relative block h-[16px] w-5" aria-hidden="true">
              <span
                className={cn(
                  'absolute left-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out',
                  menuOpen ? 'top-[7px] rotate-45' : 'top-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out',
                  menuOpen ? 'top-[7px] -rotate-45' : 'top-[14px] w-4'
                )}
              />
            </span>
          </button>
        </motion.nav>
      </motion.header>

      {/* ---- Mobile menu (AnimatePresence for smooth open/close) ---- */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu activeSection={activeSection} onNavigate={handleClick} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
