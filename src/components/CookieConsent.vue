<template>
  <q-dialog
    v-model="showConsent"
    persistent
    seamless
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="cookie-consent bg-white">
      <q-card-section>
        <div class="row items-center q-mb-sm">
          <div class="col">
            <div class="text-h6 text-weight-bold text-primary">Cookie instellingen</div>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              round
              icon="close"
              @click="acceptAll"
              color="grey-7"
            />
          </div>
        </div>
        <p class="text-body1 q-mb-md text-grey-8">
          Om je de best mogelijke ervaring te bieden, maken wij gebruik van cookies. 
          Deze helpen ons om de website te laten functioneren, de veiligheid te waarborgen 
          en onze diensten te verbeteren. Je kunt hieronder je voorkeuren aanpassen.
        </p>
        
        <div class="q-gutter-y-sm">
          <!-- Essential Cookies -->
          <q-item tag="label" class="rounded-borders">
            <q-item-section>
              <q-item-label class="text-weight-medium">Essentiële Cookies</q-item-label>
              <q-item-label caption class="text-grey-7">
                Deze cookies zijn noodzakelijk voor het functioneren van de website en kunnen niet worden uitgeschakeld.
                Ze worden alleen gebruikt om basisfuncties mogelijk te maken.
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                v-model="essentialCookies"
                color="primary"
                disable
              />
            </q-item-section>
          </q-item>

          <!-- Analytics Cookies -->
          <q-item tag="label" class="rounded-borders cursor-pointer">
            <q-item-section>
              <q-item-label class="text-weight-medium">Analytics Cookies</q-item-label>
              <q-item-label caption class="text-grey-7">
                Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken, 
                zodat we de gebruikerservaring kunnen verbeteren. Alle gegevens worden anoniem verzameld.
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                v-model="analyticsCookies"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>

      <q-card-actions :class="$q.screen.lt.sm ? 'column q-gutter-y-sm text-center' : 'row q-gutter-sm justify-end'" class="bg-white q-pa-md">
        <q-btn
          outline
          label="Alleen Essentieel"
          color="primary"
          @click="savePreferences"
          class="full-width-btn"
        />
        <q-btn
          unelevated
          label="Alles Accepteren"
          color="primary"
          @click="acceptAll"
          class="full-width-btn"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const showConsent = ref(false);
const essentialCookies = ref(true);
const analyticsCookies = ref(false);

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  timestamp: string;
}

const savePreferences = () => {
  const preferences: CookiePreferences = {
    essential: essentialCookies.value,
    analytics: analyticsCookies.value,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
  showConsent.value = false;
  
  $q.notify({
    type: 'positive',
    message: 'Je cookie voorkeuren zijn opgeslagen',
    position: 'top',
    timeout: 2000
  });

  if (analyticsCookies.value) {
    // Initialize analytics here if needed
  }
};

const acceptAll = () => {
  analyticsCookies.value = true;
  savePreferences();
};

const checkCookieConsent = () => {
  const savedPreferences = localStorage.getItem('cookie_preferences');
  if (!savedPreferences) {
    showConsent.value = true;
    return;
  }

  const preferences = JSON.parse(savedPreferences) as CookiePreferences;
  analyticsCookies.value = preferences.analytics;
  
  // Check if preferences are older than 12 months
  const timestamp = new Date(preferences.timestamp);
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
  
  if (timestamp < twelveMonthsAgo) {
    showConsent.value = true;
  }
};

onMounted(() => {
  checkCookieConsent();
});
</script>

<style lang="scss">
.cookie-consent {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  .q-item {
    border: 1px solid rgba(0, 0, 0, 0.08);
    padding: 12px;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background: #f9fafb;
      border-color: rgba(0, 0, 0, 0.12);
    }
  }

  .q-btn {
    font-weight: 500;
  }

  .full-width-btn {
    @media (max-width: 599px) {
      width: 100%;
    }
    @media (min-width: 600px) {
      min-width: 140px;
    }
  }

  @media (max-width: 599px) {
    max-width: 95%;
    margin: 16px auto;
    
    .q-card-section {
      padding: 16px;
    }
    
    .q-card-actions {
      padding: 16px;
    }
    
    .text-h6 {
      font-size: 1.25rem;
    }
    
    .text-body1 {
      font-size: 0.875rem;
    }
    
    .q-item-label {
      font-size: 0.875rem;
      
      &.caption {
        font-size: 0.75rem;
      }
    }
  }
}
</style> 