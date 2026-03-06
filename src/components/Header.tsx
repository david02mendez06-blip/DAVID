import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-black/80 backdrop-blur-md px-6 py-4 border-b border-white/10">
      <div className="flex items-center gap-1">
        <img 
          src="https://jabelpack.com/wp-content/uploads/2022/01/logo-jabel-01-1.png" 
          alt="Jabel Pack Logo" 
          className="h-8 w-auto object-contain brightness-0 invert"
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-3">
        <a 
          href="https://jabelpack.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
          title="Visitar Sitio Web Oficial"
        >
          Sitio Web
        </a>
        <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
          Menú
        </button>
      </div>
    </header>
  );
}
