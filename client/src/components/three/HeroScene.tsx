import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { AICore, type PointerParallax } from './AICore';
import { ParticleField } from './ParticleField';
import type { DeviceTier } from '@/hooks/useDeviceTier';

const PARTICLE_BUDGET: Record<DeviceTier, number> = { low: 90, mid: 220, high: 420 };
const DPR_BUDGET: Record<DeviceTier, [number, number]> = {
  low: [1, 1.25],
  mid: [1, 1.5],
  high: [1, 1.75],
};

function SceneContent({ tier, pointerRef }: { tier: DeviceTier; pointerRef: MutableRefObject<PointerParallax> }) {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[-4, 3, 5]} intensity={1.6} color="#FBBF24" />
      <directionalLight position={[4, -1, -4]} intensity={0.5} color="#22D3EE" />
      <AICore pointerRef={pointerRef} scale={tier === 'low' ? 0.82 : 1} />
      <ParticleField count={PARTICLE_BUDGET[tier]} />
    </Suspense>
  );
}

interface HeroSceneProps {
  className?: string;
  tier: DeviceTier;
  reducedMotion: boolean;
  pointerRef: MutableRefObject<PointerParallax>;
}

/**
 * The hero's 3D layer: an amber AI core with orbital rings and an ambient
 * particle field. Rendering is aggressively budget-managed:
 *  - DPR + particle count adapt to device tier
 *  - the render loop pauses when the hero leaves the viewport
 *  - the render loop pauses when the tab is hidden
 *  - prefers-reduced-motion renders a single static frame
 */
export default function HeroScene({ className = '', tier, reducedMotion, pointerRef }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const active = inView && tabVisible && !reducedMotion;

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas
        dpr={DPR_BUDGET[tier]}
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 0.35, 6.4], fov: 42 }}
        gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <AdaptiveDpr />
        <SceneContent tier={tier} pointerRef={pointerRef} />
      </Canvas>
    </div>
  );
}
