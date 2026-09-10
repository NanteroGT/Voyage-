import React, { useState } from 'react';
import {
  Bus,
  Crown,
  Package,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Ticket,
  Phone,
  Gift,
  Sparkles,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../lib/useSettings';
import { heroBus, crewHostess, vipInterior, tombolaCar } from '../../assets/images';
import StopsModal from '../../components/common/StopsModal';
import BusPrivatizationModal from '../../components/common/BusPrivatizationModal';
import TombolaModal from '../../components/common/TombolaModal';
import NzokoElephantLogo from '../../components/common/NzokoElephantLogo';
import QuickBookingBar from '../../components/common/QuickBookingBar';

export default function Home() {
  const [stopsModalOpen, setStopsModalOpen] = useState(false);
  const [privatizationModalOpen, setPrivatizationModalOpen] = useState(false);
  const [tombolaModalOpen, setTombolaModalOpen] = useState(false);
  const { settings } = useSettings();

  const services = [
    {
      icon: Bus,
      title: 'Voyage Interurbain Confort',
      desc: 'Flotte moderne 100% climatisée reliant Brazzaville, Pointe-Noire, Dolisie et Nkayi avec une ponctualité rigoureuse.',
      badge: 'Liaison Quotidienne',
    },
    {
      icon: Crown,
      title: 'Classe VIP & Première',
      desc: 'Sièges inclinables grand confort, rafraîchissements servis par nos hôtesses et embarquement prioritaire sans attente.',
      badge: 'Expérience Royale',
    },
    {
      icon: Package,
      title: 'Courrier & Fret Express',
      desc: 'Expédition express sous 24h avec numéro de traçabilité en direct. Vos plis et colis remis en mains propres en gare.',
      badge: 'Sécurisé & Traçable',
    },
  ];

  const features = [
    {
      title: 'Confort Premium',
      desc: 'Climatisation intégrale, assises ergonomiques et prises de charge',
      icon: Bus,
    },
    {
      title: 'Sécurité Maximale',
      desc: 'Chauffeurs professionnels chevronnés et suivi GPS en temps réel',
      icon: ShieldCheck,
    },
    {
      title: 'Ponctualité Respectée',
      desc: 'Horaires stricts pour vos départs et arrivées garanties',
      icon: Clock,
    },
    {
      title: 'Arrêts de Proximité',
      desc: 'Embarquement facilité dans les principaux quartiers urbains',
      icon: MapPin,
    },
  ];

  return (
    <div className="bg-brand-cream selection:bg-brand-yellow selection:text-brand-dark">
      {/* Hero Section - 80% screen height with well centered image */}
      <section className="relative bg-[#09151b] text-white min-h-[80vh] sm:min-h-[80vh] lg:min-h-[82vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={settings?.heroImageUrl || heroBus}
            alt="Bus moderne Nzoko Transport"
            className="w-full h-full object-cover object-center lg:object-[76%_center] transition-transform duration-1000"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071319]/92 via-[#071319]/60 via-40% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#071319]/80 via-transparent via-30% to-transparent pointer-events-none"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 w-full">
          <div className="max-w-xl space-y-6 sm:space-y-6">
            <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
              <span className="text-brand-yellow font-bold text-[10px] sm:text-xs tracking-wider uppercase">
                « Voyagez na kimia, bozali na Nzoko »
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Voyagez dans le <br />
              <span className="text-brand-yellow">calme absolu.</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              La référence du transport interurbain au Congo. Confort climatisé, ponctualité et sécurité sur l'axe Brazzaville ⇄ Pointe-Noire.
            </p>

            <div className="pt-3 sm:pt-2 space-y-4 sm:space-y-3">
              <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-3 items-stretch sm:items-center">
                <Link
                  to="/booking"
                  className="bg-brand-yellow hover:bg-amber-400 text-brand-dark px-7 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center shadow-[0_8px_20px_rgba(245,166,35,0.35)] hover:-translate-y-0.5 transition-all min-h-[48px]"
                >
                  <Ticket className="mr-2 shrink-0" size={18} />
                  <span>Acheter un billet</span>
                </Link>
                <Link
                  to="/tracking"
                  className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all min-h-[48px]"
                >
                  <Package size={16} className="text-brand-yellow" />
                  <span>Suivre un colis</span>
                </Link>
              </div>

              <div className="pt-3 sm:pt-2 flex flex-wrap items-center gap-x-4 gap-y-2.5 sm:gap-y-1.5 text-xs text-slate-300 font-light">
                <span className="inline-flex items-center space-x-1">
                  <CheckCircle2 size={13} className="text-brand-yellow shrink-0" />
                  <span>100% Climatisé</span>
                </span>
                <span className="inline-flex items-center space-x-1">
                  <CheckCircle2 size={13} className="text-brand-yellow shrink-0" />
                  <span>Wi-Fi & Prises 220V</span>
                </span>
                <span className="inline-flex items-center space-x-1">
                  <CheckCircle2 size={13} className="text-brand-yellow shrink-0" />
                  <span>Service VIP & Collation</span>
                </span>
                <span className="inline-flex items-center space-x-1">
                  <CheckCircle2 size={13} className="text-brand-yellow shrink-0" />
                  <span>Départs à l'heure</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotline desktop strip */}
      <section className="hidden md:block bg-brand-dark border-y border-white/10 py-3.5 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-brand-yellow/15 text-brand-yellow flex items-center justify-center shrink-0">
              <Phone size={17} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-300">
                Numéro Unique & WhatsApp :{' '}
                <a
                  href="tel:061671717"
                  className="text-white font-bold hover:text-brand-yellow transition-colors underline-offset-2"
                >
                  06 167 17 17
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <a
              href="tel:061671717"
              className="flex-1 sm:flex-none bg-brand-yellow text-brand-dark font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Phone size={14} />
              <span>Appeler</span>
            </a>
            <a
              href="https://wa.me/242061671717"
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => setStopsModalOpen(true)}
              className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl border border-white/15 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <MapPin size={14} className="text-brand-yellow" />
              <span>Nos Arrêts</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Booking Bar Section */}
      <section className="py-6 sm:py-8 bg-brand-cream/80 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickBookingBar />
        </div>
      </section>

      {/* Tombola Banner */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#061e27] via-brand-dark to-[#03151c] rounded-3xl overflow-hidden border border-brand-yellow/20 shadow-xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 relative h-52 sm:h-64 lg:h-full min-h-[220px] overflow-hidden">
                <img
                  src={tombolaCar}
                  alt="Grande Tombola - Voiture Suzuki S-Presso"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-brand-dark/30 to-brand-dark"></div>
              </div>
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 text-white space-y-4 sm:space-y-4">
                <div className="inline-flex items-center space-x-1.5 bg-brand-yellow/20 border border-brand-yellow/40 rounded-full px-3 py-1 text-brand-yellow text-[11px] sm:text-xs font-black uppercase tracking-wider">
                  <Gift size={13} />
                  <span>Grande Tombola Mensuelle</span>
                </div>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  1 Voiture Suzuki à gagner <br className="hidden sm:inline" />
                  <span className="text-brand-yellow">tous les mois !</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  Pour chaque billet acheté, ajoutez seulement <strong>1.000 FCFA</strong> pour obtenir votre ticket officiel et tenter de repartir au volant d'un véhicule neuf.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => setTombolaModalOpen(true)}
                    className="bg-brand-yellow hover:bg-amber-400 text-brand-dark font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all"
                  >
                    <span>Comment participer ?</span>
                    <Sparkles size={16} />
                  </button>
                  <Link
                    to="/booking"
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-white/20 text-center transition-all flex items-center justify-center"
                  >
                    Réserver avec Tombola
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with comfortable mobile spacing */}
      <section className="py-12 sm:py-16 md:py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
            <span className="text-brand-yellow font-bold tracking-widest uppercase text-[11px] sm:text-xs block">
              Nos Prestations
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
              L'excellence en mouvement
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Un réseau moderne pensé pour vos trajets d'affaires, visites familiales et expéditions rapides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 sm:p-7 hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col items-start relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 bg-brand-cream text-brand-dark text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-slate-200">
                    {service.badge}
                  </div>
                  <div className="bg-brand-dark text-brand-yellow w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-yellow group-hover:text-brand-dark transition-colors">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-2.5">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed font-light text-xs sm:text-sm">
                    {service.desc}
                  </p>
                  <Link
                    to="/services"
                    className="mt-auto inline-flex items-center text-brand-dark font-bold group-hover:text-brand-yellow transition-colors uppercase tracking-wider text-xs"
                  >
                    <span>Découvrir l'offre</span>
                    <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bus Privatization Banner */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/10] sm:aspect-[4/3]">
                <img
                  src={vipInterior}
                  alt="Intérieur VIP Nzoko Transport avec sièges en cuir"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 bg-brand-dark text-white p-4 rounded-2xl shadow-xl border border-white/15 sm:max-w-xs flex items-center space-x-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-brand-yellow/50">
                  <img
                    src={crewHostess}
                    alt="Hôtesse Nzoko Transport"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-brand-yellow font-black block">
                    Service à bord
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Personnel dévoué</h4>
                  <p className="text-slate-400 text-[11px] font-light">Accueil attentionné & assistance</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="inline-flex items-center space-x-1.5 bg-brand-yellow/15 border border-brand-yellow/40 rounded-full px-3 py-1 text-brand-dark text-[11px] sm:text-xs font-black uppercase tracking-wider">
                <Crown size={13} className="text-brand-yellow" />
                <span>Service Sur-Mesure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight leading-tight">
                Pour vos déplacements, <br />
                <span className="text-brand-yellow">privatisez votre bus.</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                Tout le confort, rien que pour vous. Idéal pour les délégations officielles, séminaires d'entreprises, événements familiaux et associations.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 pt-1">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={15} className="text-brand-yellow shrink-0" />
                  <span>Flotte climatisée</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={15} className="text-brand-yellow shrink-0" />
                  <span>Wi-Fi & prises individuelles</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={15} className="text-brand-yellow shrink-0" />
                  <span>Équipage dédié</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={15} className="text-brand-yellow shrink-0" />
                  <span>Itinéraires flexibles</span>
                </div>
              </div>
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setPrivatizationModalOpen(true)}
                  className="bg-brand-dark hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all min-h-[44px]"
                >
                  <Crown size={15} className="text-brand-yellow" />
                  <span>Demander un devis VIP</span>
                </button>
                <a
                  href="tel:061671717"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl text-center transition-all flex items-center justify-center space-x-1.5 min-h-[44px]"
                >
                  <Phone size={14} className="text-brand-yellow" />
                  <span>Appel direct : 06 167 17 17</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stops & Network section */}
      <section className="py-12 sm:py-16 bg-brand-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-between mb-8">
            <div className="max-w-2xl space-y-2.5">
              <div className="inline-flex items-center space-x-1.5 bg-white/10 rounded-full px-3 py-1 text-brand-yellow text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <MapPin size={13} />
                <span>Arrêts Urbains & Proximité</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Montez & Descendez à bord <br />
                <span className="text-brand-yellow">près de chez vous.</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                Rejoignez nos autocars sans traverser toute la ville : des arrêts sécurisés au plus près de vos quartiers.
              </p>
            </div>
            <button
              onClick={() => setStopsModalOpen(true)}
              className="bg-brand-yellow text-brand-dark font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center space-x-2 min-h-[44px]"
            >
              <MapPin size={15} />
              <span>Voir la liste complète des arrêts</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-white flex items-center">
                  <MapPin size={15} className="text-brand-yellow mr-2" />
                  Pointe-Noire (8 Arrêts)
                </h3>
                <span className="text-[10px] bg-brand-yellow/20 text-brand-yellow px-2 py-0.5 rounded-full font-bold">
                  Siège 31 Juillet
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                <span className="bg-white/10 px-2 py-0.5 rounded-md">31 Juillet</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Ngoyo</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Nkouikou</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Siafoumou</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Pont Tié-Tié</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Mpaka</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-white flex items-center">
                  <MapPin size={15} className="text-brand-yellow mr-2" />
                  Brazzaville (7 Arrêts)
                </h3>
                <span className="text-[10px] bg-brand-yellow/20 text-brand-yellow px-2 py-0.5 rounded-full font-bold">
                  Gare Mpila
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Mpila</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Château d'Eau</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Mafouta</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Kintélé</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">La Tsiémé</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Moungali</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-yellow/20 via-brand-dark to-brand-dark border border-brand-yellow/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-brand-yellow flex items-center">
                  <Crown size={15} className="mr-2" />
                  Nouvelle Ligne Oyo
                </h3>
                <span className="text-[10px] bg-brand-yellow text-brand-dark px-2 py-0.5 rounded-full font-black uppercase">
                  Nouveau
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Liaison directe Brazzaville ⇄ Oyo avec escales à Ngo et Gamboma.
              </p>
              <div className="text-[11px] text-slate-300 pt-0.5">
                <span className="text-brand-yellow font-bold">Départs quotidiens</span> climatisés.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
            <span className="text-brand-yellow font-bold tracking-widest uppercase text-[11px] sm:text-xs block">
              Pourquoi Nzoko
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
              Plus qu'un voyage, un art de vivre.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-dark text-brand-yellow flex items-center justify-center mb-3.5 shadow-sm">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <h4 className="font-bold text-brand-dark text-sm sm:text-base mb-1.5">{feature.title}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-dark rounded-3xl p-7 sm:p-10 md:p-12 text-center shadow-2xl relative overflow-hidden text-white border border-brand-yellow/20">
            <div className="max-w-2xl mx-auto space-y-4">
              <NzokoElephantLogo size={42} className="mx-auto" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Prêt à voyager <span className="text-brand-yellow italic">na kimia</span> ?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-lg mx-auto leading-relaxed">
                Réservez votre place en ligne ou composez le numéro unique pour préparer votre départ en toute sérénité.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/booking"
                  className="bg-brand-yellow text-brand-dark font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-amber-400 transition-colors shadow-md flex items-center justify-center space-x-2 min-h-[44px]"
                >
                  <Ticket size={16} />
                  <span>Acheter un billet</span>
                </Link>
                <a
                  href="tel:061671717"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl border border-white/20 flex items-center justify-center space-x-2 transition-colors min-h-[44px]"
                >
                  <Phone size={15} className="text-brand-yellow" />
                  <span>06 167 17 17</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <StopsModal isOpen={stopsModalOpen} onClose={() => setStopsModalOpen(false)} />
      <BusPrivatizationModal
        isOpen={privatizationModalOpen}
        onClose={() => setPrivatizationModalOpen(false)}
      />
      <TombolaModal isOpen={tombolaModalOpen} onClose={() => setTombolaModalOpen(false)} />
    </div>
  );
}
