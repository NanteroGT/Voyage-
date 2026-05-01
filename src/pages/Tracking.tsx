import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package as PackageIcon, Search, CheckCircle, Clock, Truck, Loader2, AlertCircle } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PackageData {
  trackingNumber: string;
  status: 'En attente' | 'En transit' | 'Livré';
  sender: string;
  receiver: string;
}

export default function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PackageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const q = query(collection(db, 'packages'), where('trackingNumber', '==', trackingNumber.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setResult(querySnapshot.docs[0].data() as PackageData);
      } else {
        setError("Aucun colis trouvé avec ce numéro de suivi. Veuillez vérifier et réessayer.");
      }
    } catch (err) {
      console.error("Tracking search error:", err);
      setError("Une erreur est survenue lors de la recherche. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = result?.status;

  return (
    <div className="min-h-screen bg-navy flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow bg-gray-50 flex items-center py-20">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 px-4">
            <h2 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold mb-2">
              Suivi de colis
            </h2>
            <p className="text-lg md:text-3xl font-heading font-bold text-navy">
              Où est votre expédition ?
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <PackageIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Entrez votre numéro de suivi (ex: NZK-12345)"
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-navy focus:border-navy text-lg transition-colors outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-navy text-gold px-8 py-4 rounded-xl font-bold hover:bg-[#1a2d5e] transition-colors flex items-center justify-center flex-shrink-0 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5 mr-2" />}
                  Rechercher
                </button>
              </div>
            </form>

            {error && (
              <div className="flex items-center text-red-600 bg-red-50 p-4 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {result && (
              <div className="pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-start mb-8">
                   <div>
                     <h3 className="text-lg font-bold text-navy">Statut actuel</h3>
                     <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mt-1">N° {result.trackingNumber}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-gray-400">Destinataire</p>
                     <p className="text-sm font-bold text-navy">{result.receiver}</p>
                   </div>
                </div>
                
                <div className="relative pl-8 border-l-2 border-gray-100 space-y-12">
                  <div className="relative">
                    <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white ${currentStatus === 'En attente' || currentStatus === 'En transit' || currentStatus === 'Livré' ? 'bg-gold animate-pulse' : 'bg-gray-200'}`}></div>
                    <div>
                      <h4 className={`text-base font-bold ${currentStatus === 'En attente' || currentStatus === 'En transit' || currentStatus === 'Livré' ? 'text-navy' : 'text-gray-400'}`}>Colis en Agence</h4>
                      <p className="text-sm text-gray-500">Colis enregistré et prêt pour l'envoi</p>
                    </div>
                  </div>

                  <div className="relative">
                     <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white ${currentStatus === 'En transit' || currentStatus === 'Livré' ? 'bg-gold' : 'bg-gray-200'}`}></div>
                     {currentStatus === 'En transit' && <div className="absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white bg-gold animate-ping"></div>}
                     <div>
                      <h4 className={`text-base font-bold ${currentStatus === 'En transit' || currentStatus === 'Livré' ? 'text-navy' : 'text-gray-400'}`}>En Transit</h4>
                      <p className="text-sm text-gray-500">Colis en cours de route vers Brazzaville/Pointe-Noire</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white ${currentStatus === 'Livré' ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-gray-200'}`}></div>
                    <div>
                      <h4 className={`text-base font-bold ${currentStatus === 'Livré' ? 'text-navy' : 'text-gray-400'}`}>Livré & Récupéré</h4>
                      <p className="text-sm text-gray-500">Colis mis à disposition et retiré par le destinataire</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
