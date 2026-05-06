import { Shield, MapPin, Award, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { value: '4+', label: 'Villes Desservies', desc: 'Sur les axes majeurs du Congo', icon: MapPin },
    { value: '5K+', label: 'Voyageurs Mensuels', desc: 'Nous font confiance chaque jour', icon: Users },
    { value: '100%', label: 'Sécurité Optimale', desc: 'Flotte moderne et GPS intégré', icon: Shield },
    { value: 'N°1', label: 'Satisfaction', desc: 'Reconnu pour notre ponctualité', icon: Award },
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-brand-dark pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80" 
            alt="Paysage Congo" 
            className="w-full h-full object-cover opacity-[0.15] mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-cream"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-8">
            <span className="text-brand-yellow font-medium text-sm tracking-widest uppercase">Notre Identité</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold text-white mb-8 tracking-tight leading-[1]">
            Nous redéfinissons <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-amber-300 italic">le voyage.</span>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24">
        
        {/* Intro Block & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-32">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-8 tracking-tight leading-tight">
              L'éléphant, <br/>symbole de notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-amber-500">force</span>.
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
              <p>
                « Nzoko » (l'éléphant en lingala) incarne la robustesse, la prestance, et une mémoire infaillible du chemin. C'est avec cette même solidité que nous assurons vos déplacements.
              </p>
              <p>
                Née d'une volonté de moderniser le transport interurbain au Congo, notre compagnie répond aux voyageurs en quête d'un service premium, de fiabilité absolue et de sécurité sans compromis.
              </p>
              <div className="pt-6">
                <Link to="/services" className="inline-flex items-center text-brand-dark font-bold uppercase tracking-widest text-sm hover:text-brand-yellow transition-colors group">
                  Découvrir nos services
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 relative group">
            <div className="absolute -inset-4 bg-brand-yellow/30 rounded-[3rem] blur-3xl group-hover:blur-2xl transition-all duration-700 opacity-50"></div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(10,28,39,0.2)] relative z-10 border-4 border-white/50 aspect-[4/3] bg-brand-dark">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Nos Bus" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 select-none opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/40 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Stats Bento Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark tracking-tight">Nzoko Transport en chiffres</h2>
            <p className="text-slate-500 mt-4 font-light text-lg">La solidité d'un grand réseau national.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-xl shadow-slate-200/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative group">
                  <div className="absolute -right-10 -top-10 text-brand-yellow/5 group-hover:scale-150 transition-transform duration-700 pointer-events-none">
                     <Icon size={160} />
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-brand-cream text-brand-yellow border border-brand-yellow/20 rounded-2xl flex items-center justify-center mb-6">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="text-4xl font-black text-brand-dark mb-2 tracking-tight">{stat.value}</div>
                    <div className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-2">{stat.label}</div>
                    <div className="text-slate-500 font-light text-sm">{stat.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-brand-dark rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center max-w-5xl mx-auto shadow-2xl">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-yellow/10 to-transparent"></div>
           <div className="relative z-10 max-w-3xl mx-auto">
             <span className="text-brand-yellow font-medium text-xs tracking-widest uppercase mb-4 block">Notre Promesse</span>
             <h3 className="text-2xl md:text-4xl font-bold text-white mb-8 tracking-tight leading-snug">
               "Voyagez na kimia, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-amber-300 italic font-medium">bozali na Nzoko</span>"
             </h3>
             <p className="text-slate-300 font-light text-lg">
               Plus qu’un slogan, c’est notre serment d’une quiétude absolue depuis la réservation jusqu’à votre arrivée. Nous investissons constamment dans la formation de nos équipes et la modernisation de notre flotte.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
