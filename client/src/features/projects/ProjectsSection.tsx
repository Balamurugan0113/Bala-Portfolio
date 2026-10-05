import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ExternalLink, Pause, Play, FolderOpen } from 'lucide-react';
import { PROJECTS, type Project } from '@/types';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';
import Card3DTilt from '@/components/ui/Card3DTilt';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectVisual from './ProjectVisual';
import ProjectModal from './ProjectModal';
import TechIcon from '@/components/ui/TechIcon';

const CATEGORIES = ['All', 'Cybersecurity', 'AI & Machine Learning', 'Computer Vision', 'IoT & Web'];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);

  // Keep refs in sync with hover state (rAF loop reads refs, avoids per-frame re-renders)
  useEffect(() => {
    pausedRef.current = isHovered;
  }, [isHovered]);

  // Filter projects by category
  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Cybersecurity') return p.tags.some((t) => /cyber|network|security|pentest/i.test(t));
    if (activeCategory === 'AI & Machine Learning') return p.tags.some((t) => /machine learning|nlp|fastapi|transformers/i.test(t));
    if (activeCategory === 'Computer Vision') return p.tags.some((t) => /computer vision|opencv|mediapipe|deep learning/i.test(t));
    if (activeCategory === 'IoT & Web') return p.tags.some((t) => /iot|mqtt|react|discord|full-stack|canvas/i.test(t));
    return true;
  });

  // Duplicate list for a seamless loop
  const displayProjects = [...filteredProjects, ...filteredProjects];

  // Reset rotor when the filter changes
  useEffect(() => {
    posRef.current = 0;
    if (containerRef.current) containerRef.current.scrollLeft = 0;
  }, [activeCategory]);

  // Continuous rotation — direct DOM writes, paused on hover / out of view / hidden tab
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onVisibility = () => (pausedRef.current = isHovered || document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting; },
      { rootMargin: '60px' }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    let raf = 0;
    const step = () => {
      const el = containerRef.current;
      if (el && !pausedRef.current && inViewRef.current && !document.hidden && el.scrollWidth > el.clientWidth) {
        const max = el.scrollWidth / 2;
        posRef.current += 0.65;
        if (posRef.current >= max) posRef.current = 0;
        el.scrollLeft = posRef.current;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, [isHovered]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    soundFx.playClick();
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.min(380, el.clientWidth * 0.8);
    posRef.current = Math.max(0, posRef.current + (direction === 'left' ? -amount : amount));
    el.scrollTo({ left: posRef.current, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="relative bg-[#050508] section-py px-[clamp(1.25rem,4vw,3rem)] overflow-hidden" aria-label="Projects showcase">
      <div className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[400px] bg-[#F97316]/[0.035] blur-[130px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          index="03"
          label="PROJECTS"
          title="Featured Projects & Systems"
          subtitle="Hover the rotating deck to pause. Open any system to inspect its full engineering case study — architecture, security, performance, and source code."
        />

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                soundFx.playClick();
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300',
                activeCategory === cat
                  ? 'bg-gradient-to-b from-[#FBBF24] to-[#EA580C] text-[#1A1006] font-bold shadow-[0_6px_24px_-8px_rgba(245,158,11,0.6)] scale-[1.04]'
                  : 'glass text-[#94A3B8] hover:text-white hover:border-[#F59E0B]/40'
              )}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rotor control bar */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]" aria-live="polite">
            <span className={cn('w-2 h-2 rounded-full', isHovered ? 'bg-amber-400 animate-ping' : 'bg-[#10B981] animate-pulse')} />
            <span className="font-mono2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] hidden sm:inline">
              {isHovered ? 'ROTOR PAUSED — MOUSE HOVER' : 'ROTOR ROTATING AUTOMATICALLY'}
            </span>
            <span className="font-mono2 text-[10px] uppercase sm:hidden">{isHovered ? 'PAUSED' : 'ROTATING'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleManualScroll('left')}
              className="p-2 rounded-xl glass hover:border-[#F59E0B]/50 hover:text-[#F59E0B] text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Scroll projects left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => { soundFx.playClick(); setIsHovered((v) => !v); }}
              className="px-3 py-1.5 rounded-xl glass hover:border-[#F59E0B]/50 text-xs font-mono2 text-[#FBBF24] flex items-center gap-1.5 transition-colors"
              aria-pressed={isHovered}
            >
              {isHovered ? <Play size={13} /> : <Pause size={13} />}
              {isHovered ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-2 rounded-xl glass hover:border-[#F59E0B]/50 text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Scroll projects right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Rotating showcase track */}
        <div
          className="relative py-4 overflow-hidden rounded-3xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 sm:w-20 bg-gradient-to-r from-[#050508] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 sm:w-20 bg-gradient-to-l from-[#050508] to-transparent z-20" />

          <div
            ref={containerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto hide-scrollbar py-4 px-4"
            style={{ cursor: isHovered ? 'pointer' : 'grab' }}
          >
            {displayProjects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="w-[300px] sm:w-[360px] shrink-0 select-none"
              >
                <Card3DTilt
                  maxTilt={8}
                  scaleOnHover={1.025}
                  onClick={() => {
                    soundFx.playModalOpen();
                    setSelectedProject(project);
                  }}
                  className="border-beam glass-card h-full border border-[#F59E0B]/14 group"
                  ariaLabel={`Open case study: ${project.title}`}
                >
                  {/* visual */}
                  <div className="relative h-36 sm:h-40 overflow-hidden">
                    <ProjectVisual project={project} className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md border border-[#F59E0B]/40 flex items-center justify-center text-[#FBBF24] font-bold text-xs font-mono2 shadow-lg">
                      {String((idx % filteredProjects.length) + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute top-3 right-3 text-[10px] font-semibold text-[#10B981] bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#10B981]/30">
                      {project.impact}
                    </div>
                  </div>

                  {/* body */}
                  <div className="p-5 flex flex-col">
                    <h3 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-[#FBBF24] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/[0.06]">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 text-[9px] px-2 py-1 rounded-md bg-white/[0.04] text-[#94A3B8] border border-white/[0.07] group-hover:border-[#F59E0B]/25 group-hover:text-slate-300 transition-colors"
                          >
                            <TechIcon name={tag} size="xs" className="w-4! h-4! rounded-md!" />
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[9px] px-2 py-1 rounded-md text-[#94A3B8] border border-white/[0.07] font-mono2">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="flex items-center gap-1.5 text-[#FBBF24] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          <FolderOpen size={14} /> Inspect Case Study
                          <ChevronRight size={14} />
                        </span>
                        <ExternalLink size={14} className="text-[#94A3B8]/40 group-hover:text-[#F59E0B] group-hover:rotate-12 transition-all" />
                      </div>
                    </div>
                  </div>
                </Card3DTilt>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
