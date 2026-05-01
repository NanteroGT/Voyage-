import { useState, useEffect } from 'react';
import { Search, RefreshCw, Loader2, Plus, Trash2 } from 'lucide-react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

interface Package {
  id: string;
  trackingNumber: string;
  sender: string;
  receiver: string;
  route: string;
  status: 'En attente' | 'En transit' | 'Livré';
  date: string;
}

export default function AdminTracking() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    trackingNumber: `NZK-${Math.floor(10000 + Math.random() * 90000)}`,
    sender: '',
    receiver: '',
    route: 'Pointe-Noire → Brazzaville',
    status: 'En attente' as 'En attente' | 'En transit' | 'Livré',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const q = query(collection(db, 'packages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Package));
      setPackages(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'packages');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'packages'), {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setShowForm(false);
      setFormData({
        trackingNumber: `NZK-${Math.floor(10000 + Math.random() * 90000)}`,
        sender: '',
        receiver: '',
        route: 'Pointe-Noire → Brazzaville',
        status: 'En attente',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'packages');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStatus = async (id: string, currentStatus: string) => {
    const statusOrder: ('En attente' | 'En transit' | 'Livré')[] = ['En attente', 'En transit', 'Livré'];
    const nextIndex = (statusOrder.indexOf(currentStatus as any) + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];
    
    try {
      await updateDoc(doc(db, 'packages', id), {
        status: nextStatus,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `packages/${id}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer ce colis ?')) return;
    try {
      await deleteDoc(doc(db, 'packages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `packages/${id}`);
    }
  };

  const filteredPackages = packages.filter(p => 
    p.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.receiver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-navy animate-spin mb-2" />
        <p className="text-gray-500">Chargement des colis...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
         <h1 className="text-2xl font-bold text-navy">Gestion des Colis</h1>
         <div className="flex gap-4 w-full sm:w-auto">
           <div className="relative flex-grow sm:flex-grow-0">
             <input
               type="text"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy sm:text-sm shadow-sm"
               placeholder="Rechercher un colis..."
             />
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-gray-400" />
             </div>
           </div>
           <button 
             onClick={() => setShowForm(!showForm)}
             className="bg-navy text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1a2d5e] transition-colors flex items-center shadow-sm"
           >
             <Plus className="w-4 h-4 mr-2" />
             Nouveau
           </button>
         </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-bold text-navy mb-4 border-b pb-2 flex items-center justify-between">
            Enregistrer un nouveau colis
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                &times;
            </button>
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">N° de suivi</label>
              <input type="text" value={formData.trackingNumber} readOnly className="w-full bg-gray-50 border-gray-300 rounded-md shadow-sm sm:text-sm border p-2 text-gray-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expéditeur</label>
              <input 
                type="text" 
                value={formData.sender}
                onChange={e => setFormData({...formData, sender: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                placeholder="Nom complet" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destinataire</label>
              <input 
                type="text" 
                value={formData.receiver}
                onChange={e => setFormData({...formData, receiver: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                placeholder="Nom complet" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trajet</label>
              <select 
                value={formData.route}
                onChange={e => setFormData({...formData, route: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2"
              >
                <option value="Pointe-Noire → Brazzaville">Pointe-Noire → Brazzaville</option>
                <option value="Brazzaville → Pointe-Noire">Brazzaville → Pointe-Noire</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de dépôt</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                required 
              />
            </div>
            
            <div className="lg:col-span-3 flex justify-end gap-3 mt-2 pt-4 border-t">
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
                Enregistrer le colis
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Suivi</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expéditeur / Destinataire</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Trajet</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.length > 0 ? filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-navy">{pkg.trackingNumber}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{pkg.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{pkg.sender}</div>
                    <div className="text-xs text-gray-500">à: {pkg.receiver}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-600">{pkg.route}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => updateStatus(pkg.id, pkg.status)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold hover:opacity-80 transition-opacity ${
                        pkg.status === 'En attente' ? 'bg-orange-100 text-orange-800' :
                        pkg.status === 'En transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}
                      title="Cliquez pour changer le statut"
                      disabled={pkg.status === 'Livré'}
                    >
                      {pkg.status}
                      {pkg.status !== 'Livré' && <RefreshCw className="w-3 h-3 ml-2" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button 
                      onClick={() => handleDelete(pkg.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Aucun colis trouvé.
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
