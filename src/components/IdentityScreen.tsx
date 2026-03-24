import { motion } from 'motion/react';

export default function IdentityScreen() {
  const values = [
    { title: 'Integridad', desc: 'Actuamos con transparencia y honestidad en cada eslabón de nuestra cadena de valor.' },
    { title: 'Liderazgo', desc: 'Inspiramos el cambio a través de la proactividad y la excelencia técnica.' },
    { title: 'Compromiso', desc: 'Dedicación total para alcanzar los objetivos estratégicos de nuestros clientes B2B.' },
    { title: 'Innovación', desc: 'Búsqueda constante de nuevas tecnologías en etiquetado y logística.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className=""
    >
      {/* Hero Section */}
      <section className="px-6 py-12 bg-black text-white">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-primary"></span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Nuestra Identidad</span>
          </div>
          <h2 className="text-4xl font-extrabold leading-[1.1]">Somos una empresa 100% Mexicana</h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Integrada por un equipo joven que busca brindar las <span className="text-white font-bold">soluciones más eficaces</span> para ser un aliado estratégico en la línea de producción.
          </p>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://jabelpack.com/wp-content/uploads/2022/01/industrial.jpg" 
              alt="Producción Jabel Pack" 
              className="w-full h-48 object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-6 space-y-6 bg-black">
        <div className="relative overflow-hidden bg-slate-900 p-8 rounded-3xl border border-white/5 shadow-xl">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold text-white mb-3">Misión</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Proveer soluciones integrales de etiquetado y logística que excedan las expectativas de nuestros clientes, impulsando la competitividad de sus marcas a través de innovación y excelencia operativa.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-slate-900 p-8 rounded-3xl border border-white/5 shadow-xl">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold text-white mb-3">Visión</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ser el referente nacional en sistemas de empaquetado y distribución, reconocidos por nuestra integridad tecnológica y compromiso con la transformación industrial de México.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-12 bg-black">
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <h3 className="text-secondary font-bold text-xs tracking-wider uppercase">Cultura Corporativa</h3>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Nuestros Valores</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {values.map((v, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-slate-900 rounded-2xl shadow-sm border border-white/5">
              <div>
                <h4 className="text-lg font-bold text-white">{v.title}</h4>
                <p className="text-sm text-slate-400 mt-1">{v.desc}</p>
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
              src="https://jabelpack.com/wp-content/uploads/2022/01/industrial.jpg" 
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-white text-2xl font-extrabold mb-3">Presencia Estratégica</h3>
            <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto">
              Calle Aguacate S/N, Blvd. Tultitlán Pte. Lázaro Cárdenas, Tultitlán de Mariano Escobedo, Edo. Méx.
            </p>
            <a 
              href="https://www.google.com/maps/search/Calle+Aguacate+S%2FN,+Blvd.+Tultitl%C3%A1n+Pte.+L%C3%A1zaro+C%C3%A1rdenas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-extrabold py-4 px-8 rounded-2xl text-sm transition-colors flex items-center justify-center"
            >
              VER UBICACIÓN
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
