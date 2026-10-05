import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import creatorImg from '@/assets/standing_creator.png';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] min-h-[100svh] w-full flex flex-col items-center justify-between sm:justify-center overflow-hidden bg-[#050508] pt-14 pb-6 sm:py-0"
    >
      {/* Z-INDEX 1: CYBER MATRIX BACKGROUND & GLOW */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]" />
        {/* CENTER LIGHTING GLOWS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] sm:w-[60vw] h-[55vh] sm:h-[60vh] bg-gradient-to-tr from-[#F59E0B]/10 to-[#F97316]/8 blur-[100px] sm:blur-[120px] rounded-full" />
      </div>

      <motion.div 
        style={{ opacity: heroOpacity, y: textY }}
        className="relative w-full max-w-7xl mx-auto h-full flex flex-col items-center justify-between sm:justify-center flex-1 z-10"
      >
        {/* TOP LABEL (Z-INDEX 4) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-[4] inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full glass border border-[#F59E0B]/30 mb-1 sm:mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
        >
          <Sparkles size={12} className="text-[#F59E0B] shrink-0" />
          <span className="text-[9px] sm:text-xs font-bold text-[#F59E0B] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-mono">
            AI & Data Science Engineer
          </span>
        </motion.div>

        {/* CENTRAL COMPOSITION WITH NAME AND CREATOR PHOTO */}
        <div className="relative flex flex-col items-center justify-center w-full h-[52vh] sm:h-[66vh]">
          
          {/* Z-INDEX 2: BALAMURUGAN C (RESTORED TO ORIGINAL DOWNWARD DESKTOP POSITION WHILE CLEAN ON MOBILE) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="absolute inset-0 z-[2] flex flex-col items-center justify-start pt-1 sm:pt-[15vh] pointer-events-none w-full px-2 sm:px-6 overflow-visible"
          >
            <h1 
              className="w-full text-center font-black uppercase font-['Syne'] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-[#FFFBEB]/40 via-[#F59E0B]/30 to-[#92400E]/20 filter drop-shadow-[0_10px_30px_rgba(245,158,11,0.1)] whitespace-nowrap"
              style={{
                fontSize: 'clamp(1.1rem, 5.2vw, 4.4rem)',
                letterSpacing: 'clamp(0.5px, 0.2vw, 3px)'
              }}
            >
              BALAMURUGAN C
            </h1>
          </motion.div>

          {/* Z-INDEX 3: REAL CREATOR IMAGE (STATIC, CRISP, GROUNDED) */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-0 top-auto md:top-0 h-[84%] sm:h-full md:h-full z-[3] flex items-end justify-center pointer-events-none"
          >
            {/* Subtle soft ambient warm rim glow */}
            <div className="absolute inset-0 z-[4] pointer-events-none bg-radial from-[#F59E0B]/10 via-transparent to-transparent rounded-full filter blur-xl sm:blur-2xl" />

            <img
              src={creatorImg}
              alt="Balamurugan C - AI & Data Science Engineer"
              className="h-full w-auto max-w-none object-contain object-bottom filter contrast-[1.1] saturate-[1.05] drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] select-none pointer-events-none"
            />
            
            {/* Grounding fade at bottom of image */}
            <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[#050508] to-transparent z-[5]" />
          </motion.div>

        </div>

        {/* BOTTOM CONTENT (Z-INDEX 4) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative z-[4] flex flex-col items-center text-center mt-1 sm:mt-2 px-4"
        >
          {/* SUBTITLE */}
          <h2 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] text-white/80 font-mono mb-2 sm:mb-3 uppercase flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1">
            <span>AI</span> <span className="text-[#F59E0B]">•</span>
            <span>Data</span> <span className="text-[#F59E0B]">•</span>
            <span>Security</span> <span className="text-[#F59E0B]">•</span>
            <span>Engineering</span>
          </h2>

          <p className="text-xs sm:text-base text-[#94A3B8] max-w-sm sm:max-w-lg leading-relaxed font-medium">
            Specializing in Ethical Hacking, Machine Learning,
            <span className="block">and robust data-driven applications.</span>
          </p>
        </motion.div>

      </motion.div>

      {/* SECTION DIVIDER */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-28 bg-gradient-to-b from-transparent to-[#050508] z-30" />
    </section>
  );
}
