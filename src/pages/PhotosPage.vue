<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_mediterraans.jpg"
      alt-text="Mediterrane tuin van het vakantiehuis"
      title="Ons verhaal in beeld"
      subtitle="Elke foto vertelt een verhaal van puur geluk"
    />

    <!-- Introduction -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Zie je het al voor je?</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Elke foto hier vertelt een stukje van ons verhaal. De ochtendkoffie op de veranda, 
          het eerste duikje in het zwembad, de lange avonden onder de sterren. Dit zijn niet 
          zomaar plaatjes - dit zijn momenten van puur geluk die we graag met jou willen delen.
        </p>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="section bg-sand">
      <div class="container">
        <PhotoGallery />
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Plan je verblijf</h2>
        <p class="text-h6 text-grey-8 q-mx-auto q-mb-xl" style="max-width: 800px;">
          Wil je ook genieten van deze prachtige plek? Neem contact met ons op voor 
          beschikbaarheid en prijzen.
        </p>
        <q-btn
          class="cms-btn cms-btn-primary q-px-xl q-py-sm text-subtitle1"
          to="/contact"
          label="Neem contact op"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import PhotoGallery from '../components/PhotoGallery.vue';
import HeroSection from 'src/components/HeroSection.vue';
</script> 