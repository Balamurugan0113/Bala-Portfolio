"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Github, 
  ShieldCheck, 
  Folder, 
  FileCode, 
  Copy, 
  Database, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Orbit,
  ArrowUpRight,
  Code2,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SkewedCarousel, type SkewedCarouselItem } from '@/components/ui/SkewedCarousel';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import MobileProjectDeck from './MobileProjectDeck';
import { PROJECTS, type Project } from '@/types';
import { PROJECT_FILES } from '@shared/projectFiles';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
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
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-[#050816]/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="relative w-full max-w-4xl glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88dvh] border border-[#F59E0B]/20 pointer-events-auto"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between border-b border-[#F59E0B]/10 px-4 sm:px-6 py-3 sm:py-4 bg-[#0A0F24]/60">
          <div>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#F59E0B] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 animate-pulse text-[#F59E0B]" /> SYSTEM &gt; {project.id.replace(/-/g, ' ').toUpperCase()}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">{project.title}</h3>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        {files && files.length > 0 && (
          <div className="flex border-b border-[#F59E0B]/10 px-4 sm:px-6 bg-[#050816]/50">
            <button
              onClick={() => { setActiveTab('report'); soundFx.playClick(); }}
              className={cn('py-2.5 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer', activeTab === 'report' ? 'border-[#F59E0B] text-[#F59E0B]' : 'border-transparent text-[#94A3B8] hover:text-white')}
            >
              Report &amp; Architecture
            </button>
            <button
              onClick={() => { setActiveTab('code'); soundFx.playClick(); }}
              className={cn('py-2.5 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer', activeTab === 'code' ? 'border-[#F59E0B] text-[#F59E0B]' : 'border-transparent text-[#94A3B8] hover:text-white')}
            >
              Code ({files.length} Files)
            </button>
          </div>
        )}

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'code' && files && files.length > 0 ? (
            <div className="flex flex-col md:flex-row border border-white/10 rounded-xl overflow-hidden bg-[#050816] h-[45vh] min-h-[260px]">
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 overflow-y-auto bg-[#070C1E]/60 max-h-[120px] md:max-h-none">
                <div className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Folder className="h-3 w-3 text-[#F59E0B]" /> workspace
                </div>
                <div className="space-y-1">
                  {files.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setActiveFileIndex(idx); soundFx.playClick(); }}
                      className={cn(
                        'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all text-left cursor-pointer',
                        idx === activeFileIndex ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30' : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                      )}
                    >
                      {file.name.endsWith('.py') && <FileCode className="h-3 w-3 text-yellow-400" />}
                      {file.name.endsWith('.js') && <Code2 className="h-3 w-3 text-cyan-400" />}
                      {file.name.endsWith('.sql') && <Database className="h-3 w-3 text-blue-400" />}
                      {file.name.endsWith('.md') && <FileText className="h-3 w-3 text-emerald-400" />}
                      {!file.name.endsWith('.py') && !file.name.endsWith('.js') && !file.name.endsWith('.sql') && !file.name.endsWith('.md') && <FileCode className="h-3 w-3 text-[#94A3B8]" />}
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col bg-[#050816] overflow-hidden">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#0A0F24] border-b border-white/10">
                  <div className="text-[11px] text-white font-mono px-2.5 py-0.5 rounded-t-lg bg-[#050816] border-t border-x border-white/10">
                    {files[activeFileIndex]?.name}
                  </div>
                  <button onClick={() => handleCopyCode(files[activeFileIndex]?.content || '')} className="h-6 text-[9px] gap-1 px-2 text-[#94A3B8] hover:text-white border border-white/10 rounded-lg flex items-center hover:bg-white/5 transition-colors cursor-pointer">
                    <Copy className="h-2.5 w-2.5" /> Copy
                  </button>
                </div>
                <div className="flex-1 p-3 font-mono text-xs overflow-auto text-slate-300 leading-relaxed bg-[#030612]">
                  {files[activeFileIndex]?.content.split('\n').map((line, lIdx) => (
                    <div key={lIdx} className="flex hover:bg-white/[0.03]">
                      <span className="text-right pr-3 text-slate-600 select-none w-6 border-r border-white/5 text-[9px] font-sans shrink-0">{lIdx + 1}</span>
                      <span className="pl-3 whitespace-pre font-mono text-[10px] sm:text-[11px]">{line || ' '}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md bg-[#F59E0B]/10 text-[#F59E0B] font-medium border border-[#F59E0B]/20 font-mono">{tag}</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{project.description}</p>
              </div>
              {details && (
                <>
                  <div className="bg-[#0A0F24]/60 border border-white/10 rounded-xl p-3 sm:p-4">
                    <h4 className="text-[11px] sm:text-xs font-bold text-white uppercase mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> Problem Statement
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{details.problem}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    {[
                      { label: 'Architecture', value: details.architecture },
                      { label: 'Security Controls', value: details.security },
                      { label: 'Deployment Flow', value: details.deployment },
                      { label: 'Scalability & Optimization', value: details.scalability },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#050816] border border-white/5 rounded-xl p-3 hover:border-[#F59E0B]/30 transition-colors">
                        <h5 className="text-[10px] sm:text-xs font-semibold text-[#F59E0B] mb-1 font-mono">{item.label}</h5>
                        <p className="text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed line-clamp-4">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#94A3B8] text-[11px]">Impact:</span>
                    <span className="inline-flex items-center gap-1.5 text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/20 font-mono text-[10px]">
                      <ShieldCheck className="h-3.5 w-3.5" /> {project.impact}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-4 sm:px-6 py-3 flex justify-between items-center bg-[#070C1E]/60">
          <div className="text-[10px] text-[#94A3B8] hidden sm:block">Click outside to dismiss</div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {project.links.github && project.links.github !== '#' && (
              <Button variant="outline" size="sm" className="h-8 text-xs px-2.5" onClick={() => window.open(project.links.github, '_blank')}>
                <Github size={13} /> GitHub
              </Button>
            )}
            {project.links.demo && project.links.demo !== '#' && (
              <Button size="sm" className="h-8 text-xs px-2.5 bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 font-bold" onClick={() => window.open(project.links.demo, '_blank')}>
                <ExternalLink size={13} /> Live Demo
              </Button>
            )}
            <Button onClick={onClose} variant="outline" size="sm" className="h-8 text-xs px-2.5 border-white/20 text-white hover:bg-white/10 cursor-pointer">Close</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [desktopView, setDesktopView] = useState<'stack' | 'carousel'>('stack');
  const [mobileView, setMobileView] = useState<'deck' | 'carousel'>('deck');

  const handleProjectSelect = (project: Project) => {
    soundFx.playModalOpen();
    setSelectedProject(project);
  };

  const handleCarouselCardClick = (item: SkewedCarouselItem) => {
    const matched = PROJECTS.find((p) => p.id === item.id) || (item as unknown as Project);
    handleProjectSelect(matched);
  };

  return (
    <section id="projects" className="relative bg-[#050508] py-10 sm:py-24 overflow-visible" aria-label="Projects showcase">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[500px] bg-gradient-to-r from-[#F59E0B]/8 via-[#F97316]/6 to-transparent blur-[120px] sm:blur-[160px] rounded-full z-0" />

      {/* SECTION HEADER & VIEW MODE SELECTOR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-6 sm:mb-14 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-[#F59E0B]/30 mb-2.5 sm:mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles size={12} className="text-[#F59E0B]" />
            <span className="text-[9px] sm:text-xs font-bold text-[#F59E0B] tracking-[0.2em] uppercase font-mono">
              Engineered Portfolio Systems
            </span>
          </div>

          <h2 className="heading-lg bg-clip-text text-transparent bg-gradient-to-b from-[#FFFBEB] via-[#F59E0B] to-[#F97316]">
            FEATURED PROJECTS
          </h2>
          <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Production-grade systems in Artificial Intelligence, Machine Learning, Full-Stack Development, and Ethical Security Automation.
          </p>

          {/* DESKTOP VIEW SWITCHER (MD+) */}
          <div className="mt-6 hidden md:inline-flex items-center p-1 rounded-xl glass border border-white/10 shadow-lg">
            <button
              type="button"
              onClick={() => { soundFx.playClick(); setDesktopView('stack'); }}
              className={cn(
                "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                desktopView === 'stack'
                  ? "bg-[#F59E0B] text-[#050508] shadow-[0_0_12px_rgba(245,158,11,0.4)] font-bold"
                  : "text-[#94A3B8] hover:text-white"
              )}
            >
              <Layers size={14} />
              <span>Scroll Stack (React Bits Pro)</span>
            </button>
            <button
              type="button"
              onClick={() => { soundFx.playClick(); setDesktopView('carousel'); }}
              className={cn(
                "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                desktopView === 'carousel'
                  ? "bg-[#F59E0B] text-[#050508] shadow-[0_0_12px_rgba(245,158,11,0.4)] font-bold"
                  : "text-[#94A3B8] hover:text-white"
              )}
            >
              <Orbit size={14} />
              <span>Flow Carousel</span>
            </button>
          </div>

          {/* MOBILE VIEW SWITCHER (<MD) */}
          <div className="mt-4 inline-flex md:hidden items-center p-1 rounded-xl glass border border-white/10 shadow-md">
            <button
              type="button"
              onClick={() => { soundFx.playClick(); setMobileView('deck'); }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer",
                mobileView === 'deck'
                  ? "bg-[#F59E0B] text-[#050508] shadow-[0_0_10px_rgba(245,158,11,0.4)] font-bold"
                  : "text-[#94A3B8] hover:text-white"
              )}
            >
              <Smartphone size={13} />
              <span>Touch Deck</span>
            </button>
            <button
              type="button"
              onClick={() => { soundFx.playClick(); setMobileView('carousel'); }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer",
                mobileView === 'carousel'
                  ? "bg-[#F59E0B] text-[#050508] shadow-[0_0_10px_rgba(245,158,11,0.4)] font-bold"
                  : "text-[#94A3B8] hover:text-white"
              )}
            >
              <Orbit size={13} />
              <span>Flow Carousel</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* MOBILE EXPERIENCE (<MD) */}
      <div className="block md:hidden relative z-10 w-full">
        {mobileView === 'deck' ? (
          <MobileProjectDeck projects={PROJECTS} onSelectProject={handleProjectSelect} />
        ) : (
          <div className="relative w-full">
            <SkewedCarousel
              items={PROJECTS}
              skewAngle={-1.5}
              tiltIntensity={4}
              baseVelocity={-0.25}
              pauseOnHover={true}
              onItemClick={handleCarouselCardClick}
            />
          </div>
        )}
      </div>

      {/* DESKTOP EXPERIENCE (MD+) */}
      <div className="hidden md:block relative z-10 w-full">
        {desktopView === 'stack' ? (
          <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">
            <ScrollStack
              itemStackDistance={24}
              itemScale={0.03}
              baseScale={0.88}
              dimAmount={0.35}
              className="w-full"
            >
              {PROJECTS.map((project, idx) => (
                <ScrollStackItem
                  key={project.id}
                  itemClassName="bg-[#070C1E]/95 border border-[#F59E0B]/25 hover:border-[#F59E0B]/50 rounded-3xl p-7 lg:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all"
                >
                  <div className="flex flex-col gap-6">
                    {/* TOP CARD BAR */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs sm:text-sm font-extrabold text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/25 px-2.5 py-0.5 rounded-md">
                          {String(idx + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-[#94A3B8] font-mono tracking-wider uppercase">
                          {project.tagline}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/25 font-mono text-[11px] font-semibold">
                          <ShieldCheck size={13} /> {project.impact}
                        </span>
                      </div>
                    </div>

                    {/* MAIN BODY: 2 COLUMNS (CONTENT + PREVIEW) */}
                    <div className="grid grid-cols-12 gap-8 items-center">
                      {/* LEFT COLUMN: TITLE, DESCRIPTION, SPECS */}
                      <div className="col-span-7 flex flex-col space-y-4">
                        <h3 className="text-2xl lg:text-3xl font-black text-white font-['Syne'] tracking-tight">
                          {project.title}
                        </h3>

                        <p className="text-sm text-[#94A3B8] leading-relaxed">
                          {project.description}
                        </p>

                        {/* Problem Statement Pill */}
                        {project.details?.problem && (
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
                            <strong className="text-[#F59E0B] block text-[10px] uppercase font-mono tracking-wider mb-1">
                              Architecture Target:
                            </strong>
                            <span className="line-clamp-2 leading-relaxed text-[#94A3B8]">
                              {project.details.problem}
                            </span>
                          </div>
                        )}

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-white/5 border border-white/10 text-[#94A3B8] font-mono hover:text-[#F59E0B] hover:border-[#F59E0B]/30 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 pt-2">
                          <Button
                            onClick={() => handleProjectSelect(project)}
                            className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#050508] font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer"
                          >
                            <FileCode size={14} />
                            <span>Inspect System &amp; Code</span>
                          </Button>

                          {project.links.demo && project.links.demo !== '#' && (
                            <Button
                              variant="outline"
                              onClick={() => window.open(project.links.demo, '_blank')}
                              className="text-xs px-3.5 py-2 rounded-xl border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B]/10 flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>Live Demo</span>
                              <ArrowUpRight size={13} />
                            </Button>
                          )}

                          {project.links.github && project.links.github !== '#' && (
                            <Button
                              variant="outline"
                              onClick={() => window.open(project.links.github, '_blank')}
                              className="text-xs px-3.5 py-2 rounded-xl border-white/20 text-white hover:bg-white/10 flex items-center gap-1.5 cursor-pointer"
                            >
                              <Github size={13} />
                              <span>GitHub</span>
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* RIGHT COLUMN: INTERACTIVE VISUAL PREVIEW BANNER */}
                      <div 
                        onClick={() => handleProjectSelect(project)}
                        className="col-span-5 relative group rounded-2xl overflow-hidden border border-white/10 hover:border-[#F59E0B]/40 bg-[#040714] aspect-[16/10] flex items-center justify-center p-3 cursor-pointer transition-all duration-300 shadow-xl"
                      >
                        <div className="absolute inset-0 bg-radial from-[#F59E0B]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center p-4">
                            <Code2 size={40} className="text-[#F59E0B] mb-2" />
                            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">{project.title}</span>
                            <span className="text-[10px] text-[#94A3B8] mt-1">Click to view source architecture</span>
                          </div>
                        )}

                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg glass border border-white/15 text-[9px] font-mono font-semibold text-[#F59E0B] uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                          View Specs ↗
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        ) : (
          <div className="relative w-full">
            <SkewedCarousel
              items={PROJECTS}
              skewAngle={-1.5}
              tiltIntensity={6}
              baseVelocity={-0.28}
              pauseOnHover={true}
              onItemClick={handleCarouselCardClick}
            />
          </div>
        )}
      </div>

      {/* DETAILED PROJECT INSPECTOR & CODE MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
