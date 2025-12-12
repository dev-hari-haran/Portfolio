import React, { useState } from 'react';
import { RESUME_DATA } from '../constants';
import { Github, Linkedin, Mail, ArrowRight, Terminal, Instagram, Twitter } from 'lucide-react';
import { ChatWidget } from './ChatWidget';

interface HeroProps {
  id?: string;
}

export const Hero: React.FC<HeroProps> = ({ id }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div id={id} className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden snap-start transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 dark:bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20"></div>
                
                {/* Grid Lines for Spaceship feel */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)"></div>
            </div>

            <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center gap-12">
                
                {/* Left: Text Content */}
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
                        <span className="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-ping"></span>
                        System Online
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                        <span className="block text-xl md:text-2xl font-mono text-cyan-600 dark:text-cyan-400 mb-2 tracking-widest opacity-80">INITIATING SEQUENCE...</span>
                        Unleashing <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600 animate-gradient-x">
                            AI Potential
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                        Identity: <span className="text-slate-900 dark:text-white font-semibold">{RESUME_DATA.name}</span>. <br/>
                        Mission: Constructing intelligent multi-agent systems and immersive interfaces.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
                        <a href={`mailto:${RESUME_DATA.contact.email}`} className="group relative px-6 py-3 rounded-none skew-x-[-10deg] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all flex items-center gap-2 border-r-4 border-cyan-600">
                            <span className="skew-x-[10deg] flex items-center gap-2">
                                Contact Protocol <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                        <button 
                            onClick={() => setIsChatOpen(true)}
                            className="px-6 py-3 rounded-none skew-x-[-10deg] bg-white/50 dark:bg-slate-800/50 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 font-medium hover:bg-cyan-100 dark:hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center gap-2 backdrop-blur-sm lg:hidden"
                        >
                            <span className="skew-x-[10deg] flex items-center gap-2">
                                <Terminal className="w-4 h-4" />
                                Launch JARVIS
                            </span>
                        </button>

                        <div className="flex items-center gap-6 px-6 border-l border-slate-300 dark:border-white/10 ml-2">
                             <a href={`https://${RESUME_DATA.contact.github}`} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors transform hover:scale-110">
                                <Github className="w-6 h-6" />
                            </a>
                            <a href={`https://${RESUME_DATA.contact.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors transform hover:scale-110">
                                <Linkedin className="w-6 h-6" />
                            </a>
                             <a href={`https://${RESUME_DATA.contact.instagram}`} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors transform hover:scale-110">
                                <Instagram className="w-6 h-6" />
                            </a>
                             <a href={`https://${RESUME_DATA.contact.x}`} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors transform hover:scale-110">
                                <Twitter className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right: Interactive Chat Terminal (Desktop) or Visual (Mobile) */}
                <div className="flex-1 w-full max-w-md lg:max-w-xl relative">
                     {/* Decorative Elements behind terminal */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-30"></div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-3xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-purple-500/50 rounded-bl-3xl"></div>
                    
                    <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/3] w-full">
                        {/* On large screens, the widget is embedded directly in the hero */}
                        <div className="hidden lg:block w-full h-full relative z-10">
                            <ChatWidget isOpen={true} onClose={() => {}} embedded={true} />
                        </div>
                        {/* On small screens, show a preview card */}
                        <div className="lg:hidden w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 relative">
                                <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                                <Terminal className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Interactive Systems</h3>
                            <p className="text-slate-500 dark:text-gray-400">
                                Tap below to access JARVIS v2.0 for a complete briefing on my capabilities.
                            </p>
                            <button 
                                onClick={() => setIsChatOpen(true)}
                                className="mt-4 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-bold shadow-lg shadow-cyan-500/20"
                            >
                                Initialize Chat
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Chat Modal */}
            <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
};