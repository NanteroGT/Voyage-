import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, MessageCircle, RotateCcw } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import NzokoElephantLogo from '../common/NzokoElephantLogo';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-brand-dark text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & About */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 mb-4">
              <NzokoElephantLogo size={42} withText textColor="white" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light mb-6 lg:pr-6">
              Inspirée par la force et la noblesse de l'éléphant, Nzoko Transport redéfinit le voyage interurbain au Congo. Confort absolu, ponctualité et sécurité sans compromis.
              <br />
              <br />
              <span className="text-brand-yellow italic">« Voyagez na kimia, bozali na Nzoko. »</span>
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 border border-white/10 p-2.5 rounded-full text-white hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/nzoko.transport"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 border border-white/10 p-2.5 rounded-full text-white hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 border border-white/10 p-2.5 rounded-full text-white hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-wider text-brand-yellow">
              Liens Rapides
            </h3>
            <ul className="space-y-3 font-light text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-brand-yellow transition-colors">
                  Notre Histoire & Vision
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-yellow transition-colors">
                  Prestations & Tarifs
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="hover:text-brand-yellow transition-colors">
                  Suivi de Colis & Fret
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-brand-yellow transition-colors">
                  Réservation Billetterie
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-yellow transition-colors">
                  Nos Agences & Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-wider text-brand-yellow">
              Nos Lignes
            </h3>
            <ul className="space-y-3 font-light text-sm text-slate-400">
              <li>Voyage Standard Climatisé</li>
              <li>Liaison VIP Brazza ⇄ Pointe-Noire</li>
              <li>Ligne Directe Oyo ⇄ Brazzaville</li>
              <li>Fret & Colis Express Sécurisé</li>
              <li>Privatisation de Bus sur mesure</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-wider text-brand-yellow">
              Contact Direct
            </h3>
            <ul className="space-y-4 font-light text-sm text-slate-400">
              <li className="flex items-start group">
                <MapPin
                  className="text-brand-yellow mr-3.5 mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                  size={18}
                />
                <span>
                  Rond-point du 31 Juillet
                  <br />
                  Pointe-Noire, République du Congo
                </span>
              </li>
              <li className="flex items-center group">
                <Phone
                  className="text-brand-yellow mr-3.5 shrink-0 group-hover:scale-110 transition-transform"
                  size={18}
                />
                <div>
                  <span className="text-[10px] text-brand-yellow uppercase tracking-wider block font-bold leading-none mb-1">
                    Numéro Unique
                  </span>
                  <a href="tel:061671717" className="hover:text-white transition-colors font-bold text-white">
                    {settings?.phone || '06 167 17 17'}
                  </a>
                </div>
              </li>
              <li className="flex items-center group">
                <MessageCircle
                  className="text-emerald-400 mr-3.5 shrink-0 group-hover:scale-110 transition-transform"
                  size={18}
                />
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-bold leading-none mb-1">
                    WhatsApp Assistance
                  </span>
                  <a
                    href="https://wa.me/242061671717"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 text-white font-bold transition-colors"
                  >
                    {settings?.whatsapp || '+242 06 167 17 17'}
                  </a>
                </div>
              </li>
              <li className="flex items-center group">
                <Mail
                  className="text-brand-yellow mr-3.5 shrink-0 group-hover:scale-110 transition-transform"
                  size={18}
                />
                <a
                  href="mailto:contact@nzokotransport.com"
                  className="hover:text-white transition-colors truncate"
                >
                  contact@nzokotransport.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium space-y-3 md:space-y-0">
          <p className="font-light">
            &copy; {new Date().getFullYear()} {settings?.name || 'Nzoko Transport'}. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-6 font-light">
            <span className="text-slate-400 hidden sm:inline">« Na kimia, bozali na Nzoko »</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('replay-nzoko-loader'))}
              className="hover:text-brand-yellow text-slate-400 transition-colors flex items-center space-x-1.5 text-[11px]"
              title="Revoir l'animation de démarrage"
            >
              <RotateCcw size={12} className="text-amber-400" />
              <span>Animation d'embarquement</span>
            </button>
            <span className="text-slate-600">|</span>
            <Link
              to="/admin/login"
              className="hover:text-brand-yellow transition-colors tracking-widest uppercase text-[11px]"
            >
              Espace Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
