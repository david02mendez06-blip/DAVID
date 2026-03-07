import { motion, AnimatePresence } from 'motion/react';
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
    // Add a tiny delay to make it feel more natural after the click
    setTimeout(() => speak(item.label), 100);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-white/10 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-20 px-2">
        {items.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item)}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 transition-all relative px-1 ${
                currentScreen === item.id ? 'text-primary' : 'text-slate-500 hover:text-slate-300 opacity-70 hover:opacity-100'
              }`}
            >
            <motion.div
              animate={currentScreen === item.id ? { scale: [1, 1.25, 1.1] } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <item.icon size={20} strokeWidth={currentScreen === item.id ? 2.5 : 2} />
            </motion.div>
            <motion.span 
              animate={currentScreen === item.id ? { y: -1 } : { y: 0 }}
              className="text-[8px] font-bold uppercase tracking-tighter"
            >
              {item.label}
            </motion.span>
            {currentScreen === item.id && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-3 w-8 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(242,125,38,0.6)]"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ 
                  layout: { type: "spring", stiffness: 400, damping: 25 },
                  opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
              />
            )}
            <AnimatePresence>
              {currentScreen === item.id && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                />
              )}
            </AnimatePresence>
            </motion.button>
        ))}
      </div>
    </nav>
  );
}
