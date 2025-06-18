<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section">
      <q-img
        src="/images/Tuin_vanaf_veranda.jpg"
        class="absolute-full"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content text-center">
          <div class="animate-fade-in-up">
            <h1 class="text-shadow q-mb-md font-playfair">Ons Verhaal</h1>
            <p class="text-h5 text-shadow q-mb-xl font-poppins">
              Hoe een droom werkelijkheid werd
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Our Story Section -->
    <section class="section bg-sand">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg">Liefde op het eerste gezicht</h2>
            <p class="text-body1 q-mb-lg">
              Het was tijdens een warme zomerdag in 2019 toen we voor het eerst door de straten van L'Alfàs del Pi wandelden. 
              De geur van jasmijn in de lucht, het geluid van krekels in de verte, en de vriendelijke 'hola' van voorbijgangers 
              maakten direct indruk.
            </p>
            <p class="text-body1 q-mb-lg">
              We waren al jaren verliefd op Spanje, maar deze plek voelde anders. Authentieker. Persoonlijker. 
              Toen we Casa Mi Sueño voor het eerst zagen, wisten we het meteen: dit moest ons tweede thuis worden.
            </p>
          </div>
          <div class="col-12 col-md-6">
            <div class="cms-img-container" style="height: 400px;">
              <q-img
                src="/images/Tuin_zithoek.jpg"
                class="cms-img rounded-borders"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6">
            <div class="cms-img-container" style="height: 400px;">
              <q-img
                src="/images/Woonkamer_zithoek.jpg"
                class="cms-img rounded-borders"
              />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg">Meer dan een vakantiehuis</h2>
            <p class="text-body1 q-mb-lg">
              We wilden geen standaard vakantiehuis creëren, maar een plek waar gasten zich direct thuis voelen. 
              Elk detail in Casa Mi Sueño is met zorg uitgekozen - van de comfortabele loungebanken tot het 
              handgemaakte servies uit Valencia.
            </p>
            <p class="text-body1 q-mb-lg">
              De naam 'Casa Mi Sueño' - Huis van mijn Dromen - weerspiegelt precies wat we willen delen: 
              een droomlocatie waar het mediterrane leven op zijn best ervaren kan worden.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Personal Touch Section -->
    <section class="section bg-sand">
      <div class="container">
        <h2 class="text-center font-playfair q-mb-xl">Onze persoonlijke touch</h2>
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4" v-for="touch in personalTouches" :key="touch.title">
            <div class="personal-touch-card q-pa-lg text-center">
              <q-icon :name="touch.icon" size="48px" class="text-terracotta q-mb-md" />
              <h3 class="font-playfair q-mb-md">{{ touch.title }}</h3>
              <p class="text-grey-8">{{ touch.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Local Life Section -->
    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg">Het lokale leven</h2>
            <p class="text-body1 q-mb-lg">
              L'Alfàs del Pi is een bijzondere mix van authentiek Spaans leven en internationale gezelligheid. 
              In de loop der jaren hebben we de mooiste plekjes ontdekt - van verborgen stranden tot de beste 
              tapasbarretjes waar alleen locals komen.
            </p>
            <p class="text-body1 q-mb-lg">
              Al deze ontdekkingen delen we graag met onze gasten. In het huis vindt u onze persoonlijke reisgids 
              met favoriete restaurants, mooiste wandelroutes en tips voor dagtrips die u niet in reguliere 
              reisgidsen tegenkomt.
            </p>
          </div>
          <div class="col-12 col-md-6">
            <div class="cms-img-container" style="height: 400px;">
              <q-img
                src="/images/omgeving/Albir_boulevard.jpg"
                class="cms-img rounded-borders"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Ervaar het zelf</h2>
        <p class="text-h6 text-grey-8 q-mx-auto q-mb-xl" style="max-width: 800px;">
          We nodigen u uit om Casa Mi Sueño te ontdekken en uw eigen Spaanse verhaal te schrijven.
        </p>
        <q-btn
          class="cms-btn cms-btn-primary q-px-xl q-py-sm text-subtitle1"
          to="/het-huis"
          label="Bekijk de villa"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
const personalTouches = [
  {
    icon: 'home',
    title: 'Huiselijke sfeer',
    description: 'Elk detail is met zorg gekozen om een warme, uitnodigende sfeer te creëren'
  },
  {
    icon: 'auto_stories',
    title: 'Lokale tips',
    description: 'Onze persoonlijke reisgids met insider tips en favoriete plekken in de omgeving'
  },
  {
    icon: 'support_agent',
    title: 'Persoonlijke service',
    description: 'Altijd bereikbaar voor vragen en tips om uw verblijf nog aangenamer te maken'
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

.personal-touch-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.3s ease;
}

.personal-touch-card:hover {
  transform: translateY(-4px);
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.cms-img {
  transition: transform 0.3s ease;
}

.cms-img:hover {
  transform: scale(1.02);
}
</style> 