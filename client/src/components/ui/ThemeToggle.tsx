import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { soundFx } from '@/lib/sound';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleClick = () => {
    soundFx.playClick();
    toggleTheme();
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100]">
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-xl border transition-all duration-300 ${
          isDark
            ? 'glass border-white/10 hover:border-[#F59E0B]/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] bg-[#050508]/70'
            : 'bg-white/80 border-[#F59E0B]/30 hover:border-[#F59E0B] shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] text-slate-800'
        }`}
      >
        {/* Ambient Ring Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 rounded-full blur-md -z-10 ${
            isDark ? 'bg-[#F59E0B]/20' : 'bg-[#F59E0B]/35'
          }`}
        />

        {/* Animated Icon Container */}
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="dark-moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="flex items-center justify-center text-[#F59E0B]"
              >
                {/* Custom Animated Crescent Moon with Star */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="filter drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.15" />
                  <circle cx="19" cy="5" r="1" fill="#FBBF24" stroke="none" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="light-sun"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="flex items-center justify-center text-[#D97706]"
              >
                {/* Custom Animated Glowing Sun with Rotating Rays */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                >
                  <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.25" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}
