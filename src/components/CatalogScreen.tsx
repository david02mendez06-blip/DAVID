import { motion } from 'motion/react';
import { useState } from 'react';

export default function CatalogScreen() {
  const [filter, setFilter] = useState('Todas');
  const filters = ['Todas', 'Automotriz', 'Alimentos', 'Cuidado Personal', 'Farma'];

  const products = [
    {
      id: '1',
      title: 'Etiqueta Impresa',
      desc: 'Soluciones personalizadas con impresión de alta calidad para destacar tu marca en el anaquel.',
      image: 'https://picsum.photos/seed/label-printed/800/600',
      tag: 'Más Vendido',
      features: ['Hasta 10 colores', 'Barniz UV']
    },
    {
      id: '2',
      title: 'Empaques Impresos',
      desc: 'Flexibilidad y resistencia en empaques que protegen y promocionan tu producto eficazmente.',
      image: 'https://picsum.photos/seed/packaging/800/600',
      tag: 'Industrial',
      features: ['Materiales Flexibles', 'Alta Resistencia']
    },
    {
      id: '3',
      title: 'Etiqueta Blanca',
      desc: 'Ideal para impresión térmica directa o transferencia térmica en líneas de producción.',
      image: 'https://picsum.photos/seed/white-label/800/600',
      tag: 'Logística',
      features: ['Papel Térmico', 'Transferencia']
    },
    {
      id: '4',
      title: 'Ribbon y Consumibles',
      desc: 'Cintas de transferencia térmica de cera, resina y mixtas para una impresión duradera.',
      image: 'https://picsum.photos/seed/ribbon/800/600',
      tag: 'Insumos',
      features: ['Cera', 'Resina', 'Mixto']
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-32"
    >
      <section className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-[2px] bg-primary"></span>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Tecnología Flexográfica</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-3">Catálogo de Soluciones</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Visualice nuestra gama de acabados técnicos y materiales de alta calidad, optimizados para impresión en 10 colores.
        </p>
      </section>

      {/* Filters */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Filtrar por Industria</h3>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <section className="px-5 py-2 grid grid-cols-1 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                alt={p.title} 
                className="w-full h-full object-cover" 
                src={p.image} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase">
                  {p.tag}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-extrabold text-slate-900">{p.title}</h4>
              </div>
              <p className="text-slate-500 text-xs mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.features.map((f, i) => (
                  <span key={i} className="text-[9px] font-bold py-1 px-2 bg-secondary/10 text-secondary rounded uppercase">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <div className="sticky bottom-24 px-5 z-40">
        <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center active:scale-[0.98] transition-transform">
          <span>Solicitar Muestrario Físico</span>
        </button>
      </div>

      <footer className="px-5 py-12 text-center">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Jabel Pack B2B Tools</p>
        <p className="text-xs text-slate-500 max-w-[280px] mx-auto">Tecnología de impresión flexográfica de última generación para soluciones de etiquetado global.</p>
      </footer>
    </motion.div>
  );
}
