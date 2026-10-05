import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Award } from 'lucide-react';
import { EXPERIENCES, type Experience } from '@shared/const';
import Card3DTilt from '@/components/ui/Card3DTilt';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-[#050508] py-10 sm:py-16 px-4 sm:px-6" aria-label="Professional Experience">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-md bg-clip-text text-transparent bg-gradient-to-b from-[#FFFBEB] via-[#F59E0B] to-[#F97316]">
            Professional Experience
          </h2>
        </motion.div>

        {/* COMPACT ATS INTERNSHIP CARD */}
        <div className="space-y-3 sm:space-y-4">
          {EXPERIENCES.map((exp: Experience) => (
            <Card3DTilt
              key={exp.id}
              maxTilt={4}
              className="glass-card p-4 sm:p-6 border border-[#F59E0B]/20 hover:border-[#F59E0B]/50 shadow-lg shadow-[#F59E0B]/5 rounded-xl sm:rounded-2xl"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 sm:mb-3">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0">
                      <Briefcase size={14} className="sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{exp.role}</h3>
                      <div className="text-[11px] sm:text-xs font-medium text-[#F59E0B] flex items-center gap-1 mt-0.5">
                        <Award size={12} /> {exp.organization}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-[#94A3B8] font-mono glass px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-white/10">
                    <Calendar size={11} className="text-[#F59E0B]" /> {exp.period}
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2 pt-2.5 sm:pt-3 border-t border-white/10">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed">
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
