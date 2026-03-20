import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Settings2, Info, ArrowRight, Download, MessageSquare, Sparkles, Package } from 'lucide-react';
import { Screen } from '../types';

interface CatalogScreenProps {
  setScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({ setScreen }) => {
  const [filter, setFilter] = useState('Todas');
  const [selectedProduct, setSelectedProduct] = useState<null | any>(null);
  const filters = ['Todas', 'Automotriz', 'Alimentos', 'Cuidado Personal', 'Farma'];

  const products = [
    {
      id: '1',
      title: 'Etiqueta Impresa',
      desc: 'Soluciones personalizadas con impresión de alta calidad para destacar tu marca en el anaquel.',
      longDesc: 'Nuestras etiquetas impresas utilizan tecnología flexográfica de vanguardia, permitiendo hasta 10 colores simultáneos con registros perfectos. Ideales para productos de consumo masivo que requieren un impacto visual superior.',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-2-1200px.jpg',
      tag: 'Más Vendido',
      features: ['Hasta 10 colores', 'Barniz UV', 'Cold Foil', 'Laminado Mate/Brillo'],
      customization: ['Troquelado personalizado', 'Tintas directas Pantone', 'Materiales metalizados', 'Adhesivos especiales'],
      specs: {
        material: 'BOPP, Papel Couche, Térmico',
        acabado: 'Barniz UV Total o a Registro',
        entrega: 'Rollos o Hojas',
        nucleo: '1", 1.5", 3"'
      }
    },
    {
      id: '2',
      title: 'Empaques Impresos',
      desc: 'Flexibilidad y resistencia en empaques que protegen y promocionan tu producto eficazmente.',
      longDesc: 'Desarrollamos empaques flexibles de alta barrera diseñados para proteger la integridad de su producto mientras maximizan el espacio publicitario. Cumplimos con los más altos estándares de seguridad alimentaria e industrial.',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/industrial.jpg',
      tag: 'Industrial',
      features: ['Materiales Flexibles', 'Alta Resistencia', 'Barrera de Oxígeno', 'Sellado Térmico'],
      customization: ['Estructuras laminadas', 'Microperforado', 'Fuelles laterales', 'Zippers resellables'],
      specs: {
        material: 'PET, PE, Aluminio, Nylon',
        impresion: 'Flexografía HD',
        resistencia: 'Alta punción y rasgado',
        aplicacion: 'Manual o Automática'
      }
    },
    {
      id: '3',
      title: 'Etiqueta Blanca',
      desc: 'Ideal para impresión térmica directa o transferencia térmica en líneas de producción.',
      longDesc: 'Etiquetas neutras fabricadas con precisión milimétrica para garantizar el flujo continuo en sus impresoras Zebra, Honeywell o Sato. Disponibles en una amplia gama de adhesivos para superficies difíciles.',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-3-1200px.jpg',
      tag: 'Logística',
      features: ['Papel Térmico', 'Transferencia', 'Adhesivo Permanente', 'Removible'],
      customization: ['Medidas especiales', 'Pre-impresión de logos', 'Perforado entre etiquetas', 'Black mark'],
      specs: {
        tecnologia: 'Térmico Directo / Ribbon',
        adhesivo: 'Acrílico o Hot-melt',
        compatibilidad: 'Todas las marcas OEM',
        presentacion: 'Rollos industriales'
      }
    },
    {
      id: '4',
      title: 'Ribbon y Consumibles',
      desc: 'Cintas de transferencia térmica de cera, resina y mixtas para una impresión duradera.',
      longDesc: 'Suministramos consumibles certificados que prolongan la vida útil de sus cabezales de impresión. Nuestros ribbons ofrecen la máxima definición para códigos de barras y textos pequeños en diversos sustratos.',
      image: 'https://jabelpack.com/wp-content/uploads/2022/01/etiqueta-blanca-2-1200px.jpg',
      tag: 'Insumos',
      features: ['Cera', 'Resina', 'Mixto', 'Colores Especiales'],
      customization: ['Anchos a medida', 'Largos de hasta 450m', 'Entintado interno/externo', 'Mandriles de cartón'],
      specs: {
        resistencia: 'Química y Fricción',
        calidad: 'Grado Premium',
        certificacion: 'ISO 9001',
        uso: 'Identificación de Activos'
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-32 bg-black min-h-screen"
    >
      <section className="px-6 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-[2px] bg-primary"></div>
          <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Portafolio Industrial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">Catálogo de Soluciones</h2>
        <p className="text-slate-400 text-base leading-relaxed max-w-md">
          Explora nuestra gama de acabados técnicos y materiales de alta ingeniería, diseñados para la máxima eficiencia operativa.
        </p>
      </section>

      {/* Filters */}
      <div className="px-6 py-4 sticky top-0 bg-black/80 backdrop-blur-md z-30 border-b border-white/5">
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${
                filter === f
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-105'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <section className="px-6 py-8 grid grid-cols-1 gap-8">
        {products.map((p) => (
          <motion.div 
            key={p.id} 
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedProduct(p)}
            className="group bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl cursor-pointer hover:border-primary/30 transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <motion.img 
                alt={p.title} 
                className="w-full h-full object-cover" 
                src={p.image} 
                whileHover={{ scale: 1.05, opacity: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 pointer-events-none"></div>
              <div className="absolute top-6 left-6">
                <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/20 uppercase tracking-widest shadow-lg">
                  {p.tag}
                </span>
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="size-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
            <div className="p-8">
              <h4 className="text-2xl font-extrabold text-white mb-3 group-hover:text-primary transition-colors">{p.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.features.slice(0, 3).map((f, i) => (
                  <span key={i} className="text-[9px] font-bold py-1.5 px-3 bg-white/5 text-slate-300 rounded-lg border border-white/5 uppercase tracking-wider">
                    {f}
                  </span>
                ))}
                {p.features.length > 3 && (
                  <span className="text-[9px] font-bold py-1.5 px-3 bg-primary/10 text-primary rounded-lg border border-primary/20 uppercase tracking-wider">
                    +{p.features.length - 3} más
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 top-12 bg-slate-900 rounded-t-[3rem] z-[101] overflow-hidden flex flex-col border-t border-white/10"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/30 uppercase tracking-widest">
                    {selectedProduct.tag}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="size-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors border border-white/10"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 pb-32">
                <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden mb-10 shadow-2xl">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">{selectedProduct.title}</h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  {selectedProduct.longDesc}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-10 mb-12">
                  {/* Characteristics */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle2 className="text-primary" size={20} />
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm">Características Técnicas</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProduct.features.map((f: string, i: number) => (
                        <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-3">
                          <div className="size-2 bg-primary rounded-full"></div>
                          <span className="text-slate-300 text-sm font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customization */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Settings2 className="text-secondary" size={20} />
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm">Opciones de Personalización</h4>
                    </div>
                    <div className="space-y-3">
                      {selectedProduct.customization.map((c: string, i: number) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-slate-800/50 rounded-2xl border border-white/5">
                          <span className="text-slate-300 text-sm">{c}</span>
                          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Disponible</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specs Table */}
                  <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5">
                    <div className="flex items-center gap-2 mb-8">
                      <Info className="text-slate-400" size={20} />
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm">Especificaciones de Fabricación</h4>
                    </div>
                    <div className="space-y-6">
                      {Object.entries(selectedProduct.specs).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                          <span className="text-slate-500 text-sm capitalize">{key}</span>
                          <span className="text-white text-sm font-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-4">
                  <button className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                    <MessageSquare size={20} />
                    <span>Solicitar Cotización B2B</span>
                  </button>
                  <button className="w-full bg-white/5 text-white font-bold py-5 rounded-2xl border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                    <Download size={20} />
                    <span>Descargar Ficha Técnica (PDF)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <div className="sticky bottom-24 px-6 z-40">
        <button className="w-full bg-white text-black font-extrabold py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform">
          <ArrowRight size={20} />
          <span>Solicitar Muestrario Físico</span>
        </button>
      </div>

      <footer className="px-6 py-16 text-center">
        <div className="size-12 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
          <Package className="text-primary" size={24} />
        </div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mb-4">Jabel Pack B2B Solutions</p>
        <p className="text-sm text-slate-500 max-w-[280px] mx-auto leading-relaxed mb-4">
          Tecnología de impresión flexográfica de última generación para soluciones de etiquetado global.
        </p>
        <p className="text-primary font-bold italic text-xs uppercase tracking-widest">¡Nos gusta hacerlo divertido!</p>
      </footer>

      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setScreen('chatbot')}
        className="fixed bottom-28 right-6 size-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center z-50 border-2 border-white/20"
      >
        <MessageSquare size={24} />
      </motion.button>
    </motion.div>
  );
}
