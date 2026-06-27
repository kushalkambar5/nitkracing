// Technical Blogs Page with List and Reading view


export default function BlogsPage({ selectedBlogId, setSelectedBlogId }) {
  const blogs = [
    {
      id: 'aero-fb25',
      title: 'Designing Aerodynamics for FB25: CFD Simulation to Reality',
      excerpt: 'A deep dive into our aerodynamic design workflow. From multi-element wing profile optimization using ANSYS Fluent to carbon-fiber layup in the autoclave.',
      date: 'June 18, 2026',
      readTime: '6 min read',
      category: 'Aerodynamics',
      author: 'Aditya Rao',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=300',
      content: (
        <>
          <p>Aerodynamics plays a vital role in Formula Student vehicles, where cornering speeds and lateral acceleration dictate lap times. In this article, we outline the engineering process behind designing the aero package for our upcoming combustion car, the FB25.</p>
          
          <h3>1. Establishing Design Objectives</h3>
          <p>Our primary goals for the FB25 aero package were to generate 800 N of downforce at 60 km/h, maintain an aerodynamic balance of 45% front / 55% rear, and minimize the drag penalty to preserve engine horsepower.</p>
          
          <h3>2. Airfoil Selection and 2D CAD</h3>
          <p>We began by evaluating various Selig and Wortmann airfoil profiles. Multi-element configurations (slatted flaps) were designed for the front and rear wings using 2D CFD software to find optimal angles of attack and gap/overlap measurements.</p>
          
          <h3>3. 3D CFD Simulation & Optimization</h3>
          <p>The 2D profiles were extruded and integrated into a full-scale 3D car model. Using ANSYS Fluent, we performed Reynolds-Averaged Navier-Stokes (RANS) simulations with k-omega SST turbulence models. Simulations allowed us to optimize:
            <ul>
              <li><strong>Front Wing Endplates:</strong> Shaping outwash to redirect wheel wake.</li>
              <li><strong>Undertray & Diffuser:</strong> Exploiting ground effect for low-drag downforce.</li>
              <li><strong>Rear Wing Gurney Flaps:</strong> Increasing pressure differentials without massive weight penalties.</li>
            </ul>
          </p>
          
          <h3>4. Composite Manufacturing</h3>
          <p>Once simulations converged on the optimal design, we moved to fabrication. Molds were CNC-milled from polyurethane tooling boards. Pre-preg carbon fiber sheets were laid up inside the molds, vacuum-bagged, and cured inside our autoclave to ensure maximum strength-to-weight ratio.</p>
          
          <h3>5. Track Correlation Testing</h3>
          <p>To validate our simulations, we equipped the car with linear potentiometers on the suspension dampers and strain gauges on the wing mounts. During track runs, dynamic ride-height data confirmed that the real downforce values correlated with our CFD predictions within a 4.8% margin.</p>
        </>
      )
    },
    {
      id: 'sponsorship-fs',
      title: 'Behind the Pitlane: Sourcing Corporate Partnerships in Motorsport',
      excerpt: 'How a student-run team manages a budget of over 1.5 Million INR. Exploring crowd-funding models, corporate pitches, and keeping the team operations running.',
      date: 'May 28, 2026',
      readTime: '5 min read',
      category: 'Management',
      author: 'Sneha Hegde',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=300',
      content: (
        <>
          <p>While the technical crew works tirelessly on structural welding and circuit boards, the business and marketing team works to fuel the project. Running a Formula Student team is effectively running a small-scale engineering startup.</p>
          
          <h3>1. Mapping the Budget</h3>
          <p>Before sending out a single email, we analyze the cost of every component, raw tube, travel ticket, and registration fee. For the current season, our projected budget is approximately 1.8 Million INR. Sourcing this capital requires a strategic multi-tier approach.</p>
          
          <h3>2. Drafting the Corporate Pitch</h3>
          <p>Corporate sponsors receive hundreds of sponsorship letters weekly. To stand out, our pitches focus on mutual value creation rather than donations. We showcase:
            <ul>
              <li><strong>Research Collaboration:</strong> Testing sponsor products (lubricants, sensors) in extreme conditions.</li>
              <li><strong>Recruitments:</strong> Providing companies with direct access to a pool of industry-ready, hands-on engineers.</li>
              <li><strong>Branding:</strong> Logo placement on the car livery, team merchandise, workshop banners, and social channels.</li>
            </ul>
          </p>
          
          <h3>3. Crowd-funding Campaigns</h3>
          <p>To supplement corporate grants, we launch annual crowd-funding campaigns. By sharing our story, mockups, and testing videos with alumni, motorsport enthusiasts, and families, we build a community that supports us financially. Small contributions from 500+ individuals collectively fund our logistics and competition registration fees.</p>
          
          <h3>4. Operational Coordination</h3>
          <p>Managing the funds requires strict accounting audits. Every transaction is documented in our Bills of Materials (BOM) to comply with university regulations and prepare for the Cost & Manufacturing event at Formula Bharat.</p>
        </>
      )
    },
    {
      id: 'ev-powertrain',
      title: 'Transitioning to Electric: Our Modular Battery Pack Design',
      excerpt: 'Exploring the engineering behind our first Accumulator Container. Designing thermal cooling channels, cell-tap monitoring boards, and battery management safety relays.',
      date: 'April 15, 2026',
      readTime: '8 min read',
      category: 'Electronics',
      author: 'Karthik M.',
      image: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=600&h=300',
      content: (
        <>
          <p>As the automotive industry shifts toward electrification, NITK Racing is initiating its electric transition. The heart of our new EV prototype is the accumulator (battery pack) container. Here is an overview of how we designed it.</p>
          
          <h3>1. Cell Selection & Chemistry</h3>
          <p>We selected Lithium Nickel Manganese Cobalt Oxide (NMC) 18650 cylindrical cells due to their high energy density and discharge rates. Our accumulator is configured as 80S 4P (80 cells in series, 4 in parallel), delivering a nominal voltage of 296V and storing up to 6.2 kWh of energy.</p>
          
          <h3>2. Thermal Management Systems</h3>
          <p>During dynamic endurance runs, cells can heat up rapidly. To prevent thermal runaway, we designed a forced-air cooling system. Air channels are CNC-routed through customized fire-retardant cell holders, and dual high-static-pressure fans drive heat away from the core blocks.</p>
          
          <h3>3. Custom BMS & Battery Monitoring</h3>
          <p>Safety is our absolute priority. We developed custom battery monitoring boards that track individual cell voltages and temperature readings. The boards communicate with a central Battery Management System (BMS) over a isolated SPI interface, triggering safety shutdown relays if any cell exceeds 60°C or drops below 2.5V.</p>
          
          <h3>4. Structural Container Design</h3>
          <p>The accumulator container must withstand heavy impacts. We fabricated the outer container using 2mm sheet steel, lined with insulating fiberglass layers. The container successfully underwent finite element analysis (FEA) to confirm it can withstand 20G of impact force in all directions, as mandated by Formula Student safety rules.</p>
        </>
      )
    }
  ];

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
              {currentReadingBlog.content}
            </div>
          </div>
        </article>
      ) : (
        /* Blog List View */
        <>
          <div className="blogs-hero">
            <div className="container">
              <div className="chevron-decor hero-chevron">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <h1 className="page-hero-title">Technical Blogs</h1>
              <p className="page-hero-desc">
                Engineering reports, project updates, and educational articles shared directly by the NITK Racing subteams.
              </p>
            </div>
          </div>

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
      `}</style>
    </div>
  );
}
