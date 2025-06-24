interface SchemaData {
  [key: string]: any;
}

interface VacationRentalSchema {
  name: string;
  description: string;
  url: string;
  image: string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  maximumAttendeeCapacity: number;
  amenityFeature: Array<{
    name: string;
    value?: boolean | string;
  }>;
  priceRange: string;
}

const DEFAULT_SCHEMA: VacationRentalSchema = {
  name: 'Casa Mi Sueño',
  description: 'Geniet van een ontspannen vakantie in ons comfortabele vakantiehuis met zwembad in L\'Alfàs del Pi, Costa Blanca. Perfect gelegen tussen bergen en zee.',
  url: 'https://casamisueno.nl',
  image: [
    'https://casamisueno.nl/images/Tuin_zwembad.jpg',
    'https://casamisueno.nl/images/Woonkamer_zithoek.jpg',
    'https://casamisueno.nl/images/Tuin_mediterraans.jpg'
  ],
  address: {
    streetAddress: 'Carrer de les Petúnies 16',
    addressLocality: 'L\'Alfàs del Pi',
    addressRegion: 'Alicante',
    postalCode: '03580',
    addressCountry: 'ES'
  },
  telephone: '+31683645489',
  maximumAttendeeCapacity: 4,
  amenityFeature: [
    { name: 'Zwembad', value: true },
    { name: 'Airconditioning', value: true },
    { name: 'WiFi', value: true },
    { name: 'Tuin', value: true },
    { name: 'BBQ', value: true },
    { name: 'Parkeerplaats', value: '2 auto\'s' },
    { name: 'Slaapkamers', value: '2' },
    { name: 'Badkamers', value: '2' }
  ],
  priceRange: '€€'
};

export const generateVacationRentalSchema = (customData?: Partial<VacationRentalSchema>): string => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
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

export const setupVacationRentalSchema = (customData?: Partial<VacationRentalSchema>): void => {
  const schema = generateVacationRentalSchema(customData);
  injectStructuredData(schema);
};

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