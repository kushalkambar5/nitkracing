import ModelViewer from './ModelViewer';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="speed-lines"></div>
      
      <div className="container about-container">
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

          {/* Right Panel: 3D Model Viewer */}
          <div className="about-visual">
            <ModelViewer
              url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb"
              width="100%"
              height="100%"
              autoRotate={false}
              fadeIn={true}
              environmentPreset="forest"
              autoFrame={true}
              autoFrameFactor={0.5}
              enableManualZoom={false}
            />
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          position: relative;
          padding-bottom: 20px;
        }

        .about-container {
          max-width: 92%;
        }

        .about-grid {
          position: relative;
          min-height: 520px;
        }

        .about-content {
          text-align: left;
          position: relative;
          z-index: 2;
          width: 58%;
        }

        .about-visual {
          position: absolute;
          right: -10%;
          top: 50%;
          transform: translateY(-50%);
          width: 70%;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
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

        @media (max-width: 992px) {
          .about-grid {
            min-height: auto;
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .about-content {
            width: 100%;
          }

          .about-visual {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            width: 100%;
            height: 450px;
            margin-top: 20px;
          }
        }
      `}</style>
    </section>
  );
}


