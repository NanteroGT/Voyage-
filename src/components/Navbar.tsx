import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Services', href: '#services' },
    { name: 'Agences', href: '#agences' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-out border-b ${
      isScrolled ? 'bg-navy/80 backdrop-blur-md py-3 shadow-lg border-white/5' : 'bg-transparent py-5 border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 border border-gold/50 flex items-center justify-center rounded-sm">
                <span className="font-heading font-black text-xs tracking-tight text-gold">NZ</span>
            </div>
            <span className="font-heading font-black text-xl tracking-widest text-white mt-1">
              NZOKO
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-gold transition-all duration-300 font-medium text-sm lg:text-sm uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
              <a href="#destinations" className="bg-gold text-navy px-5 py-2 rounded-sm font-bold text-xs tracking-widest hover:bg-white transition-all duration-300">
                RÉSERVER
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gold p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy/95 backdrop-blur-lg border-b border-white/10">
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gold block py-2 text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
