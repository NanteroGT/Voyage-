import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Quels sont les horaires de départ ?",
      answer: "Nous proposons plusieurs départs quotidiens. Généralement, les premiers départs sont à 06h00 pour éviter le trafic, avec des trajets réguliers tout au long de la journée jusqu'à 20h00. Veuillez consulter notre page Destinations pour les horaires précis."
    },
    {
      question: "Quelle est la franchise bagage autorisée ?",
      answer: "Chaque passager a droit à un bagage en soute de 23kg maximum et un petit bagage à main (sac à dos ou sac à main). Tout excédent de bagage sera facturé au tarif en vigueur (150 FCFA le kilo supplémentaire)."
    },
    {
      question: "Comment puis-je modifier ou annuler ma réservation ?",
      answer: "Les modifications peuvent être faites gratuitement jusqu'à 24h avant le départ en contactant notre agence. Les annulations sont possibles selon nos CGV (remboursement partiel selon le délai de prévenance)."
    },
    {
      question: "Comment réserver et payer mon billet ?",
      answer: "Vous pouvez réserver directement en agence, par téléphone via WhatsApp, ou via notre application partenaire si disponible. Les paiements par Mobile Money (MTN, Airtel) et espèces sont acceptés."
    },
    {
      question: "Acceptez-vous les enfants non accompagnés ?",
      answer: "Oui, nous acceptons les enfants voyageant seuls à partir de 12 ans, munis d'une autorisation parentale écrite et de la pièce d'identité de la personne qui viendra les réceptionner à l'arrivée."
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy">
            Questions Fréquentes
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded mt-4"></div>
          <p className="mt-4 text-gray-600">Tout ce que vous devez savoir avant de voyager</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-50"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-gold' : 'text-navy'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`flex-shrink-0 w-6 h-6 ml-4 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-gold' : 'text-gray-400'
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4 bg-white leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
