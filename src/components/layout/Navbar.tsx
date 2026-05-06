import { Link, useLocation } from 'react-router-dom';
import { Bus, Menu, X, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Accueil', path: '/' },
    { name: 'Nos Services', path: '/services' },
    { name: 'Suivi Colis', path: '/tracking' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar for Contact Info */}
      <div className="hidden lg:flex bg-brand-dark text-slate-300 py-2 px-8 text-sm justify-between items-center fixed w-full top-0 z-50">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><Phone size={14} className="mr-2 text-brand-yellow" /> +242 06 167 1X XX</span>
          <span className="flex items-center"><Mail size={14} className="mr-2 text-brand-yellow" /> contact@nzokotransport.com</span>
        </div>
        <div>
          <Link to="/admin/login" className="hover:text-white transition-colors text-xs font-medium uppercase tracking-wider">Espace Admin</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'top-0 bg-white shadow-md py-3' : 'top-0 lg:top-9 bg-white py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-brand-dark p-2.5 rounded-xl flex items-center justify-center">
                <Bus className="text-brand-yellow h-6 w-6" />
              </div>
              <div className="flex flex-col flex-1 pl-1">
                <span className="font-bold text-[1.4rem] tracking-tight text-brand-dark leading-[1.1]">
                  NZOKO
                </span>
                <span className="text-[10px] tracking-[0.25em] text-brand-yellow font-bold uppercase leading-none">Transport</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-widest font-semibold transition-colors uppercase ${
                    location.pathname === link.path ? 'text-brand-yellow' : 'text-brand-dark hover:text-brand-yellow'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" className="bg-brand-yellow text-brand-dark px-6 py-2.5 rounded-lg hover:bg-yellow-500 transition-colors font-bold shadow-sm uppercase text-xs tracking-widest">
                Acheter un Billet
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-dark p-2"
              >
                {isMobileMenuOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100">
            <div className="px-4 pt-4 pb-8 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest ${
                    location.pathname === link.path ? 'bg-brand-cream text-brand-yellow' : 'text-brand-dark hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6">
                <Link to="/contact" className="block w-full text-center bg-brand-yellow text-brand-dark px-6 py-4 rounded-xl hover:bg-yellow-500 font-bold uppercase tracking-widest text-sm shadow-md">
                  Acheter un Billet
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
