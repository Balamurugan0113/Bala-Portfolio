import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function EnergyRing({ radius, color, speed, offset = 0 }: { radius: number; color: string; speed: number; offset?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(clock.elapsedTime * 0.3 + offset) * 0.2;
    ref.current.rotation.z = clock.elapsedTime * speed + offset;
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function AICore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.08 + pointer.y * 0.03;
    coreRef.current.rotation.y = clock.elapsedTime * 0.06 + pointer.x * 0.03;
    if (glowRef.current) {
      glowRef.current.rotation.x = coreRef.current.rotation.x * 0.5;
      glowRef.current.rotation.y = coreRef.current.rotation.y * 0.5;
    }
  });

  return (
    <group>
      <EnergyRing radius={1.6} color="rgb(79,140,255)" speed={0.15} />
      <EnergyRing radius={2.0} color="rgb(139,92,246)" speed={-0.1} offset={Math.PI / 3} />
      <EnergyRing radius={2.4} color="rgb(0,217,255)" speed={0.12} offset={Math.PI / 1.5} />

      <mesh ref={glowRef}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial color="rgb(79,140,255)" transparent opacity={0.04} wireframe />
      </mesh>

      <Sphere ref={coreRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="rgb(79,140,255)"
          emissive="rgb(79,140,255)"
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.85}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.92}
        />
      </Sphere>
    </group>
  );
}
