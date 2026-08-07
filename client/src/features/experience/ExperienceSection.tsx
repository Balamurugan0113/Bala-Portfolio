import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES, type Experience } from '@shared/const';
import Card3DTilt from '@/components/ui/Card3DTilt';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';

const TYPES = [
  { id: 'all', label: 'All Experience' },
  { id: 'research', label: 'Security Research' },
  { id: 'internship', label: 'Client & Freelance' },
  { id: 'open-source', label: 'Open Source AI' },
  { id: 'achievement', label: 'Academic & CTF' },
];

export default function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = EXPERIENCES.filter((exp) => {
    if (activeFilter === 'all') return true;
    return exp.type === activeFilter;
  });

  return (
    <section id="experience" className="relative section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Experience & Research">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4F8CFF] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Career & Research Track
          </p>
          <h2 className="heading-lg gradient-primary mt-2">Experience & Contributions</h2>
          <p className="text-body max-w-2xl mx-auto mt-3 text-sm">
            Proven track record in security research labs, freelance systems architecture, and open-source AI optimization.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveFilter(t.id);
                  soundFx.playClick();
                }}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300',
                  activeFilter === t.id
                    ? 'bg-[#4F8CFF] text-white shadow-lg shadow-[#4F8CFF]/25 scale-105'
                    : 'glass text-[#94A3B8] hover:text-white hover:bg-white/10'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* TIMELINE DECK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((exp: Experience) => (
            <Card3DTilt
              key={exp.id}
              maxTilt={8}
              className="glass-card p-6 border border-[rgba(79,140,255,0.12)] hover:border-[#4F8CFF]/40 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#4F8CFF]/15 text-[#4F8CFF] border border-[#4F8CFF]/30">
                    {exp.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-mono flex items-center gap-1">
                    <Calendar size={12} /> {exp.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{exp.role}</h3>
                <p className="text-xs text-[#4F8CFF] font-medium mb-3 flex items-center gap-1.5">
                  <Briefcase size={13} /> {exp.organization}
                </p>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{exp.description}</p>

                <div className="space-y-2 pt-3 border-t border-[rgba(79,140,255,0.08)]">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <CheckCircle2 size={13} className="text-[#10B981] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
}
