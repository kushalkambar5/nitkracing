export default function Departments() {
  const departments = [
    {
      id: 'tech',
      name: 'Technical Team',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
      description: 'The core engineering house responsible for the design, simulation, analysis, and fabrication of the formula racing car.'
    },
    {
      id: 'mktg',
      name: 'Marketing & Business',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      description: 'The business brain that handles crowdfunding, corporate sponsorship campaigns, budgeting, and operations management.'
    },
    {
      id: 'media',
      name: 'Media & Operations',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
      ),
      description: "The creative hub driving the team's visual identity, managing social platforms, capturing media, and creating merchandise."
    }
  ];

  return (
    <section id="departments" className="departments-section">
      <div className="checkered-pattern"></div>
      
      <div className="container">
        <div className="section-title-center">
          <span>Our Departments</span>
        </div>
        
        <p className="section-intro">
          NITK Racing functions like a professional racing franchise, structured into distinct departments working in synergy to produce a winning racecar.
        </p>

        <div className="grid-3 departments-grid">
          {departments.map((dept) => (
            <div 
              key={dept.id} 
              className="card department-card"
            >
              <div className="dept-header">
                <div className="dept-icon-wrapper">
                  {dept.icon}
                </div>
                <h3 className="dept-name">{dept.name}</h3>
              </div>
              
              <p className="dept-desc">{dept.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .departments-section {
          background-color: var(--bg-primary);
          padding-top: 40px;
        }

        .section-intro {
          max-width: 700px;
          margin: -24px auto 48px;
          text-align: center;
          color: var(--text-secondary);
        }

        .department-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          height: 100%;
        }

        .dept-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .dept-icon-wrapper {
          color: var(--accent);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--accent-soft);
          border-radius: var(--border-radius-sm);
        }

        .dept-icon-wrapper svg {
          width: 26px;
          height: 26px;
        }

        .dept-name {
          font-size: 1.4rem;
          margin: 0;
        }

        .dept-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 0;
          flex-grow: 1;
        }

        @media (max-width: 992px) {
          .departments-grid {
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .dept-name {
            font-size: 1.15rem;
          }
          .dept-desc {
            font-size: 0.88rem;
          }
          .dept-icon-wrapper {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  );
}
