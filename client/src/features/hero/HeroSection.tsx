import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Sparkles, Shield, Brain, Code, Database, Server, Layers, Cpu, Terminal, Trophy, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO } from '@/types';
import creatorImg from '@/assets/standing_creator.png';
import { soundFx } from '@/lib/sound';

const RISING_TECH_LOGOS = [
  { name: 'Python 3.11', category: 'Core Language', icon: Code, color: '#F59E0B', left: '4%', duration: 13, delay: 0 },
  { name: 'PyTorch ML', category: 'Deep Learning', icon: Brain, color: '#F97316', left: '80%', duration: 15, delay: 2 },
  { name: 'Ethical Hacking', category: 'NIDS Security', icon: Shield, color: '#EAB308', left: '14%', duration: 11, delay: 4 },
  { name: 'FastAPI', category: 'REST Backend', icon: Server, color: '#10B981', left: '70%', duration: 14, delay: 1 },
  { name: 'PostgreSQL', category: 'Database', icon: Database, color: '#06B6D4', left: '24%', duration: 16, delay: 6 },
  { name: 'React.js', category: 'Web App', icon: Layers, color: '#3B82F6', left: '88%', duration: 12, delay: 3 },
  { name: 'OpenCV', category: 'Computer Vision', icon: Cpu, color: '#A855F7', left: '34%', duration: 14, delay: 5 },
  { name: 'Pen Testing', category: 'Security Audits', icon: Terminal, color: '#EF4444', left: '60%', duration: 13, delay: 7 },
  { name: 'SIH Finalist', category: 'Hackathon', icon: Trophy, color: '#F59E0B', left: '10%', duration: 15, delay: 8 },
  { name: 'Handball', category: 'Sports Leader', icon: Gamepad2, color: '#10B981', left: '84%', duration: 11, delay: 9 },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll transform
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -30]);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-[#050508] pt-16 pb-12 sm:pt-12 sm:pb-0"
    >
      {/* 1. LIGHTWEIGHT CYBER MATRIX DOT GRID */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:40px_40px] opacity-10 z-0" />

      {/* 2. OPTIMIZED ROTATING HUD CYBER RINGS */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] sm:w-[680px] sm:h-[680px] rounded-full border border-dashed border-[#F59E0B]/20 animate-[spin_45s_linear_infinite] z-0" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full border border-dotted border-[#F97316]/20 animate-[spin_30s_linear_infinite_reverse] z-0" />

      {/* 3. LIGHTWEIGHT AMBER & GOLD GLOW ORBS */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#F59E0B]/12 blur-[80px] rounded-full z-0" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#F97316]/10 blur-[80px] rounded-full z-0" />

      {/* 4. TECH STACK & RESUME LOGOS FLOATING FROM BOTTOM TO TOP BEHIND PORTRAIT PHOTO */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="hidden md:block pointer-events-none absolute inset-0 z-5 overflow-hidden"
      >
        {RISING_TECH_LOGOS.map((tech) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{
                y: '-20vh',
                opacity: [0, 0.95, 0.95, 0],
              }}
              transition={{
                duration: tech.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: tech.delay,
              }}
              style={{ left: tech.left }}
              className="absolute pointer-events-auto z-20"
            >
              <div className="glass-strong px-3.5 py-2.5 rounded-2xl border border-white/15 shadow-2xl flex items-center gap-2.5 backdrop-blur-md hover:scale-110 hover:border-[#F59E0B]/50 transition-transform duration-200 ease-out cursor-pointer">
                <div
                  style={{ backgroundColor: `${tech.color}20`, borderColor: `${tech.color}40`, color: tech.color }}
                  className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0"
                >
                  <Icon size={16} />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold text-white font-mono uppercase tracking-wider">{tech.name}</div>
                  <div className="text-[9px] text-[#94A3B8] font-medium leading-none">{tech.category}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* MOBILE RESPONSIVE LANDING HEADER */}
      <motion.div
        style={{ opacity: heroOpacity, y: textY }}
        className="sm:hidden relative z-20 text-center px-4 flex flex-col items-center justify-center my-auto w-full max-w-full overflow-hidden"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass mb-4 border border-[rgba(245,158,11,0.35)] shadow-lg shadow-[#F59E0B]/15">
          <Sparkles size={12} className="text-[#F59E0B]" />
          <span className="text-[10px] font-bold text-white tracking-wider uppercase font-mono">B.Tech AI & Data Science</span>
        </div>

        <h1 className="text-[clamp(1.15rem,6.2vw,2.2rem)] font-extrabold uppercase font-['Syne'] tracking-tight whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-[#FFFBEB] via-[#F59E0B] to-[#78350F] filter drop-shadow-xl mb-3 leading-none w-full text-center px-1">
          BALAMURUGAN C
        </h1>

        <p className="text-[11px] sm:text-xs text-[#94A3B8] max-w-xs leading-relaxed mb-6 font-medium px-2">
          Specializing in Ethical Hacking, Machine Learning pipelines, and robust data-driven applications.
        </p>

        {/* Mobile Tech Stack Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-xs">
          {['Ethical Hacking', 'PyTorch ML', 'FastAPI', 'PostgreSQL'].map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-lg glass border border-[#F59E0B]/30 text-[#F59E0B] font-mono">
              {tag}
            </span>
          ))}
        </div>

        <Button
          size="lg"
          onClick={() => {
            soundFx.playClick();
            window.open(PERSONAL_INFO.resumeUrl, '_blank');
          }}
          className="glass-strong bg-[#F59E0B]/15 hover:bg-[#F59E0B]/25 text-white font-bold border border-[#F59E0B]/40 rounded-2xl px-6 py-5 flex items-center gap-2 shadow-xl shadow-[#F59E0B]/20"
        >
          <FileText size={18} className="text-[#F59E0B]" />
          <span>View Resume</span>
        </Button>
      </motion.div>

      {/* DESKTOP & TABLET LANDING: GOLD WATERMARK "BA" (LEFT) AND "LA" (RIGHT) PERFECTLY SYMMETRIC */}
      <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="w-full flex items-center justify-between px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-7xl mx-auto"
        >
          <span className="font-['Syne'] font-black text-[clamp(4rem,15vw,18rem)] uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFFBEB] via-[#F59E0B] to-[#78350F] opacity-45 filter drop-shadow-[0_20px_50px_rgba(245,158,11,0.4)] shrink-0 flex items-center justify-center">
            BA
          </span>
          <span className="font-['Syne'] font-black text-[clamp(4rem,15vw,18rem)] uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFFBEB] via-[#F59E0B] to-[#78350F] opacity-45 filter drop-shadow-[0_20px_50px_rgba(245,158,11,0.4)] shrink-0 flex items-center justify-center">
            LA
          </span>
        </motion.div>
      </div>

      {/* DESKTOP & TABLET CENTER PORTRAIT: SITS IN FRONT OF FLOATING BACKGROUND LOGOS */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="hidden sm:flex absolute bottom-0 left-1/2 -translate-x-1/2 z-20 items-end justify-center pointer-events-none"
      >
        <div className="relative h-[55vh] sm:h-[65vh] md:h-[72vh] max-h-[600px] w-auto flex items-end justify-center overflow-hidden">
          <img
            src={creatorImg}
            alt="Balamurugan C Ultra-HD Portrait"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
            className="h-full w-auto object-contain object-bottom filter contrast-[1.08] saturate-[1.06] brightness-[1.03] drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
          />
          {/* Bottom Grounding Fade */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* DESKTOP GLASSMORPHISM RESUME BUTTON */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="hidden sm:block absolute bottom-6 right-6 sm:right-10 z-30"
      >
        <Button
          size="lg"
          onClick={() => {
            soundFx.playClick();
            window.open(PERSONAL_INFO.resumeUrl, '_blank');
          }}
          className="glass-strong backdrop-blur-xl bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 text-white font-bold shadow-2xl shadow-[#F59E0B]/20 rounded-2xl px-6 py-6 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all duration-300 group"
        >
          <FileText size={18} className="text-[#F59E0B] group-hover:scale-110 transition-transform" />
          <span className="tracking-wide">Resume</span>
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse ml-1" />
        </Button>
      </motion.div>

      {/* SMOOTH FADED GRADIENT DIVIDER TO ABOUT SECTION */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-[#050508]/80 to-[#050508] z-20" />
    </section>
  );
}
