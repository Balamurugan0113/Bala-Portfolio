import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  /** Raw stat value, e.g. "20+", "4th Year (Final Year)", "20 Yrs", "5+" */
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Parses the leading number out of a stat string and counts it up when scrolled
 * into view. Non-numeric parts are preserved (prefix/suffix).
 */
export default function AnimatedCounter({ value, duration = 1400, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(value);

  const match = value.match(/^(\D*?)(\d+)(.*)$/s);

  useEffect(() => {
    if (!inView || !match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    if (Number.isNaN(target)) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(`${prefix}${target}${suffix}`);
      return;
    }

    let raf: number | null = null;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
      setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!match) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className} aria-label={value.replace(/\s+/g, ' ')}>
      {display}
    </span>
  );
}
