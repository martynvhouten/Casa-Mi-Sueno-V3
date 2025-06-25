<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Woonkamer_tafel_stoelen.jpg"
      alt-text="Eettafel en stoelen in de woonkamer"
      title="Ons tweede thuis"
      subtitle="Waar comfort en karakter elkaar ontmoeten"
    />

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Meer dan vier muren</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Casa Mi Sueño voelt niet als een vakantiehuis - het voelt als thuiskomen. Elke kamer heeft zijn 
          eigen verhaal, elke hoek is met liefde ingericht. Van de gezellige woonkamer waar je 's avonds 
          ontspant tot het zwembad waar je overdag afkoelt. Dit is niet zomaar een huis; dit is de plek 
          waar mooie herinneringen ontstaan.
        </p>
      </div>
    </section>

    <!-- Living Areas -->
    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg">Woonruimtes</h2>
            <p class="text-body1 q-mb-lg">
              De lichte woonkamer biedt een comfortabele plek om te ontspannen, met grote ramen 
              die uitkijken op de tuin. De keuken is volledig ingericht met een gasfornuis, 
              conventionele oven, vaatwasser en alle benodigde apparatuur om heerlijke maaltijden 
              te bereiden.
            </p>
            <ul class="feature-list q-mb-xl">
              <li>Ruime woonkamer met comfortabele zithoek</li>
              <li>Smart TV met streaming mogelijkheden</li>
              <li>Volledig uitgeruste keuken met gasfornuis</li>
              <li>Vaatwasser en alle keukenapparatuur</li>
              <li>Wasmachine en droger</li>
            </ul>
          </div>
          <div class="col-12 col-md-6">
            <div class="cms-img-container" style="height: 400px;">
              <q-img
                src="/images/Woonkamer_zithoek.jpg"
                class="cms-img rounded-borders"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bedrooms -->
    <section class="section bg-sand">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Slaapkamers</h2>
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <div class="bedroom-card q-pa-none">
              <div class="cms-img-container" style="height: 300px;">
                <q-img
                  src="/images/Slaapkamer2.jpg"
                  class="cms-img"
                />
              </div>
              <div class="q-pa-lg">
                <h3 class="font-playfair q-mb-md">Slaapkamer met badkamer</h3>
                <p class="text-body1 q-mb-md">
                  Een ruime, lichte slaapkamer met een badkamer ernaast. Deze comfortabele kamer biedt een fijne plek om tot rust te komen.
                </p>
                <ul class="feature-list">
                  <li>Comfortabel tweepersoonsbed</li>
                  <li>Kledingkast</li>
                  <li>Badkamer naast de kamer</li>
                  <li>Airconditioning</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="bedroom-card q-pa-none">
              <div class="cms-img-container" style="height: 300px;">
                <q-img
                  src="/images/Slaapkamer1_vooraanzicht.jpg"
                  class="cms-img"
                />
              </div>
              <div class="q-pa-lg">
                <h3 class="font-playfair q-mb-md">Tweede slaapkamer</h3>
                <p class="text-body1 q-mb-md">
                  Een comfortabele tweede slaapkamer met tweepersoonsbed, met een badkamer in de hal ernaast. Perfect voor familie of vrienden.
                </p>
                <ul class="feature-list">
                  <li>Comfortabel tweepersoonsbed</li>
                  <li>Kledingkast</li>
                  <li>Badkamer in de hal</li>
                  <li>Airconditioning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bathrooms -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Badkamers</h2>
        <div class="row q-col-gutter-xl justify-center">
          <div class="col-12 col-md-4" v-for="bathroom in bathrooms" :key="bathroom.title">
            <div class="bathroom-card q-pa-none">
              <div class="cms-img-container" style="height: 250px;">
                <q-img
                  :src="bathroom.image"
                  class="cms-img"
                />
              </div>
              <div class="q-pa-lg">
                <h3 class="font-playfair q-mb-md">{{ bathroom.title }}</h3>
                <p class="text-body1 q-mb-md">{{ bathroom.description }}</p>
                <ul class="feature-list">
                  <li v-for="feature in bathroom.features" :key="feature">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Outdoor Areas -->
    <section class="section bg-sand">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Buitenleven</h2>
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <div class="outdoor-card q-pa-none">
              <div class="cms-img-container" style="height: 300px;">
                <q-img
                  src="/images/Tuin_zwembad.jpg"
                  class="cms-img"
                />
              </div>
              <div class="q-pa-lg">
                <h3 class="font-playfair q-mb-md">Zwembad & Tuin</h3>
                <p class="text-body1 q-mb-md">
                  De mediterrane tuin biedt verschillende plekjes om te ontspannen. Het ruime ronde 
                  zwembad is een heerlijke verkoeling op warme dagen. Wekelijks onderhoud zorgt 
                  ervoor dat het zwembad altijd perfect is voor een verfrissende duik.
                </p>
                <ul class="feature-list">
                  <li>Ruim rond zwembad</li>
                  <li>Ligbedden en parasols</li>
                  <li>Wekelijks zwembadonderhoud</li>
                  <li>Buitendouche</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="outdoor-card q-pa-none">
              <div class="cms-img-container" style="height: 300px;">
                <q-img
                  src="/images/Tuin_bbq.jpg"
                  class="cms-img"
                />
              </div>
              <div class="q-pa-lg">
                <h3 class="font-playfair q-mb-md text-center">Veranda & BBQ</h3>
                <p class="text-body1 q-mb-md">
                  De overdekte veranda is perfect voor buitenmaaltijden. De keramische Bastard BBQ 
                  staat klaar voor heerlijke barbecues. De omheinde tuin biedt privacy en heeft 
                  parkeergelegenheid voor twee auto's.
                </p>
                <ul class="feature-list">
                  <li>Overdekte veranda</li>
                  <li>Keramische Bastard BBQ</li>
                  <li>Diverse zithoeken</li>
                  <li>Parkeerplaats voor 2 auto's</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Ontdek het buitenleven</h2>
        <p class="text-h6 text-grey-8 q-mx-auto q-mb-xl" style="max-width: 800px;">
          Het echte Spaanse leven speelt zich buiten af. Ontdek onze prachtige 
          mediterrane tuin met zwembad en diverse terrassen.
        </p>
        <q-btn
          class="cms-btn cms-btn-primary q-px-xl q-py-sm text-subtitle1"
          to="/buiten-leven"
          label="Bekijk de tuin"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import HeroSection from 'src/components/HeroSection.vue';

const bathrooms = [
  {
    image: '/images/Badkamer.jpg',
    title: 'Badkamer bij slaapkamer',
    description: 'Praktische badkamer met douche, wastafel en toilet, gelegen naast de slaapkamer',
    features: [
      'Inloopdouche',
      'Wastafel',
      'Toilet',
      'Handdoeken inbegrepen'
    ]
  },
  {
    image: '/images/Badkamer2.jpg',
    title: 'Badkamer in de hal',
    description: 'Functionele badkamer met douche, wastafel en toilet, gelegen in de hal',
    features: [
      'Douche',
      'Wastafel',
      'Toilet',
      'Handdoeken inbegrepen'
    ]
  }
];
</script>

<style scoped>
.bedroom-card,
.bathroom-card,
.outdoor-card {
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