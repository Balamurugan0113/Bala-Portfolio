import { motion } from 'framer-motion';
import { FileText, FolderKanban, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Typewriter } from './Typewriter';

const ROLES = [
  'Ethical Hacker · Security Researcher',
  'Machine Learning Engineer',
  'AI & Data Science Engineer',
  'Full-Stack Developer',
];

const PILLS = ['Ethical Hacking', 'PyTorch ML', 'FastAPI', 'PostgreSQL'];

/* Restrained, sequential entrance — label → name → strip → title → copy → pills → CTAs. */
const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.1 + i * 0.11, ease: [0.16, 1, 0.3, 1] as const },
  }),
};
const ctaRise = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.1 + i * 0.11, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

interface HeroTypographyProps {
  /** Gate from BootContext — hero text waits for the loading screen reveal. */
  booted: boolean;
  onNavigate: (id: string) => void;
  onOpenResume: () => void;
}

/**
 * The hero's complete text stack — rendered in normal document flow (no absolute
 * positioning), so it can never collide with the 3D scene, portrait or HUD.
 * Mobile reading order = DOM order: label → name → title → description → CTAs.
 */
export default function HeroTypography({ booted, onNavigate, onOpenResume }: HeroTypographyProps) {
  const anim = booted ? 'visible' : 'hidden';

  return (
    <motion.div
      initial="hidden"
      animate={anim}
      className="flex w-full flex-col items-center text-center"
    >
      {/* ---- label ---- */}
      <motion.div variants={rise} custom={0} className="hero-label flex items-center gap-2.5">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="hero-label-dim hidden min-[420px]:inline">B.TECH&nbsp;·&nbsp;</span>
        <span>AI &amp; DATA SCIENCE ENGINEER</span>
      </motion.div>

      {/* ---- name lockup: dominant BALAMURUGAN + hairline & secondary C ---- */}
      <motion.h1
        variants={rise}
        custom={1}
        className="hero-name-lockup filter drop-shadow-[0_12px_44px_rgba(245,158,11,0.22)]"
      >
        <span className="hero-name gradient-hero">BALAMURUGAN</span>
        <span className="hero-name-sub">
          <span className="hero-name-rule" aria-hidden="true" />
          <span className="hero-name-c gradient-hero">C</span>
        </span>
      </motion.h1>

      {/* ---- spec strip ---- */}
      <motion.div variants={rise} custom={2} className="hero-strip mt-4 sm:mt-5">
        AI<span className="hero-strip-sep">·</span>DATA<span className="hero-strip-sep">·</span>
        SECURITY<span className="hero-strip-sep">·</span>ENGINEERING
      </motion.div>

      {/* ---- rotating role title ---- */}
      <motion.div
        variants={rise}
        custom={3}
        className="mt-3 flex min-h-[1.75em] items-center text-sm font-semibold tracking-wide text-slate-200 sm:mt-4 sm:text-base lg:text-lg"
      >
        <Typewriter texts={ROLES} />
      </motion.div>

      {/* ---- description ---- */}
      <motion.p variants={rise} custom={4} className="hero-desc mt-3 sm:mt-4">
        Specializing in Ethical Hacking, Machine Learning pipelines, and robust data-driven
        applications — engineering intelligent systems that are secure by design.
      </motion.p>

      {/* ---- mobile tech pills (desktop gets the floating 3D chips instead) ---- */}
      <motion.div
        variants={rise}
        custom={5}
        className="hero-pills mt-5 flex max-w-sm flex-wrap justify-center gap-2 lg:hidden"
      >
        {PILLS.map((tag) => (
          <span
            key={tag}
            className="glass rounded-lg border border-[#F59E0B]/25 px-2.5 py-1 font-mono2 text-[10px] text-[#FBBF24]"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* ---- CTAs ---- */}
      <motion.div
        variants={ctaRise}
        custom={6}
        className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-7"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={() => onNavigate('projects')} className="min-w-[148px] rounded-2xl px-7">
            <FolderKanban size={17} />
            View Projects
          </Button>
          <Button
            size="lg"
            variant="glass"
            onClick={() => onNavigate('contact')}
            className="min-w-[148px] rounded-2xl px-7"
          >
            <Mail size={17} className="text-[#F59E0B]" />
            Get in Touch
          </Button>
        </div>
        {/* Mobile resume CTA (desktop uses the corner HUD button) */}
        <Button
          size="lg"
          variant="outline"
          onClick={onOpenResume}
          className="w-full rounded-2xl px-7 sm:hidden"
        >
          <FileText size={17} /> View Resume
        </Button>
      </motion.div>
    </motion.div>
  );
}
