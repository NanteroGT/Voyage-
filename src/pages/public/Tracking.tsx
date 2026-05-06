import { Search, Package, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
}

interface PackageData {
  trackingId: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  weight: string;
  estimatedDelivery: string;
  currentStatus: 'pending' | 'in_transit' | 'customs' | 'out_for_delivery' | 'delivered';
  events: TrackingEvent[];
}

export default function Tracking() {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  
  const [trackingNumber, setTrackingNumber] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [packageData, setPackageData] = useState<PackageData | null>(null);

  useEffect(() => {
    if (initialCode) {
      handleSearch(initialCode);
    }
  }, [initialCode]);

  const handleSearch = async (codeToSearch: string) => {
    if (!codeToSearch.trim()) {
      setError('Veuillez entrer un numéro de suivi valide.');
      return;
    }
    
    setLoading(true);
    setError('');
    setPackageData(null);

    try {
      const docRef = doc(db, 'packages', codeToSearch.trim().toUpperCase());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPackageData({
          trackingId: docSnap.id,
          sender: data.sender || 'Non spécifié',
          receiver: data.receiver || 'Non spécifié',
          origin: data.origin || 'Non spécifié',
          destination: data.destination || 'Non spécifié',
          weight: data.weight || 'N/A',
          estimatedDelivery: data.estimatedDelivery || 'À déterminer',
          currentStatus: data.currentStatus || 'pending',
          events: data.events || []
        });
      } else {
        setError("Numéro de suivi introuvable. Veuillez vérifier et réessayer.");
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de la recherche. Code Firebase manquant ou erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'out_for_delivery': return 'bg-blue-500';
      case 'in_transit': return 'bg-amber-500';
      case 'customs': return 'bg-orange-500';
      default: return 'bg-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livré';
      case 'out_for_delivery': return 'En cours de livraison';
      case 'in_transit': return 'En transit';
      case 'customs': return 'En douane';
      default: return 'En attente';
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      {/* Search Header */}
      <div className="relative bg-brand-dark py-32 mb-16 overflow-hidden">
        <div className="absolute inset-0">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-yellow/10 to-transparent"></div>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
           <Package size={300} />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-brand-yellow font-semibold tracking-widest uppercase text-sm mb-4 block">Votre Expédition</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">Suivi de Colis</h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-12 font-light">
            Entrez votre numéro de suivi (ex: NZK-123) pour connaître l'état de l'acheminement de vos courriers ou colis.
          </p>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(trackingNumber); }}
            className="flex flex-col sm:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-2xl mx-auto rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-2 border border-white/20"
          >
            <div className="flex-1 flex items-center px-6 py-3 sm:py-0">
              <Search className="text-brand-yellow mr-4 shrink-0" size={24} />
              <input 
                type="text" 
                placeholder="Ex: NZK-123" 
                className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-lg uppercase font-bold tracking-widest"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-white text-brand-dark px-10 py-5 font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors disabled:opacity-70 flex items-center justify-center rounded-xl mt-2 sm:mt-0 text-sm shadow-xl"
            >
              {loading ? <span className="animate-pulse flex items-center"><Package className="mr-2" size={18}/> Recherche...</span> : "Rechercher"}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-[#EADBBB] border-l-4 border-brand-yellow p-6 rounded-r-xl shadow-sm mb-12 text-brand-dark text-lg font-medium">
            {error}
            <div className="mt-4 text-sm opacity-80 font-light">
               Remarque : Comme vous n'avez pas encore de vraies données, vous pouvez vous connecter en Admin pour créer un colis de test.
            </div>
          </div>
        )}

        {packageData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Panel Summary */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">N° de Suivi</p>
                    <h3 className="text-2xl font-bold text-brand-dark tracking-tight">{packageData.trackingId}</h3>
                  </div>
                  <div className={`px-4 py-1.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest shadow-sm ${getStatusColor(packageData.currentStatus)}`}>
                    {getStatusLabel(packageData.currentStatus)}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-slate-400 mr-4 mt-0.5 shrink-0" size={20} />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Origine</p>
                      <p className="font-semibold text-slate-800 text-lg">{packageData.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-brand-yellow mr-4 mt-0.5 shrink-0" size={20} />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destination</p>
                      <p className="font-semibold text-slate-800 text-lg">{packageData.destination}</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-start">
                      <Calendar className="text-slate-400 mr-4 mt-0.5 shrink-0" size={20} />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Livraison Estimée</p>
                        <p className="font-semibold text-brand-dark text-lg">{packageData.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8">
                <h4 className="font-bold text-brand-dark mb-6 pb-4 border-b border-slate-100 text-xl tracking-tight">Détails de l'envoi</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-light">Expéditeur</span>
                    <span className="font-semibold text-slate-900">{packageData.sender}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 py-2 -mx-4 px-4 rounded-lg">
                    <span className="text-slate-500 font-light">Destinataire</span>
                    <span className="font-semibold text-slate-900">{packageData.receiver}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-light">Poids</span>
                    <span className="font-semibold text-slate-900 bg-brand-cream text-brand-dark px-3 py-1 rounded-full text-xs">{packageData.weight}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-10 h-full">
                <h3 className="text-2xl font-bold text-brand-dark mb-10 border-b border-slate-100 pb-6 flex items-center tracking-tight">
                  <Clock className="mr-4 text-brand-yellow" size={28} />
                  Historique d'expédition
                </h3>

                <div className="relative border-l-2 border-slate-100 ml-5 space-y-10">
                  {packageData.events && packageData.events.length > 0 ? (
                    packageData.events.map((event, index) => (
                      <div key={index} className="relative pl-10">
                        <span className={`absolute -left-3 top-1.5 h-6 w-6 rounded-full ring-8 ring-white shadow-sm flex items-center justify-center ${index === 0 ? 'bg-brand-yellow' : 'bg-slate-200'}`}>
                           {index === 0 && <span className="w-2 h-2 bg-white rounded-full"></span>}
                        </span>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h4 className="text-xl font-bold text-brand-dark">{event.status}</h4>
                          <span className="text-sm font-semibold text-brand-yellow bg-brand-cream px-3 py-1 rounded-lg mt-2 sm:mt-0">{event.date} à {event.time}</span>
                        </div>
                        <p className="text-slate-600 font-light mb-4 text-lg">{event.description}</p>
                        <div className="flex items-center text-sm font-medium text-slate-400 uppercase tracking-widest text-[10px]">
                          <MapPin size={14} className="mr-2 text-slate-300" /> {event.location}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 italic pl-10 font-light">Aucun événement enregistré.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
