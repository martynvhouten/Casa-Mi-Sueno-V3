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

export const injectStructuredData = (schema: string): void => {
  // Remove any existing schema
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = schema;
  document.head.appendChild(script);
};

export const setupHouseSchema = (customData?: Partial<HouseSchema>): void => {
  const schema = generateHouseSchema(customData);
  injectStructuredData(schema);
};

// Backwards compatibility
export const generateVacationRentalSchema = generateHouseSchema;
export const setupVacationRentalSchema = setupHouseSchema;

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