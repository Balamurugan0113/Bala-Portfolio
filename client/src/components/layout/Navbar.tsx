import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import profilePic from '@/assets/Profile_pic.png';
import { soundFx } from '@/lib/sound';
import { Volume2, VolumeX, Menu, X, FileText, Github, Linkedin, Youtube, Instagram } from 'lucide-react';
import { PERSONAL_INFO } from '@/types';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    // Hide when scrolling down past the hero, reveal on any upward scroll
    if (menuOpen) return;
    setHidden(y > prev && y > window.innerHeight * 0.6);
  });

  useEffect(() => {
    const handleScroll = () => {
      let current = 'hero';
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) current = id;
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll + Esc handling while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleClick = useCallback((id: string) => {
    soundFx.playClick();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleSound = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1, visibility: hidden ? 'hidden' : 'visible' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none"
      >
        <nav
          className={cn(
            'pointer-events-auto flex items-center gap-1 rounded-full pl-1.5 pr-1.5 py-1.5 max-w-full transition-all duration-500',
            scrolled
              ? 'glass-strong border-[#F59E0B]/25 shadow-[0_16px_50px_rgba(0,0,0,0.5),0_0_40px_-18px_rgba(245,158,11,0.35)]'
              : 'glass border-white/10'
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <button
            onClick={() => handleClick('hero')}
            className="flex items-center gap-2 pl-1 pr-2.5 sm:pr-3 sm:pl-1.5 py-1 rounded-full hover:bg-white/5 transition-colors shrink-0"
            aria-label="Back to top — Balamurugan C"
          >
            <span className="relative">
              <img
                src={profilePic}
                alt="Balamurugan C"
                className="w-7 h-7 rounded-full object-cover border border-[#F59E0B]/50 shadow-[0_0_14px_rgba(245,158,11,0.35)]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#0A0A12] animate-pulse" aria-hidden="true" />
            </span>
            <span className="hidden sm:inline text-[11px] font-extrabold text-white tracking-[0.14em] font-mono2">
              BALAMURUGAN<span className="text-[#F59E0B]">.C</span>
            </span>
          </button>

          <span className="w-px h-5 bg-gradient-to-b from-transparent via-[#F59E0B]/40 to-transparent shrink-0" aria-hidden="true" />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className={cn(
                    'relative px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors duration-200 font-mono2 tracking-wide',
                    isActive ? 'text-[#FFFBEB]' : 'text-[#94A3B8] hover:text-white'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/45 shadow-[0_0_18px_-4px_rgba(245,158,11,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          <span className="hidden md:block w-px h-5 bg-gradient-to-b from-transparent via-[#F59E0B]/40 to-transparent shrink-0" aria-hidden="true" />

          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX size={15} className="text-rose-400" /> : <Volume2 size={15} className="text-[#F59E0B]" />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => { soundFx.playClick(); setMenuOpen((v) => !v); }}
            className="md:hidden p-2 rounded-full text-[#F59E0B] hover:bg-[#F59E0B]/10 transition-colors shrink-0"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div
              className="absolute inset-0 bg-[#050508]/85 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="absolute inset-x-4 top-20 rounded-3xl glass-strong overflow-hidden"
              initial={{ opacity: 0, y: -18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-3">
                {NAV_ITEMS.map(({ id, label }, i) => {
                  const isActive = activeSection === id;
                  return (
                    <motion.button
                      key={id}
                      onClick={() => handleClick(id)}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-left transition-colors',
                        isActive ? 'bg-[#F59E0B]/15 text-white' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                      )}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono2 text-[10px] text-[#F59E0B]">0{i + 1}</span>
                        <span className="text-sm font-bold tracking-wide">{label}</span>
                      </span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.8)]" />}
                    </motion.button>
                  );
                })}
              </div>

              <div className="border-t border-[#F59E0B]/15 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-[#94A3B8] hover:text-[#F59E0B] hover:border-[#F59E0B]/40 transition-colors"
                      aria-label={label}
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setMenuOpen(false);
                    window.open(PERSONAL_INFO.resumeUrl, '_blank');
                  }}
                  className="flex items-center gap-1.5 px-4 h-9 rounded-xl bg-gradient-to-b from-[#FBBF24] to-[#EA580C] text-[#1A1006] text-xs font-bold active:scale-95 transition-transform"
                >
                  <FileText size={14} /> Resume
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
