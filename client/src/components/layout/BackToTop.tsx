import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { soundFx } from '@/lib/sound';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Promptly show as soon as user scrolls down 180px
      setIsVisible(window.scrollY > 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl cursor-pointer
            bg-[#050508]/85 dark:bg-[#050508]/90 light:bg-white/90 backdrop-blur-xl
            border border-[#F59E0B]/30 hover:border-[#F59E0B]
            shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_15px_rgba(245,158,11,0.2)]
            hover:shadow-[0_12px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(245,158,11,0.45)]
            transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
        >
          {/* Subtle Cyber Glow Ring on Hover */}
          <div className="absolute inset-0 rounded-2xl bg-[#F59E0B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Upward Chevron Icon */}
          <ChevronUp
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B] group-hover:-translate-y-0.5 transition-transform duration-200"
            strokeWidth={2.5}
          />

          {/* Screen Reader Label */}
          <span className="sr-only">Scroll to top of homepage</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
