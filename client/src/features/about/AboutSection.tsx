import { motion } from 'framer-motion';
import { GraduationCap, Target, Shield, Brain, Gamepad2, Trophy, Github, Linkedin, Youtube, Instagram } from 'lucide-react';
import { STATS } from '@/types';

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
    school: 'Shri Nehru Vidyalaya Matriculation Higher Secondary School',
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
  { icon: '🤾', title: 'Handball Player', desc: 'Since school days' },
  { icon: '🎮', title: 'PC Gaming', desc: 'Valorant, GTA 5, Strategy games' },
  { icon: '📱', title: 'Mobile Gaming', desc: 'Casual & competitive gaming' },
  { icon: '💼', title: 'Freelancer', desc: 'Web and security project delivery' },
  { icon: '🎓', title: 'Final Year Projects', desc: 'Supporting college students with capstone and final year project work' },
];

const COMPETITIONS = [
  { title: 'Smart India Hackathon 2025', desc: 'National level hackathon competition', url: 'https://www.sih.gov.in/' },
  { title: 'Trisquadathon 2024', desc: 'CSE Association technical event', url: 'https://trisquadathon.infomeister.co.in/' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="About me">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4F8CFF]">About</p>
          <h2 className="heading-lg gradient-primary mt-2">About Me</h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            A dedicated academic and research journey in Artificial Intelligence, Machine Learning, and systems security.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-primary mb-1">{stat.value}</div>
              <div className="text-xs text-[#94A3B8]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              className="glass-card rounded-2xl p-6 sm:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 flex items-center justify-center">
                  <GraduationCap size={18} className="text-[#4F8CFF]" />
                </div>
                <h3 className="heading-sm">My Journey</h3>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-8">
                4th year B.Tech student in AI & Data Science with a passion for building secure machine
                learning systems and conducting security audits. I focus on defensive security research
                and engineering resilient data-driven applications.
              </p>
              <div className="space-y-6">
                {EDUCATION.map((edu) => (
                  <div key={edu.title} className="relative pl-6 border-l border-[rgba(79,140,255,0.15)]">
                    <div className={`absolute left-[-4.5px] top-1 w-2 h-2 rounded-full ${edu.active ? 'bg-[#4F8CFF]' : 'bg-[rgba(79,140,255,0.3)]'}`} />
                    <p className="text-xs font-semibold text-[#4F8CFF]">{edu.period}</p>
                    <p className="text-sm font-semibold text-white mt-1">{edu.title}</p>
                    <p className="text-xs text-[#94A3B8] font-medium mt-0.5">{edu.school}</p>
                    <p className="text-xs text-[#94A3B8]">{edu.location}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-card rounded-2xl p-6 sm:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center">
                  <Gamepad2 size={18} className="text-[#00D9FF]" />
                </div>
                <h3 className="heading-sm">Beyond Coding</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BEYOND_CODING.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(79,140,255,0.03)] border border-[rgba(79,140,255,0.06)]">
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-[#94A3B8] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <motion.div
              className="glass-card rounded-2xl p-6 sm:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                  <Target size={18} className="text-[#8B5CF6]" />
                </div>
                <h3 className="heading-sm">Mission & Vision</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                    <Shield size={14} className="text-[#4F8CFF]" /> Mission
                  </p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Build secure, data-driven ML systems with defensive certainty through rigorous security audits.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                    <Brain size={14} className="text-[#00D9FF]" /> Vision
                  </p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Establish safe intelligent networks and help organizations navigate AI security threats with confidence.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-card rounded-2xl p-6 sm:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={3}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center">
                  <Trophy size={18} className="text-[#F59E0B]" />
                </div>
                <h3 className="heading-sm">Competitions</h3>
              </div>
              <div className="space-y-4">
                {COMPETITIONS.map((comp) => (
                  <div key={comp.title} className="p-4 rounded-xl bg-[rgba(79,140,255,0.03)] border border-[rgba(79,140,255,0.06)]">
                    <a href={comp.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#4F8CFF] hover:underline">
                      {comp.title}
                    </a>
                    <p className="text-xs text-[#94A3B8] mt-1">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-card rounded-2xl p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={4}
            >
              <h3 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">Social</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/balaa.xx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D', label: 'Instagram', color: '#E4405F' },
                  { icon: Youtube, href: 'https://www.youtube.com/@Balsplayzz2005', label: 'YouTube', color: '#FF0000' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/balamurugan-c-5507b82a3', label: 'LinkedIn', color: '#0A66C2' },
                  { icon: Github, href: 'https://github.com/Balamurugan0113', label: 'GitHub', color: '#FFFFFF' },
                ].map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[rgba(79,140,255,0.03)] border border-[rgba(79,140,255,0.06)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:shadow-lg"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon size={16} style={{ color }} className="transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-medium text-[#94A3B8] group-hover:text-white transition-colors">{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
