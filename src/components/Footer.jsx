export default function Footer({ setPath }) {
  const handleNavClick = (path) => {
    setPath(path);
  };

  return (
    <footer className="footer-container">
      <div className="container">
        {/* Top Nav Row */}
        <div className="footer-nav-row">
          <div className="footer-nav-col">
            <h3 className="nav-col-header">Explore</h3>
            <div className="nav-col-links">
              <button onClick={() => handleNavClick("/")}>Home</button>
              <button onClick={() => handleNavClick("/teams")}>Team</button>
              <button onClick={() => handleNavClick("/achievements")}>
                Achievements
              </button>
            </div>
          </div>

          <div className="footer-nav-col">
            <h3 className="nav-col-header">Media & Info</h3>
            <div className="nav-col-links">
              <button onClick={() => handleNavClick("/gallery")}>
                Gallery
              </button>
              <button onClick={() => handleNavClick("/blogs")}>
                Blogs & Articles
              </button>
              <a href="#about" onClick={() => handleNavClick("/")}>
                About the Club
              </a>
            </div>
          </div>

          <div className="footer-nav-col">
            <h3 className="nav-col-header">University</h3>
            <div className="nav-col-links">
              <a
                href="https://www.nitk.ac.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                NITK Surathkal
              </a>
              <a
                href="https://maps.google.com/?q=NITK+Surathkal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Surathkal, Mangaluru, Karnataka, India
              </a>
            </div>
          </div>
        </div>

        {/* Middle Meta Row */}
        <div className="footer-meta-row">
          <div className="footer-meta-left">
            <p className="footer-tagline">
              More than a team. It's a legacy in motion.
            </p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} NITK Racing.
            </p>
          </div>
          <div className="footer-meta-right">
            <a
              href="https://x.com/nitkracing"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link x"
              aria-label="X (formerly Twitter)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/nitkracing/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link instagram"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/nitkracing/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link linkedin"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="4.9" cy="4" r="2" />
                <rect x="2.9" y="8" width="4" height="12" />
                <path d="M21 20h-4v-5.5c0-3-3.5-2.8-3.5 0V20h-4V8h4v1.9c1.6-2.5 7.5-2.8 7.5 2.6V20z" />
              </svg>
            </a>
            <a
              href="https://m.facebook.com/nitkracing"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link facebook"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Giant Logo Row */}
        <div className="brand-signature" aria-label="NITK Racing">
          <div className="brand-part nitk-part">
            <div className="shapes-row">
              <span className="shape-item circle-shape">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="50" cy="50" r="35" />
                </svg>
              </span>
              <span className="shape-item octagon-shape">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <polygon points="30,15 70,15 85,30 85,70 70,85 30,85 15,70 15,30" />
                </svg>
              </span>
              <span className="shape-item hexagon-shape">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" />
                </svg>
              </span>
              <span className="shape-item square-shape">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <rect x="20" y="20" width="60" height="60" />
                </svg>
              </span>
            </div>
            <span className="brand-text">nitk</span>
          </div>
          <div className="brand-part racing-part">
            <div className="bar-row">
              <div className="brand-bar"></div>
            </div>
            <span className="brand-text">racing</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-container {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border);
          padding: 80px 0 40px;
          text-align: left;
          overflow: hidden;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .footer-nav-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px;
          margin-bottom: 80px;
        }

        .nav-col-header {
          font-family: var(--font-secondary);
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          text-transform: none;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .nav-col-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 28px;
        }

        .nav-col-links a, .nav-col-links button {
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .nav-col-links a:hover, .nav-col-links button:hover {
          color: var(--accent);
          transform: translateY(-1px);
        }

        .footer-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid var(--border);
          padding-top: 40px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 30px;
        }

        .footer-meta-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 650px;
        }

        .footer-tagline {
          font-family: var(--font-secondary);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .footer-copyright {
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.5;
        }

        .footer-meta-right {
          display: flex;
          gap: 16px;
        }

        .social-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-icon-link svg {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }

        .social-icon-link:hover {
          transform: translateY(-2px);
        }

        .social-icon-link:hover svg {
          transform: scale(1.12);
        }

         /* Hover States for Instagram, LinkedIn, and Facebook */
        .social-icon-link.x:hover {
          color: #ffffff;
          border-color: #ffffff;
          background-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
        }

        .social-icon-link.instagram:hover {
          color: #E1306C;
          border-color: #E1306C;
          background-color: rgba(225, 48, 108, 0.08);
          box-shadow: 0 0 15px rgba(225, 48, 108, 0.15);
        }

        .social-icon-link.linkedin:hover {
          color: #0A66C2;
          border-color: #0A66C2;
          background-color: rgba(10, 102, 194, 0.08);
          box-shadow: 0 0 15px rgba(10, 102, 194, 0.15);
        }

        .social-icon-link.facebook:hover {
          color: #1877F2;
          border-color: #1877F2;
          background-color: rgba(24, 119, 242, 0.08);
          box-shadow: 0 0 15px rgba(24, 119, 242, 0.15);
        }

        /* Bottom Giant Logo Row */
        .brand-signature {
          display: flex;
          align-items: flex-end;
          width: 100%;
          justify-content: flex-start;
          margin-top: 40px;
          line-height: 0.8;
          user-select: none;
          color: var(--text-primary);
          gap: 1.5vw;
          padding-top: 20px;
          font-size: clamp(2rem, 11.5vw, 14.5rem);
        }

        .brand-part {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .racing-part {
          flex-grow: 1;
        }

        .shapes-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 0.18em;
          margin-bottom: 0.12em;
          padding: 0 0.05em;
        }

        .shape-item {
          width: 0.18em;
          height: 0.18em;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: color 0.3s ease;
        }

        .shape-item svg {
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .bar-row {
          display: flex;
          align-items: center;
          width: 100%;
          height: 0.18em;
          margin-bottom: 0.12em;
        }

        .brand-bar {
          width: 100%;
          height: 0.08em;
          background-color: var(--text-primary);
          transition: background-color 0.3s ease, transform 0.3s ease;
          transform-origin: left;
        }

        .brand-text {
          font-family: var(--font-secondary);
          font-size: 1em;
          font-weight: 800;
          letter-spacing: -0.05em;
          text-transform: lowercase;
          line-height: 1;
          display: inline-block;
        }

        /* Hover Interactions */
        .brand-signature:hover .brand-bar {
          background-color: var(--accent);
          transform: scaleY(1.2);
        }

        .brand-signature:hover .shape-item {
          color: var(--accent);
        }

        .brand-signature:hover .circle-shape svg {
          transform: scale(1.15);
        }

        .brand-signature:hover .octagon-shape svg {
          transform: rotate(45deg);
        }

        .brand-signature:hover .hexagon-shape svg {
          transform: rotate(-30deg);
        }

        .brand-signature:hover .square-shape svg {
          transform: scale(0.9) rotate(90deg);
        }

        /* Responsiveness */
        @media (max-width: 992px) {
          .footer-nav-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            margin-bottom: 60px;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 60px 0 30px;
          }
          .footer-nav-row {
            grid-template-columns: 1fr;
            gap: 32px;
            margin-bottom: 50px;
          }
          .nav-col-header {
            margin-bottom: 16px;
          }
          .footer-meta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            padding-top: 30px;
            margin-bottom: 30px;
          }
          .footer-meta-right {
            width: 100%;
            justify-content: flex-start;
            gap: 16px;
          }
          .brand-signature {
            margin-top: 30px;
            gap: 2vw;
          }
        }

        @media (max-width: 480px) {
          .nav-col-links {
            gap: 8px 16px;
          }
          .footer-meta-right {
            flex-direction: row;
            gap: 16px;
          }
          .brand-signature {
            gap: 1vw;
          }
          .footer-tagline {
            font-size: 1rem;
          }
          .footer-copyright {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </footer>
  );
}
