import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-100">
      <div className="flex items-center gap-1">
        <img 
          src="https://jabelpack.com/wp-content/uploads/2022/01/logo-jabel-01-1.png" 
          alt="Jabel Pack Logo" 
          className="h-8 w-auto object-contain"
        />
      </div>
      <div className="flex items-center gap-3">
        <a 
          href="https://jabelpack.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          title="Visitar Sitio Web Oficial"
        >
          <span className="material-symbols-outlined">language</span>
        </a>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}
