import { motion } from 'framer-motion';
import { GraduationCap, Target, Shield, Brain, Terminal, Code, Database, Crosshair } from 'lucide-react';
import Card3DTilt from '@/components/ui/Card3DTilt';

const TECHNICAL_INTERESTS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Python Development',
  'Cybersecurity',
  'Ethical Hacking',
  'Web Development',
  'API Development',
  'Computer Vision',
  'NLP',
  'Cloud & Infrastructure'
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-[#050508] py-14 sm:py-28 px-4 sm:px-6" aria-label="About me">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-gradient-to-b from-[#F59E0B]/5 to-transparent blur-[80px] sm:blur-[100px] rounded-full z-0" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* SECTION HEADER / INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="w-full flex flex-col items-center text-center mb-8 sm:mb-14"
        >
          <h2 className="heading-lg font-black uppercase font-['Syne'] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFFBEB] to-[#F59E0B]">
            About Me
          </h2>
          <p className="mt-4 sm:mt-6 text-xs sm:text-base text-[#94A3B8] max-w-3xl leading-relaxed font-medium">
            I am Balamurugan C, a final-year B.Tech student specializing in Artificial Intelligence and Data Science.
            I build intelligent systems combining machine learning, data science, software engineering, and cybersecurity.
          </p>
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-[#94A3B8] max-w-3xl leading-relaxed font-medium">
            I enjoy taking an idea from technical concept to production — designing architectures, training models, and building secure systems.
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          
          {/* ENGINEERING FOCUS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <Card3DTilt maxTilt={3} className="h-full glass-card p-5 sm:p-7 border border-[#F59E0B]/20 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.05)] relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(245,158,11,0.03)_50%,transparent_75%)] bg-[length:20px_20px]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                    <Target size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">Engineering Focus</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 mt-3 sm:mt-4">
                  <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                    <Brain className="text-[#F97316] shrink-0" size={16} />
                    <span className="text-xs sm:text-sm font-semibold text-white">AI / ML</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                    <Database className="text-[#06B6D4] shrink-0" size={16} />
                    <span className="text-xs sm:text-sm font-semibold text-white">Data Science</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                    <Shield className="text-[#F59E0B] shrink-0" size={16} />
                    <span className="text-xs sm:text-sm font-semibold text-white">Cybersecurity</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                    <Code className="text-[#3B82F6] shrink-0" size={16} />
                    <span className="text-xs sm:text-sm font-semibold text-white">Software Eng</span>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          </motion.div>

          {/* CURRENTLY & GOALS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4 sm:gap-6"
          >
            {/* CURRENTLY */}
            <Card3DTilt maxTilt={3} className="glass-card p-4 sm:p-6 border border-white/10 rounded-2xl sm:rounded-3xl shadow-xl relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981] rounded-l-2xl sm:rounded-l-3xl" />
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] font-bold text-[#10B981] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" /> Currently
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 sm:gap-3">
                  <GraduationCap size={18} className="text-[#94A3B8] shrink-0" />
                  Final-year B.Tech AI & Data Science
                </h3>
              </div>
            </Card3DTilt>

            {/* GOAL */}
            <Card3DTilt maxTilt={3} className="glass-card p-4 sm:p-6 border border-[#F59E0B]/20 rounded-2xl sm:rounded-3xl shadow-xl bg-gradient-to-br from-[#F59E0B]/5 to-transparent">
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Crosshair size={13} /> Goal
                </span>
                <h3 className="text-xs sm:text-base font-bold text-white/90 leading-relaxed italic">
                  "Building practical, intelligent, and secure systems where AI, data, and secure software engineering come together."
                </h3>
              </div>
            </Card3DTilt>
          </motion.div>

          {/* TECHNICAL INTERESTS (FULL WIDTH) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2"
          >
            <div className="glass-card p-4 sm:p-7 border border-white/10 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col items-center">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Terminal size={18} className="text-[#F59E0B]" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-widest font-mono">Technical Interests</h3>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {TECHNICAL_INTERESTS.map((interest, idx) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-full glass border border-white/10 text-[10px] sm:text-xs font-semibold text-[#94A3B8] hover:text-white hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-all cursor-default"
                  >
                    {interest}
                  </motion.div>
                ))}
              </div>
              
              <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-[#94A3B8] text-center max-w-2xl">
                Continuously advancing engineering capabilities through applied ML, security labs, and full-stack software development.
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
