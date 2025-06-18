<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section">
      <q-img
        src="/images/Tuin_zwembad.jpg"
        class="absolute-full"
        :class="{ 'zoom-effect': true }"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content text-center">
          <div class="animate-fade-in-up">
            <h1 class="text-shadow q-mb-md font-playfair">Welkom in ons Spaanse thuis</h1>
            <p class="text-h5 text-shadow q-mb-xl font-poppins">
              Een gezellig familiehuis waar je je snel thuis voelt
            </p>
            <q-btn
              unelevated
              class="hero-btn q-px-xl q-py-sm text-subtitle1"
              to="/reserveren"
              label="Bekijk wanneer we er niet zijn"
            />
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction Section -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="q-mb-lg font-playfair">Even voorstellen</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Wij zijn Esther en Milco, en samen met onze hond Marlo hebben we hier ons tweede thuis gevonden. 
          Casa Mi Sueño is onze plek om te ontspannen, te genieten van het mediterrane leven en de warme 
          Spaanse cultuur. Als we er zelf niet zijn, delen we ons huis graag met anderen die ook van deze 
          bijzondere plek willen genieten.
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section bg-white">
      <div class="container">
        <div class="cms-grid cms-grid-3">
          <div v-for="feature in features" :key="feature.title" class="cms-card q-pa-lg text-center">
            <div class="cms-img-container q-mb-lg" style="height: 250px;">
              <q-img
                :src="feature.image"
                class="cms-img"
              />
            </div>
            <h3 class="q-mb-md font-playfair">{{ feature.title }}</h3>
            <p class="text-grey-8">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Guest Experience Section -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="q-mb-xl font-playfair">Wat onze gasten zeggen</h2>
        <div class="row q-col-gutter-xl justify-center">
          <div v-for="review in guestReviews" :key="review.author" class="col-12 col-md-4">
            <div class="review-card q-pa-lg">
              <q-icon name="format_quote" size="48px" class="text-terracotta q-mb-md" />
              <p class="text-body1 q-mb-lg">{{ review.text }}</p>
              <p class="text-subtitle1 text-weight-bold">{{ review.author }}</p>
              <p class="text-caption text-grey-7">{{ review.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Living Areas Preview -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="text-center q-mb-xl font-playfair">Een thuis in Spanje</h2>
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <div class="cms-card">
              <div class="cms-img-container" style="height: 400px;">
                <q-img
                  src="/images/Woonkamer.jpg"
                  class="cms-img"
                >
                  <div class="absolute-bottom text-center" style="background: rgba(0,0,0,0.6)">
                    <h4 class="text-white q-mb-sm font-playfair">Binnen</h4>
                    <p class="text-white q-mb-none">Ruime, lichte leefruimtes met alle comfort</p>
                  </div>
                </q-img>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="cms-card">
              <div class="cms-img-container" style="height: 400px;">
                <q-img
                  src="/images/Tuin_mediterraans.jpg"
                  class="cms-img"
                >
                  <div class="absolute-bottom text-center" style="background: rgba(0,0,0,0.6)">
                    <h4 class="text-white q-mb-sm font-playfair">Buiten</h4>
                    <p class="text-white q-mb-none">Mediterrane tuin met diverse zithoeken</p>
                  </div>
                </q-img>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center q-mt-xl">
          <q-btn
            class="cms-btn cms-btn-primary"
            to="/het-huis"
            label="Ontdek meer"
          />
        </div>
      </div>
    </section>

    <!-- Location Highlights -->
    <section class="section bg-sand">
      <div class="container">
        <h2 class="text-center q-mb-xl font-playfair">Tussen bergen en zee</h2>
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4" v-for="highlight in locationHighlights" :key="highlight.title">
            <div class="location-card q-pa-lg text-center">
              <q-icon :name="highlight.icon" size="48px" class="text-terracotta q-mb-md" />
              <h3 class="q-mb-md font-playfair">{{ highlight.title }}</h3>
              <p class="text-grey-8">{{ highlight.description }}</p>
            </div>
          </div>
        </div>
        <div class="text-center q-mt-xl">
          <q-btn
            class="cms-btn cms-btn-primary"
            to="/omgeving"
            label="Verken de omgeving"
          />
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="q-mb-lg font-playfair">Kom ook genieten</h2>
        <p class="text-h6 text-grey-8 q-mx-auto q-mb-xl" style="max-width: 800px;">
          Van ontbijt in de ochtendzon tot een verfrissende duik in het zwembad. 
          Hier kun je echt even tot rust komen en het Spaanse leven ervaren.
        </p>
        <q-btn
          class="cms-btn cms-btn-primary q-px-xl q-py-sm text-subtitle1"
          to="/reserveren"
          label="Bekijk beschikbaarheid"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
const features = [
  {
    image: '/images/Tuin_zwembad.jpg',
    title: 'Ons tweede thuis',
    description: 'Een echt familiehuis waar we zelf regelmatig zijn, en dat we graag delen als we er niet zijn'
  },
  {
    image: '/images/Tuin_mediterraans.jpg',
    title: 'Leven in de buitenlucht',
    description: 'Een fijne tuin met zwembad, verschillende terrassen en een gezellige buitenkeuken'
  },
  {
    image: '/images/Omgeving/Albir_panorama.jpg',
    title: 'Fijne locatie',
    description: 'Rustig gelegen tussen de bergen en de zee, dichtbij strand en alle voorzieningen'
  }
];

const guestReviews = [
  {
    text: "Het voelt echt als een thuis, niet als een vakantiehuis. De persoonlijke details en de relaxte sfeer maken het extra bijzonder.",
    author: "Familie de Vries",
    date: "Augustus 2023"
  },
  {
    text: "Heerlijk om 's ochtends in de tuin te ontbijten. De tips van Esther en Milco hebben ons naar de leukste plekjes in de buurt gebracht.",
    author: "Peter en Anna",
    date: "Juni 2023"
  },
  {
    text: "Een ideale uitvalsbasis om de Costa Blanca te verkennen. Het schriftje met persoonlijke aanbevelingen was goud waard!",
    author: "Mark en Lisa",
    date: "September 2023"
  }
];

const locationHighlights = [
  {
    icon: 'beach_access',
    title: 'Strand & Zee',
    description: 'Het strand van Albir met zijn gezellige boulevard ligt op 15 minuten wandelen'
  },
  {
    icon: 'landscape',
    title: 'Bergen & Natuur',
    description: 'Omringd door de Sierra Helada met mooie wandel- en fietsroutes'
  },
  {
    icon: 'restaurant',
    title: 'Dorpsleven',
    description: 'Gezellige dorpjes en leuke restaurantjes in de buurt'
  }
];
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 90vh;
  min-height: 700px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.6)
  );
}

.hero-content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-xl);
  position: relative;
  z-index: 1;
}

.hero-content .animate-fade-in-up {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 4.5rem;
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
  width: 100%;
  text-align: center;
}

.hero-content p {
  width: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}

.text-shadow {
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
}

.hero-btn {
  background: linear-gradient(135deg, var(--cms-deep-terracotta), var(--cms-light-terracotta));
  color: white;
  font-weight: 500;
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(209, 122, 82, 0.3);
}

/* Zoom effect for background image */
.zoom-effect {
  animation: subtle-zoom 20s ease-out forwards;
}

@keyframes subtle-zoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

/* Fade in up animation */
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scroll Indicator Styles */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid white;
  border-radius: 20px;
  position: relative;
  margin-bottom: 12px;
}

.wheel {
  width: 3px;
  height: 8px;
  background: white;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  animation: scroll 1.5s ease-out infinite;
}

.arrow-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.arrow-scroll span {
  display: block;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
  animation: arrow 1.5s ease-out infinite;
}

.arrow-scroll span:nth-child(2) {
  animation-delay: 0.2s;
}

.arrow-scroll span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}

@keyframes arrow {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-20px, -20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(20px, 20px);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-section {
    height: 80vh;
    min-height: 600px;
  }
  
  .hero-content h1 {
    font-size: 3rem;
  }
  
  .hero-content .text-h5 {
    font-size: 1.25rem;
  }

  .scroll-indicator {
    bottom: 20px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
}

.review-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.location-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.3s ease;
}

.location-card:hover {
  transform: translateY(-4px);
}
</style> 