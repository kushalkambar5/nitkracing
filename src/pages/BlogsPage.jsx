// Technical Blogs Page with List and Reading view
import { blogs } from '../data/blogs';

export default function BlogsPage({ selectedBlogId, setSelectedBlogId }) {

  // Look up reading blog based on state or prop
  const currentReadingBlog = blogs.find(b => b.id === selectedBlogId);

  const handleBackToList = () => {
    setSelectedBlogId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="blogs-page">
      <div className="checkered-pattern"></div>
      <div className="speed-lines"></div>

      {currentReadingBlog ? (
        /* Blog Reading View */
        <article className="blog-reading-view">
          <div className="container reading-container">
            <button className="btn btn-secondary btn-sm back-list-btn" onClick={handleBackToList}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Articles
            </button>

            <header className="reading-header">
              <span className="reading-category">{currentReadingBlog.category}</span>
              <h1 className="reading-title">{currentReadingBlog.title}</h1>
              <div className="reading-meta">
                <span className="reading-author">Written by {currentReadingBlog.author}</span>
                <span className="meta-sep">•</span>
                <span className="reading-date">{currentReadingBlog.date}</span>
                <span className="meta-sep">•</span>
                <span className="reading-time">{currentReadingBlog.readTime}</span>
              </div>
            </header>

            <div className="reading-featured-img-wrapper">
              <img src={currentReadingBlog.image} alt={currentReadingBlog.title} className="reading-featured-img" />
            </div>

            <div className="reading-body-content">
              {Array.isArray(currentReadingBlog.content) ? (
                currentReadingBlog.content.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return <p key={index}>{block.text}</p>;
                  } else if (block.type === 'heading') {
                    return <h3 key={index}>{block.text}</h3>;
                  } else if (block.type === 'list') {
                    return (
                      <ul key={index}>
                        {block.items.map((item, idx) => (
                          <li key={idx}>
                            {typeof item === 'string' ? item : (
                              <>
                                <strong>{item.bold}</strong> {item.text}
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })
              ) : (
                currentReadingBlog.content
              )}
            </div>
          </div>
        </article>
      ) : (
        /* Blog List View */
        <>
          <div className="container blogs-content-section">
            <div className="grid-2 blogs-grid">
              {blogs.map((blog) => (
                <div key={blog.id} className="card blog-list-card" onClick={() => setSelectedBlogId(blog.id)}>
                  <div className="blog-list-img-wrapper">
                    <img src={blog.image} alt={blog.title} className="blog-list-img" />
                    <span className="blog-list-category">{blog.category}</span>
                  </div>
                  <div className="blog-list-info">
                    <div className="blog-list-meta">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="blog-list-title">{blog.title}</h3>
                    <p className="blog-list-excerpt">{blog.excerpt}</p>
                    <div className="blog-list-footer">
                      <span className="blog-list-author">By {blog.author}</span>
                      <button className="btn-read-more-link">
                        Read Article
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <style>{`
        .blogs-page {
          background-color: var(--bg-primary);
          padding-bottom: 80px;
          min-height: 80vh;
        }

        .blogs-hero {
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

        .blogs-content-section {
          padding-top: 48px;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .blog-list-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          padding: 0;
          text-align: left;
          overflow: hidden;
        }

        .blog-list-img-wrapper {
          width: 100%;
          aspect-ratio: 16/9;
          position: relative;
          background-color: var(--bg-secondary);
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }

        .blog-list-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .blog-list-card:hover .blog-list-img {
          transform: scale(1.05);
        }

        .blog-list-category {
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

        .blog-list-info {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .blog-list-meta {
          display: flex;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .blog-list-title {
          font-size: 1.4rem;
          line-height: 1.3;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .blog-list-card:hover .blog-list-title {
          color: var(--accent);
        }

        .blog-list-excerpt {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .blog-list-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border);
          padding-top: 16px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .btn-read-more-link {
          background: none;
          border: none;
          color: var(--accent);
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        .blog-list-card:hover .btn-read-more-link {
          color: var(--accent-hover);
        }

        /* Reading View Styles */
        .blog-reading-view {
          padding-top: 40px;
          text-align: left;
        }

        .back-list-btn {
          margin-bottom: 32px;
        }

        .reading-header {
          margin-bottom: 30px;
        }

        .reading-category {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 10px;
        }

        .reading-title {
          font-size: 2.8rem;
          line-height: 1.15;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .reading-meta {
          display: flex;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
          align-items: center;
          flex-wrap: wrap;
        }

        .meta-sep {
          color: var(--accent);
        }

        .reading-featured-img-wrapper {
          width: 100%;
          max-height: 480px;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          margin-bottom: 40px;
        }

        .reading-featured-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .reading-body-content {
          font-size: 1.08rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto;
        }

        .reading-body-content p {
          margin-bottom: 24px;
        }

        .reading-body-content h3 {
          font-size: 1.5rem;
          margin: 32px 0 16px;
          color: var(--text-primary);
        }

        .reading-body-content ul {
          margin-left: 20px;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .reading-body-content li {
          font-size: 1.05rem;
        }

        @media (max-width: 992px) {
          .reading-title {
            font-size: 2.2rem;
          }
          .blogs-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .reading-title {
            font-size: 1.7rem;
          }
          .reading-body-content p,
          .reading-body-content li {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
