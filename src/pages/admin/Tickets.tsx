import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc, serverTimestamp, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Ticket, Search, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([]);

  const fetchTickets = async () => {
    const q = query(collection(db, 'tickets'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setTickets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'tickets', id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      fetchTickets();
    } catch(err) {
      console.error(err);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette réservation ?')) return;
    try {
      await deleteDoc(doc(db, 'tickets', id));
      fetchTickets();
    } catch(err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Réservations</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Trajet</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Passager</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Statut</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{t.departure} - {t.arrival}</td>
                <td className="px-6 py-4 text-slate-600">{t.passengerName} <br/><span className="text-sm text-slate-400">{t.passengerPhone}</span></td>
                <td className="px-6 py-4 text-slate-600">{t.date}</td>
                <td className="px-6 py-4 text-slate-600">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    t.status === 'Confirmé' ? 'bg-green-100 text-green-800' :
                    t.status === 'Annulé' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => updateStatus(t.id, 'Confirmé')} className="text-green-600 hover:text-green-800 bg-green-50 p-2 rounded-lg" title="Confirmer">
                    <CheckCircle size={18} />
                  </button>
                  <button onClick={() => updateStatus(t.id, 'Annulé')} className="text-orange-600 hover:text-orange-800 bg-orange-50 p-2 rounded-lg" title="Annuler">
                    <XCircle size={18} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg" title="Supprimer">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  Aucune réservation pour le moment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
