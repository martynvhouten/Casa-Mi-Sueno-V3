<template>
  <div class="surroundings-gallery">
    <div class="q-pa-md">
      <q-tabs
        v-model="activeTab"
        class="text-primary"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="all" label="Alles" />
        <q-tab name="beaches" label="Stranden" />
        <q-tab name="nature" label="Natuur" />
        <q-tab name="attractions" label="Bezienswaardigheden" />
      </q-tabs>

      <q-separator class="q-my-md" />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel v-for="tab in ['all', 'beaches', 'nature', 'attractions']" :key="tab" :name="tab" class="q-pa-none">
          <div class="row q-col-gutter-md">
            <div
              v-for="(photo, index) in getPhotosByTab(tab)"
              :key="index"
              class="col-12 col-sm-6 col-md-4 q-mb-md"
            >
              <q-card class="cursor-pointer" @click="openLightbox(getPhotosByTab(tab), index)">
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
  category?: string;
}

const activeTab = ref('all');
const lightboxOpen = ref(false);
const lightboxSlide = ref(0);
const currentPhotoSet = ref<Photo[]>([]);
const carouselAutoplay = ref(false);

// Photo data
const beachPhotos = [
  { src: '/images/Omgeving/Albir_boulevard.jpg', caption: 'Boulevard van Albir' },
  { src: '/images/Omgeving/Alicante_promenade.jpg', caption: 'Promenade van Alicante' },
  { src: '/images/Omgeving/Alicante_sunrise.jpg', caption: 'Zonsopgang in Alicante' }
];

const naturePhotos = [
  { src: '/images/Omgeving/Guadalest_mountain_view.jpg', caption: 'Bergzicht bij Guadalest' },
  { src: '/images/Omgeving/Guadalest_castle.jpg', caption: 'Kasteel van Guadalest' },
  { src: '/images/Omgeving/Fuentes_del_algar.jpg', caption: 'Watervallen van Algar' },
  { src: '/images/Omgeving/Albir_lighthouse.jpg', caption: 'Vuurtoren van Albir' }
];

const attractionPhotos = [
  { src: '/images/Omgeving/Casco_antiguo.jpg', caption: 'Historisch centrum' },
  { src: '/images/Omgeving/Casco_antiguo2.jpg', caption: 'Oude stad' },
  { src: '/images/Omgeving/Albir_panorama.jpg', caption: 'Panorama van Albir' }
];

const allSurroundingPhotos = computed(() => [
  ...beachPhotos,
  ...naturePhotos,
  ...attractionPhotos
]);

const getPhotosByTab = (tab: string) => {
  switch (tab) {
    case 'beaches':
      return beachPhotos;
    case 'nature':
      return naturePhotos;
    case 'attractions':
      return attractionPhotos;
    default:
      return allSurroundingPhotos.value;
  }
};

const openLightbox = (photoSet: Photo[], index: number) => {
  currentPhotoSet.value = photoSet;
  lightboxSlide.value = index;
  lightboxOpen.value = true;
};
</script>

<style lang="scss">
.surroundings-gallery {
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
}
</style> 