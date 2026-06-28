import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TIMINGS } from './Hero';

/**
 * SmokeParticles — a high-performance time-based particle emission system.
 * Once spawned, smoke updates in time (using delta time) rather than being
 * tied to scroll. If scrolling stops, the smoke continues to drift and fade.
 */
export default function SmokeParticles({ animProps, getCarZAtProgress, count = 250 }) {
  const pointsRef = useRef();

  // Create a pre-allocated pool of particles to avoid GC overhead
  const particles = useRef([]);
  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.current.push({
        active: false,
        x: 0,
        y: -999, // Hidden under the ground initially
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        age: 0,
        size: 0,
        opacity: 0,
        seed: Math.random() * 100.0,
      });
    }
  }

  // Pre-allocate arrays for buffer attributes
  const [positions, opacities, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const op = new Float32Array(count);
    const sz = new Float32Array(count);
    return [pos, op, sz];
  }, [count]);

  // Track scroll progress to detect direction and trigger emission
  const prevProgress = useRef(0);
  // Accumulator for fractional particle spawning
  const spawnAccumulator = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current || !animProps || !animProps.current) return;

    const a = animProps.current;
    const progress = a.progress ?? 0;
    const time = state.clock.getElapsedTime();

    // 1. Emission Logic
    const isForward = progress > prevProgress.current;
    prevProgress.current = progress;

    // Trigger emission during the launch phase
    const isLaunching = progress >= TIMINGS.LAUNCH && progress <= TIMINGS.FADE_OUT + 0.05;

    if (isLaunching && isForward) {
      // Scale emission rate with car speed
      const emissionRate = 180;
      spawnAccumulator.current += delta * emissionRate;

      const toSpawn = Math.floor(spawnAccumulator.current);
      spawnAccumulator.current -= toSpawn;

      const carZ = a.carZ;
      const spawnZ = carZ - 1.4; // Rear wheels are 1.4 units behind the model center

      for (let s = 0; s < toSpawn; s++) {
        // Find an inactive particle in the pool
        const p = particles.current.find((pt) => !pt.active);
        if (p) {
          p.active = true;
          p.age = 0;
          p.life = 1.2 + Math.random() * 0.8;

          // Randomly choose left or right tire spawn offset
          const side = Math.random() > 0.5 ? -1 : 1;
          const wheelOffsetX = side * 0.82;
          const wheelOffsetY = 0.25;

          p.x = wheelOffsetX + (Math.random() - 0.5) * 0.25;
          p.y = wheelOffsetY + (Math.random() - 0.5) * 0.1;
          p.z = spawnZ + (Math.random() - 0.5) * 0.3;

          // Throw particles backwards relative to the car and slightly outward
          p.vx = side * (0.3 + Math.random() * 0.6) + (Math.random() - 0.5) * 0.4;
          p.vy = 0.4 + Math.random() * 0.6; // Upward drift
          p.vz = -0.5 - Math.random() * 1.5; // Backward drift
        }
      }
    }

    // 2. Physics & Particle Simulation Update Loop
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const opacityAttr = pointsRef.current.geometry.attributes.customOpacity;
    const sizeAttr = pointsRef.current.geometry.attributes.customSize;

    const drag = 0.95;
    const buoyancy = 0.6;

    for (let i = 0; i < count; i++) {
      const p = particles.current[i];
      const xIdx = i * 3;
      const yIdx = i * 3 + 1;
      const zIdx = i * 3 + 2;

      if (p.active) {
        // Update age in time
        p.age += delta / p.life;

        if (p.age >= 1.0) {
          p.active = false;
          p.age = 0;
          positionsAttr.array[xIdx] = 0;
          positionsAttr.array[yIdx] = -999;
          positionsAttr.array[zIdx] = 0;
          opacityAttr.array[i] = 0;
          sizeAttr.array[i] = 0;
        } else {
          // Physics integration: position += velocity * dt
          p.vy += buoyancy * delta;

          // Add curling/swirling turbulence using sine/cosine noise
          const turbX = Math.sin(time * 6.0 + p.seed) * 0.4;
          const turbY = Math.cos(time * 5.0 + p.seed) * 0.2;
          const turbZ = Math.sin(time * 7.0 + p.seed) * 0.4;

          p.vx += turbX * delta;
          p.vy += turbY * delta;
          p.vz += turbZ * delta;

          p.vx *= drag;
          p.vy *= drag;
          p.vz *= drag;

          p.x += p.vx * delta;
          p.y += p.vy * delta;
          p.z += p.vz * delta;

          positionsAttr.array[xIdx] = p.x;
          positionsAttr.array[yIdx] = p.y;
          positionsAttr.array[zIdx] = p.z;

          // Smoke expands as it ages
          // When engulfed phase starts, increase sizes further to fill camera
          const endEngulf = progress > TIMINGS.FADE_OUT ? 2.5 : 1.0;
          sizeAttr.array[i] = (1.2 + p.age * 5.5) * endEngulf;

          opacityAttr.array[i] = (1.0 - p.age) * 0.45;
        }
      } else {
        positionsAttr.array[xIdx] = 0;
        positionsAttr.array[yIdx] = -999;
        positionsAttr.array[zIdx] = 0;
        opacityAttr.array[i] = 0;
        sizeAttr.array[i] = 0;
      }
    }

    positionsAttr.needsUpdate = true;
    opacityAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
  });

  // Custom shader material for soft, puffy organic smoke with fBm noise
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color('#383840') },
        ambientLightColor: { value: new THREE.Color('#0a0a0f') },
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
          gl_PointSize = customSize * (350.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 ambientLightColor;
        uniform float headlightIntensity;
        varying float vOpacity;

        // Simple hash function for noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        // 2D Value Noise
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f*f*(3.0-2.0*f);
          
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        // Fractal Brownian Motion (fBm) with 3 octaves
        float fBm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 3; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }

        void main() {
          // Circular coords mapped to -0.5 to 0.5
          vec2 uv = gl_PointCoord - vec2(0.5);
          float dist = length(uv);
          if (dist > 0.5) discard;
          
          // Soft radial gradient edges
          float radialAlpha = smoothstep(0.5, 0.1, dist);
          
          // Organic puffiness noise pattern
          float n = fBm(gl_PointCoord * 4.5);
          
          // Combine alpha with noise
          float alpha = radialAlpha * vOpacity * (0.35 + 0.65 * n);
          
          // Dynamic lighting scattering from headlights + ambient background
          vec3 finalColor = mix(ambientLightColor, color, 0.55 + 0.45 * n);
          
          // Headlight scattering contribution
          if (headlightIntensity > 0.05) {
            float scatter = smoothstep(0.0, 0.5, n) * headlightIntensity * 0.4;
            finalColor += vec3(1.0, 0.98, 0.9) * scatter;
          }
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }, []);

  // Sync uniforms to shader material on frame updates
  useFrame(() => {
    if (shaderMaterial && animProps.current) {
      shaderMaterial.uniforms.headlightIntensity.value = animProps.current.headlightIntensity ?? 0.0;
    }
  });

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
