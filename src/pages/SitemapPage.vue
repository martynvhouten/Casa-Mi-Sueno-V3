<template>
  <q-page class="q-py-lg">
    <div class="container">
      <h1 class="text-center font-playfair q-mb-xl">Sitemap</h1>
      <div class="row justify-center q-col-gutter-xl">
        <!-- Main Navigation -->
        <div class="col-12 col-md-4">
          <div class="sitemap-section">
            <h2 class="font-playfair q-mb-lg text-primary">Hoofdnavigatie</h2>
            <q-list padding class="rounded-borders">
              <q-item clickable v-ripple to="/" exact>
                <q-item-section>Home</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/over-ons">
                <q-item-section>Over Ons</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/het-huis">
                <q-item-section>Het Huis</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/buiten-leven">
                <q-item-section>Buiten</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/omgeving">
                <q-item-section>Locatie</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/fotos">
                <q-item-section>Foto's</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>

        <!-- Additional Pages -->
        <div class="col-12 col-md-4">
          <div class="sitemap-section">
            <h2 class="font-playfair q-mb-lg text-primary">Praktische Informatie</h2>
            <q-list padding class="rounded-borders">
              <q-item clickable v-ripple to="/praktisch">
                <q-item-section>Praktische Info</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/reserveren">
                <q-item-section>Reserveren</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/contact">
                <q-item-section>Contact</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>

        <!-- Legal Pages -->
        <div class="col-12 col-md-4">
          <div class="sitemap-section">
            <h2 class="font-playfair q-mb-lg text-primary">Juridische Informatie</h2>
            <q-list padding class="rounded-borders">
              <q-item clickable v-ripple to="/voorwaarden">
                <q-item-section>Algemene Voorwaarden</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/privacy">
                <q-item-section>Privacyverklaring</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// No additional setup needed for this component
</script>

<style scoped>
.sitemap-section {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: 100%;
}

.q-item {
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.q-item:hover {
  background: rgba(209, 122, 82, 0.1);
}
</style> 