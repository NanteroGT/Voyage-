import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Package, Plus, Trash2, Edit2, Search } from 'lucide-react';

interface Packg {
  id: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  currentStatus: string;
}

export default function Packages() {
  const [packages, setPackages] = useState<Packg[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  
  const [formData, setFormData] = useState({
    id: '',
    sender: '',
    receiver: '',
    origin: '',
    destination: '',
    weight: '',
    estimatedDelivery: '',
    currentStatus: 'pending'
  });

  const fetchPackages = async () => {
    try {
      const q = query(collection(db, 'packages'));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Packg));
      setPackages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id.trim()) {
      alert('Veuillez entrer un ID de colis (ex: NZK-123)');
      return;
    }
    
    try {
      const docRef = doc(db, 'packages', formData.id.trim().toUpperCase());
      
      const payload = {
         sender: formData.sender,
         receiver: formData.receiver,
         origin: formData.origin,
         destination: formData.destination,
         weight: formData.weight,
         estimatedDelivery: formData.estimatedDelivery,
         currentStatus: formData.currentStatus,
         updatedAt: serverTimestamp(),
         // Add initial event if new
         events: [{
            date: new Date().toLocaleDateString('fr-FR'),
            time: new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}),
            location: formData.origin,
            status: 'Enregistré',
            description: 'Colis enregistré dans le réseau Nzoko Transport.'
         }]
      };

      await setDoc(docRef, payload, { merge: true });
      setShowModal(false);
      fetchPackages();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce colis ?')) {
      await deleteDoc(doc(db, 'packages', id));
      fetchPackages();
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <span className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-xs font-bold uppercase">En Attente</span>;
      case 'in_transit': return <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-bold uppercase">En Transit</span>;
      case 'customs': return <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-bold uppercase">En Douane</span>;
      case 'out_for_delivery': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold uppercase">En Livraison</span>;
      case 'delivered': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold uppercase">Livré</span>;
      default: return null;
    }
  }

  const filtered = packages.filter(p => p.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Colis</h1>
          <p className="text-slate-500 text-sm mt-1">Créez et mettez à jour l'état des expéditions</p>
        </div>
        <button 
          onClick={() => { setFormData({id: '', sender: '', receiver: '', origin: '', destination: '', weight: '', estimatedDelivery: '', currentStatus: 'pending'}); setShowModal(true); }}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold flex items-center hover:bg-amber-600 transition-colors shadow-sm"
        >
          <Plus size={20} className="mr-2" /> Nouveau Colis
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center">
            <Search className="text-slate-400 mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher par ID (ex: NZK-123)..."
              className="w-full text-slate-900 focus:outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID Colis</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Trajet</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Expéditeur / Dest.</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Chargement...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Aucun colis trouvé.</td></tr>
              ) : filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="font-bold text-slate-900">{pkg.id}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{pkg.origin} <br/><span className="text-slate-400">vers</span> {pkg.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{pkg.sender}</div>
                    <div className="text-sm text-slate-500">{pkg.receiver}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(pkg.currentStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(pkg.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 text-center">Ajouter / Modifier un Colis</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Numéro de suivi (ID)</label>
                <input required type="text" placeholder="ex: NZK-789012" className="w-full border-slate-300 rounded-lg p-3 border focus:ring-amber-500 focus:border-amber-500 uppercase" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Expéditeur</label>
                  <input required type="text" className="w-full border-slate-300 rounded-lg p-3 border" value={formData.sender} onChange={e => setFormData({...formData, sender: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Destinataire</label>
                  <input required type="text" className="w-full border-slate-300 rounded-lg p-3 border" value={formData.receiver} onChange={e => setFormData({...formData, receiver: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Origine</label>
                  <input required type="text" className="w-full border-slate-300 rounded-lg p-3 border" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Destination</label>
                  <input required type="text" className="w-full border-slate-300 rounded-lg p-3 border" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Poids</label>
                  <input type="text" placeholder="ex: 15 kg" className="w-full border-slate-300 rounded-lg p-3 border" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Livraison estimée</label>
                  <input type="text" placeholder="ex: 24 Mai 2026" className="w-full border-slate-300 rounded-lg p-3 border" value={formData.estimatedDelivery} onChange={e => setFormData({...formData, estimatedDelivery: e.target.value})} />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Statut Initial</label>
                 <select className="w-full border-slate-300 rounded-lg p-3 border" value={formData.currentStatus} onChange={e => setFormData({...formData, currentStatus: e.target.value})}>
                    <option value="pending">En Attente</option>
                    <option value="in_transit">En Transit</option>
                    <option value="customs">En Douane</option>
                    <option value="out_for_delivery">En Livraison</option>
                    <option value="delivered">Livré</option>
                 </select>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold">Annuler</button>
                <button type="submit" className="px-6 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
