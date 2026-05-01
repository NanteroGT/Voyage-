import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    url: '',
    caption: '',
    category: 'Bus'
  });

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
      setImages(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'gallery');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'gallery'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setShowForm(false);
      setFormData({ url: '', caption: '', category: 'Bus' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'gallery');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer cette image ?')) return;
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-navy animate-spin mb-2" />
        <p className="text-gray-500">Chargement de la galerie...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-navy">Gestion de la Galerie</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-navy text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1a2d5e] transition-colors flex items-center shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? 'Fermer' : 'Ajouter une photo'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-bold text-navy mb-4 border-b pb-2 flex items-center justify-between">
            Nouvelle Photo
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image (Lien direct)</label>
              <input 
                type="url" 
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                placeholder="https://images.unsplash.com/..." 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Légende</label>
              <input 
                type="text" 
                value={formData.caption}
                onChange={e => setFormData({...formData, caption: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                placeholder="Ex: Nouveau bus de luxe..." 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2"
              >
                <option value="Bus">Bus</option>
                <option value="Agence">Agence</option>
                <option value="Service">Service</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            
            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button" 
                disabled={isSubmitting}
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Annuler
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy hover:bg-[#1a2d5e] flex items-center"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.length > 0 ? images.map((image) => (
          <div key={image.id} className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden aspect-[4/3]">
            <img 
              src={image.url} 
              alt={image.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
              <div className="flex justify-end">
                <button 
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 shadow-sm"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-auto">
                <p className="text-white font-bold text-xs truncate leading-tight">{image.caption}</p>
                <p className="text-gold text-[10px] font-medium">{image.category}</p>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <ImageIcon className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Aucune image dans la galerie</p>
            <button 
              onClick={() => setShowForm(true)}
              className="mt-4 text-navy font-bold hover:underline"
            >
              Ajouter votre première photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
