import { Link } from 'react-router-dom';
import { Bus, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 mb-8">
              <div className="bg-brand-yellow p-2.5 rounded-xl flex items-center justify-center">
                <Bus className="text-brand-dark h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[1.4rem] tracking-tight text-white leading-[1.1]">
                  NZOKO
                </span>
                <span className="text-[10px] tracking-[0.25em] text-brand-yellow font-bold uppercase leading-none mt-0">Transport</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light mb-8 lg:pr-8">
              Inspirée par la force de l'éléphant, Nzoko Transport offre une expérience interurbaine où confort, sécurité et élégance priment. <br/><br/>Voyagez na kimia.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 p-2.5 rounded-full text-white hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300"><Facebook size={20} /></a>
              <a href="https://instagram.com/nzoko.transport" target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 p-2.5 rounded-full text-white hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300"><Instagram size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 p-2.5 rounded-full text-white hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Liens Rapides</h3>
            <ul className="space-y-3 font-light text-slate-400">
              <li><Link to="/about" className="hover:text-brand-yellow transition-colors">Notre Entreprise</Link></li>
              <li><Link to="/services" className="hover:text-brand-yellow transition-colors">Nos Services</Link></li>
              <li><Link to="/tracking" className="hover:text-brand-yellow transition-colors">Suivi de Colis</Link></li>
              <li><Link to="/contact" className="hover:text-brand-yellow transition-colors">Contact / Billetterie</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Services</h3>
            <ul className="space-y-3 font-light text-slate-400">
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Voyage Classique</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Voyage VIP</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Expédition de Colis</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Courrier Express</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Location de Bus</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4 font-light text-slate-400">
              <li className="flex items-start group">
                <MapPin className="text-brand-yellow mr-4 mt-1 shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <span>Siège: Rond-point du 31 Juillet<br/>Pointe-Noire, Congo</span>
              </li>
              <li className="flex items-center group">
                <Phone className="text-brand-yellow mr-4 shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <span>+242 06 167 1X XX</span>
              </li>
              <li className="flex items-center group">
                <Mail className="text-brand-yellow mr-4 shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <span>contact@nzokotransport.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-medium">
          <p className="font-light">&copy; {new Date().getFullYear()} Nzoko Transport. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-light">
            <Link to="/admin/login" className="hover:text-brand-yellow transition-colors tracking-widest uppercase text-xs">Espace Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
