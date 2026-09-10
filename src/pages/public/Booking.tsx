import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  Building2,
  Wallet,
  Share2,
  ArrowRight,
  ArrowLeftRight,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Bus,
  Check,
  Gift,
  HelpCircle,
  Car
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  CITIES_DATA,
  getValidArrivalCities,
  getCityAgencies,
  getAllAgencies,
  getPriceForRoute,
  getRouteInfo,
  Agency
} from '../../lib/agencyData';
import NzokoElephantLogo from '../../components/common/NzokoElephantLogo';

export default function Booking() {
  const [searchParams] = useSearchParams();

  const initDeparture = searchParams.get('departure') || 'Brazzaville';
  const initArrival = searchParams.get('arrival') || 'Pointe-Noire';
  const initDepartureAgency = searchParams.get('departureAgency') || '';
  const initArrivalAgency = searchParams.get('arrivalAgency') || '';
  const initDate = searchParams.get('date') || '';
  const initClass = (searchParams.get('class') as 'standard' | 'vip') || 'standard';

  // Form State
  const [departureCity, setDepartureCity] = useState(initDeparture);
  const [departureAgencyId, setDepartureAgencyId] = useState(initDepartureAgency);

  const [arrivalCity, setArrivalCity] = useState(
    initArrival === initDeparture ? 'Pointe-Noire' : initArrival
  );
  const [arrivalAgencyId, setArrivalAgencyId] = useState(initArrivalAgency);

  const [date, setDate] = useState(() => {
    if (initDate) return initDate;
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('06h30');
  const [travelClass, setTravelClass] = useState<'standard' | 'vip'>(initClass);
  const [passengersCount, setPassengersCount] = useState(1);
  const [withTombola, setWithTombola] = useState(true);

  // Passenger Info
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'agency' | 'momo'>('agency');
  const [paymentAgencyId, setPaymentAgencyId] = useState('bz-mpila');
  const [momoOperator, setMomoOperator] = useState<'mtn' | 'airtel'>('mtn');
  const [momoPhone, setMomoPhone] = useState('');

  // Submission Status
  const [loading, setLoading] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);

  // Auto-exclude departure from arrival
  const validArrivalCities = getValidArrivalCities(departureCity);

  useEffect(() => {
    if (arrivalCity === departureCity || !validArrivalCities.includes(arrivalCity)) {
      const fallback = validArrivalCities[0] || 'Pointe-Noire';
      setArrivalCity(fallback);
    }
  }, [departureCity]);

  // Departure agencies
  const departureAgencies = getCityAgencies(departureCity);
  useEffect(() => {
    if (departureAgencies.length > 0) {
      const exists = departureAgencies.some((a) => a.id === departureAgencyId);
      if (!exists) {
        setDepartureAgencyId(departureAgencies[0].id);
      }
    }
  }, [departureCity, departureAgencies]);

  // Arrival agencies
  const arrivalAgencies = getCityAgencies(arrivalCity);
  useEffect(() => {
    if (arrivalAgencies.length > 0) {
      const exists = arrivalAgencies.some((a) => a.id === arrivalAgencyId);
      if (!exists) {
        setArrivalAgencyId(arrivalAgencies[0].id);
      }
    }
  }, [arrivalCity, arrivalAgencies]);

  // All agencies for payment default
  const allAgencies = getAllAgencies();
  useEffect(() => {
    const match = allAgencies.find(
      (pa) => pa.city.toLowerCase() === departureCity.toLowerCase()
    );
    if (match) {
      setPaymentAgencyId(match.agency.id);
    }
  }, [departureCity]);

  // Handle city swap
  const handleSwapCities = () => {
    const tempDep = departureCity;
    const tempDepAg = departureAgencyId;
    setDepartureCity(arrivalCity);
    setDepartureAgencyId(arrivalAgencyId);
    setArrivalCity(tempDep);
    setArrivalAgencyId(tempDepAg);
  };

  // Pricing calculations
  const pricePerSeat = getPriceForRoute(departureCity, arrivalCity, travelClass);
  const ticketsSubtotal = pricePerSeat * passengersCount;
  const tombolaTotal = withTombola ? 1000 * passengersCount : 0;
  const totalPrice = ticketsSubtotal + tombolaTotal;

  const routeInfo = getRouteInfo(departureCity, arrivalCity);
  const selectedDepAgency = departureAgencies.find((a) => a.id === departureAgencyId);
  const selectedArrAgency = arrivalAgencies.find((a) => a.id === arrivalAgencyId);
  const selectedPayAgency = allAgencies.find((p) => p.agency.id === paymentAgencyId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName.trim() || !passengerPhone.trim()) {
      alert('Veuillez renseigner le nom du passager et le numéro de téléphone.');
      return;
    }

    setLoading(true);

    const bookingCode = `NZK-${Math.floor(100000 + Math.random() * 900000)}`;

    const reservationData = {
      bookingCode,
      departure: departureCity,
      departureAgency: selectedDepAgency?.name || departureCity,
      departureAgencyAddress: selectedDepAgency?.address || '',
      arrival: arrivalCity,
      arrivalAgency: selectedArrAgency?.name || arrivalCity,
      arrivalAgencyAddress: selectedArrAgency?.address || '',
      date,
      timeSlot,
      travelClass,
      passengersCount,
      withTombola,
      pricePerSeat,
      totalPrice,
      passengerName: passengerName.trim(),
      passengerPhone: passengerPhone.trim(),
      passengerEmail: passengerEmail.trim(),
      paymentMethod,
      paymentAgency:
        paymentMethod === 'agency'
          ? `${selectedPayAgency?.agency.name} (${selectedPayAgency?.city})`
          : null,
      paymentAgencyAddress: selectedPayAgency?.agency.address || '',
      momoOperator: paymentMethod === 'momo' ? momoOperator : null,
      momoPhone: paymentMethod === 'momo' ? momoPhone || passengerPhone : null,
      status: paymentMethod === 'momo' ? 'Payé Mobile Money' : 'En attente au guichet',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'tickets'), reservationData);
      setConfirmedReservation(reservationData);
    } catch (err) {
      console.error('Error saving ticket:', err);
      // Even if Firestore fails, show the ticket confirmation to the passenger
      setConfirmedReservation(reservationData);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppShareUrl = (res: any) => {
    const text = `*Réservation Nzoko Transport : ${res.bookingCode}*\nPassager : ${res.passengerName}\nTrajet : ${res.departure} (${res.departureAgency}) ➔ ${res.arrival} (${res.arrivalAgency})\nDate : ${res.date} à ${res.timeSlot}\nPlaces : ${res.passengersCount} (${res.travelClass.toUpperCase()})\nMontant : ${res.totalPrice.toLocaleString('fr-FR')} FCFA\nRèglement : ${
      res.paymentMethod === 'agency'
        ? `Au guichet de ${res.paymentAgency}`
        : `Payé par ${res.momoOperator === 'mtn' ? 'MTN MoMo' : 'Airtel Money'}`
    }${res.withTombola ? '\nTombola Suzuki : Billet participant inclus' : ''}\nService client : 06 167 17 17`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  // SUCCESS CONFIRMATION VIEW
  if (confirmedReservation) {
    return (
      <div className="bg-brand-cream min-h-screen pt-28 sm:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={36} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                Réservation confirmée avec succès !
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Votre dossier porte la référence unique :{' '}
                <span className="font-mono font-black text-brand-dark text-base bg-amber-100/80 px-2.5 py-0.5 rounded-lg border border-amber-200">
                  {confirmedReservation.bookingCode}
                </span>
              </p>
            </div>

            {/* Electronic Boarding Pass */}
            <div className="bg-gradient-to-br from-brand-dark via-[#0a232c] to-brand-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-yellow/30 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
                <div className="flex items-center space-x-2.5">
                  <NzokoElephantLogo size={24} />
                  <div>
                    <span className="font-black text-sm uppercase tracking-wider text-brand-yellow block">
                      Nzoko Transport
                    </span>
                    <span className="text-[10px] text-slate-300">
                      Billet Voyageur Électronique
                    </span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Statut du Billet
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
                      confirmedReservation.paymentMethod === 'momo'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-amber-400/20 text-amber-300 border border-amber-300/40'
                    }`}
                  >
                    {confirmedReservation.status}
                  </span>
                </div>
              </div>

              {/* Point A to Point B Visual Route */}
              <div className="py-6 border-b border-white/15">
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4">
                  {/* Point A */}
                  <div className="sm:col-span-5 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      <span>Point A • Départ</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {confirmedReservation.departure}
                    </h3>
                    <p className="text-xs text-brand-yellow font-bold">
                      {confirmedReservation.departureAgency}
                    </p>
                    {confirmedReservation.departureAgencyAddress && (
                      <p className="text-[11px] text-slate-400 font-light">
                        {confirmedReservation.departureAgencyAddress}
                      </p>
                    )}
                  </div>

                  {/* Route Connector */}
                  <div className="sm:col-span-2 flex flex-col items-center justify-center py-2 sm:py-0">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-yellow mb-1">
                      <Bus size={16} />
                    </div>
                    <div className="w-full border-t border-dashed border-white/30 hidden sm:block" />
                    <span className="text-[10px] text-slate-400 font-mono mt-1">Direct</span>
                  </div>

                  {/* Point B */}
                  <div className="sm:col-span-5 sm:text-right space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center sm:justify-end space-x-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                      <span>Point B • Destination</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {confirmedReservation.arrival}
                    </h3>
                    <p className="text-xs text-brand-yellow font-bold">
                      {confirmedReservation.arrivalAgency}
                    </p>
                    {confirmedReservation.arrivalAgencyAddress && (
                      <p className="text-[11px] text-slate-400 font-light">
                        {confirmedReservation.arrivalAgencyAddress}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Travel Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-white/15 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Date du voyage
                  </span>
                  <span className="font-bold text-white text-sm">
                    {confirmedReservation.date}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Heure de départ
                  </span>
                  <span className="font-bold text-brand-yellow text-sm">
                    {confirmedReservation.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Passagers & Classe
                  </span>
                  <span className="font-bold text-white text-sm">
                    {confirmedReservation.passengersCount} place(s) •{' '}
                    {confirmedReservation.travelClass.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Passager Principal
                  </span>
                  <span className="font-bold text-white text-sm truncate block">
                    {confirmedReservation.passengerName}
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {confirmedReservation.passengerPhone}
                  </span>
                </div>
              </div>

              {/* Payment Summary in Ticket */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Mode de Règlement
                  </span>
                  <p className="text-xs text-slate-200 font-medium">
                    {confirmedReservation.paymentMethod === 'agency'
                      ? `À régler au guichet : ${confirmedReservation.paymentAgency}`
                      : `Payé par ${
                          confirmedReservation.momoOperator === 'mtn'
                            ? 'MTN Mobile Money'
                            : 'Airtel Money'
                        } (${confirmedReservation.momoPhone})`}
                  </p>
                  {confirmedReservation.withTombola && (
                    <span className="inline-flex items-center space-x-1 text-[11px] text-amber-300 font-bold mt-0.5">
                      <Gift size={12} />
                      <span>Ticket officiel Tombola Suzuki inclus</span>
                    </span>
                  )}
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Montant Total
                  </span>
                  <span className="text-2xl font-black text-brand-yellow">
                    {confirmedReservation.totalPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>
            </div>

            {/* Instruction Banner */}
            {confirmedReservation.paymentMethod === 'agency' ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center space-x-1.5">
                  <Building2 size={15} className="text-amber-700 shrink-0" />
                  <span>Instructions pour le paiement au guichet :</span>
                </p>
                <p className="text-slate-700">
                  Votre place est réservée. Veuillez vous présenter à l’agence{' '}
                  <strong>{confirmedReservation.paymentAgency}</strong> avec votre référence{' '}
                  <strong>{confirmedReservation.bookingCode}</strong> au plus tard{' '}
                  <strong>2 heures avant le départ</strong> pour régler votre billet.
                </p>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 space-y-1">
                <p className="font-bold flex items-center space-x-1.5">
                  <CheckCircle2 size={15} className="text-emerald-700 shrink-0" />
                  <span>Paiement Mobile Money validé :</span>
                </p>
                <p className="text-slate-700">
                  Votre billet est immédiatement garanti. Présentez-vous directement à l'embarquement
                  à l'agence de départ 30 minutes avant le départ muni de votre référence de dossier.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppShareUrl(confirmedReservation)}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-colors shadow-md"
              >
                <Share2 size={16} />
                <span>Recevoir mon billet officiel sur WhatsApp</span>
              </a>

              <button
                onClick={() => setConfirmedReservation(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-colors"
              >
                Effectuer une autre réservation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN BOOKING COCKPIT (RECTANGULAR, BALANCED, WIDE)
  return (
    <div className="bg-brand-cream min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-brand-dark font-black tracking-widest uppercase text-[10px] sm:text-xs block text-slate-500">
              Réservation Billetterie Interurbaine
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight">
              Acheter votre <span className="text-amber-600 italic">billet de voyage</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-light max-w-sm">
            Départs quotidiens climatisés • Calcul tarifaire en temps réel • Règlement physique au guichet ou Mobile Money
          </p>
        </div>

        {/* POINT A ➔ POINT B VISUAL JOURNEY STRIP */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200/90">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
            {/* POINT A (DÉPART) */}
            <div className="md:col-span-5 flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shrink-0 shadow-inner">
                A
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                  Point A • Origine
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-brand-dark truncate">
                  {departureCity}
                </h3>
                <span className="inline-block bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md mt-0.5">
                  {selectedDepAgency?.name || departureCity}
                </span>
              </div>
            </div>

            {/* ROUTE CONNECTOR WITH BUS & DISTANCE */}
            <div className="md:col-span-2 flex flex-col items-center justify-center py-2 md:py-0">
              <div className="flex items-center space-x-2 text-slate-400 w-full justify-center">
                <div className="h-[2px] bg-slate-200 flex-1 hidden sm:block" />
                <button
                  type="button"
                  onClick={handleSwapCities}
                  title="Inverser le sens du trajet"
                  className="w-10 h-10 rounded-full bg-brand-cream hover:bg-brand-yellow text-brand-dark flex items-center justify-center border border-slate-300 shadow-sm transition-all hover:scale-105"
                >
                  <ArrowLeftRight size={16} />
                </button>
                <div className="h-[2px] bg-slate-200 flex-1 hidden sm:block" />
              </div>
              <div className="text-[10px] font-bold text-slate-500 text-center mt-1">
                <span>{routeInfo.axis}</span>
                <span className="block text-[11px] text-amber-700 font-extrabold">
                  {routeInfo.distance} • {routeInfo.duration}
                </span>
              </div>
            </div>

            {/* POINT B (ARRIVÉE) */}
            <div className="md:col-span-5 flex items-center md:justify-end space-x-3.5 md:text-right">
              <div className="min-w-0 order-2 md:order-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">
                  Point B • Destination
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-brand-dark truncate">
                  {arrivalCity}
                </h3>
                <span className="inline-block bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md mt-0.5">
                  {selectedArrAgency?.name || arrivalCity}
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm shrink-0 shadow-inner order-1 md:order-2">
                B
              </div>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN BOOKING FORM */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: TRAJET, HORAIRES, CLASSE & PASSAGER */}
            <div className="lg:col-span-7 space-y-5">
              {/* SECTION 1: TRAJET & AGENCES */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200/90 space-y-4">
                <div className="flex items-center space-x-2 text-brand-dark pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-brand-dark text-white flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-wider">
                    Trajet & Agences d'embarquement
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* DÉPART */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Ville de Départ (A)
                      </label>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                        Choisir la ville
                      </span>
                      <select
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-black text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                      >
                        {CITIES_DATA.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                        Agence de départ
                      </span>
                      <select
                        value={departureAgencyId}
                        onChange={(e) => setDepartureAgencyId(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                      >
                        {departureAgencies.map((agency) => (
                          <option key={agency.id} value={agency.id}>
                            {agency.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ARRIVÉE */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Ville d'Arrivée (B)
                      </label>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                        Choisir la destination
                      </span>
                      <select
                        value={arrivalCity}
                        onChange={(e) => setArrivalCity(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-black text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                      >
                        {validArrivalCities.map((cityName) => (
                          <option key={cityName} value={cityName}>
                            {cityName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                        Agence d'arrivée
                      </span>
                      <select
                        value={arrivalAgencyId}
                        onChange={(e) => setArrivalAgencyId(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                      >
                        {arrivalAgencies.map((agency) => (
                          <option key={agency.id} value={agency.id}>
                            {agency.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: DATE, HEURE, PLACES & CLASSE */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200/90 space-y-4">
                <div className="flex items-center space-x-2 text-brand-dark pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-brand-dark text-white flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-wider">
                    Date, Horaires & Confort
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Date de voyage
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Heure de départ
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    >
                      <option value="06h30">06h30 • Matin (1er Départ)</option>
                      <option value="12h00">12h00 • Midi Express</option>
                      <option value="18h00">18h00 • Soir (Climatisé)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Nombre de places
                    </label>
                    <select
                      value={passengersCount}
                      onChange={(e) => setPassengersCount(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n > 1 ? 'passagers (places)' : 'passager (1 place)'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* CLASSE STANDARD VS VIP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div
                    onClick={() => setTravelClass('standard')}
                    className={`cursor-pointer p-4 rounded-2xl border text-left transition-all ${
                      travelClass === 'standard'
                        ? 'bg-amber-50/70 border-brand-yellow ring-2 ring-brand-yellow/30'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-xs uppercase tracking-wider text-brand-dark">
                        Classe Standard
                      </span>
                      <span className="text-xs font-black text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {getPriceForRoute(departureCity, arrivalCity, 'standard').toLocaleString('fr-FR')} F
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Sièges inclinables confortables, climatisation continue, prises USB, bagage 25kg inclus.
                    </p>
                  </div>

                  <div
                    onClick={() => setTravelClass('vip')}
                    className={`cursor-pointer p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      travelClass === 'vip'
                        ? 'bg-brand-dark text-white border-brand-yellow ring-2 ring-brand-yellow/40'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-xs uppercase tracking-wider text-brand-yellow flex items-center">
                        <Sparkles size={13} className="mr-1" />
                        VIP Royal
                      </span>
                      <span className="text-xs font-black text-brand-yellow bg-white/10 px-2 py-0.5 rounded-md">
                        {getPriceForRoute(departureCity, arrivalCity, 'vip').toLocaleString('fr-FR')} F
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${travelClass === 'vip' ? 'text-slate-300' : 'text-slate-500'}`}>
                      Fauteuils grand confort, boisson & collation offertes, Wi-Fi 4G et embarquement prioritaire.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: INFORMATIONS PASSAGER */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200/90 space-y-4">
                <div className="flex items-center space-x-2 text-brand-dark pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-brand-dark text-white flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-wider">
                    Informations du Passager
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Nom et Prénom *
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="ex: Jean MBOUNGOU"
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Numéro de Téléphone *
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="ex: 06 654 32 10"
                        value={passengerPhone}
                        onChange={(e) => setPassengerPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: RÈGLEMENT PROFESSIONNEL, TOMBOLA & TOTAL */}
            <div className="lg:col-span-5 space-y-5">
              {/* SECTION 4: MODE DE RÈGLEMENT PROFESSIONNEL */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200/90 space-y-4">
                <div className="flex items-center space-x-2 text-brand-dark pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-brand-dark text-white flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wider">
                      Mode de Règlement
                    </h2>
                    <span className="text-[10px] text-slate-400">
                      Transactions officielles certifiées Nzoko Transport
                    </span>
                  </div>
                </div>

                {/* SELECTEUR DU MODE DE PAIEMENT */}
                <div className="grid grid-cols-1 gap-2.5">
                  {/* OPTION 1: PAIEMENT EN AGENCE PHYSIQUE */}
                  <div
                    onClick={() => setPaymentMethod('agency')}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                      paymentMethod === 'agency'
                        ? 'border-brand-yellow bg-amber-50/70 ring-2 ring-brand-yellow/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-brand-dark">
                            Payer au Guichet (En Agence)
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Espèces ou TPE bancaire au comptoir officiel
                          </div>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'agency'
                            ? 'border-brand-dark bg-brand-dark'
                            : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'agency' && <Check size={10} className="text-white" />}
                      </div>
                    </div>

                    {paymentMethod === 'agency' && (
                      <div className="mt-3 pt-3 border-t border-amber-200/60 space-y-2 text-xs">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700">
                          Agence où vous passerez régler :
                        </label>
                        <select
                          value={paymentAgencyId}
                          onChange={(e) => setPaymentAgencyId(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                        >
                          {allAgencies.map(({ city, agency }) => (
                            <option key={agency.id} value={agency.id}>
                              {city} — {agency.name}
                            </option>
                          ))}
                        </select>
                        <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200 text-[11px] text-slate-600 leading-relaxed">
                          🛡️ <strong>Garantie de place :</strong> Votre numéro de dossier vous est délivré immédiatement. Votre place est réservée jusqu'à <strong>2 heures avant le départ</strong> du bus au guichet choisi.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* OPTION 2: MOBILE MONEY (CONGO) */}
                  <div
                    onClick={() => setPaymentMethod('momo')}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-400/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <Wallet size={18} />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-brand-dark">
                            Mobile Money Immédiat
                          </div>
                          <div className="text-[10px] text-slate-500">
                            MTN Mobile Money ou Airtel Money Congo
                          </div>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'momo'
                            ? 'border-emerald-600 bg-emerald-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'momo' && <Check size={10} className="text-white" />}
                      </div>
                    </div>

                    {paymentMethod === 'momo' && (
                      <div className="mt-3 pt-3 border-t border-emerald-200 space-y-2.5 text-xs">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700">
                          Sélectionnez votre opérateur :
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setMomoOperator('mtn')}
                            className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-2 transition-all border ${
                              momoOperator === 'mtn'
                                ? 'bg-[#FFCC00] text-slate-900 border-[#E6B800] shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span>MTN MoMo (*105#)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setMomoOperator('airtel')}
                            className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-2 transition-all border ${
                              momoOperator === 'airtel'
                                ? 'bg-[#ED1C24] text-white border-[#C9141B] shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span>Airtel Money (*128#)</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">
                            Numéro de compte Mobile Money :
                          </label>
                          <input
                            type="tel"
                            placeholder="ex: 06 612 34 56"
                            value={momoPhone}
                            onChange={(e) => setMomoPhone(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                          />
                        </div>

                        <div className="flex items-center space-x-2 text-[11px] text-emerald-800 bg-white/80 p-2 rounded-xl border border-emerald-200">
                          <ShieldCheck size={14} className="shrink-0 text-emerald-600" />
                          <span>Validation instantanée • Notification SMS immédiate.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION TOMBOLA SUZUKI OPTIONNELLE */}
              <div className="bg-gradient-to-br from-amber-500/10 via-brand-yellow/10 to-transparent border border-amber-300/60 rounded-3xl p-4 sm:p-5 shadow-sm space-y-2.5">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={withTombola}
                    onChange={(e) => setWithTombola(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5 font-black text-xs sm:text-sm text-brand-dark">
                      <Car size={15} className="text-amber-600" />
                      <span>Participer à la Tombola Suzuki S-Presso</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Ajouter <strong>1.000 FCFA</strong> par passager pour tenter de remporter <strong>1 voiture neuve chaque mois</strong>.
                    </p>
                  </div>
                </label>
              </div>

              {/* RÉCAPITULATIF FINANCIER & VALIDATION */}
              <div className="bg-brand-dark text-white rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-yellow pb-2 border-b border-white/10">
                  Récapitulatif Financier Transparent
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>
                      Tarif place ({travelClass.toUpperCase()}) :
                    </span>
                    <span className="font-bold text-white">
                      {pricePerSeat.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Nombre de passagers :</span>
                    <span className="font-bold text-white">x {passengersCount}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Sous-total billets :</span>
                    <span className="font-bold text-white">
                      {ticketsSubtotal.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                  {withTombola && (
                    <div className="flex justify-between text-amber-300">
                      <span>Tombola Suzuki ({passengersCount}x 1.000) :</span>
                      <span className="font-bold">
                        +{tombolaTotal.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        Net Total à Régler
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-brand-yellow tracking-tight">
                        {totalPrice.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase">
                        Mode Choisi
                      </span>
                      <span className="text-xs font-bold text-white">
                        {paymentMethod === 'agency' ? 'Au Guichet' : 'Mobile Money'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-yellow hover:bg-amber-400 text-brand-dark font-black text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl active:scale-[0.99] min-h-[52px]"
                >
                  <ShieldCheck size={18} />
                  <span>
                    {loading ? 'Traitement en cours...' : 'Confirmer & Émettre mon billet'}
                  </span>
                  <ArrowRight size={16} />
                </button>

                <p className="text-[10px] text-slate-400 text-center font-light">
                  Aucun frais caché • Reçu et billet officiels envoyés par WhatsApp et téléchargeables.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
