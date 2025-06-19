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
              Plan je verblijf in ons familiehuis
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Boek je vakantie</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Wil je ook genieten van ons tweede thuis aan de Costa Blanca? 
          Casa Mi Sueño is een rustige plek voor gasten die, net als wij, houden van authenticiteit en rust.
          We verhuren alleen aan gasten die ons huis met dezelfde zorg en respect behandelen als wij.
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
              <h3 class="font-playfair q-mb-lg">Tarieven 2025</h3>
              
              <div class="season-rates">
                <div class="season q-mb-lg">
                  <h4 class="text-h6 font-playfair q-mb-sm">Laagseizoen</h4>
                  <p class="text-body1 q-mb-sm">November t/m maart</p>
                  <p class="text-h5 text-terracotta q-mb-none">€145 per nacht</p>
                  <p class="text-caption q-mt-sm">Minimaal verblijf: 5 nachten</p>
                </div>

                <div class="season q-mb-lg">
                  <h4 class="text-h6 font-playfair q-mb-sm">Middenseizoen</h4>
                  <p class="text-body1 q-mb-sm">April, mei & oktober</p>
                  <p class="text-h5 text-terracotta q-mb-none">€175 per nacht</p>
                  <p class="text-caption q-mt-sm">Minimaal verblijf: 5 nachten</p>
                </div>

                <div class="season">
                  <h4 class="text-h6 font-playfair q-mb-sm">Hoogseizoen</h4>
                  <p class="text-body1 q-mb-sm">Juni t/m september</p>
                  <p class="text-h5 text-terracotta q-mb-none">€210 per nacht</p>
                  <p class="text-caption q-mt-sm">Minimaal verblijf: 7 nachten</p>
                </div>
              </div>

              <q-separator class="q-my-lg" />

              <div class="long-stay q-mb-lg bg-sand rounded-borders q-pa-md">
                <h4 class="text-h6 font-playfair q-mb-sm">Langer verblijf</h4>
                <p class="text-body2 q-mb-none">
                  Wil je langer blijven dan drie weken? Neem dan even contact met ons op. 
                  We kijken graag samen naar een passend tarief.
                </p>
              </div>

              <div class="included-services q-mb-lg">
                <h4 class="text-h6 font-playfair q-mb-md">Inbegrepen</h4>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <ul class="feature-list">
                      <li>Eindschoonmaak</li>
                      <li>Bed- en badlinnen</li>
                      <li>Koffie, thee en basis voorraad</li>
                      <li>Zwembadonderhoud</li>
                    </ul>
                  </div>
                  <div class="col-12 col-sm-6">
                    <ul class="feature-list">
                      <li>Gas, water, elektra & WiFi</li>
                      <li>Tuinonderhoud</li>
                      <li>Lokale contactpersoon</li>
                      <li>Strandlakens</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="additional-costs">
                <h4 class="text-h6 font-playfair q-mb-md">Extra kosten</h4>
                <ul class="feature-list">
                  <li>Borg: €500 (krijg je terug)</li>
                  <li>Toeristenbelasting: €2,50 p.p.p.n.</li>
                  <li>Extra schoonmaak mogelijk: €75</li>
                  <li>Huisdieren welkom (graag even overleggen)</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Booking Terms -->
          <div class="col-12 col-md-6">
            <div class="booking-card q-pa-lg">
              <h3 class="font-playfair q-mb-lg">Goed om te weten</h3>
              
              <ul class="feature-list q-mb-xl">
                <li>Minimaal verblijf: 5-7 nachten (zie tarieven)</li>
                <li>Geen korte weekendverblijven mogelijk</li>
                <li>Aankomst vanaf 16:00 uur</li>
                <li>Vertrek voor 10:00 uur</li>
                <li>Aanbetaling: 30% bij reservering</li>
                <li>Rest: 8 weken voor aankomst</li>
                <li>Annuleringsverzekering is handig</li>
                <li>Perfect voor koppels en families</li>
                <li>Maximaal 4 personen</li>
                <li>Geen feesten of evenementen</li>
              </ul>

              <div class="early-booking q-pa-md bg-sand rounded-borders">
                <h4 class="text-h6 font-playfair q-mb-sm">Voor wie is Casa Mi Sueño?</h4>
                <p class="text-body2 q-mb-none">
                  Ons huis is perfect voor gasten die houden van rust, natuur en authenticiteit. 
                  We verhuren graag aan koppels, families of kleine groepen vrienden die onze liefde 
                  voor deze bijzondere plek delen.
                </p>
              </div>

              <div class="security-deposit q-pa-md bg-sand rounded-borders q-mt-md">
                <h4 class="text-h6 font-playfair q-mb-sm">Borg</h4>
                <p class="text-body2 q-mb-none">
                  We vragen een borg van €500, die we na je verblijf terugstorten als alles in goede orde is achtergelaten. 
                  De borg ontvang je binnen 5-7 werkdagen na vertrek terug op je rekening.
                </p>
              </div>

              <q-btn
                class="cms-btn cms-btn-primary full-width q-py-sm q-mt-xl"
                to="/contact"
                label="Vraag naar beschikbaarheid"
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
              <h4 class="font-playfair q-mb-md">Voor Rustzoekers</h4>
              <p class="text-body1">
                Ons huis is perfect voor wie houdt van rust en authenticiteit. 
                Ideaal voor koppels, families of kleine groepen vrienden.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="text-center">
              <q-icon name="support_agent" size="48px" class="text-terracotta q-mb-md" />
              <h4 class="font-playfair q-mb-md">Persoonlijke Service</h4>
              <p class="text-body1">
                We delen graag onze lokale tips en helpen je bij het plannen
                van je verblijf. Voel je thuis in ons huis.
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