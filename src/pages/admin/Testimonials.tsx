import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Plus, Loader2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', text: '', rating: 5 });

  useEffect(() => {
    const q = query(collection(db, 'testimonials'), orderBy('name', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'testimonials'), newItem);
    setNewItem({ name: '', text: '', rating: 5 });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'testimonials', id));
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Gestion des Avis</h2>
      
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-8">
        <input className="w-full mb-2 p-2 border rounded" placeholder="Nom" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required/>
        <textarea className="w-full mb-2 p-2 border rounded" placeholder="Avis" value={newItem.text} onChange={e => setNewItem({...newItem, text: e.target.value})} required></textarea>
        <input type="number" min="1" max="5" className="w-full mb-2 p-2 border rounded" placeholder="Note (1-5)" value={newItem.rating} onChange={e => setNewItem({...newItem, rating: parseInt(e.target.value)})} required/>
        <button className="bg-navy text-white px-4 py-2 rounded flex items-center"><Plus className="w-4 h-4 mr-2" /> Ajouter</button>
      </form>

      <div className="space-y-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{t.name}</p>
              <p>{t.text}</p>
              <p className="text-sm text-gray-500">Note: {t.rating}/5</p>
            </div>
            <button onClick={() => handleDelete(t.id)} className="text-red-500"><Trash2 /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
