import { Bus, Clock, CalendarDays, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Destination {
  id: string;
  from: string;
  to: string;
  priceOneWay: number;
  days: string;
  time: string;
  status: 'Actif' | 'Inactif';
}

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'destinations'), 
      where('status', '==', 'Actif'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Destination));
      setDestinations(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching destinations:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-white flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-navy animate-spin" />
      </div>
    );
  }

  return (
    <section id="destinations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 px-4">
          <h2 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold mb-2">Trajets & Tarifs</h2>
          <p className="text-xl md:text-4xl font-heading font-bold text-navy">
            Nos solutions de voyage
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {destinations.length > 0 ? destinations.map((dest) => (
            <div key={dest.id} className="group bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={dest.from.toLowerCase().includes('pointe') ? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop'} 
                  alt={`${dest.from} à ${dest.to}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center text-white font-heading font-bold text-2xl">
                        <span>{dest.from}</span>
                        <Bus className="mx-4 text-gold h-6 w-6" />
                        <span>{dest.to}</span>
                    </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-8">
                    <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                            <Clock className="h-5 w-5 mr-3 text-gold" />
                            <span className="text-base text-gray-700">Heure : {dest.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <CalendarDays className="h-5 w-5 mr-3 text-gold" />
                            <span className="text-base text-gray-700">Départs : {dest.days}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block text-sm text-gray-500 font-medium">À partir de</span>
                        <span className="text-3xl font-heading font-bold text-navy">{dest.priceOneWay.toLocaleString()} FCFA</span>
                    </div>
                </div>

                <a 
                  href={`https://wa.me/242061234567?text=Bonjour, je souhaite réserver une place pour le trajet ${dest.from} - ${dest.to}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-navy text-white px-8 py-4 rounded-full font-bold hover:bg-[#1a2d5e] transition-all duration-300 text-lg uppercase tracking-wider text-center"
                >
                    Réserver ma place
                </a>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-gray-500 italic">
              Aucun trajet disponible pour le moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
