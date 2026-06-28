import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function Achievements({ setPath }) {
  const topAchievements = [
    {
      title: "Combustion Performance",
      competition: "SUPRA SAEIndia 2025",
      position: "Vehicle Debut",
      desc: "Competed with our highly optimized combustion vehicle featuring a custom aerodynamic package and spaceframe chassis.",
    },
    {
      title: "Overall Podium Finish",
      competition: "Formula Bharat 2024",
      position: "3rd Place Overall",
      desc: "Secured overall podium finish at the national Formula Student event, winning 1st in Engineering Design and 2nd in Cost Event.",
    },
    {
      title: "Acceleration Dominance",
      competition: "Formula Bharat 2023",
      position: "1st in Acceleration",
      desc: "Achieved first place in straight-line acceleration (75m in 4.02 seconds) with custom launch control.",
    },
    {
      title: "National Top 5",
      competition: "Formula Student India / FE",
      position: "4th Place Overall",
      desc: "Finished 4th overall in the national electric/combustion category, securing runner-up in Business Plan Presentation.",
    },
  ];

  const handleViewAll = () => {
    setPath("/achievements");
  };

  return (
    <section className="achievements-section">
      <div className="checkered-pattern"></div>

      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Latest Achievements</h2>
          </div>
          <InteractiveHoverButton onClick={handleViewAll}>
            View All Achievements
          </InteractiveHoverButton>
        </div>

        <div className="grid-4 achievements-grid">
          {topAchievements.map((ach, idx) => (
            <div key={idx} className="card achievement-card">
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

        @media (max-width: 480px) {
          .ach-title {
            font-size: 1.1rem;
          }
          .ach-desc {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
