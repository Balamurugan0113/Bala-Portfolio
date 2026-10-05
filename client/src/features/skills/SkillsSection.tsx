import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu, Code2, Database } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS, PROFICIENCIES } from '@/types';
import Card3DTilt from '@/components/ui/Card3DTilt';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as const } }),
};

const CATEGORY_ICONS = [ShieldCheck, Code2, Cpu, Database];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative bg-[#050508] py-8 sm:py-16 px-4 sm:px-6" aria-label="Skills & Certifications">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <h2 className="heading-lg bg-clip-text text-transparent bg-gradient-to-b from-[#FFFBEB] via-[#F59E0B] to-[#F97316]">
            Skills &amp; Certifications
          </h2>
          <p className="text-body max-w-xl mx-auto mt-1 sm:mt-2 text-[11px] sm:text-xs text-[#94A3B8]">
            Core technical capabilities in Machine Learning, Python, Cybersecurity, and Cloud Infrastructure.
          </p>
        </motion.div>

        {/* SKILLS GRID STRUCTURE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-10">
          {SKILL_CATEGORIES.map((cat, i) => {
            const IconComp = CATEGORY_ICONS[i % CATEGORY_ICONS.length];
            const isPrimary = i === 0;
            return (
              <Card3DTilt
                key={cat.title}
                maxTilt={4}
                className={cat.title.includes('PRIMARY')
                  ? 'glass-card p-3 sm:p-4 flex flex-col h-full border border-[#F59E0B] shadow-md shadow-[#F59E0B]/10 relative overflow-hidden rounded-xl'
                  : 'glass-card p-3 sm:p-4 flex flex-col h-full border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 rounded-xl'}
              >
                {isPrimary && (
                  <div className="absolute top-0 right-0 bg-[#F59E0B] text-black text-[7px] sm:text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded-bl-md shadow-sm uppercase tracking-wider">
                    Core Focus
                  </div>
                )}
                
                {/* Header */}
                <div className="flex items-center gap-2 mb-2.5 border-b border-[#F59E0B]/15 pb-2">
                  <div className="p-1 sm:p-1.5 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 shrink-0">
                    <IconComp size={13} className="sm:w-3.5 sm:h-3.5" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider leading-snug">
                    {cat.title.replace('★ PRIMARY FOCUS: ', '')}
                  </h3>
                </div>

                {/* Skills Grid Badges */}
                <div className="grid grid-cols-1 gap-1.5 flex-grow">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-2 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#F59E0B]/10 border border-white/5 hover:border-[#F59E0B]/30 transition-all flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0" />
                      <span className="text-[10px] sm:text-[11px] text-[#94A3B8] hover:text-white font-medium truncate">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </Card3DTilt>
            );
          })}
        </div>

        {/* CERTIFICATIONS (FULL WIDTH ON MOBILE, 2-COL WITH PROFICIENCY ON DESKTOP) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-3">
            <h3 className="text-xs sm:text-base font-bold text-white flex items-center gap-1.5 sm:gap-2">
              <Award className="text-[#F59E0B]" size={15} /> Certifications &amp; Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {CERTIFICATIONS.map((cert) => (
                <Card3DTilt
                  key={cert.title}
                  maxTilt={3}
                  className="p-2.5 sm:p-3.5 rounded-xl border border-[#F59E0B]/20 bg-[rgba(10,15,30,0.65)] hover:border-[#F59E0B]/50 transition-all"
                >
                  <div className="flex items-start gap-2 sm:gap-2.5">
                    <div className="p-1 sm:p-1.5 bg-[#F59E0B]/15 border border-[#F59E0B]/30 rounded-lg text-[#F59E0B] shrink-0 mt-0.5">
                      <Award size={13} className="sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] sm:text-xs font-bold text-white leading-snug truncate sm:whitespace-normal">{cert.title}</h4>
                      <p className="text-[8px] sm:text-[9px] text-[#94A3B8] mt-0.5 uppercase font-semibold tracking-wider">{cert.issuer}</p>
                      <p className="text-[9px] sm:text-[10px] text-[#94A3B8] mt-1 leading-relaxed line-clamp-1 sm:line-clamp-2">{cert.description}</p>
                      <span className="inline-block px-1.5 py-0.2 rounded text-[7px] sm:text-[8px] font-mono font-bold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 mt-1">
                        Issued: {cert.year}
                      </span>
                    </div>
                  </div>
                </Card3DTilt>
              ))}
            </div>
          </div>

          {/* TECHNICAL PROFICIENCY: HIDDEN ON MOBILE SCREENS */}
          <div className="hidden lg:block space-y-2.5 sm:space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white">Technical Proficiency</h3>
            <Card3DTilt maxTilt={4} className="p-3.5 sm:p-4 rounded-xl border border-[#F59E0B]/20 bg-[rgba(10,15,30,0.65)] space-y-2.5 sm:space-y-3">
              {PROFICIENCIES.map((prof, i) => (
                <div key={prof.name} className="space-y-0.5">
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-semibold">
                    <span className="text-white">{prof.name}</span>
                    <span className="text-[#F59E0B] font-mono font-bold">{prof.percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prof.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.06 }}
                    />
                  </div>
                </div>
              ))}
            </Card3DTilt>
          </div>
        </div>
      </div>
    </section>
  );
}
