<template>
  <q-page>
    <HeroSection
      image="/images/Tuin_planten2.jpg"
      alt-text="De mediterrane tuin van Casa Mi Sueño"
      title="Pagina niet gevonden"
      subtitle="De pagina die je zoekt bestaat niet"
    />

    <section class="section bg-white">
      <div class="container text-center">
        <div class="text-body2">
          <p class="q-mb-xl">
            De pagina die je probeert te bezoeken bestaat niet of is verplaatst.
            Gebruik het menu om naar een andere pagina te navigeren of ga terug naar de homepagina.
          </p>
          <q-btn
            to="/"
            color="primary"
            label="Terug naar home"
            class="q-px-xl"
            unelevated
          />
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
</style> 