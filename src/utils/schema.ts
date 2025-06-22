interface SchemaData {
  [key: string]: any;
}

export const generateVacationRentalSchema = (): SchemaData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    'name': 'Casa Mi Sueño',
    'description': 'Een comfortabel vakantiehuis met zwembad in L\'Alfàs del Pi, Costa Blanca',
    'url': 'https://casamisueno.es',
    'image': [
      'https://casamisueno.es/images/Tuin_zwembad.jpg',
      'https://casamisueno.es/images/Woonkamer_zithoek.jpg',
      'https://casamisueno.es/images/Tuin_mediterraans.jpg'
    ],
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
      'latitude': '38.5777',
      'longitude': '-0.0683'
    },
    'telephone': '+31683645489',
    'amenityFeature': [
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Zwembad',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Buitenkeuken',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'WiFi',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Airconditioning',
        'value': true
      }
    ],
    'numberOfRooms': '3',
    'occupancy': {
      '@type': 'QuantitativeValue',
      'minValue': '1',
      'maxValue': '6'
    },
    'petsAllowed': false
  };
};

export const generateLocalBusinessSchema = (): SchemaData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Casa Mi Sueño',
    'image': 'https://casamisueno.es/images/Tuin_zwembad.jpg',
    'description': 'Vakantiehuis verhuur in L\'Alfàs del Pi, Costa Blanca',
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
      'latitude': '38.5777',
      'longitude': '-0.0683'
    },
    'url': 'https://casamisueno.es',
    'telephone': '+31683645489',
    'priceRange': '€€'
  };
};

export const injectSchemaMarkup = (schema: SchemaData) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}; 