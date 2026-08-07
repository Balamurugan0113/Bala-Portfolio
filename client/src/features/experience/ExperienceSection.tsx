import { motion } from 'framer-motion';
import { Briefcase, Calendar, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { EXPERIENCES, type Experience } from '@shared/const';
import Card3DTilt from '@/components/ui/Card3DTilt';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-12 px-[clamp(1.25rem,4vw,3rem)]" aria-label="Professional Experience">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4F8CFF] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Industry Internship
          </p>
          <h2 className="heading-md gradient-primary mt-1">Professional Experience</h2>
        </motion.div>

        {/* COMPACT ATS INTERNSHIP CARD */}
        <div className="space-y-4">
          {EXPERIENCES.map((exp: Experience) => (
            <Card3DTilt
              key={exp.id}
              maxTilt={5}
              className="glass-card p-5 sm:p-6 border border-[rgba(79,140,255,0.15)] hover:border-[#4F8CFF]/40 shadow-lg shadow-[#4F8CFF]/5"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 flex items-center justify-center text-[#4F8CFF] shrink-0">
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">{exp.role}</h3>
                      <div className="text-xs font-medium text-[#4F8CFF] flex items-center gap-1 mt-0.5">
                        <Award size={13} /> {exp.organization}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] font-mono glass px-2.5 py-1 rounded-lg border border-[rgba(79,140,255,0.1)]">
                    <Calendar size={12} className="text-[#4F8CFF]" /> {exp.period}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-[rgba(79,140,255,0.08)]">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#94A3B8] leading-relaxed">
                      <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5" />
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
