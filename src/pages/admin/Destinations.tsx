import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

interface Destination {
  id: string;
  from: string;
  to: string;
  priceOneWay: number;
  priceReturn: number;
  days: string;
  time: string;
  status: 'Actif' | 'Inactif';
  createdAt?: any;
}

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    priceOneWay: 0,
    priceReturn: 0,
    days: 'Tous les jours',
    time: '08:00',
    status: 'Actif' as 'Actif' | 'Inactif'
  });

  useEffect(() => {
    const q = query(collection(db, 'destinations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Destination));
      setDestinations(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'destinations');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editingDest) {
        await updateDoc(doc(db, 'destinations', editingDest.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'destinations'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setShowForm(false);
      setEditingDest(null);
      setFormData({ from: '', to: '', priceOneWay: 0, priceReturn: 0, days: 'Tous les jours', time: '08:00', status: 'Actif' });
    } catch (error) {
      handleFirestoreError(error, editingDest ? OperationType.UPDATE : OperationType.CREATE, 'destinations');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (dest: Destination) => {
    setEditingDest(dest);
    setFormData({
      from: dest.from,
      to: dest.to,
      priceOneWay: dest.priceOneWay,
      priceReturn: dest.priceReturn,
      days: dest.days,
      time: dest.time,
      status: dest.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette destination ?')) return;
    try {
      await deleteDoc(doc(db, 'destinations', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `destinations/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-navy animate-spin mb-2" />
        <p className="text-gray-500">Chargement des destinations...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
         <h1 className="text-2xl font-bold text-navy">Gestion des Destinations</h1>
         <button 
           onClick={() => {
             setEditingDest(null);
             setFormData({ from: '', to: '', priceOneWay: 0, priceReturn: 0, days: 'Tous les jours', time: '08:00', status: 'Actif' });
             setShowForm(!showForm);
           }}
           className="bg-gold text-navy px-4 py-2 rounded-lg font-medium hover:bg-[#E3BC53] transition-colors flex items-center shadow-sm whitespace-nowrap"
         >
           <Plus className="w-4 h-4 mr-2" />
           {showForm ? 'Fermer le formulaire' : 'Nouvelle destination'}
         </button>
      </div>

      {/* Form */}
      {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
            <h3 className="text-lg font-bold text-navy mb-4 border-b pb-2">
              {editingDest ? 'Modifier le trajet' : 'Ajouter un trajet'}
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Départ</label>
                <input 
                  type="text" 
                  value={formData.from}
                  onChange={e => setFormData({...formData, from: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  placeholder="Ex: Pointe-Noire" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Arrivée</label>
                <input 
                  type="text" 
                  value={formData.to}
                  onChange={e => setFormData({...formData, to: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  placeholder="Ex: Brazzaville" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix Aller (FCFA)</label>
                <input 
                  type="number" 
                  min="0" 
                  value={formData.priceOneWay}
                  onChange={e => setFormData({...formData, priceOneWay: parseInt(e.target.value)})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  placeholder="9000" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix Retour (FCFA)</label>
                <input 
                  type="number" 
                  min="0" 
                  value={formData.priceReturn}
                  onChange={e => setFormData({...formData, priceReturn: parseInt(e.target.value)})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  placeholder="18000" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jours de départ</label>
                <input 
                  type="text" 
                  value={formData.days}
                  onChange={e => setFormData({...formData, days: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  placeholder="Tous les jours" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure de départ</label>
                <input 
                  type="time" 
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  required 
                />
              </div>
              
              <div className="lg:col-span-3 flex justify-end gap-3 mt-4 pt-4 border-t">
                <button 
                  type="button" 
                  disabled={isSubmitting}
                  onClick={() => { setShowForm(false); setEditingDest(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy hover:bg-[#1a2d5e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy flex items-center"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingDest ? 'Mettre à jour' : 'Enregistrer'}
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trajet</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Prix Aller / Retour</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Programme</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {destinations.length > 0 ? destinations.map((dest) => (
                  <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-navy">{dest.from}</div>
                      <div className="text-xs text-gray-500">vers {dest.to}</div>
                      <div className="sm:hidden mt-1 text-xs text-gray-500">
                        {dest.priceOneWay.toLocaleString()} FCFA
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{dest.priceOneWay.toLocaleString()} FCFA</div>
                      <div className="text-xs text-gray-500">{dest.priceReturn.toLocaleString()} FCFA</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900">{dest.days}</div>
                      <div className="text-xs text-gray-500">{dest.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${dest.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {dest.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm border-gray-200">
                      <div className="flex justify-end gap-3">
                         <button 
                           onClick={() => handleEdit(dest)}
                           className="text-navy hover:text-gold transition-colors p-1" 
                           title="Modifier"
                         >
                           <Edit2 className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => handleDelete(dest.id)}
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
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      Aucune destination enregistrée.
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
