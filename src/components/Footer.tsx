import { Facebook, Instagram, MapPin, Phone, Mail, Loader2, Lock, LockOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({
    email: 'contact@nzokotransport.com',
    phone: '+242 06 123 45 67',
    address: 'Avenue de Gaulle, Centre-ville, Pointe-Noire, Congo',
    facebook: '#',
    instagram: '#',
    whatsapp: '242061234567'
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const snap = await getDoc(doc(db, 'homepage_config', 'company_info'));
        if (snap.exists()) {
          setContactInfo(prev => ({ ...prev, ...snap.data() }));
        }
      } catch (e) {
        console.warn("Could not fetch contact info for footer");
      }
    };
    fetchContact();

    const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));
            setIsAdmin(adminDoc.exists());
        } else {
            setIsAdmin(false);
        }
    });

    return () => unsub();
  }, []);

  return (
    <footer className="bg-[#050A18] text-gray-300 pt-16 pb-8 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-bold tracking-widest text-gold font-sans block mb-6">
              NZOKO
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nos éléphants sont prêts à vous emmener plus loin. Confort, fraîcheur, Wi-Fi, sécurité... Tout est pensé pour que chaque trajet soit un vrai moment de plaisir. Voyagez Na Kimia, Bozali Na Nzoko.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href={contactInfo.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <Facebook size={20} />
              </a>
              <a href={contactInfo.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <Instagram size={20} />
              </a>
              <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.4 3.22-2.14 6.34-4.69 8.22-2.75 2.13-6.23 2.8-9.59 2.06-3.41-.81-6.11-3.16-7.51-6.22-1.4-3.12-1.35-6.85.34-9.84 1.65-2.82 4.38-4.7 7.54-5.46.85-.2 1.73-.27 2.6-.27v4.03c-1.92.1-3.75.98-5.04 2.45-1.33 1.52-1.96 3.66-1.61 5.67.35 1.95 1.57 3.65 3.25 4.6 1.74.96 4 1.11 5.86.3 1.83-.82 3.25-2.67 3.52-4.67.06-.44.09-.89.09-1.33V6.26c-1.46 1.14-3.23 1.8-5.06 2.05V4.28c.01-.27.01-.54 0-.8V.02Z"/>
                </svg>
              </a>
              <Link to={isAdmin ? "/admin/dashboard" : "/admin/login"} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                {isAdmin ? <LockOpen size={20} /> : <Lock size={20} />}
              </Link>
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <div className="w-4 h-1 bg-gold mr-2 rounded"></div>
              Liens Rapides
            </h3>
            <ul className="space-y-3 font-medium">
              <li><a href="/#destinations" className="text-gray-400 hover:text-gold transition-colors block">Destinations & Tarifs</a></li>
              <li><a href="/#services" className="text-gray-400 hover:text-gold transition-colors block">Nos Services</a></li>
              <li><a href="/#agences" className="text-gray-400 hover:text-gold transition-colors block">Agences au Congo</a></li>
              <li><Link to="/news" className="text-gray-400 hover:text-gold transition-colors block">Actualités</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-gold transition-colors block">Administration</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <div className="w-4 h-1 bg-gold mr-2 rounded"></div>
              Informations Légales
            </h3>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors block">Conditions Générales de Vente</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors block">Politique de Confidentialité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors block">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <div className="w-4 h-1 bg-gold mr-2 rounded"></div>
              Contact Direct
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-gold w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-gold w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-gold w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{contactInfo.email}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Nzoko Transport. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">Fiabilité et Confort sur les routes du Congo.</p>
        </div>
      </div>
    </footer>
  );
}
