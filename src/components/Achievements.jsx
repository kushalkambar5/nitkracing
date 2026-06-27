import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

export default function Achievements({ setPath }) {
  const topAchievements = [
    {
      title: 'Overall Podium Finish',
      competition: 'Formula Bharat 2024',
      position: '3rd Place Overall',
      desc: 'Secured 3rd place overall in the combustion category among 45+ teams nationwide, winning multiple static events.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      )
    },
    {
      title: 'Engineering Design Award',
      competition: 'Formula Bharat 2023',
      position: '1st in Design Event',
      desc: 'Judged first in engineering design presentation for outstanding aerodynamics simulations and vehicle architecture.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      )
    },
    {
      title: 'Acceleration Dominance',
      competition: 'Formula Student India 2023',
      position: '1st in Acceleration',
      desc: 'Set the fastest lap time in the acceleration dynamic track event (0-75m in 4.02 seconds) with custom traction control.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      )
    },
    {
      title: 'Formula Student Germany',
      competition: 'FS Germany 2022 (Virtual)',
      position: 'Top 15 Global',
      desc: 'Ranked in the top 15 internationally in design and cost events during the virtual European challenge representation.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    }
  ];

  const handleViewAll = () => {
    setPath('/achievements');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="achievements-section">
      <div className="checkered-pattern"></div>
      
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Top Achievements</h2>
          </div>
          <InteractiveHoverButton onClick={handleViewAll}>
            View All Achievements
          </InteractiveHoverButton>
        </div>

        <div className="grid-4 achievements-grid">
          {topAchievements.map((ach, idx) => (
            <div key={idx} className="card achievement-card">
              <div className="ach-icon-wrapper">
                {ach.icon}
              </div>
              <span className="ach-badge">{ach.competition}</span>
              <h3 className="ach-title">{ach.title}</h3>
              <div className="ach-position">{ach.position}</div>
              <p className="ach-desc">{ach.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .achievements-section {
          background-color: var(--bg-primary);
        }

        .achievement-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .ach-icon-wrapper {
          color: var(--accent);
          background-color: var(--accent-soft);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--border-radius-sm);
          margin-bottom: 20px;
        }

        .ach-icon-wrapper svg {
          width: 22px;
          height: 22px;
        }

        .ach-badge {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 8px;
          display: inline-block;
          border: 1px solid var(--border);
          padding: 2px 8px;
          border-radius: 20px;
          background-color: var(--bg-secondary);
        }

        .ach-title {
          font-size: 1.3rem;
          margin-bottom: 4px;
          line-height: 1.2;
        }

        .ach-position {
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--accent);
          margin-bottom: 12px;
        }

        .ach-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 992px) {
          .achievements-grid {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
