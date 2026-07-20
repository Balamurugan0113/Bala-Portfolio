import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Github, ShieldCheck, Folder, FileCode, Copy, Database, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROJECTS, METHODOLOGY_STEPS, type Project } from '@/types';
import { PROJECT_FILES } from '@shared/projectFiles';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
        className="relative w-full max-w-5xl glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85dvh]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="flex items-center justify-between border-b border-[rgba(79,140,255,0.08)] px-[clamp(1rem,3vw,1.5rem)] py-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#4F8CFF]/60 uppercase">
              SYSTEM &gt; {project.id.replace(/-/g, ' ').toUpperCase()}
            </span>
            <h3 className="text-sm font-semibold text-white mt-0.5">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Close project modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {files && files.length > 0 && (
          <div className="flex border-b border-[rgba(79,140,255,0.08)] px-[clamp(1rem,3vw,1.5rem)]">
            <button
              onClick={() => setActiveTab('report')}
              className={cn(
                'py-3 px-4 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors',
                activeTab === 'report' ? 'border-[#4F8CFF] text-[#4F8CFF]' : 'border-transparent text-[#94A3B8] hover:text-white'
              )}
            >
              Project Report
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={cn(
                'py-3 px-4 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors',
                activeTab === 'code' ? 'border-[#4F8CFF] text-[#4F8CFF]' : 'border-transparent text-[#94A3B8] hover:text-white'
              )}
            >
              Code Inspector
            </button>
          </div>
        )}

        <div className="p-[clamp(1rem,3vw,1.5rem)] overflow-y-auto flex-1">
          {activeTab === 'code' ? (
            <div className="flex flex-col md:flex-row border border-[rgba(79,140,255,0.08)] rounded-xl overflow-hidden bg-[#050816] h-[50vh] min-h-[300px]">
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[rgba(79,140,255,0.08)] p-4 overflow-y-auto">
                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Folder className="h-3.5 w-3.5" /> workspace
                </div>
                <div className="space-y-1">
                  {files?.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFileIndex(idx)}
                      className={cn(
                        'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left',
                        idx === activeFileIndex
                          ? 'bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20'
                          : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                      )}
                    >
                      {file.name.endsWith('.py') && <FileCode className="h-3.5 w-3.5 text-yellow-500" />}
                      {file.name.endsWith('.sql') && <Database className="h-3.5 w-3.5 text-blue-400" />}
                      {file.name.endsWith('.md') && <FileText className="h-3.5 w-3.5 text-emerald-400" />}
                      {!file.name.endsWith('.py') && !file.name.endsWith('.sql') && !file.name.endsWith('.md') && <FileCode className="h-3.5 w-3.5 text-[#94A3B8]" />}
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col bg-[#050816] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-[#0A0F1E] border-b border-[rgba(79,140,255,0.08)]">
                  <div className="text-xs text-white font-mono px-3 py-1.5 rounded-t-lg border-t border-x border-[rgba(79,140,255,0.08)]">
                    {files?.[activeFileIndex]?.name}
                  </div>
                  <button
                    onClick={() => handleCopyCode(files?.[activeFileIndex]?.content || '')}
                    className="h-7 text-[10px] gap-1 px-2 text-[#94A3B8] hover:text-white border border-[rgba(79,140,255,0.08)] rounded-lg flex items-center"
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                </div>
                <div className="flex-1 p-4 font-mono text-xs overflow-auto text-slate-300 leading-relaxed bg-[#050816]">
                  {files?.[activeFileIndex]?.content.split('\n').map((line, lIdx) => (
                    <div key={lIdx} className="flex hover:bg-white/[0.02]">
                      <span className="text-right pr-4 text-slate-700 select-none w-8 border-r border-[rgba(79,140,255,0.04)] text-[10px] font-sans shrink-0">
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
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-[rgba(79,140,255,0.08)] text-[#4F8CFF] font-medium">{tag}</span>
                  ))}
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{project.description}</p>
              </div>
              {details && (
                <>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" /> Problem Statement
                    </h4>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{details.problem}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Architecture', value: details.architecture },
                      { label: 'Security', value: details.security },
                      { label: 'Deployment', value: details.deployment },
                      { label: 'Scalability', value: details.scalability },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#050816] border border-[rgba(79,140,255,0.06)] rounded-xl p-4">
                        <h5 className="text-xs font-semibold text-[#4F8CFF] mb-2">{item.label}</h5>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[rgba(79,140,255,0.08)] pt-4 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#94A3B8]">Verification Metric:</span>
                    <span className="inline-flex items-center gap-1.5 text-[#10B981]">
                      <ShieldCheck className="h-4 w-4" /> {project.impact}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-[rgba(79,140,255,0.08)] px-[clamp(1rem,3vw,1.5rem)] py-4 flex justify-end gap-2">
          {project.links.github && (
            <Button variant="outline" size="sm" onClick={() => window.open(project.links.github, '_blank')}>
              <Github size={14} /> Source
            </Button>
          )}
          <Button onClick={onClose} variant="outline" size="sm" className="border-[#4F8CFF]/30 text-[#4F8CFF]">Close</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Projects showcase">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4F8CFF]">Projects</p>
          <h2 className="heading-lg gradient-primary mt-2">Featured Work</h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            Production-grade systems built with enterprise architecture, security-first design, and AI-driven intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              onClick={() => setSelectedProject(project)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 flex items-center justify-center shrink-0">
                    <span className="text-[#4F8CFF] font-bold text-sm">{i + 1}</span>
                  </div>
                  <ChevronRight size={16} className="text-[#4F8CFF] opacity-0 group-hover:opacity-100 transition-opacity -rotate-45" />
                </div>
                <h3 className="heading-sm text-white mb-2">{project.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-[rgba(79,140,255,0.06)] text-[#94A3B8]">{tag}</span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 text-[#94A3B8]">+{project.tags.length - 3}</span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[rgba(79,140,255,0.06)]">
                  <span className="text-[10px] font-medium text-[#4F8CFF]">View Details</span>
                  <span className="text-[10px] text-[#10B981]">{project.impact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="max-w-5xl mx-auto mt-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4F8CFF]">Methodology</p>
          <h3 className="heading-lg gradient-primary mt-2">Methodology Flow</h3>
          <p className="text-body max-w-2xl mx-auto mt-4">
            Structured engineering practices implemented on every model and pipeline development cycle.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODOLOGY_STEPS.map((step) => (
            <motion.div
              key={step.step}
              className="glass-card rounded-2xl p-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
              }}
            >
              <div className="text-4xl font-extrabold text-[rgba(79,140,255,0.1)] font-mono mb-3">{step.step}</div>
              <h4 className="text-sm font-bold text-white uppercase mb-2">{step.title}</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
