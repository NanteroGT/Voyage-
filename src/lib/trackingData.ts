export type PackageStatus = 'registered' | 'in_transit' | 'arrived' | 'delivered';

export interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
  isCompleted: boolean;
}

export interface PackageData {
  trackingId: string;
  senderName: string;
  senderCity: string;
  receiverName: string;
  receiverPhone: string;
  originCity: string;
  originAgency: string;
  destinationCity: string;
  destinationAgency: string;
  agencyAddress: string;
  agencyOpeningHours: string;
  agencyPhone: string;
  weight: string;
  packageType: string;
  createdAt: string;
  estimatedArrival: string;
  currentStatus: PackageStatus;
  events: TrackingEvent[];
}

export const DEMO_PACKAGES: Record<string, PackageData> = {
  'NZK-7842-BZV': {
    trackingId: 'NZK-7842-BZV',
    senderName: 'M. Roger BITEMO',
    senderCity: 'Pointe-Noire',
    receiverName: 'Mme Sylvie MAMPASSI',
    receiverPhone: '+242 06 654 32 10',
    originCity: 'Pointe-Noire',
    originAgency: 'Agence Centrale 31 Juillet',
    destinationCity: 'Brazzaville',
    destinationAgency: 'Agence Centrale Mpila (Face au port)',
    agencyAddress: 'Gare Nzoko Transport Mpila, Avenue du Camp, Brazzaville',
    agencyOpeningHours: 'Lundi au Dimanche de 06h00 à 18h30 sans interruption',
    agencyPhone: '06 167 17 17',
    weight: '8.5 kg',
    packageType: 'Carton scellé (Effets personnels & vivres)',
    createdAt: 'Hier à 14h20',
    estimatedArrival: 'Aujourd\'hui à 11h15 (Arrivé)',
    currentStatus: 'arrived',
    events: [
      {
        date: 'Aujourd\'hui',
        time: '11h15',
        location: 'Gare Mpila, Brazzaville',
        status: 'Arrivé en agence - Prêt pour retrait',
        description: 'Le car VIP NZ-104 est arrivé en gare. Le colis a été déchargé, contrôlé et est disponible immédiatement au guichet fret.',
        isCompleted: true
      },
      {
        date: 'Aujourd\'hui',
        time: '09h45',
        location: 'Route Nationale 1 (RN1) - Dolisie',
        status: 'En transit sur la RN1',
        description: 'Passage du convoi à Dolisie, circulation fluide en direction de Brazzaville.',
        isCompleted: true
      },
      {
        date: 'Aujourd\'hui',
        time: '06h00',
        location: 'Agence 31 Juillet, Pointe-Noire',
        status: 'Chargé en soute & Départ',
        description: 'Colis placé en soute sécurisée dans l\'autocar de 06h00.',
        isCompleted: true
      },
      {
        date: 'Hier',
        time: '14h20',
        location: 'Agence 31 Juillet, Pointe-Noire',
        status: 'Dépôt & Enregistrement',
        description: 'Colis pesé, étiqueté et quittance émise au guichet fret.',
        isCompleted: true
      }
    ]
  },

  'NZK-1099-PNR': {
    trackingId: 'NZK-1099-PNR',
    senderName: 'Entreprise Congo Tech',
    senderCity: 'Brazzaville',
    receiverName: 'M. Jean-Paul LOUMBOU',
    receiverPhone: '+242 05 512 88 99',
    originCity: 'Brazzaville',
    originAgency: 'Agence Centrale Mpila',
    destinationCity: 'Pointe-Noire',
    destinationAgency: 'Agence Centrale 31 Juillet',
    agencyAddress: 'Rond-point du 31 Juillet, Pointe-Noire',
    agencyOpeningHours: 'Lundi au Dimanche de 06h00 à 18h30',
    agencyPhone: '06 167 17 17',
    weight: '1.2 kg',
    packageType: 'Plis confidentiel sécurisé (Documents)',
    createdAt: 'Aujourd\'hui à 06h15',
    estimatedArrival: 'Aujourd\'hui vers 16h45',
    currentStatus: 'in_transit',
    events: [
      {
        date: 'Aujourd\'hui',
        time: '10h30',
        location: 'Route Nationale 1 (vers Nkayi)',
        status: 'En cours de route sur la RN1',
        description: 'L\'autocar a dépassé Nkayi et poursuit son trajet vers Pointe-Noire.',
        isCompleted: true
      },
      {
        date: 'Aujourd\'hui',
        time: '07h00',
        location: 'Agence Mpila, Brazzaville',
        status: 'Chargé en soute & Départ',
        description: 'Départ du bus avec le sac de courriers scellés.',
        isCompleted: true
      },
      {
        date: 'Aujourd\'hui',
        time: '06h15',
        location: 'Agence Mpila, Brazzaville',
        status: 'Dépôt & Enregistrement',
        description: 'Plis enregistré et vérifié au guichet express.',
        isCompleted: true
      }
    ]
  },

  'NZK-3341-DOL': {
    trackingId: 'NZK-3341-DOL',
    senderName: 'Mme Chantal MOUSSOKI',
    senderCity: 'Dolisie',
    receiverName: 'M. Paul KOUKA',
    receiverPhone: '+242 06 422 11 00',
    originCity: 'Dolisie',
    originAgency: 'Agence Dolisie Centre',
    destinationCity: 'Brazzaville',
    destinationAgency: 'Agence Centrale Mpila',
    agencyAddress: 'Gare Nzoko Mpila, Brazzaville',
    agencyOpeningHours: '06h00 - 18h30',
    agencyPhone: '06 167 17 17',
    weight: '15.0 kg',
    packageType: 'Sac de vivres frais',
    createdAt: 'Aujourd\'hui à 15h10',
    estimatedArrival: 'Demain vers 12h00',
    currentStatus: 'registered',
    events: [
      {
        date: 'Aujourd\'hui',
        time: '15h10',
        location: 'Agence Dolisie Centre',
        status: 'Enregistré au guichet fret',
        description: 'Colis déposé, pesé et stocké en zone sécurisée. Chargement prévu dans le premier bus du matin à 06h30.',
        isCompleted: true
      }
    ]
  },

  'NZK-5520-RET': {
    trackingId: 'NZK-5520-RET',
    senderName: 'M. Alain MOUKOKO',
    senderCity: 'Pointe-Noire',
    receiverName: 'Mlle Grâce NGATSE',
    receiverPhone: '+242 06 910 20 30',
    originCity: 'Pointe-Noire',
    originAgency: 'Agence Centrale 31 Juillet',
    destinationCity: 'Brazzaville',
    destinationAgency: 'Agence Centrale Mpila',
    agencyAddress: 'Gare Nzoko Mpila, Brazzaville',
    agencyOpeningHours: '06h00 - 18h30',
    agencyPhone: '06 167 17 17',
    weight: '3.0 kg',
    packageType: 'Colis scellé',
    createdAt: 'Il y a 2 jours',
    estimatedArrival: 'Livré',
    currentStatus: 'delivered',
    events: [
      {
        date: 'Hier',
        time: '17h40',
        location: 'Gare Mpila, Brazzaville',
        status: 'Colis retiré par le destinataire',
        description: 'Colis remis en main propre à Mlle Grâce NGATSE sur présentation de sa CNI et signature du registre.',
        isCompleted: true
      },
      {
        date: 'Hier',
        time: '11h30',
        location: 'Gare Mpila, Brazzaville',
        status: 'Arrivé en agence',
        description: 'Colis mis à disposition au guichet.',
        isCompleted: true
      },
      {
        date: 'Hier',
        time: '06h00',
        location: 'Agence 31 Juillet, Pointe-Noire',
        status: 'Départ du bus',
        description: 'En route vers Brazzaville.',
        isCompleted: true
      }
    ]
  }
};

export function getStatusConfig(status: PackageStatus) {
  switch (status) {
    case 'arrived':
      return {
        label: 'ARRIVÉ EN GARE - PRÊT POUR RETRAIT',
        isArrived: true,
        badgeBg: 'bg-emerald-500 text-white',
        cardBg: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white',
        borderAccent: 'border-emerald-400',
        textColor: 'text-emerald-700',
        headline: 'OUI, VOTRE COLIS EST ARRIVÉ !',
        subheadline: 'Vous pouvez dès maintenant vous rendre à l\'agence pour le récupérer.',
        actionText: 'À retirer à l\'agence',
        stepIndex: 3
      };
    case 'in_transit':
      return {
        label: 'EN COURS DE ROUTE SUR LA RN1',
        isArrived: false,
        badgeBg: 'bg-amber-500 text-brand-dark font-black',
        cardBg: 'bg-gradient-to-br from-amber-500 to-amber-600 text-brand-dark',
        borderAccent: 'border-amber-300',
        textColor: 'text-amber-800',
        headline: 'EN COURS D\'ACHEMINEMENT',
        subheadline: 'Le bus circule actuellement sur la Route Nationale 1 vers sa destination.',
        actionText: 'Arrivée estimée sous peu',
        stepIndex: 2
      };
    case 'registered':
      return {
        label: 'ENREGISTRÉ EN GARE DE DÉPART',
        isArrived: false,
        badgeBg: 'bg-blue-600 text-white',
        cardBg: 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white',
        borderAccent: 'border-blue-300',
        textColor: 'text-blue-700',
        headline: 'ENREGISTRÉ AU GUICHET DE DÉPART',
        subheadline: 'Le colis a été pesé et sécurisé. Il sera embarqué dans le prochain départ.',
        actionText: 'En attente de chargement',
        stepIndex: 1
      };
    case 'delivered':
      return {
        label: 'COLIS RETIRÉ / LIVRÉ',
        isArrived: true,
        badgeBg: 'bg-slate-700 text-white',
        cardBg: 'bg-gradient-to-br from-slate-800 to-slate-900 text-white',
        borderAccent: 'border-slate-500',
        textColor: 'text-slate-700',
        headline: 'COLIS DÉJÀ RETIRÉ',
        subheadline: 'Ce colis a été remis au destinataire avec accusé de réception.',
        actionText: 'Remis avec succès',
        stepIndex: 4
      };
  }
}

export function generateWhatsAppShareUrl(pkg: PackageData): string {
  const isArrived = pkg.currentStatus === 'arrived';
  const text = isArrived
    ? `Bonjour ! Le colis *${pkg.trackingId}* envoyé par ${pkg.senderName} est *ARRIVÉ* à l'agence Nzoko Transport de ${pkg.destinationCity} (${pkg.destinationAgency}). Tu peux te présenter avec ta pièce d'identité pour le récupérer.\nLien de suivi : https://nzokotransport.com/tracking?code=${pkg.trackingId}`
    : `Bonjour ! Voici le lien de suivi du colis *${pkg.trackingId}* (trajet ${pkg.originCity} ➔ ${pkg.destinationCity}) chez Nzoko Transport :\nhttps://nzokotransport.com/tracking?code=${pkg.trackingId}`;

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
