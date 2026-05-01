import { Users, Bus, MapPin, Search } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Destinations Actives', value: '8', icon: Bus, change: '+2 cette semaine' },
    { name: 'Agences', value: '4', icon: MapPin, change: 'Stable' },
    { name: 'Visiteurs (Mois)', value: '12 450', icon: Users, change: '+15% par rapport au mois dernier' },
  ];

  return (
    <div>
      <div className="mb-8 flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold text-navy">Tableau de bord</h1>
        
        <div className="relative hidden sm:block w-64">
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-navy focus:border-navy sm:text-sm"
            placeholder="Rechercher..."
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-navy" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd>
                      <div className="text-2xl font-bold text-navy">
                        {item.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-navy mb-4">Activité récente</h2>
        <p className="text-gray-500 text-sm">Votre tableau de bord est prêt. Utilisez le menu latéral pour gérer le contenu de votre site web vitrine.</p>
      </div>
    </div>
  );
}
