<template>
  <router-view />
  <CookieConsent />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import CookieConsent from './components/CookieConsent.vue';
import { setMetaTags } from './utils/meta';
import { generateVacationRentalSchema, generateLocalBusinessSchema, injectSchemaMarkup } from './utils/schema';
import { preloadCriticalResources } from './utils/preload';

const route = useRoute();

const getMetaTitle = () => {
  switch (route.path) {
    case '/':
      return 'Casa Mi Sueño - Vakantiehuis in L\'Alfàs del Pi, Spanje';
    case '/over-ons':
      return 'Over Ons - Casa Mi Sueño';
    case '/het-huis':
      return 'Het Huis - Casa Mi Sueño | Comfortabel Vakantiehuis Costa Blanca';
    case '/buiten-leven':
      return 'Buiten Leven - Casa Mi Sueño | Tuin met Zwembad';
    case '/omgeving':
      return 'Omgeving - Casa Mi Sueño | L\'Alfàs del Pi, Costa Blanca';
    case '/fotos':
      return 'Foto\'s - Casa Mi Sueño | Vakantiehuis Spanje';
    case '/praktisch':
      return 'Praktische Informatie - Casa Mi Sueño';
    case '/contact':
      return 'Contact - Casa Mi Sueño | Vakantiehuis Spanje';
    case '/reserveren':
      return 'Reserveren - Casa Mi Sueño | Plan je verblijf';
    case 'about':
      return 'Ontdek het verhaal achter Casa Mi Sueño en waarom we dit stukje Spanje en ons vakantiehuis met je willen delen.';
    case 'practical':
      return 'Alle praktische informatie over je verblijf in Casa Mi Sueño. Van aankomsttijden tot wifi-code en lokale tips.';
    case 'contact':
      return 'Heb je vragen over Casa Mi Sueño? Neem contact met ons op. We helpen je graag bij het plannen van je perfecte vakantie in Spanje.';
    case 'booking':
      return 'Boek direct je verblijf in Casa Mi Sueño. Bekijk de beschikbaarheid en prijzen voor je gewenste periode.';
    default:
      return 'Casa Mi Sueño - Vakantiehuis in L\'Alfàs del Pi';
  }
};

const getMetaDescription = () => {
  switch (route.path) {
    case '/':
      return 'Geniet van een ontspannen vakantie in ons comfortabele vakantiehuis met zwembad in L\'Alfàs del Pi, Costa Blanca. Perfect gelegen tussen bergen en zee.';
    case '/over-ons':
      return 'Maak kennis met de eigenaren van Casa Mi Sueño. Ontdek waarom wij verliefd werden op dit prachtige stukje Spanje en ons vakantiehuis met u willen delen.';
    case '/het-huis':
      return 'Ontdek ons ruime vakantiehuis met 3 slaapkamers, 2 badkamers, volledig uitgeruste keuken en gezellige woonkamer. Perfect voor families en groepen tot 6 personen.';
    case '/buiten-leven':
      return 'Geniet van het buitenleven in onze mediterrane tuin met privé zwembad, verschillende terrassen, buitenkeuken en BBQ. Perfect voor ontspannen dagen in de zon.';
    case '/omgeving':
      return 'Verken de prachtige omgeving van L\'Alfàs del Pi. Ontdek stranden, bergwandelingen, authentieke dorpjes en lokale markten. Alles binnen handbereik.';
    case '/fotos':
      return 'Bekijk foto\'s van ons vakantiehuis Casa Mi Sueño. Krijg een goede indruk van het huis, de tuin, het zwembad en alle faciliteiten.';
    case '/praktisch':
      return 'Alle praktische informatie over uw verblijf in Casa Mi Sueño. Van aankomsttijden tot wifi-code en lokale tips.';
    case '/contact':
      return 'Heeft u vragen over Casa Mi Sueño? Neem contact met ons op. We helpen u graag bij het plannen van uw perfecte vakantie in Spanje.';
    case '/reserveren':
      return 'Boek direct uw verblijf in Casa Mi Sueño. Bekijk de beschikbaarheid en prijzen voor uw gewenste periode.';
    case 'about':
      return 'Ontdek het verhaal achter Casa Mi Sueño en waarom we dit stukje Spanje en ons vakantiehuis met je willen delen.';
    case 'practical':
      return 'Alle praktische informatie over je verblijf in Casa Mi Sueño. Van aankomsttijden tot wifi-code en lokale tips.';
    case 'contact':
      return 'Heb je vragen over Casa Mi Sueño? Neem contact met ons op. We helpen je graag bij het plannen van je perfecte vakantie in Spanje.';
    case 'booking':
      return 'Boek direct je verblijf in Casa Mi Sueño. Bekijk de beschikbaarheid en prijzen voor je gewenste periode.';
    default:
      return 'Ontdek ons comfortabele vakantiehuis in L\'Alfàs del Pi, Costa Blanca. Geniet van zon, zee en bergen in een ontspannen omgeving.';
  }
};

const updateMetaTags = () => {
  const meta = {
    title: getMetaTitle(),
    description: getMetaDescription(),
    url: `https://casamisueno.es${route.path}`
  };
  setMetaTags(meta);
};

// Update meta tags on route change
watch(() => route.path, () => {
  updateMetaTags();
}, { immediate: true });

// Initialize on mount
onMounted(() => {
  // Add schema markup
  injectSchemaMarkup(generateVacationRentalSchema());
  injectSchemaMarkup(generateLocalBusinessSchema());
  
  // Preload critical resources
  preloadCriticalResources();
});
</script>

<style>
@import './styles/global.css';
/* All layout styles are handled by Quasar's layout component and app.css */
</style> 