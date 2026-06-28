import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AchievementsPage() {
  const achievements = [
    {
      year: '2025',
      title: 'SUPRA SAE',
      events: [
        {
          name: 'SUPRA SAEIndia 2025',
          result: 'Combustion Performance',
          desc: 'Competed with our highly optimized combustion vehicle featuring a custom aerodynamic package and spaceframe chassis.'
        }
      ]
    },
    {
      year: '2024',
      title: 'FB',
      events: [
        {
          name: 'Formula Bharat 2024',
          result: '3rd Place Overall',
          desc: 'Secured overall podium finish at the national Formula Student event, winning 1st in Engineering Design and 2nd in Cost Event.'
        }
      ]
    },
    {
      year: '2023',
      title: 'FB',
      events: [
        {
          name: 'Formula Bharat 2023',
          result: '1st in Acceleration',
          desc: 'Achieved first place in straight-line acceleration (75m in 4.02 seconds) with custom launch control.'
        }
      ]
    },
    {
      year: '2020',
      title: 'FE',
      events: [
        {
          name: 'Formula Student India / FE',
          result: '4th Place Overall',
          desc: 'Finished 4th overall in the national electric/combustion category, securing runner-up in Business Plan Presentation.'
        }
      ]
    },
    {
      year: '2019',
      title: 'FB',
      events: [
        {
          name: 'Formula Bharat 2019',
          result: 'Best Debutant Team',
          desc: 'Won the Best Debutant award for successfully passing all technical inspection checkpoints and finishing all dynamic tracks.'
        }
      ]
    },
    {
      year: '2017',
      title: 'SUPRA SAE',
      events: [
        {
          name: 'SUPRA SAEIndia 2017',
          result: 'Top 10 Design',
          desc: 'Secured a top 10 finish in the engineering design category, showcasing innovative mechanical linkages and custom exhaust tuning.'
        }
      ]
    },
    {
      year: '2016',
      title: 'FB',
      events: [
        {
          name: 'Formula Bharat 2016',
          result: 'Technical Inspection',
          desc: 'Successfully cleared technical inspection on first attempt and ran dynamic trials, validating chassis strength.'
        }
      ]
    },
    {
      year: '2015',
      title: 'FS CHINA',
      events: [
        {
          name: 'Formula Student China 2015',
          result: 'International Debut',
          desc: 'Competed internationally at Shanghai, China, passing strict technical inspection guidelines and static categories.'
        }
      ]
    },
    {
      year: '2012',
      title: 'FS HUNGARY',
      events: [
        {
          name: 'Formula Student Hungary 2012',
          result: 'First Global Event',
          desc: 'Represented our university on the European track, learning core manufacturing and engineering standards.'
        }
      ]
    }
  ];

  const containerRef = useRef(null);
  const progressLineRef = useRef(null);
  const nodeRefs = useRef([]);

  // Clear refs array on re-render
  nodeRefs.current = [];

  const addToRefs = (el) => {
    if (el && !nodeRefs.current.includes(el)) {
      nodeRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate progress bar filling
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            end: 'bottom 70%',
            scrub: true,
          }
        }
      );

      // Animate each node's dot, bubble and card
      nodeRefs.current.forEach((node, idx) => {
        if (!node) return;

        const dot = node.querySelector('.timeline-dot');
        const year = node.querySelector('.year-bubble');
        const card = node.querySelector('.event-detail-card');

        // Dot animation
        gsap.fromTo(
          dot,
          { backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)', scale: 0.8 },
          {
            backgroundColor: 'var(--accent)',
            borderColor: 'var(--accent)',
            scale: 1.2,
            boxShadow: '0 0 15px var(--accent)',
            scrollTrigger: {
              trigger: node,
              start: 'top 55%',
              end: 'top 45%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );

        // Year Bubble zoom-in/highlight trigger
        gsap.fromTo(
          year,
          { opacity: 0.7, scale: 0.95 },
          {
            opacity: 1,
            scale: 1.05,
            scrollTrigger: {
              trigger: node,
              start: 'top 55%',
              end: 'top 45%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );

        // Card entry transition
        gsap.fromTo(
          card,
          { opacity: 0, x: idx % 2 === 0 ? -40 : 40, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }, containerRef);

    // Refresh ScrollTrigger to ensure correct coordinate calculations
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div className="achievements-page">
      <div className="checkered-pattern"></div>
      <div className="speed-lines"></div>

      <div className="container timeline-section">
        <div className="timeline-trail" ref={containerRef}>
          {/* Background trace line */}
          <div className="timeline-line-bg"></div>
          
          {/* Animated active progress line */}
          <div className="timeline-line-progress-wrapper">
            <div className="timeline-line-progress-bar" ref={progressLineRef}></div>
          </div>

          {achievements.map((ach, idx) => (
            <div 
              key={idx} 
              ref={addToRefs} 
              className={`timeline-node ${idx % 2 === 0 ? 'left-node' : 'right-node'}`}
            >
              {/* Central node bullet */}
              <div className="timeline-dot"></div>

              {/* Date Header */}
              <div className="timeline-year">
                <span className="year-bubble">{ach.year}</span>
              </div>

              {/* Event Card content */}
              <div className="card event-detail-card">
                <div className="event-header-row">
                  <h3 className="event-name">{ach.events[0].name}</h3>
                  <span className="event-result">{ach.events[0].result}</span>
                </div>
                <p className="event-desc">{ach.events[0].desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .achievements-page {
          background-color: var(--bg-primary);
          padding-bottom: 80px;
          min-height: 80vh;
        }



        .timeline-section {
          padding-top: 80px;
          position: relative;
          overflow: hidden;
        }

        .timeline-trail {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 0;
        }

        /* Background track line */
        .timeline-line-bg {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: var(--border);
          transform: translateX(-50%);
          border-radius: 2px;
          opacity: 0.5;
        }

        /* Progress line wrapper */
        .timeline-line-progress-wrapper {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          transform: translateX(-50%);
          z-index: 2;
        }

        /* Active progress line itself */
        .timeline-line-progress-bar {
          width: 100%;
          height: 100%;
          background-color: var(--accent);
          transform-origin: top;
          transform: scaleY(0);
          border-radius: 2px;
          box-shadow: 0 0 15px var(--accent);
        }

        .timeline-node {
          position: relative;
          display: flex;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 100px;
        }

        .timeline-node:last-child {
          margin-bottom: 0;
        }

        /* Alternating layout on large screens */
        .timeline-node.left-node {
          justify-content: flex-start;
          padding-right: 50%;
        }

        .timeline-node.right-node {
          justify-content: flex-end;
          padding-left: 50%;
        }

        /* Connecting bullet on the center line */
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 24px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: var(--bg-primary);
          border: 4px solid var(--border);
          transform: translate(-50%, -50%);
          z-index: 10;
          transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }

        .timeline-year {
          position: absolute;
          top: 24px;
          transform: translateY(-50%);
          z-index: 5;
        }

        .left-node .timeline-year {
          left: 50%;
          padding-left: 32px;
          text-align: left;
        }

        .right-node .timeline-year {
          right: 50%;
          padding-right: 32px;
          text-align: right;
        }

        .year-bubble {
          font-family: var(--font-primary);
          font-size: 1.4rem;
          font-weight: 700;
          color: #FFFFFF;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border);
          padding: 6px 18px;
          border-radius: var(--border-radius-sm);
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
        }

        /* Light up the year bubble when active or hovered */
        .timeline-node:hover .year-bubble {
          background-color: var(--accent);
          border-color: var(--accent);
          box-shadow: var(--glow);
        }

        /* Event Cards */
        .event-detail-card {
          width: calc(100% - 40px);
          max-width: 420px;
          background: rgba(18, 18, 22, 0.45);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border);
          border-left: 4px solid var(--border);
          padding: 24px 28px;
          border-radius: var(--border-radius-md);
          position: relative;
          transition: var(--transition);
        }

        html[data-theme="light"] .event-detail-card {
          background: rgba(255, 255, 255, 0.45);
        }

        .left-node .event-detail-card {
          margin-right: 40px;
          margin-left: auto;
        }

        .right-node .event-detail-card {
          margin-left: 40px;
          margin-right: auto;
        }

        /* Hover card effects */
        .timeline-node:hover .event-detail-card {
          border-color: var(--border);
          border-left-color: var(--accent);
          background-color: var(--card-hover-bg);
          transform: translateY(-4px);
          box-shadow: var(--shadow), var(--glow);
        }

        .event-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 12px;
        }

        html[data-theme="light"] .event-header-row {
          border-bottom-color: rgba(0, 0, 0, 0.05);
        }

        .event-name {
          font-size: 1.3rem;
          margin: 0;
          font-family: var(--font-primary);
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .event-result {
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--accent);
          background-color: var(--accent-soft);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(225, 6, 0, 0.2);
          white-space: nowrap;
        }

        .event-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          letter-spacing: 0.2px;
        }

        /* Responsive Layout for Tablets/Mobile */
        @media (max-width: 768px) {
          .timeline-line-bg,
          .timeline-line-progress-wrapper {
            left: 20px;
            transform: none;
          }

          .timeline-node {
            flex-direction: column;
            padding-left: 50px !important;
            padding-right: 0 !important;
            margin-bottom: 60px;
          }

          .timeline-dot {
            left: 20px;
            top: 20px;
            transform: translate(-50%, -50%);
          }

          .timeline-year {
            position: static;
            transform: none;
            margin-bottom: 16px;
          }

          .left-node .timeline-year,
          .right-node .timeline-year {
            padding: 0;
            text-align: left;
          }

          .event-detail-card {
            width: 100%;
            max-width: none;
            margin: 0 !important;
            border-left-width: 4px;
          }
        }

        @media (max-width: 480px) {
          .timeline-node {
            padding-left: 40px !important;
            margin-bottom: 40px;
          }
          .event-detail-card {
            padding: 16px;
          }
          .event-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
