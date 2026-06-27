export const blogs = [
  {
    id: 'aero-fb25',
    title: 'Designing Aerodynamics for FB25: CFD Simulation to Reality',
    excerpt: 'A deep dive into our aerodynamic design workflow. From multi-element wing profile optimization using ANSYS Fluent to carbon-fiber layup in the autoclave.',
    date: 'June 18, 2026',
    readTime: '6 min read',
    category: 'Aerodynamics',
    author: 'Aditya Rao',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=300',
    content: [
      {
        type: 'paragraph',
        text: 'Aerodynamics plays a vital role in Formula Student vehicles, where cornering speeds and lateral acceleration dictate lap times. In this article, we outline the engineering process behind designing the aero package for our upcoming combustion car, the FB25.'
      },
      {
        type: 'heading',
        text: '1. Establishing Design Objectives'
      },
      {
        type: 'paragraph',
        text: 'Our primary goals for the FB25 aero package were to generate 800 N of downforce at 60 km/h, maintain an aerodynamic balance of 45% front / 55% rear, and minimize the drag penalty to preserve engine horsepower.'
      },
      {
        type: 'heading',
        text: '2. Airfoil Selection and 2D CAD'
      },
      {
        type: 'paragraph',
        text: 'We began by evaluating various Selig and Wortmann airfoil profiles. Multi-element configurations (slatted flaps) were designed for the front and rear wings using 2D CFD software to find optimal angles of attack and gap/overlap measurements.'
      },
      {
        type: 'heading',
        text: '3. 3D CFD Simulation & Optimization'
      },
      {
        type: 'paragraph',
        text: 'The 2D profiles were extruded and integrated into a full-scale 3D car model. Using ANSYS Fluent, we performed Reynolds-Averaged Navier-Stokes (RANS) simulations with k-omega SST turbulence models. Simulations allowed us to optimize:'
      },
      {
        type: 'list',
        items: [
          { bold: 'Front Wing Endplates:', text: 'Shaping outwash to redirect wheel wake.' },
          { bold: 'Undertray & Diffuser:', text: 'Exploiting ground effect for low-drag downforce.' },
          { bold: 'Rear Wing Gurney Flaps:', text: 'Increasing pressure differentials without massive weight penalties.' }
        ]
      },
      {
        type: 'heading',
        text: '4. Composite Manufacturing'
      },
      {
        type: 'paragraph',
        text: 'Once simulations converged on the optimal design, we moved to fabrication. Molds were CNC-milled from polyurethane tooling boards. Pre-preg carbon fiber sheets were laid up inside the molds, vacuum-bagged, and cured inside our autoclave to ensure maximum strength-to-weight ratio.'
      },
      {
        type: 'heading',
        text: '5. Track Correlation Testing'
      },
      {
        type: 'paragraph',
        text: 'To validate our simulations, we equipped the car with linear potentiometers on the suspension dampers and strain gauges on the wing mounts. During track runs, dynamic ride-height data confirmed that the real downforce values correlated with our CFD predictions within a 4.8% margin.'
      }
    ]
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
    content: [
      {
        type: 'paragraph',
        text: 'While the technical crew works tirelessly on structural welding and circuit boards, the business and marketing team works to fuel the project. Running a Formula Student team is effectively running a small-scale engineering startup.'
      },
      {
        type: 'heading',
        text: '1. Mapping the Budget'
      },
      {
        type: 'paragraph',
        text: 'Before sending out a single email, we analyze the cost of every component, raw tube, travel ticket, and registration fee. For the current season, our projected budget is approximately 1.8 Million INR. Sourcing this capital requires a strategic multi-tier approach.'
      },
      {
        type: 'heading',
        text: '2. Drafting the Corporate Pitch'
      },
      {
        type: 'paragraph',
        text: 'Corporate sponsors receive hundreds of sponsorship letters weekly. To stand out, our pitches focus on mutual value creation rather than donations. We showcase:'
      },
      {
        type: 'list',
        items: [
          { bold: 'Research Collaboration:', text: 'Testing sponsor products (lubricants, sensors) in extreme conditions.' },
          { bold: 'Recruitments:', text: 'Providing companies with direct access to a pool of industry-ready, hands-on engineers.' },
          { bold: 'Branding:', text: 'Logo placement on the car livery, team merchandise, workshop banners, and social channels.' }
        ]
      },
      {
        type: 'heading',
        text: '3. Crowd-funding Campaigns'
      },
      {
        type: 'paragraph',
        text: 'To supplement corporate grants, we launch annual crowd-funding campaigns. By sharing our story, mockups, and testing videos with alumni, motorsport enthusiasts, and families, we build a community that supports us financially. Small contributions from 500+ individuals collectively fund our logistics and competition registration fees.'
      },
      {
        type: 'heading',
        text: '4. Operational Coordination'
      },
      {
        type: 'paragraph',
        text: 'Marketing and operations require strict accounting audits. Every transaction is documented in our Bills of Materials (BOM) to comply with university regulations and prepare for the Cost & Manufacturing event at Formula Bharat.'
      }
    ]
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
    content: [
      {
        type: 'paragraph',
        text: 'As the automotive industry shifts toward electrification, NITK Racing is initiating its electric transition. The heart of our new EV prototype is the accumulator (battery pack) container. Here is an overview of how we designed it.'
      },
      {
        type: 'heading',
        text: '1. Cell Selection & Chemistry'
      },
      {
        type: 'paragraph',
        text: 'We selected Lithium Nickel Manganese Cobalt Oxide (NMC) 18650 cylindrical cells due to their high energy density and discharge rates. Our accumulator is configured as 80S 4P (80 cells in series, 4 in parallel), delivering a nominal voltage of 296V and storing up to 6.2 kWh of energy.'
      },
      {
        type: 'heading',
        text: '2. Thermal Management Systems'
      },
      {
        type: 'paragraph',
        text: 'During dynamic endurance runs, cells can heat up rapidly. To prevent thermal runaway, we designed a forced-air cooling system. Air channels are CNC-routed through customized fire-retardant cell holders, and dual high-static-pressure fans drive heat away from the core blocks.'
      },
      {
        type: 'heading',
        text: '3. Custom BMS & Battery Monitoring'
      },
      {
        type: 'paragraph',
        text: 'Safety is our absolute priority. We developed custom battery monitoring boards that track individual cell voltages and temperature readings. The boards communicate with a central Battery Management System (BMS) over an isolated SPI interface, triggering safety shutdown relays if any cell exceeds 60°C or drops below 2.5V.'
      },
      {
        type: 'heading',
        text: '4. Structural Container Design'
      },
      {
        type: 'paragraph',
        text: 'The accumulator container must withstand heavy impacts. We fabricated the outer container using 2mm sheet steel, lined with insulating fiberglass layers. The container successfully underwent finite element analysis (FEA) to confirm it can withstand 20G of impact force in all directions, as mandated by Formula Student safety rules.'
      }
    ]
  },
  {
    id: 'suspension-kinematics',
    title: 'Suspension Kinematics: Tuning Roll Center and Camber Gain',
    excerpt: 'An inside look at our suspension geometry optimization. Using double-wishbone layouts, OptimumG, and wheel center iterations to maximize mechanical grip.',
    date: 'April 02, 2026',
    readTime: '7 min read',
    category: 'Suspension',
    author: 'Kushal Gowda',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600&h=300',
    content: [
      {
        type: 'paragraph',
        text: 'The primary role of the suspension system is to maximize the tire contact patch with the track under all dynamic conditions—cornering, braking, and acceleration. This article walks through our kinematics design process.'
      },
      {
        type: 'heading',
        text: '1. Defining Kinematics Parameters'
      },
      {
        type: 'paragraph',
        text: 'We began with target vehicle parameters: wheel travel (+/- 25mm), roll gradient (less than 1.5 deg/g), and scrub radius (kept under 10mm to reduce steering effort). We opted for a double-wishbone SLA (Short Long Arm) configuration with pull-rod actuation in the front and push-rod in the rear.'
      },
      {
        type: 'heading',
        text: '2. Iterative Optimization in OptimumG'
      },
      {
        type: 'paragraph',
        text: 'Using kinematic simulation tools, we plotted roll-center migration. Keeping the roll center low and centered minimizes lateral load transfer distribution variations. We carefully tuned the camber gain to -1.5 degrees per degree of body roll to counteract tire roll deflection during hard cornering.'
      },
      {
        type: 'heading',
        text: '3. Compliance and FEA'
      },
      {
        type: 'paragraph',
        text: 'A kinematic model assumes rigid links, but real-world wishbones flex. We conducted structural finite element analysis (FEA) on our suspension links and CNC-milled 7075-T6 aluminum uprights. The wishbones, made of AISI 4130 steel tubing, were structurally optimized to withstand peak cornering and braking forces without buckling.'
      },
      {
        type: 'heading',
        text: '4. Dampers and Shaker Rig Testing'
      },
      {
        type: 'paragraph',
        text: 'We configured our Ohlins TTX25 dampers by performing spring-rate and damping calculations based on wheel rate. The entire assembly was tested on a multi-post shaker rig to tune the low-speed and high-speed damping, ensuring excellent chassis stability and tire grip over track irregularities.'
      }
    ]
  },
  {
    id: 'engine-tuning',
    title: 'Extracting Every Horsepower: Custom Intake and Exhaust Tuning',
    excerpt: 'How we optimize our KTM 390 single-cylinder engine. Tuning the fuel injection maps, restrictor calculations, and CFD-guided intake plenum design.',
    date: 'March 10, 2026',
    readTime: '6 min read',
    category: 'Powertrain',
    author: 'Rohan Sharma',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=600&h=300',
    content: [
      {
        type: 'paragraph',
        text: 'Formula Student rules require a 20mm intake restrictor for combustion engines, which heavily chokes power output. Our powertrain subteam focus is to design intake and exhaust systems that minimize this restriction and maximize low-end torque.'
      },
      {
        type: 'heading',
        text: '1. Designing the Intake Plenum'
      },
      {
        type: 'paragraph',
        text: 'We designed a custom 3D-printed glass-fiber reinforced plenum. Using 1D gas dynamics simulations (in GT-Power) and 3D CFD, we optimized the volume of the plenum (approx 2.1 liters) and runner lengths to exploit Helmholtz resonance. This helps stuff more air into the combustion chamber just before the intake valve closes.'
      },
      {
        type: 'heading',
        text: '2. Designing the 20mm Restrictor'
      },
      {
        type: 'paragraph',
        text: 'The restrictor is designed as a converging-diverging nozzle (venturi). The converging angle was set to 12 degrees and diverging angle to 6 degrees to minimize boundary layer separation and pressure loss. The convergent and divergent geometries were CNC machined in-house from high-grade aluminum.'
      },
      {
        type: 'heading',
        text: '3. Dyno Calibration and ECU Tuning'
      },
      {
        type: 'paragraph',
        text: 'We mounted our KTM 390 engine on our custom water-brake engine dynamometer. Using a PE-ECU, we spent over 40 hours tuning ignition timing and fuel injection maps. We successfully reached a peak power of 41 HP at 8500 RPM while maintaining a flat torque curve across the midrange, which is crucial for quick corner exits.'
      }
    ]
  }
];
