import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import profilePic from '@/assets/Profile_pic.png';
import { soundFx } from '@/lib/sound';
import { Volume2, VolumeX } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

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

  const handleClick = (id: string) => {
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleSound = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <nav
      className={cn(
        'fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full max-w-[94vw] sm:max-w-max',
        scrolled ? 'glass-strong shadow-2xl shadow-[#F59E0B]/10 border border-[#F59E0B]/30' : 'glass border border-white/10'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1 overflow-x-auto hide-scrollbar scroll-smooth">
        {/* Profile Avatar & Name */}
        <div className="flex items-center gap-1.5 px-2 sm:px-3 mr-0.5 sm:mr-1 border-r border-[#F59E0B]/20 shrink-0">
          <img src={profilePic} alt="Balamurugan C" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-[#F59E0B]/50 shadow-md" />
          <span className="text-[11px] sm:text-xs font-extrabold text-white hidden sm:inline tracking-wider font-mono">BALAMURUGAN C</span>
        </div>

        {/* Nav Items */}
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={cn(
              'px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 shrink-0 font-mono tracking-wide',
              activeSection === id
                ? 'text-white bg-[#F59E0B]/25 border border-[#F59E0B]/40 shadow-lg shadow-[#F59E0B]/20'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            )}
            aria-current={activeSection === id ? 'page' : undefined}
          >
            {label}
          </button>
        ))}

        {/* Mute / Unmute Button */}
        <div className="pl-1 ml-0.5 sm:ml-1 border-l border-[#F59E0B]/20 shrink-0 flex items-center">
          <button
            onClick={toggleSound}
            className="p-1 sm:p-1.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX size={14} className="text-rose-400" /> : <Volume2 size={14} className="text-[#F59E0B]" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
