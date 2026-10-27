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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  const radius = isMobile ? 110 : 155;
  const logoSize = isMobile ? 44 : 52;
  const padding = isMobile ? 16 : 24;
  const centerX = padding + logoSize / 2;
  const centerY = padding + logoSize / 2;

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 z-[100] transition-all duration-300 select-none",
        isExpanded ? "w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]" : "w-20 h-20 sm:w-28 sm:h-28"
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
            "relative z-30 w-11 h-11 sm:w-13 sm:h-13 glass flex items-center justify-center rounded-full border shadow-xl cursor-pointer backdrop-blur-xl transition-all duration-300",
            isExpanded 
              ? "border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.35)] bg-[#050508]/90 light:bg-white/95" 
              : "border-white/10 light:border-black/10 hover:border-[#F59E0B]/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          )}
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          aria-label="Navigation Menu"
        >
          <BALogo size={22} className={isExpanded ? "scale-90" : "scale-100 transition-transform"} />
        </motion.div>

        {/* SVG Laser Rays connecting center of Logo to center of each Icon */}
        <AnimatePresence>
          {isExpanded && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="navRayActive" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="navRayInactive" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.05" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Orbital Arc */}
              <motion.path
                d={`M ${centerX + radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX} ${centerY + radius}`}
                fill="none"
                stroke="rgba(245, 158, 11, 0.2)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />

              {/* Connecting Lines for Each Nav Item */}
              {NAV_ITEMS.map((item, i) => {
                const totalItems = NAV_ITEMS.length;
                const angleDeg = (i / (totalItems - 1)) * 90;
                const angleRad = (angleDeg * Math.PI) / 180;

                const targetX = centerX + radius * Math.cos(angleRad);
                const targetY = centerY + radius * Math.sin(angleRad);

                const isActive = activeSection === item.id;
                const isHovered = hoveredItem === item.id;

                return (
                  <g key={`ray-${item.id}`}>
                    {/* The Laser Ray Line */}
                    <motion.line
                      x1={centerX}
                      y1={centerY}
                      x2={targetX}
                      y2={targetY}
                      stroke={isActive || isHovered ? "url(#navRayActive)" : "url(#navRayInactive)"}
                      strokeWidth={isActive || isHovered ? 2 : 1}
                      strokeDasharray={isActive || isHovered ? "none" : "3 3"}
                      filter={isActive || isHovered ? "url(#glow)" : undefined}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.28, 
                        delay: i * 0.03,
                        ease: "easeOut" 
                      }}
                    />

                    {/* Active Pulsing Ring at Target Icon Center */}
                    {isActive && (
                      <motion.circle
                        cx={targetX}
                        cy={targetY}
                        r={isMobile ? 19 : 22}
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="1.5"
                        initial={{ scale: 0.8, opacity: 0.9 }}
                        animate={{ scale: [1, 1.25, 1], opacity: [0.9, 0.2, 0.9] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          )}
        </AnimatePresence>

        {/* Radial Animated Icon Navigation Nodes */}
        <AnimatePresence>
          {isExpanded && NAV_ITEMS.map((item, i) => {
            const totalItems = NAV_ITEMS.length;
            const angleDeg = (i / (totalItems - 1)) * 90;
            const angleRad = (angleDeg * Math.PI) / 180;

            const x = radius * Math.cos(angleRad);
            const y = radius * Math.sin(angleRad);

            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                style={{
                  left: centerX,
                  top: centerY,
                }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 280, 
                  damping: 22, 
                  delay: i * 0.035 
                }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto"
              >
                {/* Animated Circular Icon Button */}
                <div className="relative">
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
                      "relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full glass border shadow-lg backdrop-blur-md cursor-pointer transition-all duration-200",
                      isActive 
                        ? "border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.5)] bg-[#F59E0B]/20 text-[#F59E0B] light:bg-[#F59E0B]/25 light:text-[#D97706]" 
                        : "border-white/12 light:border-black/10 text-[#94A3B8] light:text-[#475569] hover:text-white light:hover:text-[#0F172A] hover:border-[#F59E0B]/60 hover:bg-[#F59E0B]/10 light:bg-white/90"
                    )}
                  >
                    <Icon size={16} className={cn("transition-transform duration-200", isActive && "scale-110")} />
                  </motion.button>

                  {/* Floating Tooltip positioned on the outer side */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -6 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 pointer-events-none z-50"
                      >
                        <span className="px-2.5 py-1 rounded-md bg-[#050508]/95 light:bg-white text-[#F59E0B] light:text-[#D97706] border border-[#F59E0B]/40 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap shadow-[0_4px_15px_rgba(0,0,0,0.7)] light:shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
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
