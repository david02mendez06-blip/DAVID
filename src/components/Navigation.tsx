import { motion } from 'motion/react';
import { Screen } from '../types';

interface NavProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export default function Navigation({ currentScreen, setScreen }: NavProps) {
  const items: { id: Screen; label: string }[] = [
    { id: 'home', label: 'Inicio' },
    { id: 'identity', label: 'Identidad' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-100 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-20 px-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === item.id ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            {currentScreen === item.id && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-px w-12 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
