<template>
  <q-page>
    <HeroSection
      image="/images/Tuin_mediterraans.jpg"
      alt-text="De mediterrane tuin van Casa Mi Sueño"
      title="Sitemap"
      subtitle="Overzicht van alle pagina's"
    />

    <section class="section bg-white">
      <div class="container">
        <div class="text-body2">
          <h2 class="text-h5 font-playfair q-mb-lg">Pagina's</h2>
          <ul class="sitemap-list q-mb-xl">
            <li>
              <router-link to="/">Home</router-link>
              <p class="text-grey-8">Welkom bij Casa Mi Sueño</p>
            </li>
            <li>
              <router-link to="/huis">Het huis</router-link>
              <p class="text-grey-8">Ontdek de ruimtes en faciliteiten</p>
            </li>
            <li>
              <router-link to="/buiten">Buiten</router-link>
              <p class="text-grey-8">De tuin, zwembad en buitenruimtes</p>
            </li>
            <li>
              <router-link to="/omgeving">Omgeving</router-link>
              <p class="text-grey-8">Ontdek de Costa Blanca</p>
            </li>
            <li>
              <router-link to="/fotos">Foto's</router-link>
              <p class="text-grey-8">Fotogalerij van het huis en de omgeving</p>
            </li>
            <li>
              <router-link to="/praktisch">Praktische info</router-link>
              <p class="text-grey-8">Alles wat je moet weten voor je verblijf</p>
            </li>
            <li>
              <router-link to="/boeken">Boeken</router-link>
              <p class="text-grey-8">Beschikbaarheid en tarieven</p>
            </li>
            <li>
              <router-link to="/contact">Contact</router-link>
              <p class="text-grey-8">Neem contact met ons op</p>
            </li>
          </ul>

          <h2 class="text-h5 font-playfair q-mb-lg">Juridisch</h2>
          <ul class="sitemap-list">
            <li>
              <router-link to="/privacy">Privacyverklaring</router-link>
              <p class="text-grey-8">Hoe wij omgaan met jouw gegevens</p>
            </li>
            <li>
              <router-link to="/voorwaarden">Algemene voorwaarden</router-link>
              <p class="text-grey-8">Onze voorwaarden voor een zorgeloos verblijf</p>
            </li>
          </ul>
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

.sitemap-list {
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 1.5rem;

    a {
      color: var(--q-primary);
      text-decoration: none;
      font-weight: 500;
      font-size: 1.1rem;

      &:hover {
        text-decoration: underline;
      }
    }

    p {
      margin: 0.25rem 0 0 0;
    }
  }
}
</style> 