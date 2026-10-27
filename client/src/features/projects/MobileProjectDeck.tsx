"use client";

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  FileCode, 
  Github, 
  ArrowUpRight, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Project } from '@/types';
import { soundFx } from '@/lib/sound';

interface MobileProjectDeckProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function MobileProjectDeck({ projects, onSelectProject }: MobileProjectDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    soundFx.playClick();
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = projects.length - 1;
      if (next >= projects.length) next = 0;
      return next;
    });
  };

  const jumpTo = (index: number) => {
    soundFx.playClick();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const project = projects[currentIndex];

  const variants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      zIndex: 2,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 28 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 1,
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 28 },
        opacity: { duration: 0.18 },
        scale: { duration: 0.18 },
      },
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  return (
    <div className="w-full flex flex-col items-center select-none px-3">
      {/* Mobile Mode Header Badge */}
      <div className="flex items-center justify-between w-full max-w-sm mb-3 px-1 text-[10px] text-[#94A3B8] font-mono">
        <span className="flex items-center gap-1.5 text-[#F59E0B] font-bold">
          <Smartphone size={12} /> Touch Swipe Deck
        </span>
        <span className="text-[#94A3B8] font-bold">
          Swipe or tap arrows
        </span>
      </div>

      {/* 3D Stack Container */}
      <div className="relative w-full max-w-sm h-[490px] flex items-center justify-center">
        {/* Background Depth Card 2 (Bottom Layer) */}
        <div 
          className="absolute inset-x-4 bottom-[-14px] top-6 rounded-2xl bg-[#030612]/70 border border-white/5 opacity-40 transform scale-[0.88] pointer-events-none" 
        />
        
        {/* Background Depth Card 1 (Middle Layer) */}
        <div 
          className="absolute inset-x-2 bottom-[-7px] top-3 rounded-2xl bg-[#060A1A]/80 border border-[#F59E0B]/10 opacity-60 transform scale-[0.94] pointer-events-none" 
        />

        {/* Foreground Interactive Swipeable Card */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.65}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full bg-[#080D22] border border-[#F59E0B]/30 rounded-2xl p-3.5 flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.85)] cursor-grab active:cursor-grabbing backdrop-blur-xl overflow-hidden"
          >
            {/* Subtle glow accent */}
            <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#F59E0B]/15 rounded-full blur-2xl" />

            {/* CARD TOP BAR */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 relative z-10">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] font-black text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 rounded-md">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-[#94A3B8] font-mono uppercase tracking-wider truncate max-w-[120px]">
                  {project.tagline}
                </span>
              </div>

              {project.impact && (
                <span className="inline-flex items-center gap-1 text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/25 font-mono text-[9px] font-bold">
                  <ShieldCheck size={11} /> {project.impact}
                </span>
              )}
            </div>

            {/* VISUAL IMAGE PREVIEW (COMPACT BANNER) */}
            <div 
              onClick={() => onSelectProject(project)}
              className="relative w-full h-32 rounded-xl overflow-hidden bg-[#040714] border border-white/10 flex items-center justify-center p-2 cursor-pointer my-2 group"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
                />
              ) : (
                <div className="text-[10px] text-[#94A3B8] font-mono flex items-center gap-1">
                  <Sparkles size={12} className="text-[#F59E0B]" /> Architecture Preview
                </div>
              )}

              <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-[#050508]/85 border border-white/10 text-[8px] font-mono font-bold text-[#F59E0B] uppercase">
                Tap to Inspect ↗
              </div>
            </div>

            {/* TITLE & DESCRIPTION */}
            <div className="space-y-1 relative z-10 flex-1">
              <h3 
                onClick={() => onSelectProject(project)}
                className="text-sm font-bold text-white font-['Syne'] leading-snug line-clamp-1 cursor-pointer active:text-[#F59E0B]"
              >
                {project.title}
              </h3>

              <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Problem Statement Pill */}
              {project.details?.problem && (
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-[10px] text-[#94A3B8] line-clamp-1 mt-1">
                  <span className="text-[#F59E0B] font-bold font-mono mr-1">Target:</span>
                  {project.details.problem}
                </div>
              )}
            </div>

            {/* TECH TAGS */}
            <div className="flex flex-wrap gap-1 my-1.5 relative z-10">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-[8px] font-semibold rounded bg-white/5 border border-white/10 text-[#94A3B8] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* ACTION BUTTONS (COMPACT MOBILE TOOLBAR) */}
            <div className="border-t border-white/10 pt-2 flex items-center gap-1.5 relative z-10">
              <Button
                onClick={() => onSelectProject(project)}
                className="flex-1 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#050508] font-bold text-[10px] h-8 rounded-lg flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.25)] cursor-pointer"
              >
                <FileCode size={12} />
                <span>Inspect Code</span>
              </Button>

              {project.links.demo && project.links.demo !== '#' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(project.links.demo, '_blank')}
                  className="text-[10px] h-8 px-2 border-[#F59E0B]/40 text-[#F59E0B] rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <span>Demo</span>
                  <ArrowUpRight size={11} />
                </Button>
              )}

              {project.links.github && project.links.github !== '#' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(project.links.github, '_blank')}
                  className="text-[10px] h-8 px-2 border-white/15 text-white rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Github size={11} />
                  <span>Repo</span>
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MOBILE CONTROLS & PAGINATION */}
      <div className="flex items-center justify-between w-full max-w-sm mt-4 px-1">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous project"
          className="w-8 h-8 rounded-full glass border border-white/15 text-white active:text-[#F59E0B] active:border-[#F59E0B] flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-md"
        >
          <ChevronLeft size={16} />
        </button>

        {/* DOT INDICATORS */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-4 bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next project"
          className="w-8 h-8 rounded-full glass border border-white/15 text-white active:text-[#F59E0B] active:border-[#F59E0B] flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-md"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default MobileProjectDeck;
