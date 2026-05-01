import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { X, ZoomIn, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tous');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
      setImages(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching gallery:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = ['Tous', ...Array.from(new Set(images.map(img => img.category)))];
  
  const filteredImages = filter === 'Tous' ? images : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 px-4">
            <h2 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold mb-2">
              Galerie
            </h2>
            <p className="text-lg md:text-3xl font-heading font-bold text-navy">
              L'univers Nzoko en images
            </p>
          </div>

          {loading ? (
             <div className="flex justify-center items-center py-20">
               <Loader2 className="w-8 h-8 text-navy animate-spin" />
             </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filter === cat 
                        ? 'bg-navy text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredImages.map((img, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={img.id}
                      className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-gray-200 shadow-sm hover:shadow-xl"
                      onClick={() => setLightboxIndex(images.findIndex(i => i.id === img.id))}
                    >
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                        <ZoomIn className="text-gold w-10 h-10 mb-2" />
                        <span className="text-white font-bold">{img.title}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredImages.length === 0 && (
                <div className="py-20 text-center text-gray-500 italic">
                  Aucune image disponible dans cette catégorie.
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
          >
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={images[lightboxIndex].url} 
              alt={images[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-6 text-center text-white">
              <p className="font-bold text-xl">{images[lightboxIndex].title}</p>
              <p className="text-gold mt-1">{images[lightboxIndex].category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
