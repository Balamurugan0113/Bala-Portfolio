import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { Suspense, useMemo, useEffect, useState } from 'react';
import { AICore } from './AICore';
import { ParticleField } from './ParticleField';

function SceneContent() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <pointLight position={[-4, -3, 4]} intensity={0.3} color="#8B5CF6" />
      <pointLight position={[4, -2, -3]} intensity={0.2} color="#00D9FF" />
      <ParticleField count={400} />
      <AICore />
    </Suspense>
  );
}

export default function Scene3D({ className = '' }: { className?: string }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const dpr = useMemo(() => Math.min(window.devicePixelRatio, 1.5), []);

  if (!mounted) return <div className={`fixed inset-0 -z-10 ${className}`} />;
  if (!visible) return <div className={`fixed inset-0 -z-10 ${className}`} />;

  return (
    <div className={`fixed inset-0 -z-10 ${className}`} aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <SceneContent />
      </Canvas>
    </div>
  );
}
