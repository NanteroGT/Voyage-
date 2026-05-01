import { Wind, Clock, Users, Tags } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'Bus climatisés',
      description: 'Température idéale et régulée pour votre confort absolu.',
      icon: Wind,
    },
    {
      name: 'Départs ponctuels',
      description: 'La ponctualité est la base de notre professionnalisme.',
      icon: Clock,
    },
    {
      name: 'Personnel qualifié',
      description: 'Accompagnateurs courtois pour votre sécurité et tranquillité.',
      icon: Users,
    },
    {
      name: 'Prix compétitifs',
      description: 'L\'excellence au meilleur prix du marché.',
      icon: Tags,
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 px-4">
          <h2 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold mb-2">
            Pourquoi choisir Nzoko
          </h2>
          <p className="text-lg md:text-3xl font-heading font-bold text-navy">
            L'excellence à chaque kilomètre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-gold/50 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="text-gold mb-6">
                <feature.icon className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-heading font-bold text-navy mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
