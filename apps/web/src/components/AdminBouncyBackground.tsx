"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Shadow } from '@react-three/drei';
import * as THREE from 'three';

const BouncyShape = ({ position, color, size }: { position: [number, number, number], color: string, size: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = React.useState(false);
  
  // High-speed bounce effect logic
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      meshRef.current.rotation.y = Math.cos(time * 0.5) * 0.2;
      
      // Bouncy scale-up on hover
      const targetScale = hovered ? size * 1.5 : size;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={hovered ? 5 : 2}
          distort={hovered ? 0.6 : 0.3}
          radius={1}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

export default function AdminBouncyBackground() {
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      color: i % 2 === 0 ? "#8B0000" : "#B22222",
      size: 0.5 + Math.random() * 1.2
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {shapes.map((shape, i) => (
          <BouncyShape key={i} {...shape} />
        ))}
        
        <Shadow opacity={0.2} scale={[20, 20, 1]} position={[0, 0, -5]} />
      </Canvas>
    </div>
  );
}
