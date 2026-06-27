export default function Hero({ setPath }) {
  return (
    <section className="hero-section">
      {/* Background decorations */}
      <div className="checkered-pattern"></div>
      <div className="speed-lines"></div>
      <div className="track-curve-decor">
        <svg viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 500 C 300 500, 400 100, 1100 100" stroke="var(--accent)" strokeWidth="4" strokeDasharray="10 15" opacity="0.25" />
          <path d="M-100 520 C 300 520, 410 120, 1100 120" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="5 5" opacity="0.15" />
        </svg>
      </div>

      <div className="container hero-container">
        {/* Left Side: Headline and Content */}
        <div className="hero-content">
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
            NITKRacing is the official Formula Student combustion and electric racing team of NITK Surathkal. We design, manufacture, and test high-performance formula-style racecars to compete globally.
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
        </div>

        {/* Right Side: Animated F1 Car SVG Contour */}
        <div className="hero-visual">
          <div className="visual-wrapper">
            <div className="f1-car-silhouette">
              {/* Dynamic SVG F1 car contour */}
              <svg viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Glow Backdrop */}
                <defs>
                  <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Track Line */}
                <path d="M50 280 L550 280" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
                <path d="M120 280 L480 280" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" opacity="0.6" filter="url(#glow-filter)" />
                
                {/* F1 Car Outline */}
                <path 
                  d="M100 280 
                     C 90 278, 80 270, 75 260 
                     C 70 250, 70 240, 85 240 
                     C 95 240, 110 255, 120 262 
                     L 160 262 
                     C 155 230, 160 200, 185 195 
                     C 200 192, 215 200, 220 220 
                     L 280 220 
                     C 290 190, 310 160, 340 145
                     C 370 130, 420 135, 460 165
                     L 490 180
                     L 520 180
                     L 540 225
                     L 550 225
                     L 555 240
                     L 535 240
                     C 530 220, 520 210, 510 215
                     L 495 245
                     L 435 245
                     C 430 220, 415 210, 400 215
                     L 385 248
                     L 240 248
                     C 235 220, 220 210, 205 215
                     L 190 270
                     L 140 270
                     Z" 
                  stroke="var(--accent)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  filter="url(#glow-filter)"
                  className="car-path-draw"
                />

                {/* Secondary details */}
                <path d="M340 145 L380 185 M410 160 L445 195" stroke="var(--text-primary)" strokeWidth="1.5" opacity="0.6" />
                <path d="M490 180 L470 245" stroke="var(--text-primary)" strokeWidth="1.5" opacity="0.4" />
                
                {/* Rear Wing */}
                <path d="M520 180 L522 140 L560 140 L558 180 Z" stroke="var(--text-primary)" strokeWidth="2.5" fill="var(--bg-secondary)" />
                <path d="M510 150 L560 150" stroke="var(--accent)" strokeWidth="2" />

                {/* Front Wing */}
                <path d="M60 270 L100 270 L95 260 L60 260 Z" stroke="var(--text-primary)" strokeWidth="2" fill="var(--bg-secondary)" />
                
                {/* Wheels */}
                {/* Rear Wheel */}
                <circle cx="465" cy="245" r="32" stroke="var(--text-primary)" strokeWidth="4" fill="var(--bg-primary)" />
                <circle cx="465" cy="245" r="16" stroke="var(--accent)" strokeWidth="3" />
                <path d="M465 213 L465 277 M433 245 L497 245" stroke="var(--text-muted)" strokeWidth="1.5" />

                {/* Front Wheel */}
                <circle cx="215" cy="245" r="32" stroke="var(--text-primary)" strokeWidth="4" fill="var(--bg-primary)" />
                <circle cx="215" cy="245" r="16" stroke="var(--accent)" strokeWidth="3" />
                <path d="M215 213 L215 277 M183 245 L247 245" stroke="var(--text-muted)" strokeWidth="1.5" />
              </svg>
            </div>
            
            {/* Speed Chevron Overlays */}
            <div className="speed-overlay-chevron spec-1"></div>
            <div className="speed-overlay-chevron spec-2"></div>
            <div className="speed-overlay-chevron spec-3"></div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: calc(90vh - var(--header-height));
          display: flex;
          align-items: center;
          background: radial-gradient(circle at 70% 30%, var(--bg-secondary) 0%, var(--bg-primary) 70%);
          position: relative;
          padding: 80px 0;
          overflow: hidden;
        }

        .track-curve-decor {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .track-curve-decor svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          text-align: left;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .eyebrow-text {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }

        .hero-title .accent-text {
          color: var(--accent);
          text-shadow: 0 0 10px rgba(225, 6, 0, 0.1);
        }

        .hero-description {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 580px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .hero-visual {
          position: relative;
          width: 100%;
        }

        .visual-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .f1-car-silhouette {
          width: 100%;
          max-width: 550px;
          animation: hoverMotion 6s ease-in-out infinite;
        }

        .car-path-draw {
          stroke-dasharray: 2000;
          stroke-dashoffset: 0;
          animation: drawCar 3s ease-out forwards;
        }

        @keyframes drawCar {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes hoverMotion {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .speed-overlay-chevron {
          position: absolute;
          width: 20px;
          height: 40px;
          background-color: var(--accent);
          opacity: 0.15;
          clip-path: polygon(0% 0%, 50% 0%, 100% 50%, 50% 100%, 0% 100%, 50% 50%);
          pointer-events: none;
        }

        .speed-overlay-chevron.spec-1 {
          top: 30%;
          right: 10%;
          animation: passChevrons 4s infinite linear;
        }
        .speed-overlay-chevron.spec-2 {
          top: 50%;
          right: 20%;
          animation: passChevrons 4s infinite linear 1.3s;
        }
        .speed-overlay-chevron.spec-3 {
          top: 70%;
          right: 15%;
          animation: passChevrons 4s infinite linear 2.6s;
        }

        @keyframes passChevrons {
          0% { transform: translateX(100px) scale(0.6); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(-300px) scale(0.8); opacity: 0; }
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 40px 0;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .hero-title {
            font-size: 3rem;
          }
          .hero-description {
            margin-bottom: 32px;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-visual {
            margin-top: 40px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 2.3rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
