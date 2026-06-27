import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import DustParticles from './DustParticles';
import SmokeParticles from './SmokeParticles';

/**
 * F1CarScene — reads animation state directly from a shared ref
 * that GSAP mutates every frame via ScrollTrigger scrub.
 *
 * This bypasses the React prop pipeline entirely so useFrame always
 * sees the latest interpolated values at 60 fps.
 */
export default function F1CarScene({ modelUrl, animProps, getCarZAtProgress }) {
  const { scene } = useGLTF(modelUrl);
  const carRef = useRef();
  const wheelsRef = useRef([]);

  const { camera } = useThree();

  // Smoothed camera state (lerped each frame for cinematic feel)
  const smoothCam = useRef({
    px: -2.2, py: 0.6, pz: 3.5,
    tx: -1.0, ty: 0.3, tz: 1.8,
    fov: 50,
  });

  // Center, scale and traverse the scene once loaded
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Scale the car to about 5 units long for proper framing
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 5.0 / maxDim;
    scene.scale.setScalar(scaleFactor);
    scene.position.set(
      -center.x * scaleFactor,
      -box.min.y * scaleFactor,
      -center.z * scaleFactor
    );

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

        // Enhance material reflectivity for cinematic look
        // but keep the model's original colors (red livery)
        if (child.material && child.material.isMeshStandardMaterial) {
          child.material = child.material.clone();
          // Slightly boost reflections for studio/night env look
          child.material.envMapIntensity = 1.5;
        }
      }
    });

    wheelsRef.current = wheels;
  }, [scene]);

  // --- Per-frame update: read directly from the GSAP-animated ref ---
  useFrame((state) => {
    if (!animProps || !animProps.current) return;

    const a = animProps.current;  // live GSAP values
    const time = state.clock.getElapsedTime();
    const progress = a.progress;

    // 1. Position and pitch the car
    if (carRef.current) {
      carRef.current.position.z = a.carZ;
      carRef.current.rotation.x = a.carPitch;

      // Phase 3 (40%-55%): Idle engine suspension vibration
      if (progress >= 0.4 && progress <= 0.55) {
        const engineVibY = Math.sin(time * 65) * 0.003 * a.vibration;
        const engineVibX = Math.cos(time * 55) * 0.0005 * a.vibration;
        carRef.current.position.y = engineVibY;
        carRef.current.rotation.z = engineVibX;
      } else if (progress > 0.55 && progress <= 0.75) {
        // Phase 4 (55%-75%): Launch jitter
        const launchJitter = Math.sin(time * 80) * 0.005 * a.vibration;
        carRef.current.position.y = launchJitter;
        carRef.current.rotation.z = 0;
      } else {
        carRef.current.position.y = 0;
        carRef.current.rotation.z = 0;
      }
    }

    // 2. Spin wheels
    wheelsRef.current.forEach((wheel) => {
      wheel.rotation.x = a.wheelRotation;
    });

    // 3. Camera — lerp towards GSAP targets for smooth cinematic motion
    const lerpFactor = 0.08;
    const sc = smoothCam.current;

    sc.px = THREE.MathUtils.lerp(sc.px, a.cameraPosX, lerpFactor);
    sc.py = THREE.MathUtils.lerp(sc.py, a.cameraPosY, lerpFactor);
    sc.pz = THREE.MathUtils.lerp(sc.pz, a.cameraPosZ, lerpFactor);
    sc.tx = THREE.MathUtils.lerp(sc.tx, a.cameraTarX, lerpFactor);
    sc.ty = THREE.MathUtils.lerp(sc.ty, a.cameraTarY, lerpFactor);
    sc.tz = THREE.MathUtils.lerp(sc.tz, a.cameraTarZ, lerpFactor);
    sc.fov = THREE.MathUtils.lerp(sc.fov, a.cameraFov, lerpFactor);

    camera.position.set(sc.px, sc.py, sc.pz);

    // Camera shake during launch (Phase 4: 55%-75%)
    if (progress > 0.55 && progress < 0.75) {
      const shakeFactor = (progress - 0.55) / 0.2;
      camera.position.x += Math.sin(time * 110) * 0.012 * shakeFactor;
      camera.position.y += Math.cos(time * 95) * 0.012 * shakeFactor;
    }

    camera.fov = sc.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(sc.tx, sc.ty, sc.tz);
  });

  return (
    <>
      {/* Cinematic Night Environment Map for automotive reflections */}
      <Environment preset="night" />

      {/* Ambient Light */}
      <ambientLight intensity={0.12} />

      {/* Key light — dramatic front-left, revealing the car's contours */}
      <directionalLight
        position={[-6, 8, 8]}
        intensity={3.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />

      {/* Fill light — softer from the right */}
      <directionalLight
        position={[5, 4, -4]}
        intensity={1.2}
        color="#2e3a59"
      />

      {/* Rim light — dramatic backlight for silhouette edges */}
      <directionalLight
        position={[0, 4, -10]}
        intensity={2.0}
        color="#334466"
      />

      {/* Ground accent light — subtle red reflection from below */}
      <pointLight
        position={[0, 0.1, 0]}
        intensity={0.5}
        color="#220000"
        distance={15}
      />

      {/* Headlights effect */}
      <spotLight
        position={[0, 1.5, -4]}
        target-position={[0, 0.4, -15]}
        intensity={(animProps?.current?.headlightIntensity ?? 0) * 15}
        angle={0.65}
        penumbra={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Rear brake glow */}
      <spotLight
        position={[0, 0.5, 2.5]}
        target-position={[0, 0, 8]}
        intensity={(animProps?.current?.progress ?? 0) > 0.5 ? 5 : 1}
        angle={1.2}
        penumbra={0.5}
        color="#ff0000"
      />

      {/* Car Model — rotated 180° so the nose points towards -Z (camera starts in front) */}
      <group ref={carRef} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
        <primitive object={scene} />
      </group>

      {/* Shadow-receiving ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[150, 300]} />
        <meshStandardMaterial
          color="#060608"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Grid for track motion sense */}
      <gridHelper args={[150, 150, '#22222a', '#0c0c10']} position={[0, 0.01, 0]} />

      {/* Ambient Floating Dust */}
      <DustParticles count={200} />

      {/* Tire Smoke — pass animProps ref so it reads live scroll progress */}
      <SmokeParticles
        animProps={animProps}
        getCarZAtProgress={getCarZAtProgress}
        count={150}
      />
    </>
  );
}
