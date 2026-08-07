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
      setScrolled(window.scrollY > 50);

      let current = 'hero';
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) current = id;
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
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-2xl max-w-[95vw]',
        scrolled ? 'glass-strong shadow-lg shadow-[rgba(79,140,255,0.08)] border border-[rgba(79,140,255,0.15)]' : 'bg-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-1 px-2 py-1.5 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 px-3 mr-1 border-r border-[rgba(79,140,255,0.12)] shrink-0">
          <img src={profilePic} alt="Balamurugan C" className="w-7 h-7 rounded-full object-cover border border-[#4F8CFF]/40 shadow-sm" />
          <span className="text-xs font-bold text-white hidden sm:inline tracking-wider">BALAMURUGAN C</span>
        </div>

        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={cn(
              'px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0',
              activeSection === id
                ? 'text-white bg-[#4F8CFF]/20 border border-[#4F8CFF]/30 shadow-sm'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            )}
            aria-current={activeSection === id ? 'page' : undefined}
          >
            {label}
          </button>
        ))}

        <div className="pl-1 border-l border-[rgba(79,140,255,0.12)] shrink-0 flex items-center">
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX size={15} className="text-rose-400" /> : <Volume2 size={15} className="text-[#4F8CFF]" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
