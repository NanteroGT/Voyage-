import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState('242061234567');

  useEffect(() => {
    const fetchWhatsApp = async () => {
      try {
        const snap = await getDoc(doc(db, 'homepage_config', 'company_info'));
        if (snap.exists() && snap.data().whatsapp) {
          setWhatsapp(snap.data().whatsapp);
        }
      } catch (e) {
        console.warn("Could not fetch WhatsApp default");
      }
    };
    fetchWhatsApp();
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsapp}?text=Bonjour, je vous contacte depuis votre site web.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  );
}
