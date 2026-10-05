import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';
import { soundFx } from '@/lib/sound';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  glare?: boolean;
  glareColor?: string; // rgb triplet
  disabled?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article';
  ariaLabel?: string;
}

/**
 * 3D tilt card with pointer-tracked rotation, specular glare and spring physics.
 * - Automatically disabled on touch devices / reduced-motion (plain card, keeps glare off)
 * - Pointer updates are rAF-throttled
 * - Keyboard operable when onClick is provided
 */
export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  maxTilt = 10,
  scaleOnHover = 1.02,
  glare = true,
  glareColor = '245, 158, 11',
  disabled,
  onClick,
  as = 'div',
  ariaLabel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Detect capability once: tilt only for hover-capable pointers without reduced motion
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setInteractive(fine && !reduce && disabled !== true);
  }, [disabled]);

  const springConfig = { stiffness: 260, damping: 26, mass: 0.6 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);
  const translateZ = useSpring(0, springConfig);

  const applyPointer = useCallback(() => {
    rafRef.current = null;
    const el = cardRef.current;
    const p = pointerRef.current;
    if (!el || !p) return;
    const rect = el.getBoundingClientRect();
    const xPct = (p.x - rect.left) / rect.width;
    const yPct = (p.y - rect.top) / rect.height;
    rotateX.set(-((yPct - 0.5) * 2) * maxTilt);
    rotateY.set(((xPct - 0.5) * 2) * maxTilt);
    setGlarePos({ x: xPct * 100, y: yPct * 100, opacity: 0.16 });
  }, [maxTilt, rotateX, rotateY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(applyPointer);
    }
  };

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseEnter = () => {
    if (!interactive) return;
    soundFx.playHover();
    scale.set(scaleOnHover);
    translateZ.set(14);
  };

  const handleMouseLeave = () => {
    pointerRef.current = null;
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    translateZ.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    if (!onClick) return;
    soundFx.playClick();
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      soundFx.playClick();
      onClick();
    }
  };

  const Tag = as as 'div';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        scale: interactive ? scale : 1,
        z: interactive ? translateZ : 0,
        transformStyle: 'preserve-3d',
        perspective: 1100,
        cursor: onClick ? 'pointer' : undefined,
      }}
      className={`relative overflow-hidden rounded-2xl outline-none ${className}`}
    >
      <Tag style={{ transform: 'translateZ(18px)', transformStyle: 'preserve-3d' }}>{children}</Tag>
      {glare && interactive && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.35) 0%, rgba(${glareColor},0.12) 42%, transparent 78%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default Card3DTilt;
