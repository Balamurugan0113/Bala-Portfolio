import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Icosahedron, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

function EnergyRing({ radius, color, speed, offset = 0, tilt = 0 }: { radius: number; color: string; speed: number; offset?: number; tilt?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(clock.elapsedTime * 0.3 + offset) * 0.2 + tilt;
    ref.current.rotation.z = clock.elapsedTime * speed + offset;
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}

function OrbitingPolyhedron({ radius, speed, size, color, isDodeca = false }: { radius: number; speed: number; size: number; color: string; isDodeca?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime * speed;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.z = Math.sin(t) * radius;
    meshRef.current.position.y = Math.sin(t * 2) * 0.4;
    meshRef.current.rotation.x = t * 1.5;
    meshRef.current.rotation.y = t * 2;
  });

  return (
    <mesh ref={meshRef}>
      {isDodeca ? (
        <Dodecahedron args={[size, 0]}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
        </Dodecahedron>
      ) : (
        <Icosahedron args={[size, 0]}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
        </Icosahedron>
      )}
    </mesh>
  );
}

export function AICore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    // Mouse parallax
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.25, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.25, 0.05);

    if (coreRef.current) {
      coreRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.1;
      coreRef.current.rotation.y = clock.elapsedTime * 0.12;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = clock.elapsedTime * -0.05;
      glowRef.current.rotation.y = clock.elapsedTime * -0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbital Energy Rings */}
      <EnergyRing radius={1.6} color="rgb(79,140,255)" speed={0.15} tilt={0.1} />
      <EnergyRing radius={2.1} color="rgb(139,92,246)" speed={-0.12} offset={Math.PI / 3} tilt={-0.15} />
      <EnergyRing radius={2.6} color="rgb(0,217,255)" speed={0.1} offset={Math.PI / 1.5} tilt={0.2} />

      {/* Orbiting Polyhedrons */}
      <OrbitingPolyhedron radius={2.2} speed={0.4} size={0.22} color="#00D9FF" />
      <OrbitingPolyhedron radius={2.7} speed={-0.3} size={0.28} color="#8B5CF6" isDodeca />
      <OrbitingPolyhedron radius={1.8} speed={0.5} size={0.18} color="#4F8CFF" />

      {/* Outer Wireframe Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="rgb(79,140,255)" transparent opacity={0.06} wireframe />
      </mesh>

      {/* Central Pulsing AI Core */}
      <Sphere ref={coreRef} args={[0.95, 64, 64]}>
        <MeshDistortMaterial
          color="rgb(79,140,255)"
          emissive="rgb(79,140,255)"
          emissiveIntensity={0.35}
          roughness={0.1}
          metalness={0.9}
          distort={0.25}
          speed={2.5}
          transparent
          opacity={0.95}
        />
      </Sphere>
    </group>
  );
}
