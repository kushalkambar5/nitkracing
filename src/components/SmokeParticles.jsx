import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SmokeParticles({ animProps, getCarZAtProgress, count = 120 }) {
  const pointsRef = useRef();

  // Create particle characteristics
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Spawn smoke only once the left-side lock-off is almost done and the launch begins.
      const spawnProgress = 0.76 + (i / count) * 0.18;
      
      // Random offsets for dispersion
      const side = i % 2 === 0 ? -1 : 1; // Left or Right wheel
      const wheelOffsetX = side * 0.82;
      const wheelOffsetY = 0.25;
      
      // Random drift directions
      const driftX = (Math.random() - 0.5) * 1.5;
      const driftY = 0.5 + Math.random() * 0.8;
      const driftZ = -(0.8 + Math.random() * 1.5); // drifts backwards (-Z)

      data.push({
        spawnProgress,
        wheelOffsetX,
        wheelOffsetY,
        driftX,
        driftY,
        driftZ,
        randScale: 0.8 + Math.random() * 0.8
      });
    }
    return data;
  }, [count]);

  const [positions, opacities, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const op = new Float32Array(count);
    const sz = new Float32Array(count);
    return [pos, op, sz];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    if (!animProps || !animProps.current) return;

    // Read live scroll progress from the shared GSAP-animated ref
    const scrollProgress = animProps.current.progress;

    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const opacityAttr = pointsRef.current.geometry.attributes.customOpacity;
    const sizeAttr = pointsRef.current.geometry.attributes.customSize;

    for (let i = 0; i < count; i++) {
      const p = particleData[i];
      const xIdx = i * 3;
      const yIdx = i * 3 + 1;
      const zIdx = i * 3 + 2;

      if (scrollProgress < p.spawnProgress) {
        // Not spawned yet
        positionsAttr.array[xIdx] = 0;
        positionsAttr.array[yIdx] = -999; // hide under floor
        positionsAttr.array[zIdx] = 0;
        opacityAttr.array[i] = 0;
        sizeAttr.array[i] = 0;
      } else {
        // Particle is active. Calculate its relative age (0 to 1)
        const age = (scrollProgress - p.spawnProgress) / (1 - p.spawnProgress);
        
        // Find where the car's rear wheels were at the exact moment of spawn
        const spawnCarZ = getCarZAtProgress(p.spawnProgress);
        const spawnZ = spawnCarZ - 1.4; // 1.4 units behind car origin (rear tires are at -Z relative to origin)

        // Calculate current drifted position
        positionsAttr.array[xIdx] = p.wheelOffsetX + p.driftX * age;
        positionsAttr.array[yIdx] = p.wheelOffsetY + p.driftY * age;
        positionsAttr.array[zIdx] = spawnZ + p.driftZ * age;

        // Size starts medium, expands
        sizeAttr.array[i] = (1.5 + age * 4.5) * p.randScale;

        // Opacity starts high, fades out
        // Smoke becomes overall denser as scroll progresses
        const densityFactor = Math.min((scrollProgress - 0.76) / 0.12, 1.0);
        opacityAttr.array[i] = (1.0 - age) * 0.45 * densityFactor;
      }
    }

    positionsAttr.needsUpdate = true;
    opacityAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
  });

  // Custom shader material for soft round smoke particles
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color('#44444c') },
        ambientLightColor: { value: new THREE.Color('#15151b') },
        headlightIntensity: { value: 0.0 }
      },
      vertexShader: `
        attribute float customOpacity;
        attribute float customSize;
        varying float vOpacity;
        void main() {
          vOpacity = customOpacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = customSize * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 ambientLightColor;
        varying float vOpacity;
        void main() {
          // Circular soft particle shape
          float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (dist > 0.5) discard;
          
          // Soft edge blending
          float alpha = smoothstep(0.5, 0.1, dist) * vOpacity;
          
          // Basic smoke shading
          vec3 finalColor = mix(ambientLightColor, color, 0.7);
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-customOpacity"
          args={[opacities, 1]}
        />
        <bufferAttribute
          attach="attributes-customSize"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}
