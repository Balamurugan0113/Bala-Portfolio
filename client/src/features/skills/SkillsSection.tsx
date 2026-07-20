import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS, PROFICIENCIES } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Skills & Certifications">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4F8CFF]">Expertise</p>
          <h2 className="heading-lg gradient-primary mt-2">Skills & Certifications</h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            Core technical expertise and professional credentials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="glass-card rounded-2xl p-6 flex flex-col h-full"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
            >
              <h3 className="text-sm font-bold text-white mb-4 border-b border-[#4F8CFF]/40 pb-2.5 uppercase tracking-wider text-[#4F8CFF]">
                {cat.title}
              </h3>
              <ul className="space-y-2.5 flex-grow">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5 text-xs text-[#94A3B8] hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 bg-[#4F8CFF] rounded-full shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-white">Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  className="flex items-start gap-3 p-4 rounded-xl border-2 border-[#4F8CFF]/40 bg-[rgba(79,140,255,0.03)] hover:border-[#4F8CFF]/70 hover:bg-[rgba(79,140,255,0.06)] transition-all"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                >
                  <div className="p-2 bg-[#4F8CFF]/20 rounded text-[#4F8CFF]">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#4F8CFF] leading-snug">{cert.title}</h4>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5 uppercase font-semibold">{cert.issuer}</p>
                    <span className="inline-block px-2.5 py-1 rounded text-[9px] font-semibold bg-[#4F8CFF]/15 text-[#4F8CFF] border border-[#4F8CFF]/30 mt-1.5">{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Proficiency</h3>
            <div className="p-5 rounded-xl border border-[rgba(79,140,255,0.06)] bg-[rgba(10,15,30,0.4)] space-y-4">
              {PROFICIENCIES.slice(0, 4).map((prof, i) => (
                <motion.div
                  key={prof.name}
                  className="space-y-1.5"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-white bg-[#4F8CFF]/10 px-2 py-1 rounded">{prof.name}</span>
                    <span className="text-[#4F8CFF] text-xs font-bold">{prof.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-[rgba(79,140,255,0.06)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#00D9FF] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prof.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.15 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
