<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_zwembad.jpg"
      alt-text="Zwembad en tuin van het vakantiehuis"
      title="Ons buitenparadijs"
      subtitle="Waar het Spaanse leven zich afspeelt"
    />

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Van ochtendkoffie tot sterrenhemel</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          De tuin en het zwembad zijn het kloppende hart van Casa Mi Sueño. Hier brengen we 
          zelf het grootste deel van onze tijd door - van de eerste koffie op de veranda tot 
          de laatste borrel onder de sterren. De verschillende terrassen en zithoeken zorgen 
          ervoor dat er altijd wel een perfect plekje is, of je nu zoekt naar zon of schaduw.
        </p>
      </div>
    </section>

    <!-- Swimming Pool -->
    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg">Het zwembad</h2>
            <p class="text-body1 q-mb-lg">
              Het ruime ronde zwembad is een heerlijke verkoeling op warme dagen. Het zwembad
              wordt wekelijks onderhouden en is niet verwarmd. In de zomermaanden heeft het water 
              een aangename temperatuur voor een verfrissende duik. De buitendouche is perfect voor een snelle verfrissing.
            </p>
            <ul class="feature-list q-mb-xl">
              <li>Ruim rond zwembad</li>
              <li>Comfortabele ligbedden en parasols</li>
              <li>Buitendouche</li>
              <li>Wekelijks onderhoud</li>
              <li>Zonneterras rondom</li>
            </ul>
          </div>
          <div class="col-12 col-md-6">
            <div class="cms-img-container" style="height: 400px;">
              <q-img
                src="/images/Tuin_zwembad-douche.jpg"
                class="cms-img rounded-borders"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Veranda -->
    <section class="section bg-sand">
      <div class="container">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6">
            <div class="cms-img-container" style="height: 400px;">
              <q-img
                src="/images/Tuin_veranda.jpg"
                class="cms-img rounded-borders"
              />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg">De veranda</h2>
            <p class="text-body1 q-mb-lg">
              De overdekte veranda is een heerlijke plek om te ontbijten, te lunchen of 
              's avonds te dineren. Het is een ideale schaduwplek voor de warme middaguren 
              en een gezellige zitplek voor de avond.
            </p>
            <ul class="feature-list q-mb-xl">
              <li>Ruime eettafel</li>
              <li>Comfortabele zithoek</li>
              <li>Altijd een aangename schaduwplek</li>
              <li>Sfeervolle verlichting</li>
              <li>Direct toegang tot de keuken</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Garden Areas -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">De tuin</h2>
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4" v-for="area in gardenAreas" :key="area.title">
            <div class="garden-card q-pa-none">
              <div class="cms-img-container" style="height: 250px;">
                <q-img
                  :src="area.image"
                  class="cms-img"
                />
              </div>
              <div class="q-pa-lg">
                <h3 class="font-playfair q-mb-md">{{ area.title }}</h3>
                <p class="text-body1 q-mb-md">{{ area.description }}</p>
                <ul class="feature-list">
                  <li v-for="feature in area.features" :key="feature">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BBQ Area -->
    <section class="section bg-sand">
      <div class="container">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg">BBQ & Buitenkoken</h2>
            <p class="text-body1 q-mb-lg">
              De keramische Bastard BBQ staat klaar voor heerlijke barbecues. Deze hoogwaardige 
              keramische BBQ geeft perfecte resultaten en is ideaal voor het bereiden van 
              heerlijke gerechten in de buitenlucht.
            </p>
            <ul class="feature-list q-mb-xl">
              <li>Keramische Bastard BBQ</li>
              <li>BBQ-gereedschap aanwezig</li>
              <li>Nabij de veranda</li>
              <li>Perfect voor buitenkoken</li>
            </ul>
          </div>
          <div class="col-12 col-md-6">
            <div class="cms-img-container" style="height: 400px;">
              <q-img
                src="/images/Tuin_bbq.jpg"
                class="cms-img rounded-borders"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Ontdek de omgeving</h2>
        <p class="text-h6 text-grey-8 q-mx-auto q-mb-xl" style="max-width: 800px;">
          De omheinde tuin biedt privacy en ruimte voor ontspanning, met parkeergelegenheid 
          voor twee auto's op eigen terrein.
        </p>
        <q-btn
          class="cms-btn cms-btn-primary q-px-xl q-py-sm text-subtitle1"
          to="/omgeving"
          label="Verken de omgeving"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import HeroSection from 'src/components/HeroSection.vue';

const gardenAreas = [
  {
    image: '/images/Tuin_mediterraans.jpg',
    title: 'Mediterrane tuin',
    description: 'Een verzorgde tuin met mediterrane beplanting die schaduw en kleur biedt',
    features: [
      'Diverse mediterrane planten',
      'Schaduwrijke plekken',
      'Omheinde tuin',
      'Regelmatig onderhoud'
    ]
  },
  {
    image: '/images/Tuin_zithoek.jpg',
    title: 'Zithoeken',
    description: 'Verschillende plekjes in de tuin om te zitten en te ontspannen',
    features: [
      'Diverse zitplekken',
      'Comfortabel tuinmeubilair',
      'Zonnige en schaduwplekken',
      'Privacy door omheining'
    ]
  },
  {
    image: '/images/Tuin_eetgedeelte.jpg',
    title: 'Praktische indeling',
    description: 'De tuin is praktisch ingedeeld met ruimte voor parkeren en ontspanning',
    features: [
      'Parkeerplaats voor 2 auto\'s',
      'Eenvoudige toegang tot huis',
      'Bastard BBQ aanwezig',
      'Onderhoudsvriendelijk'
    ]
  }
];
</script>

<style scoped>
.garden-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: hidden;
}

.cms-img {
  transition: transform 0.3s ease;
}

.cms-img:hover {
  transform: scale(1.02);
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
</style> 