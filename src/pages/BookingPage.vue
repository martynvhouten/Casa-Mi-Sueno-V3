<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section">
      <q-img
        src="/images/Tuin_zwembad.jpg"
        class="absolute-full"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="animate-fade-in-up text-center text-white">
            <h1 class="text-shadow q-mb-md font-playfair">Reserveren</h1>
            <p class="text-h5 text-shadow q-mb-xl font-poppins">
              Plan uw verblijf in ons familiehuis
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Boek uw vakantie</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Wilt u ook genieten van ons tweede thuis aan de Costa Blanca? 
          Bekijk hieronder de beschikbaarheid en tarieven, en neem contact met ons op 
          voor een reservering.
        </p>
      </div>
    </section>

    <!-- Booking Info -->
    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <!-- Calendar -->
          <div class="col-12">
            <BookingCalendar />
          </div>

          <!-- Rates -->
          <div class="col-12 col-md-6">
            <div class="booking-card q-pa-lg">
              <h3 class="font-playfair q-mb-lg">Tarieven 2024</h3>
              
              <div class="season-rates">
                <div class="season q-mb-lg">
                  <h4 class="text-h6 font-playfair q-mb-sm">Laagseizoen</h4>
                  <p class="text-body1 q-mb-sm">November t/m maart</p>
                  <p class="text-h5 text-terracotta q-mb-none">vanaf €165 per nacht</p>
                  <p class="text-caption q-mt-sm">Minimaal verblijf: 10 nachten</p>
                </div>

                <div class="season q-mb-lg">
                  <h4 class="text-h6 font-playfair q-mb-sm">Middenseizoen</h4>
                  <p class="text-body1 q-mb-sm">April, mei & oktober</p>
                  <p class="text-h5 text-terracotta q-mb-none">vanaf €195 per nacht</p>
                  <p class="text-caption q-mt-sm">Minimaal verblijf: 10 nachten</p>
                </div>

                <div class="season q-mb-lg">
                  <h4 class="text-h6 font-playfair q-mb-sm">Hoogseizoen</h4>
                  <p class="text-body1 q-mb-sm">Juni & september</p>
                  <p class="text-h5 text-terracotta q-mb-none">vanaf €225 per nacht</p>
                  <p class="text-caption q-mt-sm">Minimaal verblijf: 10 nachten</p>
                </div>

                <div class="season">
                  <h4 class="text-h6 font-playfair q-mb-sm">Topseizoen</h4>
                  <p class="text-body1 q-mb-sm">Juli & augustus</p>
                  <p class="text-h5 text-terracotta q-mb-none">vanaf €275 per nacht</p>
                  <p class="text-caption q-mt-sm">Minimaal verblijf: 14 nachten</p>
                </div>
              </div>

              <q-separator class="q-my-lg" />

              <div class="included-services q-mb-lg">
                <h4 class="text-h6 font-playfair q-mb-md">Inbegrepen services</h4>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <ul class="feature-list">
                      <li>Professionele eindschoonmaak</li>
                      <li>Luxe bed- en badlinnen</li>
                      <li>Welkomstpakket bij aankomst</li>
                      <li>Zwembadonderhoud 2x per week</li>
                    </ul>
                  </div>
                  <div class="col-12 col-sm-6">
                    <ul class="feature-list">
                      <li>Energiekosten & WiFi</li>
                      <li>Wekelijkse tuinverzorging</li>
                      <li>24/7 lokale ondersteuning</li>
                      <li>Strandlakens en -parasols</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="additional-costs">
                <h4 class="text-h6 font-playfair q-mb-md">Aanvullende kosten</h4>
                <ul class="feature-list">
                  <li>Waarborg: €500 (wordt teruggestort)</li>
                  <li>Toeristenbelasting: €2,50 p.p.p.n.</li>
                  <li>Optionele tussentijdse schoonmaak: €75</li>
                  <li>Huisdieren zijn van harte welkom (graag vooraf melden)</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Booking Terms -->
          <div class="col-12 col-md-6">
            <div class="booking-card q-pa-lg">
              <h3 class="font-playfair q-mb-lg">Voorwaarden</h3>
              
              <ul class="feature-list q-mb-xl">
                <li>Minimaal verblijf: 10-14 nachten (seizoensafhankelijk)</li>
                <li>Flexibele aankomst- en vertrekdagen</li>
                <li>Inchecken vanaf 16:00 uur</li>
                <li>Uitchecken voor 10:00 uur</li>
                <li>Aanbetaling: 30% bij reservering</li>
                <li>Restbetaling: 8 weken voor aankomst</li>
                <li>Annuleringsverzekering aanbevolen</li>
                <li>Maximaal 6 personen toegestaan</li>
              </ul>

              <div class="early-booking q-pa-md bg-sand rounded-borders">
                <h4 class="text-h6 font-playfair q-mb-sm">Early Booking Voordeel</h4>
                <p class="text-body2 q-mb-none">
                  Boek minimaal 6 maanden vooruit en ontvang 10% korting op de huurprijs.
                </p>
              </div>

              <q-btn
                class="cms-btn cms-btn-primary full-width q-py-sm q-mt-xl"
                to="/contact"
                label="Neem contact op voor beschikbaarheid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Info -->
    <section class="section bg-sand">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4">
            <div class="text-center">
              <q-icon name="event_available" size="48px" class="text-terracotta q-mb-md" />
              <h4 class="font-playfair q-mb-md">Flexibele Periodes</h4>
              <p class="text-body1">
                Buiten het hoogseizoen zijn andere aankomst- en vertrekdagen 
                bespreekbaar. Neem contact met ons op voor de mogelijkheden.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="text-center">
              <q-icon name="groups" size="48px" class="text-terracotta q-mb-md" />
              <h4 class="font-playfair q-mb-md">Voor Families</h4>
              <p class="text-body1">
                Ons huis is perfect voor families. We hebben kinderbedjes en 
                kinderstoelen beschikbaar op aanvraag.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="text-center">
              <q-icon name="support_agent" size="48px" class="text-terracotta q-mb-md" />
              <h4 class="font-playfair q-mb-md">Persoonlijke Service</h4>
              <p class="text-body1">
                We delen graag onze lokale tips en helpen u bij het plannen 
                van uw verblijf.
              </p>
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
          Heeft u nog vragen of wilt u direct reserveren? Neem contact met ons op.
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
import BookingCalendar from '../components/BookingCalendar.vue';
</script>

<style scoped>
.booking-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  height: 100%;
}

.season-rates {
  border-left: 3px solid var(--cms-deep-terracotta);
  padding-left: 1.5rem;
}

.feature-list {
  list-style: none;
  padding-left: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--cms-deep-terracotta);
}
</style> 