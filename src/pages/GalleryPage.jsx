import { useState } from 'react';

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');

  const photos = [
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
      category: 'Race Day'
    },
    {
      url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'Custom Steering Rack Milling',
      category: 'Workshop'
    },
    {
      url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'NR24 Cornering Trials',
      category: 'Testing'
    },
    {
      url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'TIG Welding Spaceframe',
      category: 'Workshop'
    },
    {
      url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'Aerodynamic Drag Analysis Run',
      category: 'Testing'
    },
    {
      url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'EV Powertrain Hub Hubs Integration',
      category: 'Workshop'
    },
    {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'Team Design Brainstorming',
      category: 'Team'
    },
    {
      url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=500&h=380',
      title: 'Design Review in Workshop Room',
      category: 'Team'
    }
  ];

  const categories = ['All', 'Testing', 'Workshop', 'Race Day', 'Team'];

  const filteredPhotos = filter === 'All'
    ? photos
    : photos.filter(p => p.category === filter);

  return (
    <div className="gallery-page">
      <div className="checkered-pattern"></div>
      <div className="speed-lines"></div>

      <div className="gal-hero">
        <div className="container">
          <div className="chevron-decor hero-chevron">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1 className="page-hero-title">Media Archive</h1>
          <p className="page-hero-desc">
            Visual highlights from testing, fabrication inside the mechanical block, and race day competitions.
          </p>
        </div>
      </div>

      <div className="container gallery-content-section">
        {/* Filter Navigation */}
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="gallery-grid">
          {filteredPhotos.map((photo, idx) => (
            <div key={idx} className="gallery-card-item">
              <img src={photo.url} alt={photo.title} className="gallery-card-img" />
              <div className="gallery-card-overlay">
                <span className="gallery-card-tag">{photo.category}</span>
                <h3 className="gallery-card-title">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-page {
          background-color: var(--bg-primary);
          padding-bottom: 80px;
          min-height: 80vh;
        }

        .gal-hero {
          background: linear-gradient(to bottom, var(--bg-secondary) 0%, var(--bg-primary) 100%);
          padding: 80px 0 40px;
          border-bottom: 1px solid var(--border);
          text-align: left;
        }

        .hero-chevron {
          margin-bottom: 16px;
        }

        .page-hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .page-hero-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 700px;
        }

        .gallery-content-section {
          padding-top: 48px;
        }

        .gallery-filters {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 16px;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        .filter-tab-btn {
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          padding: 10px 24px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition);
        }

        .filter-tab-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background-color: var(--accent-soft);
        }

        .filter-tab-btn.active {
          background-color: var(--accent);
          color: #FFFFFF;
          border-color: var(--accent);
          box-shadow: var(--glow);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .gallery-card-item {
          position: relative;
          aspect-ratio: 4/3;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          cursor: pointer;
        }

        .gallery-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-card-item:hover .gallery-card-img {
          transform: scale(1.08);
        }

        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 10, 13, 0.95) 0%, rgba(10, 10, 13, 0.3) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          text-align: left;
          opacity: 0.9;
          transition: var(--transition);
        }

        .gallery-card-item:hover .gallery-card-overlay {
          background: linear-gradient(to top, rgba(225, 6, 0, 0.85) 0%, rgba(10, 10, 13, 0.4) 70%, transparent 100%);
        }

        .gallery-card-tag {
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
          margin-bottom: 8px;
          transition: var(--transition);
        }

        .gallery-card-item:hover .gallery-card-tag {
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .gallery-card-title {
          font-size: 1.25rem;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.2;
          font-weight: 600;
        }

        @media (max-width: 992px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .gallery-filters {
            width: 100%;
          }
          .filter-tab-btn {
            flex-grow: 1;
            text-align: center;
            padding: 8px 16px;
            font-size: 0.95rem;
          }
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
