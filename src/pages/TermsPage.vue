<template>
  <q-page>
    <section class="section bg-white">
      <div class="container">
        <h1 class="text-center font-playfair q-mb-xl">Algemene Voorwaarden</h1>
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <div class="text-body1">
              <h2 class="font-playfair q-mb-md">1. Reservering en Betaling</h2>
              <ul class="q-mb-lg">
                <li>Een reservering is definitief na ontvangst van de aanbetaling van 30% van de huursom.</li>
                <li>Het resterende bedrag dient uiterlijk 6 weken voor aankomst te zijn voldaan.</li>
                <li>Bij reservering binnen 6 weken voor aankomst dient het volledige bedrag direct te worden voldaan.</li>
                <li>Bij niet tijdige betaling hebben wij het recht de reservering te annuleren.</li>
              </ul>

              <h2 class="font-playfair q-mb-md">2. Annulering</h2>
              <ul class="q-mb-lg">
                <li>Tot 6 weken voor aankomst: 30% van de huursom (de aanbetaling)</li>
                <li>6-4 weken voor aankomst: 60% van de huursom</li>
                <li>4-2 weken voor aankomst: 80% van de huursom</li>
                <li>Binnen 2 weken voor aankomst: 100% van de huursom</li>
                <li>We raden je aan een annuleringsverzekering af te sluiten.</li>
              </ul>

              <h2 class="font-playfair q-mb-md">3. Aankomst en Vertrek</h2>
              <ul class="q-mb-lg">
                <li>Aankomst vanaf 16:00 uur</li>
                <li>Vertrek voor 10:00 uur</li>
                <li>Afwijkende tijden alleen in overleg en indien mogelijk</li>
              </ul>

              <h2 class="font-playfair q-mb-md">4. Gebruik van de Woning</h2>
              <ul class="q-mb-lg">
                <li>De woning is geschikt voor maximaal 4 personen</li>
                <li>Roken is niet toegestaan in de woning</li>
                <li>Huisdieren zijn welkom na overleg bij de boeking</li>
                <li>De huurder dient de woning netjes en schoon te houden</li>
                <li>Schade dient direct te worden gemeld</li>
              </ul>

              <h2 class="font-playfair q-mb-md">5. Aansprakelijkheid</h2>
              <ul class="q-mb-lg">
                <li>Wij zijn niet aansprakelijk voor diefstal, ongevallen of schade</li>
                <li>De huurder is aansprakelijk voor schade die door hem/haar of medehuurders is veroorzaakt</li>
                <li>Gebruik van faciliteiten zoals het zwembad is op eigen risico</li>
              </ul>

              <h2 class="font-playfair q-mb-md">6. Klachten</h2>
              <ul class="q-mb-lg">
                <li>Eventuele klachten dienen direct te worden gemeld</li>
                <li>Wij zullen ons best doen om klachten zo snel mogelijk op te lossen</li>
                <li>Klachten die niet tijdens het verblijf zijn gemeld kunnen achteraf niet in behandeling worden genomen</li>
              </ul>

              <h2 class="font-playfair q-mb-md">7. Toepasselijk Recht</h2>
              <p class="q-mb-lg">
                Op alle overeenkomsten met Casa Mi Sueño is het Nederlands recht van toepassing.
              </p>

              <h2 class="font-playfair q-mb-md">8. Contact</h2>
              <p class="q-mb-lg">
                Voor vragen over onze voorwaarden kun je contact met ons opnemen via:<br>
                E-mail: esversteeg@hotmail.com<br>
                Telefoon: 06 - 8364 5489
              </p>

              <p class="text-caption q-mb-xl">
                Laatste update: {{ formattedDate }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<style scoped>
ul {
  list-style: disc;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';

const formattedDate = computed(() => {
  return new Date().toLocaleDateString('nl-NL', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
});
</script> 