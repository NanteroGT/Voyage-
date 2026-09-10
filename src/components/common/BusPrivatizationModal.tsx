import React, { useState } from 'react';
import { X, Phone, CheckCircle, Send, Wifi, Zap, Tv, Coffee, UserCheck, Wind } from 'lucide-react';
import NzokoElephantLogo from './NzokoElephantLogo';
import { vipInterior } from '../../assets/images';

interface BusPrivatizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BusPrivatizationModal({ isOpen, onClose }: BusPrivatizationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'Entreprise & Séminaire',
    departure: 'Brazzaville',
    destination: 'Pointe-Noire',
    passengers: '30-50 personnes (Grand Bus Confort)',
    date: '',
    details: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const vipFeatures = [
    { icon: Wind, label: 'Climatisation intégrale' },
    { icon: Wifi, label: 'Wi-Fi haut débit à bord' },
    { icon: Zap, label: 'Prises 220V & chargeurs USB' },
    { icon: Tv, label: 'Écrans multimédia HD' },
    { icon: Coffee, label: 'Service boisson & collation' },
    { icon: UserCheck, label: 'Hôtesse & Chauffeur dédié' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-brand-dark/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-brand-yellow/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with VIP banner */}
        <div className="relative bg-brand-dark text-white p-5 sm:p-6 overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-25">
            <img src={vipInterior} alt="Intérieur VIP" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/80"></div>

          <div className="relative z-10 flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2.5">
              <NzokoElephantLogo size={32} />
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-yellow font-bold block">
                  Service Exclusif VIP
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Privatisez votre bus Nzoko
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-light relative z-10">
            Tout le confort, rien que pour vous. Déplacements d'entreprises, mariages, événements officiels ou voyages de groupe sur-mesure.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 relative z-10">
            {vipFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center space-x-1.5 text-[11px] text-slate-200 bg-white/10 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10"
                >
                  <Icon size={13} className="text-brand-yellow shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content / Form */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-50">
          {submitted ? (
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Demande envoyée avec succès !</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto font-light leading-relaxed">
                Notre cellule VIP et affrètement a bien reçu votre demande. Un conseiller vous contactera sous 2 heures avec une proposition détaillée.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="tel:061671717"
                  className="bg-brand-dark text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                >
                  <Phone size={14} className="text-brand-yellow" />
                  <span>Joindre le 06 167 17 17</span>
                </a>
                <button
                  onClick={onClose}
                  className="bg-slate-200 text-slate-700 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nom ou Raison Sociale *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Entreprise S.A. ou M. Kouka"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Téléphone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: +242 06 123 45 67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Type d'événement
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  >
                    <option>Entreprise & Séminaire</option>
                    <option>Mariage & Famille</option>
                    <option>Délégation Officielle</option>
                    <option>Tourisme & Loisir</option>
                    <option>Sport & Association</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ville de Départ
                  </label>
                  <select
                    value={formData.departure}
                    onChange={(e) => {
                      const newDep = e.target.value;
                      const newDest = formData.destination === newDep ? (newDep === 'Brazzaville' ? 'Pointe-Noire' : 'Brazzaville') : formData.destination;
                      setFormData({ ...formData, departure: newDep, destination: newDest });
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  >
                    <option>Brazzaville</option>
                    <option>Pointe-Noire</option>
                    <option>Oyo</option>
                    <option>Dolisie</option>
                    <option>Nkayi</option>
                    <option>Autre ville</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Destination
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  >
                    {['Pointe-Noire', 'Brazzaville', 'Oyo', 'Dolisie', 'Nkayi', 'Circuit sur mesure']
                      .filter(dest => dest !== formData.departure)
                      .map(dest => (
                        <option key={dest}>{dest}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Date souhaitée *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nombre estimé de passagers
                  </label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  >
                    <option>10-25 personnes (Minibus VIP)</option>
                    <option>30-50 personnes (Grand Bus Confort)</option>
                    <option>50+ personnes (Flotte multiple)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Précisions complémentaires (Optionnel)
                </label>
                <textarea
                  rows={2}
                  placeholder="Itinéraire spécifique, pauses prévues, besoins traiteur..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-yellow hover:bg-amber-400 text-brand-dark py-3.5 px-6 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
              >
                <Send size={15} />
                <span>Demander mon devis VIP gratuit</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-light">Besoin urgent ? Contactez directement la cellule affrètement :</span>
          <a
            href="tel:061671717"
            className="font-bold text-brand-dark hover:text-brand-yellow flex items-center"
          >
            <Phone size={12} className="mr-1 text-brand-yellow" /> 06 167 17 17
          </a>
        </div>
      </div>
    </div>
  );
}
