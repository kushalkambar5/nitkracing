import { useState, useEffect } from 'react';
import InfiniteMenu from '../components/InfiniteMenu';

// Dynamically load all webp, jpg, png, jpeg, and mp4 assets from the assets directory
const mediaFiles = import.meta.glob('../assets/gallery_images/*.{webp,jpg,png,jpeg,mp4}', { eager: true });

const racingTitles = [
  "Track Testing - NR24",
  "Formula Bharat Race Day",
  "Workshop Engineering",
  "Aerodynamics Review",
  "Engine Powertrain Assembly",
  "Suspension Calibration",
  "Cornering Dynamics",
  "Team Collaboration",
  "Braking Analysis",
  "Steering System Milling",
  "Custom Carbon Layup",
  "Testing on the Strip",
  "Pit Lane Preparation",
  "Data Telemetry Review",
  "High Speed Cornering",
  "Thermal Management Check",
  "Chassis Fabrication",
  "Drivetrain Tuning",
  "Driver Ergonomics Setup",
  "Race Operations Briefing"
];

const racingDescriptions = [
  "Pushing the limits during rigorous shakedown runs.",
  "Unleashing performance under high competitive pressure.",
  "Precision machining of critical components in our workshop.",
  "Optimizing drag and downforce through real-world analysis.",
  "Integrating and testing our state-of-the-art electric powertrain.",
  "Fine-tuning double wishbone setups for maximum mechanical grip.",
  "Analyzing slip angles and chassis roll on the skidpad.",
  "Collaboration breeds engineering innovation on the drawing board.",
  "Evaluating deceleration rates and heat dissipation.",
  "Crafting high-precision custom steering assemblies.",
  "Curing lightweight composite parts for weight reduction.",
  "Straight-line speed verification and system diagnostics.",
  "Rapid checks and adjustments before the green flag drops.",
  "Decrypting sensor logs to uncover tenths of a second.",
  "Experiencing peak lateral Gs in high-speed corners.",
  "Monitoring battery temperatures and cooling performance.",
  "Welding high-strength steel tubes for driver safety.",
  "Calibrating gear ratios and motor controllers for acceleration.",
  "Ensuring optimal control layouts and cockpit comfort.",
  "Aligning team strategies and driver objectives for race day."
];

export default function GalleryPage() {
  const [modalItemIndex, setModalItemIndex] = useState(null);

  // Generate the items array from the glob imported assets
  const items = Object.entries(mediaFiles).map(([path, module], index) => {
    const url = module.default;
    const filename = path.split('/').pop();
    const isVideo = filename.toLowerCase().endsWith('.mp4');

    const title = isVideo
      ? "Official Promo Video"
      : racingTitles[index % racingTitles.length];

    const description = isVideo
      ? "Footage capturing the intensity, engineering, and sheer speed of the NITK Racing formula student car."
      : racingDescriptions[index % racingDescriptions.length];

    return {
      image: url,
      title,
      description,
      isVideo,
      link: url
    };
  });

  const openModal = (item) => {
    const idx = items.findIndex(i => i.image === item.image);
    setModalItemIndex(idx >= 0 ? idx : 0);
  };

  const closeModal = () => setModalItemIndex(null);

  const showNext = (e) => {
    if (e) e.stopPropagation();
    setModalItemIndex((prev) => (prev + 1) % items.length);
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    setModalItemIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Keyboard navigation for the Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalItemIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalItemIndex]);

  const activeModalItem = modalItemIndex !== null ? items[modalItemIndex] : null;

  return (
    <div className="gallery-page">
      <div className="checkered-pattern"></div>
      <div className="speed-lines"></div>

      <div className="gallery-header-section">
        <div className="container">
          <div className="gallery-title-wrapper">
            <span className="gallery-tag">MEDIA VAULT</span>
            <h1 className="gallery-main-title">TEAM GALLERY</h1>
            <div className="gallery-divider"></div>
            <p className="gallery-main-subtitle">
              Drag to rotate the sphere. Hover to view details. Click on the arrow to expand into high-fidelity view mode.
            </p>
          </div>
        </div>
      </div>

      <div className="infinite-menu-container">
        <InfiniteMenu items={items} scale={1.0} onItemClick={openModal} />
      </div>

      {/* Glassmorphism Modal Lightbox */}
      {activeModalItem && (
        <div className="gallery-modal-overlay" onClick={closeModal}>
          <button 
            className="gallery-modal-nav-btn prev" 
            onClick={showPrev}
            aria-label="Previous image"
          >
            &#x2190;
          </button>
          
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={closeModal} aria-label="Close modal">
              &times;
            </button>
            
            <div className="gallery-modal-media-wrapper">
              {activeModalItem.isVideo ? (
                <video 
                  className="gallery-modal-video" 
                  src={activeModalItem.image} 
                  controls 
                  autoPlay 
                  playsInline
                />
              ) : (
                <img 
                  className="gallery-modal-img" 
                  src={activeModalItem.image} 
                  alt={activeModalItem.title} 
                />
              )}
            </div>

            <div className="gallery-modal-info">
              <span className="gallery-modal-tag">{activeModalItem.isVideo ? "VIDEO" : "IMAGE"}</span>
              <h3 className="gallery-modal-title">{activeModalItem.title}</h3>
              <p className="gallery-modal-desc">{activeModalItem.description}</p>
            </div>
          </div>

          <button 
            className="gallery-modal-nav-btn next" 
            onClick={showNext}
            aria-label="Next image"
          >
            &#x2192;
          </button>
        </div>
      )}

      <style>{`
        .gallery-page {
          background-color: var(--bg-primary, #0A0A0D);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          padding-top: 100px;
          padding-bottom: 50px;
          display: flex;
          flex-direction: column;
        }

        .gallery-header-section {
          text-align: center;
          margin-bottom: 20px;
          z-index: 5;
        }

        .gallery-title-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .gallery-tag {
          font-family: var(--font-mono, monospace);
          font-size: 0.8rem;
          color: var(--accent, #e10600);
          letter-spacing: 2px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .gallery-main-title {
          font-family: var(--font-primary, sans-serif);
          font-size: 3.5rem;
          font-weight: 900;
          color: var(--text-primary, #FFFFFF);
          letter-spacing: -1px;
          line-height: 1;
          margin: 0;
          text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        .gallery-divider {
          width: 80px;
          height: 4px;
          background-color: var(--accent, #e10600);
          margin: 16px 0;
          box-shadow: var(--glow);
        }

        .gallery-main-subtitle {
          font-family: var(--font-secondary, sans-serif);
          font-size: 1.15rem;
          color: var(--text-secondary, #BFBFBF);
          margin: 0;
          line-height: 1.5;
        }

        .infinite-menu-container {
          flex-grow: 1;
          height: 70vh;
          min-height: 550px;
          position: relative;
          z-index: 2;
        }

        /* Glassmorphism Modal Lightbox Styles */
        .gallery-modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(6, 6, 8, 0.93);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 40px;
          animation: galleryFadeIn 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .gallery-modal-content {
          position: relative;
          background: rgba(18, 18, 22, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--border-radius-lg, 16px);
          padding: 24px;
          max-width: 90vw;
          width: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(225, 6, 0, 0.12);
          animation: galleryScaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .gallery-modal-close {
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

        .gallery-modal-close:hover {
          color: var(--accent, #e10600);
          transform: scale(1.1);
        }

        .gallery-modal-media-wrapper {
          width: auto;
          max-width: 80vw;
          max-height: 60vh;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: var(--border-radius-md, 8px);
          overflow: hidden;
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .gallery-modal-img, .gallery-modal-video {
          max-width: 100%;
          max-height: 60vh;
          object-fit: contain;
          display: block;
        }

        .gallery-modal-info {
          margin-top: 20px;
          text-align: center;
          width: 100%;
          max-width: 600px;
        }

        .gallery-modal-tag {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          color: var(--accent, #e10600);
          background-color: rgba(225, 6, 0, 0.1);
          border: 1px solid rgba(225, 6, 0, 0.3);
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .gallery-modal-title {
          font-family: var(--font-primary, sans-serif);
          font-size: 1.75rem;
          font-weight: 700;
          margin: 12px 0 6px 0;
          color: #ffffff;
          letter-spacing: 0.5px;
        }

        .gallery-modal-desc {
          font-family: var(--font-secondary, sans-serif);
          font-size: 1rem;
          color: var(--text-secondary, #BFBFBF);
          margin: 0;
          line-height: 1.5;
        }

        .gallery-modal-nav-btn {
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

        .gallery-modal-nav-btn:hover {
          background: var(--accent, #e10600);
          border-color: var(--accent, #e10600);
          transform: translateY(-50%) scale(1.1);
        }

        .gallery-modal-nav-btn.prev {
          left: -90px;
        }

        .gallery-modal-nav-btn.next {
          right: -90px;
        }

        @keyframes galleryFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes galleryScaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 1200px) {
          .gallery-modal-nav-btn.prev {
            left: 20px;
          }
          .gallery-modal-nav-btn.next {
            right: 20px;
          }
        }

        @media (max-width: 768px) {
          .gallery-page {
            padding-top: 80px;
          }
          
          .gallery-main-title {
            font-size: 2.5rem;
          }
          
          .gallery-main-subtitle {
            font-size: 1rem;
          }
          
          .infinite-menu-container {
            height: 60vh;
            min-height: 480px;
          }

          .gallery-modal-overlay {
            padding: 16px;
          }

          .gallery-modal-content {
            padding: 16px;
            width: 100%;
          }

          .gallery-modal-nav-btn {
            width: 44px;
            height: 44px;
            font-size: 18px;
            top: auto;
            bottom: 20px;
            transform: none;
          }

          .gallery-modal-nav-btn:hover {
            transform: scale(1.05);
          }

          .gallery-modal-nav-btn.prev {
            left: 20px;
          }

          .gallery-modal-nav-btn.next {
            right: 20px;
          }

          .gallery-modal-close {
            top: 10px;
            right: 10px;
            font-size: 28px;
            z-index: 1020;
            background: rgba(0, 0, 0, 0.6);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .gallery-modal-media-wrapper {
            max-width: 90vw;
            max-height: 45vh;
          }

          .gallery-modal-img, .gallery-modal-video {
            max-height: 45vh;
          }

          .gallery-modal-title {
            font-size: 1.4rem;
          }
          
          .gallery-modal-desc {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .gallery-main-title {
            font-size: 1.8rem;
          }
          .gallery-main-subtitle {
            font-size: 0.9rem;
          }
          .infinite-menu-container {
            height: 55vh;
            min-height: 360px;
          }
          .gallery-header-section {
            padding-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}
