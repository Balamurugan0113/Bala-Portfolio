'use client';

import { 
  Children, 
  isValidElement, 
  useRef, 
  useEffect, 
  useCallback, 
  type CSSProperties, 
  type ReactNode 
} from 'react';
import { cn } from '@/lib/utils';

export interface ScrollStackItemProps {
  children?: ReactNode;
  itemClassName?: string;
  style?: CSSProperties;
}

export interface ScrollStackProps {
  children?: ReactNode;
  className?: string;
  itemDistance?: number;
  itemStackDistance?: number;
  stackPosition?: number;
  itemScale?: number;
  baseScale?: number;
  dimAmount?: number;
}

export const ScrollStackItem = ({ children, itemClassName = '', style }: ScrollStackItemProps) => {
  return (
    <div
      className={cn(
        "scroll-stack-card relative box-border w-full origin-top rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 glass-card border border-[#F59E0B]/30 hover:border-[#F59E0B]/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-[border-color,box-shadow]",
        itemClassName
      )}
      style={style}
    >
      {children}
      {/* Dim overlay that smoothly darkens as subsequent cards overlap it */}
      <div 
        className="scroll-stack-dim pointer-events-none absolute inset-0 rounded-[inherit] bg-[#02040a] transition-opacity duration-150"
        style={{ opacity: 0 }}
      />
    </div>
  );
};

export const ScrollStack = ({
  children,
  className = '',
  itemDistance = 28, // Viewport height % gap between cards in the scroll flow
  itemStackDistance = 18, // Pixel vertical step between stacked cards
  stackPosition = 84, // Fixed pixel distance from viewport top where cards lock (below navbar)
  itemScale = 0.02, // Scale reduction per stacked item
  baseScale = 0.90, // Minimum scale boundary
  dimAmount = 0.35, // Maximum darkness overlay
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const innersRef = useRef<(HTMLDivElement | null)[]>([]);

  const items = Children.toArray(children);
  const total = items.length;

  // Frame-by-frame hardware-accelerated transform loop for scale and dimming
  const updateCardTransforms = useCallback(() => {
    const wrappers = wrappersRef.current;
    const inners = innersRef.current;
    const n = wrappers.length;
    if (n === 0) return;

    for (let i = 0; i < n; i++) {
      const inner = inners[i];
      if (!inner) continue;

      // Calculate how many subsequent cards have stacked over card i
      let coverage = 0;
      if (i < n - 1) {
        for (let j = i + 1; j < n; j++) {
          const nextWrapper = wrappers[j];
          if (!nextWrapper) continue;

          const nextTop = nextWrapper.getBoundingClientRect().top;
          const targetTop = stackPosition + Math.min(j * itemStackDistance, 180);

          // Card j overlaps card i as it enters within 250px of its sticky target
          if (nextTop <= targetTop) {
            coverage += 1;
          } else if (nextTop < targetTop + 250) {
            coverage += (targetTop + 250 - nextTop) / 250;
          }
        }
      }

      const scale = Math.max(baseScale, 1 - coverage * itemScale);
      const dim = Math.min(dimAmount, coverage * (dimAmount / 3));

      inner.style.transform = `scale(${scale})`;
      const dimOverlay = inner.querySelector('.scroll-stack-dim') as HTMLElement | null;
      if (dimOverlay) {
        dimOverlay.style.opacity = `${dim}`;
      }
    }
  }, [baseScale, dimAmount, itemScale, itemStackDistance, stackPosition]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateCardTransforms();
          ticking = false;
        });
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    // Run initial transform
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCardTransforms]);

  return (
    <div 
      ref={containerRef} 
      className={cn("scroll-stack-container relative w-full flex flex-col items-center pb-12 sm:pb-20", className)}
    >
      {items.map((child, index) => {
        const isLast = index === total - 1;
        // Native CSS sticky positioning ensures buttery-smooth 120 FPS pinning on GPU compositor
        const stickyTop = stackPosition + Math.min(index * itemStackDistance, 180);

        return (
          <div
            key={isValidElement(child) ? (child.key ?? index) : index}
            ref={(el) => { wrappersRef.current[index] = el; }}
            className="scroll-stack-card-wrapper sticky w-full"
            style={{
              top: `${stickyTop}px`,
              zIndex: 10 + index,
              marginBottom: isLast ? '0px' : `${itemDistance}vh`,
            }}
          >
            <div
              ref={(el) => { innersRef.current[index] = el; }}
              className="scroll-stack-card-inner w-full will-change-transform"
              style={{
                transformOrigin: 'top center',
              }}
            >
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScrollStack;
