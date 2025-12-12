import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  name: "Hariharan R",
  titles: ["AI Engineer", "Robotics Engineer", "Software Developer"],
  contact: {
    location: "Chennai, Tamil Nadu, India",
    phone: "9025044368",
    email: "dev.hariharanr@gmail.com",
    github: "github.com/dev-hari-haran",
    linkedin: "linkedin.com/in/hariharan-r-905a8a2a4/",
    instagram: "instagram.com",
    x: "x.com"
  },
  education: [
    {
      degree: "B.Tech in Robotics and Artificial Intelligence",
      institution: "SASTRA University",
      year: "2028"
    }
  ],
  experience: [
    {
      role: "Branding & Marketing Cluster Team Member",
      company: "Developer Community SASTRA",
      duration: "2025–Present",
      points: [
        {
            summary: "UI/UX and graphic design contributions.",
            detail: "Spearheaded the visual identity for 3 major campus events, creating cohesive asset packs used across social media and print."
        }
      ]
    },
    {
      role: "Branding & Marketing Cluster Team Member",
      company: "GDGC SASTRA",
      duration: "2025–Present",
      points: [
        {
            summary: "Graphic design and poster design.",
            detail: "Designed high-engagement posters for technical workshops, resulting in a 15% increase in student registrations."
        }
      ]
    },
    {
      role: "UI/UX Designer",
      company: "300dpi (Self-Employed)",
      duration: "Unknown",
      points: [
        {
            summary: "Designed UI/UX assets and product visuals.",
            detail: "Delivered comprehensive UI kits and prototypes for local startups, focusing on accessibility and mobile-first design patterns."
        }
      ]
    },
    {
      role: "Design Cluster Team Member",
      company: "ELEXA",
      duration: "Unknown",
      points: [
        {
            summary: "Poster and magazine layout design.",
            detail: "Collaborated with content teams to layout the annual technical magazine, optimizing typography for readability and aesthetic appeal."
        }
      ]
    }
  ],
  projects: [
    {
      title: "VISAGE",
      description: "Intelligent multi-agent AI system using RL, CV, and LLMs.",
      details: [
        "Built RL pipelines, CV modules, LLM reasoning layer, and UI flows."
      ],
      tech: ["Python", "PyTorch", "OpenCV", "LangChain"],
      github: "https://github.com/dev-hari-haran",
      link: "#"
    },
    {
      title: "Career App",
      description: "Full-stack productivity ecosystem for students.",
      details: [
        "Designed and built entire frontend with dashboard, analytics and academic tools."
      ],
      tech: ["React", "Typescript", "Tailwind"],
      github: "https://github.com/dev-hari-haran",
      link: "#"
    },
    {
      title: "E-Commerce Platform",
      description: "Farmer–shopkeeper–user marketplace within 10km radius.",
      details: [
        "Location-based recommendation system with Tkinter UI."
      ],
      tech: ["Python", "MySQL", "Tkinter"],
      github: "https://github.com/dev-hari-haran"
    }
  ],
  skills: {
    programming: ["Python", "C", "C++", "Django", "Firebase", "Vibe Coding Tools"],
    ai_ml: ["ML", "DL", "RL", "LLMs", "Generative AI", "PyTorch", "TensorFlow", "OpenCV"],
    robotics: ["AI-driven Robotics", "Vision Robotics"],
    development: ["React Interface Engineering"],
    design: ["UI Design", "Poster Design", "Video Editing"],
    languages: ["Tamil (Native)", "English (90%)", "Hindi (70%)"]
  },
  achievements: [
    "Hackathons: Aurigo NIT Trichy, DPI Innovation Hackathon, SIH, Robo Sumo (NIT Trichy), EYRC"
  ],
  certifications: [
    {
        title: "Problem Solving Intermediate",
        issuer: "HackerRank",
        description: "Validated ability to solve complex algorithmic problems and implement efficient data structures.",
        link: "#"
    },
    {
        title: "Software Engineer Certification",
        issuer: "Coursera",
        description: "Comprehensive coursework covering SDLC, version control, and modern agile methodologies.",
        link: "#"
    },
    {
        title: "SQL Advanced",
        issuer: "HackerRank",
        description: "Mastered complex queries, joins, window functions, and database optimization techniques.",
        link: "#"
    },
    {
        title: "Python Basic",
        issuer: "HackerRank",
        description: "Demonstrated fundamental proficiency in Python syntax, data types, and control flow.",
        link: "#"
    }
  ],
  workshops: [
    {
        title: "Gesture Controlled Robot",
        organizer: "Tech Fest 2024",
        description: "Hands-on workshop building a robot controlled by accelerometer data processing."
    },
    {
        title: "CoppeliaSim Simulation",
        organizer: "Robotics Club",
        description: "Deep dive into simulating kinematic chains and sensor interactions in a virtual environment."
    }
  ]
};

export const SYSTEM_INSTRUCTION = `
You are JARVIS v2.0, an advanced AI Assistant representing Hariharan R on his portfolio website.
You have access to his resume data.
Answer questions about his skills, projects, and experience accurately based on the provided data.
Keep answers concise, professional, yet slightly futuristic and engaging (matching a Web3/AI portfolio vibe).
If asked about contact info, provide it.
If asked about something not in the resume, politely say you don't have that info but he is a fast learner.

RESUME CONTEXT:
${JSON.stringify(RESUME_DATA)}
`;