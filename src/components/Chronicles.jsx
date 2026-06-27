import ChromaGrid from './ChromaGrid';

// Import all 12 images from chronicles directory
import img1 from '../assets/chronicles/Kethan_ajmeera.jpg';
import img2 from '../assets/chronicles/aryan_agrawal.jpg';
import img3 from '../assets/chronicles/devansh_singal.jpg';
import img4 from '../assets/chronicles/dhruv_yadav.jpg';
import img5 from '../assets/chronicles/kshamaa_acharya_b.jpg';
import img6 from '../assets/chronicles/mohit.jpg';
import img7 from '../assets/chronicles/prasad_savanur.jpg';
import img8 from '../assets/chronicles/rajeev_bhat.jpg';
import img9 from '../assets/chronicles/saee_sholapurkar.jpg';
import img10 from '../assets/chronicles/samiran.jpg';
import img11 from '../assets/chronicles/sanket_mane.jpg';
import img12 from '../assets/chronicles/vinamra_parakh.jpg';

export default function Chronicles() {
  const items = [
    {
      image: img1,
      borderColor: '#E10600',
      gradient: 'linear-gradient(145deg, #E10600, #000)'
    },
    {
      image: img2,
      borderColor: '#3B82F6',
      gradient: 'linear-gradient(145deg, #3B82F6, #000)'
    },
    {
      image: img3,
      borderColor: '#10B981',
      gradient: 'linear-gradient(145deg, #10B981, #000)'
    },
    {
      image: img4,
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(145deg, #F59E0B, #000)'
    },
    {
      image: img5,
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(145deg, #8B5CF6, #000)'
    },
    {
      image: img6,
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(145deg, #06B6D4, #000)'
    },
    {
      image: img7,
      borderColor: '#EF4444',
      gradient: 'linear-gradient(145deg, #EF4444, #000)'
    },
    {
      image: img8,
      borderColor: '#EC4899',
      gradient: 'linear-gradient(145deg, #EC4899, #000)'
    },
    {
      image: img9,
      borderColor: '#14B8A6',
      gradient: 'linear-gradient(145deg, #14B8A6, #000)'
    },
    {
      image: img10,
      borderColor: '#F97316',
      gradient: 'linear-gradient(145deg, #F97316, #000)'
    },
    {
      image: img11,
      borderColor: '#84CC16',
      gradient: 'linear-gradient(145deg, #84CC16, #000)'
    },
    {
      image: img12,
      borderColor: '#6366F1',
      gradient: 'linear-gradient(145deg, #6366F1, #000)'
    }
  ];

  return (
    <section id="chronicles" className="chronicles-section">
      <div className="speed-lines"></div>

      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Chronicles</h2>
          </div>
        </div>
      </div>

      <div className="chroma-grid-container-full">
        <ChromaGrid
          items={items}
          radius={350}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>

      <style>{`
        .chronicles-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        .chroma-grid-container-full {
          position: relative;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
