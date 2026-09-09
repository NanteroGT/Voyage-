import React from 'react';
import { X, Ticket, Gift, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tombolaCar } from '../../assets/images';

interface TombolaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TombolaModal({ isOpen, onClose }: TombolaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-brand-dark/85 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-brand-yellow/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with car photo */}
        <div className="relative bg-brand-dark text-white p-5 sm:p-6 overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-40">
            <img
              src={tombolaCar}
              alt="Voiture Suzuki S-Presso"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-brand-dark/60"></div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <div className="inline-flex items-center space-x-2 bg-brand-yellow/20 border border-brand-yellow/50 rounded-full px-3 py-1">
              <Gift size={13} className="text-brand-yellow" />
              <span className="text-[10px] uppercase tracking-widest text-brand-yellow font-black">
                Grand Jeu Concours
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-tight">
              1 Voiture à gagner <br />
              <span className="text-brand-yellow">tous les mois !</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
              Une magnifique Suzuki S-Presso neuve mise en jeu pour récompenser la fidélité de nos voyageurs.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-50 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center">
              <Sparkles size={16} className="text-brand-yellow mr-2" />
              Comment participer ? C'est très simple :
            </h4>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-brand-dark text-brand-yellow font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Achetez votre billet de voyage</h5>
                  <p className="text-xs text-slate-500 font-light">
                    Valable sur tous les trajets (Brazzaville ⇄ Pointe-Noire, Oyo, Dolisie, Nkayi) en agence ou en ligne.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-brand-yellow text-brand-dark font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Ajoutez seulement 1.000 FCFA</h5>
                  <p className="text-xs text-slate-500 font-light">
                    Demandez votre option Tombola au guichet ou cochez l'option lors de votre réservation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Recevez votre ticket de tombola sécurisé</h5>
                  <p className="text-xs text-slate-500 font-light">
                    Votre numéro unique participe automatiquement au grand tirage au sort mensuel en direct.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-dark text-white p-4 rounded-2xl flex items-center space-x-3.5 border border-white/10">
            <div className="p-3 bg-red-500/20 text-red-400 rounded-xl shrink-0 flex flex-col items-center">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mb-1"></span>
              <span className="text-[9px] font-black uppercase">LIVE</span>
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Tirage au sort retransmis en direct</h5>
              <p className="text-xs text-slate-300 font-light mt-0.5">
                Chaque fin de mois en direct sur nos pages officielles <strong>@nzoko.transport</strong> (Facebook & TikTok) sous contrôle d'huissier.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <Link
            to="/booking"
            onClick={onClose}
            className="w-full sm:flex-1 bg-brand-yellow hover:bg-amber-400 text-brand-dark py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest text-center shadow-md flex items-center justify-center space-x-2"
          >
            <Ticket size={16} />
            <span>Réserver mon billet + Tombola</span>
          </Link>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
