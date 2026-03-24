import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowRight, X, Share2, Bookmark, Clock, Tag, User, MessageSquare, ExternalLink } from 'lucide-react';

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
                - Reducción de tiempos de inactividad en líneas de producción.
                - Compatibilidad total con sistemas de visión artificial y escaneo láser.
                - Resistencia superior a condiciones extremas de almacenamiento (humedad, frío, calor).
                \n\nEn Jabel Pack, entendemos que una etiqueta no es solo un papel pegado; es el punto de contacto digital entre su producto y el consumidor final.`,
      date: '14 Jan, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-2-1200px.jpg',
      category: 'Innovación',
      readTime: '5 min',
      author: 'Ing. Roberto Jabel',
      comments: 12
    },
    {
      id: 2,
      title: 'Tipos de códigos de barras y su impacto en la logística global',
      excerpt: 'El código de barras es un código basado en la representación de un conjunto de líneas paralelas de distinto grosor que contienen información específica.',
      content: `Desde el clásico EAN-13 hasta los modernos códigos QR y DataMatrix, la simbología de códigos de barras es el lenguaje universal de la logística.
                \n\nEn Jabel Pack, asesoramos a nuestros clientes en la elección del código adecuado según su industria. Por ejemplo, en el sector farmacéutico, la trazabilidad es crítica, por lo que el uso de DataMatrix permite almacenar más información en espacios reducidos, incluyendo números de lote y fechas de caducidad.
                \n\nFactores a considerar para una lectura perfecta:
                - Densidad de información requerida y espacio disponible.
                - Distancia de lectura del escáner y tipo de iluminación.
                - Estándares internacionales de cumplimiento (GS1).
                \n\nNuestras etiquetas garantizan un contraste óptimo para evitar errores de lectura que pueden costar miles de dólares en retrasos logísticos.`,
      date: '20 Feb, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/servicio-1200x801px.jpg',
      category: 'Tecnología',
      readTime: '8 min',
      author: 'Lic. Martha Gómez',
      comments: 8
    },
    {
      id: 3,
      title: 'Sustentabilidad en el Packaging: El futuro es hoy',
      excerpt: 'Descubre cómo los materiales biodegradables están transformando la industria del empaque y reduciendo la huella de carbono.',
      content: `La demanda de soluciones de empaque ecológicas nunca ha sido tan alta. En Jabel Pack, estamos comprometidos con la innovación sustentable.
                \n\nEstamos desarrollando nuevas líneas de etiquetas fabricadas con fibras recicladas post-consumo y adhesivos de base agua que facilitan el reciclaje de los envases de PET y vidrio. 
                \n\nNuestra meta es ayudar a las empresas a cumplir con sus objetivos ESG (Environmental, Social, and Governance) sin comprometer la calidad, la estética o la durabilidad de su identificación de producto. El empaque del futuro no solo protege el contenido, sino también el planeta.`,
      date: '05 Mar, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/alimentos.jpg',
      category: 'Sustentabilidad',
      readTime: '6 min',
      author: 'Ing. Carlos Ruiz',
      comments: 15
    },
    {
      id: 4,
      title: 'Flexografía vs. Impresión Digital: ¿Cuál elegir?',
      excerpt: 'Analizamos las diferencias clave entre los métodos de impresión más populares para etiquetas industriales y comerciales.',
      content: `Elegir el método de impresión adecuado puede optimizar significativamente sus costos de producción. La flexografía sigue siendo la reina para grandes volúmenes debido a su velocidad y bajo costo unitario.
                \n\nSin embargo, la impresión digital ha ganado terreno para tirajes cortos y personalizados, permitiendo cambios rápidos de diseño sin el costo de las placas.
                \n\nEn Jabel Pack contamos con tecnología híbrida que combina lo mejor de ambos mundos: la eficiencia de la flexografía con la versatilidad de lo digital. Analizamos cada proyecto para recomendar la opción más rentable para su negocio.`,
      date: '12 Apr, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/industrial.jpg',
      category: 'Producción',
      readTime: '7 min',
      author: 'Ing. Roberto Jabel',
      comments: 24
    },
    {
      id: 5,
      title: 'Etiquetado para el Sector Químico: Normativas GHS',
      excerpt: 'Cumplir con el Sistema Globalmente Armonizado no es opcional. Te explicamos cómo diseñar etiquetas seguras y legales.',
      content: `El etiquetado de productos químicos requiere materiales de alta resistencia que soporten derrames, abrasión y exposición a la intemperie. Además, deben cumplir estrictamente con la normativa GHS (Sistema Globalmente Armonizado).
                \n\nNuestras etiquetas para el sector químico están certificadas para mantener la legibilidad de los pictogramas de seguridad incluso en las condiciones más adversas. La seguridad industrial comienza con una etiqueta bien diseñada y fabricada con los materiales correctos.`,
      date: '28 May, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/automotriz.jpg',
      category: 'Seguridad',
      readTime: '9 min',
      author: 'Lic. Martha Gómez',
      comments: 10
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="px-6 pt-8 bg-black min-h-screen"
    >
      <div className="mb-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary/50"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Centro de Conocimiento</span>
          </div>
          <h2 className="text-4xl font-black text-white leading-tight">
            Insights & <span className="text-primary italic">Innovación</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Explora las últimas tendencias en etiquetado industrial, logística 4.0 y soluciones de empaque sustentable de Jabel Pack.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.article 
            key={post.id} 
            whileHover={{ y: -10 }}
            className="bg-slate-900/50 backdrop-blur-sm rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group flex flex-col h-full"
          >
            <div className="relative h-72 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-primary px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Tag size={12} />
                  {post.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> {post.readTime}</span>
                <span className="flex items-center gap-1.5"><MessageSquare size={12} className="text-primary" /> {post.comments}</span>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-3 mb-8 p-3 bg-white/5 rounded-2xl border border-white/5">
                <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <User size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Autor</span>
                  <span className="text-xs font-bold text-white">{post.author}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="text-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all group/btn"
                >
                  Leer más
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all active:scale-90">
                    <Bookmark size={16} />
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all active:scale-90">
                    <Share2 size={16} />
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
