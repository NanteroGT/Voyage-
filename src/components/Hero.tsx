import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

interface HeroConfig {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const DEFAULT_CONFIG: HeroConfig = {
  title: "Voyagez\nNa Kimia\nBozali Na NZOKO",
  subtitle: "Le confort, la fraîcheur, le Wi-Fi, la sécurité... Tout est pensé pour que chaque trajet soit un vrai moment de plaisir.",
  imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=85&w=2500&auto=format&fit=crop"
};

export default function Hero() {
  const [config, setConfig] = useState<HeroConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const fetchConfig = async () => {
      const docRef = doc(db, 'site_settings', 'main');
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setConfig({
            title: data.heroTitle || DEFAULT_CONFIG.title,
            subtitle: data.heroSubtitle || DEFAULT_CONFIG.subtitle,
            imageUrl: data.heroImageUrl || DEFAULT_CONFIG.imageUrl
          });
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('offline')) {
          console.warn("Firestore client is offline, using default config.");
        } else {
          console.error("Failed to load hero config", error);
        }
        // Keep using DEFAULT_CONFIG
      }
    };
    fetchConfig();
  }, []);

  return (
    <div className="relative flex items-end justify-center min-h-[100svh] overflow-hidden bg-navy pb-32 lg:pb-40">
      {/* Immersive background image with premium overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.7]"
          style={{ backgroundImage: `url(${config.imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent mt-auto h-[60%]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8 max-w-5xl mx-auto uppercase drop-shadow-md whitespace-pre-line"
        >
          {config.title.split('NZOKO').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-gold">NZOKO</span>}
            </span>
          ))}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0 drop-shadow-sm whitespace-pre-line"
        >
          {config.subtitle}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto px-4 sm:px-0"
        >
          <a
            href="#destinations"
            className="group inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-base font-bold rounded-sm text-navy bg-gold hover:bg-white transition-all duration-300 shadow-xl active:scale-95"
          >
            Réserver maintenant
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
          </a>
          <a
            href="/suivi"
            className="group inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-base font-medium rounded-sm text-white bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 border border-white/10 active:scale-95"
          >
            Suivre mon colis
          </a>
        </motion.div>
      </div>

      {/* Subtle scrolling indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">Découvrir</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"></div>
      </motion.div>
    </div>
  );
}
