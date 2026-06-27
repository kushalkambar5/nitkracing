import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

export default function MainTeam({ setPath }) {
  const mainMembers = [
    {
      name: 'Aditya Rao',
      role: 'Team Captain / Chief Engineer',
      dept: 'Powertrain & Controls',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'AR'
    },
    {
      name: 'Sneha Hegde',
      role: 'Vice Captain / Head of Marketing',
      dept: 'Sponsorship & Public Relations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'SH'
    },
    {
      name: 'Kushal Gowda',
      role: 'Vehicle Dynamics Lead',
      dept: 'Suspension & Steering',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'KG'
    },
    {
      name: 'Rohan Sharma',
      role: 'Driver / Powertrain Engineer',
      dept: 'Engine Tuning & Drivetrain',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'RS'
    }
  ];

  const handleViewAll = () => {
    setPath('/teams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="main-team-section">
      <div className="speed-lines"></div>
      
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Club Leadership</h2>
          </div>
          <InteractiveHoverButton onClick={handleViewAll}>
            View All Members
          </InteractiveHoverButton>
        </div>

        <div className="grid-4 team-grid">
          {mainMembers.map((member, index) => (
            <div key={index} className="card team-card">
              <div className="team-avatar-wrapper">
                {/* Fallback to styled initials in case of load issues */}
                <div className="team-avatar-fallback">{member.initials}</div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="team-avatar-img"
                  onError={(e) => e.target.style.display = 'none'} 
                />
                <div className="team-avatar-overlay">
                  <div className="chevron-decor">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <h3 className="member-name">{member.name}</h3>
              <div className="member-role">{member.role}</div>
              <div className="member-dept">{member.dept}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .main-team-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .team-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 24px;
        }

        .team-avatar-wrapper {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 20px;
          position: relative;
          background-color: var(--bg-tertiary);
          border: 2px solid var(--border);
          transition: var(--transition);
        }

        .team-card:hover .team-avatar-wrapper {
          border-color: var(--accent);
          transform: scale(1.05);
        }

        .team-avatar-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-primary);
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-muted);
          background-color: var(--bg-tertiary);
        }

        .team-avatar-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .team-avatar-overlay {
          position: absolute;
          inset: 0;
          background: rgba(225, 6, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          opacity: 0;
          transition: var(--transition);
        }

        .team-card:hover .team-avatar-overlay {
          opacity: 1;
        }

        .team-avatar-overlay .chevron-decor {
          color: #FFFFFF;
        }

        .member-name {
          font-size: 1.35rem;
          margin-bottom: 6px;
        }

        .member-role {
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--accent);
          margin-bottom: 4px;
        }

        .member-dept {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .team-grid {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
