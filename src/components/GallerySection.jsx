export default function GallerySection({ setPath }) {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'Track Testing - NR24',
      category: 'Testing'
    },
    {
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'Suspension Assembly & Tuning',
      category: 'Workshop'
    },
    {
      url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'Formula Bharat Race Day',
      category: 'Competition'
    },
    {
      url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'Custom Steering Rack Milling',
      category: 'Workshop'
    }
  ];

  const handleViewAll = () => {
    setPath('/Gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="gallery-section">
      <div className="speed-lines"></div>
      
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Moments from the Track</h2>
          </div>
          <button className="btn btn-secondary btn-sm header-action-btn" onClick={handleViewAll}>
            View All Photos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="grid-4 gallery-preview-grid">
          {images.map((img, idx) => (
            <div key={idx} className="gallery-preview-card" onClick={handleViewAll}>
              <img src={img.url} alt={img.title} className="gallery-preview-img" />
              <div className="gallery-preview-info">
                <span className="gallery-preview-tag">{img.category}</span>
                <h3 className="gallery-preview-card-title">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .gallery-preview-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .gallery-preview-card {
          position: relative;
          aspect-ratio: 4/3;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: var(--transition);
        }

        .gallery-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-preview-card:hover .gallery-preview-img {
          transform: scale(1.08);
        }

        .gallery-preview-info {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 10, 13, 0.95) 0%, rgba(10, 10, 13, 0.4) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          text-align: left;
          opacity: 0.9;
          transition: var(--transition);
        }

        .gallery-preview-card:hover .gallery-preview-info {
          background: linear-gradient(to top, rgba(225, 6, 0, 0.8) 0%, rgba(10, 10, 13, 0.5) 70%, transparent 100%);
        }

        .gallery-preview-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--accent);
          background-color: rgba(225, 6, 0, 0.1);
          border: 1px solid rgba(225, 6, 0, 0.3);
          padding: 2px 8px;
          border-radius: 20px;
          width: fit-content;
          margin-bottom: 6px;
          transition: var(--transition);
        }

        .gallery-preview-card:hover .gallery-preview-tag {
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .gallery-preview-card-title {
          font-size: 1.15rem;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.2;
          font-weight: 600;
        }

        @media (max-width: 992px) {
          .gallery-preview-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .gallery-preview-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
