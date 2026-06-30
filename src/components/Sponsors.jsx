import LogoLoop from './LogoLoop';

// Import logos from assets
import solidworksLogo from '../assets/sponsers/SolidWorks.png';
import amphenolLogo from '../assets/sponsers/amphenol_industrial.png';
import dinotuneLogo from '../assets/sponsers/dinotune.png';
import kenestoLogo from '../assets/sponsers/kenesto.png';
import simscaleLogo from '../assets/sponsers/simscale.png';
import vishalLogo from '../assets/sponsers/vishal_rubber_technologies.png';
import ansysLogo from '../assets/sponsers/ansys.png';
import cumminsLogo from '../assets/sponsers/cummins.png';
import doshiLogo from '../assets/sponsers/doshi_technologies.jpg';
import eplanLogo from '../assets/sponsers/e_plan.png';
import jlcpcbLogo from '../assets/sponsers/jlcpcb.png';
import kearneyLogo from '../assets/sponsers/kearney_perlab.jpg';
import questLogo from '../assets/sponsers/quest_global.png';
import tdpsLogo from '../assets/sponsers/tdps.png';
import nitkfootballLogo from '../assets/sponsers/nitk_football.png'

export default function Sponsors() {
  const sponsorLogos = [
    { src: solidworksLogo, alt: 'SolidWorks', title: 'SolidWorks', href: 'https://www.solidworks.com' },
    { src: amphenolLogo, alt: 'Amphenol Industrial', title: 'Amphenol Industrial', href: 'https://www.amphenol-industrial.com' },
    { src: dinotuneLogo, alt: 'Dinotune', title: 'Dinotune', href: 'https://dinotune.com' },
    { src: kenestoLogo, alt: 'Kenesto', title: 'Kenesto', href: 'https://www.kenesto.com' },
    { src: simscaleLogo, alt: 'SimScale', title: 'SimScale', href: 'https://www.simscale.com' },
    { src: vishalLogo, alt: 'Vishal Rubber Technologies', title: 'Vishal Rubber Technologies', href: 'http://www.vishalrubber.com' },
    { src: ansysLogo, alt: 'Ansys', title: 'Ansys', href: 'https://www.ansys.com' },
    { src: cumminsLogo, alt: 'Cummins', title: 'Cummins', href: 'https://www.cummins.com' },
    { src: doshiLogo, alt: 'Doshi Technologies', title: 'Doshi Technologies', href: 'http://doshiassociates.net' },
    { src: eplanLogo, alt: 'EPLAN', title: 'EPLAN', href: 'https://www.eplan-software.com' },
    { src: jlcpcbLogo, alt: 'JLCPCB', title: 'JLCPCB', href: 'https://jlcpcb.com' },
    { src: kearneyLogo, alt: 'Kearney PERLab', title: 'Kearney PERLab', href: 'https://www.kearney.com/perlab' },
    { src: questLogo, alt: 'Quest Global', title: 'Quest Global', href: 'https://www.quest-global.com' },
    { src: tdpsLogo, alt: 'TD Power Systems', title: 'TD Power Systems', href: 'http://www.tdps.co.in' },
    { src: nitkfootballLogo, alt: 'NITK Football', title: 'NITK Football', href: 'https://www.nitk.edu.in' },
  ];

  return (
    <section id="sponsors" className="sponsors-section">
      <div className="checkered-pattern"></div>
      
      <div className="container">
        <div className="section-title-center">
          <span>Our Sponsors</span>
        </div>
        
        <p className="sponsors-intro">
          Our achievements are fueled by the invaluable trust and support of our industry sponsors. They supply the software, materials, components, and grants that make our racecar designs possible.
        </p>
      </div>

      <div className="sponsors-carousel-card">
        <LogoLoop
          logos={sponsorLogos}
          speed={80}
          direction="left"
          logoHeight={50}
          gap={64}
          hoverSpeed={0}
          scaleOnHover={true}
          fadeOut={true}
          ariaLabel="Our industry and technology sponsors"
        />
      </div>

      <style>{`
        .sponsors-section {
          background-color: var(--bg-primary);
        }

        .sponsors-intro {
          max-width: 700px;
          margin: -24px auto 48px;
          text-align: center;
          color: var(--text-secondary);
        }

        .sponsors-carousel-card {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          border-left: none;
          border-right: none;
          border-radius: 0;
          padding: 48px 0;
          box-shadow: var(--shadow);
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        /* Sleek grayscale sponsor logos with smooth color & scale transition on hover */
        .sponsors-carousel-card .logoloop__item img {
          filter: grayscale(100%) brightness(0.9) contrast(1.1);
          opacity: 0.65;
          transition: filter 0.3s ease, opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sponsors-carousel-card .logoloop__item:hover img {
          filter: grayscale(0%) brightness(1) contrast(1);
          opacity: 1;
        }

        /* Light theme adjustments for grayscale readability */
        html[data-theme="light"] .sponsors-carousel-card .logoloop__item img {
          filter: grayscale(100%) brightness(0.4) contrast(1.2);
          opacity: 0.6;
        }

        html[data-theme="light"] .sponsors-carousel-card .logoloop__item:hover img {
          filter: grayscale(0%) brightness(1) contrast(1);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
