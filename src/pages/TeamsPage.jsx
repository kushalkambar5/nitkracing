import React from 'react';
import { TabsBtn, TabsContent, TabsProvider } from '@/components/ui/tab';
import { teamMembers } from '@/data/teamMembers';
import ChromaGrid from '@/components/ChromaGrid';

export default function TeamsPage() {
  const categories = ['All', 'Technical', 'Marketing', 'Media'];

  return (
    <div className="teams-page">
      <div className="checkered-pattern"></div>
      <div className="speed-lines"></div>

      <div className="container teams-content-section">
        {/* Tab Wrapper */}
        <div className="tabs-card-wrapper">
          <TabsProvider defaultValue="All">
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

            {categories.map((cat) => {
              const filteredMembers = teamMembers.filter(
                (m) => cat === 'All' || m.dept === cat
              );
              const gridItems = filteredMembers.map((m) => ({
                image: m.image,
                title: m.name,
                subtitle: m.role,
                handle: m.subdept,
                location: `${m.dept} Team`,
                borderColor: m.borderColor,
                gradient: m.gradient,
                url: m.linkedin
              }));

              return (
                <TabsContent key={cat} value={cat}>
                  <ChromaGrid
                    items={gridItems}
                    columns={4}
                    radius={300}
                    damping={0.45}
                    fadeOut={0.6}
                    ease="power3.out"
                  />
                </TabsContent>
              );
            })}
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

        @media (max-width: 480px) {
          .tab-btn-wrapper {
            padding: 6px 8px !important;
          }
          .tab-label-text {
            font-size: 0.78rem;
          }
          .teams-content-section {
            padding-top: 48px;
          }
          .tabs-card-wrapper {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}


