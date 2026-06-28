import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import DustParticles from './DustParticles';
import SmokeParticles from './SmokeParticles';
import { TIMINGS, CAR_GEOMETRY } from './Hero';

/**
 * F1CarScene — reads animation state directly from a shared ref
 * that GSAP mutates every frame via ScrollTrigger scrub.
 *
 * This bypasses the React prop pipeline entirely so useFrame always
 * sees the latest interpolated values at 60 fps.
 */
export default function F1CarScene({ modelUrl, animProps, getCarZAtProgress }) {
  const { scene: originalScene } = useGLTF(modelUrl);
  const scene = useMemo(() => {
    const cloned = originalScene.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Scale the car to about 5 units long for proper framing
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 5.0 / maxDim;
    cloned.scale.setScalar(scaleFactor);
    cloned.position.set(
      -center.x * scaleFactor,
      -box.min.y * scaleFactor,
      -center.z * scaleFactor
    );
    return cloned;
  }, [originalScene]);

  // Procedural Racetrack Textures (CanvasTexture)
  const trackTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    
    // Base asphalt color (dark grey)
    ctx.fillStyle = "#16161b";
    ctx.fillRect(0, 0, 512, 512);

    // Asphalt noise grain
    for (let i = 0; i < 20000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = 0.5 + Math.random() * 1.5;
      const val = 12 + Math.floor(Math.random() * 14);
      ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
      ctx.fillRect(x, y, size, size);
    }

    // Red and White Checkered Curb Segments on the left/right boundaries
    const curbWidth = 36;
    const segHeight = 64;
    for (let y = 0; y < 512; y += segHeight) {
      const isRed = (y / segHeight) % 2 === 0;
      ctx.fillStyle = isRed ? "#d32f2f" : "#f5f5f5";
      // Left curb
      ctx.fillRect(0, y, curbWidth, segHeight);
      // Right curb
      ctx.fillRect(512 - curbWidth, y, curbWidth, segHeight);
    }

    // Solid white track lines separating curbs from the main lane
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(curbWidth, 0, 6, 512);
    ctx.fillRect(512 - curbWidth - 6, 0, 6, 512);

    // Yellow dashed center line
    ctx.strokeStyle = "#ffb300";
    ctx.lineWidth = 8;
    ctx.setLineDash([32, 32]);
    ctx.beginPath();
    ctx.moveTo(256, 0);
    ctx.lineTo(256, 512);
    ctx.stroke();
    ctx.setLineDash([]);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 15);
    texture.anisotropy = 8;
    return texture;
  }, []);

  const trackRoughnessMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#888888";
    ctx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 15000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = 0.5 + Math.random() * 1.5;
      const val = 100 + Math.floor(Math.random() * 60);
      ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
      ctx.fillRect(x, y, size, size);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 15);
    return texture;
  }, []);

  const startGridTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, 512, 512);

    // Draw white staging box outline (F1 grid box style)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 14;
    // Outer boundary box
    ctx.strokeRect(128, 96, 256, 320);

    // Yellow contact line for front tires alignment
    ctx.fillStyle = "#ffb300";
    ctx.fillRect(128, 96, 256, 20);

    // Checkered line at the rear of the box
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    const size = 32;
    for (let x = 128; x < 384; x += size) {
      if ((x / size) % 2 === 0) {
        ctx.fillRect(x, 416 - size, size, size);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const carRef = useRef();
  const wheelsRef = useRef([]);

  const { camera } = useThree();

  // Physics & Animation Accumulation Refs
  const prevCarZ = useRef(0);
  const smoothWheelSpeed = useRef(0);
  const wheelRotationRef = useRef(0);
  const smoothLookAt = useRef(new THREE.Vector3(0, 0.5, 0));
  
  // Spotlight refs for direct frame updates
  const headlightRef = useRef();
  const brakeLightRef = useRef();
  
  // Material caching to prevent duplicate cloning (performance)
  const materialCache = useRef(new Map());

  // SpotLight target objects (pre-allocated to avoid first-frame null target warnings in R3F)
  const headlightTarget = useMemo(() => new THREE.Object3D(), []);
  const brakeLightTarget = useMemo(() => new THREE.Object3D(), []);

  // Traverse the scene once loaded
  useEffect(() => {
    const wheels = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = child.name.toLowerCase();

        // Identify wheels/tires/rims for rotation
        if (
          name.includes('wheel') ||
          name.includes('tire') ||
          name.includes('tyre') ||
          name.includes('rim') ||
          name.includes('rubber')
        ) {
          wheels.push(child);
        }

        // Enhance material reflectivity for cinematic look using cache
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material = child.material.map((mat) => {
              if (mat.isMeshStandardMaterial) {
                if (!materialCache.current.has(mat)) {
                  const cloned = mat.clone();
                  cloned.envMapIntensity = 1.5;
                  materialCache.current.set(mat, cloned);
                }
                return materialCache.current.get(mat);
              }
              return mat;
            });
          } else {
            const mat = child.material;
            if (mat.isMeshStandardMaterial) {
              if (!materialCache.current.has(mat)) {
                const cloned = mat.clone();
                cloned.envMapIntensity = 1.5;
                materialCache.current.set(mat, cloned);
              }
              child.material = materialCache.current.get(mat);
            }
          }
        }
      }
    });

    wheelsRef.current = wheels;
  }, [scene]);

  // --- Per-frame update: read directly from the GSAP-animated ref ---
  useFrame((state, delta) => {
    if (!animProps || !animProps.current) return;

    const a = animProps.current;  // live GSAP values
    const time = state.clock.getElapsedTime();
    const progress = a.progress ?? 0;

    // 1. Position, pitch and vibration of the car
    if (carRef.current) {
      carRef.current.position.z = a.carZ;

      // Calculate physical velocity along the track
      const targetSpeed = delta > 0 ? (a.carZ - prevCarZ.current) / delta : 0;
      prevCarZ.current = a.carZ;

      // Apply damping to wheel speed to give it inertia when scrolling stops
      smoothWheelSpeed.current = THREE.MathUtils.lerp(smoothWheelSpeed.current, targetSpeed, 0.15);

      // Accumulate wheel rotation based on physical direction & velocity
      wheelRotationRef.current += smoothWheelSpeed.current * 0.5 * delta;

      // Spin wheels
      wheelsRef.current.forEach((wheel) => {
        wheel.rotation.x = wheelRotationRef.current;
      });

      // Suspension physics: pitch squat under acceleration, lift under braking
      const accel = targetSpeed - smoothWheelSpeed.current;
      const accelerationPitch = THREE.MathUtils.clamp(accel * 0.003, -0.04, 0.04);

      // Micro suspension bumpiness when moving
      const speedMagnitude = Math.abs(smoothWheelSpeed.current);
      const suspensionBump = Math.sin(time * 35) * 0.0015 * Math.min(speedMagnitude / 30, 1.0);

      // Engine vibrations using multiple prime frequencies to avoid repeating patterns
      let engineVibY = 0;
      let engineVibZ = 0;

      if (a.launchJitter > 0.001) {
        const jitter = a.launchJitter;
        engineVibY = (Math.sin(time * 80.0) * 0.5 + Math.sin(time * 137.0) * 0.3 + Math.sin(time * 47.0) * 0.2) * 0.005 * jitter;
        engineVibZ = (Math.cos(time * 70.0) * 0.5 + Math.cos(time * 113.0) * 0.3) * 0.003 * jitter;
      } else if (a.idleVibration > 0.001) {
        const vib = a.idleVibration;
        engineVibY = (Math.sin(time * 55.0) * 0.5 + Math.sin(time * 97.0) * 0.3 + Math.sin(time * 31.0) * 0.2) * 0.0025 * vib;
        engineVibZ = (Math.cos(time * 45.0) * 0.5 + Math.cos(time * 79.0) * 0.3) * 0.0004 * vib;
      }

      const targetPitch = a.carPitch + accelerationPitch + suspensionBump;
      carRef.current.rotation.x = THREE.MathUtils.lerp(carRef.current.rotation.x, targetPitch, 0.15);
      carRef.current.position.y = engineVibY;
      carRef.current.rotation.z = engineVibZ;
      carRef.current.rotation.y = a.carRotY ?? Math.PI;
    }

    // 2. Camera: Remove double-smoothing on position (snap directly to GSAP)
    const orbitBlend = THREE.MathUtils.clamp(a.cameraOrbitBlend ?? 0, 0, 1);
    const orbitAngle = a.cameraOrbitAngle ?? 0;
    const orbitRadius = a.cameraOrbitRadius ?? 10.8;
    
    const orbitPosX = Math.sin(orbitAngle) * orbitRadius;
    const orbitPosY = a.cameraOrbitHeight ?? a.cameraPosY;
    const orbitPosZ = Math.cos(orbitAngle) * orbitRadius;

    const targetPosX = THREE.MathUtils.lerp(a.cameraPosX, orbitPosX, orbitBlend);
    const targetPosY = THREE.MathUtils.lerp(a.cameraPosY, orbitPosY, orbitBlend);
    const targetPosZ = THREE.MathUtils.lerp(a.cameraPosZ, orbitPosZ, orbitBlend);

    camera.position.set(targetPosX, targetPosY, targetPosZ);

    // LookAt targets: Smooth target vector for cinematic lookAt slerp orientation
    const targetTarX = THREE.MathUtils.lerp(a.cameraTarX, a.cameraOrbitTargetX ?? a.cameraTarX, orbitBlend);
    const targetTarY = THREE.MathUtils.lerp(a.cameraTarY, a.cameraOrbitTargetY ?? a.cameraTarY, orbitBlend);
    const targetTarZ = THREE.MathUtils.lerp(a.cameraTarZ, a.cameraOrbitTargetZ ?? a.cameraTarZ, orbitBlend);

    const targetLookAt = new THREE.Vector3(targetTarX, targetTarY, targetTarZ);
    smoothLookAt.current.lerp(targetLookAt, 0.12);
    camera.lookAt(smoothLookAt.current);

    // Optimize FOV updates (only update projection matrix when fov changes)
    const targetFov = a.cameraFov ?? 50;
    if (Math.abs(camera.fov - targetFov) > 0.01) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }

    // 3. Direct Ref Intensity Updates to bypass React re-renders in useFrame
    if (headlightRef.current) {
      headlightRef.current.intensity = (a.headlightIntensity ?? 0) * 20;
    }

    if (brakeLightRef.current) {
      let activeBrakeIntensity = 1.0;
      if (progress < 0.5) {
        activeBrakeIntensity = 1.0; // Ambient tail light
      } else if (progress < TIMINGS.LEFT_LOCK) {
        // Hold staging brakes prep
        const t = (progress - 0.5) / (TIMINGS.LEFT_LOCK - 0.5);
        activeBrakeIntensity = THREE.MathUtils.lerp(1.0, 5.0, t);
      } else if (progress < TIMINGS.LAUNCH) {
        activeBrakeIntensity = 5.0; // Fully holding brakes
      } else if (progress < TIMINGS.LAUNCH + 0.06) {
        // Release brakes on launch
        const t = (progress - TIMINGS.LAUNCH) / 0.06;
        activeBrakeIntensity = THREE.MathUtils.lerp(5.0, 0.2, t);
      } else {
        activeBrakeIntensity = 0.2; // Brake released, faint tail glow
      }
      brakeLightRef.current.intensity = activeBrakeIntensity;
    }
  });

  return (
    <>
      {/* Studio environment preset for clean reflection mapping on automotive panels */}
      <Environment preset="studio" />

      {/* Ambient Light (reduced for better contrast) */}
      <ambientLight intensity={0.08} />

      {/* Key light — dramatic front-left key light for crisp contours & shadow maps */}
      <directionalLight
        position={[-6, 8, 6]}
        intensity={3.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />

      {/* Rim light — back-rim light for silhouette outlines */}
      <directionalLight
        position={[0, 5, -8]}
        intensity={2.5}
        color="#334466"
      />

      {/* Ground accent light — subtle red reflection from below */}
      <pointLight
        position={[0, 0.1, 0]}
        intensity={0.5}
        color="#220000"
        distance={15}
      />

      {/* Car Model Group */}
      <group ref={carRef} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
        <primitive object={scene} />

        {/* Headlights (Local to car, nose points to local -Z) */}
        <spotLight
          ref={headlightRef}
          position={[0, 0.5, -2.2]}
          intensity={0}
          angle={0.5}
          penumbra={0.8}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          target={headlightTarget}
        />
        <primitive object={headlightTarget} position={[0, 0.4, -12]} />

        {/* Rear Brake Light (Local to car, rear is local +Z) */}
        <spotLight
          ref={brakeLightRef}
          position={[0, 0.4, 2.2]}
          intensity={0}
          angle={0.8}
          penumbra={0.6}
          color="#ff0000"
          target={brakeLightTarget}
        />
        <primitive object={brakeLightTarget} position={[0, 0.3, 10]} />
      </group>

      {/* Dark background tarmac/runoff area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[150, 300]} />
        <meshStandardMaterial
          color="#060608"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Racetrack Center Strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[16, 300]} />
        <meshStandardMaterial
          map={trackTexture}
          roughnessMap={trackRoughnessMap}
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* F1 Staging Grid Box overlay (placed at start position z = 0) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          map={startGridTexture}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Ambient Floating Dust */}
      <DustParticles count={200} />

      {/* Tire Smoke — reads live scroll & time properties */}
      <SmokeParticles
        animProps={animProps}
        getCarZAtProgress={getCarZAtProgress}
        count={250}
      />
    </>
  );
}
