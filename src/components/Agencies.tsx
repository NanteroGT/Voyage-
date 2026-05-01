import { MapPin, Phone, MessageCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Agency {
  id: string;
  city: string;
  address: string;
  quartier: string;
  phone?: string;
  whatsapp?: string;
}

export default function Agencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [defaultWhatsApp, setDefaultWhatsApp] = useState('242061234567');
  const [defaultPhone, setDefaultPhone] = useState('+242 06 123 45 67');

  useEffect(() => {
    // Fetch default contact info first
    const fetchDefaults = async () => {
      try {
        const snap = await getDoc(doc(db, 'homepage_config', 'company_info'));
        if (snap.exists()) {
          const data = snap.data();
          if (data.whatsapp) setDefaultWhatsApp(data.whatsapp);
          if (data.phone) setDefaultPhone(data.phone);
        }
      } catch (e) {
        console.warn("Could not fetch company info defaults");
      }
    };
    fetchDefaults();

    // Subscribe to agencies
    const q = query(collection(db, 'agencies'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Agency));
      setAgencies(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching agencies:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-white flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-navy animate-spin" />
      </div>
    );
  }

  return (
    <section id="agences" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16 px-4">
          <h2 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold mb-2">
            Réseau d'agences
          </h2>
          <p className="text-lg md:text-3xl font-heading font-bold text-navy">
            Retrouvez-nous partout au Congo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {agencies.length > 0 ? agencies.map((agency) => (
            <div key={agency.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
               <h3 className="text-xl font-heading font-bold text-navy mb-2">{agency.city}</h3>
               <div className="inline-block bg-navy/5 text-navy px-3 py-1 rounded text-xs font-semibold mb-6 self-start uppercase tracking-wider">
                 {agency.quartier}
               </div>

               <ul className="space-y-4 mb-8 flex-grow">
                 <li className="flex items-start">
                   <MapPin className="h-5 w-5 text-gold mr-3 flex-shrink-0 mt-0.5" />
                   <span className="text-gray-600 text-sm leading-relaxed">{agency.address}</span>
                 </li>
                 <li className="flex items-center text-gray-600">
                   <Phone className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                   <span className="text-sm font-medium">{agency.phone || defaultPhone}</span>
                 </li>
               </ul>

               <a 
                 href={`https://wa.me/${agency.whatsapp || defaultWhatsApp}?text=Bonjour, je vous contacte depuis le site web concernant l'agence de ${agency.city}.`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center w-full bg-navy text-gold py-3 px-4 rounded-xl font-bold hover:bg-[#1a2d5e] transition-all"
               >
                 <MessageCircle className="w-5 h-5 mr-2" />
                 Contacter l'agence
               </a>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              Chargement des agences en cours...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
