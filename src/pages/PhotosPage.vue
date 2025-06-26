<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_mediterraans.jpg"
      alt-text="Mediterrane tuin van het vakantiehuis"
      title="Foto impressie"
      subtitle="Een rondleiding door Casa Mi Sueño"
    />

    <!-- Introduction -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Bekijk het huis</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Krijg een goed beeld van Casa Mi Sueño door onze foto's. Van de comfortabele 
          woonruimtes tot de zonnige tuin met zwembad - zie wat je vakantie tot een 
          bijzondere ervaring maakt.
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