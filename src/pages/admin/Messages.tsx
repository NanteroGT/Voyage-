import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc, serverTimestamp, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { MessageSquare, Trash2, CheckCircle } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = async () => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'messages', id), {
        status: newStatus
      });
      fetchMessages();
    } catch(err) {
      console.error(err);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce message ?')) return;
    try {
      await deleteDoc(doc(db, 'messages', id));
      fetchMessages();
    } catch(err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Messages & Contacts</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Auteur</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Sujet</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Statut</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {messages.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{m.name} <br/><span className="text-sm text-slate-400">{m.email}</span><br/><span className="text-xs text-slate-400">{m.phone}</span></td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="font-medium text-slate-900 truncate max-w-[200px]">{m.subject}</div>
                  <div className="text-sm text-slate-500 whitespace-pre-wrap max-w-md">{m.message}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    m.status === 'Traité' ? 'bg-green-100 text-green-800' :
                    m.status === 'Lu' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => updateStatus(m.id, 'Traité')} className="text-green-600 hover:text-green-800 bg-green-50 p-2 rounded-lg" title="Marquer comme traité">
                    <CheckCircle size={18} />
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg" title="Supprimer">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  Aucun message pour le moment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
