<template>
  <div class="photo-gallery section">
    <div class="container">
      <!-- Gallery Navigation -->
      <div class="q-mb-xl">
        <q-tabs
          v-model="activeTab"
          class="text-cms-deep-terracotta"
          active-color="cms-deep-terracotta"
          indicator-color="cms-deep-terracotta"
          align="center"
          narrow-indicator
          dense
        >
          <q-tab name="all" label="Alles" />
          <q-tab name="interior" label="Interieur" />
          <q-tab name="exterior" label="Exterieur" />
          <q-tab name="bedrooms" label="Slaapkamers" />
          <q-tab name="bathrooms" label="Badkamers" />
        </q-tabs>
      </div>

      <!-- Gallery Grid -->
      <q-tab-panels
        v-model="activeTab"
        animated
        transition-prev="fade"
        transition-next="fade"
      >
        <q-tab-panel name="all" class="q-pa-none">
          <div class="cms-grid cms-grid-3">
            <div
              v-for="(photo, index) in allPhotos"
              :key="index"
              class="cms-card cursor-pointer"
              @click="openLightbox(allPhotos, index)"
            >
              <div class="cms-img-container" style="height: 300px;">
                <q-img
                  :src="photo.src"
                  class="cms-img"
                >
                  <div class="absolute-bottom text-center bg-black" style="background: rgba(0,0,0,0.6)">
                    <p class="text-subtitle1 text-white q-mb-none">{{ photo.caption }}</p>
                  </div>
                </q-img>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="interior" class="q-pa-none">
          <div class="row q-col-gutter-md">
            <div
              v-for="(photo, index) in interiorPhotos"
              :key="index"
              class="col-12 col-sm-6 col-md-4 q-mb-md"
            >
              <q-card class="cursor-pointer" @click="openLightbox(interiorPhotos, index)">
                <q-img
                  :src="photo.src"
                  :ratio="4/3"
                  spinner-color="cms-deep-terracotta"
                  spinner-size="82px"
                  class="rounded-borders"
                  img-class="lightbox-trigger"
                >
                  <template v-slot:loading>
                    <q-spinner-dots color="cms-deep-terracotta" />
                  </template>
                  <div class="absolute-bottom text-subtitle1 text-center" style="background: rgba(0,0,0,0.7); padding: 8px">
                    <span class="text-white">{{ photo.caption }}</span>
                  </div>
                </q-img>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="exterior" class="q-pa-none">
          <div class="cms-grid cms-grid-3">
            <div
              v-for="(photo, index) in exteriorPhotos"
              :key="index"
              class="cms-card cursor-pointer"
              @click="openLightbox(exteriorPhotos, index)"
            >
              <div class="cms-img-container" style="height: 300px;">
                <q-img
                  :src="photo.src"
                  class="cms-img"
                >
                  <div class="absolute-bottom text-center bg-black" style="background: rgba(0,0,0,0.6)">
                    <p class="text-subtitle1 text-white q-mb-none">{{ photo.caption }}</p>
                  </div>
                </q-img>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="bedrooms" class="q-pa-none">
          <div class="cms-grid cms-grid-3">
            <div
              v-for="(photo, index) in bedroomPhotos"
              :key="index"
              class="cms-card cursor-pointer"
              @click="openLightbox(bedroomPhotos, index)"
            >
              <div class="cms-img-container" style="height: 300px;">
                <q-img
                  :src="photo.src"
                  class="cms-img"
                >
                  <div class="absolute-bottom text-center bg-black" style="background: rgba(0,0,0,0.6)">
                    <p class="text-subtitle1 text-white q-mb-none">{{ photo.caption }}</p>
                  </div>
                </q-img>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="bathrooms" class="q-pa-none">
          <div class="cms-grid cms-grid-3">
            <div
              v-for="(photo, index) in bathroomPhotos"
              :key="index"
              class="cms-card cursor-pointer"
              @click="openLightbox(bathroomPhotos, index)"
            >
              <div class="cms-img-container" style="height: 300px;">
                <q-img
                  :src="photo.src"
                  class="cms-img"
                >
                  <div class="absolute-bottom text-center bg-black" style="background: rgba(0,0,0,0.6)">
                    <p class="text-subtitle1 text-white q-mb-none">{{ photo.caption }}</p>
                  </div>
                </q-img>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>

      <!-- Lightbox -->
      <q-dialog
        v-model="lightboxOpen"
        full-width
        full-height
        maximized
        transition-show="fade"
        transition-hide="fade"
      >
        <q-card class="bg-black full-height">
          <!-- Close Button -->
          <q-btn
            round
            flat
            color="white"
            icon="close"
            class="absolute-top-right q-ma-md z-top"
            v-close-popup
          />

          <!-- Carousel -->
          <q-carousel
            v-model="lightboxSlide"
            animated
            arrows
            navigation
            infinite
            :autoplay="carouselAutoplay"
            height="100vh"
            class="bg-black"
            control-color="white"
            navigation-icon="circle"
            padding
            @mouseenter="carouselAutoplay = false"
          >
            <q-carousel-slide
              v-for="(photo, index) in currentPhotoSet"
              :key="index"
              :name="index"
              class="column no-wrap flex-center"
            >
              <q-img
                :src="photo.src"
                spinner-color="white"
                style="max-height: 90vh; max-width: 90vw;"
                fit="contain"
              >
                <template v-slot:loading>
                  <q-spinner-dots color="white" />
                </template>
                <div class="absolute-bottom text-center q-pa-sm" style="background: rgba(0,0,0,0.7)">
                  <div class="text-h6 text-white">{{ photo.caption }}</div>
                </div>
              </q-img>
            </q-carousel-slide>
          </q-carousel>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Photo {
  src: string;
  caption: string;
}

const activeTab = ref('all');
const lightboxOpen = ref(false);
const lightboxSlide = ref(0);
const currentPhotoSet = ref<Photo[]>([]);
const carouselAutoplay = ref(false);

const interiorPhotos = [
  { src: '/images/Woonkamer_tafel_stoelen.jpg', caption: 'Ruime woonkamer met eethoek' },
  { src: '/images/Woonkamer_zithoek.jpg', caption: 'Comfortabele zithoek' }
];

const bedroomPhotos = [
  { src: '/images/Slaapkamer1_vooraanzicht.jpg', caption: 'Hoofdslaapkamer' },
  { src: '/images/Slaapkamer1_bed.jpg', caption: 'Comfortabel tweepersoonsbed' },
  { src: '/images/Slaapkamer1_zijaanzicht.jpg', caption: 'Zijkant hoofdslaapkamer' },
  { src: '/images/Slaapkamer2.jpg', caption: 'Tweede slaapkamer' },
  { src: '/images/Slaapkamer2_bed.jpg', caption: 'Tweepersoonsbed tweede slaapkamer' },
  { src: '/images/Slaapkamer2_kussens.jpg', caption: 'Sfeervolle inrichting' }
];

const bathroomPhotos = [
  { src: '/images/Badkamer.jpg', caption: 'Moderne badkamer met douche' },
  { src: '/images/Badkamer2.jpg', caption: 'Tweede badkamer' }
];

const exteriorPhotos = [
  { src: '/images/Zwembadkant_volledig.jpg', caption: 'Volledig zicht op het zwembad' },
  { src: '/images/Tuin_zwembad.jpg', caption: 'Verwarmd zwembad' },
  { src: '/images/Tuin_zwembad-douche.jpg', caption: 'Zwembad met buitendouche' },
  { src: '/images/Tuin_mediterraans.jpg', caption: 'Mediterrane tuin' },
  { src: '/images/Tuin_planten.jpg', caption: 'Weelderige mediterrane beplanting' },
  { src: '/images/Tuin_planten2.jpg', caption: 'Kleurrijke tuinbeplanting' },
  { src: '/images/Tuin_veranda.jpg', caption: 'Overdekte veranda' },
  { src: '/images/Veranda2.jpg', caption: 'Loungeset op de veranda' },
  { src: '/images/Tuin_eetgedeelte.jpg', caption: 'Overdekt eetgedeelte in de tuin' },
  { src: '/images/Tuin_vanaf_veranda.jpg', caption: 'Uitzicht vanaf de veranda' },
  { src: '/images/Tuin_zithoek.jpg', caption: 'Gezellige buitenzithoek' },
  { src: '/images/Tuintafel_zitgedeelte.jpg', caption: 'Extra zitgedeelte in de tuin' },
  { src: '/images/Tuin_bbq.jpg', caption: 'BBQ-hoek' },
  { src: '/images/Tuin_zijpad.jpg', caption: 'Zijpad met mediterrane planten' },
  { src: '/images/Tuinpad.jpg', caption: 'Sfeervol verlicht tuinpad' }
];

const allPhotos = computed(() => [
  ...interiorPhotos,
  ...bedroomPhotos,
  ...bathroomPhotos,
  ...exteriorPhotos
]);

const openLightbox = (photoSet: any[], index: number) => {
  currentPhotoSet.value = photoSet;
  lightboxSlide.value = index;
  lightboxOpen.value = true;
};
</script>

<style scoped>
.photo-gallery {
  background-color: var(--cms-off-white);
}

/* Fade Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .cms-img-container {
    height: 250px !important;
  }
}
</style>

<style lang="scss">
.lightbox-trigger {
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
}

.q-carousel {
  &__slide {
    padding: 0;
  }
  
  &__navigation {
    .q-btn {
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
}

.q-dialog__inner {
  &--maximized {
    > div {
      border-radius: 0;
    }
  }
}
</style> 