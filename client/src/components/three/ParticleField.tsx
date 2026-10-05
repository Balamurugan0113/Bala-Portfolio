import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Ambient particle field — amber with sparse cyan accents.
 * Optimised: the entire cloud rotates as one object (single matrix update per
 * frame, zero per-particle CPU work) and geometry is disposed on unmount.
 */
export function ParticleField({ count = 400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const amber = new THREE.Color('#F59E0B');
    const gold = new THREE.Color('#FBBF24');
    const cyan = new THREE.Color('#22D3EE');

    for (let i = 0; i < count; i++) {
      // Spherical shell distribution with some depth spread
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.6 + Math.random() * 9;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      pos[i * 3 + 2] = r * Math.cos(phi);

      // ~12% cyan accents, rest amber/gold
      const c = Math.random() < 0.12 ? cyan : Math.random() < 0.5 ? amber : gold;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { geometry: geo, material: mat };
  }, [count]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.018;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
