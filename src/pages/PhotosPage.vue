<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section">
      <q-img
        src="/images/Tuin_mediterraans.jpg"
        class="absolute-full"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="animate-fade-in-up text-center text-white">
            <h1 class="text-shadow q-mb-md font-playfair">Fotogalerij</h1>
            <p class="text-h5 text-shadow q-mb-xl font-poppins">
              Ontdek ons tweede thuis in beeld
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction -->
    <section class="section bg-white">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Beleef het Alvast</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Duik in onze fotogalerij en ervaar de sfeer van Casa Mi Sueño. Van de gezellige woonkamer 
          tot het zonnige terras en het verfrissende zwembad - elk beeld vertelt een verhaal van 
          ontspanning en mediterraan leven.
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
</script> 