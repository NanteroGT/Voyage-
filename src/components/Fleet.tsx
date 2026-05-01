import { Wind, Wifi, Armchair } from 'lucide-react';

export default function Fleet() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-navy mb-4">Voyagez en première classe</h2>
            <div className="w-16 h-1 bg-gold mb-6 rounded"></div>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Notre flotte est composée de bus modernes, régulièrement révisés et équipés pour vous offrir un confort optimal durant votre trajet.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center border border-navy/10">
                    <Wind className="h-5 w-5 text-navy" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-navy">Climatisation Intégrale</h4>
                  <p className="mt-1 text-gray-500 text-sm">Profitez d'une température idéale tout au long de votre voyage, peu importe la météo extérieure.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center border border-navy/10">
                    <Wifi className="h-5 w-5 text-navy" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-navy">Connexion WiFi</h4>
                  <p className="mt-1 text-gray-500 text-sm">Restez connecté avec vos proches ou continuez à travailler grâce à notre réseau WiFi à bord.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center border border-navy/10">
                    <Armchair className="h-5 w-5 text-navy" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-navy">Sièges Grand Confort</h4>
                  <p className="mt-1 text-gray-500 text-sm">Des sièges inclinables et spacieux conçus pour prévenir la fatigue pendant les longs trajets.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gold rounded-full blur-3xl opacity-20 -z-10 translate-x-1/4 translate-y-1/4"></div>
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
              alt="Intérieur bus Nzoko Transport" 
              className="rounded-2xl shadow-2xl border-4 border-white object-cover aspect-video lg:aspect-square"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
