import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Target, 
  Shield, 
  Brain, 
  Terminal, 
  Code, 
  Crosshair, 
  Zap, 
  Sparkles,
  Bot
} from 'lucide-react';
import Card3DTilt from '@/components/ui/Card3DTilt';

const TECHNICAL_INTERESTS = [
  'Vibe Coding',
  'Agentic AI Workflows',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Python Automation',
  'Cybersecurity',
  'Ethical Hacking',
  'Web Development',
  'FastAPI & Microservices',
  'Computer Vision',
  'NLP & LLMs',
  'Cloud Infrastructure'
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-[#050508] py-10 sm:py-24 px-3 sm:px-6 overflow-hidden" aria-label="About me">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[80vw] h-[300px] sm:h-[400px] bg-gradient-to-b from-[#F59E0B]/8 to-transparent blur-[70px] sm:blur-[100px] rounded-full z-0" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* SECTION HEADER / INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center text-center mb-6 sm:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-[#F59E0B]/30 mb-2 sm:mb-3 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
            <Sparkles size={11} className="text-[#F59E0B]" />
            <span className="text-[9px] sm:text-xs font-bold text-[#F59E0B] tracking-[0.2em] uppercase font-mono">
              Profile Briefing
            </span>
          </div>

          <h2 className="heading-lg font-black uppercase font-['Syne'] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFBEB] to-[#F59E0B]">
            About Me
          </h2>

          <div className="mt-3 sm:mt-5 text-xs sm:text-base text-[#94A3B8] max-w-3xl leading-relaxed space-y-2 sm:space-y-3 font-medium px-2">
            <p>
              I am <strong className="text-white">Balamurugan C</strong>, a final-year B.Tech engineer in Artificial Intelligence and Data Science. I bridge machine learning and cybersecurity with high-velocity <span className="text-[#F59E0B] font-semibold underline decoration-[#F59E0B]/40 underline-offset-4">Vibe Coding</span> — rapidly transforming conceptual architectures into production systems.
            </p>
            <p className="text-[11px] sm:text-sm text-[#94A3B8]/90">
              By pairing deep technical intuition with autonomous agentic tools and LLM orchestration, I deliver full-stack MVPs, perform security audits, and engineer scalable AI pipelines with unmatched development velocity.
            </p>
          </div>
        </motion.div>

        {/* COMPACT RESPONSIVE GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 items-stretch">
          
          {/* ENGINEERING & VIBE FOCUS */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <Card3DTilt maxTilt={3} className="h-full glass-card p-3.5 sm:p-6 border border-[#F59E0B]/20 rounded-xl sm:rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(245,158,11,0.03)_50%,transparent_75%)] bg-[length:20px_20px]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                      <Target size={16} />
                    </div>
                    <h3 className="text-xs sm:text-base font-bold text-white uppercase tracking-wider font-mono">Core Focus</h3>
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full border border-[#F59E0B]/25">
                    Full Spectrum
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#F59E0B]/30 transition-colors">
                    <Zap className="text-[#F59E0B] shrink-0" size={14} />
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold text-white leading-none">Vibe Coding</div>
                      <div className="text-[8px] sm:text-[9px] text-[#94A3B8] font-mono mt-0.5">Rapid Prototyping</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#F59E0B]/30 transition-colors">
                    <Brain className="text-[#F97316] shrink-0" size={14} />
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold text-white leading-none">AI &amp; ML</div>
                      <div className="text-[8px] sm:text-[9px] text-[#94A3B8] font-mono mt-0.5">Deep Learning &amp; CV</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#F59E0B]/30 transition-colors">
                    <Shield className="text-[#10B981] shrink-0" size={14} />
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold text-white leading-none">Cybersecurity</div>
                      <div className="text-[8px] sm:text-[9px] text-[#94A3B8] font-mono mt-0.5">Penetration Testing</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#F59E0B]/30 transition-colors">
                    <Code className="text-[#3B82F6] shrink-0" size={14} />
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold text-white leading-none">Software Eng</div>
                      <div className="text-[8px] sm:text-[9px] text-[#94A3B8] font-mono mt-0.5">Full-Stack APIs</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[9px] sm:text-[10px] text-[#94A3B8] font-mono">
                <span className="flex items-center gap-1 text-[#F59E0B]">
                  <Bot size={11} /> Agentic developer workflow
                </span>
                <span>Speed + Precision</span>
              </div>
            </Card3DTilt>
          </motion.div>

          {/* CURRENTLY & GOALS (COMPACT ON MOBILE) */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2.5 sm:gap-4"
          >
            {/* CURRENT STATUS */}
            <Card3DTilt maxTilt={3} className="glass-card p-3 sm:p-4 border border-white/10 rounded-xl sm:rounded-2xl shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981]" />
              <div className="flex items-center justify-between pl-1">
                <div>
                  <span className="text-[8px] sm:text-[9px] font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" /> Active Standing
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <GraduationCap size={15} className="text-[#94A3B8] shrink-0" />
                    Final-Year B.Tech AI &amp; Data Science
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/25 hidden xs:inline-block">
                  Class of 2026
                </span>
              </div>
            </Card3DTilt>

            {/* PHILOSOPHY & GOAL */}
            <Card3DTilt maxTilt={3} className="glass-card p-3 sm:p-5 border border-[#F59E0B]/20 rounded-xl sm:rounded-2xl shadow-md bg-gradient-to-br from-[#F59E0B]/5 to-transparent relative overflow-hidden flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-bold text-[#F59E0B] uppercase tracking-wider mb-1">
                <Crosshair size={12} /> Mission Statement
              </div>
              <h3 className="text-[11px] sm:text-sm font-medium text-white/95 leading-relaxed italic">
                &ldquo;Mastering the art of Vibe Coding to engineer secure, production-grade AI systems at the intersection of machine learning and defensive cybersecurity.&rdquo;
              </h3>
            </Card3DTilt>
          </motion.div>

          {/* TECHNICAL INTERESTS CLOUD (COMPACT) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="glass-card p-3 sm:p-5 border border-white/10 rounded-xl sm:rounded-2xl shadow-lg flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-4">
                <Terminal size={14} className="text-[#F59E0B]" />
                <h3 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-widest font-mono">
                  Technical Interests &amp; Methodologies
                </h3>
              </div>
              
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {TECHNICAL_INTERESTS.map((interest, idx) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg glass border border-white/10 text-[9px] sm:text-xs font-semibold text-[#94A3B8] hover:text-white hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-all cursor-default"
                  >
                    {interest}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
