import CircularGallery from './CircularGallery';

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
    { image: img1, text: 'Kethan Ajmeera' },
    { image: img2, text: 'Aryan Agrawal' },
    { image: img3, text: 'Devansh Singal' },
    { image: img4, text: 'Dhruv Yadav' },
    { image: img5, text: 'Kshamaa Acharya B.' },
    { image: img6, text: 'Mohit' },
    { image: img7, text: 'Prasad Savanur' },
    { image: img8, text: 'Rajeev Bhat' },
    { image: img9, text: 'Saee Sholapurkar' },
    { image: img10, text: 'Samiran' },
    { image: img11, text: 'Sanket Mane' },
    { image: img12, text: 'Vinamra Parakh' }
  ];

  return (
    <section id="chronicles" className="chronicles-section">
      <div className="speed-lines"></div>

      <div className="circular-gallery-container-full">
        <CircularGallery
          items={items}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.03}
          font="bold 28px Rajdhani"
        />
      </div>

      <div className="container chronicles-header-bottom">
        <h2 className="section-title-center">
          <span>Chronicles</span>
        </h2>
      </div>

      <style>{`
        .chronicles-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          padding: 60px 0 80px 0;
        }

        .circular-gallery-container-full {
          position: relative;
          width: 100%;
          height: 600px;
        }

        .chronicles-header-bottom {
          margin-top: -30px;
          position: relative;
          z-index: 10;
        }
      `}</style>
    </section>
  );
}

