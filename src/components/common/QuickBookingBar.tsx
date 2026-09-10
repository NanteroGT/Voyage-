import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  ArrowUpDown,
  ArrowLeftRight,
  Bus,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import {
  CITIES_DATA,
  getValidArrivalCities,
  getCityAgencies,
  getPriceForRoute,
  getRouteInfo,
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
  const [travelClass] = useState<'standard' | 'vip'>('standard');

  const validArrivalCities = getValidArrivalCities(departureCity);

  useEffect(() => {
    if (arrivalCity === departureCity || !validArrivalCities.includes(arrivalCity)) {
      const fallback = validArrivalCities[0] || 'Pointe-Noire';
      setArrivalCity(fallback);
    }
  }, [departureCity, arrivalCity, validArrivalCities]);

  const departureAgencies = getCityAgencies(departureCity);
  useEffect(() => {
    if (departureAgencies.length > 0 && !departureAgencies.some((a) => a.id === departureAgencyId)) {
      setDepartureAgencyId(departureAgencies[0].id);
    }
  }, [departureCity, departureAgencies, departureAgencyId]);

  const arrivalAgencies = getCityAgencies(arrivalCity);
  useEffect(() => {
    if (arrivalAgencies.length > 0 && !arrivalAgencies.some((a) => a.id === arrivalAgencyId)) {
      setArrivalAgencyId(arrivalAgencies[0].id);
    }
  }, [arrivalCity, arrivalAgencies, arrivalAgencyId]);

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
      class: travelClass,
    });
    navigate(`/booking?${params.toString()}`);
  };

  const price = getPriceForRoute(departureCity, arrivalCity, travelClass);
  const route = getRouteInfo(departureCity, arrivalCity);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/90 max-w-7xl mx-auto">
      {/* 1. TOP HEADER */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-brand-dark flex items-center justify-center shrink-0">
            <Bus size={17} className="text-brand-dark" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
              Réserver votre voyage en ligne
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-normal">
              Départs quotidiens climatisés • Règlement en agence ou Mobile Money
            </p>
          </div>
        </div>

        {/* Route info badge (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
          <span className="font-semibold text-brand-dark">{route.axis}</span>
          <span className="text-slate-300">•</span>
          <span>{route.distance}</span>
          <span className="text-slate-300">•</span>
          <span className="font-semibold text-amber-600">{route.duration}</span>
        </div>
      </div>

      {/* 2. MAIN SEARCH FORM */}
      <form onSubmit={handleSearch}>
        {/* MOBILE LAYOUT (Connected Route Card) */}
        <div className="block md:hidden space-y-3">
          {/* Unified Departure & Arrival block with integrated Swap button */}
          <div className="relative bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-200/80">
            {/* Point A : Départ */}
            <div className="p-3 pr-12 relative">
              <div className="flex items-center space-x-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Point A • Départ
                </span>
              </div>
              <div className="relative">
                <select
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6 py-0.5"
                >
                  {CITIES_DATA.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative mt-0.5">
                <select
                  value={departureAgencyId}
                  onChange={(e) => setDepartureAgencyId(e.target.value)}
                  className="w-full bg-transparent text-xs font-normal text-slate-500 focus:outline-none appearance-none cursor-pointer pr-6 truncate"
                >
                  {departureAgencies.map((agency) => (
                    <option key={agency.id} value={agency.id}>
                      {agency.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Floating Swap Button on Mobile (centered between the two rows) */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
              <button
                type="button"
                onClick={handleSwap}
                title="Inverser les villes"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-brand-dark hover:border-amber-400 flex items-center justify-center transition-transform active:rotate-180"
              >
                <ArrowUpDown size={14} />
              </button>
            </div>

            {/* Point B : Destination */}
            <div className="p-3 pr-12 relative">
              <div className="flex items-center space-x-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Point B • Destination
                </span>
              </div>
              <div className="relative">
                <select
                  value={arrivalCity}
                  onChange={(e) => setArrivalCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6 py-0.5"
                >
                  {validArrivalCities.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative mt-0.5">
                <select
                  value={arrivalAgencyId}
                  onChange={(e) => setArrivalAgencyId(e.target.value)}
                  className="w-full bg-transparent text-xs font-normal text-slate-500 focus:outline-none appearance-none cursor-pointer pr-6 truncate"
                >
                  {arrivalAgencies.map((agency) => (
                    <option key={agency.id} value={agency.id}>
                      {agency.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Date Picker (Mobile) */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-3">
            <div className="flex items-center space-x-1.5 mb-1">
              <Calendar size={13} className="text-slate-400" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Date de départ
              </span>
            </div>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm font-normal text-slate-800 focus:outline-none cursor-pointer py-0.5"
            />
            <div className="text-[11px] text-slate-400 font-normal mt-0.5">
              3 départs/jour : 06h30 • 12h00 • 18h00
            </div>
          </div>

          {/* Submit Button (Mobile) */}
          <button
            type="submit"
            className="w-full bg-brand-yellow hover:bg-amber-400 text-brand-dark font-bold text-sm py-3 px-4 rounded-2xl flex items-center justify-between shadow-md transition-all active:scale-[0.99]"
          >
            <div className="text-left">
              <span className="block text-xs font-semibold text-slate-800">
                Dès {price.toLocaleString('fr-FR')} FCFA / place
              </span>
              <span className="text-sm font-black uppercase tracking-wider text-brand-dark">
                Acheter le billet
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-brand-dark/10 text-brand-dark flex items-center justify-center">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>

        {/* DESKTOP LAYOUT (md and above) */}
        <div className="hidden md:grid md:grid-cols-12 gap-3 items-end">
          {/* DEPARTURE */}
          <div className="md:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 focus-within:border-brand-yellow focus-within:bg-white transition-all">
            <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Point A • Départ
              </label>
            </div>
            <div className="relative">
              <select
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer appearance-none pr-5 py-0.5"
              >
                {CITIES_DATA.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative mt-0.5">
              <select
                value={departureAgencyId}
                onChange={(e) => setDepartureAgencyId(e.target.value)}
                className="w-full bg-transparent text-xs font-normal text-slate-500 focus:outline-none cursor-pointer appearance-none pr-5 truncate"
              >
                {departureAgencies.map((agency) => (
                  <option key={agency.id} value={agency.id}>
                    {agency.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={11} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* SWAP BUTTON */}
          <div className="md:col-span-1 flex justify-center pb-2.5">
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
            <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Point B • Destination
              </label>
            </div>
            <div className="relative">
              <select
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer appearance-none pr-5 py-0.5"
              >
                {validArrivalCities.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative mt-0.5">
              <select
                value={arrivalAgencyId}
                onChange={(e) => setArrivalAgencyId(e.target.value)}
                className="w-full bg-transparent text-xs font-normal text-slate-500 focus:outline-none cursor-pointer appearance-none pr-5 truncate"
              >
                {arrivalAgencies.map((agency) => (
                  <option key={agency.id} value={agency.id}>
                    {agency.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={11} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* DATE */}
          <div className="md:col-span-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 focus-within:border-brand-yellow focus-within:bg-white transition-all">
            <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
              <Calendar size={12} className="text-slate-400" />
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Date de départ
              </label>
            </div>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm font-normal text-slate-800 focus:outline-none cursor-pointer py-0.5"
            />
            <div className="text-[10px] text-slate-400 font-normal mt-1">
              06h30 • 12h00 • 18h00
            </div>
          </div>

          {/* SUBMIT BUTTON WITH CALCULATED PRICE */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full bg-brand-yellow hover:bg-amber-400 text-brand-dark font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-4 rounded-2xl flex items-center justify-between shadow-md transition-all group min-h-[58px]"
            >
              <div className="text-left leading-tight">
                <span className="block text-[10px] font-medium text-slate-700">
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
