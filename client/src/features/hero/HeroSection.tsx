import { useRef, useCallback, Component, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO } from '@/types';
import creatorImg from '@/assets/standing_creator.png';
import { soundFx } from '@/lib/sound';
import HeroScene from '@/components/three/HeroScene';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import { useBooted } from '@/app/BootContext';
import TechIcon from '@/components/ui/TechIcon';
import HeroTypography from './HeroTypography';

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

/**
 * Two-zone hero — collision-proof by construction:
 *
 *   ┌───────────────────────────────┐  content zone (in-flow, z-20):
 *   │   label · NAME · strip ·      │  all critical text, centred,
 *   │   title · copy · CTAs         │  never overlapped
 *   ├───────────────────────────────┤
 *   │   3D core · rings · chips ·   │  visual zone (flex-1, z-0, own
 *   │   portrait · HUD              │  stacking context, clipped)
 *   └───────────────────────────────┘
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const booted = useBooted();
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

  // Depth parallax factors — visual-zone layers only (text stays rock solid)
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
      className="relative flex min-h-dvh flex-col overflow-hidden bg-[#050508]"
      aria-label="Introduction"
    >
      {/* ═══════════ ZONE A · atmosphere (behind everything) ═══════════ */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70 z-0" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[460px] bg-[#F59E0B]/10 blur-[110px] rounded-full z-0" />
      <div className="pointer-events-none absolute top-1/2 right-1/5 translate-x-1/2 -translate-y-1/2 w-[480px] h-[420px] bg-[#F97316]/8 blur-[110px] rounded-full z-0" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] bg-[#F59E0B]/6 blur-[90px] rounded-full z-0" />

      {/* ═══════════ ZONE B · content (in-flow, above all visuals) ═══════════ */}
      <motion.div
        style={{ opacity: heroOpacity, y: contentY }}
        className="relative z-20 w-full px-4 pt-20 pb-2 sm:pt-24 sm:pb-3"
      >
        <div className="hero-container mx-auto flex w-full max-w-[88rem] justify-center">
          <HeroTypography booted={booted} onNavigate={scrollTo} onOpenResume={openResume} />
        </div>
      </motion.div>

      {/* ═══════════ ZONE C · visual (flex-1, own clipped stacking context) ═══════════ */}
      <div className="relative z-0 min-h-[200px] flex-1 overflow-hidden sm:min-h-[240px] md:min-h-[280px]">
        {/* ---- WebGL AI core ---- */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0 }}
          animate={booted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.6, delay: 0.2 }}
        >
          <SceneBoundary>
            <HeroScene tier={tier} reducedMotion={reducedMotion} pointerRef={pointerRef} />
          </SceneBoundary>
        </motion.div>

        {/* ---- HUD rings + reticle (centred on the core) ---- */}
        <motion.div
          style={{ x: ringsX, y: ringsY, opacity: heroOpacity }}
          className="pointer-events-none absolute inset-0 hidden sm:block"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] lg:w-[560px] lg:h-[560px] rounded-full border border-dashed border-[#F59E0B]/15 animate-[spin_52s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-dotted border-[#22D3EE]/12 animate-[spin-rev_38s_linear_infinite]" />
          {/* reticle corners around the core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] lg:w-[480px] lg:h-[480px]">
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

        {/* ---- rising tech chips (desktop) ---- */}
        <motion.div
          style={{ x: chipsX, y: chipsY, opacity: heroOpacity }}
          className="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden"
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

        {/* ---- portrait (scales to fill the zone — can never clip or collide) ---- */}
        <motion.div
          style={{ x: portraitX, scale: heroScale }}
          className="pointer-events-none absolute inset-0 flex items-end justify-center"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-full max-h-[560px] w-full items-end justify-center"
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
          </motion.div>
        </motion.div>

        {/* ---- top corner HUD (wide screens only, clear of the text column) ---- */}
        <motion.div style={{ opacity: heroOpacity }} className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden lg:flex justify-between px-10" aria-hidden="true">
          <div className="flex items-center gap-2 text-[10px] font-mono2 text-[#94A3B8]/70 tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
            SYS.CORE // ONLINE
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono2 text-[#94A3B8]/70 tracking-widest">
            <MapPin size={11} className="text-[#F59E0B]/70" />
            {PERSONAL_INFO.location.toUpperCase()} · IN
          </div>
        </motion.div>

        {/* ---- bottom HUD bar: status · scroll cue · resume ---- */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-x-0 bottom-0 z-10 hidden sm:grid grid-cols-[1fr_auto_1fr] items-end gap-4 px-6 pb-4 lg:px-10"
        >
          <div className="text-[10px] font-mono2 text-[#94A3B8]/70 tracking-widest">
            <span className="text-emerald-400/90">●</span> {PERSONAL_INFO.availability.toUpperCase()}
          </div>
          <button
            onClick={() => scrollTo('about')}
            className="group mx-auto flex flex-col items-center gap-2"
            aria-label="Scroll to About section"
          >
            <span className="text-[9px] font-mono2 tracking-[0.3em] text-[#94A3B8]/70 group-hover:text-[#F59E0B] transition-colors">SCROLL</span>
            <span className="relative h-10 w-px overflow-hidden bg-white/10">
              <span className="absolute inset-x-0 top-0 h-4 scroll-cue-line animate-[scan_2.2s_ease-in-out_infinite]" />
            </span>
          </button>
          <div className="flex justify-end">
            <Button size="lg" variant="glass" onClick={openResume} className="group rounded-2xl px-6 py-5">
              <FileText size={17} className="text-[#F59E0B] group-hover:scale-110 transition-transform" />
              <span className="tracking-wide">Resume</span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#F59E0B]" />
            </Button>
          </div>
        </motion.div>

        {/* ---- grounding fade into the next section ---- */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#050508]/70 to-[#050508] sm:h-32 z-[5]" />
      </div>
    </section>
  );
}
