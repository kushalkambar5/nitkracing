import React from 'react';
import { TabsBtn, TabsContent, TabsProvider } from '@/components/ui/tab';

export default function TeamsPage() {

  const members = [
    {
      name: 'Aditya Rao',
      role: 'Team Captain / Chief Engineer',
      dept: 'Technical',
      subdept: 'Powertrain & Controls',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'AR'
    },
    {
      name: 'Sneha Hegde',
      role: 'Vice Captain / Head of Marketing',
      dept: 'Marketing',
      subdept: 'Sponsorship & Public Relations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'SH'
    },
    {
      name: 'Kushal Gowda',
      role: 'Vehicle Dynamics Lead',
      dept: 'Technical',
      subdept: 'Suspension & Steering',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'KG'
    },
    {
      name: 'Rohan Sharma',
      role: 'Driver / Powertrain Engineer',
      dept: 'Technical',
      subdept: 'Engine Tuning & Drivetrain',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'RS'
    },
    {
      name: 'Preeti Shenoy',
      role: 'Aerodynamics Lead',
      dept: 'Technical',
      subdept: 'CFD & Composite Materials',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'PS'
    },
    {
      name: 'Karthik M.',
      role: 'Electronics & Telemetry Lead',
      dept: 'Technical',
      subdept: 'Sensors & DAQ Systems',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'KM'
    },
    {
      name: 'Vikram Naik',
      role: 'Chassis & Safety Lead',
      dept: 'Technical',
      subdept: 'FEA & Impact Attenuator',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'VN'
    },
    {
      name: 'Pooja Kamath',
      role: 'Sponsorship Coordinator',
      dept: 'Marketing',
      subdept: 'Corporate Pitching & Finance',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'PK'
    },
    {
      name: 'Rahul Dev',
      role: 'Media Director',
      dept: 'Media',
      subdept: 'Video Editing & Photography',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'RD'
    },
    {
      name: 'Shruti Bhat',
      role: 'Graphic Designer',
      dept: 'Media',
      subdept: 'Merchandise & Decal Livery',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'SB'
    },
    {
      name: 'Nitin Shenoy',
      role: 'Driver / Mechanics Assistant',
      dept: 'Technical',
      subdept: 'Suspension Tuning',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'NS'
    },
    {
      name: 'Neha Pai',
      role: 'Cost & Management Lead',
      dept: 'Marketing',
      subdept: 'BOM Audits & Procurement',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200&h=200',
      initials: 'NP'
    }
  ];

  const categories = ['All', 'Technical', 'Marketing', 'Media'];

  return (
    <div className="teams-page">
      <div className="checkered-pattern"></div>
      <div className="speed-lines"></div>

      <div className="container teams-content-section">
        {/* Tab Wrapper */}
        <div className="tabs-card-wrapper">
          <TabsProvider
            defaultValue="All"
          >
            <div className="flex-center mt-2 mb-6">
              <div className="tabs-btn-container">
                {categories.map((cat) => (
                  <TabsBtn key={cat} value={cat}>
                    <span className="tab-label-text">
                      {cat === 'All' ? 'All Team' : `${cat} Team`}
                    </span>
                  </TabsBtn>
                ))}
              </div>
            </div>

            {categories.map((cat) => (
              <TabsContent key={cat} value={cat}>
                <div className="grid-4 team-members-grid">
                  {members
                    .filter((m) => cat === 'All' || m.dept === cat)
                    .map((member, index) => (
                      <div key={index} className="card member-profile-card">
                        <div className="profile-avatar-container">
                          <div className="profile-avatar-fallback">{member.initials}</div>
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="profile-avatar"
                            onError={(e) => { e.target.style.display = 'none'; }} 
                          />
                          <div className="profile-overlay-layer">
                            <span className="profile-overlay-dept">{member.dept} Team</span>
                          </div>
                        </div>
                        <h3 className="profile-name">{member.name}</h3>
                        <div className="profile-role">{member.role}</div>
                        <div className="profile-subdept">{member.subdept}</div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </TabsProvider>
        </div>
      </div>

      <style>{`
        .teams-page {
          background-color: var(--bg-primary);
          padding-bottom: 80px;
          min-height: 80vh;
        }

        .teams-content-section {
          padding-top: 80px;
        }



        /* Tabs Card Wrapper */
        .tabs-card-wrapper {
          border: 1px solid var(--border);
          background-color: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          border-radius: var(--border-radius-md);
          padding: 24px;
          position: relative;
        }

        html[data-theme="light"] .tabs-card-wrapper {
          background-color: rgba(0, 0, 0, 0.01);
        }

        .flex-center {
          display: flex;
          justify-content: center;
        }

        .mb-6 {
          margin-bottom: 24px;
        }

        .mt-2 {
          margin-top: 8px;
        }

        /* Tabs Button Row */
        .tabs-btn-container {
          display: flex;
          align-items: center;
          width: fit-content;
          background-color: var(--bg-tertiary);
          padding: 4px;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border);
        }

        /* Custom style overrides for tab component buttons */
        .tab-btn-wrapper {
          font-family: var(--font-primary) !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          color: var(--text-secondary) !important;
          transition: color 0.25s ease !important;
          padding: 8px 24px !important;
        }

        .tab-btn-wrapper:hover {
          color: var(--text-primary) !important;
        }

        .tab-btn-wrapper.active-tab {
          color: #FFFFFF !important;
        }

        .tab-label-text {
          position: relative;
          z-index: 5;
          font-size: 1.1rem;
        }

        /* Active Tab Indicator Color */
        .active-tab-indicator-bg {
          background-color: var(--accent) !important;
          border-radius: var(--border-radius-sm) !important;
          box-shadow: var(--glow) !important;
        }

        /* Hover Tab Indicator Color */
        .hover-tab-indicator-bg {
          background-color: var(--accent-soft) !important;
          border-radius: var(--border-radius-sm) !important;
        }

        .member-profile-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px;
        }

        .profile-avatar-container {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 16px;
          position: relative;
          background-color: var(--bg-tertiary);
          border: 2px solid var(--border);
          transition: var(--transition);
        }

        .member-profile-card:hover .profile-avatar-container {
          border-color: var(--accent);
          transform: scale(1.03);
        }

        .profile-avatar-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-primary);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--text-muted);
          background-color: var(--bg-tertiary);
        }

        .profile-avatar {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .profile-overlay-layer {
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

        .member-profile-card:hover .profile-overlay-layer {
          opacity: 1;
        }

        .profile-overlay-dept {
          color: #FFFFFF;
          font-family: var(--font-primary);
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .profile-name {
          font-size: 1.3rem;
          margin-bottom: 6px;
          color: var(--text-primary);
        }

        .profile-role {
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--accent);
          margin-bottom: 4px;
        }

        .profile-subdept {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .tabs-btn-container {
            width: 100%;
          }
          .tab-btn-wrapper {
            flex-grow: 1;
            text-align: center;
            padding: 8px 12px !important;
          }
          .tab-label-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

