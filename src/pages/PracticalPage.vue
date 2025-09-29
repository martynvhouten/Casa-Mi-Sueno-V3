<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_vanaf_veranda.webp"
      alt-text="Mediterrane tuin met weelderige beplanting"
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
          <div v-for="(facility, index) in facilities" :key="facility.title" class="col-12 col-md-4">
            <div class="facility-card cms-card-subtle q-pa-lg">
              <div class="text-center q-mb-lg">
                <q-icon 
                  :name="facility.icon" 
                  size="48px" 
                  class="text-terracotta q-mb-md floating-icon" 
                  :style="`animation-delay: ${index * 0.3}s;`"
                />
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
            <div class="pricing-card cms-card-subtle q-pa-lg">
                
                <div class="season-pricing q-mb-xl">
                  <div v-for="(season, index) in pricing" :key="season.period" class="season-row q-py-md">
                    <div class="season-header-simple q-mb-md">
                      <div class="row items-center q-mb-sm">
                        <q-chip 
                          :color="getSeasonColor(index)" 
                          text-color="white" 
                          size="sm"
                          class="season-chip q-mr-sm"
                        >
                          <q-icon :name="getSeasonIcon(index)" size="16px" class="season-chip__icon" />
                          <span class="season-chip__label">{{ season.name }}</span>
                        </q-chip>
                      </div>
                      <p class="text-body2 text-grey-7 q-mb-none">{{ season.period }}</p>
                    </div>
                    
                    <div class="pricing-list">
                      <div class="pricing-row">
                        <div class="pricing-item-simple">
                          <q-icon name="nights_stay" size="16px" class="pricing-icon" />
                          <span class="pricing-label-simple">Per nacht</span>
                          <span class="pricing-value-simple">{{ season.price }}</span>
                        </div>
                      </div>
                      
                      <div class="pricing-row">
                        <div class="pricing-item-simple">
                          <q-icon name="calendar_view_week" size="16px" class="pricing-icon" />
                          <span class="pricing-label-simple">Per week</span>
                          <span class="pricing-value-simple">{{ season.weekly }}</span>
                        </div>
                      </div>
                      
                      <div v-if="season.twoWeeks" class="pricing-row">
                        <div class="pricing-item-simple">
                          <q-icon name="date_range" size="16px" class="pricing-icon" />
                          <span class="pricing-label-simple">2 weken</span>
                          <span class="pricing-value-simple">{{ season.twoWeeks }}</span>
                        </div>
                      </div>
                      
                      <div v-if="season.threeWeeks" class="pricing-row">
                        <div class="pricing-item-simple">
                          <q-icon name="event_note" size="16px" class="pricing-icon" />
                          <span class="pricing-label-simple">3 weken</span>
                          <span class="pricing-value-simple">{{ season.threeWeeks }}</span>
                        </div>
                      </div>
                      
                      <div v-if="season.monthly" class="pricing-row">
                        <div class="pricing-item-simple">
                          <q-icon name="calendar_month" size="16px" class="pricing-icon" />
                          <span class="pricing-label-simple">Per maand</span>
                          <span class="pricing-value-simple">{{ season.monthly }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-grey-8">
                <div class="extras-block q-mb-lg">
                  <div class="row items-center q-mb-sm">
                    <q-icon name="check_circle" size="20px" class="text-positive q-mr-sm" />
                    <p class="text-subtitle2 text-positive q-mb-none">Inbegrepen:</p>
                  </div>
                  <ul class="feature-list-enhanced q-mb-none">
                    <li class="feature-item">
                      <q-icon name="bed" size="16px" class="feature-icon" />
                      <span>Luxe bed- en badlinnen</span>
                    </li>
                    <li class="feature-item">
                      <q-icon name="card_giftcard" size="16px" class="feature-icon" />
                      <span>Welkomstpakket</span>
                    </li>
                    <li class="feature-item">
                      <q-icon name="wifi" size="16px" class="feature-icon" />
                      <span>Energiekosten & WiFi</span>
                    </li>
                    <li class="feature-item">
                      <q-icon name="pool" size="16px" class="feature-icon" />
                      <span>Zwembadonderhoud</span>
                    </li>
                    <li class="feature-item">
                      <q-icon name="grass" size="16px" class="feature-icon" />
                      <span>Tuinverzorging</span>
                    </li>
                    <li class="feature-item">
                      <q-icon name="support_agent" size="16px" class="feature-icon" />
                      <span>24/7 lokale ondersteuning</span>
                    </li>
                  </ul>
                </div>

                <div class="extras-block q-mb-lg">
                  <div class="row items-center q-mb-sm">
                    <q-icon name="euro" size="20px" class="text-orange q-mr-sm" />
                    <p class="text-subtitle2 text-orange q-mb-none">Extra kosten:</p>
                  </div>
                  <ul class="feature-list-enhanced q-mb-none">
                    <li class="feature-item">
                      <q-icon name="cleaning_services" size="16px" class="feature-icon" />
                      <span>Schoonmaak: <strong>€150</strong> (inclusief in- en uitchecken)</span>
                    </li>
                  </ul>
                </div>

                <div class="extras-block">
                  <div class="row items-center q-mb-sm">
                    <q-icon name="pets" size="20px" class="text-primary q-mr-sm" />
                    <p class="text-subtitle2 text-primary q-mb-none">Huisdieren:</p>
                  </div>
                  <ul class="feature-list-enhanced q-mb-none">
                    <li class="feature-item">
                      <q-icon name="favorite" size="16px" class="feature-icon" />
                      <span>Huisdieren zijn van harte welkom!</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="booking-info cms-card-subtle q-pa-lg">
              <h3 class="font-playfair q-mb-lg">Boekingsinformatie</h3>
              <div class="q-mb-lg">
                <h4 class="q-mb-md">Voorwaarden</h4>
                <ul class="feature-list">
                  <li>Aanbetaling: 30% bij boeking</li>
                  <li>Restbetaling: 6 weken voor aankomst</li>
                  <li>Borg: €400 (wordt binnen 5-7 werkdagen na vertrek teruggestort)</li>
                  <li>Geen annulering mogelijk</li>
                </ul>
              </div>
              
              <div class="q-mb-lg">
                <h4 class="q-mb-md">Waarom Overwinteren in Casa Mi Sueño?</h4>
                <p class="text-body1 q-mb-md">
                  Ontsnap aan de Nederlandse winter en geniet van het milde mediterrane klimaat. 
                  L'Alfàs del Pi biedt het perfecte winterweer met temperaturen van 15-20°C en veel zonneschijn.
                </p>
                <ul class="feature-list">
                  <li><strong>Mild klimaat:</strong> Gemiddeld 300 zonnige dagen per jaar</li>
                  <li><strong>Voordelig:</strong> €1.200 per maand all-inclusive (water, gas, elektra, internet)</li>
                  <li><strong>Volledig uitgerust:</strong> Wasmachine, vaatwasser, airco, verwarming</li>
                  <li><strong>Gezond leven:</strong> Zwembad, wandel- en fietsroutes, verse markten</li>
                  <li><strong>Goede bereikbaarheid:</strong> Vliegveld Alicante op 1 uur rijden</li>
                  <li><strong>Nederlandse gemeenschap:</strong> Veel Nederlanders in de omgeving</li>
                </ul>
              </div>
              
              <h4 class="q-mb-md">Voor wie is Casa Mi Sueño?</h4>
              <p class="text-body1 q-mb-none">
                Ons huis is perfect voor gasten die houden van rust, natuur en authenticiteit. 
                We verhuren graag aan koppels, families, pensionados, digitale nomaden of kleine groepen vrienden 
                die onze liefde voor deze bijzondere plek delen. Het is geen feestlocatie.
              </p>

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

    <!-- Call to Action -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Klaar om te boeken?</h2>
        <p class="text-h6 text-grey-8 q-mx-auto q-mb-xl" style="max-width: 800px;">
          Heb je nog vragen of wil je direct reserveren? Neem contact met ons op.
        </p>
        <q-btn
          class="cms-btn cms-btn-primary"
          to="/contact"
          label="Neem contact op"
        />
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
                <div class="col-12 col-md-6">
                  <div class="text-center">
                    <q-icon name="access_time" size="48px" class="text-terracotta q-mb-md" />
                    <h3 class="font-playfair q-mb-md">Aankomst</h3>
                    <p class="text-body1">{{ checkInInfo.time }}</p>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="text-center">
                    <q-icon name="logout" size="48px" class="text-terracotta q-mb-md" />
                    <h3 class="font-playfair q-mb-md">Vertrek</h3>
                    <p class="text-body1">{{ checkInInfo.checkout }}</p>
                  </div>
                </div>
              </div>

              <!-- Address -->
              <div class="text-center q-mb-xl">
                <q-icon name="location_on" size="48px" class="text-terracotta q-mb-md" />
                <h3 class="font-playfair q-mb-md">Adres</h3>
                <p class="text-body1">{{ checkInInfo.address }}</p>
              </div>

              <!-- Instructions -->
              <div class="text-center q-mb-xl">
                <q-icon name="info" size="48px" class="text-terracotta q-mb-md" />
                <h3 class="font-playfair q-mb-md">Instructies</h3>
                <p class="text-body1">{{ checkInInfo.instructions }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeroSection from 'src/components/HeroSection.vue';

const houseRules = ref([
  {
    icon: 'family_restroom',
    title: 'Gezinsvriendelijk',
    description: 'Perfect voor families en kleine groepen tot 4 personen'
  },
  {
    icon: 'pets',
    title: 'Honden welkom',
    description: 'Honden zijn toegestaan in overleg'
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
      'Zwembad: automatische pomp/filter'
    ]
  },
  {
    icon: 'support_agent',
    title: 'Service',
    items: [
      'Professionele eindschoonmaak (€150)',
      'Sleutelbeheerder voor in-/uitchecken',
      'Optioneel linnen pakket (€22/slaapkamer)',
      'Tuinonderhoud (vanaf september)',
      'Tussentijdse schoonmaak via sleutelbeheerder',
      'Zwembad: bij voorkeur zelf bijhouden'
    ]
  }
];

const pricing = ref([
  {
    name: 'Hoogseizoen',
    period: 'Juli - Augustus',
    price: '€165 per nacht',
    weekly: '€1.150 per week',
    twoWeeks: '€2.100 voor 2 weken'
  },
  {
    name: 'Middenseizoen',
    period: 'April, Mei, Juni, September',
    price: '€100 per nacht',
    weekly: '€700 per week',
    twoWeeks: '€1.300 voor 2 weken',
    threeWeeks: '€1.900 voor 3 weken',
    monthly: '€2.300 per maand'
  },
  {
    name: 'Laagseizoen',
    period: 'Januari, Februari, Maart, Oktober, November, December',
    price: '€85 per nacht',
    weekly: '€600 per week',
    twoWeeks: '€1.000 voor 2 weken',
    monthly: '€1.300 per maand'
  }
]);

const faqCategories = ref([
  {
    title: 'Verblijf & Voorzieningen',
    items: [
      {
        question: 'Zijn honden toegestaan?',
        answer: 'Ja, honden zijn welkom in Casa Mi Sueño in overleg. Laat het ons wel even weten bij je boeking zodat we hier rekening mee kunnen houden.'
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
        question: 'Hoe werkt het zwembadonderhoud?',
        answer: 'Het zwembad wordt bij voorkeur door de huurder bijgehouden. Er is een automatische pomp/filter die in de schuur aangezet kan worden. Daarnaast zit er een drijvend element waarin chloortabletten gedaan kunnen worden die af en toe vervangen moeten worden. Ook is er een robotstofzuiger voor de bodem beschikbaar. In het uiterste geval kan de sleutelbeheerder het zwembad schoonmaken.'
      },
      {
        question: 'Kan er tussentijdse schoonmaak geregeld worden?',
        answer: 'Ja, tussentijdse schoonmaak kan geregeld worden via de sleutelbeheerder. Neem hiervoor contact op tijdens je verblijf.'
      },
      {
        question: 'Zijn handdoeken en beddengoed inbegrepen?',
        answer: 'Er is een optioneel linnen pakket beschikbaar voor €22 per slaapkamer. Dit omvat:<br>• Beddengoed<br>• Badhanddoeken<br>• Keukenlinnen<br><br>Je kunt ook je eigen linnen meenemen.'
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
        answer: 'De betaling verloopt in twee delen:<br>• 30% aanbetaling bij reservering<br>• Resterende 70% uiterlijk 6 weken voor aankomst<br><br>Daarnaast vragen we een borg van €400, die binnen 5-7 werkdagen na vertrek wordt teruggestort.<br><br>Let op: geen annulering mogelijk.'
      },
      {
        question: 'Wat zijn de tarieven?',
        answer: 'Onze tarieven variëren per seizoen:<br>• <strong>Hoogseizoen (juli-augustus):</strong> €165/nacht, €1.150/week, €2.100/2 weken<br>• <strong>Middenseizoen (april-juni, september):</strong> €100/nacht, €700/week, €1.300/2 weken, €1.900/3 weken, €2.300/maand<br>• <strong>Laagseizoen (jan-maart, okt-dec):</strong> €85/nacht, €600/week, €1.000/2 weken, €1.300/maand<br><br>Schoonmaak: €150 (inclusief in- en uitchecken). Huisdieren zijn toegestaan.'
      },
      {
        question: 'Welke kosten zijn inbegrepen in de huurprijs?',
        answer: 'In de huurprijs zijn inbegrepen:<br>• Energiekosten<br>• WiFi<br>• Zwembadonderhoud (of zelf bijhouden)<br>• Tuinonderhoud (vanaf september)<br><br>Extra kosten:<br>• Schoonmaak: €150 (inclusief in- en uitchecken)<br>• Borg: €400 (refundeerbaar)<br><br>Huisdieren zijn toegestaan.'
      }
    ]
  }
]);

const checkInInfo = {
  time: '16:00',
  checkout: '10:00',
  address: 'Carrer de les Petúnies 16\n03580 L\'Alfàs del Pi\nAlicante, Spanje',
  instructions: 'Bij aankomst word je welkom geheten door onze sleutelbeheerder. Deze regelt de inchecking en sleuteloverdracht om 16:00 uur en geeft je een korte rondleiding door het huis. Bij vertrek om 10:00 uur regelt de sleutelbeheerder ook de uitchecking. Andere tijden zijn in overleg mogelijk.'
};

// Helper functions for enhanced pricing card
const getSeasonColor = (index: number): string => {
  const colors = ['red', 'primary', 'green'];
  return colors[index] || 'primary';
};

const getSeasonIcon = (index: number): string => {
  const icons = ['wb_sunny', 'partly_cloudy_day', 'ac_unit'];
  return icons[index] || 'schedule';
};
</script>

<style scoped>
.season-chip {
  padding: 6px 16px !important;
  min-width: fit-content !important;
  font-size: 0.875rem !important;
}

.season-chip :deep(.q-chip__content) {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  white-space: nowrap !important;
}

.season-chip__icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-left: -2px;
}

.season-chip__label {
  font-weight: 600;
}

.pricing-list {
  margin-left: 1rem;
}

.pricing-row {
  margin-bottom: 0.5rem;
}

.pricing-item-simple {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.pricing-icon {
  color: var(--cms-terracotta);
  min-width: 20px;
  display: flex;
  justify-content: center;
}

.pricing-label-simple {
  min-width: 80px;
  color: #666;
  font-size: 0.9rem;
}

.pricing-value-simple {
  font-weight: 600;
  color: var(--cms-deep-terracotta);
  margin-left: auto;
}

/* Enhanced feature lists with proper alignment */
.feature-list-enhanced {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  margin-bottom: 0.25rem;
}

.feature-icon {
  color: var(--cms-terracotta);
  min-width: 20px;
  display: flex;
  justify-content: center;
}

.extras-block {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.extras-block:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.facility-card,
.pricing-card,
.rules-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.booking-info {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: fit-content;
  align-self: flex-start;
}

.season-header-simple {
  margin-bottom: 1rem;
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