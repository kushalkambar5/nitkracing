export default function Sponsors() {
  const sponsorTiers = [
    {
      tierName: 'Diamond Partners',
      tierClass: 'diamond',
      sponsors: [
        { name: 'ANSYS Inc.', role: 'Simulation Software Partner' },
        { name: 'Dassault Systèmes', role: 'CAD & PLM Solutions' }
      ]
    },
    {
      tierName: 'Gold Partners',
      tierClass: 'gold',
      sponsors: [
        { name: 'Motul India', role: 'Lubricant & Chemical Sponsor' },
        { name: 'Bosch Engineering', role: 'Sensor & Electronics Partner' },
        { name: 'NITK Alumni Assoc.', role: 'Patron Support & Grants' }
      ]
    },
    {
      tierName: 'Silver Partners',
      tierClass: 'silver',
      sponsors: [
        { name: 'IPG Automotive', role: 'CarMaker Simulation Licenses' },
        { name: 'VR3 Engineering', role: 'Chassis Tube Profiling' },
        { name: 'Altium LLC', role: 'PCB Design Suite Partner' },
        { name: 'Brembo S.p.A.', role: 'Brake Caliper support' }
      ]
    }
  ];

  return (
    <section id="sponsors" className="sponsors-section">
      <div className="checkered-pattern"></div>
      
      <div className="container">
        <div className="section-title-center">
          <span>Our Sponsors</span>
        </div>
        
        <p className="sponsors-intro">
          Our achievements are fueled by the invaluable trust and support of our industry sponsors. They supply the software, materials, components, and grants that make our racecar designs possible.
        </p>

        <div className="sponsors-container">
          {sponsorTiers.map((tier, idx) => (
            <div key={idx} className={`sponsor-tier-group ${tier.tierClass}-group`}>
              <h3 className="sponsor-tier-title">{tier.tierName}</h3>
              
              <div className="sponsors-grid">
                {tier.sponsors.map((sp, sIdx) => (
                  <div key={sIdx} className="sponsor-logo-card">
                    {/* Render a clean vector label/design for the sponsor */}
                    <div className="sponsor-card-design">
                      <div className="sponsor-vector-mark">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 17 12 22 22 17"></polyline>
                          <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                      </div>
                      <div className="sponsor-info">
                        <h4 className="sponsor-name">{sp.name}</h4>
                        <span className="sponsor-role">{sp.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sponsors-section {
          background-color: var(--bg-primary);
        }

        .sponsors-intro {
          max-width: 700px;
          margin: -24px auto 48px;
          text-align: center;
          color: var(--text-secondary);
        }

        .sponsors-container {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .sponsor-tier-group {
          position: relative;
        }

        .sponsor-tier-title {
          font-size: 1.5rem;
          margin-bottom: 24px;
          color: var(--text-primary);
          text-align: center;
          font-family: var(--font-primary);
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .sponsor-tier-title::before, .sponsor-tier-title::after {
          content: '';
          height: 1px;
          flex-grow: 1;
          background-color: var(--border);
          max-width: 150px;
        }

        .diamond-group .sponsor-tier-title { color: #00E5FF; }
        .gold-group .sponsor-tier-title { color: #FFD600; }
        .silver-group .sponsor-tier-title { color: #CFD8DC; }

        .sponsors-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .sponsor-logo-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--border-radius-md);
          padding: 20px 30px;
          flex: 1 1 250px;
          max-width: 320px;
          min-width: 240px;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sponsor-logo-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }

        .diamond-group .sponsor-logo-card:hover { border-color: #00E5FF; }
        .gold-group .sponsor-logo-card:hover { border-color: #FFD600; }
        .silver-group .sponsor-logo-card:hover { border-color: #CFD8DC; }

        .sponsor-card-design {
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
        }

        .sponsor-vector-mark {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          opacity: 0.7;
        }

        .sponsor-logo-card:hover .sponsor-vector-mark {
          color: var(--accent);
          opacity: 1;
        }

        .diamond-group .sponsor-logo-card:hover .sponsor-vector-mark { color: #00E5FF; }
        .gold-group .sponsor-logo-card:hover .sponsor-vector-mark { color: #FFD600; }
        .silver-group .sponsor-logo-card:hover .sponsor-vector-mark { color: #CFD8DC; }

        .sponsor-name {
          font-family: var(--font-primary);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
          text-transform: uppercase;
        }

        .sponsor-role {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: block;
        }

        @media (max-width: 576px) {
          .sponsor-logo-card {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </section>
  );
}
