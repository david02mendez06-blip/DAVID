import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowRight, X, Share2, Bookmark } from 'lucide-react';

export default function BlogScreen() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPost, setSelectedPost] = useState<null | any>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const posts = [
    {
      id: 1,
      title: 'Ventajas de las etiquetas autoadheribles en la industria 4.0',
      excerpt: 'El uso de etiquetas autoadheribles te ayudará a diferenciarte de la competencia y a darle mayor presencia a tu marca en entornos altamente automatizados.',
      content: `Las etiquetas autoadheribles han revolucionado la forma en que los productos se identifican y rastrean en la cadena de suministro moderna. 
                \n\nEn la era de la Industria 4.0, la precisión y la velocidad son fundamentales. Nuestras etiquetas están diseñadas para soportar procesos de aplicación de alta velocidad, garantizando que cada producto lleve su identidad de forma clara y duradera.
                \n\nBeneficios clave:
                - Reducción de tiempos de inactividad.
                - Compatibilidad con sistemas de visión artificial.
                - Resistencia a condiciones extremas de almacenamiento.`,
      date: '14 Jan, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-2-1200px.jpg',
      category: 'Sabías que?',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Tipos de códigos de barras y su impacto en la logística global',
      excerpt: 'El código de barras es un código basado en la representación de un conjunto de líneas paralelas de distinto grosor que contienen información específica.',
      content: `Desde el clásico EAN-13 hasta los modernos códigos QR y DataMatrix, la simbología de códigos de barras es el lenguaje universal de la logística.
                \n\nEn Jabel Pack, asesoramos a nuestros clientes en la elección del código adecuado según su industria. Por ejemplo, en el sector farmacéutico, la trazabilidad es crítica, por lo que el uso de DataMatrix permite almacenar más información en espacios reducidos.
                \n\nFactores a considerar:
                - Densidad de información requerida.
                - Distancia de lectura del escáner.
                - Estándares internacionales de cumplimiento.`,
      date: '20 Feb, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/servicio-1200x801px.jpg',
      category: 'Tecnología',
      readTime: '8 min'
    },
    {
      id: 3,
      title: 'Sustentabilidad en el Packaging: El futuro es hoy',
      excerpt: 'Descubre cómo los materiales biodegradables están transformando la industria del empaque y reduciendo la huella de carbono.',
      content: `La demanda de soluciones de empaque ecológicas nunca ha sido tan alta. En Jabel Pack, estamos comprometidos con la innovación sustentable.
                \n\nEstamos desarrollando nuevas líneas de etiquetas fabricadas con fibras recicladas y adhesivos de base agua que facilitan el reciclaje de los envases. 
                \n\nNuestra meta es ayudar a las empresas a cumplir con sus objetivos ESG sin comprometer la calidad o la durabilidad de su identificación de producto.`,
      date: '05 Mar, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/alimentos.jpg',
      category: 'Sustentabilidad',
      readTime: '6 min'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="pb-32 px-6 pt-8 bg-black min-h-screen"
    >
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="text-primary" size={24} />
          <h2 className="text-3xl font-extrabold text-white">Blog Industrial</h2>
        </div>
        <p className="text-slate-400">Tendencias, tecnología y consejos expertos sobre empaque e identificación.</p>
      </div>

      {/* Featured Post */}
      <div className="space-y-10">
        {posts.map((post) => (
          <motion.article 
            key={post.id} 
            whileHover={{ y: -5 }}
            className="bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-6 left-6">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-primary px-4 py-2 rounded-full shadow-lg">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span>{post.readTime} de lectura</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="text-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Leer artículo completo
                  <ArrowRight size={16} />
                </button>
                <div className="flex gap-4 text-slate-500 items-center">
                  <button className="hover:text-white transition-colors"><Share2 size={18} /></button>
                  <button className="hover:text-white transition-colors"><Bookmark size={18} /></button>
                  <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-full transition-all active:scale-95">
                    <Share2 size={14} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Compartir</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Registration Form */}
      <section className="mt-16 bg-gradient-to-br from-slate-900 to-black rounded-[3rem] p-10 text-center text-white relative overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-extrabold mb-4">Únete a la Comunidad</h3>
          <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto">Recibe las últimas innovaciones en packaging directamente en tu bandeja de entrada.</p>
          
          {isSubscribed ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl text-green-400 text-sm font-bold"
            >
              ¡Suscripción exitosa! Bienvenido a bordo.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4 max-w-sm mx-auto">
              <input 
                type="email" 
                placeholder="tu@empresa.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
              />
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                Suscribirme ahora
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 top-20 bg-slate-900 rounded-t-[3rem] z-[101] overflow-hidden flex flex-col border-t border-white/10 shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{selectedPost.category}</span>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="size-10 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 pb-32">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-64 object-cover rounded-3xl mb-8 shadow-2xl"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="flex items-center gap-4 mb-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>{selectedPost.date}</span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <span>{selectedPost.readTime} de lectura</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-6 leading-tight">{selectedPost.title}</h2>
                <div className="text-slate-300 text-base leading-relaxed space-y-6 whitespace-pre-line">
                  {selectedPost.content}
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex gap-4 text-slate-500 items-center">
                    <button className="hover:text-white transition-colors"><Share2 size={18} /></button>
                    <button className="hover:text-white transition-colors"><Bookmark size={18} /></button>
                    <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-full transition-all active:scale-95">
                      <Share2 size={14} className="text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Compartir</span>
                    </button>
                  </div>
                </div>
                
                <div className="mt-12 p-8 bg-black/30 rounded-3xl border border-white/5">
                  <h4 className="text-white font-bold mb-4">¿Te interesó este tema?</h4>
                  <p className="text-slate-400 text-sm mb-6">Nuestros asesores técnicos pueden ayudarte a implementar estas soluciones en tu empresa.</p>
                  <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20">
                    Contactar a un experto
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
