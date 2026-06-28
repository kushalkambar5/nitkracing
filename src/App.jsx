import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Departments from './components/Departments';
import MainTeam from './components/MainTeam';
import Achievements from './components/Achievements';
import GallerySection from './components/GallerySection';
import Sponsors from './components/Sponsors';
import Recruitment from './components/Recruitment';
import BlogsSection from './components/BlogsSection';
import Chronicles from './components/Chronicles';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Subpages
import TeamsPage from './pages/TeamsPage';
import AchievementsPage from './pages/AchievementsPage';
import GalleryPage from './pages/GalleryPage';
import BlogsPage from './pages/BlogsPage';

import './App.css';

function App() {
  // Theme state: default is dark, saved in localStorage
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  // Simple state router. Read pathname, default to '/'
  const [path, setPath] = useState(() => {
    // Strip trailing slashes or subfolder prefix to make it robust
    const p = window.location.pathname;
    return p === '/' ? '/' : p;
  });

  // Selected blog ID for deep linking from Homepage blogs to BlogsPage read view
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  // Sync theme with document class/attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync pathname router with popstate browser actions (forward/back buttons)
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);

  // Setter function that also pushes state to history
  const navigateTo = (newPath) => {
    window.history.pushState(null, '', newPath);
    setPath(newPath);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Route selector
  const renderContent = () => {
    const normalizedPath = path.toLowerCase();
    
    switch (normalizedPath) {
      case '/teams':
        return <TeamsPage />;
      case '/achievements':
        return <AchievementsPage />;
      case '/gallery':
        return <GalleryPage />;
      case '/blogs':
        return (
          <BlogsPage 
            selectedBlogId={selectedBlogId} 
            setSelectedBlogId={setSelectedBlogId} 
          />
        );
      default:
        // Homepage Story Line structure
        return (
          <>
            <Hero setPath={navigateTo} />
            <About />
            <Departments />
            <MainTeam setPath={navigateTo} />
            <Achievements setPath={navigateTo} />
            <GallerySection setPath={navigateTo} />
            <Sponsors />
            <Recruitment />
            <BlogsSection 
              setPath={navigateTo} 
              setSelectedBlogId={setSelectedBlogId} 
            />
            <Chronicles />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="app-shell">
      {/* Navigation Header */}
      <Navbar 
        currentPath={path} 
        setPath={navigateTo} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {/* Main View Area */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Footer Branding Area */}
      <Footer setPath={navigateTo} />

      <style>{`
        .app-shell {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .main-content {
          flex-grow: 1;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default App;
