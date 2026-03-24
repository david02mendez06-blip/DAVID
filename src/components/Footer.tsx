import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const socialMedia = [
    { name: 'Facebook', icon: Facebook, url: 'https://es-la.facebook.com/jabelpack/', color: 'hover:text-[#1877F2]' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/jabelpack_/', color: 'hover:text-[#E4405F]' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://mx.linkedin.com/company/jabel-pack', color: 'hover:text-[#0A66C2]' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/jabelpack', color: 'hover:text-[#1DA1F2]' },
  ];

  const contactInfo = [
    { icon: Mail, value: 'info@jabelpack.com', href: 'mailto:info@jabelpack.com' },
    { icon: Phone, value: '(55) 71 59 42 19', href: 'tel:+525571594219' },
    { icon: MapPin, value: 'Tultitlán, Edo. Méx.', href: 'https://www.google.com/maps/search/Calle+Aguacate+S%2FN,+Blvd.+Tultitl%C3%A1n+Pte.+L%C3%A1zaro+C%C3%A1rdenas' },
  ];

  return (
    <footer className="bg-slate-900/50 border-t border-white/5 pt-12 pb-40 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl">J</div>
              <span className="text-xl font-black text-white tracking-tighter">Jabel Pack</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              Soluciones integrales para el empaque e identificación de tu producto. Tecnología de punta y compromiso sustentable.
            </p>
            <div className="flex gap-4">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`size-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 transition-all ${social.color} hover:bg-white/10 hover:scale-110`}
                  title={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4">Contacto Directo</h4>
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group"
              >
                <div className="size-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                  <info.icon size={18} />
                </div>
                <span className="text-sm font-medium">{info.value}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            © 2026 Jabel Pack. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
