import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate WhatsApp Business API call or redirect
    const text = `Bonjour, je suis ${formData.name}. Mon email: ${formData.email}. Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/242061234567?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="bg-navy py-20 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-white mb-4">Contactez-nous</h2>
            <div className="w-16 h-1 bg-gold mb-8 rounded"></div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Notre service client est à votre disposition pour toute demande de renseignement ou réservation. Remplissez le formulaire et nous vous répondrons via WhatsApp.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4 border border-gold/20 flex-shrink-0">
                  <Phone className="text-gold h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Téléphone / WhatsApp</p>
                  <p className="text-white font-medium">+242 06 123 45 67</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4 border border-gold/20 flex-shrink-0">
                  <Mail className="text-gold h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">contact@nzokotransport.com</p>
                </div>
              </div>

               <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4 border border-gold/20 flex-shrink-0">
                  <MapPin className="text-gold h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Siège Social</p>
                  <p className="text-white font-medium">Avenue de Gaulle, Pointe-Noire</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-navy mb-6">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresse Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                      placeholder="jean@exemple.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Votre Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-navy focus:ring-1 focus:ring-navy resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gold text-navy font-bold text-lg py-4 rounded-lg hover:bg-[#E3BC53] transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer par WhatsApp
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
