import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

function smoothScrollToTop(duration = 3000) {
  const start = window.scrollY;
  if (start === 0) return;
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

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => smoothScrollToTop(3000)}
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-xl border transition-all duration-700 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      } bg-[rgba(79,140,255,0.08)] border-[rgba(79,140,255,0.15)] hover:bg-[rgba(79,140,255,0.15)] hover:border-[rgba(79,140,255,0.3)] hover:shadow-[0_0_24px_rgba(79,140,255,0.15)]`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} className="text-[#4F8CFF]" />
    </button>
  );
}
