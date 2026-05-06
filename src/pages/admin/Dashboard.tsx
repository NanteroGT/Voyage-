import { Package, Truck, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPackages: 0,
    inTransit: 0,
    delivered: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const pkgsSnap = await getDocs(collection(db, 'packages'));
        const usersSnap = await getDocs(collection(db, 'admins'));

        let ts = 0, it = 0, del = 0;
        pkgsSnap.forEach(doc => {
          ts++;
          const data = doc.data();
          if (data.currentStatus === 'in_transit' || data.currentStatus === 'out_for_delivery') it++;
          if (data.currentStatus === 'delivered') del++;
        });

        setStats({
          totalPackages: ts,
          inTransit: it,
          delivered: del,
          users: usersSnap.size
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Colis', value: stats.totalPackages, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'En Transit', value: stats.inTransit, icon: Truck, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: 'Livrés', value: stats.delivered, icon: Clock, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Admins', value: stats.users, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  if (loading) {
    return <div className="p-8 text-center"><div className="animate-pulse flex flex-col items-center"><div className="h-8 w-8 bg-amber-500 rounded-full mb-4"></div><p>Chargement du tableau de bord...</p></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center">
                <div className={`p-4 rounded-xl ${item.bg}`}>
                  <Icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-500 truncate pb-1">{item.name}</dt>
                    <dd className="text-3xl font-black text-slate-900">{item.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Bienvenue sur votre espace d'administration</h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Depuis ce tableau de bord, vous pouvez enregistrer les nouveaux colis, mettre à jour leur statut d'expédition, et gérer les membres de l'équipe qui ont accès à cet espace.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/admin/packages" className="bg-amber-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-600 shadow-sm transition-colors">
            Gérer les Colis
          </Link>
          <Link to="/admin/users" className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 shadow-sm transition-colors">
            Gérer les Admins
          </Link>
        </div>
      </div>
    </div>
  );
}
