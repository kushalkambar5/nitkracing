import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import F1CarScene from './F1CarScene';
import carModelUrl from '../assets/f1_car_3d_model.glb?url';

// Register ScrollTrigger with GSAP (once, at module level)
gsap.registerPlugin(ScrollTrigger);

export default function Hero({ setPath }) {
  const scrollContainerRef = useRef(null);
  const viewportRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { active, progress } = useProgress();

  // Shared mutable ref — GSAP writes to this, R3F useFrame reads it.
  // This bypasses React's prop/render system for 60fps animation.
  const animProps = useRef({
    progress: 0,
    carZ: 0,
    wheelRotation: 0,
    carPitch: 0,
    headlightIntensity: 0.0,

    // Camera — start at right-front tire close-up
    // Car Front = +Z. Car Right = -X
    cameraPosX: -2.2,
    cameraPosY: 0.6,
    cameraPosZ: 3.5,
    cameraTarX: -1.0,
    cameraTarY: 0.3,
    cameraTarZ: 1.8,
    cameraFov: 50,

    vibration: 0,

    // HUD/UI
    hudOpacity: 1.0,
    telemetryOpacity: 0.0,
    speed: 0,
    rpm: 800,
    gear: 1,
    smokeFadeOpacity: 0.0
  });

  // Track loading progress
  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  // Interpolation for car Z — used by smoke particles
  const getCarZAtProgress = (p) => {
    if (p <= 0.55) return 0;
    if (p <= 0.75) {
      return ((p - 0.55) / 0.2) * 22;
    }
    if (p <= 0.90) {
      return 22 + ((p - 0.75) / 0.15) * 20;
    }
    return 42 + ((p - 0.90) / 0.1) * 18;
  };

  // --- GSAP ScrollTrigger Timeline ---
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
          pin: viewportRef.current,
          pinSpacing: false,
          onUpdate: (self) => {
            animProps.current.progress = self.progress;

            // Direct DOM updates for HUD performance
            const speedEl = document.getElementById('hud-speed');
            const rpmEl = document.getElementById('hud-rpm');
            const gearEl = document.getElementById('hud-gear');
            const telemetryEl = document.getElementById('hud-telemetry-container');
            const mainContentEl = document.getElementById('hud-main-content');
            const smokeFadeEl = document.getElementById('smoke-fade-overlay');
            const progressLineEl = document.getElementById('hud-progress-line');

            if (speedEl) speedEl.textContent = Math.floor(animProps.current.speed);
            if (rpmEl) rpmEl.textContent = Math.floor(animProps.current.rpm);
            if (gearEl) gearEl.textContent = Math.floor(animProps.current.gear);

            if (telemetryEl) {
              telemetryEl.style.opacity = animProps.current.telemetryOpacity;
              telemetryEl.style.transform = `translateY(${(1.0 - animProps.current.telemetryOpacity) * 20}px)`;
            }
            if (mainContentEl) {
              mainContentEl.style.opacity = animProps.current.hudOpacity;
              mainContentEl.style.transform = `translateY(${(animProps.current.hudOpacity - 1.0) * -20}px)`;
            }
            if (smokeFadeEl) {
              smokeFadeEl.style.opacity = animProps.current.smokeFadeOpacity;
              smokeFadeEl.style.pointerEvents = animProps.current.smokeFadeOpacity > 0.8 ? 'auto' : 'none';
            }
            if (progressLineEl) {
              progressLineEl.style.width = `${self.progress * 100}%`;
            }
          }
        }
      });

      // ==========================================
      // PHASE 1 (0% → 15%): Right-Front Tire Close-Up
      // Tight shot on the right-front wheel, headlights turn on
      // ==========================================
      tl.to(animProps.current, {
        headlightIntensity: 1.0,
        // Slight pull-back to reveal more of the tire
        cameraPosX: -2.5,
        cameraPosY: 0.8,
        cameraPosZ: 4.0,
        cameraTarX: -0.8,
        cameraTarY: 0.3,
        cameraTarZ: 1.5,
        duration: 0.15,
        ease: 'power2.inOut'
      });

      // ==========================================
      // PHASE 2 (15% → 35%): Pull Back to Front View
      // Camera pulls back and centers to reveal the full front
      // Headline text fades out
      // ==========================================
      tl.to(animProps.current, {
        cameraPosX: -0.5,
        cameraPosY: 1.6,
        cameraPosZ: 10.0,
        cameraTarX: 0,
        cameraTarY: 0.5,
        cameraTarZ: 0,
        cameraFov: 38,

        hudOpacity: 0.0,

        duration: 0.20,
        ease: 'power2.inOut'
      }, 0.15);

      // ==========================================
      // PHASE 3 (35% → 55%): Right Side Profile (Car faces Left on screen)
      // Camera orbits to the right side (-X)
      // We view from the right so the car faces left on screen,
      // allowing it to exit left when it launches forward.
      // ==========================================
      tl.to(animProps.current, {
        cameraPosX: -12.0,
        cameraPosY: 1.5,
        cameraPosZ: 0.5,
        cameraTarX: 0,
        cameraTarY: 0.5,
        cameraTarZ: 0,
        cameraFov: 34,

        telemetryOpacity: 1.0,
        vibration: 1.0,
        rpm: 4200,

        duration: 0.20,
        ease: 'power1.inOut'
      }, 0.35);

      // ==========================================
      // PHASE 4 (55% → 75%): THE LAUNCH
      // Car accelerates forward (+Z). Camera tracks from the right.
      // Car appears to rush toward the LEFT side of the screen.
      // ==========================================
      tl.to(animProps.current, {
        carZ: 22,
        wheelRotation: 55, // Positive rotation for forward motion
        carPitch: 0.03, // Nose up slightly during launch
        vibration: 1.5,

        speed: 220,
        rpm: 12800,
        gear: 4,

        // Camera tracking
        cameraPosX: -8.0,
        cameraPosY: 1.8,
        cameraPosZ: 5.0,
        cameraTarX: 2.0,
        cameraTarY: 0.4,
        cameraTarZ: 22.0,
        cameraFov: 36,

        duration: 0.20,
        ease: 'power2.in'
      }, 0.55);

      // Settle body pitch back
      tl.to(animProps.current, {
        carPitch: 0.0,
        duration: 0.05,
        ease: 'power1.out'
      }, 0.70);

      // ==========================================
      // PHASE 5 (75% → 90%): Car Exits Left
      // Car continues forward at high speed. Camera stays
      // in place, car vanishes to the left of frame.
      // ==========================================
      tl.to(animProps.current, {
        carZ: 42,
        wheelRotation: 90,
        vibration: 0.6,

        speed: 312,
        rpm: 13500,
        gear: 6,

        cameraPosX: -10.0,
        cameraPosY: 2.0,
        cameraPosZ: 2.0,
        cameraTarX: 5.0,
        cameraTarY: 0.5,
        cameraTarZ: 45.0,
        cameraFov: 40,

        duration: 0.15,
        ease: 'power1.out'
      }, 0.75);

      // ==========================================
      // PHASE 6 (90% → 100%): Fade to Black
      // ==========================================
      tl.to(animProps.current, {
        carZ: 60,
        wheelRotation: 120,

        cameraTarZ: 65.0,

        telemetryOpacity: 0.0,
        smokeFadeOpacity: 1.0,

        duration: 0.10,
        ease: 'power2.inOut'
      }, 0.90);

    }, scrollContainerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <section ref={scrollContainerRef} className="hero-scroll-container">
      {/* 1. Loading Overlay */}
      {loading && (
        <div className="telemetry-loader">
          <div className="loader-hud">
            <div className="loader-header">
              <span className="accent-text">NITKRACING // CORE_ECU</span>
              <span className="loader-status">BOOTING SYSTEM...</span>
            </div>

            <div className="loader-bar-container">
              <div className="loader-bar" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="loader-diagnostics">
              <div className="diag-line">LOADING 3D ENGINE MESHES ... {progress === 100 ? 'OK' : 'PENDING'}</div>
              <div className="diag-line">STABILIZING SUSPENSION SYSTEM ... {progress > 60 ? 'OK' : 'PENDING'}</div>
              <div className="diag-line">CALIBRATING TELEMETRY LINK ... {progress > 30 ? 'OK' : 'PENDING'}</div>
              <div className="diag-line accent-text font-bold">BOOT SEQUENCE COMPLETE: SCROLL TO INITIALIZE LAUNCH</div>
            </div>

            <div className="loader-percentage">
              {Math.floor(progress)}%
            </div>
          </div>
        </div>
      )}

      {/* 2. Pinned Viewport — ScrollTrigger will pin this */}
      <div ref={viewportRef} className="hero-pinned-viewport">
        {/* Three.js WebGL Canvas */}
        <Canvas
          shadows
          gl={{ antialias: true, alpha: false }}
          className="hero-canvas"
        >
          <Suspense fallback={null}>
            <F1CarScene
              modelUrl={carModelUrl}
              animProps={animProps}
              getCarZAtProgress={getCarZAtProgress}
            />
          </Suspense>
        </Canvas>

        {/* 3. Headline Text Overlay (fades out in Phase 2) */}
        <div id="hud-main-content" className="hud-layer container main-content-layer">
          <div className="hero-eyebrow">
            <div className="chevron-decor">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="eyebrow-text">Formula Student Team</span>
          </div>

          <h1 className="hero-title">
            Built by students.<br />
            <span className="accent-text">Driven by passion.</span>
          </h1>

          <p className="hero-description">
            NITKRacing is the official Formula Student team of NITK Surathkal. We design, manufacture, and test high-performance formula racecars to compete globally.
          </p>

          <div className="hero-actions">
            <a href="#recruitments" className="btn btn-primary">
              Join the Team
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <button className="btn btn-secondary" onClick={() => { setPath('/achievements'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Our Legacy
            </button>
          </div>

          <div className="scroll-indicator">
            <span className="indicator-arrow">↓</span>
            <span className="indicator-text">SCROLL TO LAUNCH</span>
          </div>
        </div>

        {/* 4. Telemetry HUD (fades in during Phase 2) */}
        <div id="hud-telemetry-container" className="hud-layer telemetry-layer" style={{ opacity: 0 }}>
          <div className="telemetry-top">
            <span className="telemetry-logo">NITKRACING // TELEMETRY</span>
            <span className="telemetry-status-tag">
              <span className="pulse-dot"></span>
              LIVE
            </span>
          </div>

          <div className="telemetry-left">
            <div className="telemetry-card">
              <div className="card-header">VEHICLE DIAGNOSTICS</div>
              <div className="diag-grid">
                <span className="diag-label">ENGINE TEMP</span>
                <span className="diag-val">92°C</span>
                <span className="diag-label">OIL PRESS</span>
                <span className="diag-val">4.2 BAR</span>
                <span className="diag-label">FUEL FLOW</span>
                <span className="diag-val">85 KG/H</span>
                <span className="diag-label">BATTERY</span>
                <span className="diag-val">12.8V</span>
              </div>
            </div>
            <div className="telemetry-card tech-specs">
              <div className="card-header">NR26 SPEC SHEET</div>
              <div className="spec-row"><span>CHASSIS</span><span>Spaceframe Tubular</span></div>
              <div className="spec-row"><span>ENGINE</span><span>600cc Single-Cyl</span></div>
              <div className="spec-row"><span>WEIGHT</span><span>195 kg</span></div>
              <div className="spec-row"><span>0-100</span><span>3.2s</span></div>
            </div>
          </div>

          <div className="telemetry-right">
            <div className="telemetry-gauge">
              <span className="gauge-label">SPEED</span>
              <div className="gauge-value">
                <span id="hud-speed">0</span>
                <span className="gauge-unit">KM/H</span>
              </div>
            </div>
            <div className="telemetry-gauge">
              <span className="gauge-label">RPM</span>
              <div className="gauge-value small-gauge">
                <span id="hud-rpm">800</span>
              </div>
              <div className="rpm-bar-container">
                <div className="rpm-bar" id="hud-progress-line" style={{ background: 'linear-gradient(90deg, #E10600, #ff4444)' }}></div>
              </div>
            </div>
            <div className="telemetry-gauge">
              <span className="gauge-label">GEAR</span>
              <div className="gauge-value">
                <span id="hud-gear">1</span>
              </div>
            </div>
          </div>

          <div className="telemetry-bottom">
            <div className="timeline-labels">
              <span>PHASE: ANTICIPATION</span>
              <span>SCROLL PROGRESS</span>
              <span>LAUNCH SEQUENCE</span>
            </div>
            <div className="timeline-track">
              <div className="timeline-progress" id="hud-progress-line" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>

        {/* 5. Smoke Fade Transition Overlay (Phase 6) */}
        <div id="smoke-fade-overlay" className="smoke-fade-transition-layer" style={{ opacity: 0, pointerEvents: 'none' }}></div>
      </div>

      <style>{`
        .hero-scroll-container {
          position: relative;
          height: 500vh; /* 5 viewports of scroll-controlled animation */
          background-color: #030305;
        }

        .hero-pinned-viewport {
          /* NO position: sticky — ScrollTrigger pins this via position: fixed */
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: #030305;
          z-index: 1;
        }

        .hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .hud-layer {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        /* Loading HUD Screen */
        .telemetry-loader {
          position: fixed;
          inset: 0;
          z-index: 100;
          background-color: #030305;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .loader-hud {
          width: 100%;
          max-width: 600px;
          border: 1px solid var(--border);
          background: rgba(10, 10, 15, 0.95);
          padding: 30px;
          border-radius: var(--border-radius-md);
          font-family: var(--font-mono);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        }

        .loader-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        .loader-bar-container {
          height: 4px;
          background-color: rgba(255, 255, 255, 0.05);
          margin-bottom: 25px;
          position: relative;
          overflow: hidden;
        }

        .loader-bar {
          height: 100%;
          background-color: var(--accent);
          transition: width 0.1s ease-out;
          box-shadow: 0 0 10px var(--accent);
        }

        .loader-diagnostics {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.75rem;
          color: var(--text-muted);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
          margin-bottom: 15px;
        }

        .diag-line {
          letter-spacing: 0.5px;
        }

        .loader-percentage {
          text-align: right;
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Initial Headline Layer */
        .main-content-layer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: auto;
          z-index: 5;
        }

        .main-content-layer * {
          pointer-events: auto;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .chevron-decor {
          display: flex;
          gap: 4px;
        }

        .chevron-decor span {
          display: block;
          width: 8px;
          height: 8px;
          border-top: 2px solid var(--accent);
          border-right: 2px solid var(--accent);
          transform: rotate(45deg);
        }

        .eyebrow-text {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
        }

        .hero-title {
          font-size: 4.5rem;
          line-height: 1.05;
          margin-bottom: 24px;
          letter-spacing: -1.5px;
          font-family: var(--font-primary);
          color: var(--text-primary);
        }

        .hero-title .accent-text {
          color: var(--accent);
          text-shadow: 0 0 15px rgba(225, 6, 0, 0.2);
        }

        .hero-description {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 580px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0.8;
          animation: bounceIndicator 2s infinite ease-in-out;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .indicator-arrow {
          font-size: 1.2rem;
          color: var(--accent);
        }

        @keyframes bounceIndicator {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -8px); }
        }

        /* Telemetry Live HUD Overlay */
        .telemetry-layer {
          display: grid;
          grid-template-columns: 320px 1fr 340px;
          grid-template-rows: 60px 1fr 80px;
          padding: 30px;
          box-sizing: border-box;
          font-family: var(--font-mono);
          color: var(--text-primary);
          transition: opacity 0.4s ease, transform 0.4s ease;
          background: radial-gradient(circle at center, transparent 30%, rgba(3, 3, 5, 0.4) 100%);
        }

        .telemetry-top {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 12px;
        }

        .telemetry-logo {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 2px;
        }

        .telemetry-status-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(225, 6, 0, 0.1);
          border: 1px solid var(--accent);
          color: var(--accent);
          padding: 4px 10px;
          border-radius: var(--border-radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .pulse-dot {
          display: block;
          width: 6px;
          height: 6px;
          background-color: var(--accent);
          border-radius: 50%;
          animation: pulseDot 1s infinite alternate;
        }

        @keyframes pulseDot {
          from { opacity: 0.3; transform: scale(0.8); }
          to { opacity: 1.0; transform: scale(1.2); }
        }

        .telemetry-left {
          grid-column: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: center;
        }

        .telemetry-card {
          background: rgba(10, 10, 15, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 20px;
          border-radius: var(--border-radius-sm);
          backdrop-filter: blur(8px);
        }

        .card-header {
          font-size: 0.75rem;
          color: var(--text-muted);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }

        .diag-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          row-gap: 10px;
          font-size: 0.75rem;
        }

        .diag-label {
          color: var(--text-muted);
        }

        .diag-val {
          text-align: right;
          font-weight: 600;
        }

        .tech-specs {
          font-size: 0.7rem;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.03);
          padding-bottom: 4px;
        }
        .spec-row span:first-child {
          color: var(--text-muted);
        }

        .telemetry-right {
          grid-column: 3;
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: center;
        }

        .telemetry-gauge {
          background: rgba(10, 10, 15, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 20px;
          border-radius: var(--border-radius-sm);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
        }

        .gauge-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 5px;
          letter-spacing: 1px;
        }

        .gauge-value {
          font-size: 3.2rem;
          font-weight: 700;
          line-height: 1;
          display: flex;
          align-items: baseline;
          gap: 5px;
        }

        .small-gauge {
          font-size: 1.8rem;
        }

        .gauge-unit {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 400;
        }

        .rpm-bar-container {
          height: 3px;
          background-color: rgba(255, 255, 255, 0.05);
          margin-top: 10px;
          border-radius: 1px;
          overflow: hidden;
        }

        .rpm-bar {
          height: 100%;
          width: 0%;
          transition: width 0.05s ease-out;
        }

        .telemetry-bottom {
          grid-column: 1 / -1;
          grid-row: 3;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 10px;
        }

        .timeline-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .timeline-track {
          height: 2px;
          background-color: rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .timeline-progress {
          height: 100%;
          background-color: var(--accent);
          box-shadow: 0 0 8px var(--accent);
        }

        /* Seamless smoke fade overlay */
        .smoke-fade-transition-layer {
          position: absolute;
          inset: 0;
          background-color: #030305;
          z-index: 99;
          transition: opacity 0.1s ease-out;
        }

        /* Responsive styling */
        @media (max-width: 992px) {
          .telemetry-layer {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 60px 1fr 1fr 60px;
            padding: 16px;
            gap: 12px;
          }
          .telemetry-left {
            grid-column: 1;
            grid-row: 2;
          }
          .telemetry-right {
            grid-column: 2;
            grid-row: 2;
          }
          .telemetry-bottom {
            grid-column: 1 / -1;
            grid-row: 4;
          }
          .hero-title {
            font-size: 3.2rem;
          }
        }

        @media (max-width: 768px) {
          .telemetry-layer {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            overflow-y: auto;
            pointer-events: auto;
          }
          .telemetry-left, .telemetry-right {
            grid-column: 1;
          }
          .telemetry-bottom {
            display: none;
          }
          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
