<template>
  <q-page>
    <section class="section bg-white">
      <div class="container">
        <h1 class="text-center font-playfair q-mb-xl">Privacyverklaring</h1>
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <div class="text-body1">
              <h2 class="font-playfair q-mb-md">1. Inleiding</h2>
              <p class="q-mb-lg">
                Deze privacyverklaring is van toepassing op de verwerking van persoonsgegevens door Casa Mi Sueño.
                Wij hechten groot belang aan jouw privacy en zullen jouw persoonsgegevens altijd in overeenstemming met
                de Algemene Verordening Gegevensbescherming (AVG) verwerken.
              </p>

              <h2 class="font-playfair q-mb-md">2. Welke gegevens verzamelen wij?</h2>
              <p class="q-mb-md">Wij verzamelen de volgende persoonsgegevens:</p>
              <ul class="q-mb-lg">
                <li>Naam en contactgegevens</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer</li>
                <li>Verblijfsdata</li>
                <li>Betalingsgegevens</li>
              </ul>

              <h2 class="font-playfair q-mb-md">3. Waarvoor gebruiken wij jouw gegevens?</h2>
              <p class="q-mb-md">Wij gebruiken jouw gegevens voor:</p>
              <ul class="q-mb-lg">
                <li>Het verwerken en bevestigen van je reservering</li>
                <li>Het versturen van belangrijke informatie over je verblijf</li>
                <li>Het afhandelen van betalingen</li>
                <li>Het voldoen aan wettelijke verplichtingen</li>
                <li>Het verbeteren van onze dienstverlening</li>
              </ul>

              <h2 class="font-playfair q-mb-md">4. Bewaartermijn</h2>
              <p class="q-mb-lg">
                Wij bewaren jouw persoonsgegevens niet langer dan strikt noodzakelijk is voor de doeleinden
                waarvoor ze zijn verzameld. Voor fiscale gegevens hanteren wij de wettelijke bewaartermijn
                van 7 jaar.
              </p>

              <h2 class="font-playfair q-mb-md">5. Delen van gegevens</h2>
              <p class="q-mb-lg">
                Wij delen jouw gegevens alleen met derden als dit noodzakelijk is voor de uitvoering van onze
                dienstverlening of om te voldoen aan een wettelijke verplichting. Met bedrijven die jouw gegevens
                verwerken sluiten wij een verwerkersovereenkomst om de beveiliging van jouw persoonsgegevens
                te waarborgen.
              </p>

              <h2 class="font-playfair q-mb-md">6. Cookies</h2>
              <p class="q-mb-lg">
                Onze website gebruikt alleen noodzakelijke cookies om de website goed te laten functioneren
                en analytische cookies om het gebruik van de website te analyseren. Voor analytische cookies
                vragen wij jouw toestemming via onze cookie-banner.
              </p>

              <h2 class="font-playfair q-mb-md">7. Jouw rechten</h2>
              <p class="q-mb-md">Je hebt de volgende rechten met betrekking tot jouw persoonsgegevens:</p>
              <ul class="q-mb-lg">
                <li>Recht op inzage</li>
                <li>Recht op correctie</li>
                <li>Recht op verwijdering</li>
                <li>Recht op beperking van de verwerking</li>
                <li>Recht op dataportabiliteit</li>
                <li>Recht om bezwaar te maken tegen de verwerking</li>
              </ul>

              <h2 class="font-playfair q-mb-md">8. Contact</h2>
              <p class="q-mb-lg">
                Voor vragen over ons privacybeleid of een verzoek met betrekking tot jouw persoonsgegevens
                kunt jij contact met ons opnemen via:<br>
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