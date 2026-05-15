import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Settings as SettingsIcon, Save } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState<any>({
    phone: '',
    whatsapp: '',
    heroTitle: '',
    heroSubtitle: '',
    heroImageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    const docRef = doc(db, 'site_settings', 'global');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSettings(docSnap.data());
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'site_settings', 'global'), {
        ...settings,
        updatedAt: serverTimestamp()
      });
      alert('Paramètres sauvegardés avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la sauvegarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Paramètres du site</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone principal</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                value={settings.phone || ''}
                onChange={e => setSettings({...settings, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                value={settings.whatsapp || ''}
                onChange={e => setSettings({...settings, whatsapp: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nom de l'agence</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                value={settings.name || ''}
                onChange={e => setSettings({...settings, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">URL Logo</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                value={settings.logoUrl || ''}
                onChange={e => setSettings({...settings, logoUrl: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Image Principale de l'Accueil (URL)</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                value={settings.heroImageUrl || ''}
                onChange={e => setSettings({...settings, heroImageUrl: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Titre de l'Accueil</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                value={settings.heroTitle || ''}
                onChange={e => setSettings({...settings, heroTitle: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Sous-titre de l'Accueil</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                value={settings.heroSubtitle || ''}
                onChange={e => setSettings({...settings, heroSubtitle: e.target.value})}
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
             <button
               type="submit"
               disabled={loading}
               className="bg-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center"
             >
               <Save size={20} className="mr-2" />
               {loading ? 'Sauvegarde...' : 'Sauvegarder'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
