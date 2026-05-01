import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Loader2 } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  status: 'Publié' | 'Brouillon';
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'news'), 
      where('status', '==', 'Publié'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      setArticles(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching news:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4">
            <h2 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold mb-2">
              Actualités
            </h2>
            <p className="text-lg md:text-3xl font-heading font-bold text-navy">
              Dernières nouvelles Nzoko
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
               <Loader2 className="w-8 h-8 text-navy animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {articles.length > 0 ? articles.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col text-left">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop"} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <Calendar className="w-4 h-4 mr-2 text-gold" />
                      {article.date}
                    </div>
                    <h2 className="text-xl font-bold text-navy mb-3 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                      {article.summary}
                    </p>
                    <button className="inline-flex items-center text-gold font-bold hover:text-[#E3BC53] transition-colors mt-auto">
                      Lire l'article &rarr;
                    </button>
                  </div>
                </article>
              )) : (
                <div className="col-span-full py-12 text-center text-gray-500 italic">
                  Aucune actualité publiée pour le moment.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
