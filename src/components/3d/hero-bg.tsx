"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { InstancedMesh, Group, Object3D } from "three";

function ParticleField({ count = 200 }: { count?: number }) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        Math.sin(t * 0.3 + i * 0.1) * 6,
        Math.cos(t * 0.2 + i * 0.05) * 4,
        Math.sin(t * 0.15 + i * 0.2) * 3 - 5,
      );
      dummy.rotation.set(t * 0.1 + i, t * 0.05 + i, 0);
      dummy.scale.setScalar(0.03 + Math.sin(t + i * 0.5) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.15, 0]} />
      <meshPhongMaterial
        color="#57c1ff"
        emissive="#57c1ff"
        emissiveIntensity={0.3}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

function WireframeSphere() {
  const groupRef = useRef<Group>(null);
  const torus1Ref = useRef<any>(null);
  const torus2Ref = useRef<any>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = t * 0.1;
    groupRef.current.rotation.y = t * 0.15;
    if (torus1Ref.current) torus1Ref.current.rotation.x = Math.PI / 2;
    if (torus2Ref.current) torus2Ref.current.rotation.y = Math.PI / 2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshPhongMaterial
            color="#121212"
            emissive="#57c1ff"
            emissiveIntensity={0.05}
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[2.4, 0.008, 16, 100]} />
          <meshPhongMaterial color="#57c1ff" emissive="#57c1ff" emissiveIntensity={0.2} transparent opacity={0.18} />
        </mesh>
        <mesh ref={torus1Ref}>
          <torusGeometry args={[1.8, 0.008, 16, 100]} />
          <meshPhongMaterial color="#59d499" emissive="#59d499" emissiveIntensity={0.2} transparent opacity={0.15} />
        </mesh>
        <mesh ref={torus2Ref}>
          <torusGeometry args={[2.1, 0.008, 16, 100]} />
          <meshPhongMaterial color="#ffc533" emissive="#ffc533" emissiveIntensity={0.2} transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

export function Hero3DBackground({ isMobile }: { isMobile: boolean }) {
  if (isMobile) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: false, alpha: true }}
        style={{ opacity: 0.7 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#57c1ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#59d499" />
        <ParticleField count={120} />
        <WireframeSphere />
      </Canvas>
    </div>
  );
}
