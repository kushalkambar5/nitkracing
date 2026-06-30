import { useState, useEffect } from 'react';
import CircularGallery from './CircularGallery';
import { isMobileDevice } from '../utils/performance';

const IS_MOBILE = isMobileDevice();

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
  const [activeIdx, setActiveIdx] = useState(null);

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

  const closeModal = () => setActiveIdx(null);
  const showPrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + items.length) % items.length);
  };
  const showNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % items.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev - 1 + items.length) % items.length);
      }
      if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % items.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, items.length]);

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
          heightSegments={IS_MOBILE ? 20 : 50}
          widthSegments={IS_MOBILE ? 40 : 100}
          onItemClick={(item, index) => setActiveIdx(index)}
        />
      </div>

      <div className="container chronicles-header-bottom">
        <h2 className="section-title-center">
          <span>Chronicles</span>
        </h2>
      </div>

      {/* Glassmorphism Modal Lightbox */}
      {activeIdx !== null && (
        <div className="chronicles-modal-overlay" onClick={closeModal}>
          <button 
            className="chronicles-modal-nav-btn prev" 
            onClick={showPrev}
            aria-label="Previous chronicle"
          >
            &#x2190;
          </button>
          
          <div className="chronicles-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="chronicles-modal-close" onClick={closeModal} aria-label="Close modal">
              &times;
            </button>
            
            <div className="chronicles-modal-media-wrapper">
              <img 
                className="chronicles-modal-img" 
                src={items[activeIdx].image} 
                alt={items[activeIdx].text} 
              />
            </div>            
          </div>

          <button 
            className="chronicles-modal-nav-btn next" 
            onClick={showNext}
            aria-label="Next chronicle"
          >
            &#x2192;
          </button>
        </div>
      )}

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

        /* Glassmorphism Modal Lightbox Styles */
        .chronicles-modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(6, 6, 8, 0.95);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 40px;
          animation: chroniclesFadeIn 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .chronicles-modal-content {
          position: relative;
          background: rgba(18, 18, 22, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--border-radius-lg, 16px);
          padding: 16px;
          max-width: 90vw;
          width: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(225, 6, 0, 0.12);
          animation: chroniclesScaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .chronicles-modal-close {
          position: absolute;
          top: -45px;
          right: 0;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 36px;
          line-height: 1;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .chronicles-modal-close:hover {
          color: var(--accent, #e10600);
          transform: scale(1.1);
        }

        .chronicles-modal-media-wrapper {
          width: auto;
          max-width: 80vw;
          max-height: 75vh;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: var(--border-radius-md, 8px);
          overflow: hidden;
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .chronicles-modal-img {
          max-width: 100%;
          max-height: 75vh;
          object-fit: contain;
          display: block;
        }

        .chronicles-modal-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(18, 18, 22, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 24px;
          z-index: 1010;
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        .chronicles-modal-nav-btn:hover {
          background: var(--accent, #e10600);
          border-color: var(--accent, #e10600);
          transform: translateY(-50%) scale(1.1);
        }

        .chronicles-modal-nav-btn.prev {
          left: 40px;
        }

        .chronicles-modal-nav-btn.next {
          right: 40px;
        }

        @keyframes chroniclesFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes chroniclesScaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 1200px) {
          .chronicles-modal-nav-btn.prev {
            left: 20px;
          }
          .chronicles-modal-nav-btn.next {
            right: 20px;
          }
        }

        @media (max-width: 768px) {
          .circular-gallery-container-full {
            height: 420px;
          }
          .chronicles-modal-overlay {
            padding: 16px;
          }

          .chronicles-modal-content {
            padding: 12px;
            width: 100%;
          }

          .chronicles-modal-media-wrapper {
            max-height: 60vh;
          }

          .chronicles-modal-img {
            max-height: 60vh;
          }

          .chronicles-modal-nav-btn {
            width: 44px;
            height: 44px;
            font-size: 18px;
            top: auto;
            bottom: 20px;
            transform: none;
          }

          .chronicles-modal-nav-btn:hover {
            transform: scale(1.05);
          }

          .chronicles-modal-nav-btn.prev {
            left: 20px;
          }

          .chronicles-modal-nav-btn.next {
            right: 20px;
          }

          .chronicles-modal-close {
            top: 10px;
            right: 10px;
            font-size: 28px;
            z-index: 1020;
            background: rgba(0, 0, 0, 0.6);
            width: 36px;
            height: 36px;
            border-radius: 50%;
          }
        }

        @media (max-width: 480px) {
          .circular-gallery-container-full {
            height: 280px;
          }
          .chronicles-section {
            padding: 40px 0 60px 0;
          }
        }
      `}</style>
    </section>
  );
}

