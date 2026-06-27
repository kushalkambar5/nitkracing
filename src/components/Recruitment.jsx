import SpotlightCard from './ui/SpotlightCard';
import BorderGlow from './ui/BorderGlow';

export default function Recruitment() {
  const recruitments = [
    {
      team: 'Technical Team',
      desc: 'Work on chassis, suspension, powertrain, aerodynamics, and electronics. Perform simulations and fabricate components.',
      formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeCqeluhY2xJ18LewaZGBEw-nHkfD6ISr-ZPqiiJQuc9cy_Ig/viewform',
      requirements: ['Basic mechanics/electronics knowledge', 'Familiarity with CAD/Simulation is a plus', 'Strong problem solving skills'],
      badgeColor: 'rgba(225, 6, 0, 0.15)',
      glowColor: '2 100 44',
      colors: ['#E10600', '#FF1E17', '#262630'],
      spotlightColor: 'rgba(225, 6, 0, 0.15)'
    },
    {
      team: 'Marketing & Business',
      desc: 'Drive crowdfunding campaigns, Pitch to corporate sponsors, draft business reports, and manage budgets.',
      formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc9hmUE8Y4EIj9XbZubX1_08fgK19zvBf9Di1gNxC9hLGgvJA/viewform?usp=header',
      requirements: ['Excellent pitching & communication skills', 'Basic financial knowledge', 'Creative writing & management interest'],
      badgeColor: 'rgba(255, 214, 0, 0.1)',
      glowColor: '50 100 50',
      colors: ['#FFD600', '#FFE55C', '#262630'],
      spotlightColor: 'rgba(255, 214, 0, 0.12)'
    },
    {
      team: 'Media & Operations',
      desc: 'Run social media channels, create cinematic videos, design decals & livery, and manage merchandise branding.',
      formUrl: 'https://iris.nitk.ac.in/form/nr_media_recs25',
      requirements: ['Proficiency in Adobe Suite/Figma/Canva', 'Video editing & camera handling skills', 'Social media management interest'],
      badgeColor: 'rgba(0, 229, 255, 0.1)',
      glowColor: '186 100 50',
      colors: ['#00E5FF', '#66F0FF', '#262630'],
      spotlightColor: 'rgba(0, 229, 255, 0.15)'
    }
  ];

  return (
    <section id="recruitments" className="recruitment-section">
      <div className="checkered-pattern"></div>
      <div className="speed-lines"></div>

      <div className="container">
        <div className="section-title-center">
          <span>Join the Legacy</span>
        </div>

        <p className="recruitment-intro">
          Are you ready to accelerate your engineering career? We recruit once a year, looking for dedicated, hard-working students of NITK who are passionate about motorsport and hands-on work.
        </p>

        <div className="grid-3 recruitment-grid">
          {recruitments.map((rec, idx) => (
            <BorderGlow
              key={idx}
              className="recruitment-card-glow-wrapper"
              edgeSensitivity={30}
              glowColor={rec.glowColor}
              backgroundColor="var(--card-bg)"
              borderRadius={8}
              glowRadius={40}
              glowIntensity={0.6}
              coneSpread={25}
              animated={true}
              colors={rec.colors}
            >
              <SpotlightCard
                className="recruitment-card"
                spotlightColor={rec.spotlightColor}
              >
                <div className="card-top-accent" style={{ backgroundColor: rec.badgeColor }}></div>
                <h3 className="rec-team-name">{rec.team}</h3>
                <p className="rec-team-desc">{rec.desc}</p>
                
                <div className="rec-focus-area">
                  <h4 className="focus-header">Core Requirements:</h4>
                  <ul className="focus-list">
                    {rec.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="focus-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" className="focus-check">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href={rec.formUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary rec-apply-btn"
                >
                  Apply for {rec.team.split(' ')[0]}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </SpotlightCard>
            </BorderGlow>
          ))}
        </div>
      </div>

      <style>{`
        .recruitment-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .recruitment-intro {
          max-width: 700px;
          margin: -24px auto 48px;
          text-align: center;
          color: var(--text-secondary);
        }

        .recruitment-card-glow-wrapper {
          transition: var(--transition);
          border: 1px solid var(--border) !important;
          background-color: var(--card-bg) !important;
        }

        .recruitment-card-glow-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow);
          border-color: transparent !important;
        }

        .recruitment-card-glow-wrapper.sweep-active {
          border-color: transparent !important;
        }

        .recruitment-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 36px 28px;
          position: relative;
          background-color: transparent !important;
          border: none !important;
          border-radius: inherit !important;
          width: 100%;
          flex-grow: 1;
        }

        .card-top-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          z-index: 2;
        }

        .recruitment-card-glow-wrapper:hover .card-top-accent {
          background-color: var(--accent) !important;
        }

        .rec-team-name {
          font-size: 1.45rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .rec-team-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .rec-focus-area {
          flex-grow: 1;
          width: 100%;
          margin-bottom: 28px;
        }

        .focus-header {
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .focus-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .focus-item {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .focus-check {
          margin-top: 3px;
          flex-shrink: 0;
        }

        .rec-apply-btn {
          width: 100%;
          font-size: 0.85rem;
          padding: 10px 20px;
        }

        @media (max-width: 992px) {
          .recruitment-grid {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
