import { useRef, useCallback, Component, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FileText, FolderKanban, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO } from '@/types';
import creatorImg from '@/assets/standing_creator.png';
import { soundFx } from '@/lib/sound';
import { Typewriter } from './Typewriter';
import HeroScene from '@/components/three/HeroScene';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import TechIcon from '@/components/ui/TechIcon';

/** Keeps the hero alive if WebGL is unavailable — the 3D layer simply doesn't render. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    // WebGL unsupported / context creation failed — degrade gracefully
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const ROLES = [
  'AI & Data Science Engineer',
  'Ethical Hacker · Security Researcher',
  'Machine Learning Engineer',
  'Full-Stack Developer',
];

const HERO_TECH = [
  { name: 'Python 3.11', label: 'Core Language', left: '3%', duration: 14, delay: 0 },
  { name: 'PyTorch ML', label: 'Deep Learning', left: '82%', duration: 16, delay: 2.5 },
  { name: 'Ethical Hacking', label: 'NIDS Security', left: '11%', duration: 12, delay: 4.5 },
  { name: 'FastAPI', label: 'REST Backend', left: '73%', duration: 15, delay: 1.2 },
  { name: 'PostgreSQL', label: 'Database', left: '22%', duration: 17, delay: 6 },
  { name: 'React.js', label: 'Web App', left: '88%', duration: 13, delay: 3.4 },
  { name: 'OpenCV', label: 'Computer Vision', left: '32%', duration: 15, delay: 5.2 },
  { name: 'Pen Testing', label: 'Security Audits', left: '62%', duration: 12.5, delay: 7.5 },
  { name: 'SIH Finalist', label: 'Hackathon', left: '7%', duration: 16, delay: 8.5 },
  { name: 'TensorFlow', label: 'CNN · LSTM', left: '79%', duration: 13.5, delay: 9.5 },
];

const stagger = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { tier, reducedMotion } = useDeviceTier();

  // Pointer parallax (shared with the 3D scene)
  const pointerRef = useRef({ x: 0, y: 0 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 18, mass: 0.8 };
  const smx = useSpring(mx, springCfg);
  const smy = useSpring(my, springCfg);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      pointerRef.current = { x: nx * 2, y: ny * 2 };
      mx.set(nx * 2);
      my.set(ny * 2);
    },
    [mx, my]
  );

  // Depth parallax factors per layer (desktop strength)
  const watermarkX = useTransform(smx, (v) => v * 26);
  const watermarkY = useTransform(smy, (v) => v * 14);
  const chipsX = useTransform(smx, (v) => v * 12);
  const chipsY = useTransform(smy, (v) => v * 8);
  const ringsX = useTransform(smx, (v) => v * -10);
  const ringsY = useTransform(smy, (v) => v * -7);
  const portraitX = useTransform(smx, (v) => v * 7);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -36]);

  const openResume = () => {
    soundFx.playClick();
    window.open(PERSONAL_INFO.resumeUrl, '_blank');
  };

  const scrollTo = (id: string) => {
    soundFx.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onPointerMove={handlePointerMove}
      className="relative min-h-dvh flex flex-col overflow-hidden bg-[#050508] pt-20 sm:pt-24 pb-8"
      aria-label="Introduction"
    >
      {/* ---------- Layer 0 · grid + atmosphere ---------- */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70 z-0" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[460px] bg-[#F59E0B]/10 blur-[110px] rounded-full z-0" />
      <div className="pointer-events-none absolute top-1/2 right-1/5 translate-x-1/2 -translate-y-1/2 w-[480px] h-[420px] bg-[#F97316]/8 blur-[110px] rounded-full z-0" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] bg-[#F59E0B]/6 blur-[90px] rounded-full z-0" />

      {/* ---------- Layer 1 · WebGL AI core (behind portrait) ---------- */}
      <motion.div
        className="absolute inset-x-0 top-16 sm:top-10 bottom-0 z-[5]"
        style={{ opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
      >
        <SceneBoundary>
          <HeroScene tier={tier} reducedMotion={reducedMotion} pointerRef={pointerRef} />
        </SceneBoundary>
      </motion.div>

      {/* ---------- Layer 2 · HUD rings + reticle ---------- */}
      <motion.div
        style={{ x: ringsX, y: ringsY, opacity: heroOpacity }}
        className="pointer-events-none absolute inset-0 z-[6] hidden sm:block"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-[520px] h-[520px] lg:w-[640px] lg:h-[640px] rounded-full border border-dashed border-[#F59E0B]/15 animate-[spin_52s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-[360px] h-[360px] lg:w-[440px] lg:h-[440px] rounded-full border border-dotted border-[#22D3EE]/12 animate-[spin-rev_38s_linear_infinite]" />
        {/* reticle corners around the core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-[440px] h-[440px] lg:w-[540px] lg:h-[540px]">
          {['top-0 left-0 border-t-2 border-l-2 rounded-tl-xl', 'top-0 right-0 border-t-2 border-r-2 rounded-tr-xl', 'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl', 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl'].map((pos) => (
            <span key={pos} className={`absolute w-8 h-8 border-[#F59E0B]/30 ${pos}`} />
          ))}
          {/* scanning beam */}
          {!reducedMotion && (
            <div className="absolute inset-x-6 top-1/2 h-10 -translate-y-1/2 overflow-visible">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent animate-scan" />
            </div>
          )}
        </div>
      </motion.div>

      {/* ---------- Layer 3 · rising tech chips (desktop) ---------- */}
      <motion.div
        style={{ x: chipsX, y: chipsY, opacity: heroOpacity }}
        className="hidden lg:block pointer-events-none absolute inset-0 z-[8] overflow-hidden"
        aria-hidden="true"
      >
        {HERO_TECH.map((tech) => (
          <motion.div
            key={tech.name}
            initial={{ y: '105vh', opacity: 0 }}
            animate={reducedMotion ? { y: '-10vh', opacity: [0, 0.9, 0.9, 0] } : { y: '-18vh', opacity: [0, 0.95, 0.95, 0] }}
            transition={{ duration: tech.duration, repeat: Infinity, ease: 'linear', delay: tech.delay }}
            style={{ left: tech.left }}
            className="absolute z-10"
          >
            <div className="pointer-events-auto glass-strong rounded-2xl border border-white/12 shadow-2xl flex items-center gap-2.5 px-3 py-2 backdrop-blur-md hover:scale-105 hover:border-[#F59E0B]/50 transition-transform duration-300 cursor-default">
              <TechIcon name={tech.name} size="sm" />
              <div className="text-left leading-tight">
                <div className="text-[11px] font-extrabold text-white font-mono2 uppercase tracking-wider">{tech.name}</div>
                <div className="text-[9px] text-[#94A3B8] font-medium">{tech.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ---------- Layer 4 · gold watermark ---------- */}
      <motion.div
        style={{ x: watermarkX, y: watermarkY, opacity: heroOpacity }}
        className="pointer-events-none absolute inset-0 hidden sm:flex items-center justify-between px-10 md:px-24 lg:px-32 max-w-[1600px] mx-auto z-[7] select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[clamp(4rem,13vw,15rem)] uppercase tracking-tighter leading-none gradient-hero opacity-[0.16] filter drop-shadow-[0_20px_50px_rgba(245,158,11,0.25)]">
          BA
        </span>
        <span className="font-display font-black text-[clamp(4rem,13vw,15rem)] uppercase tracking-tighter leading-none gradient-hero opacity-[0.16] filter drop-shadow-[0_20px_50px_rgba(245,158,11,0.25)]">
          LA
        </span>
      </motion.div>

      {/* ---------- Layer 5 · portrait (visual focus) ---------- */}
      <motion.div
        style={{ x: portraitX, scale: heroScale }}
        className="absolute bottom-0 inset-x-0 z-10 flex justify-center pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[34vh] min-h-[220px] sm:h-[52vh] md:h-[62vh] lg:h-[68vh] max-h-[640px] w-auto flex items-end justify-center"
        >
          {/* Amber rim light behind the subject */}
          <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[70%] h-[55%] bg-[#F59E0B]/15 blur-[70px] rounded-full" />
          <img
            src={creatorImg}
            alt="Balamurugan C — AI & Data Science Engineer"
            fetchPriority="high"
            decoding="async"
            className="h-full w-auto object-contain object-bottom filter contrast-[1.08] saturate-[1.05] brightness-[1.02] drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
          />
          {/* grounding fade */}
          <div className="absolute inset-x-[-10vw] bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* ---------- Layer 6 · content stack ---------- */}
      <motion.div
        style={{ opacity: heroOpacity, y: contentY }}
        className="relative z-30 flex flex-col items-center text-center px-4 flex-1"
      >
        {/* badge */}
        <motion.div variants={stagger} initial="hidden" animate="visible" custom={0}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#F59E0B]/30 shadow-[0_0_24px_-8px_rgba(245,158,11,0.4)]"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-100 tracking-[0.18em] uppercase font-mono2">
            B.Tech AI &amp; Data Science
          </span>
        </motion.div>

        {/* name */}
        <motion.h1
          variants={stagger} initial="hidden" animate="visible" custom={1}
          className="font-display font-extrabold uppercase tracking-tight gradient-hero leading-[0.95] mt-4 sm:mt-5 text-balance
                     text-[clamp(1.85rem,7.5vw,4.6rem)] sm:text-[clamp(2.6rem,7vw,5.6rem)] lg:text-[clamp(3rem,6.5vw,6.4rem)]
                     filter drop-shadow-[0_10px_40px_rgba(245,158,11,0.22)]"
        >
          Balamurugan C
        </motion.h1>

        {/* typewriter roles */}
        <motion.div
          variants={stagger} initial="hidden" animate="visible" custom={2}
          className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-200 font-semibold tracking-wide"
        >
          <Typewriter texts={ROLES} />
        </motion.div>

        {/* tagline */}
        <motion.p
          variants={stagger} initial="hidden" animate="visible" custom={3}
          className="mt-3 sm:mt-4 text-[12.5px] sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed"
        >
          Specializing in Ethical Hacking, Machine Learning pipelines, and robust data-driven applications —
          engineering intelligent systems that are secure by design.
        </motion.p>

        {/* mobile tech pills */}
        <motion.div
          variants={stagger} initial="hidden" animate="visible" custom={4}
          className="flex flex-wrap justify-center gap-2 mt-5 max-w-sm lg:hidden"
        >
          {['Ethical Hacking', 'PyTorch ML', 'FastAPI', 'PostgreSQL'].map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-lg glass border border-[#F59E0B]/25 text-[#FBBF24] font-mono2">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA row — sits over the portrait's lower third on tall screens */}
        <motion.div
          variants={stagger} initial="hidden" animate="visible" custom={5}
          className="mt-auto pt-6 sm:pt-8 mb-16 sm:mb-14 flex flex-col items-center gap-3 w-full"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={() => scrollTo('projects')} className="rounded-2xl px-7 min-w-[148px]">
              <FolderKanban size={17} />
              View Projects
            </Button>
            <Button size="lg" variant="glass" onClick={() => scrollTo('contact')} className="rounded-2xl px-7 min-w-[148px]">
              <Mail size={17} className="text-[#F59E0B]" />
              Get in Touch
            </Button>
          </div>
          {/* Mobile resume CTA */}
          <Button size="lg" variant="outline" onClick={openResume} className="rounded-2xl px-7 sm:hidden w-full">
            <FileText size={17} /> View Resume
          </Button>
        </motion.div>
      </motion.div>

      {/* ---------- Layer 7 · HUD corners ---------- */}
      <motion.div style={{ opacity: heroOpacity }} className="hidden md:block pointer-events-none absolute inset-0 z-[15]" aria-hidden="true">
        <div className="absolute top-24 left-6 lg:left-10 flex items-center gap-2 text-[10px] font-mono2 text-[#94A3B8]/70 tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
          SYS.CORE // ONLINE
        </div>
        <div className="absolute top-24 right-6 lg:right-10 flex items-center gap-2 text-[10px] font-mono2 text-[#94A3B8]/70 tracking-widest">
          <MapPin size={11} className="text-[#F59E0B]/70" />
          {PERSONAL_INFO.location.toUpperCase()} · IN
        </div>
        <div className="absolute bottom-24 left-6 lg:left-10 text-[10px] font-mono2 text-[#94A3B8]/70 tracking-widest">
          <span className="text-emerald-400/90">●</span> {PERSONAL_INFO.availability.toUpperCase()}
        </div>
      </motion.div>

      {/* ---------- Layer 8 · bottom HUD bar ---------- */}
      <motion.div style={{ opacity: heroOpacity }} className="relative z-20 mt-4 hidden sm:flex items-end justify-between gap-4 px-4 sm:px-8">
        {/* scroll cue */}
        <button
          onClick={() => scrollTo('about')}
          className="hidden sm:flex flex-col items-center gap-2 mx-auto group"
          aria-label="Scroll to About section"
        >
          <span className="text-[9px] font-mono2 tracking-[0.3em] text-[#94A3B8]/70 group-hover:text-[#F59E0B] transition-colors">SCROLL</span>
          <span className="relative w-px h-10 overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-4 scroll-cue-line animate-[scan_2.2s_ease-in-out_infinite]" />
          </span>
        </button>
        {/* desktop resume button (existing corner position) */}
        <div className="hidden sm:block absolute bottom-0 right-0">
          <Button size="lg" variant="glass" onClick={openResume} className="rounded-2xl px-6 py-5 group">
            <FileText size={17} className="text-[#F59E0B] group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">Resume</span>
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
          </Button>
        </div>
      </motion.div>

      {/* ---------- bottom fade into next section ---------- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-b from-transparent via-[#050508]/70 to-[#050508] z-20" />
    </section>
  );
}
