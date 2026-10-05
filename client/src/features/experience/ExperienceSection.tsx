import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Award, Trophy } from 'lucide-react';
import { EXPERIENCES, type Experience } from '@shared/const';
import Card3DTilt from '@/components/ui/Card3DTilt';
import SectionHeading from '@/components/ui/SectionHeading';

const TYPE_META: Record<Experience['type'], { label: string; cls: string }> = {
  internship: { label: 'INTERNSHIP', cls: 'text-[#22D3EE] border-[#22D3EE]/35 bg-[#22D3EE]/10' },
  research: { label: 'RESEARCH', cls: 'text-[#A78BFA] border-[#A78BFA]/35 bg-[#A78BFA]/10' },
  'open-source': { label: 'OPEN SOURCE', cls: 'text-[#10B981] border-[#10B981]/35 bg-[#10B981]/10' },
  achievement: { label: 'ACHIEVEMENT', cls: 'text-[#FBBF24] border-[#F59E0B]/40 bg-[#F59E0B]/10' },
};

function TimelineItem({ exp }: { exp: Experience }) {
  const meta = TYPE_META[exp.type];
  const isInternship = exp.type === 'internship';
  const Icon = isInternship ? Briefcase : Trophy;

  return (
    <motion.li
      className="relative grid grid-cols-[28px_1fr] sm:grid-cols-[44px_1fr] gap-4 sm:gap-6 pb-10 last:pb-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* node */}
      <div className="relative flex justify-center pt-1">
        <span className="relative z-10 w-11 h-11 -ml-[9px] sm:ml-0 rounded-2xl bg-[#0C0C14] border border-[#F59E0B]/45 flex items-center justify-center text-[#F59E0B] shadow-[0_0_24px_-6px_rgba(245,158,11,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <Icon size={18} />
        </span>
      </div>

      {/* card */}
      <Card3DTilt
        maxTilt={5}
        className="glass-card p-5 sm:p-6 border border-[#F59E0B]/16 hover:border-[#F59E0B]/40 group"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div>
              <h3 className="text-[15px] sm:text-base font-bold text-white leading-tight">{exp.role}</h3>
              <div className="text-xs font-semibold text-[#FBBF24] flex items-center gap-1.5 mt-1">
                <Award size={13} className="shrink-0" /> {exp.organization}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-[9px] font-mono2 font-bold px-2.5 py-1 rounded-lg border tracking-[0.14em] ${meta.cls}`}>
              {meta.label}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] font-mono2 glass px-2.5 py-1 rounded-lg border border-[#F59E0B]/15">
              <Calendar size={12} className="text-[#F59E0B]" /> {exp.period}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{exp.description}</p>

        <div className="space-y-2 pt-3 border-t border-white/[0.06]">
          {exp.achievements.map((ach, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-[#94A3B8] leading-relaxed group/ach">
              <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5 group-hover/ach:scale-110 transition-transform" />
              <span className="group-hover/ach:text-slate-300 transition-colors">{ach}</span>
            </div>
          ))}
        </div>
      </Card3DTilt>
    </motion.li>
  );
}

export default function ExperienceSection() {
  const trackRef = useRef<HTMLOListElement>(null);

  // Scroll-drawn glowing timeline spine
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative bg-[#050508] section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Professional Experience">
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[560px] h-[460px] bg-[#F59E0B]/[0.035] blur-[130px] rounded-full z-0" />

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeading
          index="04"
          label="EXPERIENCE"
          title="Engineering Journey"
          subtitle="Internships, competitions, and milestones across AI engineering and cybersecurity."
        />

        <div className="relative">
          {/* timeline spine */}
          <div
            className="absolute left-[13px] sm:left-[21px] top-2 bottom-2 w-px bg-white/[0.06] rounded-full overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[#FDE68A] via-[#F59E0B] to-[#F59E0B]/20 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
              style={{ scaleY: lineScale }}
            />
          </div>

          <ol ref={trackRef} className="relative list-none">
            {EXPERIENCES.map((exp) => (
              <TimelineItem key={exp.id} exp={exp} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
