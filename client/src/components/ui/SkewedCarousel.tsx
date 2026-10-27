"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';

export interface SkewedCarouselItem {
  id: string;
  title: string;
  description?: string;
  tagline?: string;
  impact?: string;
  tags?: string[];
  [key: string]: any;
}

export interface SkewedCarouselProps {
  items: SkewedCarouselItem[];
  renderCard?: (item: SkewedCarouselItem, index: number) => React.ReactNode;
  onItemClick?: (item: SkewedCarouselItem, index: number) => void;
  skewAngle?: number;
  tiltIntensity?: number;
  baseVelocity?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function SkewedCarousel({
  items,
  renderCard,
  onItemClick,
  skewAngle = -1.5,
  tiltIntensity = 6,
  baseVelocity = -0.28,
  pauseOnHover = true,
  className,
}: SkewedCarouselProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track position motion value (percentage: 0 to -25%)
  const baseX = useMotionValue(0);

  // Constant-speed animation frame loop (completely isolated from page scroll interactions)
  useAnimationFrame((_, delta) => {
    if (pauseOnHover && isHovered) return;

    // Strict uniform speed: delta (ms) * constant velocity factor
    const moveBy = baseVelocity * (delta / 1000) * 1.8;

    let newX = baseX.get() + moveBy;
    if (newX <= -25) {
      newX = newX % 25;
    } else if (newX > 0) {
      newX = -25 + (newX % 25);
    }
    baseX.set(newX);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  const handleManualNudge = (direction: 'left' | 'right') => {
    soundFx.playClick();
    const shift = direction === 'left' ? -3.5 : 3.5;
    let newX = baseX.get() + shift;
    if (newX <= -25) newX = newX % 25;
    if (newX > 0) newX = -25 + (newX % 25);
    baseX.set(newX);
  };

  // 4 identical sets of items to ensure seamless infinite looping
  const loopItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden py-2 sm:py-4 select-none",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Bar: Count badge & Manual Controls */}
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 mb-2 sm:mb-3 relative z-30 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase bg-[#F59E0B]/10 px-2.5 py-0.5 rounded-full border border-[#F59E0B]/20">
            {items.length} Featured Systems
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => handleManualNudge('right')}
            aria-label="Previous Projects"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full glass border border-white/10 hover:border-[#F59E0B] text-white hover:text-[#F59E0B] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleManualNudge('left')}
            aria-label="Next Projects"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full glass border border-white/10 hover:border-[#F59E0B] text-white hover:text-[#F59E0B] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronRight size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Skewed Perspective Plane */}
      <div
        className="w-full flex items-center justify-start overflow-visible py-1 sm:py-2"
        style={{
          transform: `rotate(${skewAngle}deg)`,
        }}
      >
        <motion.div
          className="flex items-center gap-4 sm:gap-7 w-max will-change-transform px-3 sm:px-4"
          style={{ x }}
        >
          {loopItems.map((item, idx) => {
            const originalIndex = idx % items.length;
            return (
              <SkewedCardItem
                key={`${item.id}-${idx}`}
                item={item}
                index={originalIndex}
                tiltIntensity={tiltIntensity}
                onClick={() => onItemClick && onItemClick(item, originalIndex)}
              >
                {renderCard ? renderCard(item, originalIndex) : undefined}
              </SkewedCardItem>
            );
          })}
        </motion.div>
      </div>

      {/* Side Edge Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-28 bg-gradient-to-r from-[#050508] to-transparent z-20 light:from-[#F8FAFC]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-28 bg-gradient-to-l from-[#050508] to-transparent z-20 light:from-[#F8FAFC]" />
    </div>
  );
}

interface SkewedCardItemProps {
  item: SkewedCarouselItem;
  index: number;
  tiltIntensity: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

function SkewedCardItem({
  item,
  index,
  tiltIntensity,
  onClick,
  children,
}: SkewedCardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Interactive mouse tilt within individual card
  const rotateX = useSpring(0, { damping: 20, stiffness: 220 });
  const rotateY = useSpring(0, { damping: 20, stiffness: 220 });
  const scale = useSpring(1, { damping: 20, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rotateX.set((-y / (rect.height / 2)) * tiltIntensity);
    rotateY.set((x / (rect.width / 2)) * tiltIntensity);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative shrink-0 cursor-pointer transition-shadow duration-300 rounded-xl sm:rounded-2xl",
        hovered
          ? "z-30 shadow-[0_12px_30px_rgba(245,158,11,0.22)]"
          : "z-10 shadow-[0_6px_20px_rgba(0,0,0,0.5)]"
      )}
    >
      {children ? (
        children
      ) : (
        /* High-Impact Enlarged Flow Project Card */
        <div className="w-[290px] xs:w-[330px] sm:w-[380px] md:w-[440px] h-[380px] sm:h-[430px] md:h-[460px] glass-strong border border-white/12 hover:border-[#F59E0B]/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative group bg-[#080B18] transition-all duration-300 shadow-xl">
          
          {/* Index Watermark */}
          <div className="absolute top-2 right-3 opacity-5 pointer-events-none select-none">
            <span className="font-['Syne'] font-black text-4xl sm:text-6xl tracking-tighter text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="relative z-10 flex flex-col flex-1">
            {/* Visual Image Preview Banner */}
            <div className="relative w-full h-32 sm:h-44 rounded-xl overflow-hidden bg-[#040714] border border-white/10 mb-3 flex items-center justify-center p-2.5 group-hover:border-[#F59E0B]/40 transition-all duration-300">
              <div className="absolute inset-0 bg-radial from-[#F59E0B]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-[11px] text-[#94A3B8] font-mono font-semibold uppercase tracking-wider">
                  System Architecture
                </div>
              )}

              {/* Tagline Badge Overlay */}
              {item.tagline && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#050508]/85 backdrop-blur-md border border-white/10 text-[8px] sm:text-[9px] font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
                  {item.tagline}
                </div>
              )}
            </div>

            {/* Impact Metric */}
            <div className="flex items-center gap-2 mb-1.5">
              {item.impact && (
                <span className="text-[8px] sm:text-[9px] font-semibold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/30 font-mono shrink-0">
                  {item.impact}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-lg md:text-xl font-bold font-['Syne'] text-white mb-1.5 group-hover:text-[#F59E0B] transition-colors leading-snug line-clamp-1">
              {item.title}
            </h3>

            {/* Crisp Description */}
            {item.description && (
              <p className="text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed line-clamp-2 font-normal">
                {item.description}
              </p>
            )}
          </div>

          <div className="relative z-10 mt-auto pt-3 border-t border-white/10">
            {/* Top 3 Tags */}
            {item.tags && (
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {item.tags.slice(0, 3).map((t: string) => (
                  <span
                    key={t}
                    className="text-[8px] sm:text-[9px] px-2 py-0.5 rounded-md glass border border-white/10 text-white/90 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            
            {/* CTA Link */}
            <div className="text-[10px] sm:text-xs font-bold text-[#F59E0B] flex items-center justify-between group-hover:translate-x-1 transition-transform">
              <span className="uppercase tracking-wider flex items-center gap-1 font-mono">
                Inspect System <ArrowRight size={12} />
              </span>
              <span className="text-[9px] text-[#94A3B8] font-mono hidden sm:inline">Specs &amp; Code</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default SkewedCarousel;
