import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  Share2,
  ArrowRight,
  Bus,
  AlertCircle,
  FileText,
  UserCheck,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  PackageData,
  DEMO_PACKAGES,
  getStatusConfig,
  generateWhatsAppShareUrl
} from '../../lib/trackingData';
import NzokoElephantLogo from '../../components/common/NzokoElephantLogo';

export default function Tracking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || 'NZK-7842-BZV';

  const [trackingNumber, setTrackingNumber] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    if (initialCode) {
      handleSearch(initialCode);
    }
  }, [initialCode]);

  const handleSearch = async (codeToSearch: string) => {
    const cleanCode = codeToSearch.trim().toUpperCase();
    if (!cleanCode) {
      setError('Veuillez entrer un numéro de bordereau de colis (ex: NZK-7842-BZV).');
      setPackageData(null);
      return;
    }

    setLoading(true);
    setError('');

    // Update query string
    setSearchParams({ code: cleanCode });

    try {
      // 1. Try Firestore first
      const docRef = doc(db, 'packages', cleanCode);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const d = snap.data();
        const normalized: PackageData = {
          trackingId: snap.id,
          senderName: d.sender || d.senderName || 'Expéditeur',
          senderCity: d.originCity || d.origin || 'Agence de départ',
          receiverName: d.receiver || d.receiverName || 'Destinataire',
          receiverPhone: d.receiverPhone || '+242 06 ••• •• ••',
          originCity: d.origin || d.originCity || 'Pointe-Noire',
          originAgency: d.originAgency || `Agence ${d.origin || ''}`,
          destinationCity: d.destination || d.destinationCity || 'Brazzaville',
          destinationAgency: d.destinationAgency || `Gare ${d.destination || ''}`,
          agencyAddress: d.agencyAddress || `Gare Nzoko Transport de ${d.destination || ''}`,
          agencyOpeningHours: d.agencyOpeningHours || '06h00 - 18h30 (7j/7)',
          agencyPhone: d.agencyPhone || '06 167 17 17',
          weight: d.weight || 'Colis standard',
          packageType: d.packageType || 'Colis scellé',
          createdAt: d.createdAt || 'Enregistré',
          estimatedArrival: d.estimatedDelivery || d.estimatedArrival || 'À déterminer',
          currentStatus: (d.currentStatus as any) || 'registered',
          events: d.events || [
            {
              date: 'Aujourd\'hui',
              time: '08:00',
              location: d.origin || 'Agence',
              status: 'Enregistré',
              description: 'Colis pris en charge par le service fret.',
              isCompleted: true
            }
          ]
        };
        setPackageData(normalized);
        setIsDemoMode(false);
      } else if (DEMO_PACKAGES[cleanCode]) {
        // 2. Fallback to rich Demo package
        setPackageData(DEMO_PACKAGES[cleanCode]);
        setIsDemoMode(true);
      } else {
        // Not found
        setPackageData(null);
        setError(
          `Le numéro de bordereau "${cleanCode}" est introuvable. Vérifiez les chiffres sur votre quittance de dépôt ou testez l'un des exemples ci-dessous.`
        );
      }
    } catch (err) {
      console.error(err);
      // If Firestore has a network/permission hiccup, fallback to demo if matches
      if (DEMO_PACKAGES[cleanCode]) {
        setPackageData(DEMO_PACKAGES[cleanCode]);
        setIsDemoMode(true);
      } else {
        setError('Impossible de joindre le serveur. Vous pouvez tester avec nos exemples ci-dessous.');
      }
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = packageData ? getStatusConfig(packageData.currentStatus) : null;

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      {/* Header & Search Bar */}
      <div className="relative bg-brand-dark pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-28 text-white overflow-hidden">
        {/* Background Subtle Decors */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-10 -right-10 text-brand-yellow">
            <Package size={340} />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/95 to-brand-dark/80" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <NzokoElephantLogo size={20} />
            <span className="text-brand-yellow font-black text-xs tracking-widest uppercase">
              Service Fret & Colis Express
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            Suivi de Colis & Plis
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-6 sm:mb-8">
            Saisissez votre code de bordereau pour savoir instantanément si votre colis est{' '}
            <strong className="text-brand-yellow font-bold">arrivé en gare</strong> et prêt à être
            récupéré.
          </p>

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(trackingNumber);
            }}
            className="flex flex-col sm:flex-row shadow-2xl max-w-2xl mx-auto rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-2 border border-white/20 gap-2"
          >
            <div className="flex-1 flex items-center px-4 py-2 sm:py-0">
              <Search className="text-brand-yellow mr-3 shrink-0" size={22} />
              <input
                type="text"
                placeholder="Ex : NZK-7842-BZV"
                className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-base sm:text-lg uppercase font-black tracking-wider"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-yellow text-brand-dark font-black uppercase tracking-wider text-xs px-7 py-3.5 rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center min-h-[46px] shadow-lg shrink-0 cursor-pointer"
            >
              {loading ? (
                <span className="animate-pulse flex items-center space-x-2">
                  <Package size={16} className="animate-spin" />
                  <span>Vérification...</span>
                </span>
              ) : (
                <span>Vérifier mon colis</span>
              )}
            </button>
          </form>

          {/* Quick Demo Chips */}
          <div className="mt-5 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-1.5 text-xs text-slate-400 mb-2">
              <Sparkles size={14} className="text-brand-yellow" />
              <span className="font-medium text-[11px] uppercase tracking-wider">
                Exemples prêts à tester en un clic :
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTrackingNumber('NZK-7842-BZV');
                  handleSearch('NZK-7842-BZV');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 ${
                  trackingNumber === 'NZK-7842-BZV' && packageData?.currentStatus === 'arrived'
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-md ring-2 ring-emerald-300/40'
                    : 'bg-white/10 hover:bg-white/20 text-emerald-300 border-emerald-400/40'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>NZK-7842-BZV (Colis ARRIVÉ)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTrackingNumber('NZK-1099-PNR');
                  handleSearch('NZK-1099-PNR');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 ${
                  trackingNumber === 'NZK-1099-PNR'
                    ? 'bg-amber-500 text-brand-dark border-amber-300 shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-amber-300 border-amber-400/40'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>NZK-1099-PNR (En route sur RN1)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTrackingNumber('NZK-3341-DOL');
                  handleSearch('NZK-3341-DOL');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 ${
                  trackingNumber === 'NZK-3341-DOL'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-blue-300 border-blue-400/40'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>NZK-3341-DOL (Enregistré au départ)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20 space-y-6 sm:space-y-8">
        {/* Error Alert if Not Found */}
        {error && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-200 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={26} />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-brand-dark">
              Numéro de bordereau non reconnu
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-light leading-relaxed">
              {error}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setTrackingNumber('NZK-7842-BZV');
                  handleSearch('NZK-7842-BZV');
                }}
                className="bg-brand-yellow text-brand-dark font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-amber-400 transition-colors shadow-sm inline-flex items-center space-x-2"
              >
                <span>Tester avec le colis arrivé (NZK-7842-BZV)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Results Card */}
        {packageData && statusConfig && (
          <div className="space-y-6 sm:space-y-8">
            {/* 1. THE BIG VERDICT CARD ("EST-CE QU'IL EST ARRIVÉ ?") */}
            <div
              className={`rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 ${
                statusConfig.borderAccent
              } ${
                packageData.currentStatus === 'arrived'
                  ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white'
                  : packageData.currentStatus === 'in_transit'
                  ? 'bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-brand-dark'
                  : packageData.currentStatus === 'registered'
                  ? 'bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white'
                  : 'bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md border border-white/30">
                      Bordereau {packageData.trackingId}
                    </span>
                    {isDemoMode && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/20 text-white border border-white/20">
                        Exemple Démo
                      </span>
                    )}
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shrink-0 shadow-lg">
                      {packageData.currentStatus === 'arrived' ? (
                        <CheckCircle2 size={32} className="text-emerald-600" />
                      ) : packageData.currentStatus === 'in_transit' ? (
                        <Bus size={30} className="text-amber-600" />
                      ) : packageData.currentStatus === 'registered' ? (
                        <Package size={30} className="text-blue-700" />
                      ) : (
                        <UserCheck size={30} className="text-slate-800" />
                      )}
                    </div>

                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                        {statusConfig.headline}
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base opacity-90 font-light mt-1 max-w-2xl leading-relaxed">
                        {statusConfig.subheadline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Box */}
                <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
                  <a
                    href={generateWhatsAppShareUrl(packageData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-slate-100 text-brand-dark font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <Share2 size={16} className="text-emerald-600" />
                    <span>Prévenir par WhatsApp</span>
                  </a>

                  <a
                    href="tel:061671717"
                    className="bg-black/20 hover:bg-black/30 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-white/25 transition-all flex items-center justify-center space-x-2 text-center"
                  >
                    <Phone size={15} />
                    <span>Hotline Fret : 06 167 17 17</span>
                  </a>
                </div>
              </div>

              {/* Specific Agency Alert if Arrived */}
              {packageData.currentStatus === 'arrived' && (
                <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm border border-white/15">
                    <p className="font-black text-brand-yellow uppercase tracking-wider text-[10px] mb-1">
                      1. Lieu de retrait
                    </p>
                    <p className="font-bold">{packageData.destinationAgency}</p>
                    <p className="opacity-80 text-[11px] mt-0.5">{packageData.agencyAddress}</p>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm border border-white/15">
                    <p className="font-black text-brand-yellow uppercase tracking-wider text-[10px] mb-1">
                      2. Horaires d'ouverture
                    </p>
                    <p className="font-bold">{packageData.agencyOpeningHours}</p>
                    <p className="opacity-80 text-[11px] mt-0.5">Guichet colis & bagages</p>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm border border-white/15">
                    <p className="font-black text-brand-yellow uppercase tracking-wider text-[10px] mb-1">
                      3. Pièces obligatoires
                    </p>
                    <p className="font-bold">Pièce d'identité originale</p>
                    <p className="opacity-80 text-[11px] mt-0.5">
                      Au nom de {packageData.receiverName} + Code
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. PROGRESS STEPPER (4 SIMPLE STEPS) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                Progression du parcours d'acheminement
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                {/* Step 1 */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    statusConfig.stepIndex >= 1
                      ? 'bg-brand-cream border-brand-yellow/50 text-brand-dark'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider">Étape 1</span>
                    {statusConfig.stepIndex >= 1 ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <h4 className="font-black text-sm">Dépôt & Enregistrement</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{packageData.originCity}</p>
                </div>

                {/* Step 2 */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    statusConfig.stepIndex >= 2
                      ? statusConfig.stepIndex === 2
                        ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm ring-2 ring-amber-300/50'
                        : 'bg-brand-cream border-brand-yellow/50 text-brand-dark'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider">Étape 2</span>
                    {statusConfig.stepIndex > 2 ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : statusConfig.stepIndex === 2 ? (
                      <Bus size={16} className="text-amber-600 animate-pulse" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <h4 className="font-black text-sm">En route sur la RN1</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Trajet interurbain</p>
                </div>

                {/* Step 3 */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    statusConfig.stepIndex >= 3
                      ? statusConfig.stepIndex === 3
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-400/50'
                        : 'bg-brand-cream border-brand-yellow/50 text-brand-dark'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider">Étape 3</span>
                    {statusConfig.stepIndex >= 3 ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <h4 className="font-black text-sm">Arrivé en gare</h4>
                  <p className="text-[11px] font-bold text-emerald-700 mt-1">Prêt pour retrait</p>
                </div>

                {/* Step 4 */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    statusConfig.stepIndex >= 4
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider">Étape 4</span>
                    {statusConfig.stepIndex >= 4 ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <h4 className="font-black text-sm">Remis au destinataire</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Clôturé avec signature</p>
                </div>
              </div>
            </div>

            {/* 3. TWO COLUMNS DETAILS: RECAP & TIMELINE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Summary Info */}
              <div className="lg:col-span-5 space-y-6">
                {/* Package Identification Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Bordereau Fret
                      </span>
                      <h4 className="text-xl font-black text-brand-dark tracking-tight">
                        {packageData.trackingId}
                      </h4>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusConfig.badgeBg}`}
                    >
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-500 font-light">Origine (Départ)</span>
                      <span className="font-bold text-slate-900">{packageData.originCity}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-500 font-light">Destination (Arrivée)</span>
                      <span className="font-bold text-emerald-700">
                        {packageData.destinationCity}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-500 font-light">Expéditeur</span>
                      <span className="font-bold text-slate-900">{packageData.senderName}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-500 font-light">Destinataire</span>
                      <span className="font-bold text-slate-900">{packageData.receiverName}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-500 font-light">Téléphone destinataire</span>
                      <span className="font-bold text-slate-900">{packageData.receiverPhone}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-500 font-light">Poids déclaré</span>
                      <span className="font-black text-brand-dark bg-brand-cream px-2 py-0.5 rounded-md">
                        {packageData.weight}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500 font-light">Nature de l'envoi</span>
                      <span className="font-medium text-slate-800 text-right">
                        {packageData.packageType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Where to Pick up Card */}
                <div className="bg-brand-dark text-white rounded-3xl p-6 border border-white/10 shadow-lg space-y-4">
                  <div className="flex items-center space-x-2 text-brand-yellow font-bold text-xs uppercase tracking-wider">
                    <MapPin size={16} />
                    <span>Agence de Retrait</span>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-white">
                      {packageData.destinationAgency}
                    </h4>
                    <p className="text-xs text-slate-300 font-light mt-1">
                      {packageData.agencyAddress}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Horaires</p>
                      <p className="font-bold text-white">{packageData.agencyOpeningHours}</p>
                    </div>
                    <a
                      href={`tel:${packageData.agencyPhone.replace(/\s/g, '')}`}
                      className="bg-brand-yellow text-brand-dark font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-amber-400 transition-colors flex items-center space-x-1"
                    >
                      <Phone size={13} />
                      <span>{packageData.agencyPhone}</span>
                    </a>
                  </div>
                </div>

                {/* Security Advice for Pickup */}
                <div className="bg-amber-50 rounded-3xl p-5 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="flex items-center space-x-2 font-black uppercase tracking-wider text-[11px] text-amber-950">
                    <ShieldAlert size={16} className="text-amber-600 shrink-0" />
                    <span>Consignes de sécurité pour le retrait</span>
                  </div>
                  <p className="font-light leading-relaxed">
                    Pour des raisons de sécurité stricte, les colis ne sont remis que sur présentation
                    de la <strong>pièce d'identité originale</strong> du destinataire désigné sur la
                    quittance de dépôt.
                  </p>
                </div>
              </div>

              {/* Right Column: Timeline Events */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-base sm:text-lg font-black text-brand-dark flex items-center tracking-tight">
                      <Clock size={18} className="text-brand-yellow mr-2 shrink-0" />
                      <span>Historique détaillé des étapes</span>
                    </h3>
                    <span className="text-xs font-bold text-slate-400">
                      {packageData.events?.length || 0} pointages
                    </span>
                  </div>

                  <div className="relative border-l-2 border-brand-yellow/40 ml-4 space-y-8 py-2">
                    {packageData.events && packageData.events.length > 0 ? (
                      packageData.events.map((evt, idx) => (
                        <div key={idx} className="relative pl-6">
                          {/* Dot */}
                          <span
                            className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full ring-4 ring-white shadow-sm flex items-center justify-center ${
                              idx === 0 ? 'bg-emerald-500' : 'bg-slate-300'
                            }`}
                          >
                            {idx === 0 && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </span>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                            <h4 className="text-sm sm:text-base font-black text-brand-dark">
                              {evt.status}
                            </h4>
                            <span className="text-[11px] font-bold text-brand-dark bg-brand-cream px-2.5 py-0.5 rounded-md w-fit">
                              {evt.date} - {evt.time}
                            </span>
                          </div>

                          <p className="text-slate-600 font-light text-xs sm:text-sm leading-relaxed mb-2">
                            {evt.description}
                          </p>

                          <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <MapPin size={12} className="text-brand-yellow mr-1 shrink-0" />
                            <span>{evt.location}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic pl-6">
                        Aucun événement pour le moment.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Informative FAQ / Guide Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <NzokoElephantLogo size={28} className="mx-auto" />
            <h3 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight">
              Comment fonctionne le Fret chez Nzoko Transport ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              Notre charte d'expédition garantit rapidité, intégrité des colis et traçabilité
              permanente entre toutes nos gares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
            <div className="bg-brand-cream/50 rounded-2xl p-5 border border-slate-200/60 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-brand-yellow text-brand-dark flex items-center justify-center font-black">
                1
              </div>
              <h4 className="font-bold text-brand-dark text-sm">Dépôt en agence</h4>
              <p className="text-slate-600 font-light leading-relaxed">
                Présentez votre colis au guichet fret au moins 45 minutes avant le départ du bus. Une
                pesée est effectuée et une quittance avec code de suivi vous est remise.
              </p>
            </div>

            <div className="bg-brand-cream/50 rounded-2xl p-5 border border-slate-200/60 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-brand-yellow text-brand-dark flex items-center justify-center font-black">
                2
              </div>
              <h4 className="font-bold text-brand-dark text-sm">Acheminement sécurisé</h4>
              <p className="text-slate-600 font-light leading-relaxed">
                Les colis voyagent dans des soutes capitonnées et verrouillées. Chaque convoi est
                suivi par géolocalisation GPS tout au long de la Route Nationale 1.
              </p>
            </div>

            <div className="bg-brand-cream/50 rounded-2xl p-5 border border-slate-200/60 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-brand-yellow text-brand-dark flex items-center justify-center font-black">
                3
              </div>
              <h4 className="font-bold text-brand-dark text-sm">Retrait sans attente</h4>
              <p className="text-slate-600 font-light leading-relaxed">
                Dès que le statut passe au vert « Arrivé en gare », le destinataire se présente au
                guichet avec sa pièce d'identité originale et repart avec son colis.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              <span>Une question sur votre expédition ? Appelez directement le </span>
              <strong className="text-brand-dark font-black">06 167 17 17</strong>
            </div>

            <a
              href="tel:061671717"
              className="bg-brand-dark text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors inline-flex items-center space-x-1.5"
            >
              <Phone size={13} className="text-brand-yellow" />
              <span>Contacter le guichet fret</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
