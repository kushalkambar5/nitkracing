import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this to a backend/email API.
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  return (
    <section id="contact" className="contact-section">
      <div className="speed-lines"></div>

      <div className="container">
        <div className="section-title-center">
          <span>Contact Us</span>
        </div>

        <div className="contact-grid">
          {/* Left Column: Contact details & Socials */}
          <div className="contact-details-col">
            <h3 className="contact-sub-title">Get in Touch</h3>
            <p className="contact-intro-text">
              Have questions about sponsorship, recruitment, or our racing
              projects? Drop us a line, and we will get back to you as soon as
              possible.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="info-icon-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="info-label">Our Workshop</h4>
                  <p className="info-val">
                    Mechanical Engineering Block, NITK Surathkal, Mangaluru,
                    India - 575025
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="info-label">Email Address</h4>
                  <a
                    href="mailto:racing@nitk.edu.in"
                    className="info-val info-link"
                  >
                    racing@nitk.edu.in
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.399581788775!2d74.7924765750756!3d13.010775887265842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba352077e64177d%3A0x6b77e8a939f37c2e!2sNational%20Institute%20of%20Technology%20Karnataka%2C%20Surathkal!5e0!3m2!1sen!2sin!4v1719513364969!5m2!1sen!2sin"
                className="map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NITK Surathkal Map"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-col card">
            <h3 className="form-heading">Send a Message</h3>

            {submitted && (
              <div className="submission-alert">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="alert-check"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Message sent successfully! We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter message subject"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary form-submit-btn">
                Send Message
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>


      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: stretch;
        }

        .contact-details-col {
          text-align: left;
          display: flex;
          flex-direction: column;
        }

        .contact-sub-title {
          font-size: 1.8rem;
          margin-bottom: 16px;
        }

        .contact-intro-text {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 32px;
        }

        .contact-info-item {
          display: flex;
          gap: 16px;
        }

        .info-icon-wrapper {
          color: var(--accent);
          background-color: var(--accent-soft);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--border-radius-sm);
          flex-shrink: 0;
        }

        .info-icon-wrapper svg {
          width: 20px;
          height: 20px;
        }

        .info-label {
          font-family: var(--font-primary);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .info-val {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .info-link:hover {
          color: var(--accent);
          text-decoration: underline;
        }

        .map-container {
          flex-grow: 1;
          min-height: 250px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--border-radius-md);
          position: relative;
          overflow: hidden;
        }

        .map-iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        /* Premium dark mode styling for the Google Map iframe */
        html[data-theme="dark"] .map-iframe {
          filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }

        .contact-form-col {
          display: flex;
          flex-direction: column;
          padding: 40px;
        }

        .form-heading {
          font-size: 1.8rem;
          margin-bottom: 28px;
          text-align: left;
        }

        .submission-alert {
          background-color: var(--accent-soft);
          border: 1px solid var(--accent);
          color: var(--text-primary);
          padding: 12px 16px;
          border-radius: var(--border-radius-sm);
          font-size: 0.85rem;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
        }

        .alert-check {
          color: var(--accent);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }

        .form-group-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-family: var(--font-primary);
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-primary);
        }

        .form-group input, .form-group textarea {
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--border-radius-sm);
          color: var(--text-primary);
          padding: 12px 16px;
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          transition: var(--transition);
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--accent);
          outline: none;
          box-shadow: 0 0 10px rgba(225, 6, 0, 0.08);
        }

        .form-submit-btn {
          align-self: flex-start;
          width: 100%;
          margin-top: 10px;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .contact-form-col {
            padding: 30px 20px;
          }
        }

        @media (max-width: 576px) {
          .form-group-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .contact-sub-title {
            font-size: 1.3rem;
          }
          .contact-intro-text {
            font-size: 0.9rem;
          }
          .contact-form-col {
            padding: 20px 14px;
          }
        }
      `}</style>
    </section>
  );
}
