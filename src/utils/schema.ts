interface SchemaData {
  '@context': string;
  '@type': string;
  name: string;
  image?: string;
  description: string;
  address?: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: string;
    longitude: string;
  };
  url: string;
  telephone: string;
  priceRange: string;
}

interface HouseSchema {
  name: string;
  description: string;
  url: string;
  identifier: string;
  image: string[];
  containedInPlace: {
    '@type': string;
    name: string;
    address: {
      '@type': string;
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
    };
  };
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  occupancy: {
    '@type': string;
    maxValue: number;
    unitText: string;
  };
  numberOfRooms: number;
  numberOfBedrooms: number;
  numberOfBathroomsTotal: number;
  floorSize: {
    '@type': string;
    value: number;
    unitCode: string;
  };
  yearBuilt: number;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  amenityFeature: Array<{
    '@type': string;
    name: string;
    value: boolean | string;
  }>;
  accommodationCategory: string;
  tourBookingPage: string;
  additionalProperty: Array<{
    '@type': string;
    name: string;
    value: string;
  }>;
}

const BASE_URL = 'https://casamisueno.nl';
const STRUCTURED_DATA_SCRIPT_ID = 'cms-structured-data';
const FAQ_ROUTE_PATH = '/praktisch';

const ROUTE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/over-ons': 'Over Ons',
  '/het-huis': 'Het Huis',
  '/buiten-leven': 'Buiten Leven',
  '/omgeving': 'Omgeving',
  '/fotos': "Foto's",
  '/praktisch': 'Praktisch',
  '/contact': 'Contact',
  '/reserveren': 'Reserveren',
  '/privacy': 'Privacy',
  '/voorwaarden': 'Voorwaarden',
  '/sitemap': 'Sitemap'
};

const PRACTICAL_FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'Zijn honden toegestaan?',
    answer: 'Ja, honden zijn welkom in Casa Mi Sueño in overleg. Laat het ons weten bij je boeking zodat we hier rekening mee kunnen houden.'
  },
  {
    question: 'Wat zijn de in- en uitchecktijden?',
    answer: 'Inchecken kan vanaf 16:00 uur. Op de dag van vertrek vragen we je om uiterlijk 10:00 uur uit te checken.'
  },
  {
    question: 'Is het huis geschikt voor kinderen?',
    answer: 'Ja, Casa Mi Sueño is geschikt voor families met kinderen. Houd rekening met het zwembad: ouderlijk toezicht blijft noodzakelijk.'
  },
  {
    question: 'Hoe werkt het zwembadonderhoud?',
    answer: 'Het zwembad wordt bij voorkeur door de huurder bijgehouden met automatische pomp/filter, chloortabletten en robotstofzuiger. In noodgevallen kan de beheerder helpen.'
  },
  {
    question: 'Kan er tussentijdse schoonmaak geregeld worden?',
    answer: 'Ja, tussentijdse schoonmaak kan via de sleutelbeheerder worden geregeld tijdens het verblijf.'
  },
  {
    question: 'Zijn handdoeken en beddengoed inbegrepen?',
    answer: 'Er is een optioneel linnenpakket beschikbaar per slaapkamer. Je kunt ook eigen linnen meenemen.'
  },
  {
    question: 'Is er airconditioning aanwezig?',
    answer: 'Ja, alle slaapkamers en de woonkamer hebben airconditioning voor koelen en verwarmen.'
  },
  {
    question: 'Is er parkeergelegenheid?',
    answer: 'Ja, er is een eigen afgesloten parkeerplaats op het terrein met ruimte voor twee auto’s.'
  },
  {
    question: 'Is er WiFi beschikbaar?',
    answer: 'Ja, er is gratis WiFi in het hele huis en in de tuin.'
  },
  {
    question: 'Hoe werkt de sleuteloverdracht?',
    answer: 'Bij aankomst word je persoonlijk ontvangen door de lokale beheerder, inclusief uitleg en sleuteloverdracht.'
  },
  {
    question: 'Is er een wasmachine aanwezig?',
    answer: 'Ja, er is een wasmachine beschikbaar tijdens je verblijf.'
  },
  {
    question: 'Hoe werkt de betaling?',
    answer: 'Betaling in twee delen: 30% aanbetaling bij reservering en 70% uiterlijk 6 weken voor aankomst. Borg wordt na vertrek teruggestort.'
  },
  {
    question: 'Wat zijn de tarieven?',
    answer: 'De tarieven verschillen per seizoen. Bekijk de actuele bedragen op de pagina Praktisch of neem contact op voor je gewenste periode.'
  },
  {
    question: 'Welke kosten zijn inbegrepen in de huurprijs?',
    answer: 'Inbegrepen zijn onder andere energiekosten, WiFi en regulier onderhoud. Extra kosten zoals schoonmaak en borg worden apart vermeld.'
  }
];

const DEFAULT_SCHEMA: HouseSchema = {
  name: 'Casa Mi Sueño',
  description: 'Geniet van een ontspannen vakantie in ons comfortabele vakantiehuis met zwembad in L\'Alfàs del Pi, Costa Blanca. Perfect gelegen tussen bergen en zee. Ook ideaal voor overwinteren met speciaal maandtarief van €1200.',
  url: 'https://casamisueno.nl',
  identifier: 'https://casamisueno.nl/casa-mi-sueno',
  image: [
    'https://casamisueno.nl/images/Tuin_zwembad.webp',
    'https://casamisueno.nl/images/Woonkamer_zithoek.webp',
    'https://casamisueno.nl/images/Tuin_mediterraans.webp',
    'https://casamisueno.nl/images/Tuin_zithoek.webp',
    'https://casamisueno.nl/images/Keuken_deuraanzicht.webp'
  ],
  containedInPlace: {
    '@type': 'City',
    name: 'L\'Alfàs del Pi',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'L\'Alfàs del Pi',
      addressRegion: 'Alicante',
      addressCountry: 'ES'
    }
  },
  address: {
    streetAddress: 'Carrer de les Petúnies 16',
    addressLocality: 'L\'Alfàs del Pi',
    addressRegion: 'Alicante',
    postalCode: '03580',
    addressCountry: 'ES'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.5785,
    longitude: -0.0997
  },
  telephone: '+31683645489',
  email: 'info@casamisueno.nl',
  occupancy: {
    '@type': 'QuantitativeValue',
    maxValue: 4,
    unitText: 'persons'
  },
  numberOfRooms: 2,
  numberOfBedrooms: 2,
  numberOfBathroomsTotal: 2,
  floorSize: {
    '@type': 'QuantitativeValue',
    value: 120,
    unitCode: 'MTK'
  },
  yearBuilt: 2010,
  petsAllowed: true,
  smokingAllowed: false,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Zwembad', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Airconditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Tuin', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'BBQ', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parkeerplaats', value: '2 auto\'s' },
    { '@type': 'LocationFeatureSpecification', name: 'Keuken', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Terras', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Veranda', value: true }
  ],
  accommodationCategory: 'vacation rental',
  tourBookingPage: 'https://casamisueno.nl/reserveren',
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Check-in tijd',
      value: '16:00'
    },
    {
      '@type': 'PropertyValue',
      name: 'Check-out tijd',
      value: '10:00'
    },
    {
      '@type': 'PropertyValue',
      name: 'Prijsrange regulier',
      value: '€160-€180 per nacht'
    },
    {
      '@type': 'PropertyValue',
      name: 'Overwinter verblijf',
      value: '€1200 per maand (november, januari-maart)'
    },
    {
      '@type': 'PropertyValue',
      name: 'Minimaal verblijf overwinter',
      value: '1 maand'
    }
  ]
};

export const generateHouseSchema = (customData?: Partial<HouseSchema>): string => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'House',
    ...DEFAULT_SCHEMA,
    ...customData
  };

  return JSON.stringify(schemaData);
};

const normalizeRoutePath = (routePath: string): string => {
  if (!routePath || routePath === '/') {
    return '/';
  }
  return routePath.endsWith('/') ? routePath.slice(0, -1) : routePath;
};

const routePathToUrl = (routePath: string): string => {
  const path = normalizeRoutePath(routePath);
  return path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;
};

const generateWebSiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: `${BASE_URL}/`,
  name: 'Casa Mi Sueño',
  inLanguage: 'nl-NL'
});

const generateOrganizationSchema = () => ({
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Casa Mi Sueño',
  url: `${BASE_URL}/`,
  email: 'info@casamisueno.nl',
  telephone: '+31683645489',
  logo: `${BASE_URL}/icons/favicon-128x128.png`,
  sameAs: ['https://instagram.com/']
});

const generateBreadcrumbSchema = (routePath: string) => {
  const normalizedPath = normalizeRoutePath(routePath);
  const segments = normalizedPath === '/' ? [] : normalizedPath.slice(1).split('/');
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: ROUTE_LABELS['/'],
      item: `${BASE_URL}/`
    }
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = ROUTE_LABELS[currentPath] || segment;
    itemListElement.push({
      '@type': 'ListItem',
      position: index + 2,
      name: label,
      item: routePathToUrl(currentPath)
    });
  });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${routePathToUrl(normalizedPath)}#breadcrumb`,
    itemListElement
  };
};

const generateFaqSchema = () => ({
  '@type': 'FAQPage',
  '@id': `${BASE_URL}${FAQ_ROUTE_PATH}#faq`,
  mainEntity: PRACTICAL_FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
});

export const generateStructuredDataGraph = (routePath: string): string => {
  const normalizedPath = normalizeRoutePath(routePath);
  const houseNode = {
    '@type': 'House',
    '@id': `${BASE_URL}/#house`,
    ...DEFAULT_SCHEMA,
    mainEntityOfPage: routePathToUrl(normalizedPath)
  };

  const graph: Array<Record<string, unknown>> = [
    generateWebSiteSchema(),
    generateOrganizationSchema(),
    houseNode,
    generateBreadcrumbSchema(normalizedPath)
  ];

  if (normalizedPath === FAQ_ROUTE_PATH) {
    graph.push(generateFaqSchema());
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  });
};

export const injectStructuredData = (schema: string): void => {
  // Ensure only one JSON-LD script remains.
  document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => node.remove());

  const script = document.createElement('script');
  script.id = STRUCTURED_DATA_SCRIPT_ID;
  script.type = 'application/ld+json';
  script.text = schema;
  document.head.appendChild(script);
};

export const setupRouteStructuredData = (routePath: string): void => {
  const schema = generateStructuredDataGraph(routePath);
  injectStructuredData(schema);
};

export const setupHouseSchema = (customData?: Partial<HouseSchema>): void => {
  const schema = generateHouseSchema(customData);
  injectStructuredData(schema);
};

// Backwards compatibility
export const generateVacationRentalSchema = generateHouseSchema;
export const setupVacationRentalSchema = () => setupRouteStructuredData('/');

export const generateLocalBusinessSchema = (): SchemaData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Casa Mi Sueño',
    'image': 'https://casamisueno.nl/images/Tuin_zwembad.jpg',
    'description': 'Een comfortabel vakantiehuis met zwembad in L\'Alfàs del Pi, Costa Blanca',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Carrer de les Petúnies 16',
      'addressLocality': 'L\'Alfàs del Pi',
      'addressRegion': 'Alicante',
      'postalCode': '03580',
      'addressCountry': 'ES'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '38.5785',
      'longitude': '-0.0997'
    },
    'url': 'https://casamisueno.nl',
    'telephone': '+31683645489',
    'priceRange': '€€'
  };
}; 