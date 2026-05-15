import { Package, Truck, Clock, Users, Database } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, getDocs, setDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
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
  const [seeding, setSeeding] = useState(false);

  const fetchStats = async () => {
    try {
      const pkgsSnap = await getDocs(collection(db, 'packages'));
      const usersSnap = await getDocs(collection(db, 'admins'));

      let ts = 0, it = 0, del = 0;
      pkgsSnap.forEach(doc => {
        ts++;
        const data = doc.data();
        if (data.status === 'En transit') it++;
        if (data.status === 'Livré') del++;
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

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSeed = async () => {
    if(!window.confirm("Voulez-vous générer des données de test (Billet, Message, Paramètres) ?")) return;
    setSeeding(true);
    try {
      await setDoc(doc(db, 'site_settings', 'global'), {
        name: 'Nzoko Transport',
        phone: '+242 06 123 45 67',
        whatsapp: '+242 06 987 65 43',
        logoUrl: '',
        heroTitle: "L'excellence du voyage <br /><span class=\"text-brand-yellow italic\">sans compromis.</span>",
        heroSubtitle: "Voyagez en toute sérénité entre Brazzaville, Pointe-Noire et les principales villes du Congo.",
        heroImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      });

      await addDoc(collection(db, 'messages'), {
        name: 'Alain M.',
        email: 'alain.m@example.com',
        phone: '06 555 44 33',
        subject: 'Réservation billet',
        message: 'Bonjour, je souhaiterais réserver un billet Brazzaville - Pointe-Noire pour le 20.',
        status: 'Nouveau',
        createdAt: serverTimestamp()
      });

      await addDoc(collection(db, 'tickets'), {
        departure: 'Brazzaville',
        arrival: 'Pointe-Noire',
        date: '2023-12-15',
        passengerName: 'Christelle T.',
        passengerPhone: '06 111 22 33',
        passengerEmail: 'christelle@test.com',
        status: 'Confirmé',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      await addDoc(collection(db, 'packages'), {
        trackingNumber: 'NZK-TRA-9812',
        sender: 'Paul K.',
        receiver: 'Jean D.',
        route: 'Brazzaville - Pointe-Noire',
        status: 'En transit',
        date: '2023-12-10',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      alert("Données fictives ajoutées !");
      fetchStats();
    } catch(err) {
      console.error(err);
      alert("Erreur lors de l'ajout des données de test.");
    } finally {
      setSeeding(false);
    }
  };

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
          Depuis ce tableau de bord, vous pouvez enregistrer les nouveaux colis, mettre à jour leur statut, gérer les réservations de billets, consulter les messages et configurer le site.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/admin/packages" className="bg-amber-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-600 shadow-sm transition-colors">
            Gérer les Colis
          </Link>
          <button onClick={handleSeed} disabled={seeding} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 shadow-sm transition-colors disabled:opacity-50 flex items-center">
            <Database className="mr-2" size={20} />
            {seeding ? 'Génération...' : 'Générer Données de Test'}
          </button>
        </div>
      </div>
    </div>
  );
}
