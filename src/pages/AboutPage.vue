<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_vanaf_veranda.jpg"
      alt-text="Uitzicht op de tuin vanaf de veranda"
      title="Over ons"
      subtitle="Welkom in ons Spaanse thuis aan de Costa Blanca"
    />

    <!-- Our Story Section -->
    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg">Een droom die werkelijkheid werd</h2>
            <p class="text-body1 q-mb-lg">
              We waren direct enthousiast toen we dit huis voor het eerst zagen. De mediterrane tuin 
              en de ruime veranda waren precies wat we zochten. Later hebben we zelf het zwembad 
              laten aanleggen om er een complete vakantie-ervaring van te maken. Een fijne plek om 
              te ontspannen en tijd door te brengen met familie en vrienden.
            </p>
            <p class="text-body1 q-mb-xl">
              We hebben Casa Mi Sueño zo ingericht dat het alle comfort biedt die je tijdens je vakantie 
              nodig hebt. Van een goed uitgeruste keuken tot comfortabele ligbedden bij het zwembad. 
              Het is een plek waar je je snel thuis voelt.
            </p>
            <div class="text-center hide-on-mobile">
              <q-btn
                class="cms-btn cms-btn-primary"
                to="/het-huis"
                label="Bekijk het vakantiehuis"
              />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="cms-img-container" style="height: 400px;">
              <q-img
                src="/images/Tuin_vanaf_veranda.jpg"
                class="cms-img rounded-borders"
              />
            </div>
          </div>
          <div class="col-12 show-on-mobile q-mt-md">
            <div class="text-center">
              <q-btn
                class="cms-btn cms-btn-primary"
                to="/het-huis"
                label="Bekijk het vakantiehuis"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section class="section bg-sand">
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
            <h2 class="font-playfair q-mb-lg">Een plek met karakter</h2>
            <p class="text-body1 q-mb-lg">
              Casa Mi Sueño is geen standaard vakantiehuis. Je vindt hier een persoonlijke inrichting 
              met een goed uitgeruste keuken, een gezellige woonkamer en comfortabele slaapkamers. Het 
              is een huis waar je echt kunt ontspannen en genieten van het Spaanse leven.
            </p>
            <p class="text-body1 q-mb-lg">
              We hebben het huis Casa Mi Sueño genoemd omdat het voor ons de perfecte plek is geworden: 
              een fijn vakantiehuis onder de Spaanse zon dat we graag delen met onze gasten.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Personal Touch Section -->
    <section class="section bg-white">
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
    <section class="section bg-sand">
      <div class="container">
        <div class="row q-col-gutter-xl items-center">
          <div class="col-12 col-md-6">
            <h2 class="font-playfair q-mb-lg text-center">Het echte Spaanse leven</h2>
            <p class="text-body1 q-mb-lg">
              L'Alfàs del Pi heeft ons hart gestolen met zijn unieke karakter. Het is een plek waar het authentieke 
              Spaanse dorpsleven hand in hand gaat met internationale invloeden. Op de lokale markt ruik je verse 
              kruiden en fruit, terwijl je in de gezellige bars zowel Spaanse families als internationale bewoners 
              tegenkomt.
            </p>
            <p class="text-body1 q-mb-lg">
              Door de jaren heen hebben we alle verborgen parels van de omgeving ontdekt. Van de beste paella bij 
              het strand tot pittoreske bergdorpjes en prachtige wandelroutes. We delen graag onze favoriete plekken 
              en lokale tips met onze gasten, zodat je de Costa Blanca kunt ervaren zoals wij die hebben leren kennen: 
              authentiek, veelzijdig en verrassend.
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
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Schrijf je eigen verhaal</h2>
        <p class="text-h6 text-grey-8 q-mx-auto q-mb-xl" style="max-width: 800px;">
          We nodigen je uit om Casa Mi Sueño te ontdekken en je eigen mediterrane avontuur te beginnen. 
          Laat je verrassen door de charme van ons tweede thuis en de schoonheid van de Costa Blanca.
        </p>
        <q-btn
          class="cms-btn cms-btn-cta"
          to="/het-huis"
          label="Bekijk het vakantiehuis"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import HeroSection from 'src/components/HeroSection.vue';

const personalTouches = [
  {
    icon: 'home',
    title: 'Een echt thuis',
    description: 'Geen standaard vakantiehuis, maar een warm en persoonlijk thuis met karakter waar je je direct welkom voelt'
  },
  {
    icon: 'travel_explore',
    title: 'Lokale ervaring',
    description: 'We delen onze insider tips over verborgen stranden, authentieke restaurants en de mooiste plekjes in de omgeving'
  },
  {
    icon: 'support_agent',
    title: 'Persoonlijke aandacht',
    description: 'Van een warm welkom tot tips tijdens je verblijf - we zorgen ervoor dat je niets tekort komt'
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

@media (min-width: 1024px) {
  .show-on-mobile {
    display: none;
  }
}

@media (max-width: 1023px) {
  .hide-on-mobile {
    display: none;
  }
}
</style> 