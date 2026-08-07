import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu, Code2, Database } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS, PROFICIENCIES } from '@/types';
import Card3DTilt from '@/components/ui/Card3DTilt';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const } }),
};

const CATEGORY_ICONS = [ShieldCheck, Code2, Cpu, Database];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative bg-[#050508] section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Skills & Certifications">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <h2 className="heading-lg bg-clip-text text-transparent bg-gradient-to-b from-[#FFFBEB] via-[#F59E0B] to-[#F97316]">Skills & Certifications</h2>
          <p className="text-body max-w-2xl mx-auto mt-3 text-sm text-[#94A3B8]">
            Core technical expertise across Artificial Intelligence, Penetration Testing, Cloud Infrastructure, and Application Hardening.
          </p>
        </motion.div>

        {/* 3D SKILL CATEGORY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SKILL_CATEGORIES.map((cat, i) => {
            const IconComp = CATEGORY_ICONS[i % CATEGORY_ICONS.length];
            const isPrimary = i === 0;
            return (
              <Card3DTilt
                key={cat.title}
                maxTilt={10}
                className={cat.title.includes('PRIMARY')
                  ? 'glass-card p-6 flex flex-col h-full border-2 border-[#F59E0B] shadow-xl shadow-[#F59E0B]/20 relative overflow-hidden'
                  : 'glass-card p-6 flex flex-col h-full border border-[#F59E0B]/20 hover:border-[#F59E0B]/40'}
              >
                {isPrimary && (
                  <div className="absolute top-0 right-0 bg-[#F59E0B] text-black text-[9px] font-mono font-extrabold px-3 py-1 rounded-bl-xl shadow-md uppercase tracking-widest">
                    Core Focus
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4 border-b border-[#F59E0B]/15 pb-3">
                  <div className="p-2 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 shrink-0">
                    <IconComp size={18} />
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider leading-snug">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-3 flex-grow">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-white transition-colors">
                      <span className="w-1.5 h-1.5 bg-[#4F8CFF] rounded-full shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </Card3DTilt>
            );
          })}
        </div>

        {/* CERTIFICATIONS & PROFICIENCIES */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="text-[#F59E0B]" size={20} /> Certifications & Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert) => (
                <Card3DTilt
                  key={cert.title}
                  maxTilt={8}
                  className="p-5 rounded-2xl border border-[rgba(79,140,255,0.15)] bg-[rgba(10,15,30,0.65)] hover:border-[#4F8CFF]/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 rounded-xl text-[#4F8CFF] shrink-0">
                      <Award size={22} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{cert.title}</h4>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5 uppercase font-semibold tracking-wider">{cert.issuer}</p>
                      <p className="text-[11px] text-[#94A3B8] mt-2 leading-relaxed">{cert.description}</p>
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#4F8CFF]/15 text-[#4F8CFF] border border-[#4F8CFF]/30 mt-3">
                        Issued: {cert.year}
                      </span>
                    </div>
                  </div>
                </Card3DTilt>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Technical Proficiency</h3>
            <Card3DTilt maxTilt={6} className="p-6 rounded-2xl border border-[rgba(79,140,255,0.12)] bg-[rgba(10,15,30,0.65)] space-y-5">
              {PROFICIENCIES.map((prof, i) => (
                <div key={prof.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-white">{prof.name}</span>
                    <span className="text-[#4F8CFF] font-mono font-bold">{prof.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-[rgba(79,140,255,0.1)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#4F8CFF] via-[#00D9FF] to-[#8B5CF6] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prof.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
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
