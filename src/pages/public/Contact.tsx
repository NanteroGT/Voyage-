import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Bus, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<null | 'success'>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Immersive Header */}
      <div className="relative bg-brand-dark pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80" 
            alt="Contact Background" 
            className="w-full h-full object-cover opacity-10 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-cream"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
            <span className="text-brand-cream font-medium text-sm tracking-widest uppercase">Assistance Globale 24/7</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Nous sommes à <span className="text-brand-yellow italic">votre écoute.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto font-light">
            Une question, un devis ou une réservation ? L'excellence de notre service client est à votre disposition.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Bento-style Contact Info */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            
            {/* Main Info Card */}
            <div className="bg-brand-dark rounded-[2rem] p-10 relative overflow-hidden text-white sm:col-span-2 lg:col-span-1 shadow-2xl shadow-brand-dark/20 border border-white/10">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-10 pointer-events-none">
                 <Bus size={200} />
              </div>
              <h3 className="text-3xl font-bold mb-8 tracking-tight">Siège Social</h3>
              <div className="flex items-start mb-8">
                <div className="bg-brand-yellow/10 p-4 rounded-2xl text-brand-yellow mr-5 shrink-0">
                  <MapPin size={28} strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h4 className="font-semibold text-brand-yellow text-sm uppercase tracking-widest mb-2">Adresse Principale</h4>
                  <p className="text-slate-300 font-light text-lg">Rond-point du 31 Juillet<br/>Pointe-Noire, Congo</p>
                </div>
              </div>
            </div>

            {/* Sub Info Card: Phone */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-[0_10px_40px_rgba(10,28,39,0.05)] hover:shadow-[0_20px_50px_rgba(10,28,39,0.08)] transition-all flex items-center">
               <div className="bg-brand-cream p-4 rounded-2xl text-brand-dark mr-5 shrink-0">
                  <Phone size={24} strokeWidth={1.5} />
               </div>
               <div>
                  <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Téléphone</h4>
                  <p className="text-brand-dark font-semibold text-lg">+242 06 167 1X XX</p>
               </div>
            </div>

            {/* Sub Info Card: Email */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-[0_10px_40px_rgba(10,28,39,0.05)] hover:shadow-[0_20px_50px_rgba(10,28,39,0.08)] transition-all flex items-center">
               <div className="bg-brand-cream p-4 rounded-2xl text-brand-dark mr-5 shrink-0">
                  <Mail size={24} strokeWidth={1.5} />
               </div>
               <div>
                  <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Courriel</h4>
                  <p className="text-brand-dark font-semibold text-base sm:text-lg">contact@nzokotransport.com</p>
               </div>
            </div>

            {/* Sub Info Card: Hours */}
            <div className="sm:col-span-2 lg:col-span-1 bg-brand-yellow rounded-[2rem] p-8 border border-brand-yellow shadow-xl shadow-brand-yellow/20 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
               <div className="bg-white/30 p-4 rounded-2xl text-brand-dark mb-4 sm:mb-0 sm:mr-5 shrink-0">
                  <Clock size={28} strokeWidth={1.5} />
               </div>
               <div className="pt-1">
                  <h4 className="font-bold text-brand-dark/70 text-xs uppercase tracking-widest mb-2">Horaires d'Ouverture</h4>
                  <p className="text-brand-dark font-bold text-lg">Lundi - Dimanche : 05h00 - 18h00</p>
               </div>
            </div>
            
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 sm:p-14 border border-slate-100 h-full">
              <h3 className="text-3xl font-bold text-brand-dark mb-2 tracking-tight">Envoyez-nous un message</h3>
              <p className="text-slate-500 font-light mb-10">Remplissez le formulaire ci-dessous, notre équipe vous répondra le plus rapidement possible.</p>
              
              {status === 'success' && (
                <div className="bg-[#EADBBB] border-l-4 border-brand-yellow p-6 mb-10 rounded-r-2xl flex items-start">
                  <div className="bg-brand-yellow p-2 rounded-full text-brand-dark mr-4 shrink-0 mt-0.5">
                    <Send size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark text-lg mb-1">Message envoyé avec succès !</p>
                    <p className="text-slate-700 font-light">Notre équipe vient de recevoir votre demande et vous contactera très prochainement.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Nom complet</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 hover:bg-slate-50 placeholder:text-slate-300 text-brand-dark"
                      value={formData.name}
                      placeholder="Jean Dupont"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 hover:bg-slate-50 placeholder:text-slate-300 text-brand-dark"
                      value={formData.email}
                      placeholder="jean@exemple.com"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Téléphone</label>
                    <input 
                      type="tel" 
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 hover:bg-slate-50 placeholder:text-slate-300 text-brand-dark"
                      value={formData.phone}
                      placeholder="+242 xx xxx xxxx"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Objet de la demande</label>
                    <select 
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 hover:bg-slate-50 text-brand-dark appearance-none cursor-pointer"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option value="" disabled className="text-slate-400">Sélectionnez un sujet</option>
                      <option value="Réservation billet">🚄 Réservation de billet</option>
                      <option value="Information trajet">📍 Information sur un trajet</option>
                      <option value="Suivi de colis">📦 Suivi de colis / Fret</option>
                      <option value="Location de bus">🚌 Location de bus privé</option>
                      <option value="Réclamation">⚠️ Réclamation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Votre Message</label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 outline-none transition-all font-light bg-slate-50/50 hover:bg-slate-50 resize-none placeholder:text-slate-300 text-brand-dark"
                    value={formData.message}
                    placeholder="Détaillez votre demande ici..."
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full flex justify-center items-center px-10 py-5 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-brand-yellow hover:text-brand-dark hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 group"
                  >
                    <span>Envoyer la demande</span>
                    <Send className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
