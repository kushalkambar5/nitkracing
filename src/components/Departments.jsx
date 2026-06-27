import { useState } from 'react';

export default function Departments() {
  const [activeDept, setActiveDept] = useState(null);

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
      description: 'The core engineering house responsible for the design, simulation, analysis, and fabrication of the formula racing car.',
      subteams: [
        { name: 'Chassis & Ergonomics', desc: 'Spaceframe design, occupant safety, and cockpit ergonomics.' },
        { name: 'Suspension & Steering', desc: 'Vehicle dynamics, dampers, uprights, steering geometry, and tires.' },
        { name: 'Powertrain & Drivetrain', desc: 'Engine tuning, intake, exhaust, cooling, differential, and axles.' },
        { name: 'Aerodynamics', desc: 'Wings, undertray, diffusers, and active aero drag reduction.' },
        { name: 'Electronics & Control', desc: 'Data acquisition, telemetry, wiring harness, and ECU programming.' }
      ]
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
      description: 'The business brain that handles crowdfunding, corporate sponsorship campaigns, budgeting, and operations management.',
      subteams: [
        { name: 'Sponsorship Acquisition', desc: 'Pitching to corporate sponsors, executing partnership benefits.' },
        { name: 'Finance & Budgeting', desc: 'Cost analysis, component pricing, and financial audits.' },
        { name: 'Logistics & Planning', desc: 'Shipping materials, organizing testing sites, and competition travels.' },
        { name: 'Public Relations', desc: 'Collaborating with college administration and external racing entities.' }
      ]
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
      description: "The creative hub driving the team's visual identity, managing social platforms, capturing media, and creating merchandise.",
      subteams: [
        { name: 'Graphic Design & UI', desc: 'Creating posters, web interface elements, and custom car livery designs.' },
        { name: 'Photography & Film', desc: 'Capturing shop floor trials, testing videos, and promo reels.' },
        { name: 'Social Media Strategy', desc: 'Running active accounts on LinkedIn, Instagram, and Facebook.' },
        { name: 'Merchandise & Branding', desc: 'Designing team polo shirts, helmets, jackets, and pit banners.' }
      ]
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
              className={`card department-card ${activeDept === dept.id ? 'expanded' : ''}`}
              onClick={() => setActiveDept(activeDept === dept.id ? null : dept.id)}
            >
              <div className="dept-header">
                <div className="dept-icon-wrapper">
                  {dept.icon}
                </div>
                <h3 className="dept-name">{dept.name}</h3>
              </div>
              
              <p className="dept-desc">{dept.description}</p>
              
              <div className="dept-action-text">
                {activeDept === dept.id ? 'Tap to close sub-teams' : 'Tap to expand sub-teams'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron-icon">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {/* Sub-teams expandable list */}
              <div className="subteams-container">
                <h4 className="subteams-header">Key Sub-teams & Focus Areas:</h4>
                <ul className="subteams-list">
                  {dept.subteams.map((sub, sIdx) => (
                    <li key={sIdx} className="subteam-item">
                      <div className="subteam-name">{sub.name}</div>
                      <div className="subteam-desc">{sub.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
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
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          height: fit-content;
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
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .dept-action-text {
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 0;
          transition: var(--transition);
        }

        .dept-action-text .chevron-icon {
          transition: transform 0.3s ease;
        }

        .department-card.expanded .chevron-icon {
          transform: rotate(180deg);
        }

        .subteams-container {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.4s ease, opacity 0.4s ease, margin-top 0.4s ease;
          width: 100%;
        }

        .department-card.expanded .subteams-container {
          max-height: 800px;
          opacity: 1;
          margin-top: 24px;
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }

        .subteams-header {
          font-size: 1.1rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .subteams-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .subteam-item {
          padding-left: 12px;
          position: relative;
        }

        .subteam-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 4px;
          height: 4px;
          background-color: var(--accent);
        }

        .subteam-name {
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .subteam-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        @media (max-width: 992px) {
          .departments-grid {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
