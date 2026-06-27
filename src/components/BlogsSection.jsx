import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

export default function BlogsSection({ setPath, setSelectedBlogId }) {
  const blogs = [
    {
      id: 'aero-fb25',
      title: 'Designing Aerodynamics for FB25: CFD Simulation to Reality',
      excerpt: 'A deep dive into our aerodynamic design workflow. From multi-element wing profile optimization using ANSYS Fluent to carbon-fiber layup in the autoclave.',
      date: 'June 18, 2026',
      readTime: '6 min read',
      category: 'Aerodynamics',
      author: 'Aditya Rao',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400&h=250'
    },
    {
      id: 'sponsorship-fs',
      title: 'Behind the Pitlane: Sourcing Corporate Partnerships in Motorsport',
      excerpt: 'How a student-run team manages a budget of over 1.5 Million INR. Exploring crowd-funding models, corporate pitches, and keeping the team operations running.',
      date: 'May 28, 2026',
      readTime: '5 min read',
      category: 'Management',
      author: 'Sneha Hegde',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400&h=250'
    }
  ];

  const handleBlogClick = (id) => {
    setSelectedBlogId(id);
    setPath('/blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAll = () => {
    setSelectedBlogId(null);
    setPath('/blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="blogs-section">
      <div className="speed-lines"></div>
      
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Latest Updates</h2>
          </div>
          <InteractiveHoverButton onClick={handleViewAll}>
            View All Blogs
          </InteractiveHoverButton>
        </div>

        <div className="grid-2 blogs-preview-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="card blog-preview-card" onClick={() => handleBlogClick(blog.id)}>
              <div className="blog-img-wrapper">
                <img src={blog.image} alt={blog.title} className="blog-img" />
                <span className="blog-category-badge">{blog.category}</span>
              </div>
              <div className="blog-meta">
                <span className="blog-date">{blog.date}</span>
                <span className="blog-meta-dot">•</span>
                <span className="blog-read-time">{blog.readTime}</span>
              </div>
              <h3 className="blog-card-title">{blog.title}</h3>
              <p className="blog-card-excerpt">{blog.excerpt}</p>
              <div className="blog-card-footer">
                <span className="blog-author">By {blog.author}</span>
                <button className="btn-read-more" onClick={(e) => { e.stopPropagation(); handleBlogClick(blog.id); }}>
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="arrow-icon">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .blogs-section {
          background-color: var(--bg-primary);
        }

        .blog-preview-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 0;
          overflow: hidden;
        }

        .blog-img-wrapper {
          width: 100%;
          aspect-ratio: 16/9;
          position: relative;
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        .blog-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .blog-preview-card:hover .blog-img {
          transform: scale(1.05);
        }

        .blog-category-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #FFFFFF;
          background-color: var(--accent);
          padding: 4px 10px;
          border-radius: var(--border-radius-sm);
          font-weight: 600;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          padding: 20px 24px 8px;
        }

        .blog-meta-dot {
          color: var(--accent);
        }

        .blog-card-title {
          font-size: 1.4rem;
          line-height: 1.3;
          margin-bottom: 10px;
          padding: 0 24px;
          color: var(--text-primary);
          transition: var(--transition);
        }

        .blog-preview-card:hover .blog-card-title {
          color: var(--accent);
        }

        .blog-card-excerpt {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 20px;
          padding: 0 24px;
          flex-grow: 1;
        }

        .blog-card-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px 24px;
          border-top: 1px solid var(--border);
          background-color: rgba(0,0,0,0.05);
        }

        .blog-author {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .btn-read-more {
          background: none;
          border: none;
          color: var(--accent);
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
        }

        .btn-read-more .arrow-icon {
          transition: transform 0.3s ease;
        }

        .btn-read-more:hover {
          color: var(--accent-hover);
        }

        .btn-read-more:hover .arrow-icon {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .blogs-preview-grid {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
