import { useEffect, useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

function smoothScrollToTop(duration = 1200) {
  const start = window.scrollY;
  if (start === 0) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    window.scrollTo(0, 0);
    return;
  }
  const startTime = performance.now();

  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start * (1 - easeOutCubic(progress)));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setVisible(window.scrollY > window.innerHeight * 0.5);
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const C = 2 * Math.PI * 20; // ring circumference (r=20)

  return (
    <button
      onClick={() => smoothScrollToTop()}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all duration-500 ease-out group ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      } bg-[#0C0C14]/85 border-[#F59E0B]/25 hover:border-[#F59E0B]/60 hover:shadow-[0_0_28px_-6px_rgba(245,158,11,0.5)]`}
      aria-label="Scroll back to top"
    >
      {/* scroll progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <circle
          cx="24" cy="24" r="20" fill="none"
          stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
      </svg>
      <ArrowUp size={17} className="text-[#F59E0B] group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
