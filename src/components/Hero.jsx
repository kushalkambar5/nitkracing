import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import F1CarScene from "./F1CarScene";
import carModelUrl from "../assets/f1_car_3d_model.glb?url";
import loadingSvg from "../assets/loading.svg";
import { Pointer } from "./ui/pointer";
import { isMobileDevice } from "../utils/performance";

// Resolved once at module load — safe since window is available in browser
const IS_MOBILE = isMobileDevice();

// Register ScrollTrigger with GSAP (once, at module level)
gsap.registerPlugin(ScrollTrigger);

// Animation Timing & Spatial Constants
export const TIMINGS = {
  CLOSE_UP: 0,
  FRONT_REVEAL: 0.14,
  ORBIT_BLEND_IN: 0.28,
  ORBIT_SWEEP: 0.32,
  LEFT_LOCK: 0.68,
  LAUNCH: 0.76,
  FADE_OUT: 0.92,
};

export const CAR_GEOMETRY = {
  MAX_Z: 52,
  FINAL_Z: 72,
};

export default function Hero({ setPath }) {
  const scrollContainerRef = useRef(null);
  const viewportRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { active, progress } = useProgress();

  // HUD Element Refs
  const mainContentRef = useRef(null);
  const smokeFadeRef = useRef(null);


  // Shared mutable ref — GSAP writes to this, R3F useFrame reads it.
  // This bypasses React's prop/render system for 60fps animation.
  const animProps = useRef({
    progress: 0,
    carZ: 0,
    carRotY: Math.PI,
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
    cameraOrbitBlend: 0,
    cameraOrbitAngle: 0,
    cameraOrbitRadius: 10.8,
    cameraOrbitHeight: 1.55,
    cameraOrbitTargetX: 0,
    cameraOrbitTargetY: 0.5,
    cameraOrbitTargetZ: 0,

    idleVibration: 0,
    launchJitter: 0,

    // HUD/UI
    hudOpacity: 1.0,
    telemetryOpacity: 0.0,
    speed: 0,
    rpm: 800,
    gear: 1,
    smokeFadeOpacity: 0.0,
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
    if (p <= TIMINGS.LAUNCH) return 0;
    if (p <= TIMINGS.FADE_OUT) {
      const t = (p - TIMINGS.LAUNCH) / (TIMINGS.FADE_OUT - TIMINGS.LAUNCH);
      return t * CAR_GEOMETRY.MAX_Z;
    }
    const t = (p - TIMINGS.FADE_OUT) / (1.0 - TIMINGS.FADE_OUT);
    return CAR_GEOMETRY.MAX_Z + t * (CAR_GEOMETRY.FINAL_Z - CAR_GEOMETRY.MAX_Z);
  };

  // --- GSAP ScrollTrigger Timeline ---
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top 70px",
          end: "bottom bottom",
          scrub: 1.0,
          pin: viewportRef.current,
          pinSpacing: false,
          onUpdate: (self) => {
            animProps.current.progress = self.progress;

            if (mainContentRef.current) {
              mainContentRef.current.style.opacity = animProps.current.hudOpacity;
              mainContentRef.current.style.transform = `translateY(${(animProps.current.hudOpacity - 1.0) * -20}px)`;
            }
            if (smokeFadeRef.current) {
              smokeFadeRef.current.style.opacity = animProps.current.smokeFadeOpacity;
              smokeFadeRef.current.style.pointerEvents =
                animProps.current.smokeFadeOpacity > 0.8 ? "auto" : "none";
            }
          },
        },
        defaults: {
          ease: "power2.inOut",
        },
      });

      // Define timeline labels from constants
      tl.addLabel("closeUp", TIMINGS.CLOSE_UP);
      tl.addLabel("frontReveal", TIMINGS.FRONT_REVEAL);
      tl.addLabel("orbitBlendIn", TIMINGS.ORBIT_BLEND_IN);
      tl.addLabel("orbitSweep", TIMINGS.ORBIT_SWEEP);
      tl.addLabel("leftLock", TIMINGS.LEFT_LOCK);
      tl.addLabel("launch", TIMINGS.LAUNCH);
      tl.addLabel("fadeOut", TIMINGS.FADE_OUT);

      // Phase 1: right-front detail shot.
      tl.to(
        animProps.current,
        {
          headlightIntensity: 1.0,
          cameraPosX: -2.6,
          cameraPosY: 0.8,
          cameraPosZ: 4.2,
          cameraTarX: -0.8,
          cameraTarY: 0.3,
          cameraTarZ: 1.4,
          duration: TIMINGS.FRONT_REVEAL - TIMINGS.CLOSE_UP,
        },
        "closeUp",
      );

      // Phase 2: centered front reveal.
      tl.to(
        animProps.current,
        {
          cameraPosX: 0,
          cameraPosY: 1.65,
          cameraPosZ: 10.5,
          cameraTarX: 0,
          cameraTarY: 0.5,
          cameraTarZ: 0,
          cameraFov: 38,
          hudOpacity: 0.0,
          duration: TIMINGS.ORBIT_BLEND_IN - TIMINGS.FRONT_REVEAL,
        },
        "frontReveal",
      );

      // Phase 3: full orbit, then land on the left-side profile.
      tl.to(
        animProps.current,
        {
          cameraOrbitBlend: 1.0,
          cameraOrbitAngle: 0,
          cameraOrbitRadius: 10.8,
          cameraOrbitHeight: 1.55,
          cameraOrbitTargetX: 0,
          cameraOrbitTargetY: 0.5,
          cameraOrbitTargetZ: 0,
          telemetryOpacity: 1.0,
          idleVibration: 0.8,
          rpm: 4200,
          duration: TIMINGS.ORBIT_SWEEP - TIMINGS.ORBIT_BLEND_IN,
          ease: "power1.inOut",
        },
        "orbitBlendIn",
      );

      tl.to(
        animProps.current,
        {
          cameraPosX: 10.8,
          cameraPosY: 1.55,
          cameraPosZ: 0,
          cameraTarX: 0,
          cameraTarY: 0.5,
          cameraTarZ: 0,
          cameraFov: 34,
          duration: TIMINGS.LEFT_LOCK - TIMINGS.ORBIT_SWEEP,
          ease: "none",
        },
        "orbitSweep",
      );

      tl.to(
        animProps.current,
        {
          cameraOrbitAngle: Math.PI * 2.5,
          duration: TIMINGS.LEFT_LOCK - TIMINGS.ORBIT_SWEEP,
          ease: "none",
        },
        "orbitSweep",
      );

      // Phase 4: lock the camera in front of the car down the track and rotate the car to face it.
      tl.to(
        animProps.current,
        {
          cameraOrbitBlend: 0.0,
          cameraPosX: 0.3,
          cameraPosY: 0.65,
          cameraPosZ: 48.0,
          cameraTarX: 0.0,
          cameraTarY: 0.45,
          cameraTarZ: 0.0,
          cameraFov: 24,
          carRotY: Math.PI * 0.5,
          idleVibration: 1.0,
          rpm: 6800,
          duration: TIMINGS.LAUNCH - TIMINGS.LEFT_LOCK,
          ease: "power1.inOut",
        },
        "leftLock",
      );

      tl.to(
        animProps.current,
        {
          carZ: CAR_GEOMETRY.MAX_Z,
          wheelRotation: 118,
          carPitch: 0.03,
          idleVibration: 0.0,
          launchJitter: 1.0,
          speed: 318,
          rpm: 13200,
          gear: 6,
          duration: TIMINGS.FADE_OUT - TIMINGS.LAUNCH,
          ease: "power2.in",
        },
        "launch",
      );

      // Phase 5: the camera stays still while the car drives out.
      tl.to(
        animProps.current,
        {
          carPitch: 0.0,
          duration: 0.04,
          ease: "power1.out",
        },
        "launch+=0.12",
      );

      // Phase 6: smoke fade as the car clears frame.
      tl.to(
        animProps.current,
        {
          carZ: CAR_GEOMETRY.FINAL_Z,
          wheelRotation: 152,
          launchJitter: 0.0,
          telemetryOpacity: 0.0,
          smokeFadeOpacity: 1.0,
          duration: 0.08,
          ease: "power2.out",
        },
        "fadeOut",
      );
    }, scrollContainerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <section ref={scrollContainerRef} className="hero-scroll-container">
      {/* 1. Loading Overlay */}
      {loading && (
        <div className="telemetry-loader">
          <img src={loadingSvg} alt="Loading..." className="loader-svg" />
        </div>
      )}

      {/* 2. Pinned Viewport — ScrollTrigger will pin this */}
      <div ref={viewportRef} className="hero-pinned-viewport">
        {/* Three.js WebGL Canvas — performance props gated for mobile */}
        <Canvas
          shadows
          gl={{
            antialias: !IS_MOBILE,
            alpha: false,
            powerPreference: IS_MOBILE ? 'low-power' : 'high-performance',
          }}
          dpr={IS_MOBILE ? [1, 1] : [1, 2]}
          className="hero-canvas"
        >
          <Suspense fallback={null}>
            <F1CarScene
              modelUrl={carModelUrl}
              animProps={animProps}
              getCarZAtProgress={getCarZAtProgress}
              performanceMode={IS_MOBILE}
              dustCount={IS_MOBILE ? 60 : 200}
              smokeCount={IS_MOBILE ? 80 : 250}
            />
          </Suspense>
        </Canvas>

        {/* 3. Headline Text Overlay (fades out in Phase 2) */}
        <div
          ref={mainContentRef}
          id="hud-main-content"
          className="hud-layer container main-content-layer"
        >
          <div className="hero-eyebrow">
            <div className="chevron-decor">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="eyebrow-text">Formula Student Team</span>
          </div>

          <h1 className="hero-title">
            Built by students.
            <br />
            <span className="accent-text">Driven by passion.</span>
          </h1>

          <p className="hero-description">
            NITKRacing is the official Formula Student team of NITK Surathkal.
            We design, manufacture, and test high-performance formula racecars
            to compete globally.
          </p>

          <div className="hero-actions">
            <Pointer style={{ display: "inline-block" }}>
              <a href="#recruitments" className="btn btn-primary">
                Join the Team
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </Pointer>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setPath("/achievements");
              }}
            >
              Our Legacy
            </button>
          </div>

          <div className="scroll-indicator">
            <span className="indicator-arrow">↓</span>
            <span className="indicator-text">SCROLL</span>
          </div>
        </div>



        {/* 5. Smoke Fade Transition Overlay (Phase 6) */}
        <div
          ref={smokeFadeRef}
          id="smoke-fade-overlay"
          className="smoke-fade-transition-layer"
          style={{ opacity: 0, pointerEvents: "none" }}
        ></div>
      </div>

      <style>{`
        .hero-scroll-container {
          position: relative;
          height: 500vh; /* 5 viewports of scroll-controlled animation */
          background-color: #030305;
          padding: 0;
        }

        .hero-pinned-viewport {
          /* NO position: sticky — ScrollTrigger pins this via position: fixed */
          width: 100%;
          height: calc(100vh - 70px);
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
          background-color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        html[data-theme="light"] .telemetry-loader {
          background-color: #ffffff;
        }

        .loader-svg {
          width: 100%;
          max-width: 800px;
          height: auto;
          display: block;
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
          flex-wrap: wrap;
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
          background-color: #08080c;
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
          .hero-description {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
            letter-spacing: -0.5px;
          }
          .hero-description {
            font-size: 0.9rem;
            margin-bottom: 28px;
          }
          .hero-eyebrow {
            margin-bottom: 16px;
          }
          .eyebrow-text {
            font-size: 0.75rem;
          }
          .hero-actions {
            gap: 10px;
          }
          .scroll-indicator {
            bottom: 24px;
          }
        }
      `}</style>
    </section>
  );
}
