import { useState } from 'react';
import { AnimatedThemeToggler } from './ui/AnimatedThemeToggler';
import { Pointer } from './ui/pointer';

export default function Navbar({ currentPath, setPath, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/teams' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Gallery', path: '/Gallery' },
    { name: 'Blogs', path: '/blogs' },
  ];

  const handleNavClick = (path) => {
    setPath(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => handleNavClick('/')}>
          <span className="brand-logo-mark">
            <img src="/logo_circle.png" alt="NITK Racing Logo" />
          </span>
          <span className="brand-name">
            NITK<span className="accent-text">Racing</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.name}
              className={`nav-link-btn ${currentPath === link.path ? 'active' : ''}`}
              onClick={() => handleNavClick(link.path)}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Action Area */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <AnimatedThemeToggler
            theme={theme}
            onThemeChange={toggleTheme}
            className="theme-toggle-btn"
            variant="circle"
          />


          {/* Apply CTA (Desktop) */}
          <Pointer style={{ display: "inline-block" }}>
            <a href="#recruitments" className="btn btn-primary btn-sm nav-apply-btn" onClick={() => handleNavClick('/')}>
              Apply Now
            </a>
          </Pointer>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              // Close Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Hamburger Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <button
              key={link.name}
              className={`mobile-nav-link ${currentPath === link.path ? 'active' : ''}`}
              onClick={() => handleNavClick(link.path)}
            >
              {link.name}
            </button>
          ))}
          <Pointer style={{ display: "block", width: "100%" }}>
            <a href="#recruitments" className="btn btn-primary btn-block mobile-apply-btn" onClick={() => handleNavClick('/')}>
              Apply Now
            </a>
          </Pointer>
        </nav>
      </div>

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          height: var(--header-height);
          background-color: var(--nav-bg);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          z-index: 1000;
          display: flex;
          align-items: center;
          transition: var(--transition);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .brand-logo-mark {
          display: flex;
          align-items: center;
          width: 32px;
          height: 32px;
        }

        .brand-logo-mark img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .brand-name {
          font-family: var(--font-primary);
          font-size: 1.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
        }

        .brand-name .accent-text {
          color: var(--accent);
          font-style: italic;
        }

        .desktop-nav {
          display: flex;
          gap: 32px;
        }

        .nav-link-btn {
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 1.05rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 0;
          position: relative;
          transition: var(--transition);
        }

        .nav-link-btn:hover, .nav-link-btn.active {
          color: var(--accent);
        }

        .nav-link-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--accent);
          transition: var(--transition);
        }

        .nav-link-btn:hover::after, .nav-link-btn.active::after {
          width: 100%;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .theme-toggle-btn {
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--border-radius-sm);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition);
        }

        .theme-toggle-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          background-color: var(--accent-soft);
        }

        .nav-apply-btn {
          height: 36px;
          display: flex;
          align-items: center;
        }

        .mobile-toggle-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        /* Mobile Nav Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: var(--header-height);
          left: 0;
          width: 100vw;
          height: calc(100vh - var(--header-height));
          background-color: var(--bg-primary);
          z-index: 999;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-top: 1px solid var(--border);
        }

        .mobile-nav-drawer.open {
          transform: translateX(0);
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          padding: 40px 24px;
          gap: 24px;
        }

        .mobile-nav-link {
          font-family: var(--font-primary);
          font-size: 1.5rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-primary);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .mobile-apply-btn {
          margin-top: 16px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .desktop-nav, .nav-apply-btn {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
