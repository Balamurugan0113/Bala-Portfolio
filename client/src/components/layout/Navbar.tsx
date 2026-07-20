import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import profilePic from '@/assets/Profile_pic.png';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = 'hero';
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-2xl',
        scrolled ? 'glass-strong shadow-lg shadow-[rgba(79,140,255,0.04)]' : 'bg-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-1 px-2 py-1.5">
        <div className="flex items-center gap-2 px-3 mr-2 border-r border-[rgba(79,140,255,0.1)]">
          <img src={profilePic} alt="Balamurugan C" className="w-7 h-7 rounded-full object-cover border border-[rgba(79,140,255,0.2)]" />
          <span className="text-sm font-semibold text-white hidden sm:inline">BALAMURUGAN C</span>
        </div>
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={cn(
              'px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200',
              activeSection === id
                ? 'text-white bg-[#4F8CFF]/10'
                : 'text-[#94A3B8]/70 hover:text-white hover:bg-white/5'
            )}
            aria-current={activeSection === id ? 'page' : undefined}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
