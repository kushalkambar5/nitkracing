import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DustParticles({ count = 150 }) {
  const pointsRef = useRef();

  // Generate initial random particle positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;      // X
      arr[i * 3 + 1] = Math.random() * 3.5;          // Y (above ground)
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;  // Z
    }
    return arr;
  }, [count]);

  // Slowly animate particles to make them float around
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const xIdx = i * 3;
      const yIdx = i * 3 + 1;
      const zIdx = i * 3 + 2;

      // Apply subtle sinusoidal drift
      positionsAttr.array[xIdx] += Math.sin(time * 0.15 + i) * 0.0005;
      positionsAttr.array[yIdx] += Math.cos(time * 0.1 + i) * 0.0003;
      positionsAttr.array[zIdx] += Math.sin(time * 0.2 + i) * 0.0004;

      // Wrap-around bounds checks to keep them in range
      if (Math.abs(positionsAttr.array[xIdx]) > 6) positionsAttr.array[xIdx] = (Math.random() - 0.5) * 12;
      if (positionsAttr.array[yIdx] < 0 || positionsAttr.array[yIdx] > 4) positionsAttr.array[yIdx] = Math.random() * 3.5;
      if (Math.abs(positionsAttr.array[zIdx]) > 6) positionsAttr.array[zIdx] = (Math.random() - 0.5) * 12;
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.02}
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
