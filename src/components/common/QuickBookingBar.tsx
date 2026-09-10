import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  ArrowRight,
  ArrowLeftRight,
  Sparkles,
  ShieldCheck,
  Clock
} from 'lucide-react';
import {
  CITIES_DATA,
  getValidArrivalCities,
  getCityAgencies,
  getPriceForRoute,
  getRouteInfo
} from '../../lib/agencyData';

export default function QuickBookingBar() {
  const navigate = useNavigate();

  const [departureCity, setDepartureCity] = useState('Brazzaville');
  const [arrivalCity, setArrivalCity] = useState('Pointe-Noire');
  const [departureAgencyId, setDepartureAgencyId] = useState('bz-mpila');
  const [arrivalAgencyId, setArrivalAgencyId] = useState('pnr-31juillet');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [travelClass, setTravelClass] = useState<'standard' | 'vip'>('standard');

  const validArrivalCities = getValidArrivalCities(departureCity);

  useEffect(() => {
    if (arrivalCity === departureCity || !validArrivalCities.includes(arrivalCity)) {
      const fallback = validArrivalCities[0] || 'Pointe-Noire';
      setArrivalCity(fallback);
    }
  }, [departureCity]);

  const departureAgencies = getCityAgencies(departureCity);
  useEffect(() => {
    if (departureAgencies.length > 0 && !departureAgencies.some((a) => a.id === departureAgencyId)) {
      setDepartureAgencyId(departureAgencies[0].id);
    }
  }, [departureCity, departureAgencies]);

  const arrivalAgencies = getCityAgencies(arrivalCity);
  useEffect(() => {
    if (arrivalAgencies.length > 0 && !arrivalAgencies.some((a) => a.id === arrivalAgencyId)) {
      setArrivalAgencyId(arrivalAgencies[0].id);
    }
  }, [arrivalCity, arrivalAgencies]);

  const handleSwap = () => {
    const tempCity = departureCity;
    const tempAgency = departureAgencyId;
    setDepartureCity(arrivalCity);
    setDepartureAgencyId(arrivalAgencyId);
    setArrivalCity(tempCity);
    setArrivalAgencyId(tempAgency);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      departure: departureCity,
      arrival: arrivalCity,
      departureAgency: departureAgencyId,
      arrivalAgency: arrivalAgencyId,
      date,
      class: travelClass
    });
    navigate(`/booking?${params.toString()}`);
  };

  const price = getPriceForRoute(departureCity, arrivalCity, travelClass);
  const route = getRouteInfo(departureCity, arrivalCity);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/90 max-w-7xl mx-auto">
      {/* Top Header / Bar Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-yellow/20 text-brand-dark flex items-center justify-center font-black text-xs">
            NZK
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-brand-dark tracking-tight">
              Réserver votre voyage en ligne
            </h3>
            <p className="text-[11px] text-slate-500 font-light">
              Départs quotidiens climatisés • Règlement en agence ou Mobile Money
            </p>
          </div>
        </div>

        {/* Route info badge */}
        <div className="hidden lg:flex items-center space-x-3 text-xs text-slate-600 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
          <span className="font-semibold text-brand-dark">{route.axis}</span>
          <span className="text-slate-300">•</span>
          <span>{route.distance}</span>
          <span className="text-slate-300">•</span>
          <span className="font-bold text-amber-600">{route.duration}</span>
        </div>
      </div>

      {/* Main Search Controls */}
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* DEPARTURE */}
          <div className="md:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 focus-within:border-brand-yellow focus-within:bg-white transition-all">
            <div className="flex items-center space-x-1.5 text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Point A • Départ
              </label>
            </div>
            <select
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-black text-brand-dark focus:outline-none cursor-pointer"
            >
              {CITIES_DATA.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={departureAgencyId}
              onChange={(e) => setDepartureAgencyId(e.target.value)}
              className="w-full bg-transparent text-[11px] font-medium text-slate-600 focus:outline-none mt-1 cursor-pointer truncate"
            >
              {departureAgencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>

          {/* SWAP BUTTON */}
          <div className="hidden md:flex md:col-span-1 justify-center pb-3">
            <button
              type="button"
              onClick={handleSwap}
              title="Inverser les villes"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-brand-yellow hover:text-brand-dark text-slate-600 flex items-center justify-center transition-all border border-slate-200 shadow-sm"
            >
              <ArrowLeftRight size={14} />
            </button>
          </div>

          {/* ARRIVAL */}
          <div className="md:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 focus-within:border-brand-yellow focus-within:bg-white transition-all">
            <div className="flex items-center space-x-1.5 text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Point B • Destination
              </label>
            </div>
            <select
              value={arrivalCity}
              onChange={(e) => setArrivalCity(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-black text-brand-dark focus:outline-none cursor-pointer"
            >
              {validArrivalCities.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <select
              value={arrivalAgencyId}
              onChange={(e) => setArrivalAgencyId(e.target.value)}
              className="w-full bg-transparent text-[11px] font-medium text-slate-600 focus:outline-none mt-1 cursor-pointer truncate"
            >
              {arrivalAgencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>

          {/* DATE */}
          <div className="md:col-span-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 focus-within:border-brand-yellow focus-within:bg-white transition-all">
            <div className="flex items-center space-x-1.5 text-slate-500 mb-1">
              <Calendar size={12} className="text-slate-400" />
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Date de départ
              </label>
            </div>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-black text-brand-dark focus:outline-none cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 mt-1">
              Départs : 06h30 • 12h00 • 18h00
            </div>
          </div>

          {/* SUBMIT BUTTON WITH CALCULATED PRICE */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full bg-brand-yellow hover:bg-amber-400 text-brand-dark font-black text-xs sm:text-sm uppercase tracking-wider py-3.5 px-4 rounded-2xl flex items-center justify-between shadow-md transition-all group min-h-[58px]"
            >
              <div className="text-left leading-tight">
                <span className="block text-[10px] font-bold text-slate-700">
                  Dès {price.toLocaleString('fr-FR')} FCFA
                </span>
                <span className="text-xs sm:text-sm font-black">Acheter le billet</span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-brand-dark/10 group-hover:bg-brand-dark group-hover:text-brand-yellow text-brand-dark flex items-center justify-center transition-colors">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
