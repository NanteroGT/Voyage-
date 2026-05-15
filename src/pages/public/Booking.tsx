import React, { useState } from 'react';
import { Bus, MapPin, Calendar, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

export default function Booking() {
  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    date: '',
    passengerName: '',
    passengerPhone: '',
    passengerEmail: ''
  });
  const [status, setStatus] = useState<null | 'success'>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'tickets'), {
        ...formData,
        status: 'En attente',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ departure: '', arrival: '', date: '', passengerName: '', passengerPhone: '', passengerEmail: '' });
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la réservation.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-brand-cream min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="bg-white p-12 rounded-[2rem] shadow-xl max-w-lg text-center border border-slate-100">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-brand-dark mb-4">Réservation Confirmée !</h2>
          <p className="text-slate-600 mb-8">
            Votre demande de réservation a bien été reçue. Un agent va vous contacter très prochainement pour procéder au paiement et valider votre billet.
          </p>
          <Link to="/" className="inline-block bg-brand-yellow text-brand-dark px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:-translate-y-1 transition-all">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 tracking-tight">Réserver un <span className="text-brand-yellow italic">billet</span></h1>
          <p className="text-slate-600 font-light text-lg max-w-2xl mx-auto">
            Remplissez les informations de votre voyage. Le paiement se fera de manière sécurisée ou en agence après validation par notre équipe.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <h3 className="text-xl font-bold text-brand-dark border-b border-slate-100 pb-4">1. Votre Trajet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Ville de départ</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-yellow" size={20} />
                  <select 
                    required
                    className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 appearance-none text-brand-dark"
                    value={formData.departure}
                    onChange={(e) => setFormData({...formData, departure: e.target.value})}
                  >
                    <option value="" disabled>Sélectionnez une ville</option>
                    <option value="Brazzaville">Brazzaville</option>
                    <option value="Pointe-Noire">Pointe-Noire</option>
                    <option value="Dolisie">Dolisie</option>
                    <option value="Nkayi">Nkayi</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Ville d'arrivée</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40" size={20} />
                  <select 
                    required
                    className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 appearance-none text-brand-dark"
                    value={formData.arrival}
                    onChange={(e) => setFormData({...formData, arrival: e.target.value})}
                  >
                    <option value="" disabled>Sélectionnez une ville</option>
                    <option value="Brazzaville">Brazzaville</option>
                    <option value="Pointe-Noire">Pointe-Noire</option>
                    <option value="Dolisie">Dolisie</option>
                    <option value="Nkayi">Nkayi</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Date de voyage</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40" size={20} />
                  <input 
                    type="date"
                    required
                    className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 text-brand-dark"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-brand-dark border-b border-slate-100 pb-4 pt-4">2. Vos Coordonnées</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40" size={20} />
                  <input 
                    type="text"
                    required
                    placeholder="Votre prénom et nom"
                    className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 text-brand-dark"
                    value={formData.passengerName}
                    onChange={(e) => setFormData({...formData, passengerName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40" size={20} />
                  <input 
                    type="tel"
                    required
                    placeholder="ex: +242 06 000 00 00"
                    className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 text-brand-dark"
                    value={formData.passengerPhone}
                    onChange={(e) => setFormData({...formData, passengerPhone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email (Optionnel)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40" size={20} />
                  <input 
                    type="email"
                    placeholder="votre.email@exemple.com"
                    className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 text-brand-dark"
                    value={formData.passengerEmail}
                    onChange={(e) => setFormData({...formData, passengerEmail: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center px-10 py-5 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-brand-yellow hover:text-brand-dark hover:-translate-y-1 hover:shadow-xl transition-all duration-500 disabled:opacity-50"
              >
                {loading ? 'Traitement...' : 'Confirmer la réservation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
