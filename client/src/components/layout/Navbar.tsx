import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Cpu, FolderKanban, Briefcase, Mail } from 'lucide-react';
import BALogo from '@/components/ui/BALogo';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let current = 'hero';
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220) current = id;
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
    setIsExpanded(false);
    setHoveredItem(null);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Radial radius tuned for comfortable spacing between circular icon nodes
  const radiusDesktop = 145;
  const radiusMobile = 105;

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 z-[100] transition-all duration-300",
        isExpanded ? "w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]" : "w-20 h-20 sm:w-28 sm:h-28"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setHoveredItem(null);
      }}
    >
      <div className="relative w-full h-full p-4 sm:p-6">
        {/* Core Interactive Logo Button */}
        <motion.div
          onClick={() => {
            soundFx.playClick();
            setIsExpanded((prev) => !prev);
          }}
          className={cn(
            "relative z-20 w-11 h-11 sm:w-13 sm:h-13 glass flex items-center justify-center rounded-full border shadow-xl cursor-pointer backdrop-blur-xl transition-colors duration-300",
            isExpanded 
              ? "border-[#F59E0B]/60 shadow-[0_0_20px_rgba(245,158,11,0.25)] bg-[#050508]/85" 
              : "border-white/10 hover:border-[#F59E0B]/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          )}
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          aria-label="Navigation Menu"
        >
          <BALogo size={22} className={isExpanded ? "scale-90" : "scale-100 transition-transform"} />
        </motion.div>

        {/* Radial Animated Icon Navigation Nodes */}
        <AnimatePresence>
          {isExpanded && NAV_ITEMS.map((item, i) => {
            const totalItems = NAV_ITEMS.length;
            // Angle mapping from right (0 deg) to bottom (90 deg)
            const angleDeg = (i / (totalItems - 1)) * 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            const r = isMobile ? radiusMobile : radiusDesktop;
            
            const x = r * Math.cos(angleRad);
            const y = r * Math.sin(angleRad);
            
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 280, 
                  damping: 22, 
                  delay: i * 0.04 
                }}
                className="absolute top-0 left-0 z-10 w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center pointer-events-none"
              >
                {/* Connecting Laser Ray */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-[#F59E0B]/40 to-transparent origin-left -z-10 hidden sm:block pointer-events-none"
                  style={{ width: `${r}px`, rotate: `${angleDeg}deg`, x: '-50%', y: '-50%' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ delay: 0.05 }}
                />
                
                {/* Animated Circular Icon Button */}
                <div className="relative pointer-events-auto">
                  <motion.button
                    whileHover={{ 
                      scale: 1.18, 
                      rotate: [0, -6, 6, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(item.id);
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    aria-label={item.label}
                    className={cn(
                      "relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full glass border shadow-lg backdrop-blur-md cursor-pointer transition-colors duration-200",
                      isActive 
                        ? "border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.4)] bg-[#F59E0B]/20 text-[#F59E0B]" 
                        : "border-white/12 text-[#94A3B8] hover:text-white hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10"
                    )}
                  >
                    <Icon size={16} className={cn("transition-transform duration-200", isActive && "scale-110")} />
                    
                    {isActive && (
                      <motion.div 
                        layoutId="activeIconRing"
                        className="absolute inset-0 rounded-full border border-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.5)] -z-10"
                      />
                    )}
                  </motion.button>

                  {/* Floating Tooltip positioned on the outer-right side to prevent overlap */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -6 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 pointer-events-none z-50"
                      >
                        <span className="px-2.5 py-1 rounded-md bg-[#050508]/95 text-[#F59E0B] border border-[#F59E0B]/40 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
                          {item.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
