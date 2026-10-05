import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS, PROFICIENCIES } from '@/types';
import Card3DTilt from '@/components/ui/Card3DTilt';
import SectionHeading from '@/components/ui/SectionHeading';
import TechIcon, { TechChip } from '@/components/ui/TechIcon';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const } }),
};

/** Cybersecurity is the core focus — gets the highlighted amber card */
const PRIMARY_CATEGORY = 'Cybersecurity';

const MARQUEE_TECH = [
  'Python', 'TensorFlow', 'PyTorch', 'React', 'FastAPI', 'Docker', 'Linux',
  'PostgreSQL', 'Burp Suite', 'Wireshark', 'Nmap', 'OpenCV', 'AWS', 'Git',
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative bg-[#050508] section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Skills & Certifications">
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-[#F59E0B]/[0.04] blur-[130px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          index="02"
          label="SKILLS"
          title="Technical Arsenal"
          subtitle="Core technical expertise across Artificial Intelligence, Penetration Testing, Cloud Infrastructure, and Application Hardening."
        />

        {/* Floating 3D tech icon band */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          aria-hidden="true"
        >
          {MARQUEE_TECH.map((tech, i) => (
            <span
              key={tech}
              className="animate-float"
              style={{ animationDelay: `${(i % 7) * 0.7}s`, animationDuration: `${6 + (i % 4)}s` }}
            >
              <TechIcon name={tech} size="md" title={tech} />
            </span>
          ))}
        </motion.div>

        {/* 3D SKILL CATEGORY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SKILL_CATEGORIES.map((cat, i) => {
            const isPrimary = cat.title === PRIMARY_CATEGORY;
            return (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                custom={i * 0.5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <Card3DTilt
                  maxTilt={9}
                  className={`h-full ${isPrimary ? 'glass-amber border-2 border-[#F59E0B]/50!' : 'glass-card border border-[#F59E0B]/14'} relative`}
                  ariaLabel={`${cat.title} skills`}
                >
                  {isPrimary && (
                    <div className="absolute top-0 right-0 z-20 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-[#1A1006] text-[9px] font-mono2 font-extrabold px-3 py-1 rounded-bl-xl rounded-tr-xl shadow-lg uppercase tracking-[0.2em]">
                      Core Focus
                    </div>
                  )}
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4 border-b border-[#F59E0B]/12 pb-4">
                      <TechIcon name={cat.title} size="md" />
                      <h3 className="text-[13px] font-bold text-white uppercase tracking-wider leading-snug flex-1">
                        {cat.title}
                      </h3>
                      <span className="text-[10px] font-mono2 text-[#94A3B8]/70 shrink-0">{String(cat.skills.length).padStart(2, '0')}</span>
                    </div>
                    <ul className="space-y-1.5 flex-grow">
                      {cat.skills.map((skill) => (
                        <li
                          key={skill}
                          className="group/skill flex items-center gap-3 text-xs text-[#94A3B8] hover:text-white rounded-lg px-2 py-1.5 -mx-2 hover:bg-white/[0.04] transition-all duration-200 hover:translate-x-0.5"
                        >
                          <TechIcon name={skill} size="xs" className="opacity-80 group-hover/skill:opacity-100 transition-opacity" />
                          <span className="leading-snug">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card3DTilt>
              </motion.div>
            );
          })}
        </div>

        {/* CERTIFICATIONS & PROFICIENCIES */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="text-[#F59E0B]" size={20} /> Certifications &amp; Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  <Card3DTilt maxTilt={7} className="p-5 rounded-2xl glass-card border border-[#F59E0B]/14 h-full">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-[#F59E0B]/12 border border-[#F59E0B]/30 rounded-xl text-[#F59E0B] shrink-0 shadow-[0_0_18px_-6px_rgba(245,158,11,0.5)]">
                        <Award size={22} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{cert.title}</h4>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5 uppercase font-semibold tracking-wider">{cert.issuer}</p>
                        <p className="text-[11px] text-[#94A3B8] mt-2 leading-relaxed">{cert.description}</p>
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono2 font-bold bg-[#F59E0B]/12 text-[#FBBF24] border border-[#F59E0B]/30 mt-3">
                          ISSUED: {cert.year}
                        </span>
                      </div>
                    </div>
                  </Card3DTilt>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Technical Proficiency</h3>
            <Card3DTilt maxTilt={5} className="p-6 rounded-2xl glass-card border border-[#F59E0B]/14 space-y-5">
              {PROFICIENCIES.map((prof, i) => (
                <div key={prof.name} className="space-y-1.5 group/prof">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-white flex items-center gap-2">
                      <TechIcon name={prof.name} size="xs" />
                      {prof.name}
                    </span>
                    <span className="text-[#FBBF24] font-mono2 font-bold">{prof.percentage}%</span>
                  </div>
                  <div className="relative h-2 w-full bg-black/50 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] border border-white/[0.04]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#78350F] via-[#F59E0B] to-[#FBBF24] relative"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prof.percentage}%` }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
                    >
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FDE68A] shadow-[0_0_10px_rgba(253,230,138,0.9)]" />
                    </motion.div>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-white/[0.06] flex flex-wrap gap-2">
                <TechChip name="Docker" size="xs" />
                <TechChip name="Git" size="xs" />
                <TechChip name="Linux" size="xs" />
              </div>
            </Card3DTilt>
          </div>
        </div>
      </div>
    </section>
  );
}
