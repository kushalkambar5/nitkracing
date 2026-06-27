export default function About() {
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
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .about-grid {
          max-width: 800px;
          margin: 0 auto;
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
      `}</style>
    </section>
  );
}

