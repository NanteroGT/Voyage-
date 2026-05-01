import { Save, Upload } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, DocumentSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, handleFirestoreError, OperationType } from '../../lib/firebase';
import imageCompression from 'browser-image-compression';

interface HeroConfig {
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface CompanyConfig {
  name: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export default function Settings() {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    title: "Voyagez\nNa Kimia\nBozali Na NZOKO",
    subtitle: "Le confort, la fraîcheur, le Wi-Fi, la sécurité... Tout est pensé pour que chaque trajet soit un vrai moment de plaisir.",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=85&w=2500&auto=format&fit=crop"
  });
  const [companyConfig, setCompanyConfig] = useState<CompanyConfig>({
    name: "Nzoko Transport",
    slogan: "Confort, sécurité et ponctualité",
    phone: "+242 06 123 45 67",
    whatsapp: "242061234567",
    email: "contact@nzokotransport.com"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const heroSnap = await getDoc(doc(db, 'homepage_config', 'hero_main'));
        if (heroSnap.exists()) {
          setHeroConfig(heroSnap.data() as HeroConfig);
        }
        const companySnap = await getDoc(doc(db, 'homepage_config', 'company_info'));
        if (companySnap.exists()) {
          setCompanyConfig(companySnap.data() as CompanyConfig);
        }
      } catch (error) {
        console.warn("Could not load config from Firestore, keeping defaults.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);
      const storageRef = ref(storage, `homepage/hero_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error("Upload failed", error);
          setUploading(false);
          alert("Erreur lors de l'upload de l'image");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setHeroConfig(prev => ({ ...prev, imageUrl: downloadURL }));
          setUploading(false);
        }
      );
    } catch (error) {
      console.error("Image compression/upload error", error);
      setUploading(false);
      alert("Erreur lors de l'upload de l'image");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        setDoc(doc(db, 'homepage_config', 'hero_main'), { ...heroConfig }, { merge: true }),
        setDoc(doc(db, 'homepage_config', 'company_info'), { ...companyConfig }, { merge: true })
      ]);
      alert("Config sauvegardée !");
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'homepage_config');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 text-navy animate-spin mb-2" />
      <p className="text-gray-500">Chargement des paramètres...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8">
         <h1 className="text-2xl font-bold text-navy">Paramètres du site</h1>
         <p className="text-gray-500 mt-1 text-sm">Gérez les informations globales et le contenu de la page d'accueil.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <form className="p-6 sm:p-8" onSubmit={handleSave}>
          <div className="space-y-8">
            
            {/* Hero Section */}
            <div>
              <h3 className="text-lg font-bold text-navy border-b pb-2 mb-4">Section Hero (Accueil)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre (Utilisez \n pour les retours à la ligne)</label>
                  <textarea 
                    value={heroConfig.title}
                    onChange={(e) => setHeroConfig(prev => ({...prev, title: e.target.value}))}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
                  <textarea
                    value={heroConfig.subtitle}
                    onChange={(e) => setHeroConfig(prev => ({...prev, subtitle: e.target.value}))}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Image de fond</label>
                  <div className="flex items-center gap-4">
                    <img src={heroConfig.imageUrl} alt="Preview" className="h-20 w-32 object-cover rounded" />
                    <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90 text-sm">
                      <Upload className="w-4 h-4" />
                      {uploading ? 'Téléchargement...' : 'Changer l\'image'}
                      <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Infos Générales */}
            <div>
              <h3 className="text-lg font-bold text-navy border-b pb-2 mb-4 mt-8">Informations de l'Entreprise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'agence</label>
                  <input 
                    type="text" 
                    value={companyConfig.name}
                    onChange={e => setCompanyConfig({...companyConfig, name: e.target.value})}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slogan</label>
                  <input 
                    type="text" 
                    value={companyConfig.slogan}
                    onChange={e => setCompanyConfig({...companyConfig, slogan: e.target.value})}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  />
                </div>
              </div>
            </div>
            
            {/* Contacts */}
            <div>
              <h3 className="text-lg font-bold text-navy border-b pb-2 mb-4 mt-8">Coordonnées de Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numéro Téléphone / WhatsApp (Affichage)</label>
                  <input 
                    type="text" 
                    value={companyConfig.phone}
                    onChange={e => setCompanyConfig({...companyConfig, phone: e.target.value})}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  />
                  <p className="text-xs text-gray-500 mt-1">Ex: +242 06 123 45 67</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID WhatsApp (Ex: 242061234567)</label>
                  <input 
                    type="text" 
                    value={companyConfig.whatsapp}
                    onChange={e => setCompanyConfig({...companyConfig, whatsapp: e.target.value})}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
                  <input 
                    type="email" 
                    value={companyConfig.email}
                    onChange={e => setCompanyConfig({...companyConfig, email: e.target.value})}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-navy bg-gold hover:bg-[#E3BC53] flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
