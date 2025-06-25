<template>
  <q-page>
    <HeroSection
      image="/images/Tuin_planten.jpg"
      alt-text="De mediterrane tuin van Casa Mi Sueño"
      title="Privacyverklaring"
      subtitle="Hoe wij omgaan met jouw gegevens"
    />

    <section class="section bg-white">
      <div class="container">
        <div class="text-body2">
          <h2 class="text-h5 font-playfair q-mb-lg">Welke gegevens verzamelen wij?</h2>
          <p class="q-mb-lg">
            Bij het maken van een boeking verzamelen wij de volgende gegevens:
          </p>
          <ul class="q-mb-xl">
            <li>Voor- en achternaam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer</li>
            <li>Adresgegevens</li>
            <li>Aantal personen en leeftijden</li>
            <li>Verblijfsdata</li>
            <li>Betalingsgegevens</li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Waarvoor gebruiken wij deze gegevens?</h2>
          <ul class="q-mb-xl">
            <li>Voor het verwerken en bevestigen van je boeking</li>
            <li>Voor het versturen van praktische informatie over je verblijf</li>
            <li>Voor het versturen van de factuur</li>
            <li>Voor het verwerken van betalingen</li>
            <li>Voor het voldoen aan wettelijke verplichtingen (zoals toeristenbelasting)</li>
            <li>Voor het versturen van een welkomstmail met aanvullende informatie</li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Delen van gegevens</h2>
          <p class="q-mb-lg">
            Wij delen je gegevens alleen met derden als dit noodzakelijk is voor de uitvoering van onze dienstverlening of om te voldoen aan een wettelijke verplichting. Met bedrijven die je gegevens verwerken sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid.
          </p>

          <h2 class="text-h5 font-playfair q-mb-lg">Bewaartermijn</h2>
          <p class="q-mb-lg">
            Wij bewaren je persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor je gegevens worden verzameld. Wij hanteren de volgende bewaartermijnen:
          </p>
          <ul class="q-mb-xl">
            <li>Boekingsgegevens: 7 jaar (wettelijke bewaarplicht)</li>
            <li>E-mailcorrespondentie: 2 jaar na je laatste verblijf</li>
            <li>Betalingsgegevens: 7 jaar (wettelijke bewaarplicht)</li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Je rechten</h2>
          <p class="q-mb-lg">
            Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heb je het recht om eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens.
          </p>

          <h2 class="text-h5 font-playfair q-mb-lg">Contact</h2>
          <p class="q-mb-lg">
            Voor vragen over ons privacybeleid of een verzoek tot inzage, correctie of verwijdering van je gegevens kun je contact met ons opnemen via:
          </p>
          <p>
            E-mail: esversteeg@hotmail.com<br>
            Telefoon: 06 - 8364 5489
          </p>
        </div>
      </div>
    </section>
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
  margin-bottom: 1rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
}
</style> 