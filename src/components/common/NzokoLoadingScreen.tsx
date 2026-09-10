import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bus } from 'lucide-react';

interface NzokoLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function NzokoLoadingScreen({
  onComplete,
  duration = 1600,
}: NzokoLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Small pause when bus hits the end point before the curtain slides up
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 220);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="nzoko-curtain-loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#071922] text-white select-none pointer-events-auto"
        >
          <div className="flex flex-col items-center">
            {/* 1. LOGO OFFICIEL DU SITE */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <img
                src="/images/logo.png"
                alt="Nzoko Transport"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-2xl drop-shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('logo.jpg')) {
                    target.src = '/images/logo.jpg';
                  }
                }}
              />
            </motion.div>

            {/* NOM DE L'AGENCE */}
            <div className="flex items-center space-x-1.5 mb-8">
              <span className="text-base sm:text-lg font-black tracking-wider text-white">
                NZOKO
              </span>
              <span className="text-base sm:text-lg font-black tracking-widest text-amber-400">
                TRANSPORT
              </span>
            </div>

            {/* 2. LA LIGNE SIMPLE DU POINT A AU POINT B AVEC LE PETIT BUS */}
            <div className="w-56 sm:w-72 relative">
              {/* Point A (Départ) */}
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 z-10" />

              {/* Ligne de fond */}
              <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden">
                {/* Progression de la ligne en or */}
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-amber-300 transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Point B (Arrivée) */}
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 z-10" />

              {/* Le petit bus qui glisse de A à B */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-75 ease-out pointer-events-none text-amber-400"
                style={{ left: `${progress}%` }}
              >
                <div className="relative -top-3.5">
                  <div className="bg-[#071922] p-1 rounded-md border border-amber-400/60 shadow-md">
                    <Bus size={15} className="text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
