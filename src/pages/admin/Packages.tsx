import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  Search,
  Sparkles,
  CheckCircle2,
  Bus,
  Clock,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { DEMO_PACKAGES, PackageStatus, PackageData } from '../../lib/trackingData';

interface FirestorePackage {
  id: string;
  sender?: string;
  senderName?: string;
  receiver?: string;
  receiverName?: string;
  receiverPhone?: string;
  origin?: string;
  originCity?: string;
  destination?: string;
  destinationCity?: string;
  destinationAgency?: string;
  weight?: string;
  packageType?: string;
  estimatedDelivery?: string;
  currentStatus: PackageStatus;
  events?: any[];
}

export default function Packages() {
  const [packages, setPackages] = useState<FirestorePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [seedingLoading, setSeedingLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    sender: '',
    receiver: '',
    receiverPhone: '',
    origin: 'Pointe-Noire',
    destination: 'Brazzaville',
    destinationAgency: 'Gare Centrale Mpila',
    weight: '5.0 kg',
    packageType: 'Carton scellé',
    estimatedDelivery: 'Aujourd\'hui vers 16h30',
    currentStatus: 'registered' as PackageStatus,
    newEventNote: ''
  });

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'packages'));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestorePackage));
      setPackages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSeedDemos = async () => {
    if (!confirm('Voulez-vous charger les 4 colis de démonstration dans Firestore ?')) {
      return;
    }
    setSeedingLoading(true);
    try {
      for (const [id, pkg] of Object.entries(DEMO_PACKAGES)) {
        const docRef = doc(db, 'packages', id);
        await setDoc(docRef, {
          ...pkg,
          sender: pkg.senderName,
          receiver: pkg.receiverName,
          origin: pkg.originCity,
          destination: pkg.destinationCity,
          updatedAt: serverTimestamp()
        });
      }
      setSuccessMessage('Les 4 colis de démo ont été enregistrés avec succès dans la base !');
      setTimeout(() => setSuccessMessage(''), 5000);
      await fetchPackages();
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement des données démo dans Firestore.');
    } finally {
      setSeedingLoading(false);
    }
  };

  const handleOpenEdit = (pkg: FirestorePackage) => {
    setFormData({
      id: pkg.id,
      sender: pkg.sender || pkg.senderName || '',
      receiver: pkg.receiver || pkg.receiverName || '',
      receiverPhone: pkg.receiverPhone || '',
      origin: pkg.origin || pkg.originCity || 'Pointe-Noire',
      destination: pkg.destination || pkg.destinationCity || 'Brazzaville',
      destinationAgency: pkg.destinationAgency || `Gare ${pkg.destination || 'Brazzaville'}`,
      weight: pkg.weight || '',
      packageType: pkg.packageType || 'Colis scellé',
      estimatedDelivery: pkg.estimatedDelivery || '',
      currentStatus: pkg.currentStatus || 'registered',
      newEventNote: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = formData.id.trim().toUpperCase();
    if (!cleanId) {
      alert('Veuillez entrer un ID de colis (ex: NZK-7842-BZV)');
      return;
    }

    try {
      const docRef = doc(db, 'packages', cleanId);

      // Status text for history
      let statusTitle = 'Enregistré au guichet';
      if (formData.currentStatus === 'arrived') statusTitle = 'Arrivé en gare - Prêt pour retrait';
      if (formData.currentStatus === 'in_transit') statusTitle = 'En cours de route sur la RN1';
      if (formData.currentStatus === 'delivered') statusTitle = 'Colis retiré par le destinataire';

      const existingPkg = packages.find((p) => p.id === cleanId);
      const existingEvents = existingPkg?.events || [];

      const newEvents = [
        {
          date: new Date().toLocaleDateString('fr-FR'),
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          location:
            formData.currentStatus === 'arrived' || formData.currentStatus === 'delivered'
              ? formData.destination
              : formData.origin,
          status: statusTitle,
          description:
            formData.newEventNote ||
            (formData.currentStatus === 'arrived'
              ? 'Le car est arrivé. Colis disponible au guichet fret.'
              : formData.currentStatus === 'in_transit'
              ? 'Bus en déplacement sur la RN1.'
              : 'Enregistrement initial.'),
          isCompleted: true
        },
        ...existingEvents
      ];

      const payload = {
        trackingId: cleanId,
        sender: formData.sender,
        senderName: formData.sender,
        receiver: formData.receiver,
        receiverName: formData.receiver,
        receiverPhone: formData.receiverPhone || '+242 06 ••• •• ••',
        origin: formData.origin,
        originCity: formData.origin,
        destination: formData.destination,
        destinationCity: formData.destination,
        destinationAgency: formData.destinationAgency,
        weight: formData.weight,
        packageType: formData.packageType,
        estimatedDelivery: formData.estimatedDelivery,
        currentStatus: formData.currentStatus,
        events: newEvents,
        updatedAt: serverTimestamp()
      };

      await setDoc(docRef, payload, { merge: true });
      setShowModal(false);
      await fetchPackages();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde du colis.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(`Voulez-vous vraiment supprimer le colis ${id} ?`)) {
      try {
        await deleteDoc(doc(db, 'packages', id));
        fetchPackages();
      } catch (err) {
        console.error(err);
        alert('Erreur de suppression.');
      }
    }
  };

  const getStatusBadge = (status: PackageStatus) => {
    switch (status) {
      case 'arrived':
        return (
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-black uppercase tracking-wider flex items-center w-fit space-x-1">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Arrivé (À retirer)</span>
          </span>
        );
      case 'in_transit':
        return (
          <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-black uppercase tracking-wider flex items-center w-fit space-x-1">
            <Bus size={13} className="text-amber-600" />
            <span>En route (RN1)</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 bg-slate-200 text-slate-800 rounded-lg text-xs font-black uppercase tracking-wider flex items-center w-fit space-x-1">
            <CheckCircle2 size={13} className="text-slate-600" />
            <span>Retiré / Livré</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-blue-100 text-blue-900 rounded-lg text-xs font-black uppercase tracking-wider flex items-center w-fit space-x-1">
            <Clock size={13} className="text-blue-600" />
            <span>Enregistré</span>
          </span>
        );
    }
  };

  const filtered = packages.filter(
    (p) =>
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      (p.receiver || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.sender || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Package className="text-amber-500" size={26} />
            <span>Gestion du Fret & Colis</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-light">
            Enregistrez les dépôts et changez l'état en 1 clic pour que les clients sachent quand
            venir en agence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={seedingLoading}
            onClick={handleSeedDemos}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <Sparkles size={15} className="text-emerald-600" />
            <span>{seedingLoading ? 'Chargement...' : 'Charger les colis démo'}</span>
          </button>

          <button
            onClick={() => {
              setFormData({
                id: `NZK-${Math.floor(1000 + Math.random() * 9000)}-BZV`,
                sender: '',
                receiver: '',
                receiverPhone: '',
                origin: 'Pointe-Noire',
                destination: 'Brazzaville',
                destinationAgency: 'Gare Centrale Mpila',
                weight: '5.0 kg',
                packageType: 'Carton scellé',
                estimatedDelivery: 'Aujourd\'hui vers 16h30',
                currentStatus: 'registered',
                newEventNote: ''
              });
              setShowModal(true);
            }}
            className="bg-amber-500 hover:bg-amber-600 text-brand-dark font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Plus size={16} />
            <span>Nouveau Colis</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Search & List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center">
          <Search className="text-slate-400 mr-2 shrink-0" size={18} />
          <input
            type="text"
            placeholder="Rechercher par bordereau (ex: NZK-7842-BZV) ou nom de client..."
            className="w-full text-slate-900 focus:outline-none text-xs sm:text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5 text-left">Bordereau</th>
                <th className="px-5 py-3.5 text-left">Ligne / Trajet</th>
                <th className="px-5 py-3.5 text-left">Destinataire</th>
                <th className="px-5 py-3.5 text-left">Poids & Type</th>
                <th className="px-5 py-3.5 text-left">Statut</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    Chargement des colis...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center space-y-3">
                    <p className="text-slate-500 font-medium">
                      Aucun colis trouvé dans la base de données.
                    </p>
                    <button
                      type="button"
                      onClick={handleSeedDemos}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200"
                    >
                      <Sparkles size={14} />
                      <span>Charger les 4 colis de démo</span>
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-black text-slate-900">{pkg.id}</div>
                      <a
                        href={`/tracking?code=${pkg.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-amber-600 hover:underline flex items-center space-x-0.5 mt-0.5"
                      >
                        <span>Aperçu client</span>
                        <ExternalLink size={10} />
                      </a>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-800">
                        {pkg.origin || pkg.originCity} ➔ {pkg.destination || pkg.destinationCity}
                      </div>
                      <div className="text-[11px] text-slate-400 font-light">
                        {pkg.destinationAgency || 'Agence centrale'}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">
                        {pkg.receiver || pkg.receiverName || 'Non précisé'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {pkg.receiverPhone || 'Sans tél'}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-800">{pkg.weight || '-'}</span>
                      <div className="text-[11px] text-slate-400">{pkg.packageType || 'Colis'}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {getStatusBadge(pkg.currentStatus)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(pkg)}
                        className="text-amber-600 hover:text-amber-800 p-1.5 rounded-lg hover:bg-amber-50"
                        title="Modifier le statut ou les informations"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit / Add */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-black text-slate-900">
                {formData.id ? `Colis : ${formData.id}` : 'Nouveau Bordereau Fret'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mise à jour en temps réel pour le suivi public.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Numéro de bordereau (ID)
                </label>
                <input
                  required
                  type="text"
                  placeholder="ex: NZK-7842-BZV"
                  className="w-full border border-slate-300 rounded-xl p-3 uppercase font-black tracking-wider focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                />
              </div>

              {/* STATUT DU COLIS - PROÉMINENT */}
              <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl space-y-2">
                <label className="block font-black text-amber-950 uppercase tracking-wider text-[11px]">
                  État Actuel du Colis (Visible par le client) :
                </label>
                <select
                  className="w-full border border-amber-300 bg-white rounded-xl p-3 font-black text-xs text-slate-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  value={formData.currentStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, currentStatus: e.target.value as PackageStatus })
                  }
                >
                  <option value="registered">🔵 1. Enregistré en gare de départ</option>
                  <option value="in_transit">🟡 2. En cours de route sur la RN1</option>
                  <option value="arrived">
                    🟢 3. ARRIVÉ EN GARE (OUI, PRÊT POUR RETRAIT CLIENT !)
                  </option>
                  <option value="delivered">⚪ 4. Retiré par le destinataire (Clôturé)</option>
                </select>

                {formData.currentStatus === 'arrived' && (
                  <p className="text-[11px] text-emerald-800 font-bold bg-emerald-100 p-2 rounded-lg">
                    ✅ Le client verra la grande bannière verte : « OUI, VOTRE COLIS EST ARRIVÉ !
                    Vous pouvez vous rendre à l'agence pour le récupérer. »
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expéditeur</label>
                  <input
                    required
                    type="text"
                    placeholder="M. Roger BITEMO"
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                    value={formData.sender}
                    onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Destinataire (Nom complet)
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Mme Sylvie MAMPASSI"
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                    value={formData.receiver}
                    onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tél Destinataire</label>
                  <input
                    type="text"
                    placeholder="+242 06 654 32 10"
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                    value={formData.receiverPhone}
                    onChange={(e) => setFormData({ ...formData, receiverPhone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Poids & Nature</label>
                  <input
                    type="text"
                    placeholder="Carton 8.5 kg"
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gare de Départ</label>
                  <input
                    required
                    type="text"
                    placeholder="Pointe-Noire (31 Juillet)"
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Gare d'Arrivée (Retrait)
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Brazzaville (Gare Mpila)"
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Note d'événement (Ajoutée à l'historique)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Déchargé du car VIP NZ-104 et placé au guichet colis."
                  className="w-full border border-slate-300 rounded-xl p-2.5"
                  value={formData.newEventNote}
                  onChange={(e) => setFormData({ ...formData, newEventNote: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-yellow hover:bg-amber-400 text-brand-dark font-black uppercase tracking-wider rounded-xl shadow-md"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
