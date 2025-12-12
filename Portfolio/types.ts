export interface Project {
  title: string;
  description: string;
  details: string[];
  tech: string[];
  link?: string;
  github?: string;
}

export interface ExperiencePoint {
  summary: string;
  detail: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  points: ExperiencePoint[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Certification {
  title: string;
  issuer: string;
  description: string;
  link: string;
}

export interface Workshop {
  title: string;
  organizer: string;
  description: string;
}

export interface ResumeData {
  name: string;
  titles: string[];
  contact: {
    location: string;
    phone: string;
    email: string;
    github: string;
    linkedin: string;
    instagram?: string;
    x?: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: {
    programming: string[];
    ai_ml: string[];
    robotics: string[];
    development: string[];
    design: string[];
    languages: string[];
  };
  achievements: string[];
  certifications: Certification[];
  workshops: Workshop[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}