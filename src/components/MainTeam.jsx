import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ChromaGrid from './ChromaGrid';
import keerthivarshanImg from '../assets/members/keerthivarshan.png';
import vashishtImg from '../assets/members/vashisht.png';
import drSaurabhImg from '../assets/members/dr_saurabh_chandraker.png';

export default function MainTeam({ setPath }) {
  const leadershipItems = [
    {
      image: keerthivarshanImg,
      title: 'Keerthivarshan Vashisth',
      subtitle: 'Team Captain',
      handle: 'Overall Leadership',
      location: 'Club Leadership',
      borderColor: '#E10600',
      gradient: 'linear-gradient(145deg, rgba(225, 6, 0, 0.15) 0%, var(--chroma-card-bg-end) 100%)',
    },
    {
      image: vashishtImg,
      title: 'Vashisth',
      subtitle: 'Outreach Lead',
      handle: 'Outreach & PR',
      location: 'Club Leadership',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(145deg, rgba(245, 158, 11, 0.15) 0%, var(--chroma-card-bg-end) 100%)',
    },
    {
      image: drSaurabhImg,
      title: 'Dr. Saurabh Chandraker',
      subtitle: 'Faculty Advisor',
      handle: 'Advisory',
      location: 'Club Leadership',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(145deg, rgba(139, 92, 246, 0.15) 0%, var(--chroma-card-bg-end) 100%)',
    }
  ];

  const handleViewAll = () => {
    setPath('/teams');
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

        <ChromaGrid
          items={leadershipItems}
          columns={3}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>

      <style>{`
        .main-team-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
      `}</style>
    </section>
  );
}
