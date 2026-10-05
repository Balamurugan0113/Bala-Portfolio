import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BALogo from './BALogo';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Sequence timing
    const timers = [
      setTimeout(() => setStage(1), 200), // Logo appears
      setTimeout(() => setStage(2), 600), // Ring + Text appears
      setTimeout(() => setStage(3), 1200), // Progress effect
      setTimeout(() => {
        setStage(4); // Exit stage
        setTimeout(onComplete, 600); // Trigger complete after exit animation
      }, 2000)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508]"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Orbital Ring */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: stage >= 2 ? 1 : 0.5, 
                opacity: stage >= 2 ? 1 : 0,
                rotate: 360 
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut" },
                opacity: { duration: 0.8 },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
              className="absolute w-32 h-32 rounded-full border border-dashed border-[#F59E0B]/30"
            />
            
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ 
                scale: stage >= 1 ? 1 : 0.8, 
                opacity: stage >= 1 ? 1 : 0,
                filter: stage >= 1 ? 'blur(0px)' : 'blur(10px)',
                y: stage >= 3 ? -8 : 0
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <BALogo size={64} className={stage >= 2 ? "transition-all duration-1000 drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]" : "transition-all duration-1000"} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: stage >= 2 ? 1 : 0, 
              y: stage >= 2 ? 0 : 10,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col items-center"
          >
            <h1 className="text-[15px] sm:text-lg font-bold tracking-[0.25em] font-['Syne'] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFBEB] to-[#F59E0B]">
              BALA PORTFOLIO
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 2 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2.5 text-[10px] sm:text-xs tracking-widest text-[#94A3B8] font-mono uppercase"
            >
              AI & Data Science Engineer
            </motion.p>
          </motion.div>

          {/* Loading Progress Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: stage >= 3 ? 140 : 0,
              opacity: stage >= 3 ? 1 : 0
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="mt-8 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B]/80 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
