import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  updateDoc,
  addDoc
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  Ticket,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Building2,
  Wallet,
  Calendar,
  Clock,
  User,
  Phone,
  Filter,
  PlusCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'tickets'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setTickets(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'tickets', id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      fetchTickets();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette réservation ?')) return;
    try {
      await deleteDoc(doc(db, 'tickets', id));
      fetchTickets();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  // Seed sample reservations for demo if empty
  const seedDemoTickets = async () => {
    const demos = [
      {
        bookingCode: 'NZK-784102',
        departure: 'Brazzaville',
        departureAgency: 'Agence de Mpila',
        departureAgencyAddress: 'Quartier Mpila, Face au port',
        arrival: 'Pointe-Noire',
        arrivalAgency: 'Agence du 31 Juillet',
        arrivalAgencyAddress: 'Rond-point du 31 Juillet, Centre-ville',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: '06h30',
        travelClass: 'vip',
        passengersCount: 2,
        withTombola: false,
        totalPrice: 40000,
        passengerName: 'Dieudonné MOUNTOU',
        passengerPhone: '06 612 34 56',
        passengerEmail: 'mountou.d@gmail.com',
        paymentMethod: 'momo',
        momoOperator: 'mtn',
        momoPhone: '06 612 34 56',
        status: 'Payé Mobile Money',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        bookingCode: 'NZK-931450',
        departure: 'Pointe-Noire',
        departureAgency: 'Agence de Ngoyo',
        departureAgencyAddress: 'Axe principal Ngoyo',
        arrival: 'Brazzaville',
        arrivalAgency: 'Agence de La Tsiémé',
        arrivalAgencyAddress: 'Talangaï / La Tsiémé',
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        timeSlot: '12h00',
        travelClass: 'standard',
        passengersCount: 1,
        withTombola: false,
        totalPrice: 13000,
        passengerName: 'Clarisse LOUBAKI',
        passengerPhone: '05 520 11 22',
        passengerEmail: '',
        paymentMethod: 'agency',
        paymentAgency: 'Agence de Ngoyo (Pointe-Noire)',
        paymentAgencyAddress: 'Axe principal Ngoyo',
        status: 'En attente au guichet',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    ];

    try {
      setLoading(true);
      for (const t of demos) {
        await addDoc(collection(db, 'tickets'), t);
      }
      fetchTickets();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Filtering
  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      (t.bookingCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.passengerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.passengerPhone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.departure || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.arrival || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.departureAgency || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.paymentAgency || '').toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && t.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Gestion des Billets & Réservations
          </h1>
          <p className="text-xs text-slate-500 font-light">
            Suivi des départs par agence, encaissement aux guichets et billets Mobile Money
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {tickets.length === 0 && (
            <button
              onClick={seedDemoTickets}
              className="bg-brand-yellow text-brand-dark font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm hover:bg-amber-400 transition-colors"
            >
              <PlusCircle size={15} />
              <span>Générer Réservations Démo</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par n° de dossier, passager, téléphone, agence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={15} className="text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          >
            <option value="all">Tous les statuts ({tickets.length})</option>
            <option value="En attente au guichet">En attente au guichet</option>
            <option value="Payé Mobile Money">Payé Mobile Money</option>
            <option value="Confirmé">Confirmé</option>
            <option value="Annulé">Annulé</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Dossier / Date</th>
                <th className="px-4 py-3">Trajet (Origine ➔ Arrivée)</th>
                <th className="px-4 py-3">Passager</th>
                <th className="px-4 py-3">Règlement & Agence</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Actions Guichet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Dossier / Date */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-black text-brand-dark block text-sm">
                      {t.bookingCode || 'NZK-AUTO'}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                      <Calendar size={12} className="text-slate-400" />
                      <span>{t.date}</span>
                      {t.timeSlot && <span className="font-bold">à {t.timeSlot}</span>}
                    </span>
                  </td>

                  {/* Trajet & Agences */}
                  <td className="px-4 py-3.5">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-slate-800">
                        <span className="font-bold">{t.departure}</span>
                        <span className="text-slate-400">➔</span>
                        <span className="font-bold">{t.arrival}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        <p>
                          Départ :{' '}
                          <strong className="text-slate-700">
                            {t.departureAgency || t.departure}
                          </strong>
                        </p>
                        <p>
                          Arrivée :{' '}
                          <strong className="text-slate-700">
                            {t.arrivalAgency || t.arrival}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Passager */}
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900">{t.passengerName}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{t.passengerPhone}</div>
                    {t.travelClass && (
                      <span className="inline-block mt-0.5 px-1.5 py-0.5 text-[10px] font-black uppercase rounded bg-slate-100 text-slate-700">
                        {t.travelClass} • {t.passengersCount || 1} pl.
                      </span>
                    )}
                  </td>

                  {/* Mode de Règlement & Agence */}
                  <td className="px-4 py-3.5">
                    {t.paymentMethod === 'agency' ? (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <Building2 size={12} />
                          <span>Guichet physique</span>
                        </span>
                        <p className="text-[11px] text-slate-600 font-medium">
                          {t.paymentAgency || 'En agence locale'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <Wallet size={12} />
                          <span>Mobile Money</span>
                        </span>
                        <p className="text-[11px] text-slate-600">
                          {t.momoOperator?.toUpperCase() || 'MoMo'} • {t.momoPhone || t.passengerPhone}
                        </p>
                      </div>
                    )}
                  </td>

                  {/* Montant Total */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-black text-slate-900 text-sm">
                      {(t.totalPrice || 13000).toLocaleString('fr-FR')} F
                    </span>
                    {t.withTombola && (
                      <span className="block text-[10px] text-amber-600 font-bold">
                        + Tombola Suzuki
                      </span>
                    )}
                  </td>

                  {/* Statut */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${
                        t.status === 'Payé Mobile Money'
                          ? 'bg-emerald-100 text-emerald-800'
                          : t.status === 'Confirmé'
                          ? 'bg-blue-100 text-blue-800'
                          : t.status === 'Annulé'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.status || 'En attente'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1.5">
                    {t.status === 'En attente au guichet' && (
                      <button
                        onClick={() => updateStatus(t.id, 'Confirmé')}
                        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center space-x-1"
                        title="Encaisser au guichet et valider"
                      >
                        <CheckCircle size={14} />
                        <span>Encaissé</span>
                      </button>
                    )}

                    {t.status !== 'Annulé' && (
                      <button
                        onClick={() => updateStatus(t.id, 'Annulé')}
                        className="text-amber-700 hover:bg-amber-100 p-1.5 rounded-lg transition-colors"
                        title="Annuler"
                      >
                        <XCircle size={16} />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    Aucune réservation trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
