import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Cpu, Code2, Database, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS, PROFICIENCIES } from '@/types';
import Card3DTilt from '@/components/ui/Card3DTilt';
import { soundFx } from '@/lib/sound';
import { cn } from '@/lib/utils';

const CATEGORY_ICONS = [Zap, ShieldCheck, Code2, Cpu, Database];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<'skills' | 'certs'>('skills');

  const handleTabChange = (tab: 'skills' | 'certs') => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <section id="skills" className="relative bg-[#050508] py-6 sm:py-16 px-3 sm:px-6" aria-label="Skills and Certifications">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[350px] bg-gradient-to-r from-[#F59E0B]/5 via-[#F97316]/5 to-transparent blur-[100px] rounded-full z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* SECTION HEADER (COMPACT ON MOBILE) */}
        <motion.div
          className="text-center mb-4 sm:mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full glass border border-[#F59E0B]/30 mb-1.5 sm:mb-2 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
            <Sparkles size={11} className="text-[#F59E0B]" />
            <span className="text-[9px] sm:text-xs font-bold text-[#F59E0B] tracking-[0.2em] uppercase font-mono">
              Expertise &amp; Validations
            </span>
          </div>

          <h2 className="heading-lg bg-clip-text text-transparent bg-gradient-to-b from-[#FFFBEB] via-[#F59E0B] to-[#F97316]">
            Skills &amp; Credentials
          </h2>
          <p className="text-body max-w-xl mx-auto mt-1 text-[10px] sm:text-xs text-[#94A3B8]">
            Technical competencies across Vibe Coding, Machine Learning, Cybersecurity, and Cloud Architectures.
          </p>

          {/* DEDICATED SEPARATED TABS */}
          <div className="mt-3.5 sm:mt-6 inline-flex items-center p-1 rounded-xl glass border border-white/10 shadow-md">
            <button
              type="button"
              onClick={() => handleTabChange('skills')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer",
                activeTab === 'skills'
                  ? "bg-[#F59E0B] text-[#050508] shadow-[0_0_12px_rgba(245,158,11,0.35)] font-bold"
                  : "text-[#94A3B8] hover:text-white"
              )}
            >
              <Zap size={12} className={activeTab === 'skills' ? 'text-black' : 'text-[#F59E0B]'} />
              <span>Technical Skills</span>
              <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono hidden xs:inline-block">
                {SKILL_CATEGORIES.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('certs')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer",
                activeTab === 'certs'
                  ? "bg-[#F59E0B] text-[#050508] shadow-[0_0_12px_rgba(245,158,11,0.35)] font-bold"
                  : "text-[#94A3B8] hover:text-white"
              )}
            >
              <Award size={12} className={activeTab === 'certs' ? 'text-black' : 'text-[#F59E0B]'} />
              <span>Certifications</span>
              <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono hidden xs:inline-block">
                {CERTIFICATIONS.length}
              </span>
            </button>
          </div>
        </motion.div>

        {/* TAB CONTENT WITH ANIMATE PRESENCE */}
        <AnimatePresence mode="wait">
          {activeTab === 'skills' ? (
            /* TAB 1: TECHNICAL SKILLS (COMPACT RESPONSIVE GRID) */
            <motion.div
              key="skills-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-2 sm:space-y-4"
            >
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3.5 items-stretch">
                {SKILL_CATEGORIES.map((cat, i) => {
                  const IconComp = CATEGORY_ICONS[i % CATEGORY_ICONS.length];
                  const isVibe = cat.title.toLowerCase().includes('vibe');
                  return (
                    <Card3DTilt
                      key={cat.title}
                      maxTilt={2}
                      className={cn(
                        "glass-card p-2.5 sm:p-4 flex flex-col h-full rounded-xl sm:rounded-2xl transition-all relative overflow-hidden",
                        isVibe
                          ? "border border-[#F59E0B]/70 shadow-[0_0_15px_rgba(245,158,11,0.12)] bg-gradient-to-br from-[#F59E0B]/10 via-transparent to-transparent xs:col-span-2 lg:col-span-2"
                          : "border border-[#F59E0B]/20 hover:border-[#F59E0B]/40"
                      )}
                    >
                      {isVibe && (
                        <div className="absolute top-0 right-0 bg-[#F59E0B] text-black text-[7px] sm:text-[8px] font-mono font-black px-1.5 py-0.5 rounded-bl-md uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <Sparkles size={9} /> Superpower
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2.5 border-b border-white/10 pb-1.5">
                        <div className={cn(
                          "p-1 rounded-md border shrink-0",
                          isVibe ? "bg-[#F59E0B]/20 border-[#F59E0B]/40 text-[#F59E0B]" : "bg-white/5 border-white/10 text-[#F59E0B]"
                        )}>
                          <IconComp size={12} className="sm:w-3.5 sm:h-3.5" />
                        </div>
                        <h3 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider leading-snug truncate">
                          {cat.title.replace('★ ', '')}
                        </h3>
                      </div>

                      {/* Skills Badges Cluster: Compact inline wrap pills on mobile */}
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md bg-white/[0.04] hover:bg-[#F59E0B]/10 border border-white/8 hover:border-[#F59E0B]/30 transition-all text-[9px] sm:text-[11px] text-[#94A3B8] hover:text-white font-mono"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#F59E0B] shrink-0" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </Card3DTilt>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* TAB 2: CERTIFICATIONS & CREDENTIALS (COMPACT MOBILE VIEW) */
            <motion.div
              key="certs-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-5 items-start">
                
                {/* CERTIFICATIONS LIST */}
                <div className="lg:col-span-8 space-y-1.5 sm:space-y-2.5">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Award size={12} className="text-[#F59E0B]" /> Credentials ({CERTIFICATIONS.length})
                    </h3>
                    <span className="text-[8px] sm:text-[9px] font-mono text-[#94A3B8]">Verified Issuers</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5">
                    {CERTIFICATIONS.map((cert) => (
                      <Card3DTilt
                        key={cert.title}
                        maxTilt={2}
                        className="p-2 sm:p-3.5 rounded-xl border border-[#F59E0B]/20 bg-[rgba(10,15,30,0.65)] hover:border-[#F59E0B]/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start gap-1.5 sm:gap-2">
                            <div className="p-1 bg-[#F59E0B]/15 border border-[#F59E0B]/30 rounded-md text-[#F59E0B] shrink-0 mt-0.5">
                              <Award size={12} className="sm:w-3.5 sm:h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[10px] sm:text-xs font-bold text-white leading-tight">
                                {cert.title}
                              </h4>
                              <p className="text-[8px] sm:text-[9px] text-[#F59E0B] font-mono font-semibold uppercase mt-0.5">
                                {cert.issuer}
                              </p>
                            </div>
                          </div>
                          
                          {/* 1-line condensed description on mobile, full on tablet */}
                          <p className="text-[8px] sm:text-[9.5px] text-[#94A3B8] mt-1 sm:mt-1.5 leading-relaxed line-clamp-1 sm:line-clamp-2">
                            {cert.description}
                          </p>
                        </div>

                        <div className="mt-1.5 sm:mt-2 pt-1 sm:pt-1.5 border-t border-white/5 flex items-center justify-between">
                          <span className="px-1.5 py-0.2 rounded text-[7px] sm:text-[8px] font-mono font-bold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                            Valid: {cert.year}
                          </span>
                          <span className="text-[7px] sm:text-[8px] text-[#10B981] font-mono flex items-center gap-0.5">
                            <CheckCircle2 size={9} /> Verified
                          </span>
                        </div>
                      </Card3DTilt>
                    ))}
                  </div>
                </div>

                {/* TECHNICAL PROFICIENCY METERS */}
                <div className="lg:col-span-4 space-y-1.5 sm:space-y-2.5">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Proficiency Ratings
                    </h3>
                  </div>

                  <Card3DTilt maxTilt={2} className="p-2.5 sm:p-3.5 rounded-xl border border-[#F59E0B]/20 bg-[rgba(10,15,30,0.65)] space-y-1.5 sm:space-y-2">
                    {PROFICIENCIES.map((prof, i) => (
                      <div key={prof.name} className="space-y-0.5">
                        <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-semibold">
                          <span className="text-white">{prof.name}</span>
                          <span className="text-[#F59E0B] font-mono font-bold">{prof.percentage}%</span>
                        </div>
                        <div className="h-1 sm:h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${prof.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                          />
                        </div>
                      </div>
                    ))}
                  </Card3DTilt>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
