<template>
  <q-layout view="lHh Lpr lff">
    <!-- Skip to Content Link -->
    <a 
      href="#main-content" 
      class="skip-to-content"
      @click.prevent="scrollToContent"
    >
      Spring naar inhoud
    </a>

    <!-- Header -->
    <q-header class="bg-white text-dark" :elevated="isScrolled">
      <q-toolbar class="container q-py-md">
        <!-- Logo -->
        <router-link 
          to="/" 
          class="text-inherit no-decoration logo-link"
          aria-label="Casa Mi Sueño - Ga naar homepage"
        >
          <div class="logo-container">
            <h1 class="font-playfair text-h4 q-my-none">Casa Mi Sueño</h1>
            <div class="logo-decoration" aria-hidden="true"></div>
          </div>
        </router-link>

        <q-space />

        <!-- Desktop Navigation -->
        <nav class="gt-sm row items-center no-wrap" aria-label="Hoofdnavigatie">
          <q-tabs
            v-model="currentRoute"
            inline-label
            shrink
            stretch
            no-caps
            active-color="primary"
            indicator-color="primary"
            class="q-mr-md"
            role="navigation"
          >
            <q-route-tab
              v-for="item in navigationItems"
              :key="item.label"
              :to="item.route"
              :label="item.label"
              :name="item.route"
              :aria-label="item.label"
            />
          </q-tabs>
          <q-btn
            unelevated
            color="primary"
            :to="{ name: 'booking', replace: true }"
            label="Reserveren"
            class="cms-btn cms-btn-primary q-ma-none"
            aria-label="Ga naar reserveringspagina"
          />
        </nav>

        <!-- Mobile Menu Button -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu openen"
          class="lt-md"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <!-- Mobile Navigation Drawer -->
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      :width="280"
      :breakpoint="1024"
      class="bg-white"
      aria-label="Mobiel menu"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header class="text-primary">Menu</q-item-label>

        <q-item
          v-for="item in navigationItems"
          :key="item.label"
          :to="item.route"
          clickable
          v-ripple
        >
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>

          <q-separator spaced />

          <q-item :to="{ name: 'booking', replace: true }" clickable v-ripple>
            <q-item-section>
              <q-btn
                unelevated
                color="primary"
                label="Reserveren"
                class="cms-btn cms-btn-primary full-width"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <main id="main-content">
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </q-page-container>

    <WhatsAppWidget />

    <!-- Footer -->
    <q-footer class="bg-sand text-dark">
      <div class="container q-py-xl">
        <div class="row q-col-gutter-xl">
          <!-- Contact Info -->
          <div class="col-12 col-md-4 text-center text-md-left">
            <h4 class="font-playfair q-mb-md">Contact</h4>
            <q-list dense>
              <q-item>
                <q-item-section class="text-center text-md-left">
                  <q-item-label>Carrer de les Petúnies 16</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-center text-md-left">
                  <q-item-label>03580 L'Alfàs del Pi, Alicante, Spain</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable tag="a" href="tel:+31683645489">
                <q-item-section class="text-center text-md-left">
                  <q-item-label>06 - 8364 5489 (Netherlands)</q-item-label>
                </q-item-section>
              </q-item>
              <q-item 
                clickable 
                tag="a" 
                :href="WHATSAPP_CONFIG.getWhatsAppUrl($q.platform.is.mobile)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <q-item-section class="text-center text-md-left">
                  <q-item-label>
                    <q-icon name="fab fa-whatsapp" size="18px" class="q-mr-sm" />
                    WhatsApp
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- Quick Links -->
          <div class="col-12 col-md-4 text-center text-md-left">
            <h4 class="font-playfair q-mb-md">Menu</h4>
            <q-list dense>
              <q-item
                v-for="item in footerLinks"
                :key="item.label"
                :to="item.route"
                clickable
              >
                <q-item-section class="text-center text-md-left">
                  <q-item-label>{{ item.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- Social Media -->
          <div class="col-12 col-md-4 text-center">
            <h4 class="font-playfair q-mb-md">Volg Ons</h4>
            <div class="row justify-center justify-md-start q-gutter-sm">
              <q-btn
                v-for="social in socialLinks"
                :key="social.icon"
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                round
                flat
                :icon="social.icon"
                color="dark"
              />
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="row justify-center q-mt-xl">
          <div class="col-12 text-center text-caption">
              © {{ new Date().getFullYear() }} Casa Mi Sueño. Alle rechten voorbehouden.
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import WhatsAppWidget from '../components/WhatsAppWidget.vue';
import { WHATSAPP_CONFIG } from '../utils/whatsapp';
import { setupVacationRentalSchema } from 'src/utils/schema';

const route = useRoute();
const $q = useQuasar();
const rightDrawerOpen = ref(false);
const isScrolled = ref(false);

const currentRoute = ref(route.path);

watch(() => route.path, (newPath) => {
  currentRoute.value = newPath;
});

// Navigation Items
const navigationItems = [
  { label: 'Over Ons', route: '/over-ons' },
  { label: 'Het Huis', route: '/het-huis' },
  { label: 'Buiten Leven', route: '/buiten-leven' },
  { label: 'Omgeving', route: '/omgeving' },
  { label: 'Foto\'s', route: '/fotos' },
  { label: 'Praktisch', route: '/praktisch' },
  { label: 'Contact', route: '/contact' }
];

// Footer Links
const footerLinks = [
  { label: 'Privacy', route: '/privacy' },
  { label: 'Voorwaarden', route: '/voorwaarden' },
  { label: 'Contact', route: '/contact' },
  { label: 'Sitemap', route: '/sitemap' }
];

// Social Media Links
const socialLinks = [
  { icon: 'fab fa-instagram', link: 'https://instagram.com/' }
];

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
  
  // Initialize structured data
  setupVacationRentalSchema();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Add scroll to content function
const scrollToContent = () => {
  const mainContent = document.getElementById('main-content');
  mainContent?.focus();
  mainContent?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style lang="scss">
.q-header {
  transition: box-shadow 0.3s ease;

  .q-toolbar {
    min-height: 80px;
}

  .logo-link {
    min-width: fit-content;
  white-space: nowrap;
    margin-right: 2rem;
}

  .q-tabs {
    min-width: 0; /* Allow tabs to shrink if needed */
}

  .q-tab {
    &__label {
  font-weight: 500;
      font-size: 1rem;
    }
  }
}

.q-drawer {
  .q-item {
    border-radius: 8px;
    margin: 4px 0;

    &--active {
      background: rgba(209, 122, 82, 0.1);
      color: var(--q-primary);
}

    &__label {
      font-size: 1rem;
  }
}
}

.q-footer {
  .q-item {
    min-height: 32px;
    padding: 4px 0;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--q-primary);
    }
  }
}

.logo-container {
  position: relative;
  display: inline-block;
  padding-bottom: 8px; /* Space for the decoration */
}

.logo-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60%;
  height: 3px;
  background-color: var(--cms-light-terracotta);
  border-radius: 2px;
}

.logo-link {
  &:hover {
    text-decoration: none;
  }
}

@media (max-width: 768px) {
  .q-footer {
    .q-item {
      min-height: 32px;
      padding: 4px 0;
      justify-content: center;
    }
    
    .q-list {
      padding: 0;
    }
    
    h4 {
      font-size: 1.25rem;
    }
  }
}

.skip-to-content {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -999;
  background-color: var(--cms-deep-terracotta);
  color: white;
  padding: 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
}

.skip-to-content:focus {
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: auto;
  height: auto;
  z-index: 9999;
}

// Enhance focus styles
:focus-visible {
  outline: 3px solid var(--q-primary);
  outline-offset: 2px;
}

// Remove focus ring from elements that don't need it
.q-tab:focus {
  outline: none;
}

.q-tab:focus-visible {
  outline: 3px solid var(--q-primary);
  outline-offset: -3px;
}
</style> 