<template>
  <q-page>
    <HeroSection
      image="/images/Tuin_mediterraans.jpg"
      alt-text="De mediterrane tuin van Casa Mi Sueño"
      title="Algemene voorwaarden"
      subtitle="Onze voorwaarden voor een zorgeloos verblijf"
    />

    <div class="section bg-white">
      <div class="container">
        <div class="text-body2">
          <h2 class="text-h5 font-playfair q-mb-lg">Boekingsvoorwaarden</h2>
          <ul>
            <li>Hoogseizoen (juli-augustus): minimaal 7 nachten, aankomst op zaterdag</li>
            <li>Middenseizoen (april-juni, september): minimaal 5 nachten</li>
            <li>Laagseizoen (oktober-maart): minimaal 3 nachten</li>
            <li>Aanbetaling van 30% bij boeking</li>
            <li>Restbetaling uiterlijk 8 weken voor aankomst</li>
            <li>Borg van €500 (wordt binnen 5-7 werkdagen na vertrek teruggestort)</li>
            <li>Toeristenbelasting €2,50 per persoon per nacht</li>
            <li>Huisdieren zijn welkom in overleg bij de boeking</li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Annuleringsvoorwaarden</h2>
          <ul>
            <li>Tot 8 weken voor aankomst: kosteloos annuleren</li>
            <li>8-6 weken voor aankomst: 30% van de huursom</li>
            <li>6-4 weken voor aankomst: 60% van de huursom</li>
            <li>4-2 weken voor aankomst: 80% van de huursom</li>
            <li>Minder dan 2 weken voor aankomst: 100% van de huursom</li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Huisregels</h2>
          <ul>
            <li>Inchecken vanaf 16:00 uur, uitchecken voor 10:00 uur</li>
            <li>Maximaal 6 personen</li>
            <li>Roken alleen toegestaan buiten</li>
            <li>Geen feesten of evenementen</li>
            <li>Respecteer de rust van de buren</li>
            <li>Huisdieren zijn welkom in overleg</li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Aansprakelijkheid</h2>
          <ul>
            <li>De huurder is aansprakelijk voor schade aan het huis of de inventaris</li>
            <li>Wij zijn niet aansprakelijk voor verlies, diefstal of schade aan persoonlijke eigendommen</li>
            <li>Wij zijn niet aansprakelijk voor persoonlijk letsel ontstaan tijdens het verblijf</li>
            <li>Het zwembad wordt gebruikt op eigen risico</li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Privacy</h2>
          <ul>
            <li>Wij gaan zorgvuldig om met uw persoonsgegevens volgens onze <router-link to="/privacy" class="text-primary">privacyverklaring</router-link></li>
            <li>Uw gegevens worden alleen gebruikt voor de afhandeling van uw boeking</li>
            <li>Wij delen uw gegevens niet met derden zonder uw toestemming</li>
          </ul>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import HeroSection from 'src/components/HeroSection.vue';
</script>

<style lang="scss" scoped>
.section {
  padding: 4rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

ul {
  padding-left: 1.5rem;
  margin-bottom: 2rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
}
</style> 