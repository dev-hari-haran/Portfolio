import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className={`min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center snap-start scroll-mt-16 ${className}`}>
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 opacity-50"></div>
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 uppercase tracking-widest text-center shadow-cyan-500/20 drop-shadow-lg">
          {title}
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 opacity-50"></div>
      </div>
      {children}
    </section>
  );
};