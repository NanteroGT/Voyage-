import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Loader2 } from 'lucide-react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

interface Article {
  id: string;
  title: string;
  date: string;
  status: 'Publié' | 'Brouillon';
  imageUrl: string;
  summary: string;
}

export default function AdminNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Brouillon' as 'Publié' | 'Brouillon',
    imageUrl: '',
    summary: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      setArticles(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'news');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingArticle) {
        await updateDoc(doc(db, 'news', editingArticle.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'news'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setShowForm(false);
      setEditingArticle(null);
      setFormData({ title: '', date: new Date().toISOString().split('T')[0], status: 'Brouillon', imageUrl: '', summary: '' });
    } catch (error) {
      handleFirestoreError(error, editingArticle ? OperationType.UPDATE : OperationType.CREATE, 'news');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      date: article.date,
      status: article.status,
      imageUrl: article.imageUrl || '',
      summary: article.summary || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-navy animate-spin mb-2" />
        <p className="text-gray-500">Chargement des actualités...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
         <h1 className="text-2xl font-bold text-navy">Gestion des Actualités</h1>
         <button 
           onClick={() => {
             setEditingArticle(null);
             setFormData({ title: '', date: new Date().toISOString().split('T')[0], status: 'Brouillon', imageUrl: '', summary: '' });
             setShowForm(!showForm);
           }}
           className="bg-navy text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1a2d5e] transition-colors flex items-center shadow-sm"
         >
           <Plus className="w-4 h-4 mr-2" />
           {showForm ? 'Fermer' : 'Nouvel article'}
         </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-bold text-navy mb-4 border-b pb-2 flex items-center justify-between">
            {editingArticle ? 'Modifier l\'article' : 'Créer un article'}
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                &times;
            </button>
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'article</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as 'Publié' | 'Brouillon'})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2"
                >
                  <option value="Brouillon">Brouillon</option>
                  <option value="Publié">Publié</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image de couverture (URL)</label>
                <input 
                  type="url" 
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Résumé / Contenu</label>
                <textarea 
                  rows={4} 
                  value={formData.summary}
                  onChange={e => setFormData({...formData, summary: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-navy focus:ring-navy sm:text-sm border p-2" 
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button" 
                disabled={isSubmitting}
                onClick={() => { setShowForm(false); setEditingArticle(null); }}
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
                {editingArticle ? 'Mettre à jour' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {articles.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {articles.map((article) => (
              <li key={article.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-base font-bold text-navy mb-1">{article.title}</span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {article.date} &bull; <span className={`ml-1 ${article.status === 'Publié' ? 'text-green-600' : 'text-orange-500'}`}>{article.status}</span>
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(article)} className="text-gray-400 hover:text-navy p-2"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(article.id)} className="text-gray-400 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-10 text-center text-gray-500">
            Aucun article trouvé.
          </div>
        )}
      </div>
    </div>
  );
}
