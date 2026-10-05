import { motion } from 'framer-motion';
import { GraduationCap, Target, Shield, Brain, Gamepad2, Trophy, Github, Linkedin, Youtube, Instagram, Award } from 'lucide-react';
import { STATS } from '@/types';
import Card3DTilt from '@/components/ui/Card3DTilt';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const } }),
};

const EDUCATION = [
  {
    period: '2023 - PRESENT',
    title: 'B.Tech in AI & Data Science (Final year)',
    school: 'Info Institute of Engineering',
    location: 'Kovilpalayam, Coimbatore',
    active: true,
  },
  {
    period: '2021 - 2023',
    title: 'Secondary Schooling (11th - 12th)',
    school: 'Shri Nehru Vidyalaya Higher Sec School',
    location: 'R.S. PURAM, Coimbatore',
    active: false,
  },
  {
    period: '2011 - 2021',
    title: 'Primary Schooling',
    school: 'Amrita Vidyalayam',
    location: 'Nallampalayam, Coimbatore',
    active: false,
  },
];

const BEYOND_CODING = [
  { icon: '🤾', title: 'Handball Player', desc: 'Active competitive player since school' },
  { icon: '🎮', title: 'PC Gaming', desc: 'Valorant, GTA 5, Strategy games' },
  { icon: '💼', title: 'Security & Web Freelance', desc: 'Client project delivery & audits' },
  { icon: '🎓', title: 'Final Year Capstones', desc: 'Guiding college research projects' },
];

const COMPETITIONS = [
  { title: 'Smart India Hackathon 2025', desc: 'National level AI hackathon competitor', url: 'https://www.sih.gov.in/' },
  { title: 'Trisquadathon 2024', desc: 'CSE Association technical event winner', url: 'https://trisquadathon.infomeister.co.in/' },
];

/** Splits a stat like "4th Year (Final Year)" into animated number + suffix */
function StatValue({ value }: { value: string }) {
  const m = value.match(/^(\D*?)(\d+)(.*)$/s);
  if (!m) {
    return <span className="text-2xl font-extrabold gradient-primary font-mono2">{value}</span>;
  }
  const [, prefix, num, suffix] = m;
  const longSuffix = suffix.trim().length > 4;
  if (longSuffix) {
    return (
      <span className="flex flex-col items-center leading-none">
        <AnimatedCounter value={`${prefix}${num}`} className="text-3xl sm:text-4xl font-extrabold gradient-primary font-mono2" />
        <span className="text-[8px] sm:text-[10px] text-[#FBBF24]/80 font-mono2 mt-1.5 uppercase tracking-[0.1em] sm:tracking-[0.18em] text-center max-w-[9rem] leading-snug">
          {suffix.trim()}
        </span>
      </span>
    );
  }
  return (
    <AnimatedCounter value={value} className="text-3xl sm:text-4xl font-extrabold gradient-primary font-mono2" />
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-[#050508] section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="About me">
      {/* atmosphere */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[640px] h-[500px] bg-[#F59E0B]/[0.045] blur-[140px] rounded-full z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.05] z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          index="01"
          label="ABOUT"
          title="The Engineer Behind The Terminal"
          subtitle="Hi, I'm Balamurugan C. I specialize in Ethical Hacking, developing robust Machine Learning pipelines, performing statistical data analytics, and hardening modern intelligent infrastructure."
        />

        {/* STATS MATRIX — animated counters */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          {STATS.map((stat) => (
            <Card3DTilt
              key={stat.label}
              maxTilt={7}
              className="glass-card p-5 sm:p-6 text-center border border-[#F59E0B]/16 group"
            >
              <div className="flex flex-col items-center">
                <StatValue value={stat.value} />
                <div className="text-[11px] sm:text-xs text-[#94A3B8] font-medium mt-1.5 leading-snug">{stat.label}</div>
              </div>
              <div className="mt-3 h-px w-10 mx-auto bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent transition-all duration-500 group-hover:w-16" />
            </Card3DTilt>
          ))}
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* ACADEMIC JOURNEY */}
          <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="lg:col-span-6">
            <Card3DTilt maxTilt={4} className="glass-card p-6 sm:p-8 h-full border border-[#F59E0B]/16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/12 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shadow-[0_0_20px_-6px_rgba(245,158,11,0.4)]">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="heading-sm text-white">Academic Journey</h3>
                  <p className="text-[11px] text-[#94A3B8] font-mono2 uppercase tracking-wider mt-0.5">AI &amp; Data Science Specialization</p>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                Pursuing B.Tech in Artificial Intelligence &amp; Data Science (Final Year). Specialized in Ethical Hacking,
                building machine learning classification &amp; regression models, exploratory data analytics (EDA), and
                full-stack REST API web platforms.
              </p>

              <div className="relative space-y-6 before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-[#F59E0B]/50 before:via-[#F59E0B]/15 before:to-transparent">
                {EDUCATION.map((edu) => (
                  <div key={edu.title} className="relative pl-6">
                    <div
                      className={`absolute left-0 top-1.5 w-2 h-2 rounded-full ${
                        edu.active
                          ? 'bg-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.9)]'
                          : 'bg-[#94A3B8]/30'
                      }`}
                    />
                    <span className="text-[10px] font-mono2 font-bold text-[#F59E0B] uppercase tracking-wider">{edu.period}</span>
                    <h4 className="text-xs font-bold text-white mt-0.5">{edu.title}</h4>
                    <p className="text-[11px] text-[#94A3B8]">{edu.school} · {edu.location}</p>
                  </div>
                ))}
              </div>
            </Card3DTilt>
          </motion.div>

          {/* ENGINEERING VISION */}
          <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="lg:col-span-6">
            <Card3DTilt maxTilt={4} className="glass-card p-6 sm:p-8 h-full border border-[#F59E0B]/16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#F97316]/12 border border-[#F97316]/30 flex items-center justify-center text-[#F97316] shadow-[0_0_20px_-6px_rgba(249,115,22,0.4)]">
                  <Target size={20} />
                </div>
                <h3 className="heading-sm text-white">Engineering Vision</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#F59E0B]/[0.06] border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 transition-colors group/vision">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-1.5">
                    <Shield size={14} className="text-[#F59E0B] group-hover/vision:scale-110 transition-transform" />
                    Primary Focus: Ethical Hacking &amp; Security
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Performing penetration testing, web application security auditing, API vulnerability assessments, and
                    proactive network defense.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F97316]/[0.06] border border-[#F97316]/20 hover:border-[#F97316]/40 transition-colors group/vision">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-1.5">
                    <Brain size={14} className="text-[#F97316] group-hover/vision:scale-110 transition-transform" />
                    Python Data Science &amp; ML Pipelines
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Developing automated Python data preprocessing scripts, feature extraction, and supervised machine
                    learning classification models.
                  </p>
                </div>
              </div>
            </Card3DTilt>
          </motion.div>

          {/* BEYOND CODING */}
          <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="lg:col-span-6">
            <Card3DTilt maxTilt={4} className="glass-card p-6 h-full border border-[#F59E0B]/16">
              <div className="flex items-center gap-2.5 mb-4">
                <Gamepad2 size={18} className="text-[#F59E0B]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Beyond Coding</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BEYOND_CODING.map((item) => (
                  <div key={item.title} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#F59E0B]/30 hover:bg-white/[0.04] transition-all">
                    <span className="text-xs font-bold text-white">{item.icon} {item.title}</span>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card3DTilt>
          </motion.div>

          {/* COMPETITIONS & SOCIALS */}
          <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="lg:col-span-6">
            <Card3DTilt maxTilt={4} className="glass-card p-6 h-full border border-[#F59E0B]/16 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <Trophy size={18} className="text-[#F59E0B]" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Competitions &amp; Hackathons</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {COMPETITIONS.map((comp) => (
                    <div key={comp.title} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#F59E0B]/30 transition-all">
                      <a href={comp.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#FBBF24] link-underline inline-flex items-center gap-1">
                        {comp.title} <Award size={12} />
                      </a>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">{comp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F59E0B]/15">
                <h4 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mb-2.5 font-mono2">Connect Online</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: Instagram, href: 'https://www.instagram.com/balaa.xx', label: 'Instagram', color: '#E4405F' },
                    { icon: Youtube, href: 'https://www.youtube.com/@Balsplayzz2005', label: 'YouTube', color: '#FF0000' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/balamurugan-c-5507b82a3', label: 'LinkedIn', color: '#0A66C2' },
                    { icon: Github, href: 'https://github.com/Balamurugan0113', label: 'GitHub', color: '#E2E8F0' },
                  ].map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl glass hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 group hover:border-[#F59E0B]/40"
                    >
                      <Icon size={16} style={{ color }} className="group-hover:scale-110 transition-transform" />
                      <span className="text-[9px] font-medium text-[#94A3B8] group-hover:text-white">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Card3DTilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
