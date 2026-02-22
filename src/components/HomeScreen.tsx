import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

export default function HomeScreen() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedService, setSelectedService] = useState<null | {
    title: string;
    desc: string;
    details: string[];
    icon: string;
    color: string;
  }>(null);

  const heroSlides = [
    {
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/servicio-1200x801px.jpg',
      tag1: '100% Mexicana',
      tag2: '¡Nos gusta hacerlo divertido!',
      title: 'Soluciones para el empaque e identificación de tu producto',
      desc: 'Te ayudamos a encontrar la solución perfecta con una gran variedad de aplicaciones y materiales.'
    },
    {
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-2-1200px.jpg',
      tag1: 'Tecnología',
      tag2: 'Innovación Constante',
      title: 'Equipos de impresión de última generación',
      desc: 'Contamos con la mejor tecnología para garantizar la calidad y durabilidad de tus etiquetas.'
    },
    {
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/industrial.jpg',
      tag1: 'Logística',
      tag2: 'Entrega Puntual',
      title: 'Tu aliado estratégico en la cadena de suministro',
      desc: 'Optimizamos tus procesos de identificación para una logística más eficiente y sin errores.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const services = [
    { 
      icon: 'design_services', 
      title: 'Diseño y Preprensa', 
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/servicio-1200x801px.jpg',
      desc: 'Contamos con materiales para que tu producto destaque sin dejar a un lado la función.',
      details: [
        'Asesoría en selección de materiales según el entorno.',
        'Optimización de archivos para impresión industrial.',
        'Pruebas de color y acabados especiales.',
        'Diseño estructural de empaques.'
      ],
      color: 'border-primary',
      bg: 'bg-primary/10',
      text: 'text-primary'
    },
    { 
      icon: 'build', 
      title: 'Servicio Técnico', 
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-3-1200px.jpg',
      desc: 'Mantenimiento preventivo para impresoras y asesoría técnica especializada.',
      details: [
        'Mantenimiento preventivo y correctivo.',
        'Calibración de cabezales de impresión.',
        'Configuración de software de etiquetado.',
        'Capacitación para operadores.'
      ],
      color: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary'
    },
    { 
      icon: 'shopping_cart', 
      title: 'Venta de Insumos', 
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-2-1200px.jpg',
      desc: 'Gran variedad de aplicaciones y materiales para etiquetado y embalaje.',
      details: [
        'Etiquetas blancas y de transferencia térmica.',
        'Ribbons de cera, resina y mixtos.',
        'Tintas y consumibles certificados.',
        'Material POP y empaques flexibles.'
      ],
      color: 'border-brand-black',
      bg: 'bg-brand-black/10',
      text: 'text-brand-black'
    },
  ];

  const sectors = [
    { icon: 'restaurant', label: 'Alimentos', image: 'https://jabelpack.com/wp-content/uploads/2022/01/alimentos.jpg' },
    { icon: 'home', label: 'Hogar', image: 'https://jabelpack.com/wp-content/uploads/2022/01/gato-hogar-2.jpg' },
    { icon: 'face', label: 'Cuidado Personal', image: 'https://jabelpack.com/wp-content/uploads/2022/01/personal.png' },
    { icon: 'medication', label: 'Farmacéutico', image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-3-1200px.jpg' },
    { icon: 'directions_car', label: 'Automotriz', image: 'https://jabelpack.com/wp-content/uploads/2022/01/automotriz.jpg' },
    { icon: 'factory', label: 'Industrial', image: 'https://jabelpack.com/wp-content/uploads/2022/01/industrial.jpg' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32"
    >
      {/* Hero Section Carousel */}
      <section className="relative group">
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
              <img 
                alt={heroSlides[currentSlide].title} 
                className="absolute inset-0 w-full h-full object-cover" 
                src={heroSlides[currentSlide].image} 
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 pb-12 gap-5">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex gap-2">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.1em] rounded-sm">
                      {heroSlides[currentSlide].tag1}
                    </span>
                    <span className="inline-block px-3 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-[0.1em] rounded-sm">
                      {heroSlides[currentSlide].tag2}
                    </span>
                  </div>
                  <h2 className="text-4xl font-extrabold text-white leading-[1.05] tracking-tight">
                    {heroSlides[currentSlide].title}
                  </h2>
                  <p className="text-slate-200 text-base font-medium max-w-[95%] leading-relaxed">
                    {heroSlides[currentSlide].desc}
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-3 pt-2"
                >
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all uppercase tracking-wider">
                    Cotiza con nosotros
                  </button>
                  <button className="w-full bg-white/10 backdrop-blur-md text-white font-bold py-4 rounded-lg text-sm flex items-center justify-center gap-2 border border-white/30 transition-all uppercase tracking-wider">
                    <span className="material-symbols-outlined text-lg">inventory_2</span>
                    Conoce nuestros productos
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 z-30 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevSlide}
              className="size-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
              onClick={nextSlide}
              className="size-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 px-4 -mt-6 relative z-30">
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100 text-center">
          <p className="text-secondary font-extrabold text-xl leading-none">B2B</p>
          <p className="text-[9px] mt-1 text-slate-500 font-bold uppercase tracking-wider">Aliado Estratégico</p>
        </div>
        <div className="bg-primary p-4 rounded-xl shadow-xl border border-primary/10 text-center">
          <p className="text-white font-extrabold text-xl leading-none">100%</p>
          <p className="text-[9px] mt-1 text-white/80 font-bold uppercase tracking-wider">Eficacia</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100 text-center">
          <p className="text-secondary font-extrabold text-xl leading-none">MX</p>
          <p className="text-[9px] mt-1 text-slate-500 font-bold uppercase tracking-wider">Empresa Local</p>
        </div>
      </div>

      {/* Sectors */}
      <section className="py-12 bg-slate-50 overflow-hidden">
        <div className="px-4 mb-8 flex items-end justify-between">
          <div>
            <h3 className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-1">Brindamos soluciones</h3>
            <h2 className="text-2xl font-extrabold text-brand-black">Diferentes Sectores</h2>
            <div className="w-10 h-1 bg-secondary mt-2 rounded-full"></div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="size-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="size-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-4 px-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        >
          {sectors.map((s, i) => (
            <div key={i} className="flex-none w-[75vw] sm:w-64 relative aspect-[3/4] rounded-3xl overflow-hidden snap-center group shadow-lg">
              <img 
                src={s.image} 
                alt={s.label} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="material-symbols-outlined text-white text-3xl mb-2">{s.icon}</span>
                <span className="text-lg font-extrabold text-white">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-12 bg-white">
        <div className="mb-8">
          <h3 className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-1">Nuestros Servicios</h3>
          <h2 className="text-2xl font-extrabold text-brand-black">Aliado en Producción</h2>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {services.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedService(s)}
              className={`group relative flex flex-col text-left bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all shadow-md active:scale-[0.98]`}
            >
              <div className="w-full h-48 overflow-hidden relative">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-4 left-4 size-12 ${s.bg} backdrop-blur-md rounded-xl flex items-center justify-center ${s.text} border border-white/20`}>
                  <span className="material-symbols-outlined text-2xl font-bold">{s.icon}</span>
                </div>
              </div>
              <div className={`p-6 border-l-8 ${s.color}`}>
                <h4 className="text-xl font-extrabold text-brand-black mb-2">{s.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{s.desc}</p>
                <div className={`flex items-center ${s.text} text-xs font-bold uppercase tracking-wider gap-1`}>
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Sustainability */}
      <section className="px-4 py-12 bg-white">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
          <div className="size-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-green-600 text-3xl">eco</span>
          </div>
          <h2 className="text-2xl font-extrabold text-brand-black mb-3">Compromiso Sustentable</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Desarrollamos soluciones de etiquetado con materiales biodegradables y procesos de baja huella de carbono.
          </p>
          <button className="bg-brand-black text-white px-8 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary transition-colors">
            Ver Reporte ESG
          </button>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[101] p-8 pb-12 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`size-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 border-l-4 ${selectedService.color}`}>
                  <span className="material-symbols-outlined text-3xl">{selectedService.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{selectedService.title}</h3>
                  <p className="text-slate-500 text-sm">Información Detallada</p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8">
                {selectedService.desc} En Jabel Pack nos comprometemos a brindar soluciones integrales que optimicen sus procesos de producción.
              </p>

              <div className="space-y-4 mb-10">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">¿Qué incluye este servicio?</h4>
                {selectedService.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-sm font-medium text-slate-700">{detail}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setSelectedService(null)}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
              >
                Entendido
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
