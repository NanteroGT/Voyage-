import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Plus, Loader2 } from 'lucide-react';

interface Admin {
  id: string;
  email: string;
}

export default function AdminUsersAdmin() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'admins'));
    const unsub = onSnapshot(q, (snapshot) => {
      setAdmins(snapshot.docs.map(doc => ({ id: doc.id, email: doc.data().email || doc.id } as Admin)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    // This is simplified. Adding an admin requires UID, not just email.
    // For now, I will warn the user about this.
    alert("Veuillez ajouter l'UID de l'utilisateur dans la collection 'admins' pour autoriser l'accès.");
    setEmail('');
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'admins', id));
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Gestion des Administrateurs</h2>
      
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-8">
        <input className="w-full mb-2 p-2 border rounded" placeholder="Email de l'admin" value={email} onChange={e => setEmail(e.target.value)} required/>
        <button className="bg-navy text-white px-4 py-2 rounded flex items-center"><Plus className="w-4 h-4 mr-2" /> Ajouter</button>
      </form>

      <div className="space-y-4">
        {admins.map(a => (
          <div key={a.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <p>{a.email}</p>
            <button onClick={() => handleDelete(a.id)} className="text-red-500"><Trash2 /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
