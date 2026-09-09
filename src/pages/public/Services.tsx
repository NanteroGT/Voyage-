import React, { useState } from 'react';
import { Crown, Package, MapPin, CheckCircle2, ArrowRight, Phone, Car, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroBus, vipInterior } from '../../assets/images';
import StopsModal from '../../components/common/StopsModal';
import BusPrivatizationModal from '../../components/common/BusPrivatizationModal';
import TombolaModal from '../../components/common/TombolaModal';
import NzokoElephantLogo from '../../components/common/NzokoElephantLogo';

export default function Services() {
  const [stopsModalOpen, setStopsModalOpen] = useState(false);
  const [privatizationModalOpen, setPrivatizationModalOpen] = useState(false);
  const [tombolaModalOpen, setTombolaModalOpen] = useState(false);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <div className="relative bg-brand-dark pt-12 sm:pt-20 md:pt-28 pb-20 sm:pb-28 overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src={heroBus}
            alt="Flotte de bus Nzoko"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-brand-dark/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-2 sm:pt-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 mb-4">
            <NzokoElephantLogo size={20} />
            <span className="text-brand-yellow font-black text-xs tracking-widest uppercase">
              Gamme Complète
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-3 sm:mb-5 tracking-tight leading-tight">
            L'excellence de <br />
            <span className="text-brand-yellow">nos prestations.</span>
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Voyages réguliers, affrètement VIP, transport de colis ou concours exclusifs : découvrez l'ensemble des solutions de mobilité signées Nzoko Transport.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 pb-16 sm:pb-24 relative z-20 space-y-6 sm:space-y-8">
        {/* VIP Section */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full relative overflow-hidden">
            <img src={vipInterior} alt="Intérieur VIP Nzoko" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-brand-dark text-brand-yellow text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              Classe VIP & Confort
            </div>
          </div>
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
            <div className="flex items-center space-x-2 text-brand-yellow text-xs font-black uppercase tracking-widest">
              <Crown size={14} />
              <span>Haut de Gamme</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
              Voyage VIP Prestige
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Une expérience d'exception entre Brazzaville et Pointe-Noire : sièges inclinables grand format, espace aux jambes étendu, prises 220V et chargeurs USB à chaque place, climatisation feutrée et collation soignée servie par votre hôtesse de bord.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={15} className="text-brand-yellow shrink-0" />
                <span>Sièges ergonomiques cuir</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={15} className="text-brand-yellow shrink-0" />
                <span>Wi-Fi illimité à bord</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={15} className="text-brand-yellow shrink-0" />
                <span>Collation & rafraîchissement</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={15} className="text-brand-yellow shrink-0" />
                <span>Embarquement prioritaire</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/booking"
                className="inline-flex items-center bg-brand-yellow text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-sm"
              >
                <span>Réserver un siège VIP</span>
                <ArrowRight size={15} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2-Column: Privatisation & Tombola */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Privatisation */}
          <div className="bg-brand-dark text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 shadow-lg relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-10 text-brand-yellow pointer-events-none">
              <Car size={220} />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-yellow/20 text-brand-yellow flex items-center justify-center">
                <Car size={24} />
              </div>
              <span className="text-[10px] text-brand-yellow uppercase tracking-widest font-black block">
                Sur Devis Gratuit
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">Privatisation de Bus</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Affrétez un bus complet pour vos événements : séminaires d'entreprises, mariages, délégations officielles, pèlerinages religieux ou voyages de groupe personnalisés.
              </p>
            </div>
            <div className="pt-6 relative z-10 flex items-center space-x-3">
              <button
                onClick={() => setPrivatizationModalOpen(true)}
                className="bg-brand-yellow hover:bg-amber-400 text-brand-dark font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md"
              >
                Demander un devis
              </button>
              <a
                href="tel:061671717"
                className="text-xs text-slate-300 hover:text-white flex items-center space-x-1"
              >
                <Phone size={13} className="text-brand-yellow" />
                <span>06 167 17 17</span>
              </a>
            </div>
          </div>

          {/* Tombola */}
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-amber-200 shadow-lg relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-15 text-brand-yellow pointer-events-none">
              <Gift size={220} />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-yellow text-brand-dark flex items-center justify-center shadow-sm">
                <Gift size={24} />
              </div>
              <span className="text-[10px] text-brand-dark uppercase tracking-widest font-black block">
                Jeu Concours Mensuel
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-brand-dark">Grande Tombola Mensuelle</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                Une voiture Suzuki S-Presso mise en jeu chaque mois ! Achetez votre billet, ajoutez 1.000 FCFA pour participer au tirage au sort public retransmis en direct.
              </p>
            </div>
            <div className="pt-6 relative z-10 flex items-center space-x-3">
              <button
                onClick={() => setTombolaModalOpen(true)}
                className="bg-brand-dark hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md"
              >
                Règlement & Détails
              </button>
              <Link to="/booking" className="text-xs text-brand-dark font-bold hover:underline">
                Acheter mon ticket
              </Link>
            </div>
          </div>
        </div>

        {/* 2-Column: Colis & Arrêts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-yellow flex items-center justify-center">
                <Package size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-dark">Courrier & Fret Express</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                Acheminement rapide de vos plis confidentiels, cartons et marchandises entre nos différentes agences avec suivi par numéro de colis sécurisé.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/tracking"
                className="inline-flex items-center text-xs font-bold text-brand-dark hover:text-brand-yellow uppercase tracking-wider"
              >
                <span>Accéder au suivi colis</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-yellow flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-dark">Réseau d'Arrêts Urbains</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                Montez et descendez au plus près de votre lieu de résidence : Ngoyo, Nkouikou, Siafoumou, Mpaka, Tié-Tié, Mafouta, Château d'Eau, Kintélé...
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setStopsModalOpen(true)}
                className="inline-flex items-center text-xs font-bold text-brand-dark hover:text-brand-yellow uppercase tracking-wider"
              >
                <span>Consulter la carte des arrêts</span>
                <ArrowRight size={14} className="ml-1.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hotline CTA */}
        <div className="bg-brand-dark rounded-3xl p-6 sm:p-10 text-center shadow-xl text-white border border-white/10 space-y-4">
          <NzokoElephantLogo size={36} className="mx-auto" />
          <h3 className="text-xl sm:text-3xl font-black text-white">Besoin d'une information immédiate ?</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto">
            Notre centre de relation client vous accueille au numéro unique officiel <strong>06 167 17 17</strong> 7j/7.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:061671717"
              className="w-full sm:w-auto bg-brand-yellow text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-md flex items-center justify-center space-x-2"
            >
              <Phone size={15} />
              <span>Appeler le 06 167 17 17</span>
            </a>
            <Link
              to="/booking"
              className="w-full sm:w-auto bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-center"
            >
              Réserver en ligne
            </Link>
          </div>
        </div>
      </div>

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
