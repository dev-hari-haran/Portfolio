import React, { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { RESUME_DATA } from './constants';
import { Code2, Cpu, Palette, GraduationCap, Briefcase, Zap, MapPin, Mail, Phone, MessageSquare, Terminal, Rocket, Layers, Database, Sun, Moon, Info, Award, Wrench, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { ChatWidget } from './components/ChatWidget';
import { ExperiencePoint } from './types';

// Hook for scroll animations
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // Trigger once
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isIntersecting;
}

// Reusable FadeIn Component
const FadeIn: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);

    return (
        <div 
            ref={ref} 
            className={`${className} transition-all duration-700 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const App: React.FC = () => {
  const [isFloatChatOpen, setIsFloatChatOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Initialize theme based on preference or default to dark
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-200 overflow-x-hidden transition-colors duration-300">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-600 dark:bg-cyan-500 rounded-sm rotate-45 animate-pulse"></span>
            Hariharan<span className="text-cyan-600 dark:text-cyan-400">.R</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-gray-400">
                <a href="#about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors hover:glow">About</a>
                <a href="#skills" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Skills</a>
                <a href="#projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Projects</a>
                <a href="#experience" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Experience</a>
                <a href="#certifications" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Certifications</a>
            </div>
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle Theme"
            >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero / About Section */}
      <Hero id="about" />

      <main className="relative z-10 space-y-0">
        
        {/* Skills Section - Spaceship Command Center Theme */}
        <Section id="skills" title="Technical Arsenal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0}>
                <HoloPanel 
                    title="PROGRAMMING" 
                    icon={<Code2 className="w-6 h-6" />} 
                    skills={RESUME_DATA.skills.programming}
                    color="cyan" 
                />
            </FadeIn>
            <FadeIn delay={100}>
                <HoloPanel 
                    title="AI & ROBOTICS" 
                    icon={<Cpu className="w-6 h-6" />} 
                    skills={[...RESUME_DATA.skills.ai_ml, ...RESUME_DATA.skills.robotics]}
                    color="purple" 
                />
            </FadeIn>
            <FadeIn delay={200}>
                <HoloPanel 
                    title="DESIGN & DEV" 
                    icon={<Palette className="w-6 h-6" />} 
                    skills={[...RESUME_DATA.skills.development, ...RESUME_DATA.skills.design]}
                    color="pink" 
                />
            </FadeIn>
          </div>
        </Section>

        {/* Projects Section - Spaceship Timeline/Rooms Theme */}
        <Section id="projects" title="Mission Logs">
          <div className="relative">
            {/* Central Timeline 'Conduit' */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-200 dark:bg-slate-800 border-l border-r border-slate-300 dark:border-white/5 hidden md:block"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.5)] hidden md:block"></div>

            <div className="space-y-24">
              {RESUME_DATA.projects.map((project, idx) => (
                <ProjectBay key={idx} project={project} index={idx} />
              ))}
            </div>
          </div>
        </Section>

        {/* Experience & Education Grid */}
        <Section id="experience" title="Career Trajectory">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/50 dark:bg-slate-900/30 p-8 rounded-3xl border border-slate-200 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
            
            {/* Education */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
                <GraduationCap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-xl font-bold tracking-widest uppercase text-slate-800 dark:text-gray-200">Education</h3>
              </div>
              {RESUME_DATA.education.map((edu, idx) => (
                <FadeIn key={idx} delay={idx * 100}>
                    <div className="relative pl-8 border-l-2 border-slate-300 dark:border-slate-700 pb-8 last:pb-0 hover:border-cyan-500 transition-colors group">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0)] group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all"></div>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{edu.degree}</h4>
                    <p className="text-slate-600 dark:text-gray-400">{edu.institution}</p>
                    <p className="text-sm text-slate-500 dark:text-gray-500 mt-1 font-mono">{edu.year}</p>
                    </div>
                </FadeIn>
              ))}

               <div className="flex items-center gap-3 mb-6 mt-12 border-b border-slate-200 dark:border-white/10 pb-4">
                <Zap className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
                <h3 className="text-xl font-bold tracking-widest uppercase text-slate-800 dark:text-gray-200">Achievements</h3>
              </div>
              <div className="space-y-4">
                  {RESUME_DATA.achievements.map((ach, idx) => (
                      <FadeIn key={idx} delay={idx * 50}>
                        <div className="p-4 rounded-xl bg-slate-100 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-white/5 text-sm text-slate-700 dark:text-gray-300 hover:border-yellow-500/30 transition-colors flex items-start gap-3">
                            <span className="text-yellow-500 mt-1">★</span>
                            <span>{ach}</span>
                        </div>
                      </FadeIn>
                  ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
                <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold tracking-widest uppercase text-slate-800 dark:text-gray-200">Experience</h3>
              </div>
              {RESUME_DATA.experience.map((exp, idx) => (
                <FadeIn key={idx} delay={idx * 100}>
                    <div className="relative pl-8 border-l-2 border-slate-300 dark:border-slate-700 pb-8 last:pb-0 hover:border-purple-500 transition-colors group">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0)] group-hover:shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-all"></div>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">{exp.role}</h4>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">{exp.company}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-500 mt-1 mb-3 font-mono">{exp.duration}</p>
                    <ul className="text-sm text-slate-600 dark:text-gray-400 list-none space-y-3">
                        {exp.points.map((p, i) => (
                            <li key={i} className="group/point relative flex items-start gap-2 cursor-help">
                                <span className="w-1 h-1 mt-2 bg-purple-500 rounded-full shrink-0"></span>
                                <span>{p.summary}</span>
                                <Info className="w-3 h-3 mt-1 opacity-40 group-hover/point:opacity-100 transition-opacity shrink-0" />
                                
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl opacity-0 translate-y-2 group-hover/point:opacity-100 group-hover/point:translate-y-0 transition-all pointer-events-none z-20 border border-slate-700">
                                    {p.detail}
                                    <div className="absolute bottom-[-4px] left-4 w-2 h-2 bg-slate-900 rotate-45 border-b border-r border-slate-700"></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    </div>
                </FadeIn>
              ))}
            </div>

          </div>
        </Section>
        
        {/* Certifications & Workshops Section (Rearranged) */}
        <Section id="certifications" title="Credentials & Training">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Certifications Column */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Award className="w-6 h-6 text-green-500" />
                        <h3 className="text-xl font-bold tracking-widest uppercase text-slate-800 dark:text-gray-200">Certifications</h3>
                    </div>
                    
                    {RESUME_DATA.certifications.map((cert, idx) => (
                        <FadeIn key={idx} delay={idx * 100}>
                            <div className="group relative p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all duration-300">
                                <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50 rounded-l-2xl group-hover:bg-green-500 transition-colors"></div>
                                
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-green-500 transition-colors">{cert.title}</h4>
                                    <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{cert.issuer}</span>
                                </div>
                                
                                <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-2">{cert.description}</p>
                                
                                <a href={cert.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 hover:underline">
                                    View Certificate <ChevronRight className="w-3 h-3" />
                                </a>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Workshops Column */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Wrench className="w-6 h-6 text-orange-500" />
                        <h3 className="text-xl font-bold tracking-widest uppercase text-slate-800 dark:text-gray-200">Workshops</h3>
                    </div>

                    {RESUME_DATA.workshops.map((ws, idx) => (
                        <FadeIn key={idx} delay={idx * 100}>
                            <div className="group relative p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300">
                                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/50 rounded-l-2xl group-hover:bg-orange-500 transition-colors"></div>
                                
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">{ws.title}</h4>
                                    <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{ws.organizer}</span>
                                </div>
                                
                                <p className="text-sm text-slate-600 dark:text-gray-400">{ws.description}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
             </div>
        </Section>

        {/* Footer / Contact */}
        <footer className="border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 py-16 snap-start transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
                TRANSMISSION ENDED.
            </h2>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    <MapPin className="w-5 h-5" /> {RESUME_DATA.contact.location}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    <Phone className="w-5 h-5" /> {RESUME_DATA.contact.phone}
                </div>
                <a href={`mailto:${RESUME_DATA.contact.email}`} className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    <Mail className="w-5 h-5" /> {RESUME_DATA.contact.email}
                </a>
            </div>
            <p className="text-slate-500 dark:text-gray-600 text-sm font-mono">
                © {new Date().getFullYear()} Hariharan R. Powered by React, Tailwind & Gemini 2.5. <br/> System Version 3.4.0
            </p>
          </div>
        </footer>

      </main>

      {/* Floating Action Button for Chat on Mobile/Scroll */}
      <button 
        onClick={() => setIsFloatChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)] dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-110 transition-transform lg:hidden"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <ChatWidget isOpen={isFloatChatOpen} onClose={() => setIsFloatChatOpen(false)} />
    </div>
  );
};

// -- SUBCOMPONENTS --

// 1. Holographic Panel for Skills
const HoloPanel: React.FC<{ icon: React.ReactNode, title: string, skills: string[], color: 'cyan' | 'purple' | 'pink' }> = ({ icon, title, skills, color }) => {
    const colorClasses = {
        cyan: 'border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shadow-cyan-500/10 from-cyan-900/10 dark:from-cyan-900/10',
        purple: 'border-purple-500/30 text-purple-600 dark:text-purple-400 shadow-purple-500/10 from-purple-900/10 dark:from-purple-900/10',
        pink: 'border-pink-500/30 text-pink-600 dark:text-pink-400 shadow-pink-500/10 from-pink-900/10 dark:from-pink-900/10'
    };
    
    return (
        <div className={`relative p-8 rounded-xl bg-white dark:bg-slate-900/50 backdrop-blur-md border ${colorClasses[color]} hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-300 group overflow-hidden h-full`}>
            {/* Corner Markers */}
            <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${color === 'cyan' ? 'border-cyan-500' : color === 'purple' ? 'border-purple-500' : 'border-pink-500'} opacity-50`}></div>
            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${color === 'cyan' ? 'border-cyan-500' : color === 'purple' ? 'border-purple-500' : 'border-pink-500'} opacity-50`}></div>
            
            {/* Background Grid Scanline */}
            <div className={`absolute inset-0 bg-gradient-to-b ${colorClasses[color]} to-transparent opacity-0 dark:opacity-20 group-hover:opacity-10 dark:group-hover:opacity-30 transition-opacity`}></div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors">{icon}</div>
                    <span className="text-xs font-mono opacity-50 uppercase text-slate-500 dark:text-gray-400">Sys.Module.0{title.length}</span>
                </div>
                <h3 className="text-xl font-bold tracking-wider mb-6 text-slate-900 dark:text-white">{title}</h3>
                
                <div className="grid grid-cols-2 gap-3">
                    {skills.map((skill, idx) => (
                        <div key={idx} className={`flex items-center gap-2 p-2 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-sm text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all hover:scale-105 ${color === 'cyan' ? 'hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]' : color === 'purple' ? 'hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${color === 'cyan' ? 'bg-cyan-500' : color === 'purple' ? 'bg-purple-500' : 'bg-pink-500'} group-hover:animate-ping`}></span>
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 2. Project Room / Timeline Item
const ProjectBay: React.FC<{ project: any, index: number }> = ({ project, index }) => {
    const isEven = index % 2 === 0;
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);
    
    return (
        <div 
            ref={ref}
            className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''} group perspective transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
        >
            
            {/* Content "Room" */}
            <div className="flex-1 w-full relative">
                <div className="absolute inset-0 bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-all rounded-full opacity-0 dark:opacity-100"></div>
                <div className="relative p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all rounded-2xl md:rounded-3xl overflow-hidden shadow-lg dark:shadow-2xl transform hover:scale-[1.02] duration-300">
                    {/* Top Bar Decoration */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                    
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                        <span className="text-xs font-mono text-cyan-600 dark:text-cyan-500/70 border border-cyan-500/30 px-2 py-1 rounded">BAY_0{index + 1}</span>
                    </div>
                    
                    <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="space-y-4 mb-8">
                        {project.details.map((d: string, i: number) => (
                            <div key={i} className="flex gap-3 text-sm text-slate-500 dark:text-gray-500">
                                <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-500/70 shrink-0 mt-0.5" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tech Stack & Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/5">
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t: string, i: number) => (
                                <span key={i} className="px-3 py-1 text-xs font-mono rounded bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/20">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <Github className="w-4 h-4" /> Code
                                </a>
                            )}
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20">
                                    <ExternalLink className="w-4 h-4" /> Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Connector (Desktop) */}
            <div className="hidden md:flex flex-col items-center justify-center w-12 relative z-10">
                <div className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-950 border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:scale-150 transition-transform duration-300 relative z-20"></div>
                
                {/* Arrow Connector Line */}
                <div className={`absolute top-1/2 w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent ${isEven ? 'left-1/2' : 'right-1/2 rotate-180'} opacity-50 group-hover:opacity-100 transition-opacity`}>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rotate-45 transform translate-x-1"></div>
                </div>
            </div>

            {/* Spacer for opposite side */}
            <div className="flex-1 hidden md:block"></div>
        </div>
    );
};

export default App;