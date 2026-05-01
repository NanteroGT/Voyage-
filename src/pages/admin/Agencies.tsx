import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

interface Agency {
  id: string;
  city: string;
  address: string;
  quartier: string;
  phone: string;
  whatsapp: string;
}

export default function Agencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);

  const [formData, setFormData] = useState({
    city: '',
    address: '',
    quartier: '',
    phone: '',
    whatsapp: '',
  });

  useEffect(() => {
    const q = query(collection(db, 'agencies'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Agency));
      setAgencies(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'agencies');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingAgency) {
        await updateDoc(doc(db, 'agencies', editingAgency.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'agencies'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setShowForm(false);
      setEditingAgency(null);
      setFormData({ city: '', address: '', quartier: '', phone: '', whatsapp: '' });
    } catch (error) {
      handleFirestoreError(error, editingAgency ? OperationType.UPDATE : OperationType.CREATE, 'agencies');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (agency: Agency) => {
    setEditingAgency(agency);
    setFormData({
      city: agency.city,
      address: agency.address,
      quartier: agency.quartier,
      phone: agency.phone || '',
      whatsapp: agency.whatsapp || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer cette agence ?')) return;
    try {
      await deleteDoc(doc(db, 'agencies', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `agencies/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-navy animate-spin mb-2" />
        <p className="text-gray-500">Chargement des agences...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
         <h1 className="text-2xl font-bold text-navy">Gestion des Agences</h1>
         <button 
           onClick={() => {
             setEditingAgency(null);
             setFormData({ city: '', address: '', quartier: '' });
             setShowForm(!showForm);
           }}
           className="bg-navy text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1a2d5e] transition-colors flex items-center shadow-sm"
         >
           <Plus className="w-4 h-4 mr-2" />
           {showForm ? 'Fermer' : 'Nouvelle agence'}
         </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-bold text-navy mb-4 border-b pb-2 flex items-center justify-between">
            {editingAgency ? 'Modifier l\'agence' : 'Ajouter une agence'}
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                &times;
            </button>
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input 
                type="text" 
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                placeholder="Ex: Dolisie" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
              <input 
                type="text" 
                value={formData.quartier}
                onChange={e => setFormData({...formData, quartier: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                placeholder="Ex: Centre" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                placeholder="+242 06..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID WhatsApp (ex: 24206...)</label>
              <input 
                type="text" 
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                placeholder="24206..." 
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                placeholder="Ex: Rue 123..." 
                required 
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-2 pt-4 border-t">
              <button 
                type="button" 
                disabled={isSubmitting}
                onClick={() => { setShowForm(false); setEditingAgency(null); }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Annuler
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-navy bg-gold hover:bg-[#E3BC53] flex items-center"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingAgency ? 'Mettre à jour' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quartier</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Adresse</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agencies.length > 0 ? agencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-navy">{agency.city}</div>
                    <div className="text-xs text-gray-500 sm:hidden mt-1">{agency.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 bg-gray-100 inline-block px-2 py-1 rounded">{agency.quartier}</div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="text-sm text-gray-600">{agency.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm border-gray-200">
                    <div className="flex justify-end gap-3">
                       <button 
                         onClick={() => handleEdit(agency)}
                         className="text-navy hover:text-gold transition-colors p-1" 
                         title="Modifier"
                       >
                         <Edit2 className="w-4 h-4" />
                       </button>
                       <button 
                         onClick={() => handleDelete(agency.id)}
                         className="text-red-500 hover:text-red-700 transition-colors p-1" 
                         title="Supprimer"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    Aucune agence enregistrée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
