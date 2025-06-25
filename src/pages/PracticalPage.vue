<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Veranda2.jpg"
      alt-text="De veranda van het vakantiehuis"
      title="Alles geregeld"
      subtitle="Zodat jij je nergens zorgen over hoeft te maken"
    />

    <!-- Introduction -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Wij denken graag vooruit</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Vakantie hoort zorgeloos te zijn. Daarom hebben we alles zo geregeld dat je vanaf 
          het moment dat je aankomt kunt genieten. Van je aankomst tot je vertrek - we zorgen 
          ervoor dat alles klaarstaat, zodat jij je volledig kunt ontspannen in ons tweede thuis.
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
        <div class="text-center q-mb-xl">
          <h2 class="font-playfair q-mb-md">Veelgestelde Vragen</h2>
          <p class="text-subtitle1 text-grey-8" style="max-width: 600px; margin: 0 auto;">
            Antwoorden op de meest gestelde vragen over je verblijf in Casa Mi Sueño
          </p>
        </div>
        <div class="row justify-center">
          <div class="col-12 col-md-10 col-lg-8">
            <div class="faq-categories">
              <div v-for="(category, index) in faqCategories" :key="index" class="q-mb-xl">
                <h3 class="text-h5 font-playfair q-mb-lg text-primary">{{ category.title }}</h3>
                <q-list padding class="rounded-borders">
                  <q-expansion-item
                    v-for="(item, itemIndex) in category.items"
                    :key="itemIndex"
                    expand-separator
                    :label="item.question"
                    header-class="text-subtitle1 text-weight-medium"
                  >
                    <q-card>
                      <q-card-section class="text-body1">
                        <div class="text-body1" v-html="item.answer"></div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </div>
            </div>
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
import { onMounted, ref } from 'vue';
import HeroSection from 'src/components/HeroSection.vue';

const houseRules = ref([
  {
    icon: 'family_restroom',
    title: 'Gezinsvriendelijk',
    description: 'Perfect voor families en kleine groepen tot 6 personen'
  },
  {
    icon: 'pets',
    title: 'Huisdieren welkom',
    description: 'Huisdieren zijn toegestaan in overleg'
  },
  {
    icon: 'smoke_free',
    title: 'Rookvrij binnen',
    description: 'Roken is alleen buiten toegestaan'
  },
  {
    icon: 'volume_off',
    title: 'Rustige omgeving',
    description: 'Geen feesten of luide muziek voor de rust van onze buren'
  }
]);

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

const pricing = ref([
  {
    name: 'Hoogseizoen',
    period: 'Juli - Augustus',
    price: '€220 per nacht'
  },
  {
    name: 'Middenseizoen',
    period: 'April - Juni, September',
    price: '€180 per nacht'
  },
  {
    name: 'Laagseizoen',
    period: 'Oktober - Maart',
    price: '€150 per nacht'
  }
]);

const faqCategories = ref([
  {
    title: 'Verblijf & Voorzieningen',
    items: [
      {
        question: 'Zijn huisdieren toegestaan?',
        answer: 'Ja, huisdieren zijn welkom in Casa Mi Sueño. Laat het ons wel even weten bij je boeking zodat we hier rekening mee kunnen houden.'
      },
      {
        question: 'Wat zijn de in- en uitchecktijden?',
        answer: 'Je kunt inchecken vanaf 16:00 uur. Op de dag van vertrek vragen we je om uiterlijk 10:00 uur uit te checken, zodat we voldoende tijd hebben om het huis voor te bereiden voor de volgende gasten.'
      },
      {
        question: 'Is het huis geschikt voor kinderen?',
        answer: 'Ja, Casa Mi Sueño is zeer geschikt voor families met kinderen. We hebben diverse voorzieningen zoals kinderstoelen en een kinderbed (op aanvraag). Houd er wel rekening mee dat het zwembad geen apart kindergedeelte heeft en niet is omheind. Ouderlijk toezicht is daarom noodzakelijk.'
      },
      {
        question: 'Zijn handdoeken en beddengoed inbegrepen?',
        answer: 'Ja, alle bed- en badlinnen is inbegrepen in de huurprijs. Dit omvat:<br>• Luxe beddengoed<br>• Badhanddoeken<br>• Badlakens voor bij het zwembad<br>• Keukenlinnen'
      },
      {
        question: 'Is er airconditioning aanwezig?',
        answer: 'Ja, alle slaapkamers en de woonkamer zijn voorzien van airconditioning. Deze kan zowel voor koeling als verwarming worden gebruikt.'
      }
    ]
  },
  {
    title: 'Praktische Informatie',
    items: [
      {
        question: 'Is er parkeergelegenheid?',
        answer: 'Ja, er is een eigen, afgesloten parkeerplaats op het terrein met ruimte voor twee auto\'s. De parkeerplaats bevindt zich direct bij het huis.'
      },
      {
        question: 'Is er WiFi beschikbaar?',
        answer: 'Ja, er is gratis WiFi beschikbaar in het hele huis en in de tuin. De verbinding is snel en stabiel, geschikt voor streamen en videobellen.'
      },
      {
        question: 'Hoe werkt de sleuteloverdracht?',
        answer: 'Bij aankomst word je persoonlijk ontvangen door onze lokale beheerder. Deze zal je rondleiden door het huis en uitleg geven over alle voorzieningen. Bij vertrek lever je de sleutels weer in bij de beheerder.'
      },
      {
        question: 'Is er een wasmachine aanwezig?',
        answer: 'Ja, er is een wasmachine beschikbaar voor gebruik tijdens je verblijf. We voorzien ook in wasmiddel en een droogrek.'
      }
    ]
  },
  {
    title: 'Boeken & Betalen',
    items: [
      {
        question: 'Hoe werkt de betaling?',
        answer: 'De betaling verloopt in twee delen:<br>• 30% aanbetaling bij reservering<br>• Resterende 70% uiterlijk 8 weken voor aankomst<br><br>Daarnaast vragen we een borg van €500, die binnen 5-7 werkdagen na vertrek wordt teruggestort.'
      },
      {
        question: 'Wat is het minimale verblijf?',
        answer: 'Het minimale verblijf is afhankelijk van het seizoen:<br>• Laag- en middenseizoen: 5 nachten<br>• Hoogseizoen: 7 nachten<br><br>Voor langere verblijven (3+ weken) kunnen we een speciaal tarief aanbieden.'
      },
      {
        question: 'Welke kosten zijn inbegrepen in de huurprijs?',
        answer: 'In de huurprijs zijn inbegrepen:<br>• Eindschoonmaak<br>• Bed- en badlinnen<br>• Energiekosten<br>• WiFi<br>• Zwembadonderhoud<br>• Tuinverzorging<br><br>Niet inbegrepen is de toeristenbelasting (€2,50 p.p.p.n.).'
      }
    ]
  }
]);

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
    'mainEntity': faqCategories.value.map(category => ({
      '@type': 'Question',
      'name': category.title,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': category.items.map(item => item.answer).join('<br>')
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

.faq-categories {
  :deep(.q-expansion-item) {
    margin-bottom: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    background: white;
    
    &:hover {
      border-color: var(--cms-terracotta);
    }
    
    .q-expansion-item__container {
      border-radius: 8px;
    }
    
    .q-item {
      padding: 1rem 1.5rem;
    }
    
    .q-card {
      box-shadow: none;
      background: #f8f9fa;
    }
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