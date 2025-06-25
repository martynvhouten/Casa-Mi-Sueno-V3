<template>
  <div class="info-services-section q-py-xl">
    <div class="row q-col-gutter-xl">
      <!-- Important Information -->
      <div class="col-12 col-md-6">
        <div class="feature-card text-center">
          <div class="card-header q-mb-xl">
            <q-icon name="info" color="terracotta" size="36px" class="q-mb-md" />
            <h3 class="text-h5 font-playfair text-primary q-mb-md">Goed om te weten</h3>
            <p class="text-body1 text-grey-8">
              Belangrijke informatie voor een zorgeloos verblijf in Casa Mi Sueño
            </p>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12">
              <div v-for="(info, index) in importantInfo" :key="index" class="feature-item q-mb-lg">
                <q-icon :name="info.icon" color="terracotta" size="24px" class="q-mb-sm" />
                <div class="text-subtitle2 text-weight-medium q-mb-sm">{{ info.title }}</div>
                <p v-if="info.description" class="text-body2 text-grey-8 q-mb-none" v-html="info.description">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- For Who -->
      <div class="col-12 col-md-6">
        <div class="feature-card text-center">
          <div class="card-header q-mb-xl">
            <q-icon name="group" color="terracotta" size="36px" class="q-mb-md" />
            <h3 class="text-h5 font-playfair text-primary q-mb-md">Voor wie is Casa Mi Sueño?</h3>
            <p class="text-body1 text-grey-8">
              Ontdek of ons vakantiehuis past bij jouw wensen
            </p>
          </div>
          
          <div class="perfect-for q-mb-xl">
            <h4 class="text-subtitle1 font-playfair q-mb-lg">Perfect voor:</h4>
            <div class="row q-col-gutter-md">
              <div v-for="(item, index) in perfectFor" :key="index" class="col-12 col-sm-6">
                <div class="perfect-item q-pa-md">
                  <q-icon :name="item.icon" color="terracotta" size="24px" class="q-mb-sm" />
                  <div class="text-body2 text-weight-medium">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="payment-info bg-sand rounded-borders q-pa-xl text-center">
            <q-icon name="security" color="terracotta" size="48px" class="q-mb-lg" />
            <h4 class="text-subtitle1 font-playfair q-mb-lg">Borg & betalingen</h4>
            <div class="payment-items">
              <div class="payment-item q-mb-md">
                <div class="text-body2 text-weight-medium q-mb-sm">Borg</div>
                <div class="text-body2">€500 (teruggestort binnen 5-7 werkdagen na vertrek)</div>
              </div>
              <div class="payment-item q-mb-md">
                <div class="text-body2 text-weight-medium q-mb-sm">Aanbetaling</div>
                <div class="text-body2">30% bij reservering</div>
              </div>
              <div class="payment-item">
                <div class="text-body2 text-weight-medium q-mb-sm">Restbetaling</div>
                <div class="text-body2">8 weken voor aankomst</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const importantInfo = ref([
  {
    icon: 'schedule',
    title: 'Flexibele aankomst- en vertrektijden',
    description: 'Inchecken vanaf 16:00 uur, uitchecken voor 10:00 uur'
  },
  {
    icon: 'date_range',
    title: 'Minimaal verblijf per seizoen',
    description: 'Hoogseizoen (jul-aug): 7 nachten, za-za<br>Middenseizoen (apr-jun, sep): 5 nachten<br>Laagseizoen (okt-mrt): 3 nachten'
  },
  {
    icon: 'pets',
    title: 'Huisdieren welkom',
    description: 'Huisdieren zijn toegestaan in overleg. Laat het ons weten bij je boeking.'
  },
  {
    icon: 'smoke_free',
    title: 'Rookvrij binnen',
    description: 'Roken is alleen buiten toegestaan'
  },
  {
    icon: 'volume_off',
    title: 'Rustige omgeving',
    description: 'Geen feesten of evenementen voor de rust van onze buren'
  }
]);

const perfectFor = ref([
  { icon: 'family_restroom', text: 'Families met kinderen' },
  { icon: 'favorite', text: 'Romantische uitjes' },
  { icon: 'groups', text: 'Kleine vriendengroepen' },
  { icon: 'self_improvement', text: 'Rust- en natuurzoekers' }
]);
</script>

<style lang="scss" scoped>
.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.card-header {
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.feature-item {
  padding: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  text-align: center;

  &:hover {
    background-color: #f8f9fa;
  }
}

.perfect-item {
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: var(--cms-sand);
    transform: translateY(-2px);
  }
}

.payment-items {
  .payment-item {
    padding: 0.5rem 0;
    
    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
  }
}
</style> 