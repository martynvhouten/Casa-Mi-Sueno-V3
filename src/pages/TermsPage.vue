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
            <li>Hoogseizoen (juni-september): minimaal 7 nachten</li>
            <li>Middenseizoen (april-mei, oktober): minimaal 5 nachten</li>
            <li>Laagseizoen (januari-februari, november): minimaal 7 nachten</li>
            <li>Overwinteren (november, januari-maart): minimaal 1 maand, €1200 per maand</li>
            <li>December niet beschikbaar voor verhuur</li>
            <li>Aanbetaling van 30% bij boeking</li>
            <li>Restbetaling uiterlijk 6 weken voor aankomst</li>
            <li>Borg van €400 (wordt binnen 5-7 werkdagen na vertrek teruggestort)</li>
            <li>Eindschoonmaak €150</li>
            <li>Linnen pakket €22 per slaapkamer (optioneel)</li>
            <li>Honden zijn welkom in overleg bij de boeking</li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Annuleringsvoorwaarden</h2>
          <ul>
            <li>Geen annulering mogelijk na bevestiging</li>
            <li>Aanbetaling en restbetaling zijn niet refundeerbaar</li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Huisregels</h2>
          <ul>
            <li>Inchecken vanaf 16:00 uur, uitchecken voor 10:00 uur</li>
            <li>Andere tijden in overleg met sleutelbeheerder</li>
            <li>Maximaal 4 personen</li>
            <li>Roken alleen toegestaan buiten</li>
            <li>Geen feesten of evenementen</li>
            <li>Respecteer de rust van de buren</li>
            <li>Honden zijn welkom in overleg</li>
            <li>Zwembad onderhoud bij voorkeur door huurder</li>
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