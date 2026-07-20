import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField({ count = 600 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 12;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.02 + Math.random() * 0.04;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [count]);

  useEffect(() => {
    return () => { geometry.dispose(); };
  }, [geometry]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = pos[idx];
      const z = pos[idx + 2];
      const r = Math.sqrt(x * x + z * z);
      const theta = Math.atan2(z, x) + 0.0006;
      pos[idx] = r * Math.cos(theta);
      pos[idx + 2] = r * Math.sin(theta);
      pos[idx + 1] += Math.sin(clock.elapsedTime * 0.15 + i * 0.01) * 0.0004;
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#4F8CFF"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
