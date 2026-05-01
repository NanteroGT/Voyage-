import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Plus, Loader2 } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ question: '', answer: '' });

  useEffect(() => {
    const q = query(collection(db, 'faqs'), orderBy('question', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setFaqs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FAQ)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'faqs'), newItem);
    setNewItem({ question: '', answer: '' });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'faqs', id));
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Gestion des FAQ</h2>
      
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-8">
        <input className="w-full mb-2 p-2 border rounded" placeholder="Question" value={newItem.question} onChange={e => setNewItem({...newItem, question: e.target.value})} required/>
        <textarea className="w-full mb-2 p-2 border rounded" placeholder="Réponse" value={newItem.answer} onChange={e => setNewItem({...newItem, answer: e.target.value})} required></textarea>
        <button className="bg-navy text-white px-4 py-2 rounded flex items-center"><Plus className="w-4 h-4 mr-2" /> Ajouter</button>
      </form>

      <div className="space-y-4">
        {faqs.map(f => (
          <div key={f.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{f.question}</p>
              <p>{f.answer}</p>
            </div>
            <button onClick={() => handleDelete(f.id)} className="text-red-500"><Trash2 /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
