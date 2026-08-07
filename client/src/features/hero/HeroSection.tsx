import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Github, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Scene3D from '@/components/three/Scene';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Typewriter } from './Typewriter';
import heroImg from '@/assets/balamurugan.png';
import Card3DTilt from '@/components/ui/Card3DTilt';
import { soundFx } from '@/lib/sound';

const TITLES = [
  'AI & Data Science Scholar',
  'Penetration Testing & Security Specialist',
  'Machine Learning Pipeline Architect',
  'Full-Stack Systems Developer',
  'Open Source Contributor',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function HeroSection() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

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
    <section id="hero" className="relative min-h-dvh flex items-center justify-center overflow-hidden pt-20 pb-12">
      <Scene3D />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-[clamp(1.25rem,4vw,3rem)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        variants={reduced ? undefined : containerVariants}
        initial={reduced ? undefined : 'hidden'}
        animate={reduced ? undefined : 'visible'}
      >
        <div className="text-center lg:text-left">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-[rgba(79,140,255,0.15)] shadow-lg shadow-[#4F8CFF]/5"
            variants={itemVariants}
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-semibold text-[#94A3B8]">{PERSONAL_INFO.availability}</span>
            <span className="text-[10px] text-[#4F8CFF] font-mono px-2 py-0.5 rounded bg-[#4F8CFF]/15 ml-2">4th Year Scholar</span>
          </motion.div>

          <motion.h1
            className="heading-xl gradient-primary mb-4 tracking-tight"
            variants={itemVariants}
          >
            {PERSONAL_INFO.name}
          </motion.h1>

          <motion.div className="h-12 mb-6" variants={itemVariants}>
            <p className="text-xl sm:text-2xl md:text-3xl text-[#94A3B8] font-light">
              <Typewriter texts={TITLES} />
            </p>
          </motion.div>

          <motion.p
            className="text-body max-w-2xl mb-10 text-sm leading-relaxed"
            variants={itemVariants}
          >
            {PERSONAL_INFO.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 mb-8 sm:mb-16 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <Button size="lg" onClick={scrollToProjects} className="bg-[#4F8CFF] hover:bg-[#3B7BE8] shadow-lg shadow-[#4F8CFF]/25">
              <ExternalLink size={16} />
              View Projects Showcase
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
        </div>

        <motion.div className="flex justify-center lg:justify-end" variants={itemVariants}>
          <Card3DTilt maxTilt={12} scaleOnHover={1.04} className="w-64 h-80 sm:w-72 sm:h-96 rounded-3xl border border-[rgba(79,140,255,0.2)] bg-[rgba(10,15,30,0.6)] shadow-2xl shadow-[#4F8CFF]/10 p-2">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img src={heroImg} alt={PERSONAL_INFO.name} className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 glass-strong p-3.5 rounded-2xl text-center border border-[rgba(79,140,255,0.15)] shadow-xl">
                <div className="font-bold text-sm text-white flex items-center justify-center gap-1.5">
                  {PERSONAL_INFO.name} <ShieldCheck size={14} className="text-[#10B981]" />
                </div>
                <div className="text-[10px] text-[#4F8CFF] font-mono font-semibold tracking-wider uppercase mt-0.5">
                  AI & Data Science Engineer
                </div>
              </div>
            </div>
          </Card3DTilt>
        </motion.div>
      </motion.div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#94A3B8] hover:text-white transition-colors p-2"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} className="animate-bounce text-[#4F8CFF]" />
      </button>
    </section>
  );
}
