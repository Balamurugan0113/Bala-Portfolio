import { motion } from 'framer-motion';
import { GraduationCap, Target, Shield, Brain, Gamepad2, Trophy, Github, Linkedin, Youtube, Instagram, Award, Sparkles } from 'lucide-react';
import { STATS } from '@/types';
import Card3DTilt from '@/components/ui/Card3DTilt';

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

export default function AboutSection() {
  return (
    <section id="about" className="relative section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="About me">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B5CF6] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" /> Profile & Background
          </p>
          <h2 className="heading-lg gradient-primary mt-2">About Me</h2>
          <p className="text-body max-w-2xl mx-auto mt-3 text-sm text-[#94A3B8]">
            Hi, I'm Balamurugan C. I specialize in Ethical Hacking, developing robust Machine Learning pipelines, performing statistical data analytics, and hardening modern intelligent infrastructure.
          </p>
        </motion.div>

        {/* FULL-WIDTH BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">

          {/* STATS MATRIX (12 COLS) */}
          <div className="md:col-span-2 lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <Card3DTilt key={stat.label} maxTilt={8} className="glass p-5 text-center border border-[rgba(139,92,246,0.2)] shadow-md">
                <div className="text-3xl font-extrabold gradient-primary font-mono">{stat.value}</div>
                <div className="text-xs text-[#94A3B8] font-medium mt-1">{stat.label}</div>
              </Card3DTilt>
            ))}
          </div>

          {/* ACADEMIC JOURNEY (6 COLS) */}
          <Card3DTilt maxTilt={5} className="md:col-span-1 lg:col-span-6 glass-card p-6 sm:p-8 border border-[rgba(139,92,246,0.2)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="heading-sm text-white">Academic Journey</h3>
                  <p className="text-[11px] text-[#94A3B8]">AI & Data Science Specialization</p>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                Pursuing B.Tech in Artificial Intelligence & Data Science (Final Year). Specialized in Ethical Hacking, building machine learning classification & regression models, exploratory data analytics (EDA), and full-stack REST API web platforms.
              </p>

              <div className="space-y-5">
                {EDUCATION.map((edu) => (
                  <div key={edu.title} className="relative pl-5 border-l-2 border-[rgba(139,92,246,0.3)]">
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${edu.active ? 'bg-[#8B5CF6] shadow-lg shadow-[#8B5CF6]' : 'bg-[#94A3B8]/30'}`} />
                    <span className="text-[10px] font-mono font-bold text-[#8B5CF6] uppercase tracking-wider">{edu.period}</span>
                    <h4 className="text-xs font-bold text-white mt-0.5">{edu.title}</h4>
                    <p className="text-[11px] text-[#94A3B8]">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card3DTilt>

          {/* ENGINEERING VISION & MISSION (6 COLS) */}
          <Card3DTilt maxTilt={5} className="md:col-span-1 lg:col-span-6 glass-card p-6 sm:p-8 border border-[rgba(139,92,246,0.2)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/15 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF]">
                  <Target size={20} />
                </div>
                <h3 className="heading-sm text-white">Engineering Vision</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[rgba(139,92,246,0.06)] border border-[rgba(139,92,246,0.15)]">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-1.5">
                    <Shield size={14} className="text-[#8B5CF6]" /> Primary Focus: Ethical Hacking & Security
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Performing penetration testing, web application security auditing, API vulnerability assessments, and proactive network defense.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[rgba(0,217,255,0.06)] border border-[rgba(0,217,255,0.15)]">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-1.5">
                    <Brain size={14} className="text-[#00D9FF]" /> Python Data Science & ML Pipelines
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Developing automated Python data preprocessing scripts, feature extraction, and supervised machine learning classification models.
                  </p>
                </div>
              </div>
            </div>
          </Card3DTilt>

          {/* BEYOND CODING (6 COLS) */}
          <Card3DTilt maxTilt={5} className="md:col-span-1 lg:col-span-6 glass-card p-6 border border-[rgba(139,92,246,0.2)]">
            <div className="flex items-center gap-2.5 mb-4">
              <Gamepad2 size={18} className="text-[#8B5CF6]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Beyond Coding</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BEYOND_CODING.map((item) => (
                <div key={item.title} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-xs font-bold text-white">{item.icon} {item.title}</span>
                  <p className="text-[10px] text-[#94A3B8] mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card3DTilt>

          {/* COMPETITIONS & SOCIALS (6 COLS) */}
          <Card3DTilt maxTilt={5} className="md:col-span-1 lg:col-span-6 glass-card p-6 border border-[rgba(139,92,246,0.2)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Trophy size={18} className="text-[#F59E0B]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Competitions & Hackathons</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {COMPETITIONS.map((comp) => (
                  <div key={comp.title} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <a href={comp.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#8B5CF6] hover:underline flex items-center gap-1">
                      {comp.title} <Award size={12} />
                    </a>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-4 border-t border-[rgba(139,92,246,0.15)]">
              <h4 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2.5">Connect Online</h4>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/balaa.xx', label: 'Instagram', color: '#E4405F' },
                  { icon: Youtube, href: 'https://www.youtube.com/@Balsplayzz2005', label: 'YouTube', color: '#FF0000' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/balamurugan-c-5507b82a3', label: 'LinkedIn', color: '#0A66C2' },
                  { icon: Github, href: 'https://github.com/Balamurugan0113', label: 'GitHub', color: '#FFFFFF' },
                ].map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl glass hover:scale-105 transition-all duration-200 group"
                  >
                    <Icon size={16} style={{ color }} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-medium text-[#94A3B8] group-hover:text-white">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Card3DTilt>

        </div>
      </div>
    </section>
  );
}
