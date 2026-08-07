import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Github, ShieldCheck, Folder, FileCode, Copy, Database, FileText, Pause, Play, ChevronLeft, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROJECTS, type Project } from '@/types';
import { PROJECT_FILES } from '@shared/projectFiles';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Card3DTilt from '@/components/ui/Card3DTilt';
import { soundFx } from '@/lib/sound';

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'report' | 'code'>('report');
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const files = PROJECT_FILES[project.id];
  const details = project.details;

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    toast.success('Code copied to clipboard!');
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-[clamp(0.5rem,2vw,1.5rem)] bg-[#050816]/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="relative w-full max-w-5xl glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85dvh] border border-[rgba(79,140,255,0.2)]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="flex items-center justify-between border-b border-[rgba(79,140,255,0.12)] px-[clamp(1rem,3vw,1.5rem)] py-4 bg-[rgba(10,15,30,0.6)]">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#4F8CFF] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 animate-pulse" /> SYSTEM &gt; {project.id.replace(/-/g, ' ').toUpperCase()}
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close project modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {files && files.length > 0 && (
          <div className="flex border-b border-[rgba(79,140,255,0.12)] px-[clamp(1rem,3vw,1.5rem)] bg-[#050816]/50">
            <button
              onClick={() => { setActiveTab('report'); soundFx.playClick(); }}
              className={cn(
                'py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-b-2 transition-colors',
                activeTab === 'report' ? 'border-[#4F8CFF] text-[#4F8CFF]' : 'border-transparent text-[#94A3B8] hover:text-white'
              )}
            >
              System Architecture & Report
            </button>
            <button
              onClick={() => { setActiveTab('code'); soundFx.playClick(); }}
              className={cn(
                'py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-b-2 transition-colors',
                activeTab === 'code' ? 'border-[#4F8CFF] text-[#4F8CFF]' : 'border-transparent text-[#94A3B8] hover:text-white'
              )}
            >
              Interactive Code Inspector ({files.length} Files)
            </button>
          </div>
        )}

        <div className="p-[clamp(1rem,3vw,1.5rem)] overflow-y-auto flex-1">
          {activeTab === 'code' ? (
            <div className="flex flex-col md:flex-row border border-[rgba(79,140,255,0.12)] rounded-xl overflow-hidden bg-[#050816] h-[50vh] min-h-[300px]">
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[rgba(79,140,255,0.12)] p-4 overflow-y-auto bg-[#070C1E]/60">
                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Folder className="h-3.5 w-3.5 text-[#4F8CFF]" /> workspace
                </div>
                <div className="space-y-1">
                  {files?.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setActiveFileIndex(idx); soundFx.playClick(); }}
                      className={cn(
                        'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left',
                        idx === activeFileIndex
                          ? 'bg-[#4F8CFF]/15 text-[#4F8CFF] border border-[#4F8CFF]/30 shadow-sm'
                          : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                      )}
                    >
                      {file.name.endsWith('.py') && <FileCode className="h-3.5 w-3.5 text-yellow-400" />}
                      {file.name.endsWith('.sql') && <Database className="h-3.5 w-3.5 text-blue-400" />}
                      {file.name.endsWith('.md') && <FileText className="h-3.5 w-3.5 text-emerald-400" />}
                      {!file.name.endsWith('.py') && !file.name.endsWith('.sql') && !file.name.endsWith('.md') && <FileCode className="h-3.5 w-3.5 text-[#94A3B8]" />}
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col bg-[#050816] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-[#0A0F24] border-b border-[rgba(79,140,255,0.12)]">
                  <div className="text-xs text-white font-mono px-3 py-1 rounded-t-lg bg-[#050816] border-t border-x border-[rgba(79,140,255,0.12)]">
                    {files?.[activeFileIndex]?.name}
                  </div>
                  <button
                    onClick={() => handleCopyCode(files?.[activeFileIndex]?.content || '')}
                    className="h-7 text-[10px] gap-1 px-2.5 text-[#94A3B8] hover:text-white border border-[rgba(79,140,255,0.15)] rounded-lg flex items-center hover:bg-white/5 transition-colors"
                  >
                    <Copy className="h-3 w-3" /> Copy Code
                  </button>
                </div>
                <div className="flex-1 p-4 font-mono text-xs overflow-auto text-slate-300 leading-relaxed bg-[#030612]">
                  {files?.[activeFileIndex]?.content.split('\n').map((line, lIdx) => (
                    <div key={lIdx} className="flex hover:bg-white/[0.03]">
                      <span className="text-right pr-4 text-slate-600 select-none w-8 border-r border-[rgba(79,140,255,0.06)] text-[10px] font-sans shrink-0">
                        {lIdx + 1}
                      </span>
                      <span className="pl-4 whitespace-pre font-mono text-[11px]">{line || ' '}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md bg-[rgba(79,140,255,0.1)] text-[#4F8CFF] font-medium border border-[rgba(79,140,255,0.15)]">{tag}</span>
                  ))}
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{project.description}</p>
              </div>
              {details && (
                <>
                  <div className="bg-[#0A0F24]/60 border border-[rgba(79,140,255,0.1)] rounded-xl p-4">
                    <h4 className="text-xs font-bold text-white uppercase mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4F8CFF]" /> Problem Statement
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{details.problem}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Architecture', value: details.architecture },
                      { label: 'Security Controls', value: details.security },
                      { label: 'Deployment Flow', value: details.deployment },
                      { label: 'Scalability & Optimization', value: details.scalability },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#050816] border border-[rgba(79,140,255,0.08)] rounded-xl p-4 hover:border-[#4F8CFF]/30 transition-colors">
                        <h5 className="text-xs font-semibold text-[#4F8CFF] mb-1.5">{item.label}</h5>
                        <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-4">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[rgba(79,140,255,0.1)] pt-4 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#94A3B8]">Impact Benchmark:</span>
                    <span className="inline-flex items-center gap-1.5 text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
                      <ShieldCheck className="h-4 w-4" /> {project.impact}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-[rgba(79,140,255,0.12)] px-[clamp(1rem,3vw,1.5rem)] py-4 flex justify-between items-center bg-[#070C1E]/60">
          <div className="text-xs text-[#94A3B8] hidden sm:block">Click anywhere outside or press Close to dismiss</div>
          <div className="flex items-center gap-2">
            {project.links.github && (
              <Button variant="outline" size="sm" onClick={() => window.open(project.links.github, '_blank')}>
                <Github size={14} /> Repository
              </Button>
            )}
            {project.links.demo && (
              <Button size="sm" onClick={() => window.open(project.links.demo, '_blank')}>
                <ExternalLink size={14} /> Live Demo
              </Button>
            )}
            <Button onClick={onClose} variant="outline" size="sm" className="border-[#4F8CFF]/30 text-[#4F8CFF]">Close</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const CATEGORIES = ['All', 'Cybersecurity', 'AI & Machine Learning', 'Computer Vision', 'IoT & Web'];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  // Filter projects by category
  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Cybersecurity') return p.tags.some((t) => /cyber|network|security|pentest/i.test(t));
    if (activeCategory === 'AI & Machine Learning') return p.tags.some((t) => /machine learning|nlp|fastapi|transformers/i.test(t));
    if (activeCategory === 'Computer Vision') return p.tags.some((t) => /computer vision|opencv|mediapipe|deep learning/i.test(t));
    if (activeCategory === 'IoT & Web') return p.tags.some((t) => /iot|mqtt|react|discord|full-stack|canvas/i.test(t));
    return true;
  });

  // Duplicate list to create seamless infinite loop effect
  const displayProjects = [...filteredProjects, ...filteredProjects];

  // Continuous rotation ticker
  const rotateStep = useCallback(() => {
    if (!containerRef.current) return;
    if (!isHovered) {
      setScrollPos((prev) => {
        const maxScroll = containerRef.current ? containerRef.current.scrollWidth / 2 : 1000;
        const next = prev + 0.8;
        return next >= maxScroll ? 0 : next;
      });
    }
    animRef.current = requestAnimationFrame(rotateStep);
  }, [isHovered]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(rotateStep);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [rotateStep]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollPos;
    }
  }, [scrollPos]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    soundFx.playClick();
    if (!containerRef.current) return;
    const amount = 340;
    const target = direction === 'left' ? scrollPos - amount : scrollPos + amount;
    setScrollPos(Math.max(0, target));
  };

  return (
    <section id="projects" className="relative section-py px-[clamp(1.25rem,4vw,3rem)] overflow-hidden" aria-label="Projects showcase">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#4F8CFF] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin" /> Interactive Rotating Showcase
          </p>
          <h2 className="heading-lg gradient-primary mt-2">Featured Projects & Systems</h2>
          <p className="text-body max-w-2xl mx-auto mt-3 text-sm">
            Hover mouse over the rotating deck to pause. Click any project card block to inspect source code and detailed architecture reports.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setScrollPos(0);
                  soundFx.playClick();
                }}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-[#4F8CFF] text-white shadow-lg shadow-[#4F8CFF]/25 scale-105'
                    : 'glass text-[#94A3B8] hover:text-white hover:bg-white/10'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Control Bar & Status */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <span className={cn('w-2 h-2 rounded-full', isHovered ? 'bg-amber-400 animate-ping' : 'bg-[#10B981] animate-pulse')} />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {isHovered ? 'ROTOR PAUSED (MOUSE HOVER)' : 'ROTOR ROTATING AUTOMATICALLY'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleManualScroll('left')}
              className="p-2 rounded-xl glass hover:bg-[#4F8CFF]/20 text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIsHovered(!isHovered)}
              className="px-3 py-1.5 rounded-xl glass hover:bg-[#4F8CFF]/20 text-xs font-mono text-[#4F8CFF] flex items-center gap-1.5 transition-colors"
            >
              {isHovered ? <Play size={14} /> : <Pause size={14} />}
              {isHovered ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-2 rounded-xl glass hover:bg-[#4F8CFF]/20 text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ROTATING PROJECTS SHOWCASE TRACK */}
        <div
          className="relative py-6 overflow-hidden rounded-3xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Side Fade Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050816] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050816] to-transparent z-20" />

          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth py-4 px-4"
            style={{ cursor: isHovered ? 'pointer' : 'grab' }}
          >
            {displayProjects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="w-[320px] sm:w-[380px] shrink-0 select-none"
              >
                <Card3DTilt
                  maxTilt={10}
                  scaleOnHover={1.03}
                  onClick={() => {
                    soundFx.playModalOpen();
                    setSelectedProject(project);
                  }}
                  className="h-full glass-card border border-[rgba(79,140,255,0.12)] hover:border-[#4F8CFF]/50 hover:shadow-2xl hover:shadow-[#4F8CFF]/15 transition-all duration-300"
                >
                  <div className="p-6 flex flex-col h-full min-h-[340px]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 flex items-center justify-center text-[#4F8CFF] font-bold text-sm font-mono shadow-inner">
                        0{(idx % filteredProjects.length) + 1}
                      </div>
                      <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/20">
                        {project.impact}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#4F8CFF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-[rgba(79,140,255,0.08)]">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2.5 py-0.5 rounded-md bg-[rgba(79,140,255,0.08)] text-[#94A3B8] border border-[rgba(79,140,255,0.1)]"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 text-[#94A3B8]">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs font-semibold text-[#4F8CFF]">
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Inspect Code & Report <ChevronRight size={14} />
                        </span>
                        <Folder size={14} className="opacity-60" />
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
