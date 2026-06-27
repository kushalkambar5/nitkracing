export default function AchievementsPage() {
  const achievements = [
    {
      year: '2026',
      title: 'Vanguard Conception & EV Pivot',
      events: [
        {
          name: 'FS EV Concept Submissions',
          result: 'Top 5 Design Score',
          desc: 'Achieved top 5 position in the concept design reviews for our first Electric Vehicle (EV) chassis and battery system prototype.'
        }
      ]
    },
    {
      year: '2024',
      title: 'Combustion Excellence & Double Podiums',
      events: [
        {
          name: 'Formula Bharat 2024 (Combustion)',
          result: '3rd Place Overall',
          desc: 'Podium finish among 45 national teams, winning first place in engineering design and second place in cost audits.'
        },
        {
          name: 'Engineering Design Event',
          result: '1st Place Award',
          desc: 'Recognized by international judges for our simulation-led aerodynamic development and carbon-fiber integrations.'
        }
      ]
    },
    {
      year: '2023',
      title: 'Dynamic Dominance & Speed Records',
      events: [
        {
          name: 'Formula Bharat 2023',
          result: '1st in Acceleration',
          desc: 'Dominated the straight line acceleration track event, completing 75m in a record 4.02 seconds.'
        },
        {
          name: 'Autocross Dynamic Challenge',
          result: '3rd Place Finish',
          desc: 'Demonstrated outstanding agility and handling through the tight autocross twist circuit.'
        }
      ]
    },
    {
      year: '2022',
      title: 'Global Footprint Representation',
      events: [
        {
          name: 'Formula Student Germany (Virtual)',
          result: 'Top 15 Overall',
          desc: 'Secured top 15 rank internationally in design and cost presentations during the virtual European challenge.'
        }
      ]
    },
    {
      year: '2020',
      title: 'Business & Presentation Acumen',
      events: [
        {
          name: 'Formula Student India',
          result: '4th Place Overall',
          desc: 'Finished 4th overall, claiming the runner-up trophy in the Business Logic Presentation event.'
        }
      ]
    },
    {
      year: '2019',
      title: 'The Breakthrough Debut',
      events: [
        {
          name: 'Formula Bharat 2019',
          result: 'Best Debutant Team Award',
          desc: 'Awarded the Best Debutant Team trophy for completing technical inspection and running all dynamic events on our first try.'
        }
      ]
    }
  ];

  return (
    <div className="achievements-page">
      <div className="checkered-pattern"></div>
      <div className="speed-lines"></div>

      <div className="ach-hero">
        <div className="container">
          <div className="chevron-decor hero-chevron">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1 className="page-hero-title">Our Legacy</h1>
          <p className="page-hero-desc">
            A chronicle of grit, engineering innovation, and competitive success on national and international tracks.
          </p>
        </div>
      </div>

      <div className="container timeline-section">
        <div className="timeline-trail">
          {achievements.map((ach, idx) => (
            <div key={idx} className="timeline-node">
              {/* Year marker */}
              <div className="timeline-year-marker">
                <span className="year-bubble">{ach.year}</span>
                <span className="year-title">{ach.title}</span>
              </div>
              
              {/* Event Cards */}
              <div className="timeline-event-cards">
                {ach.events.map((evt, eIdx) => (
                  <div key={eIdx} className="card event-detail-card">
                    <div className="event-header-row">
                      <h3 className="event-name">{evt.name}</h3>
                      <span className="event-result">{evt.result}</span>
                    </div>
                    <p className="event-desc">{evt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .achievements-page {
          background-color: var(--bg-primary);
          padding-bottom: 80px;
          min-height: 80vh;
        }

        .ach-hero {
          background: linear-gradient(to bottom, var(--bg-secondary) 0%, var(--bg-primary) 100%);
          padding: 80px 0 40px;
          border-bottom: 1px solid var(--border);
          text-align: left;
        }

        .hero-chevron {
          margin-bottom: 16px;
        }

        .page-hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .page-hero-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 700px;
        }

        .timeline-section {
          padding-top: 60px;
          position: relative;
        }

        .timeline-trail {
          position: relative;
          padding-left: 40px;
          border-left: 2px solid var(--border);
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 60px;
          text-align: left;
        }

        .timeline-trail::before {
          content: '';
          position: absolute;
          top: 0;
          left: -5px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent);
        }

        .timeline-node {
          position: relative;
        }

        .timeline-year-marker {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
          position: relative;
        }

        /* Connecting bullet on the left border line */
        .timeline-year-marker::before {
          content: '';
          position: absolute;
          left: -51px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: var(--bg-primary);
          border: 4px solid var(--accent);
          z-index: 10;
        }

        .year-bubble {
          font-family: var(--font-primary);
          font-size: 1.6rem;
          font-weight: 700;
          color: #FFFFFF;
          background-color: var(--accent);
          padding: 4px 16px;
          border-radius: var(--border-radius-sm);
          display: inline-block;
          box-shadow: var(--glow);
        }

        .year-title {
          font-family: var(--font-primary);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .timeline-event-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 800px;
        }

        .event-detail-card {
          padding: 24px;
        }

        .event-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }

        .event-name {
          font-size: 1.3rem;
          margin: 0;
        }

        .event-result {
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--accent);
          background-color: var(--accent-soft);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(225, 6, 0, 0.2);
        }

        .event-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .timeline-trail {
            padding-left: 20px;
            margin-left: 10px;
          }
          .timeline-year-marker::before {
            left: -31px;
            width: 14px;
            height: 14px;
            border-width: 3px;
          }
          .event-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .event-result {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
