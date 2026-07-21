import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Scene3D from '@/components/three/Scene';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Typewriter } from './Typewriter';
import heroImg from '@/assets/balamurugan.png';

const TITLES = [
  'AI & Security Engineer',
  'Machine Learning Architect',
  'Penetration Testing Specialist',
  'Full-Stack Developer',
  'Open Source Contributor',
  'Research Scholar',
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
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (!mounted) return null;

  return (
    <section id="hero" className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      <Scene3D />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-[clamp(1.25rem,4vw,3rem)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        variants={reduced ? undefined : containerVariants}
        initial={reduced ? undefined : 'hidden'}
        animate={reduced ? undefined : 'visible'}
      >
        <div className="text-center lg:text-left">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            variants={itemVariants}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span className="text-xs font-medium text-[#94A3B8]">{PERSONAL_INFO.availability}</span>
          </motion.div>

          <motion.h1
            className="heading-xl gradient-primary mb-4"
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
            className="text-body max-w-2xl mb-10"
            variants={itemVariants}
          >
            {PERSONAL_INFO.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 mb-8 sm:mb-16 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <Button size="lg" onClick={scrollToProjects}>
              <ExternalLink size={16} />
              View Projects
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open(PERSONAL_INFO.resumeUrl, '_blank')}>
              <FileText size={16} />
              Resume
            </Button>
            <Button variant="ghost" size="lg" onClick={() => window.open(SOCIAL_LINKS[0].url, '_blank')} aria-label="GitHub">
              <Github size={16} />
              GitHub
            </Button>
          </motion.div>
        </div>

        <motion.div className="flex justify-center lg:justify-end" variants={itemVariants}>
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl border border-[rgba(79,140,255,0.08)] bg-[rgba(10,15,30,0.55)] overflow-hidden shadow-xl">
            <img src={heroImg} alt={PERSONAL_INFO.name} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,22,0.6)] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 glass-strong p-3 rounded-xl text-center">
              <div className="font-semibold text-sm text-white">{PERSONAL_INFO.name}</div>
              <div className="text-[10px] text-[#94A3B8] font-semibold tracking-wider uppercase mt-0.5">B.Tech Student</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#94A3B8] hover:text-white transition-colors"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
}
