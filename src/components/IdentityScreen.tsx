import { motion } from 'motion/react';

export default function IdentityScreen() {
  const values = [
    { icon: 'workspace_premium', title: 'Integridad', desc: 'Actuamos con transparencia y honestidad en cada eslabón de nuestra cadena de valor.' },
    { icon: 'leaderboard', title: 'Liderazgo', desc: 'Inspiramos el cambio a través de la proactividad y la excelencia técnica.' },
    { icon: 'handshake', title: 'Compromiso', desc: 'Dedicación total para alcanzar los objetivos estratégicos de nuestros clientes B2B.' },
    { icon: 'psychology', title: 'Innovación', desc: 'Búsqueda constante de nuevas tecnologías en etiquetado y logística.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-32"
    >
      {/* Hero Section */}
      <section className="px-6 py-10 bg-white">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-primary"></span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Nuestra Identidad</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 leading-[1.1]">Liderazgo en Sistemas de Etiquetado</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Ubicados estratégicamente en <span className="font-bold text-slate-900">Lázaro Cárdenas, México</span>, somos el aliado industrial que redefine la eficiencia en logística y empaque.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-6 space-y-6">
        <div className="relative overflow-hidden bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full"></div>
          <div className="relative z-10">
            <div className="size-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-3xl fill-icon">flag</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Misión</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Proveer soluciones integrales de etiquetado y logística que excedan las expectativas de nuestros clientes, impulsando la competitividad de sus marcas a través de innovación y excelencia operativa.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full"></div>
          <div className="relative z-10">
            <div className="size-14 bg-secondary rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-secondary/20">
              <span className="material-symbols-outlined text-3xl fill-icon">visibility</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Visión</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ser el referente nacional en sistemas de empaquetado y distribución, reconocidos por nuestra integridad tecnológica y compromiso con la transformación industrial de México.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-8 bg-slate-50">
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <h3 className="text-secondary font-bold text-xs tracking-wider uppercase">Cultura Corporativa</h3>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Nuestros Valores</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {values.map((v, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="flex-shrink-0 size-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">{v.icon}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">{v.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Presence */}
      <section className="px-4 py-10">
        <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-10 text-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              alt="Map background" 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/mexico-map/800/600?grayscale" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <div className="size-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-secondary/30">
              <span className="material-symbols-outlined text-secondary text-3xl">location_on</span>
            </div>
            <h3 className="text-white text-2xl font-extrabold mb-3">Presencia Estratégica</h3>
            <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto">
              Calle Aguacate S/N, Blvd. Tultitlán Pte. Lázaro Cárdenas, Tultitlán de Mariano Escobedo, Edo. Méx.
            </p>
            <a 
              href="https://www.google.com/maps/search/Calle+Aguacate+S%2FN,+Blvd.+Tultitl%C3%A1n+Pte.+L%C3%A1zaro+C%C3%A1rdenas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-extrabold py-4 px-8 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              VER UBICACIÓN <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
