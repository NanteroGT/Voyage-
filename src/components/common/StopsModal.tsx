import React, { useState } from 'react';
import { X, Phone, MapPin, Bus, Route } from 'lucide-react';
import NzokoElephantLogo from './NzokoElephantLogo';

interface StopsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StopsModal({ isOpen, onClose }: StopsModalProps) {
  const [activeTab, setActiveTab] = useState<'pointe-noire' | 'brazzaville' | 'interurbain'>('pointe-noire');

  if (!isOpen) return null;

  const pointeNoireStops = [
    { name: 'Agence du 31 Juillet', type: 'Gare Principale', desc: 'Rond-point du 31 Juillet, Centre-ville', badge: 'VIP & Standard' },
    { name: 'Agence de Ngoyo', type: 'Guichet', desc: 'Avenue principale Ngoyo' },
    { name: 'Agence de Nkouikou', type: 'Guichet', desc: 'Grand marché Nkouikou' },
    { name: 'Agence de Siafoumou', type: 'Guichet', desc: 'Carrefour Siafoumou' },
    { name: 'Agence de Tié-Tié', type: 'Guichet', desc: 'Zone commerciale Tié-Tié' },
    { name: 'Agence de Mpaka', type: 'Guichet', desc: 'Avenue principale Mpaka' },
    { name: 'Agence de Vindoulou', type: 'Guichet', desc: 'Sortie Nord RN1' },
  ];

  const brazzavilleStops: { name: string; type: string; desc: string; badge?: string }[] = [
    { name: 'Agence de Mpila', type: 'Gare Centrale', desc: 'Quartier Mpila, proximité port fluvial', badge: 'VIP & Standard' },
    { name: "Agence de Château d'Eau", type: 'Guichet', desc: "Rond-point Château d'eau, Makélékélé" },
    { name: 'Agence de La Tsiémé', type: 'Guichet', desc: 'Talangaï / La Tsiémé' },
    { name: 'Agence de Moungali', type: 'Guichet', desc: 'Arrondissement 4 Moungali' },
    { name: 'Agence de Mafouta', type: 'Guichet', desc: 'Sortie Sud RN1' },
    { name: 'Agence de Kintélé', type: 'Guichet', desc: 'Axe Nord RN2' },
    { name: 'Agence de Nkombo', type: 'Guichet', desc: 'Rond-point Nkombo' },
  ];

  const interurbanLines = [
    {
      name: 'Ligne Brazzaville ⇄ Oyo',
      desc: 'Nouvelle ligne directe via Viaduc de Brazzaville',
      stops: ['Brazzaville', 'Arrêt Ngo', 'Arrêt Gamboma', 'Oyo Gare'],
      badge: 'NOUVEAU',
    },
    {
      name: 'Ligne Pointe-Noire ⇄ Brazzaville',
      desc: 'Liaison quotidienne confort & VIP (RN1)',
      stops: ['Pointe-Noire', 'Dolisie (Carrefour)', 'Nkayi', 'Brazzaville'],
      badge: 'Ligne Phare',
    },
    {
      name: 'Dolisie',
      desc: 'Agence centrale Quartier Capable',
      stops: ['Guichet billetterie & fret colis'],
    },
    {
      name: 'Nkayi',
      desc: 'Agence Quartier Le Village',
      stops: ['Guichet billetterie & fret colis'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-brand-dark/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-brand-yellow/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-dark text-white p-5 sm:p-6 relative overflow-hidden shrink-0">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10 mb-3">
            <div className="flex items-center space-x-3">
              <NzokoElephantLogo size={32} />
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-yellow font-bold block">
                  Réseau National
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Montez & Descendez près de chez vous
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
            Retrouvez tous les arrêts et points d'embarquement officiels Nzoko Transport au plus près de votre domicile.
          </p>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/30 rounded-xl mt-4 relative z-10">
            <button
              onClick={() => setActiveTab('pointe-noire')}
              className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'pointe-noire'
                  ? 'bg-brand-yellow text-brand-dark shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Pointe-Noire (8)
            </button>
            <button
              onClick={() => setActiveTab('brazzaville')}
              className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'brazzaville'
                  ? 'bg-brand-yellow text-brand-dark shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Brazzaville (7)
            </button>
            <button
              onClick={() => setActiveTab('interurbain')}
              className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'interurbain'
                  ? 'bg-brand-yellow text-brand-dark shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Lignes & Villes
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-slate-50">
          {activeTab === 'pointe-noire' && (
            <div className="space-y-2.5">
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-center space-x-3 text-xs text-amber-900 font-medium">
                <Bus size={18} className="text-brand-yellow shrink-0" />
                <span>Nos bus desservent quotidiennement tous les points ci-dessous pour faciliter vos départs et arrivées.</span>
              </div>
              {pointeNoireStops.map((stop, i) => (
                <div
                  key={i}
                  className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/70 shadow-sm flex items-start justify-between space-x-3 hover:border-brand-yellow/50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-brand-cream text-brand-yellow shrink-0 mt-0.5">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">{stop.name}</h4>
                        {stop.badge && (
                          <span className="text-[10px] font-bold bg-brand-dark text-brand-yellow px-2 py-0.5 rounded-full">
                            {stop.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-light mt-0.5">{stop.desc}</p>
                      <span className="text-[10px] text-brand-dark font-semibold uppercase tracking-wider block mt-1">
                        {stop.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'brazzaville' && (
            <div className="space-y-2.5">
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-center space-x-3 text-xs text-amber-900 font-medium">
                <Bus size={18} className="text-brand-yellow shrink-0" />
                <span>Embarquement et débarquement stratégiques à travers tous les arrondissements de Brazzaville.</span>
              </div>
              {brazzavilleStops.map((stop, i) => (
                <div
                  key={i}
                  className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/70 shadow-sm flex items-start justify-between space-x-3 hover:border-brand-yellow/50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-brand-cream text-brand-yellow shrink-0 mt-0.5">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">{stop.name}</h4>
                        {stop.badge && (
                          <span className="text-[10px] font-bold bg-brand-dark text-brand-yellow px-2 py-0.5 rounded-full">
                            {stop.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-light mt-0.5">{stop.desc}</p>
                      <span className="text-[10px] text-brand-dark font-semibold uppercase tracking-wider block mt-1">
                        {stop.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'interurbain' && (
            <div className="space-y-3">
              {interurbanLines.map((line, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-brand-dark text-sm sm:text-base flex items-center">
                      <Route size={16} className="mr-2 text-brand-yellow" />
                      {line.name}
                    </h4>
                    {line.badge && (
                      <span className="text-[10px] font-bold bg-brand-yellow text-brand-dark px-2 py-0.5 rounded-full uppercase">
                        {line.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-light">{line.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {line.stops.map((stop, sIndex) => (
                      <span
                        key={sIndex}
                        className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md border border-slate-200/60"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <a
            href="tel:061671717"
            className="flex-1 bg-brand-dark text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-slate-800 transition-colors"
          >
            <Phone size={14} className="text-brand-yellow" />
            <span>Appeler le 06 167 17 17</span>
          </a>
          <button
            onClick={onClose}
            className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
