import { ShieldCheck, Clock, Package, Star, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Service {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const iconMap: { [key: string]: any } = {
  Star,
  Clock,
  ShieldCheck,
  Package
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('title', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
      setServices(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-24 bg-navy/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <Loader2 className="w-8 h-8 text-navy animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-navy/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 px-4">
          <h2 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold mb-2">Engagements</h2>
          <p className="text-2xl md:text-4xl font-heading font-bold text-navy">
            La promesse Nzoko
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => {
            const IconComponent = iconMap[svc.icon] || Star;
            return (
              <div key={svc.id} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 group transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-heading font-bold text-navy mb-3">{svc.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
