export default function About() {
  const stats = [
    { label: '0-100 KM/H', value: '3.2s', desc: 'Lightning-fast acceleration' },
    { label: 'Max Speed', value: '135+ KM/H', desc: 'Optimized for Formula Student tracks' },
    { label: 'Weight', value: '195 KG', desc: 'Ultra-light spaceframe chassis' },
    { label: 'Engine Capacity', value: '600 CC', desc: 'Custom combustion powertrain' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="speed-lines"></div>
      
      <div className="container">
        <div className="about-grid">
          {/* Left Panel: Content */}
          <div className="about-content">
            <div className="section-title">Who We Are</div>
            
            <h2 className="about-subtitle">
              Engineering the <span className="accent-text">Future of Racing</span>
            </h2>
            
            <p className="about-text">
              NITK Racing is the official Formula Student team of National Institute of Technology Karnataka, Surathkal. Founded with a vision to build high-performance race cars and develop world-class engineers, we design, simulate, manufacture, and test formula-style racing prototypes from scratch.
            </p>
            
            <p className="about-text">
              Every year, a dedicated cohort of students across disciplines collaborates to push the boundaries of mechanical design, electronic control, aerodynamics, and project management. We participate in prestigious national and international Formula Student competitions, representing India's finest engineering minds.
            </p>

            <div className="about-quote">
              <span className="quote-mark">“</span>
              We design not just race cars, but careers. From raw tubes to the starting grid, every weld and line of code is driven by pure engineering passion.
            </div>
          </div>

          {/* Right Panel: Stats Dashboard */}
          <div className="about-stats-panel">
            <h3 className="panel-title">Vehicle Spec Sheet</h3>
            
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-desc">{stat.desc}</div>
                </div>
              ))}
            </div>

            <div className="spec-footer">
              <span className="spec-indicator"></span>
              <span className="spec-footer-text">Specs mapped to NR26 Combustion Prototype</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-content {
          text-align: left;
        }

        .about-subtitle {
          font-size: 2.2rem;
          margin-top: 24px;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .about-subtitle .accent-text {
          color: var(--accent);
        }

        .about-text {
          font-family: var(--font-secondary);
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .about-quote {
          margin-top: 32px;
          padding: 20px 24px;
          background-color: var(--bg-primary);
          border-left: 4px solid var(--accent);
          border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
          font-style: italic;
          color: var(--text-primary);
          position: relative;
        }

        .quote-mark {
          font-family: var(--font-primary);
          font-size: 3rem;
          position: absolute;
          top: -10px;
          left: 10px;
          opacity: 0.1;
          color: var(--accent);
        }

        .about-stats-panel {
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--border-radius-lg);
          padding: 40px;
          text-align: left;
          box-shadow: var(--shadow);
        }

        .panel-title {
          font-size: 1.5rem;
          margin-bottom: 30px;
          letter-spacing: 1px;
          border-bottom: 2px solid var(--border);
          padding-bottom: 12px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .stat-card {
          border-bottom: 1px solid var(--border);
          padding-bottom: 16px;
        }

        .stat-value {
          font-family: var(--font-primary);
          font-size: 2.6rem;
          font-weight: 700;
          color: var(--accent);
          line-height: 1.1;
        }

        .stat-label {
          font-family: var(--font-primary);
          font-size: 0.95rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
          margin-top: 4px;
        }

        .stat-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .spec-footer {
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .spec-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent);
          animation: pulseGlow 1.5s infinite alternate;
        }

        .spec-footer-text {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @keyframes pulseGlow {
          0% { opacity: 0.3; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 8px var(--accent); }
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about-stats-panel {
            padding: 24px;
          }
          .stat-value {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
