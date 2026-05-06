import { Bus, Package, Ticket, Shield, Clock, Map, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      icon: Ticket,
      title: 'Voyage VIP Prestige',
      desc: 'Une expérience premium : sièges très larges inclinables, espace supplémentaire pour les jambes, collation à bord et service exclusif par nos hôtesses. L\'art de voyager sans compromis.',
      colSpan: 'lg:col-span-8',
      bgType: 'dark',
    },
    {
      icon: Bus,
      title: 'Voyage Classique',
      desc: 'Trajets réguliers sur nos axes majeurs à bord de bus confortables et parfaitement entretenus.',
      colSpan: 'lg:col-span-4',
      bgType: 'light',
    },
    {
      icon: Package,
      title: 'Fret & Colis Express',
      desc: 'Expédition de vos plis et colis volumineux. Service ultra-rapide, sécurisé et traçable en temps réel.',
      colSpan: 'lg:col-span-5',
      bgType: 'light',
    },
    {
      icon: Shield,
      title: 'Sécurité Maximale',
      desc: 'Chauffeurs hautement qualifiés, véhicules bridés par satellite, et suivi GPS continu de la flotte.',
      colSpan: 'lg:col-span-7',
      bgType: 'yellow',
    },
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Immersive Header */}
      <div className="relative bg-brand-dark pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-yellow/10 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-white/5 to-transparent blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-8">
            <span className="text-brand-cream font-medium text-sm tracking-widest uppercase">Offre Complète</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold text-white mb-6 tracking-tight leading-[1.1]">
            L'excellence de <br/><span className="text-brand-yellow italic">nos prestations.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Nous avons conçu nos services pour répondre à vos exigences les plus hautes : de la ponctualité à l'acheminement de vos colis précieux.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isDark = service.bgType === 'dark';
            const isYellow = service.bgType === 'yellow';
            const isLight = service.bgType === 'light';
            
            return (
              <div 
                key={index} 
                className={`group rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden transition-all duration-700 ${service.colSpan} ${
                  isDark ? 'bg-brand-dark text-white border border-white/10 shadow-2xl shadow-brand-dark/20' : 
                  isYellow ? 'bg-brand-yellow text-brand-dark border border-brand-yellow shadow-xl shadow-brand-yellow/20' : 
                  'bg-white text-brand-dark border border-slate-200/60 shadow-xl shadow-slate-200/10 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(10,28,39,0.08)]'
                }`}
              >
                {/* Decorative Icon Background */}
                <div className={`absolute -bottom-10 -right-10 pointer-events-none transition-transform duration-1000 group-hover:scale-125 group-hover:-rotate-12 ${
                  isDark ? 'text-white/5' : isYellow ? 'text-brand-dark/5' : 'text-slate-100'
                }`}>
                  <Icon size={isDark ? 300 : 250} />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-colors duration-500 ${
                    isDark ? 'bg-brand-yellow text-brand-dark' : 
                    isYellow ? 'bg-white/40 text-brand-dark' : 
                    'bg-brand-cream text-brand-yellow group-hover:bg-brand-yellow group-hover:text-white'
                  }`}>
                    <Icon size={32} strokeWidth={isDark ? 2 : 1.5} />
                  </div>
                  
                  <div>
                    <h3 className={`text-3xl lg:text-4xl font-bold mb-4 tracking-tight ${isDark || isYellow ? '' : 'text-brand-dark'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-lg leading-relaxed font-light ${
                      isDark ? 'text-slate-300' : isYellow ? 'text-brand-dark/80 font-medium' : 'text-slate-600'
                    }`}>
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Sub-blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
           <div className="bg-white rounded-[2rem] p-10 border border-slate-200/60 flex items-center shadow-sm">
              <div className="bg-brand-cream w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mr-6">
                 <Clock className="text-brand-yellow" size={24} />
              </div>
              <div>
                 <h4 className="font-bold text-brand-dark text-lg mb-1 tracking-tight">Ponctualité Rigoureuse</h4>
                 <p className="text-slate-500 font-light">Le respect de votre temps est notre priorité numéro un.</p>
              </div>
           </div>
           
           <div className="bg-white rounded-[2rem] p-10 border border-slate-200/60 flex items-center shadow-sm">
              <div className="bg-brand-cream w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mr-6">
                 <Map className="text-brand-yellow" size={24} />
              </div>
              <div>
                 <h4 className="font-bold text-brand-dark text-lg mb-1 tracking-tight">Réseau d'Agences</h4>
                 <p className="text-slate-500 font-light">Des points de vente locaux pour faciliter vos démarches.</p>
              </div>
           </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-brand-dark rounded-[3rem] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-yellow/20 to-transparent opacity-50 group-hover:scale-150 transition-transform duration-1000"></div>
           <div className="relative z-10 max-w-3xl mx-auto">
             <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
               Prêt à vivre <span className="text-brand-yellow italic">l'expérience Nzoko</span> ?
             </h3>
             <p className="text-slate-300 font-light text-lg mb-10">
               Réservez dès maintenant votre billet pour l'une de nos destinations ou contactez-nous pour l'envoi de vos colis.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-brand-yellow text-brand-dark font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                 Effectuer une réservation
               </Link>
               <Link to="/tracking" className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
                 Suivre un colis
               </Link>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
