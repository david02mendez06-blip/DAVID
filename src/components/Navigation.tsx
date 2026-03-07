import { motion } from 'motion/react';
import { Screen } from '../types';
import { Home, Info, Package, BookOpen, Mail, Sparkles, Bell } from 'lucide-react';
import { speak } from '../services/ttsService';

interface NavProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export default function Navigation({ currentScreen, setScreen }: NavProps) {
  const items: { id: Screen; label: string; icon: any }[] = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'identity', label: 'Identidad', icon: Info },
    { id: 'catalog', label: 'Catálogo', icon: Package },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'news', label: 'Novedades', icon: Bell },
    { id: 'chatbot', label: 'IA', icon: Sparkles },
    { id: 'contact', label: 'Contacto', icon: Mail },
  ];

  const handleNavClick = (item: { id: Screen; label: string }) => {
    setScreen(item.id);
    speak(item.label);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-white/10 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-20 px-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`flex flex-col items-center gap-1 transition-all relative px-1 ${
              currentScreen === item.id ? 'text-primary scale-110' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <item.icon size={20} strokeWidth={currentScreen === item.id ? 2.5 : 2} />
            <span className="text-[8px] font-bold uppercase tracking-tighter">{item.label}</span>
            {currentScreen === item.id && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-3 w-8 h-1 bg-primary rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
