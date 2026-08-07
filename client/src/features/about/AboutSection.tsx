import { motion } from 'framer-motion';
import { GraduationCap, Target, Shield, Brain, Gamepad2, Trophy, Github, Linkedin, Youtube, Instagram, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { STATS, PERSONAL_INFO } from '@/types';
import Card3DTilt from '@/components/ui/Card3DTilt';
import profilePic from '@/assets/balamurugan.png';

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
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4F8CFF] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#4F8CFF]" /> Profile & Background
          </p>
          <h2 className="heading-lg gradient-primary mt-2">About Me</h2>
          <p className="text-body max-w-2xl mx-auto mt-3 text-sm text-[#94A3B8]">
            4th-year AI & Data Science scholar with hands-on experience in machine learning pipelines, automated data preprocessing, and web applications.
          </p>
        </motion.div>

        {/* 2-COLUMN LAYOUT: WORDING ON LEFT, PROFILE PIC & STATS ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDE: WORDING, ACADEMIC JOURNEY, VISION, COMPETITIONS (7 COLS ON DESKTOP) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Academic Journey */}
            <Card3DTilt maxTilt={5} className="glass-card p-6 sm:p-8 border border-[rgba(79,140,255,0.12)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 flex items-center justify-center text-[#4F8CFF]">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="heading-sm text-white">Academic Journey</h3>
                  <p className="text-[11px] text-[#94A3B8]">AI & Data Science Specialization</p>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                Pursuing B.Tech in Artificial Intelligence & Data Science (Final Year). Experienced in building machine learning classification & regression models, exploratory data analytics (EDA), and full-stack REST API applications.
              </p>

              <div className="space-y-5">
                {EDUCATION.map((edu) => (
                  <div key={edu.title} className="relative pl-5 border-l-2 border-[rgba(79,140,255,0.2)]">
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${edu.active ? 'bg-[#4F8CFF] shadow-lg shadow-[#4F8CFF]' : 'bg-[#94A3B8]/30'}`} />
                    <span className="text-[10px] font-mono font-bold text-[#4F8CFF] uppercase tracking-wider">{edu.period}</span>
                    <h4 className="text-xs font-bold text-white mt-0.5">{edu.title}</h4>
                    <p className="text-[11px] text-[#94A3B8]">{edu.school}</p>
                  </div>
                ))}
              </div>
            </Card3DTilt>

            {/* Engineering Vision & Mission */}
            <Card3DTilt maxTilt={5} className="glass-card p-6 sm:p-8 border border-[rgba(79,140,255,0.12)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/15 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF]">
                  <Target size={20} />
                </div>
                <h3 className="heading-sm text-white">Engineering Vision</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[rgba(79,140,255,0.04)] border border-[rgba(79,140,255,0.08)]">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-1.5">
                    <Shield size={14} className="text-[#4F8CFF]" /> End-to-End Data Science Pipelines
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Engineering automated Python data preprocessing, feature extraction, and supervised ML classification/regression models.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[rgba(0,217,255,0.04)] border border-[rgba(0,217,255,0.08)]">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-1.5">
                    <Brain size={14} className="text-[#00D9FF]" /> Real-Time Full Stack Applications
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Building responsive React web portals integrated with FastAPI, PostgreSQL databases, and real-time AI capabilities.
                  </p>
                </div>
              </div>
            </Card3DTilt>

            {/* Beyond Coding & Competitions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card3DTilt maxTilt={6} className="glass-card p-6 border border-[rgba(79,140,255,0.12)]">
                <div className="flex items-center gap-2.5 mb-4">
                  <Gamepad2 size={18} className="text-[#8B5CF6]" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Beyond Coding</h3>
                </div>
                <div className="space-y-2.5">
                  {BEYOND_CODING.slice(0, 2).map((item) => (
                    <div key={item.title} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-xs font-bold text-white">{item.icon} {item.title}</span>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Card3DTilt>

              <Card3DTilt maxTilt={6} className="glass-card p-6 border border-[rgba(79,140,255,0.12)]">
                <div className="flex items-center gap-2.5 mb-4">
                  <Trophy size={18} className="text-[#F59E0B]" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Competitions</h3>
                </div>
                <div className="space-y-2.5">
                  {COMPETITIONS.map((comp) => (
                    <div key={comp.title} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <a href={comp.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#4F8CFF] hover:underline flex items-center gap-1">
                        {comp.title} <Award size={12} />
                      </a>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">{comp.desc}</p>
                    </div>
                  ))}
                </div>
              </Card3DTilt>
            </div>

          </div>

          {/* RIGHT SIDE: PROFILE PICTURE CARD, QUICK STATS & SOCIALS (5 COLS ON DESKTOP) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">

            {/* PROMINENT PROFILE CARD */}
            <Card3DTilt maxTilt={8} className="glass-card p-3 border-2 border-[rgba(79,140,255,0.2)] shadow-2xl shadow-[#4F8CFF]/10">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-h-[420px]">
                <img
                  src={profilePic}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 glass-strong p-4 rounded-xl text-center border border-[rgba(79,140,255,0.2)]">
                  <div className="font-bold text-base text-white flex items-center justify-center gap-1.5">
                    {PERSONAL_INFO.name} <ShieldCheck size={16} className="text-[#10B981]" />
                  </div>
                  <div className="text-xs text-[#4F8CFF] font-mono font-semibold uppercase mt-0.5">
                    B.Tech AI & Data Science (Final Year)
                  </div>
                  <p className="text-[10px] text-[#94A3B8] mt-1">Coimbatore, Tamil Nadu</p>
                </div>
              </div>
            </Card3DTilt>

            {/* QUICK STATS MATRIX */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat) => (
                <Card3DTilt key={stat.label} maxTilt={8} className="glass p-4 text-center border border-[rgba(79,140,255,0.12)]">
                  <div className="text-2xl font-extrabold gradient-primary font-mono">{stat.value}</div>
                  <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">{stat.label}</div>
                </Card3DTilt>
              ))}
            </div>

            {/* CONNECT SOCIALS */}
            <Card3DTilt maxTilt={6} className="glass-card p-5 border border-[rgba(79,140,255,0.12)]">
              <h4 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3 text-center">Connect Online</h4>
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
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl glass hover:scale-105 transition-all duration-200 group"
                  >
                    <Icon size={16} style={{ color }} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-medium text-[#94A3B8] group-hover:text-white">{label}</span>
                  </a>
                ))}
              </div>
            </Card3DTilt>

          </div>

        </div>
      </div>
    </section>
  );
}
