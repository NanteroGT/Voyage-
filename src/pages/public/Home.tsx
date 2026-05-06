import React, { useState } from 'react';
import { ArrowRight, Bus, Package, MapPin, CheckCircle2, Search, Ticket, ShieldCheck, Clock, Map } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/tracking?code=${trackingNumber}`);
    }
  };

  const agencies = [
    { name: 'Brazzaville', locations: ['Agence Mpila', "Agence Château d'Eau", 'Agence Mafouta', 'Gare Routière (RN1)'] },
    { name: 'Pointe-Noire', locations: ['Agence Centre-ville', 'Agence Nkouikou', 'Agence Ngoyo'] },
    { name: 'Dolisie', locations: ['Agence Quartier Capable'] },
    { name: 'Nkayi', locations: ['Agence Quartier Le Village'] },
  ];

  const services = [
    {
      icon: Bus,
      title: 'Voyage Interurbain',
      desc: 'Voyagez confortablement entre nos différentes agences dans nos bus climatisés nouvelle génération avec une sécurité absolue.',
    },
    {
      icon: Ticket,
      title: 'Service VIP',
      desc: 'Profitez d\'une expérience premium avec des sièges extra-larges, repas à bord et embarquement prioritaire pour plus d\'élégance.',
    },
    {
      icon: Package,
      title: 'Courrier & Colis express',
      desc: 'Expédiez vos courriers et colis en toute sécurité. Un suivi en temps réel et une livraison rapide dans tout le pays.',
    }
  ];

  const features = [
    { title: 'Confort Premium', desc: 'Flotte de bus moderne et climatisée avec Wi-Fi à bord', icon: Bus },
    { title: 'Sécurité Maximale', desc: 'Des chauffeurs formés et une maintenance rigoureuse', icon: ShieldCheck },
    { title: 'Tranquillité Garantie', desc: 'Respect strict des horaires pour votre ponctualité', icon: Clock },
    { title: 'Réseau Étendu', desc: 'Des agences idéalement situées pour vous servir', icon: Map }
  ];

  return (
    <div className="bg-brand-cream selection:bg-brand-yellow selection:text-brand-dark">
      {/* Hero Section */}
      <section className="relative bg-brand-dark text-white min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80" 
            alt="Bus sur l'autoroute" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
              <span className="text-brand-cream font-medium text-sm tracking-widest uppercase">Nouvelle ère du transport au Congo</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold text-white mb-8 leading-[1.1]">
              Voyagez dans le <br/>
              <span className="text-brand-yellow">calme absolu.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-2xl">
              Nzoko Transport vous offre une expérience interurbaine où le confort, la sécurité et l'élégance priment. <br/><br/>
              <span className="font-medium italic text-brand-yellow text-xl">« Voyagez na kimia, bozali na Nzoko. »</span>
            </p>
            
            {/* Action Buttons & Tracking */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link to="/contact" className="w-full sm:w-auto bg-brand-yellow text-brand-dark px-8 py-5 rounded-2xl font-bold hover:bg-amber-400 hover:-translate-y-1 transition-all flex items-center justify-center uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(234,219,187,0.3)]">
                <Ticket className="mr-2" size={20} />
                Acheter un billet
              </Link>
              
              <div className="w-full sm:w-auto flex-1 max-w-md bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex flex-col sm:flex-row">
                <div className="flex-1 flex items-center px-4 py-3 sm:py-0">
                  <Search className="text-brand-yellow mr-2 shrink-0" size={18} />
                  <input 
                    type="text" 
                    placeholder="Suivre un colis (ex: NZK-123)" 
                    className="w-full text-white placeholder-slate-400/80 focus:outline-none bg-transparent font-medium tracking-wide"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleTrackingSubmit}
                  className="mt-2 sm:mt-0 bg-white text-brand-dark px-6 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center justify-center shrink-0 uppercase tracking-widest text-sm"
                >
                  Suivre
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Stats / Credibility */}
      <section className="border-b border-slate-200 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 divide-x divide-slate-100">
            <div className="text-center px-4">
              <h3 className="text-4xl font-bold text-brand-dark mb-2">4+</h3>
              <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">Villes desservies</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl font-bold text-brand-dark mb-2">10</h3>
              <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">Agences au niveau national</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl font-bold text-brand-dark mb-2">100%</h3>
              <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">Flotte moderne</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl font-bold text-brand-dark mb-2">24/7</h3>
              <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">Support Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-yellow font-semibold tracking-widest uppercase text-sm mb-3 block">Nos Prestations</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-6">L'excellence en mouvement</h2>
            <p className="text-slate-600 text-lg">Nous avons repensé chaque détail pour vous offrir un service de transport à la hauteur de vos exigences, alliant confort, fiabilité et professionnalisme.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-10 hover:shadow-[0_20px_50px_rgba(10,28,39,0.08)] transition-all duration-500 border border-slate-200/60 flex flex-col items-center text-center">
                  <div className="bg-brand-cream text-brand-yellow w-20 h-20 rounded-full flex items-center justify-center mb-8 group-hover:bg-brand-yellow group-hover:text-white transition-colors duration-500">
                    <Icon size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed font-light">{service.desc}</p>
                  <Link to="/services" className="mt-auto inline-flex items-center text-brand-dark font-medium group-hover:text-brand-yellow transition-colors uppercase tracking-wider text-sm">
                    En savoir plus <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Bus moderne et confortable" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-64 h-64 bg-brand-yellow rounded-full blur-3xl opacity-20 -z-10"></div>
              
              {/* Elegant floating badge */}
              <div className="absolute -bottom-8 lg:-right-12 bg-brand-dark text-white p-8 rounded-2xl shadow-xl z-20 max-w-xs border border-white/10 hidden md:block">
                <div className="flex items-start space-x-4">
                  <ShieldCheck className="text-brand-yellow shrink-0 mt-1" size={32} />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Sécurité avant tout</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">Chaque trajet est soigneusement planifié et supervisé pour vous garantir une sérénité totale.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-brand-yellow font-semibold tracking-widest uppercase text-sm mb-3 block">Pourquoi Nzoko</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-8">Plus qu'un voyage, un art de vivre.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-12 font-light">
                Inspirée par la force et l'élégance de l'éléphant, Nzoko Transport a été créée pour élever les standards de voyage interurbain au Congo. Laissez-vous transporter dans un cadre où chaque passager est de la plus haute importance.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex">
                    <div className="mr-5 shrink-0">
                      <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center text-brand-yellow">
                        <feature.icon size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-dark mb-1">{feature.title}</h4>
                      <p className="text-slate-600 font-light text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agencies Map Section */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 justify-between">
            <div className="lg:w-1/3">
              <span className="text-brand-yellow font-semibold tracking-widest uppercase text-sm mb-3 block">Couverture Nationale</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Toujours plus proche de vous</h2>
              <p className="text-slate-400 text-lg font-light mb-10 leading-relaxed">
                Notre réseau d'agences est stratégiquement positionné pour faciliter l'accès à nos services de billetterie et d'envoi de colis.
              </p>
              <Link to="/contact" className="inline-flex items-center text-brand-yellow font-medium hover:text-white transition-colors uppercase tracking-wider text-sm">
                Voir toutes les adresses <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {agencies.map((city, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                  <h3 className="flex items-center text-2xl font-bold text-white mb-6">
                    <MapPin className="mr-3 text-brand-yellow" size={24} /> {city.name}
                  </h3>
                  <ul className="space-y-4">
                    {city.locations.map((loc, j) => (
                      <li key={j} className="text-slate-300 font-light text-base flex items-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mr-3"></div> {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-brand-dark rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-yellow/20 to-transparent opacity-40 group-hover:scale-150 transition-transform duration-1000"></div>
             <div className="relative z-10 max-w-4xl mx-auto">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">Prêt à voyager <span className="text-brand-yellow italic">autrement</span> ?</h2>
               <p className="text-xl md:text-2xl mb-12 font-light text-slate-300 max-w-2xl mx-auto">
                 Réservez votre billet de bus dès aujourd'hui ou envoyez vos colis dans l'une de nos agences réparties à travers le pays.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Link to="/contact" className="inline-flex items-center justify-center bg-brand-yellow text-brand-dark px-10 py-5 rounded-2xl font-bold text-sm tracking-widest hover:bg-white hover:-translate-y-1 hover:shadow-2xl transition-all uppercase">
                   <Ticket className="mr-3" size={24} /> Acheter un billet
                 </Link>
                 <Link to="/tracking" className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-sm tracking-widest hover:bg-white/20 hover:-translate-y-1 transition-all uppercase">
                   <Package className="mr-3" size={24} /> Suivre un colis
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}

