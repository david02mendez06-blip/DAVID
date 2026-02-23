import { motion } from 'motion/react';
import React, { useState } from 'react';

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const socialMedia = [
    { name: 'Facebook', icon: 'https://cdn.simpleicons.org/facebook/1877F2', url: 'https://es-la.facebook.com/jabelpack/', color: 'hover:border-[#1877F2]' },
    { name: 'Instagram', icon: 'https://cdn.simpleicons.org/instagram/E4405F', url: 'https://www.instagram.com/jabelpack_/', color: 'hover:border-[#E4405F]' },
    { name: 'LinkedIn', icon: 'https://cdn.simpleicons.org/linkedin/0A66C2', url: 'https://mx.linkedin.com/company/jabel-pack', color: 'hover:border-[#0A66C2]' },
    { name: 'Twitter', icon: 'https://cdn.simpleicons.org/twitter/1DA1F2', url: 'https://twitter.com/jabelpack', color: 'hover:border-[#1DA1F2]' },
  ];

  const contactInfo = [
    { label: 'Correo Electrónico', value: 'info@jabelpack.com', href: 'mailto:info@jabelpack.com' },
    { label: 'Teléfono Principal', value: '(55) 71 59 42 19', href: 'tel:+525571594219' },
    { label: 'Teléfono Secundario', value: '(55) 71 59 42 58', href: 'tel:+525571594258' },
    { label: 'Dirección', value: 'Calle Aguacate S/N, Blvd. Tultitlán Pte. Lázaro Cárdenas, Tultitlán de Mariano Escobedo, Edo. Méx. C.P. 54901', href: 'https://www.google.com/maps/search/Calle+Aguacate+S%2FN,+Blvd.+Tultitl%C3%A1n+Pte.+L%C3%A1zaro+C%C3%A1rdenas' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-32 px-6 pt-8"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Contacto</h2>
        <p className="text-slate-500">¿Tienes dudas o necesitas una cotización? Estamos para ayudarte.</p>
      </div>

      {/* Official Website Button */}
      <div className="mb-8">
        <a 
          href="https://jabelpack.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all"
        >
          <span>Visitar Sitio Web Oficial</span>
        </a>
      </div>

      <div className="space-y-6">
        {contactInfo.map((info, i) => (
          <a
            key={i}
            href={info.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-primary transition-colors"
          >
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{info.label}</p>
              <p className="text-sm font-bold text-slate-900 leading-relaxed">{info.value}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <section className="mt-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Envíanos un mensaje</h3>
        
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-100 p-6 rounded-2xl text-center"
          >
            <h4 className="text-green-800 font-bold mb-2">¡Mensaje Enviado!</h4>
            <p className="text-green-600 text-sm">Nos pondremos en contacto contigo a la brevedad.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@ejemplo.com"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Ej. Cotización de etiquetas"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Mensaje</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
            >
              <span>Enviar Mensaje</span>
            </button>
          </form>
        )}
      </section>

      <div className="mt-12">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">Síguenos en Redes Sociales</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {socialMedia.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 bg-white border border-slate-100 rounded-xl flex items-center justify-center transition-all shadow-sm text-[10px] font-bold uppercase tracking-widest text-slate-600 ${social.color}`}
              title={social.name}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>

      <section className="mt-12 bg-slate-50 rounded-3xl p-8 border border-slate-100">
        <h3 className="text-xl font-extrabold text-slate-900 mb-4 text-center">Encuéntranos</h3>
        <div className="aspect-video w-full rounded-2xl overflow-hidden grayscale opacity-80 border border-slate-200">
          <img 
            src="https://jabelpack.com/wp-content/uploads/2022/01/industrial.jpg" 
            alt="Ubicación Jabel Pack" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
          Horario de atención: Lunes a Viernes 9:00 AM - 6:00 PM
        </p>
      </section>
    </motion.div>
  );
}
