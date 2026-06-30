import keerthivarshanImg from "../assets/members/keerthivarshan.png";
import vashishtImg from "../assets/members/vashisht.png";
import drSaurabhImg from "../assets/members/dr_saurabh_chandraker.png";

const contactsList = [
  {
    img: keerthivarshanImg,
    label: "Keerthivarshan Vashisth",
    tag: "Team Captain",
    phone: "+91 98949 22964",
  },
  {
    img: vashishtImg,
    label: "Vashisth",
    tag: "Outreach Lead",
    phone: "+91 70167 80650",
  },
  {
    img: drSaurabhImg,
    label: "Dr. Saurabh Chandraker",
    tag: "Faculty Advisor",
    phone: "+91 99816 40044",
  },
];

export default function KeyContacts() {
  return (
    <section className="key-contacts-section">
      <div className="speed-lines"></div>
      
      <div className="container">
        <div className="key-contacts-container">
          <div className="key-contacts-header">
            <h3 className="key-contacts-heading">Key Contacts</h3>
            <p className="key-contacts-sub">
              Reach out directly to our team leadership and advisors.
            </p>
          </div>

          <div className="image-reveal-list">
            {contactsList.map((item) => (
              <div
                key={item.label}
                className="image-reveal-item"
              >
                <div className="reveal-left">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="reveal-avatar-mobile"
                  />
                  <p className="reveal-label">{item.label}</p>
                </div>
                <div className="reveal-meta">
                  <span className="reveal-tag">{item.tag}</span>
                  <span className="reveal-dot"></span>
                  <a
                    href={`tel:${item.phone.replace(/\s+/g, "")}`}
                    className="reveal-phone"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .key-contacts-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .key-contacts-container {
          position: relative;
          width: 100%;
        }

        .key-contacts-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .key-contacts-heading {
          font-size: 2.2rem;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }

        .key-contacts-sub {
          color: var(--text-secondary);
          font-size: 1.05rem;
          font-family: var(--font-secondary);
        }

        .image-reveal-list {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .image-reveal-item {
          width: 100%;
          padding: 28px 0;
          cursor: default;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          transition: border-color 0.3s ease;
        }

        .image-reveal-item:last-child {
          border-bottom: none;
        }

        .image-reveal-item:hover {
          border-color: var(--accent);
        }

        .reveal-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .reveal-avatar-mobile {
          display: none;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--border);
          transition: border-color 0.3s ease;
        }

        .image-reveal-item:hover .reveal-avatar-mobile {
          border-color: var(--accent);
        }

        .reveal-label {
          font-family: var(--font-primary);
          font-size: 2.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          text-align: left;
          transition: color 0.3s ease;
          line-height: 1.1;
        }

        .image-reveal-item:hover .reveal-label {
          color: var(--accent);
        }

        .reveal-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          font-family: var(--font-secondary);
          font-size: 1.1rem;
          color: var(--text-secondary);
          text-align: right;
        }

        .reveal-tag {
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .reveal-phone {
          color: var(--text-secondary);
          transition: color 0.3s ease;
        }

        .reveal-phone:hover {
          color: var(--accent);
          text-decoration: underline;
        }

        .reveal-dot {
          width: 10px;
          height: 10px;
          background-color: var(--accent);
          display: inline-block;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          transition: transform 0.3s ease;
        }

        .image-reveal-item:hover .reveal-dot {
          transform: rotate(45deg) scale(1.2);
        }

        @media (max-width: 1024px) {
          .reveal-avatar-mobile {
            display: block;
          }
          .reveal-label {
            font-size: 1.8rem;
          }
          .reveal-meta {
            font-size: 1rem;
            flex-direction: column;
            align-items: flex-end;
            gap: 6px;
          }
          .reveal-dot {
            display: none;
          }
        }

        @media (max-width: 576px) {
          .image-reveal-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 20px 0;
          }
          .reveal-meta {
            align-items: flex-start;
            width: 100%;
            padding-left: 76px;
          }
          .reveal-label {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .reveal-label {
            font-size: 1.3rem;
          }
          .reveal-meta {
            padding-left: 56px;
          }
        }
      `}</style>
    </section>
  );
}
