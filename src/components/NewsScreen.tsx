import { motion } from 'motion/react';
import { Bell, Tag, Zap, Star, ArrowRight, Calendar, Info } from 'lucide-react';

export default function NewsScreen() {
  const news = [
    {
      id: 1,
      type: 'promo',
      title: '20% Descuento en Ribbon de Resina',
      desc: 'Aprovecha nuestra promoción mensual en consumibles de alta resistencia.',
      date: 'Válido hasta el 31 de Marzo',
      icon: Tag,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      btnColor: 'bg-emerald-500 shadow-emerald-500/20'
    },
    {
      id: 2,
      type: 'new',
      title: 'Nueva Tecnología de Impresión Flexográfica',
      desc: 'Hemos incorporado maquinaria de última generación para impresión en 10 colores con barniz UV.',
      date: 'Publicado hace 2 días',
      icon: Zap,
      color: 'bg-primary/10 text-primary border-primary/20',
      btnColor: 'bg-primary shadow-primary/20'
    },
    {
      id: 3,
      type: 'event',
      title: 'Webinar: Optimización de Etiquetado Industrial',
      desc: 'Únete a nuestros expertos para aprender a reducir costos en tu línea de producción.',
      date: '15 de Marzo, 10:00 AM',
      icon: Star,
      color: 'bg-secondary/10 text-secondary border-secondary/20',
      btnColor: 'bg-secondary shadow-secondary/20'
    }
  ];

  const promotions = [
    { label: 'Envío Gratis', value: 'En pedidos mayores a $5,000 MXN', icon: Zap },
    { label: 'Muestras Sin Costo', value: 'Solicita tu kit de materiales hoy mismo', icon: Star },
    { label: 'Soporte 24/7', value: 'Asistencia técnica prioritaria para clientes B2B', icon: Info },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="px-6 pt-8 bg-black min-h-screen"
    >
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="text-secondary" size={24} />
          <h2 className="text-3xl font-extrabold text-white">Novedades</h2>
        </div>
        <p className="text-slate-400">Mantente al día con las últimas noticias y ofertas exclusivas de Jabel Pack.</p>
      </div>

      {/* Featured News */}
      <div className="space-y-6">
        {news.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden p-6 rounded-[2rem] border ${item.color} shadow-2xl`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <item.icon size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-1">
                  <Calendar size={12} />
                  {item.date}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
              <button className={`w-full ${item.btnColor} text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all`}>
                <span>Saber más</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Promos */}
      <div className="mt-12">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6 px-2">Beneficios Exclusivos</h3>
        <div className="grid grid-cols-1 gap-4">
          {promotions.map((promo, idx) => (
            <div key={idx} className="flex items-center gap-4 p-5 bg-slate-900 rounded-2xl border border-white/5 shadow-sm">
              <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                <promo.icon size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{promo.label}</h4>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-0.5">{promo.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Shortcut */}
      <div className="mt-12 p-8 bg-gradient-to-br from-slate-900 to-black rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
        <div className="relative z-10">
          <h3 className="text-white text-xl font-extrabold mb-2">¿Quieres más ofertas?</h3>
          <p className="text-slate-400 text-xs mb-6">Únete a nuestra lista de difusión industrial.</p>
          <button className="bg-white text-black font-bold px-8 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">
            Unirme al Newsletter
          </button>
        </div>
      </div>
    </motion.div>
  );
}
