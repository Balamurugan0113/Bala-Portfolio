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
  stackPosition?: number | string;
  itemScale?: number;
  baseScale?: number;
  dimAmount?: number;
}

export const ScrollStackItem = ({ children, itemClassName = '', style }: ScrollStackItemProps) => {
  return (
    <div
      className={cn(
        "scroll-stack-card relative box-border w-full origin-top rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 glass-card border border-[#F59E0B]/30 hover:border-[#F59E0B]/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-shadow",
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
  itemDistance = 40, // Viewport height % gap between cards in the scroll flow
  itemStackDistance = 24, // Pixel vertical step between stacked cards
  stackPosition = 85, // Fixed pixel distance from viewport top where cards lock
  itemScale = 0.025, // Scale reduction per stacked item
  baseScale = 0.88, // Minimum scale boundary
  dimAmount = 0.35, // Maximum darkness overlay
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const spacersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isUpdatingRef = useRef(false);

  const items = Children.toArray(children);
  const total = items.length;

  // Frame-by-frame hardware-accelerated transform loop
  const updateCardTransforms = useCallback(() => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const cards = cardsRef.current;
    const spacers = spacersRef.current;
    const n = cards.length;
    if (n === 0) {
      isUpdatingRef.current = false;
      return;
    }

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPos = typeof stackPosition === 'number' ? stackPosition : 85;

    // Calculate document offsets of spacers (pure, un-transformed positions)
    const cardTops: number[] = [];
    for (let i = 0; i < n; i++) {
      const spacer = spacers[i];
      if (spacer) {
        cardTops[i] = spacer.getBoundingClientRect().top + scrollTop;
      } else {
        cardTops[i] = 0;
      }
    }

    // Pinning and unpinning boundaries
    const lastIdx = n - 1;
    const lastCardTop = cardTops[lastIdx] || 0;
    const lastCardHeight = spacers[lastIdx]?.offsetHeight || 480;
    const lastPinStart = lastCardTop - stackPos - itemStackDistance * lastIdx;

    // Hold the completed stack for ~30vh so the user can inspect the final stacked deck
    const holdDistance = Math.min(320, containerHeight * 0.35);
    const pinEnd = lastPinStart + holdDistance;

    // Runway distance required for the stack to scroll off the screen before the next section appears
    const exitDistance = stackPos + itemStackDistance * lastIdx + lastCardHeight + 80;
    const nextSectionDocTop = pinEnd + exitDistance + 40;
    const runwayHeight = Math.max(120, nextSectionDocTop - (lastCardTop + lastCardHeight));

    // Dynamically size the exit runway so ExperienceSection never collides with the pinned cards
    const endEl = endRef.current;
    if (endEl && endEl.style.height !== `${runwayHeight}px`) {
      endEl.style.height = `${runwayHeight}px`;
    }

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTops[i];
      if (!cardTop) return;

      // pinStart: exact scroll position where this card reaches its stacked position
      const pinStart = cardTop - stackPos - itemStackDistance * i;

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        // Pinned in place at its designated stack slot
        translateY = scrollTop - cardTop + stackPos + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        // Stack completed; unpins and scrolls away smoothly off the top of the viewport
        translateY = pinEnd - cardTop + stackPos + itemStackDistance * i;
      }

      // Overlap math: as Card i+1 approaches and covers Card i, scale down and dim Card i
      let scale = 1;
      let dim = 0;

      if (i < n - 1) {
        let cardsCovering = 0;
        for (let j = i + 1; j < n; j++) {
          const nextTop = cardTops[j];
          if (!nextTop) continue;

          const nextPinStart = nextTop - stackPos - itemStackDistance * j;
          // Card j overlaps Card i across a 220px scroll window before nextPinStart
          const overlapTrigger = nextPinStart - 200;

          if (scrollTop >= nextPinStart) {
            cardsCovering += 1;
          } else if (scrollTop > overlapTrigger) {
            cardsCovering += (scrollTop - overlapTrigger) / 200;
          }
        }

        scale = Math.max(baseScale, 1 - cardsCovering * itemScale);
        dim = Math.min(dimAmount, cardsCovering * 0.1);
      }

      // Apply 3D transform directly to card DOM node
      card.style.transform = `translate3d(0px, ${translateY}px, 0px) scale(${scale})`;
      card.style.transformOrigin = 'top center';
      card.style.zIndex = `${i + 10}`;

      // Update dim overlay
      const dimOverlay = card.querySelector('.scroll-stack-dim') as HTMLElement | null;
      if (dimOverlay) {
        dimOverlay.style.opacity = `${dim}`;
      }
    });

    isUpdatingRef.current = false;
  }, [baseScale, dimAmount, itemScale, itemStackDistance, stackPosition]);

  useEffect(() => {
    // Initial update
    const timer = setTimeout(() => {
      updateCardTransforms();
    }, 50);

    const handleScroll = () => {
      requestAnimationFrame(updateCardTransforms);
    };

    const handleResize = () => {
      requestAnimationFrame(updateCardTransforms);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCardTransforms]);

  return (
    <div ref={containerRef} className={cn("relative w-full flex flex-col items-center", className)}>
      {items.map((child, index) => {
        const isLast = index === total - 1;
        return (
          <div
            key={isValidElement(child) ? (child.key ?? index) : index}
            ref={(el) => { spacersRef.current[index] = el; }}
            className="w-full relative"
            style={{
              // Natural distance between cards before they start stacking
              marginBottom: isLast ? '0px' : `${itemDistance}vh`,
            }}
          >
            <div
              ref={(el) => { cardsRef.current[index] = el; }}
              className="w-full will-change-transform"
            >
              {child}
            </div>
          </div>
        );
      })}
      {/* End boundary marker and exit runway */}
      <div 
        ref={endRef} 
        className="scroll-stack-end w-full pointer-events-none transition-[height] duration-200" 
        style={{ minHeight: '45vh' }}
      />
    </div>
  );
};

export default ScrollStack;
