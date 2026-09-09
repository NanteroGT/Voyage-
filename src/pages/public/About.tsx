import { Shield, MapPin, Award, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroBus } from '../../assets/images';
import NzokoElephantLogo from '../../components/common/NzokoElephantLogo';

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
      <div className="relative bg-brand-dark pt-20 sm:pt-28 pb-28 sm:pb-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBus}
            alt="Flotte Nzoko Transport"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-cream"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-6">
            <NzokoElephantLogo size={22} />
            <span className="text-brand-yellow font-medium text-xs tracking-widest uppercase">
              Notre Identité
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Nous redéfinissons <br className="hidden md:block" />
            <span className="text-brand-yellow italic">le voyage au Congo.</span>
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Inspirée par la puissance et la noblesse de l'éléphant, Nzoko Transport allie sérénité, sécurité et ponctualité irréprochable.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20 pb-20 sm:pb-24">
        {/* Intro Block & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-16 md:mb-24">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark mb-5 tracking-tight leading-tight">
              L'éléphant, <br />
              symbole de notre <span className="text-brand-yellow">force</span>.
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              <p>
                « Nzoko » (l'éléphant en lingala) incarne la robustesse, la prestance, et une mémoire infaillible du chemin. C'est avec cette même solidité que nous assurons vos déplacements interurbains.
              </p>
              <p>
                Née d'une volonté de moderniser le transport interurbain au Congo, notre compagnie répond aux voyageurs en quête d'un service premium, de ponctualité stricte et de confort absolu.
              </p>
              <div className="pt-4">
                <Link
                  to="/services"
                  className="inline-flex items-center text-brand-dark font-bold uppercase tracking-widest text-xs hover:text-brand-yellow transition-colors group"
                >
                  <span>Découvrir nos services</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 relative group">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] bg-brand-dark">
              <img
                src={heroBus}
                alt="Nos Autocars"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 select-none"
              />
            </div>
          </div>
        </div>

        {/* Stats Bento Grid */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
              Nzoko Transport en chiffres
            </h2>
            <p className="text-slate-500 mt-2 font-light text-sm sm:text-base">
              La solidité d'un grand réseau national.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-lg hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="w-12 h-12 bg-brand-cream text-brand-yellow border border-brand-yellow/30 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-brand-dark mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1.5">
                    {stat.label}
                  </div>
                  <div className="text-slate-500 font-light text-xs">{stat.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-brand-dark rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl text-white border border-brand-yellow/20">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <NzokoElephantLogo size={40} className="mx-auto" />
            <span className="text-brand-yellow font-bold text-xs tracking-widest uppercase block">
              Notre Promesse
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              « Voyagez na kimia, <br />
              <span className="text-brand-yellow italic">bozali na Nzoko. »</span>
            </h3>
            <p className="text-slate-300 font-light text-xs sm:text-sm md:text-base leading-relaxed">
              Plus qu'un slogan, c'est notre serment d'une quiétude absolue depuis la réservation jusqu'à votre arrivée en gare. Nous investissons constamment dans la sécurité et le bien-être de chaque passager.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
