import { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import BALogo from '@/components/branding/BALogo';

interface LoadingScreenProps {
  /** Fired once the boot sequence AND its exit reveal have fully finished. */
  onComplete: () => void;
}

const RING = 236;
const RING_R = 104;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

/** Tiny ambient particles (pure CSS animation — no extra canvas). */
const PARTICLES = [
  { left: '14%', top: '26%', size: 3, delay: 0, cyan: false },
  { left: '84%', top: '22%', size: 2, delay: 1.1, cyan: true },
  { left: '78%', top: '72%', size: 3, delay: 0.6, cyan: false },
  { left: '20%', top: '68%', size: 2, delay: 1.8, cyan: false },
  { left: '50%', top: '12%', size: 2, delay: 2.4, cyan: true },
  { left: '62%', top: '84%', size: 3, delay: 0.3, cyan: false },
  { left: '32%', top: '88%', size: 2, delay: 1.5, cyan: true },
] as const;

/**
 * Logo-first boot sequence:
 * dark bg → BA logo (scale 0.7→1) → glow → progress ring →
 * "BALA PORTFOLIO" → "AI & DATA SCIENCE ENGINEER" → 100% →
 * content slides up → background fades → cinematic reveal (onComplete).
 *
 * Progress is driven by real elapsed time (min duration) AND document.fonts
 * readiness — no artificial delays. Reduced motion → quick simple fade.
 */
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `boot-grad-${uid}`;

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'boot' | 'exit'>('boot');
  const fontsReadyRef = useRef(false);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Gate: wait for webfonts (with a hard 1.8s fallback so we never stall).
  useEffect(() => {
    let settled = false;
    const markReady = () => {
      if (!settled) {
        settled = true;
        fontsReadyRef.current = true;
      }
    };
    const fonts = typeof document !== 'undefined' ? (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts : undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (fonts?.ready && typeof fonts.ready.then === 'function') {
      fonts.ready.then(markReady).catch(markReady);
      timeout = setTimeout(markReady, 1500);
    } else {
      markReady();
    }
    return () => {
      if (timeout) clearTimeout(timeout);
      settled = true;
    };
  }, []);

  // rAF-driven progress — minimum duration only, no artificial wait.
  useEffect(() => {
    const DURATION = reduced ? 500 : 1400;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 2.2);
      const cap = fontsReadyRef.current ? 100 : 94;
      const p = Math.min(eased * 100, cap);
      setProgress(p);
      if (p >= 99.9) {
        if (!doneRef.current) {
          doneRef.current = true;
          setPhase('exit');
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Progress ring stroke.
  const offset = CIRCUMFERENCE * (1 - progress / 100);
  const pct = Math.round(progress);

  // Finish the reveal on a timer matched to the fade duration — animation
  // completion callbacks aren't reliable in every renderer (test DOMs), and
  // the site must never stay hidden behind the loader.
  useEffect(() => {
    if (phase !== 'exit') return;
    const t = setTimeout(() => onCompleteRef.current(), reduced ? 400 : 850);
    return () => clearTimeout(t);
  }, [phase, reduced]);

  const fade = (delay = 0) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.35, delay } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#050508]"
      role="status"
      aria-label="Loading portfolio"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: reduced ? 0.35 : 0.6, delay: phase === 'exit' ? 0.18 : 0, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (phase === 'exit') onComplete();
      }}
    >
      {/* backdrop: grid + amber core glow */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 62% 46% at 50% 46%, rgba(245,158,11,0.10), transparent 70%), radial-gradient(ellipse 40% 30% at 68% 70%, rgba(34,211,238,0.05), transparent 70%)',
        }}
      />
      {/* ambient particles */}
      <div className="absolute inset-0" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`boot-particle absolute rounded-full ${p.cyan ? 'bg-[#22D3EE]/70' : 'bg-[#F59E0B]/70'}`}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              boxShadow: p.cyan ? '0 0 8px rgba(34,211,238,0.8)' : '0 0 8px rgba(245,158,11,0.8)',
            }}
          />
        ))}
      </div>

      {/* content stack — slides up on exit */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6 sm:gap-6"
        initial={false}
        animate={phase === 'exit' ? (reduced ? { opacity: 0 } : { y: -72, opacity: 0, scale: 0.96 }) : { y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.3 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* logo + orbital rings cluster */}
        <div className="relative flex items-center justify-center" style={{ width: RING, height: RING }}>
          {/* rotating dashed ring (decorative) */}
          <svg
            className="boot-ring-spin absolute inset-0"
            width={RING}
            height={RING}
            viewBox="0 0 236 236"
            aria-hidden="true"
          >
            <circle
              cx="118"
              cy="118"
              r="115"
              fill="none"
              stroke="rgba(245,158,11,0.22)"
              strokeWidth="1"
              strokeDasharray="3 12"
            />
          </svg>
          {/* counter-rotating faint ring */}
          <svg
            className="boot-ring-spin-rev absolute inset-0"
            width={RING}
            height={RING}
            viewBox="0 0 236 236"
            aria-hidden="true"
          >
            <circle
              cx="118"
              cy="118"
              r="122"
              fill="none"
              stroke="rgba(34,211,238,0.12)"
              strokeWidth="1"
              strokeDasharray="1 16"
            />
          </svg>
          {/* progress ring */}
          <svg width={RING} height={RING} viewBox="0 0 236 236" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FDE68A" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#EA580C" />
              </linearGradient>
            </defs>
            <circle cx="118" cy="118" r={RING_R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
            <circle
              cx="118"
              cy="118"
              r={RING_R}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.55))' }}
            />
          </svg>
          {/* the mark itself — scale 0.7 → 1 */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={
              reduced
                ? { duration: 0.4, delay: 0.05 }
                : { type: 'spring', stiffness: 130, damping: 15, delay: 0.05 }
            }
          >
            <BALogo size={124} glow />
          </motion.div>
        </div>

        {/* titles */}
        <motion.div {...fade(reduced ? 0.15 : 0.5)} className="text-center">
          <div className="font-display text-base font-extrabold tracking-[0.42em] text-[#FDE68A] sm:text-lg">
            BALA PORTFOLIO
          </div>
        </motion.div>
        <motion.div {...fade(reduced ? 0.2 : 0.72)} className="text-center">
          <div className="font-mono2 text-[9px] font-medium tracking-[0.34em] text-[#94A3B8] sm:text-[10px]">
            AI &amp; DATA SCIENCE ENGINEER
          </div>
        </motion.div>

        {/* progress bar + percentage */}
        <motion.div {...fade(reduced ? 0.25 : 0.9)} className="flex w-52 flex-col items-center gap-2 sm:w-60">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#EA580C] transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(245,158,11,0.6)' }}
            />
          </div>
          <div className="font-mono2 text-[10px] tracking-[0.22em] text-[#F59E0B]">
            {String(pct).padStart(3, '0')}%
          </div>
        </motion.div>
      </motion.div>

      {/* corner HUD */}
      <motion.div {...fade(0.25)} className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <div className="absolute left-4 top-4 font-mono2 text-[9px] tracking-[0.26em] text-[#475569] sm:left-6 sm:top-6 sm:text-[10px]">
          SYS.BOOT // INITIALIZING
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono2 text-[9px] tracking-[0.26em] text-[#475569] sm:bottom-6 sm:left-6 sm:text-[10px]">
          <span
            className={`boot-pulse inline-block h-1.5 w-1.5 rounded-full ${phase === 'exit' ? 'bg-[#22D3EE]' : 'bg-[#F59E0B]'}`}
          />
          {phase === 'exit' ? 'MODULES READY' : 'LOADING MODULES'}
        </div>
        <div className="absolute bottom-4 right-4 font-mono2 text-[9px] tracking-[0.26em] text-[#475569] sm:bottom-6 sm:right-6 sm:text-[10px]">
          V2.0 · 2026
        </div>
      </motion.div>
    </motion.div>
  );
}
