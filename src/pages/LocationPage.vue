<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section">
      <q-img
        src="/images/Omgeving/Albir_panorama.jpg"
        class="absolute-full"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="animate-fade-in-up text-center text-white">
            <h1 class="text-shadow q-mb-md font-playfair">De Omgeving</h1>
            <p class="text-h5 text-shadow q-mb-xl font-poppins">
              Ons stukje Costa Blanca
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">L'Alfàs del Pi</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Ons huis staat in L'Alfàs del Pi, een gezellig Spaans dorp aan de Costa Blanca. 
          De naam 'Alfàs' komt uit het Arabisch en betekent 'vruchtbare grond', terwijl 'Pi' verwijst naar 
          de oude pijnboom op het dorpsplein. We kozen deze plek omdat het een echt dorp is gebleven, 
          waar je het authentieke Spaanse leven nog ervaart.
        </p>
      </div>
    </section>

    <!-- Local Area -->
    <section class="section bg-sand">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg">De Buurt</h2>
            <p class="text-body1 q-mb-lg">
              L'Alfàs del Pi is een levendig dorp waar traditioneel Spaans leven en moderne voorzieningen 
              samenkomen. Het dorpsplein met zijn terrasjes, de wekelijkse markt op vrijdag, en de 
              lokale restaurants waar je heerlijke tapas kunt proeven, geven je het échte Spaanse gevoel. 
              Dit zijn de plekken waar wij zelf ook graag komen.
            </p>
            <ul class="feature-list q-mb-xl">
              <li>Supermarkt op 5 minuten rijden</li>
              <li>Strand van Albir op 5 minuten met de auto</li>
              <li>Gezellig dorpscentrum met restaurants en winkels</li>
              <li>Wekelijkse markt op vrijdag (onze favoriet!)</li>
              <li>Medische voorzieningen in de buurt</li>
              <li>La Nucia met sportfaciliteiten op 5 minuten</li>
              <li>Zondagsmarkt in La Nucia</li>
              <li>Benidorm met zandstranden op 15 minuten</li>
              <li>Pretparken Terra Mítica en Aqualandia nabij</li>
            </ul>
          </div>
          <div class="col-12 col-md-6">
            <div class="cms-img-container" style="height: 400px;">
              <q-img
                src="/images/Omgeving/Albir_boulevard.jpg"
                class="cms-img rounded-borders"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Beaches & Nature -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Tussen Strand en Bergen</h2>
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <div class="location-card q-pa-none">
              <div class="cms-img-container" style="height: 300px;">
              <q-img
                  src="/images/Omgeving/Albir_lighthouse.jpg"
                  class="cms-img"
                />
              </div>
              <div class="q-pa-lg">
                <h3 class="font-playfair q-mb-md">Stranden & Kust</h3>
                <p class="text-body1 q-mb-md">
                  Het kiezelstrand van Albir, met zijn gezellige boulevard en blauwe vlag, ligt op 
                  slechts 5 minuten rijden. Voor zandstranden kun je terecht in het nabijgelegen 
                  Benidorm (15 minuten). De vuurtoren van Albir, bereikbaar via een mooie 
                  wandelroute door het natuurpark Sierra Helada, biedt prachtige uitzichten over de kust.
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="location-card q-pa-none">
              <div class="cms-img-container" style="height: 300px;">
                <q-img
                  src="/images/Omgeving/Guadalest_mountain_view.jpg"
                  class="cms-img"
                />
              </div>
              <div class="q-pa-lg">
                <h3 class="font-playfair q-mb-md">Bergen & Natuur</h3>
                <p class="text-body1 q-mb-md">
                  De omgeving is perfect voor natuurliefhebbers. Het natuurpark Sierra Helada 
                  biedt prachtige wandelroutes, en op 20 minuten rijden vind je de spectaculaire 
                  watervallen van Algar. Het bergdorpje Guadalest, met zijn kasteel op de rots, 
                  is een must-see op 30 minuten rijden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cultural Highlights -->
    <section class="section bg-sand">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Culturele Hoogtepunten</h2>
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4" v-for="highlight in culturalHighlights" :key="highlight.title">
            <div class="location-card q-pa-none">
              <div class="cms-img-container" style="height: 250px;">
                <q-img
                  :src="highlight.image"
                  class="cms-img"
                />
              </div>
              <div class="q-pa-lg">
                <h3 class="font-playfair q-mb-md">{{ highlight.title }}</h3>
                <p class="text-body1 q-mb-md">{{ highlight.description }}</p>
                <ul class="feature-list">
                  <li v-for="item in highlight.highlights" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Practical Info -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Praktische Informatie</h2>
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-3" v-for="info in practicalInfo" :key="info.title">
            <div class="text-center">
              <q-icon :name="info.icon" size="48px" class="text-terracotta q-mb-md" />
              <h4 class="font-playfair q-mb-md">{{ info.title }}</h4>
              <ul class="feature-list text-left">
                <li v-for="detail in info.details" :key="detail">{{ detail }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="section bg-sand">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Onze Locatie</h2>
        <div class="row justify-center">
          <div class="col-12 col-md-10">
            <div class="map-container q-mb-lg">
              <iframe
                :src="mapUrl"
                style="border:0;"
                :allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div class="text-center">
              <q-btn
                outline
                color="primary"
                icon="place"
                label="Open in Google Maps"
                @click="openInGoogleMaps"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Plan je verblijf</h2>
        <p class="text-h6 text-grey-8 q-mx-auto q-mb-xl" style="max-width: 800px;">
          Ontdek zelf waarom de Costa Blanca één van de meest geliefde vakantiebestemmingen 
          van Europa is.
        </p>
        <q-btn
          class="cms-btn cms-btn-primary q-px-xl q-py-sm text-subtitle1"
          to="/contact"
          label="Neem contact op"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const ADDRESS = 'Carrer de les Petúnies 16, 03580 L\'Alfàs del Pi, Alicante, Spain';
const ENCODED_ADDRESS = encodeURIComponent(ADDRESS);

const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${ENCODED_ADDRESS}&zoom=15`;

const openInGoogleMaps = () => {
  window.open(`https://www.google.com/maps/search/?api=1&query=${ENCODED_ADDRESS}`, '_blank');
};

const culturalHighlights = [
  {
    title: 'Altea',
    image: '/images/Omgeving/Casco_antiguo.jpg',
    description: 'Een schilderachtig stadje met witte huisjes en de karakteristieke blauwe koepels van de kerk.',
    highlights: [
      'Historisch centrum met kunstgalerijen',
      'Traditionele markt op dinsdag',
      'Gezellige restaurants en terrassen',
      'Op 10 minuten rijden'
    ]
  },
  {
    title: 'La Nucia',
    image: '/images/Omgeving/la_nucia_panorama.jpg',
    description: 'Een moderne stad bekend om haar uitstekende sportfaciliteiten, natuurschoon en gezellige oude centrum.',
    highlights: [
      'Ciutat Esportiva Camilo Cano - modern sportcomplex',
      'Font de La Favara park met waterval',
      'Pittoresk oud centrum met restaurants',
      'Op slechts 5 minuten rijden'
    ]
  },
  {
    title: 'Benidorm',
    image: '/images/Omgeving/benidorm_skyline_night.jpg',
    description: 'De bruisende badplaats van de Costa Blanca met haar iconische skyline, lange zandstranden en levendige uitgaansleven.',
    highlights: [
      'Prachtige zandstranden Levante en Poniente',
      'Uitgebreid aanbod restaurants en bars',
      'Themaparken Terra Mítica en Aqualandia',
      'Op 15 minuten rijden'
    ]
  },
  {
    title: 'Guadalest',
    image: '/images/Omgeving/Guadalest_castle.jpg',
    description: 'Een spectaculair bergdorpje, gebouwd op een rotspunt met een kasteel en adembenemend uitzicht.',
    highlights: [
      'Middeleeuws kasteel op de rots',
      'Diverse kleine musea',
      'Panoramisch uitzicht over het stuwmeer',
      'Op 30 minuten rijden'
    ]
  },
  {
    title: 'Algar Watervallen',
    image: '/images/Omgeving/Fuentes_del_algar.jpg',
    description: 'Natuurlijke watervallen met kristalhelder water en natuurlijke zwembaden.',
    highlights: [
      'Verfrissende natuurlijke zwembaden',
      'Wandelroutes langs de watervallen',
      'Picknickplaatsen in de natuur',
      'Op 20 minuten rijden'
    ]
  },
  {
    title: 'Villajoyosa',
    image: '/images/Omgeving/villajoyosa_colorful_houses.jpg',
    description: 'Een kleurrijk kuststadje bekend om zijn chocolade-industrie, gekleurde huizen en historische centrum.',
    highlights: [
      'Beroemde chocoladefabrieken met rondleidingen',
      'Kleurrijke vissershuizen aan zee',
      'Prachtig zandstrand met boulevard',
      'Op 20 minuten rijden'
    ]
  }
];

const practicalInfo = [
  {
    icon: 'shopping_cart',
    title: 'Winkels',
    details: [
      'Supermarkt op 5 min. rijden',
      'Wekelijkse markt op vrijdag',
      'Winkelcentrum La Marina (15 min)',
      'Lokale speciaalzaken'
    ]
  },
  {
    icon: 'restaurant',
    title: 'Restaurants',
    details: [
      'Diverse lokale tapasrestaurants',
      'Internationale keukens',
      'Gezellige terrasjes',
      'Verse visrestaurants aan zee'
    ]
  },
  {
    icon: 'directions_car',
    title: 'Transport',
    details: [
      'Alicante Airport (45 min)',
      'Valencia Airport (75 min)',
      'Busverbinding naar Benidorm',
      'Taxi\'s beschikbaar'
    ]
  },
  {
    icon: 'local_hospital',
    title: 'Voorzieningen',
    details: [
      'Medisch centrum in dorp',
      'Apotheek op 5 min',
      'Ziekenhuis in Benidorm',
      'Toeristeninformatie centrum'
    ]
  }
];
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 60vh;
  min-height: 500px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5));
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  color: white;
  z-index: 1;
}

.map-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
}

.map-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.feature-list {
  list-style: none;
  padding-left: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--q-dark);
}

.feature-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--cms-deep-terracotta);
}

.location-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: hidden;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
</style> 