<template>
  <router-view />
  <CookieConsent />
</template>

<script setup lang="ts">
import CookieConsent from './components/CookieConsent.vue';
</script>

<style>
@import './styles/global.css';
/* All layout styles are handled by Quasar's layout component and app.css */
</style> 