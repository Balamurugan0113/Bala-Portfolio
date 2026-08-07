import { motion } from 'framer-motion';
import { Briefcase, Calendar, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { EXPERIENCES, type Experience } from '@shared/const';
import Card3DTilt from '@/components/ui/Card3DTilt';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Professional Experience">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4F8CFF] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Industry Internship
          </p>
          <h2 className="heading-lg gradient-primary mt-2">Professional Experience</h2>
          <p className="text-body max-w-xl mx-auto mt-3 text-sm">
            Practical application of Python, Data Science, and Machine Learning pipelines in real-world environments.
          </p>
        </motion.div>

        {/* ATS INTERNSHIP CARD */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp: Experience) => (
            <Card3DTilt
              key={exp.id}
              maxTilt={6}
              className="glass-card p-6 sm:p-8 border border-[rgba(79,140,255,0.15)] hover:border-[#4F8CFF]/50 shadow-xl shadow-[#4F8CFF]/5"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 flex items-center justify-center text-[#4F8CFF]">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/15 px-2.5 py-0.5 rounded-full border border-[#4F8CFF]/30">
                        {exp.type.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">{exp.role}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-mono glass px-3 py-1.5 rounded-xl border border-[rgba(79,140,255,0.1)]">
                    <Calendar size={14} className="text-[#4F8CFF]" /> {exp.period}
                  </div>
                </div>

                <div className="text-sm font-semibold text-[#4F8CFF] mb-4 flex items-center gap-2">
                  <Award size={15} /> {exp.organization}
                </div>

                <div className="space-y-3 pt-4 border-t border-[rgba(79,140,255,0.1)]">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
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
