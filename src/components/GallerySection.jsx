import { useMemo } from 'react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import DomeGallery from './DomeGallery';

// Dynamically import all images from assets gallery folder (excluding videos)
const imageFiles = import.meta.glob('../assets/gallery_images/*.{webp,jpg,png,jpeg}', { eager: true });
const allImages = Object.values(imageFiles).map((mod) => mod.default);

export default function GallerySection({ setPath }) {
  const handleViewAll = () => {
    setPath('/Gallery');
  };

  // Select a random half of images for the 3D gallery
  const galleryImages = useMemo(() => {
    const shuffled = [...allImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const halfCount = Math.floor(shuffled.length / 2);
    return shuffled.slice(0, halfCount).map((url) => ({
      src: url,
      alt: 'Moment from the Track'
    }));
  }, []);

  return (
    <section className="gallery-section">
      <div className="speed-lines"></div>
      
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Moments from the Track</h2>
          </div>
          <InteractiveHoverButton onClick={handleViewAll}>
            View All Photos
          </InteractiveHoverButton>
        </div>

        <div className="dome-gallery-wrapper">
          <DomeGallery
            images={galleryImages}
            grayscale={false}
            overlayBlurColor="var(--bg-secondary)"
          />
        </div>
      </div>

      <style>{`
        .gallery-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 80px 0;
        }

        .dome-gallery-wrapper {
          position: relative;
          width: 100%;
          height: 600px;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }

        @media (max-width: 768px) {
          .dome-gallery-wrapper {
            height: 450px;
          }
        }
      `}</style>
    </section>
  );
}
