import { motion } from 'motion/react';
import React, { useState } from 'react';

export default function BlogScreen() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

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
      title: 'Ventajas de las etiquetas autoadheribles',
      excerpt: 'El uso de etiquetas autoadheribles te ayudará a diferenciarte de la competencia y a darle mayor presencia a tu marca.',
      date: '14 Jan, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-2-1200px.jpg',
      category: 'Sabías que?'
    },
    {
      id: 2,
      title: 'Tipos de códigos de barras',
      excerpt: 'El código de barras es un código basado en la representación de un conjunto de líneas paralelas de distinto grosor.',
      date: '14 Jan, 2022',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/servicio-1200x801px.jpg',
      category: 'Sabías que?'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="pb-32 px-4 pt-6 bg-black min-h-screen"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-2">Blog Jabel Pack</h2>
        <p className="text-slate-400">Noticias, tendencias y consejos sobre empaque e identificación industrial.</p>
      </div>

      {/* Featured Post */}
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-slate-900 rounded-3xl overflow-hidden border border-white/5 shadow-xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-48 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <a 
                  href="#" 
                  className="text-primary text-sm font-bold flex items-center hover:underline"
                >
                  Leer artículo completo
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Registration Form */}
      <section className="mt-12 bg-slate-900 rounded-3xl p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-extrabold mb-3">Suscríbete a nuestro Newsletter</h3>
          <p className="text-slate-400 text-sm mb-6">Recibe las últimas actualizaciones y ofertas exclusivas directamente en tu correo.</p>
          
          {isSubscribed ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/20 border border-green-500/30 p-4 rounded-xl text-green-400 text-sm font-bold"
            >
              ¡Gracias por suscribirte! Pronto recibirás nuestras noticias.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email" 
                placeholder="tu@correo.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
              >
                Registrarme ahora
              </button>
            </form>
          )}
          
          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="https://jabelpack.com" className="text-[10px] text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Sitio Oficial</a>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <a href="#" className="text-[10px] text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Aviso de Privacidad</a>
          </div>
        </div>
      </section>

      {/* Call to Action Buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <button className="bg-slate-900 border border-white/5 p-4 rounded-2xl flex flex-col items-center hover:border-primary transition-colors group">
          <span className="text-xs font-bold text-slate-300">Descargar Media Kit</span>
        </button>
        <button className="bg-slate-900 border border-white/5 p-4 rounded-2xl flex flex-col items-center hover:border-secondary transition-colors group">
          <span className="text-xs font-bold text-slate-300">Soporte Técnico</span>
        </button>
      </div>
    </motion.div>
  );
}
