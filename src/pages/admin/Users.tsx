import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Users as UsersIcon, Plus, Trash2, ShieldAlert } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
}

export default function Users() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchAdmins = async () => {
    try {
      const snap = await getDocs(query(collection(db, 'admins')));
      setAdmins(snap.docs.map(d => ({ id: d.id, email: d.data().email } as AdminUser)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    try {
      // Create a document with the id as the email for simplicity of invitation,
      // or we just ask them to create account.
      // In this setup, we just store the email. The login page will check this.
      // However, Firestore rules are tricky. Let's just create a UID randomly or use email as doc ID.
      alert('Veuillez demander au nouvel administrateur de créer son compte via Firebase Console, ou modifiez Login.tsx pour autoriser Register.');
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (email === 'nantesokemba63@gmail.com') {
      alert('Impossible de supprimer le super-administrateur principal.');
      return;
    }
    
    if (confirm(`Voulez-vous révoquer l'accès administrateur de ${email} ?`)) {
      await deleteDoc(doc(db, 'admins', id));
      fetchAdmins();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Membres de l'équipe</h1>
          <p className="text-slate-500 text-sm mt-1">Gérez les accès à l'interface d'administration</p>
        </div>
        <button 
          onClick={() => { alert('Pour ajouter un admin de manière sécurisée, ajoutez-le d\'abord dans Firebase Auth via la console, puis utilisez son UID pour l\'ajouter ici.'); }}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold flex items-center shadow-sm"
        >
          <Plus size={20} className="mr-2" /> Ajouter un Accès
        </button>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <ShieldAlert className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Note: Pour des raisons de sécurité, vous êtes le Super Administrateur (nantesokemba63@gmail.com). Vous ne pouvez pas être supprimé.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider items-center flex">
                 <UsersIcon size={16} className="mr-2" /> Utilisateur (Email)
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-500">Chargement...</td></tr>
            ) : admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                       {admin.email?.[0].toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-slate-900">{admin.email}</div>
                      <div className="text-sm text-slate-500">{admin.email === 'nantesokemba63@gmail.com' ? 'Super Administrateur' : 'Administrateur'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  {admin.email !== 'nantesokemba63@gmail.com' && (
                    <button onClick={() => handleDelete(admin.id, admin.email)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors inline-block">
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
