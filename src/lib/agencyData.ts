export interface Agency {
  id: string;
  name: string;
  address?: string;
}

export interface CityData {
  name: string;
  agencies: Agency[];
}

export const CITIES_DATA: CityData[] = [
  {
    name: 'Brazzaville',
    agencies: [
      { id: 'bz-mpila', name: 'Agence de Mpila', address: 'Quartier Mpila, Face au port' },
      { id: 'bz-chateau', name: "Agence de Château d'Eau", address: 'Makélékélé, Rond-Point Château d’eau' },
      { id: 'bz-tsieme', name: 'Agence de La Tsiémé', address: 'Talangaï / La Tsiémé' },
      { id: 'bz-moungali', name: 'Agence de Moungali', address: 'Arrondissement 4 Moungali' },
      { id: 'bz-mafouta', name: 'Agence de Mafouta', address: 'Sortie Sud RN1' },
      { id: 'bz-kintele', name: 'Agence de Kintélé', address: 'Axe Nord RN2' },
      { id: 'bz-nkombo', name: 'Agence de Nkombo', address: 'Rond-Point Nkombo' }
    ]
  },
  {
    name: 'Pointe-Noire',
    agencies: [
      { id: 'pnr-31juillet', name: 'Agence du 31 Juillet', address: 'Rond-point du 31 Juillet, Centre-ville' },
      { id: 'pnr-ngoyo', name: 'Agence de Ngoyo', address: 'Avenue principale Ngoyo' },
      { id: 'pnr-nkouikou', name: 'Agence de Nkouikou', address: 'Grand Marché Nkouikou' },
      { id: 'pnr-siafoumou', name: 'Agence de Siafoumou', address: 'Carrefour Siafoumou' },
      { id: 'pnr-tietie', name: 'Agence de Tié-Tié', address: 'Zone Tié-Tié' },
      { id: 'pnr-mpaka', name: 'Agence de Mpaka', address: 'Avenue principale Mpaka' },
      { id: 'pnr-vindoulou', name: 'Agence de Vindoulou', address: 'Sortie Nord RN1' }
    ]
  },
  {
    name: 'Dolisie',
    agencies: [
      { id: 'dol-centre', name: 'Agence de Dolisie', address: 'Centre-ville Dolisie' }
    ]
  },
  {
    name: 'Nkayi',
    agencies: [
      { id: 'nka-centre', name: 'Agence de Nkayi', address: 'Centre-ville Nkayi' }
    ]
  },
  {
    name: 'Oyo',
    agencies: [
      { id: 'oyo-centre', name: "Agence d'Oyo", address: 'Gare routière moderne d\'Oyo' }
    ]
  },
  {
    name: 'Gamboma',
    agencies: [
      { id: 'gam-centre', name: 'Agence de Gamboma', address: 'Axe RN2 Gamboma' }
    ]
  },
  {
    name: 'Ngo',
    agencies: [
      { id: 'ngo-centre', name: 'Agence de Ngo', address: 'Axe RN2 Ngo' }
    ]
  }
];

export const TICKET_PRICES: Record<string, { standard: number; vip: number }> = {
  'Brazzaville-Pointe-Noire': { standard: 13000, vip: 20000 },
  'Pointe-Noire-Brazzaville': { standard: 13000, vip: 20000 },
  'Brazzaville-Dolisie': { standard: 10000, vip: 16000 },
  'Dolisie-Brazzaville': { standard: 10000, vip: 16000 },
  'Pointe-Noire-Dolisie': { standard: 6000, vip: 10000 },
  'Dolisie-Pointe-Noire': { standard: 6000, vip: 10000 },
  'Brazzaville-Nkayi': { standard: 9000, vip: 14000 },
  'Nkayi-Brazzaville': { standard: 9000, vip: 14000 },
  'Brazzaville-Oyo': { standard: 12000, vip: 18000 },
  'Oyo-Brazzaville': { standard: 12000, vip: 18000 },
  'Brazzaville-Gamboma': { standard: 9000, vip: 14000 },
  'Gamboma-Brazzaville': { standard: 9000, vip: 14000 },
  'Brazzaville-Ngo': { standard: 7000, vip: 11000 },
  'Ngo-Brazzaville': { standard: 7000, vip: 11000 }
};

export function getPriceForRoute(departure: string, arrival: string, travelClass: 'standard' | 'vip' = 'standard'): number {
  const key = `${departure}-${arrival}`;
  const priceObj = TICKET_PRICES[key];
  if (priceObj) {
    return travelClass === 'vip' ? priceObj.vip : priceObj.standard;
  }
  return travelClass === 'vip' ? 20000 : 13000;
}

export function getAllCities(): string[] {
  return CITIES_DATA.map((c) => c.name);
}

export function getCityAgencies(cityName: string): Agency[] {
  const city = CITIES_DATA.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
  return city ? city.agencies : [];
}

/**
 * Retourne la liste des villes d'arrivée possibles en excluant la ville de départ.
 */
export function getValidArrivalCities(departureCity: string): string[] {
  return CITIES_DATA.map((c) => c.name).filter(
    (name) => name.toLowerCase() !== (departureCity || '').toLowerCase()
  );
}

/**
 * Retourne toutes les agences disponibles.
 */
export function getAllAgencies(): { city: string; agency: Agency }[] {
  const list: { city: string; agency: Agency }[] = [];
  CITIES_DATA.forEach((city) => {
    city.agencies.forEach((agency) => {
      list.push({ city: city.name, agency });
    });
  });
  return list;
}

export interface RouteInfo {
  distance: string;
  duration: string;
  axis: string;
}

export function getRouteInfo(departure: string, arrival: string): RouteInfo {
  const pair = [departure, arrival].sort().join('-');
  if (pair === 'Brazzaville-Pointe-Noire') {
    return { distance: '512 km', duration: 'Env. 7h30', axis: 'Route Nationale 1 (RN1)' };
  }
  if (pair === 'Brazzaville-Dolisie') {
    return { distance: '360 km', duration: 'Env. 5h30', axis: 'Route Nationale 1 (RN1)' };
  }
  if (pair === 'Dolisie-Pointe-Noire') {
    return { distance: '150 km', duration: 'Env. 2h30', axis: 'Route Nationale 1 (RN1)' };
  }
  if (pair === 'Brazzaville-Nkayi') {
    return { distance: '240 km', duration: 'Env. 4h00', axis: 'Route Nationale 1 (RN1)' };
  }
  if (pair === 'Brazzaville-Oyo') {
    return { distance: '410 km', duration: 'Env. 5h00', axis: 'Route Nationale 2 (RN2 Nord)' };
  }
  if (pair === 'Brazzaville-Gamboma') {
    return { distance: '310 km', duration: 'Env. 4h00', axis: 'Route Nationale 2 (RN2 Nord)' };
  }
  if (pair === 'Brazzaville-Ngo') {
    return { distance: '210 km', duration: 'Env. 3h00', axis: 'Route Nationale 2 (RN2 Nord)' };
  }
  return { distance: 'Liaison Interurbaine', duration: 'Service Régulier', axis: 'Corridor National' };
}
