export default function Footer({ setPath }) {
  const handleNavClick = (path) => {
    setPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-logo" onClick={() => handleNavClick('/')}>
              <span className="brand-name">
                NITK<span className="accent-text">Racing</span>
              </span>
            </div>
            <p className="footer-tagline">
              More than a team. It's a legacy in motion.
            </p>
            
            {/* Socials */}
            <div className="footer-socials">
              <a href="https://www.instagram.com/nitkracing/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a href="https://www.linkedin.com/company/nitkracing/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              <a href="https://m.facebook.com/nitkracing" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="footer-links-col">
            <h4 className="footer-header">Explore</h4>
            <div className="footer-links">
              <button onClick={() => handleNavClick('/')}>Home</button>
              <button onClick={() => handleNavClick('/teams')}>Team Roster</button>
              <button onClick={() => handleNavClick('/achievements')}>Achievements</button>
            </div>
          </div>

          {/* Links Col 2 */}
          <div className="footer-links-col">
            <h4 className="footer-header">Media & Info</h4>
            <div className="footer-links">
              <button onClick={() => handleNavClick('/Gallery')}>Gallery</button>
              <button onClick={() => handleNavClick('/blogs')}>Blogs & Tech Articles</button>
              <a href="#about" onClick={() => handleNavClick('/')}>About the Club</a>
            </div>
          </div>

          {/* Legal / Dev Col */}
          <div className="footer-links-col">
            <h4 className="footer-header">University</h4>
            <p className="footer-univ-text">
              National Institute of Technology Karnataka, Surathkal
            </p>
            <span className="footer-location-tag">📍 Mangaluru, India</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} NITK Racing. All rights reserved.
          </p>
          <p className="developer-text">
            Formula Student Combustion & Electric Racing Team
          </p>
        </div>
      </div>

      <style>{`
        .footer-container {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border);
          padding: 60px 0 30px;
          text-align: left;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          cursor: pointer;
        }

        .footer-logo .brand-name {
          font-family: var(--font-primary);
          font-size: 1.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
        }

        .footer-logo .brand-name .accent-text {
          color: var(--accent);
          font-style: italic;
        }

        .footer-tagline {
          font-size: 0.9rem;
          color: var(--text-secondary);
          max-width: 250px;
        }

        .footer-socials {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .footer-socials a {
          width: 36px;
          height: 36px;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition);
        }

        .footer-socials a:hover {
          color: var(--accent);
          border-color: var(--accent);
          background-color: var(--accent-soft);
          transform: translateY(-2px);
        }

        .footer-links-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-header {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links button, .footer-links a {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          text-align: left;
          width: fit-content;
          transition: var(--transition);
        }

        .footer-links button:hover, .footer-links a:hover {
          color: var(--accent);
          transform: translateX(4px);
        }

        .footer-univ-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .footer-location-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
