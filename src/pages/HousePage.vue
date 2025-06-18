<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section">
      <q-img
        src="/images/Woonkamer_tafel_stoelen.jpg"
        class="absolute-full"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content text-center">
          <div class="animate-fade-in-up">
            <h1 class="text-shadow q-mb-md font-playfair">Het Huis</h1>
            <p class="text-h5 text-shadow q-mb-xl font-poppins">
              Een gezellig thuis in Spanje
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Welkom bij ons thuis</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Casa Mi Sueño is ons tweede thuis aan de Costa Blanca, een plek waar we tot rust komen
          en dat we delen met anderen als we er niet zijn. Met twee gastenslaapkamers, twee badkamers, een fijne tuin
          en een verkoelend zwembad is het de perfecte uitvalsbasis voor een ontspannen vakantie.
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
              die uitkijken op de tuin. De open keuken is volledig ingericht met een gasfornuis, 
              conventionele oven, vaatwasser en alle benodigde apparatuur om heerlijke maaltijden 
              te bereiden.
            </p>
            <ul class="feature-list q-mb-xl">
              <li>Smart TV met Nederlandse en internationale zenders</li>
              <li>Comfortabele zithoek</li>
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
                <h3 class="font-playfair q-mb-md">Hoofdslaapkamer met Eigen Badkamer</h3>
                <p class="text-body1 q-mb-md">
                  Een ruime, lichte slaapkamer met directe toegang tot een eigen badkamer. Deze comfortabele kamer is perfect voor een ontspannen verblijf.
                </p>
                <ul class="feature-list">
                  <li>Tweepersoonsbed</li>
                  <li>Eigen badkamer</li>
                  <li>Ruime kledingkast</li>
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
                <h3 class="font-playfair q-mb-md">Tweede Slaapkamer</h3>
                <p class="text-body1 q-mb-md">
                  Een comfortabele tweede slaapkamer met tweepersoonsbed, met toegang tot de familie badkamer. Perfect voor familie of vrienden.
                </p>
                <ul class="feature-list">
                  <li>Tweepersoonsbed</li>
                  <li>Ruime kledingkast</li>
                  <li>Airconditioning</li>
                  <li>Uitzicht op de tuin</li>
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
                <h3 class="font-playfair q-mb-md">Veranda & BBQ</h3>
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
const bathrooms = [
  {
    image: '/images/Badkamer.jpg',
    title: 'Master Badkamer',
    description: 'Luxe en-suite badkamer met dubbele wastafel en inloopdouche',
    features: [
      'Ruime inloopdouche',
      'Dubbele wastafel',
      'Vloerverwarming',
      'Design sanitair'
    ]
  },
  {
    image: '/images/Badkamer2.jpg',
    title: 'Familie Badkamer',
    description: 'Ruime badkamer met bad/douche combinatie en veel opbergruimte',
    features: [
      'Bad/douche combinatie',
      'Dubbele wastafel',
      'Vloerverwarming',
      'Ruime opbergkasten'
    ]
  }
];
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 60vh;
  min-height: 500px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5));
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  color: white;
  z-index: 1;
}

.feature-list {
  list-style: none;
  padding-left: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--q-dark);
}

.feature-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--cms-deep-terracotta);
}

.bedroom-card,
.bathroom-card {
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