  import fleetDashboard from "../assets/fleetDashboard.gif"
  import jsportfolio from "../assets/jsportfolio.gif"
  import imageeditor from "../assets/imageeditor.gif"
  import bhabeshtatto from "../assets/bhabeshtatto.gif"
  
  export const projects = [
  {
  title: "Fleet Tracking Dashboard",
  description: "Interactive real‑time fleet tracking dashboard with trip playback, telemetry events, and Leaflet map visualization.",
  tech: ["React", "Leaflet", "Tailwind", "React‑Leaflet"],
  demo: "https://mapup-fleet-dashboard-by-bishalkr.netlify.app/",
  preview: fleetDashboard,
  github: "https://github.com/blast0/mapup-dashboard"
  },
  {
  title: "React Image Maker Tool",
  description: "Full stack MERN e-commerce platform with cart and authentication.",
  tech: ["MongoDB", "Express", "React", "Node"],
  demo: "https://myimagemaker.netlify.app/",
  preview: imageeditor,
  github: "https://github.com/blast0/React-Image-Maker-Tool"
  },
  {
    title: "Mini Employee Dashboard",
    description: "Employee management dashboard with CRUD, validation, sorting, filtering, search, dark mode, CSV export, and localStorage persistence.",
    tech: ["Angular", "TypeScript", "Angular Material", "LocalStorage"],
    demo: "https://blast0.github.io/Mini-Employee-Dashboard-Deployment/#/",
    preview: jsportfolio,
    github: "https://github.com/blast0/Mini-Employee-Dashboard"
  },
  {
    title: "PWA-ready React App",
    description:
      "Fully responsive animated PWA with internationalization, custom install experience, sliders, gallery album, splash screen, hero video, and excellent Lighthouse results.",
    tech: [
      "React",
      "Styled-Components",
      "Framer-Motion",
      "React-Scroll",
      "React-Swipeable",
      "PWA"
    ],
    demo: "https://frost-tattoo.hu",
    preview: bhabeshtatto,
    github: "https://github.com/AndrasE/frost-tattoo-and-piercing"
  },
  {
    title: "Angular Portfolio",
    description:
      "Personal portfolio built with Angular and Tailwind, featuring light/dark themes, animated hover spotlight cards, API integrations, and modern UI/UX components.",
    tech: ["Angular", "Tailwind CSS", "TypeScript", "Spotify API", "Trakt API"],
    demo: "https://bishalkr-angular-portfolio.netlify.app",
    preview: "./Angular-Portfolio-Preview.gif",
    github: "https://github.com/blast0/angular.portfolio"
  },
  {
    title: "SVG Path Editor",
    description:
      "In-browser SVG path editor with interactive control points, real-time command editing, viewBox controls, short-keys support, and full path transformations.",
    tech: ["Angular", "TypeScript", "SVG", "Docker"],
    demo: "https://blast0.github.io/svg-path-editor/",
    preview: "./doc/screenshot.png",
    github: "https://github.com/blast0/svg-path-editor"
  },
  {
    title: "3D Portfolio Website",
    description:
      "Next.js + Three.js animated 3D portfolio with interactive models, real-time lighting, responsive design, email form integration, Framer Motion animations, and reusable scalable architecture using HOCs and best practices.",
    tech: [
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "TailwindCSS",
      "Framer Motion",
      "React"
    ],
    demo: "https://bishalkumar-3d-portfolio.netlify.app/",
    preview: "./hero.gif",
    github: "https://github.com/blast0/3d-portfolio"
  }
  ];
  