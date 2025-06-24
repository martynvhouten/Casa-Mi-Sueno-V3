<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Veranda2.jpg"
      alt-text="De veranda van het vakantiehuis"
      title="Praktische informatie"
      subtitle="Alles wat je moet weten voor een zorgeloos verblijf"
    />

    <!-- Introduction -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Je verblijf</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          We willen graag dat je je direct thuis voelt in Casa Mi Sueño. Het is een rustige plek 
          voor gasten die, net als wij, houden van authenticiteit en ontspanning. Hieronder vind je 
          alle praktische informatie voor een zorgeloos verblijf.
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
                <h3 class="font-playfair text-center">{{ facility.title }}</h3>
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
                <p class="text-caption">* Minimaal verblijf: 5-7 nachten (seizoensafhankelijk)</p>
                <p class="text-caption">* Langere verblijven (3+ weken): vraag naar speciale tarieven</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="booking-info q-pa-lg">
              <h3 class="font-playfair q-mb-lg">Boekingsinformatie</h3>
              <div class="q-mb-xl">
                <h4 class="q-mb-md">Voorwaarden</h4>
                <ul class="feature-list">
                  <li>Minimaal verblijf laag/middenseizoen: 5 nachten</li>
                  <li>Minimaal verblijf hoogseizoen: 7 nachten</li>
                  <li>Geen korte weekendverblijven mogelijk</li>
                  <li>Aanbetaling: 30% bij boeking</li>
                  <li>Restbetaling: 8 weken voor aankomst</li>
                  <li>Waarborg: €500 (wordt binnen 5-7 werkdagen na vertrek teruggestort)</li>
                  <li>Toeristenbelasting: €2,50 p.p.p.n.</li>
                </ul>
              </div>
              <div class="q-mb-xl">
                <h4 class="q-mb-md">Voor wie is Casa Mi Sueño?</h4>
                <p class="text-body1 q-mb-lg">
                  Ons huis is perfect voor gasten die houden van rust, natuur en authenticiteit. 
                  We verhuren graag aan koppels, families of kleine groepen vrienden die onze liefde 
                  voor deze bijzondere plek delen. Het is geen feestlocatie of plek voor korte weekendverblijven.
                </p>
              </div>
              <div>
                <h4 class="q-mb-md">Langer verblijf?</h4>
                <p class="text-body1 q-mb-lg">
                  Wil je langer blijven dan drie weken? Neem dan even contact met ons op. 
                  We kijken graag samen naar een passend tarief.
                </p>
                <q-btn
                  class="cms-btn cms-btn-primary full-width"
                  to="/contact"
                  label="Neem contact op"
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
                v-for="(item, index) in faqItems"
                :key="index"
                :label="item.question"
                header-class="text-primary"
              >
                <q-card>
                  <q-card-section>
                    {{ item.answer }}
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
            <div class="arrival-card q-pa-xl bg-white rounded-borders">
              <!-- Times -->
              <div class="row q-col-gutter-xl q-mb-xl">
                <div class="col-12 col-sm-6">
                  <div class="text-center">
                    <q-icon name="flight_takeoff" size="32px" class="text-terracotta q-mb-md" />
                    <h4 class="font-playfair q-mb-sm">Aankomst vanaf</h4>
                    <p class="text-h5 text-terracotta q-mb-none">{{ checkInInfo.time }}</p>
                  </div>
                </div>
                <div class="col-12 col-sm-6">
                  <div class="text-center">
                    <q-icon name="flight_land" size="32px" class="text-terracotta q-mb-md" />
                    <h4 class="font-playfair q-mb-sm">Vertrek voor</h4>
                    <p class="text-h5 text-terracotta q-mb-none">{{ checkInInfo.checkout }}</p>
                  </div>
                </div>
              </div>

              <!-- Address -->
              <div class="text-center q-mb-xl">
                <q-icon name="place" size="32px" class="text-terracotta q-mb-md" />
                <h4 class="font-playfair q-mb-md">Adres</h4>
                <p class="text-body1 q-mb-none" style="white-space: pre-line">{{ checkInInfo.address }}</p>
                <div class="row justify-center q-gutter-md q-mt-md">
                  <q-btn
                    flat
                    color="primary"
                    icon="map"
                    label="Open in Google Maps"
                    href="https://maps.google.com/?q=Calle+Petunias+16+L'Alfàs+del+Pi"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                  <q-btn
                    flat
                    color="primary"
                    icon="map"
                    label="Open in Apple Maps"
                    href="https://maps.apple.com/?q=Carrer+de+les+Petúnies+16,+L'Alfàs+del+Pi"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </div>
              </div>

              <!-- Instructions -->
              <div class="text-center">
                <q-icon name="info" size="32px" class="text-terracotta q-mb-md" />
                <h4 class="font-playfair q-mb-md">Aankomstinstructies</h4>
                <p class="text-body1">{{ checkInInfo.instructions }}</p>
              </div>
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
import { onMounted } from 'vue';
import HeroSection from 'src/components/HeroSection.vue';

const houseRules = [
  {
    icon: 'group',
    title: 'Maximaal 4 personen',
    description: 'Perfect voor koppels, families of kleine groepen vrienden die van rust houden.'
  },
  {
    icon: 'smoke_free',
    title: 'Niet roken',
    description: 'Roken is niet toegestaan in het huis. Buiten roken kan op het terras.'
  },
  {
    icon: 'block',
    title: 'Geen feesten',
    description: 'We verhuren niet voor feesten of evenementen. Respecteer de rust van de buurt.'
  },
  {
    icon: 'pets',
    title: 'Huisdieren welkom',
    description: 'Huisdieren zijn van harte welkom. Laat het ons even weten bij de boeking.'
  }
];

const facilities = [
  {
    icon: 'home',
    title: 'Binnen',
    items: [
      'Volledig uitgeruste keuken met gasfornuis',
      'Smart TV met streaming mogelijkheden',
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
    icon: 'support_agent',
    title: 'Service',
    items: [
      'Professionele eindschoonmaak',
      'Bed- en badlinnen inbegrepen',
      'Strandlakens beschikbaar',
      'Lokale contactpersoon voor sleuteloverdracht',
      'Wekelijks zwembadonderhoud',
      'Tuinonderhoud'
    ]
  }
];

const pricing = [
  {
    name: 'Laagseizoen',
    period: 'November t/m maart',
    price: '€145 per nacht'
  },
  {
    name: 'Middenseizoen',
    period: 'April, mei & oktober',
    price: '€175 per nacht'
  },
  {
    name: 'Hoogseizoen',
    period: 'Juni t/m september',
    price: '€210 per nacht'
  }
];

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: 'Wat zijn de aankomst- en vertrektijden?',
    answer: 'Aankomst is mogelijk vanaf 16:00 uur, vertrek voor 10:00 uur. In overleg zijn andere tijden mogelijk.'
  },
  {
    question: 'Is er WiFi beschikbaar?',
    answer: 'Ja, er is gratis WiFi beschikbaar in het hele huis en in de tuin.'
  },
  {
    question: 'Is het zwembad het hele jaar door beschikbaar?',
    answer: 'Het zwembad is het hele jaar door beschikbaar, maar is niet verwarmd. In de zomermaanden heeft het water een aangename temperatuur. In voor- en najaar kan het water frisser zijn, en in de winter is het te koud om te zwemmen.'
  },
  {
    question: 'Zijn huisdieren welkom?',
    answer: 'Ja, huisdieren zijn van harte welkom! We vragen je wel om dit bij de boeking te vermelden, zodat we eventuele specifieke wensen kunnen bespreken. We houden van dieren en begrijpen dat ze deel uitmaken van je gezin.'
  },
  {
    question: 'Is er parkeergelegenheid?',
    answer: 'Ja, er is gratis parkeergelegenheid op eigen terrein voor meerdere auto\'s.'
  },
  {
    question: 'Moet ik een borg betalen?',
    answer: 'We vragen een borg van €500, die we na je verblijf terugstorten als alles in goede orde is achtergelaten. De borg ontvang je binnen 5-7 werkdagen na vertrek terug op je rekening. Dit geeft ons de tijd om het huis te controleren en eventuele kleine problemen op te lossen.'
  }
];

const checkInInfo = {
  time: '16:00',
  checkout: '10:00',
  address: 'Carrer de les Petúnies 16\n03580 L\'Alfàs del Pi\nAlicante, Spanje',
  instructions: 'Bij aankomst word je welkom geheten door onze lokale contactpersoon. Zij spreekt Engels en Spaans, regelt de sleuteloverdracht en geeft je een korte rondleiding door het huis. Ze legt uit hoe alles werkt en beantwoordt al je vragen.'
};

onMounted(() => {
  // Add FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(faqSchema);
  document.head.appendChild(script);
});
</script>

<style scoped>
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

.q-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
}

.arrival-card {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.text-body1 {
  font-size: 1.1rem;
  line-height: 1.5;
}
</style> 