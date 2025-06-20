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
        <h2 class="font-playfair q-mb-lg">Je Verblijf</h2>
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
import { onMounted } from 'vue';

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
  address: 'Het exacte adres ontvang je bij de bevestiging van je boeking',
  instructions: 'Bij aankomst ontvang je de sleutels van onze lokale contactpersoon. Zij regelt de sleuteloverdracht en spreekt Engels en Spaans.'
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

.q-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
}
</style> 