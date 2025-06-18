<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section">
      <q-img
        src="/images/Veranda2.jpg"
        class="absolute-full"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content text-center">
          <div class="animate-fade-in-up">
            <h1 class="text-shadow q-mb-md font-playfair">Praktische Informatie</h1>
            <p class="text-h5 text-shadow q-mb-xl font-poppins">
              Alles wat je moet weten voor een zorgeloos verblijf
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Uw Verblijf</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          We willen graag dat je je direct thuis voelt in Casa Mi Sueño. Daarom hebben 
          we alle praktische informatie voor je op een rijtje gezet.
        </p>
      </div>
    </section>

    <!-- House Rules -->
    <section class="section bg-sand">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Huisregels</h2>
        <div class="row q-col-gutter-xl">
          <div v-for="rule in houseRules" :key="rule.title" class="col-12 col-md-6 col-lg-3">
            <div class="text-center">
              <q-icon :name="rule.icon" size="48px" class="text-terracotta q-mb-md" />
              <h3 class="font-playfair q-mb-md">{{ rule.title }}</h3>
              <p class="text-body1">{{ rule.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Facilities -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Faciliteiten</h2>
        <div class="row q-col-gutter-xl">
          <div v-for="facility in facilities" :key="facility.title" class="col-12 col-md-4">
            <div class="facility-card q-pa-lg">
              <div class="text-center q-mb-lg">
                <q-icon :name="facility.icon" size="48px" class="text-terracotta q-mb-md" />
                <h3 class="font-playfair">{{ facility.title }}</h3>
              </div>
              <ul class="feature-list">
                <li v-for="item in facility.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prices & Availability -->
    <section class="section bg-sand">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Prijzen & Beschikbaarheid</h2>
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <div class="pricing-card q-pa-lg">
              <h3 class="font-playfair q-mb-lg">Tarieven 2025</h3>
              <div class="season-pricing q-mb-xl">
                <div v-for="season in pricing" :key="season.period" class="season-row q-py-md">
                  <div class="row items-center justify-between">
                    <div class="col-8">
                      <h4 class="q-mb-sm">{{ season.name }}</h4>
                      <p class="text-grey-8 q-mb-none">{{ season.period }}</p>
                    </div>
                    <div class="col-4 text-right">
                      <p class="text-h6 q-mb-none">{{ season.price }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-grey-8">
                <p class="q-mb-sm">Prijzen zijn inclusief:</p>
                <ul class="feature-list q-mb-lg">
                  <li>Professionele eindschoonmaak</li>
                  <li>Luxe bed- en badlinnen</li>
                  <li>Welkomstpakket</li>
                  <li>Energiekosten & WiFi</li>
                  <li>Zwembadonderhoud</li>
                  <li>Tuinverzorging</li>
                  <li>24/7 lokale ondersteuning</li>
                </ul>
                <p class="text-caption">* Minimaal verblijf 10-14 nachten (seizoensafhankelijk)</p>
                <p class="text-caption">* Early booking korting: 10% bij boeking > 6 maanden vooruit</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="booking-info q-pa-lg">
              <h3 class="font-playfair q-mb-lg">Boekingsinformatie</h3>
              <div class="q-mb-xl">
                <h4 class="q-mb-md">Voorwaarden</h4>
                <ul class="feature-list">
                  <li>Minimaal verblijf: 10-14 nachten</li>
                  <li>Flexibele aankomst- en vertrekdagen</li>
                  <li>Aanbetaling: 30% bij boeking</li>
                  <li>Restbetaling: 8 weken voor aankomst</li>
                  <li>Waarborg: €500 (wordt teruggestort)</li>
                  <li>Toeristenbelasting: €2,50 p.p.p.n.</li>
                </ul>
              </div>
              <div>
                <h4 class="q-mb-md">Beschikbaarheid</h4>
                <p class="text-body1 q-mb-lg">
                  Kijk in onze kalender wanneer we er niet zijn, dan kun je het huis huren. 
                  Heb je vragen? We denken graag met je mee.
                </p>
                <q-btn
                  class="cms-btn cms-btn-primary full-width"
                  to="/contact"
                  label="Controleer beschikbaarheid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Veelgestelde Vragen</h2>
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <q-list>
              <q-expansion-item
                v-for="faq in faqs"
                :key="faq.question"
                :label="faq.question"
                header-class="text-h6"
                class="q-mb-md bg-white rounded-borders"
              >
                <q-card>
                  <q-card-section>
                    {{ faq.answer }}
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
    </section>

    <!-- Check-in Information -->
    <section class="section bg-sand">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Aankomst & Vertrek</h2>
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <div class="text-center q-mb-xl">
              <div class="row q-col-gutter-lg">
                <div class="col-6">
                  <h4 class="font-playfair q-mb-sm">Check-in vanaf</h4>
                  <p class="text-h5 text-terracotta">{{ checkInInfo.time }}</p>
                </div>
                <div class="col-6">
                  <h4 class="font-playfair q-mb-sm">Check-out voor</h4>
                  <p class="text-h5 text-terracotta">{{ checkInInfo.checkout }}</p>
                </div>
              </div>
            </div>
            <div class="text-center">
              <h4 class="font-playfair q-mb-md">Adres</h4>
              <p class="text-body1 q-mb-xl">{{ checkInInfo.address }}</p>
              <h4 class="font-playfair q-mb-md">Aankomstinstructies</h4>
              <p class="text-body1">{{ checkInInfo.instructions }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Klaar om te boeken?</h2>
        <p class="text-h6 text-grey-8 q-mx-auto q-mb-xl" style="max-width: 800px;">
          Heb je nog vragen of wil je direct reserveren? Neem contact met ons op.
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
const houseRules = [
  {
    icon: 'group',
    title: 'Maximaal 4 personen',
    description: 'Het huis is ingericht en geschikt voor maximaal 4 personen.'
  },
  {
    icon: 'smoke_free',
    title: 'Niet roken',
    description: 'Roken is niet toegestaan in het huis. Buiten roken kan op het terras.'
  },
  {
    icon: 'pets',
    title: 'Huisdieren welkom',
    description: 'Huisdieren zijn van harte welkom. Laat het ons even weten als je je huisdier meeneemt.'
  },
  {
    icon: 'volume_down',
    title: 'Respecteer de rust',
    description: 'We vragen je rekening te houden met de buren en de siësta te respecteren.'
  }
];

const facilities = [
  {
    icon: 'home',
    title: 'Binnen',
    items: [
      'Volledig uitgeruste keuken met gasfornuis',
      'Smart TV met Nederlandse zenders',
      'Gratis WiFi',
      'Airconditioning in alle kamers',
      'Wasmachine en droger',
      'Strijkijzer en -plank',
      'Vaatwasser'
    ]
  },
  {
    icon: 'pool',
    title: 'Buiten',
    items: [
      'Ruim rond zwembad',
      'Diverse terrassen',
      'Keramische Bastard BBQ',
      'Ligbedden en parasols',
      'Buitendouche',
      'Parkeerplaats voor 2 auto\'s',
      'Wekelijks zwembadonderhoud'
    ]
  },
  {
    icon: 'cleaning_services',
    title: 'Service',
    items: [
      'Eindschoonmaak inbegrepen',
      'Bedlinnen en handdoeken aanwezig',
      'Wekelijks zwembadonderhoud',
      'Tuinonderhoud',
      'Optionele tussentijdse schoonmaak',
      'Contactpersoon in de buurt'
    ]
  }
];

const pricing = [
  {
    name: 'Laagseizoen',
    period: 'November t/m maart',
    price: 'vanaf €165 per nacht'
  },
  {
    name: 'Middenseizoen',
    period: 'April, mei & oktober',
    price: 'vanaf €195 per nacht'
  },
  {
    name: 'Hoogseizoen',
    period: 'Juni & september',
    price: 'vanaf €225 per nacht'
  },
  {
    name: 'Topseizoen',
    period: 'Juli & augustus',
    price: 'vanaf €275 per nacht'
  }
];

const faqs = [
  {
    question: 'Hoe ver is het naar het strand?',
    answer: 'Het strand van Albir ligt op 5 minuten rijden met de auto. Het zandstrand van Benidorm is met de auto in 15 minuten te bereiken. Wij gaan zelf meestal naar Albir, lekker rustig en met leuke strandtentjes.'
  },
  {
    question: 'Is het zwembad verwarmd?',
    answer: 'Het zwembad is niet verwarmd, maar door het mediterrane klimaat is het water van mei tot oktober heerlijk van temperatuur. We laten het elke week schoonmaken.'
  },
  {
    question: 'Zijn er winkels in de buurt?',
    answer: 'De dichtstbijzijnde supermarkt (Mercadona, onze favoriet) ligt op 5 minuten rijden. In het centrum van L\'Alfàs del Pi (5 min) vind je diverse winkels en op vrijdag is er een gezellige lokale markt.'
  },
  {
    question: 'Hoe werkt de airconditioning?',
    answer: 'Alle slaapkamers en de woonkamer hebben airco die kan koelen en verwarmen. De bediening is simpel, we leggen het je uit in ons welkomstboekje.'
  },
  {
    question: 'Is er parkeergelegenheid?',
    answer: 'Ja, je kunt twee auto\'s kwijt op onze oprit. De straat is ook rustig, daar kun je altijd wel een plekje vinden.'
  }
];

const checkInInfo = {
  time: '16:00',
  checkout: '10:00',
  address: 'Carrer de les Petúnies 16, 03580 L\'Alfàs del Pi, Alicante, Spain',
  instructions: 'Bij aankomst word je verwelkomd door onze buurvrouw Maria, die je de sleutels geeft en het huis laat zien. Ze spreekt Engels en Spaans en woont twee deuren verderop.'
};
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

.facility-card,
.pricing-card,
.booking-info,
.rules-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.season-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.season-row:last-child {
  border-bottom: none;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.faq-list {
  .q-expansion-item {
    margin-bottom: 1rem;
  }
}
</style> 