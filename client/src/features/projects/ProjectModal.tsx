import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  X, Github, ExternalLink, ShieldCheck, Folder, FileCode, AlertTriangle,
  Lightbulb, Lock, KeyRound, Activity, Gauge, Layers, Rocket, GitBranch,
  TrendingUp, Database, Monitor, Server, Cloud, Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types';
import { PROJECT_FILES } from '@shared/projectFiles';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';
import ProjectVisual from './ProjectVisual';
import ArchitectureFlow from './ArchitectureFlow';
import CodeInspector from './CodeInspector';
import TechIcon from '@/components/ui/TechIcon';

type TabId = 'overview' | 'architecture' | 'security' | 'performance' | 'code';

function DetailCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Lock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-xl p-4 border border-[#F59E0B]/12 hover:border-[#F59E0B]/30 transition-colors">
      <h5 className="text-[11px] font-bold text-[#FBBF24] mb-2 flex items-center gap-2 uppercase tracking-wider">
        <Icon size={14} className="shrink-0" /> {title}
      </h5>
      <div className="text-xs text-[#94A3B8] leading-relaxed">{children}</div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const files = PROJECT_FILES[project.id];
  const details = project.details;
  const hasCode = !!files && files.length > 0;

  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  // Focus management: remember trigger, focus panel, restore on close
  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      (previousFocusRef.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      // Simple focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  // Document-level Esc / Tab handling (works even if focus lands on <body>)
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const tabs: { id: TabId; label: string; icon: typeof Folder }[] = [
    { id: 'overview', label: 'Overview', icon: FileCode },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'performance', label: 'Performance', icon: Gauge },
    ...(hasCode ? [{ id: 'code' as TabId, label: `Code (${files.length})`, icon: FileCode }] : []),
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-[clamp(0.5rem,2vw,1.5rem)] bg-[#030308]/92 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Project case study: ${project.title}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        ref={panelRef}
        className="relative w-full max-w-5xl glass-strong rounded-3xl overflow-hidden flex flex-col max-h-[90dvh] border border-[#F59E0B]/20 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] as const }}
      >
        {/* ---- header ---- */}
        <div className="relative shrink-0 border-b border-[#F59E0B]/12 bg-[#0A0A12]/80">
          <ProjectVisual project={project} className="h-28 sm:h-36 opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-[#0A0A12]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] text-[#F59E0B] uppercase flex items-center gap-1.5 font-mono2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                SYSTEM &gt; {project.id.replace(/-/g, ' ').toUpperCase()}
              </span>
              <h3 className="text-base sm:text-xl font-bold text-white mt-1 truncate">{project.title}</h3>
              <p className="text-[11px] text-[#94A3B8] truncate">{project.tagline}</p>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="shrink-0 text-[#94A3B8] hover:text-white p-2.5 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
              aria-label="Close project modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ---- tabs ---- */}
        <div
          className="shrink-0 flex gap-1 overflow-x-auto hide-scrollbar border-b border-[#F59E0B]/12 px-3 sm:px-5 bg-[#07070d]/80"
          role="tablist"
          aria-label="Project report sections"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => { setActiveTab(tab.id); soundFx.playClick(); }}
                className={cn(
                  'relative flex items-center gap-1.5 py-3 px-3 sm:px-4 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors',
                  isActive ? 'text-[#FBBF24]' : 'text-[#94A3B8] hover:text-white'
                )}
              >
                <Icon size={13} className="hidden sm:block" />
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="modal-tab-underline"
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-[#FBBF24] to-[#F97316] shadow-[0_0_12px_rgba(245,158,11,0.7)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ---- content ---- */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  {/* tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 text-[10px] pl-1 pr-2.5 py-1 rounded-lg bg-[#F59E0B]/[0.08] text-[#FBBF24] font-semibold border border-[#F59E0B]/20"
                      >
                        <TechIcon name={tag} size="xs" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">{project.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <DetailCard icon={AlertTriangle} title="Problem">
                      {details?.problem}
                    </DetailCard>
                    <DetailCard icon={Lightbulb} title="Solution">
                      {details?.architecture}
                    </DetailCard>
                  </div>

                  <div className="border-t border-[#F59E0B]/12 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                    <span className="text-[#94A3B8] uppercase tracking-wider text-[11px]">Impact Benchmark</span>
                    <span className="inline-flex items-center gap-1.5 text-[#10B981] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/25">
                      <ShieldCheck className="h-4 w-4" /> {project.impact}
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-5">
                  <ArchitectureFlow projectId={project.id} />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <DetailCard icon={Monitor} title="Frontend">
                      {details?.frontend}
                    </DetailCard>
                    <DetailCard icon={Server} title="Backend">
                      {details?.backend}
                    </DetailCard>
                    <DetailCard icon={Database} title="Database">
                      {details?.database}
                    </DetailCard>
                  </div>
                  <DetailCard icon={Layers} title="Architecture Notes">
                    {details?.architecture}
                  </DetailCard>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <DetailCard icon={Lock} title="Security Controls">
                      {details?.security}
                    </DetailCard>
                    <DetailCard icon={KeyRound} title="Authentication">
                      {details?.auth}
                    </DetailCard>
                    <DetailCard icon={Activity} title="Monitoring">
                      {details?.monitoring}
                    </DetailCard>
                  </div>
                  <div className="glass-amber rounded-xl p-4 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Security-first engineering: this system follows defense-in-depth principles with
                      least-privilege access, encrypted transport, and auditable operations.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <DetailCard icon={Gauge} title="Optimization">
                      {details?.optimization}
                    </DetailCard>
                    <DetailCard icon={TrendingUp} title="Scalability">
                      {details?.scalability}
                    </DetailCard>
                    <DetailCard icon={Timer} title="Caching">
                      {details?.caching}
                    </DetailCard>
                    <DetailCard icon={Cloud} title="Deployment">
                      {details?.deployment}
                    </DetailCard>
                    <DetailCard icon={GitBranch} title="CI / CD">
                      {details?.cicd}
                    </DetailCard>
                    <DetailCard icon={Rocket} title="Future Improvements">
                      {details?.future}
                    </DetailCard>
                  </div>
                </div>
              )}

            {activeTab === 'code' && hasCode && <CodeInspector files={files} />}
          </motion.div>
        </div>

        {/* ---- footer ---- */}
        <div className="shrink-0 border-t border-[#F59E0B]/12 px-4 sm:px-6 py-3.5 flex justify-between items-center gap-3 bg-[#07070d]/80">
          <div className="text-[11px] text-[#94A3B8] hidden sm:block">
            Press <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/5 font-mono2 text-[10px]">Esc</kbd> or click outside to dismiss
          </div>
          <div className="flex items-center gap-2 ml-auto">
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
            <Button onClick={onClose} size="sm" className="rounded-xl">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
