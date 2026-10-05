import { useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Icosahedron, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

export interface PointerParallax {
  x: number;
  y: number;
}

function EnergyRing({
  radius,
  color,
  speed,
  offset = 0,
  tilt = 0,
}: {
  radius: number;
  color: string;
  speed: number;
  offset?: number;
  tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.25 + offset) * 0.18 + tilt;
    ref.current.rotation.z = t * speed + offset;
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.32} side={THREE.DoubleSide} />
    </mesh>
  );
}

function OrbitingNode({
  radius,
  speed,
  size,
  color,
  isDodeca = false,
}: {
  radius: number;
  speed: number;
  size: number;
  color: string;
  isDodeca?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime * speed;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.z = Math.sin(t) * radius;
    meshRef.current.position.y = Math.sin(t * 2) * 0.35;
    meshRef.current.rotation.x = t * 1.4;
    meshRef.current.rotation.y = t * 1.9;
  });

  return (
    <mesh ref={meshRef}>
      {isDodeca ? (
        <Dodecahedron args={[size, 0]}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.45} />
        </Dodecahedron>
      ) : (
        <Icosahedron args={[size, 0]}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.45} />
        </Icosahedron>
      )}
    </mesh>
  );
}

/**
 * Cinematic amber AI core — distorted energy sphere, wireframe containment shell,
 * orbital rings and orbiting polyhedra. Follows the user's pointer subtly.
 */
export function AICore({
  pointerRef,
  scale = 1,
}: {
  pointerRef: MutableRefObject<PointerParallax>;
  scale?: number;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const target = pointerRef.current ?? { x: 0, y: 0 };
    if (groupRef.current) {
      // Mouse parallax — damped
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, target.x * 0.28, 0.045);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -target.y * 0.22, 0.045);
      // Gentle levitation
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.07;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.14;
    }
    if (shellRef.current) {
      shellRef.current.rotation.x = t * 0.07;
      shellRef.current.rotation.y = -t * 0.09;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Orbital energy rings — amber / orange / cyan */}
      <EnergyRing radius={1.7} color="rgb(245,158,11)" speed={0.16} tilt={0.12} />
      <EnergyRing radius={2.15} color="rgb(249,115,22)" speed={-0.12} offset={Math.PI / 3} tilt={-0.16} />
      <EnergyRing radius={2.6} color="rgb(34,211,238)" speed={0.1} offset={Math.PI / 1.5} tilt={0.2} />

      {/* Orbiting polyhedra */}
      <OrbitingNode radius={2.25} speed={0.38} size={0.2} color="#F59E0B" />
      <OrbitingNode radius={2.75} speed={-0.3} size={0.26} color="#F97316" isDodeca />
      <OrbitingNode radius={1.85} speed={0.5} size={0.16} color="#22D3EE" />

      {/* Containment wireframe shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.38, 1]} />
        <meshBasicMaterial color="rgb(245,158,11)" transparent opacity={0.09} wireframe />
      </mesh>

      {/* Soft corona behind the core */}
      <mesh scale={1.9}>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial color="rgb(245,158,11)" transparent opacity={0.05} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Central pulsing AI core */}
      <Sphere ref={coreRef} args={[0.92, 48, 48]}>
        <MeshDistortMaterial
          color="rgb(242,148,22)"
          emissive="rgb(245,158,11)"
          emissiveIntensity={0.55}
          roughness={0.18}
          metalness={0.85}
          distort={0.26}
          speed={2.2}
          transparent
          opacity={0.96}
        />
      </Sphere>
    </group>
  );
}
