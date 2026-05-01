import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Loader2, Save } from 'lucide-react';

export default function SiteSettingsAdmin() {
  const [settings, setSettings] = useState({
    phone: '',
    whatsapp: '',
    heroTitle: '',
    heroSubtitle: '',
    heroImageUrl: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'site_settings', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data() as any);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await setDoc(doc(db, 'site_settings', 'main'), settings);
    alert('Enregistré!');
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Paramètres du Site</h2>
      <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Téléphone" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})}/>
        <input className="w-full p-2 border rounded" placeholder="WhatsApp" value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})}/>
        <input className="w-full p-2 border rounded" placeholder="Titre Hero" value={settings.heroTitle} onChange={e => setSettings({...settings, heroTitle: e.target.value})}/>
        <input className="w-full p-2 border rounded" placeholder="Sous-titre Hero" value={settings.heroSubtitle} onChange={e => setSettings({...settings, heroSubtitle: e.target.value})}/>
        <input className="w-full p-2 border rounded" placeholder="URL Image Hero" value={settings.heroImageUrl} onChange={e => setSettings({...settings, heroImageUrl: e.target.value})}/>
        <button className="bg-navy text-white px-4 py-2 rounded flex items-center"><Save className="w-4 h-4 mr-2" /> Enregistrer</button>
      </form>
    </div>
  );
}
