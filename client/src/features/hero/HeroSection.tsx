import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, FileText, Github, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/types';

import { Typewriter } from './Typewriter';
import heroImg from '@/assets/balamurugan.png';
import Card3DTilt from '@/components/ui/Card3DTilt';
import { soundFx } from '@/lib/sound';

const TITLES = [
  'AI & Data Science Scholar',
  'Python with Data Science Specialist',
  'Machine Learning Pipeline Architect',
  'Full-Stack Web Developer',
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Fade out and scale down as user scrolls down into About
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 0.75], [0, -40]);

  useEffect(() => { setMounted(true); }, []);

  const scrollToAbout = useCallback(() => {
    soundFx.playClick();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToProjects = useCallback(() => {
    soundFx.playClick();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#050816]"
    >
      {/* Dynamic Ambient Glow Backdrops */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#4F8CFF]/10 blur-[140px] rounded-full z-0" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#00D9FF]/05 blur-[120px] rounded-full z-0" />

      {/* GIGANTIC BACKGROUND NAME TYPOGRAPHY */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <motion.h1
          style={{ y: textY }}
          className="text-[clamp(3.5rem,14vw,17rem)] font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent leading-none tracking-tighter text-center w-full px-2"
        >
          BALAMURUGAN C
        </motion.h1>
      </div>

      {/* MAIN HERO CONTENT - FADES OUT ON SCROLL */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 w-full max-w-5xl mx-auto px-[clamp(1.25rem,4vw,3rem)] flex flex-col items-center text-center"
      >
        {/* Availability Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-[rgba(79,140,255,0.2)] shadow-xl shadow-[#4F8CFF]/10 backdrop-blur-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wide">{PERSONAL_INFO.availability}</span>
          <span className="text-[10px] text-[#4F8CFF] font-mono px-2 py-0.5 rounded bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 ml-2">
            Final Year B.Tech AI & DS
          </span>
        </motion.div>

        {/* STANDING PROFILE IMAGE IN THE CENTER */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Card3DTilt
            maxTilt={12}
            scaleOnHover={1.05}
            className="w-56 h-72 sm:w-64 sm:h-80 rounded-3xl border-2 border-[#4F8CFF]/30 bg-[rgba(10,15,30,0.7)] shadow-2xl shadow-[#4F8CFF]/20 p-2 mx-auto"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
              <img
                src={heroImg}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 glass-strong p-2.5 rounded-xl text-center border border-[rgba(79,140,255,0.2)] shadow-lg">
                <div className="font-bold text-xs text-white flex items-center justify-center gap-1.5">
                  {PERSONAL_INFO.name} <ShieldCheck size={14} className="text-[#10B981]" />
                </div>
                <div className="text-[9px] text-[#4F8CFF] font-mono font-semibold uppercase mt-0.5">
                  AI & Data Science Engineer
                </div>
              </div>
            </div>
          </Card3DTilt>
        </motion.div>

        {/* HERO TITLE & SUBTITLE */}
        <motion.h1
          className="heading-xl gradient-primary mb-3 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        <motion.div
          className="h-10 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-[#94A3B8] font-light">
            <Typewriter texts={TITLES} />
          </p>
        </motion.div>

        <motion.p
          className="text-body max-w-2xl mb-8 text-xs sm:text-sm leading-relaxed text-[#94A3B8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        {/* CALL TO ACTION BUTTONS */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button size="lg" onClick={scrollToProjects} className="bg-[#4F8CFF] hover:bg-[#3B7BE8] shadow-lg shadow-[#4F8CFF]/25">
            <ExternalLink size={16} />
            View Rotating Projects
          </Button>
          <Button variant="outline" size="lg" onClick={() => { soundFx.playClick(); window.open(PERSONAL_INFO.resumeUrl, '_blank'); }}>
            <FileText size={16} />
            Resume
          </Button>
          <Button variant="ghost" size="lg" onClick={() => { soundFx.playClick(); window.open(SOCIAL_LINKS[0].url, '_blank'); }} aria-label="GitHub">
            <Github size={16} />
            GitHub
          </Button>
        </motion.div>
      </motion.div>

      {/* SCROLL DOWN INDICATOR */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#94A3B8] hover:text-white transition-colors p-2 z-10"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} className="animate-bounce text-[#4F8CFF]" />
      </button>
    </section>
  );
}
