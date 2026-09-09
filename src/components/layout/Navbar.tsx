import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSettings } from '../../lib/useSettings';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { name: 'Accueil', path: '/' },
    { name: 'Nos Services', path: '/services' },
    { name: 'Suivi Colis', path: '/tracking' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 flex flex-col shadow-sm bg-white">
        {/* Top bar for desktop */}
        <div className="hidden lg:flex bg-brand-dark text-slate-300 py-2 px-8 text-xs justify-between items-center w-full border-b border-white/10">
          <div className="flex items-center space-x-6">
            <a
              href="tel:061671717"
              className="flex items-center text-white hover:text-brand-yellow transition-colors font-medium"
            >
              <span className="bg-brand-yellow/20 text-brand-yellow px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mr-2">
                Numéro Unique
              </span>
              <Phone size={13} className="mr-1.5 text-brand-yellow" /> 06 167 17 17
            </a>
            <span className="text-slate-500 font-light">•</span>
            <span className="text-slate-300 italic font-light">« Voyagez na kimia, bozali na Nzoko. »</span>
          </div>
          <div className="flex items-center space-x-5">
            <a
              href="mailto:contact@nzokotransport.com"
              className="flex items-center hover:text-brand-yellow transition-colors"
            >
              <Mail size={13} className="mr-1.5 text-brand-yellow" /> contact@nzokotransport.com
            </a>
            <span className="text-slate-600">|</span>
            <Link
              to="/admin/login"
              className="hover:text-white transition-colors font-medium uppercase tracking-wider text-[11px]"
            >
              Espace Admin
            </Link>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`w-full bg-white transition-all duration-300 ${
            isScrolled ? 'py-2 sm:py-2.5 shadow-md' : 'py-2 sm:py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 sm:space-x-2.5">
                <img
                  src={settings?.logoUrl || '/images/logo.png'}
                  alt="Logo Nzoko Transport"
                  className="h-8 sm:h-10 w-8 sm:w-10 object-contain rounded-xl shadow-sm shrink-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.endsWith('logo.jpg')) {
                      target.src = '/images/logo.jpg';
                    }
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-black text-lg sm:text-2xl tracking-tight text-brand-dark leading-none">
                    {(settings?.name || 'NZOKO').replace(/\s*TRANSPORT$/i, '').trim().toUpperCase() || 'NZOKO'}
                  </span>
                  <span className="text-[8px] sm:text-[10px] tracking-[0.25em] text-brand-yellow font-black uppercase leading-none mt-0.5">
                    TRANSPORT
                  </span>
                </div>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-7 xl:space-x-8">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs tracking-widest font-bold transition-colors uppercase ${
                      location.pathname === link.path
                        ? 'text-brand-yellow'
                        : 'text-brand-dark hover:text-brand-yellow'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/booking"
                  className="bg-brand-yellow hover:bg-amber-400 text-brand-dark px-5 py-2.5 rounded-xl transition-all font-black shadow-sm hover:shadow uppercase text-xs tracking-widest flex items-center space-x-1.5"
                >
                  <span>Acheter un Billet</span>
                </Link>
              </div>

              {/* Mobile Right Controls */}
              <div className="flex items-center space-x-1.5 sm:space-x-2 lg:hidden">
                <a
                  href="tel:061671717"
                  className="p-2 rounded-lg bg-brand-dark text-brand-yellow hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
                  aria-label="Appeler le 06 167 17 17"
                  title="06 167 17 17"
                >
                  <Phone size={15} />
                </a>
                <Link
                  to="/booking"
                  className="bg-brand-yellow text-brand-dark px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm flex items-center min-h-[36px]"
                >
                  Billet
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-brand-dark p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
                  aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                >
                  {isMobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-100 bg-white shadow-2xl transition-all animate-fadeIn">
              <div className="px-4 pt-3 pb-6 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
                <div className="p-3 bg-brand-dark text-white rounded-xl mb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-yellow font-black block">
                      Numéro Unique
                    </span>
                    <a href="tel:061671717" className="text-base font-bold text-white flex items-center mt-0.5">
                      <Phone size={14} className="text-brand-yellow mr-1.5" /> 06 167 17 17
                    </a>
                  </div>
                  <span className="text-[10px] text-slate-300 italic">Voyagez na kimia</span>
                </div>

                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'bg-brand-yellow/15 text-brand-dark'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-brand-yellow" />}
                    </Link>
                  );
                })}

                <div className="pt-3 mt-2 border-t border-slate-100 space-y-2.5">
                  <Link
                    to="/booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-brand-yellow text-brand-dark px-6 py-3.5 rounded-xl hover:bg-amber-400 font-bold uppercase tracking-widest text-xs shadow-md"
                  >
                    Acheter un Billet en ligne
                  </Link>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href="https://wa.me/242061671717"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-medium border border-emerald-200"
                    >
                      WhatsApp
                    </a>
                    <Link
                      to="/admin/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-medium border border-slate-200/60"
                    >
                      Espace Admin
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Spacer to prevent layout jump behind the fixed header */}
      <div className="h-[52px] sm:h-[62px] lg:h-[98px] w-full shrink-0" aria-hidden="true" />
    </>
  );
}
