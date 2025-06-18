<template>
  <q-dialog
    v-model="showConsent"
    persistent
    position="bottom"
    seamless
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="cookie-consent bg-white">
      <q-card-section>
        <div class="row items-center q-mb-md">
          <div class="col">
            <div class="text-h6">Cookie Voorkeuren</div>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              round
              icon="close"
              @click="acceptAll"
            />
          </div>
        </div>
        <p class="text-body1 q-mb-lg">
          Wij gebruiken cookies om je ervaring op onze website te verbeteren. 
          Sommige cookies zijn essentieel voor het functioneren van de site, 
          terwijl andere ons helpen de site te verbeteren.
        </p>
        
        <div class="q-gutter-y-md">
          <!-- Essential Cookies -->
          <q-item tag="label" class="rounded-borders">
            <q-item-section>
              <q-item-label>Essentiële Cookies</q-item-label>
              <q-item-label caption>
                Noodzakelijk voor het functioneren van de website. Deze kunnen niet worden uitgeschakeld.
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
              <q-item-label>Analytics Cookies</q-item-label>
              <q-item-label caption>
                Helpen ons te begrijpen hoe bezoekers onze website gebruiken.
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

      <q-card-actions align="right" class="bg-white q-pa-md">
        <q-btn
          flat
          label="Voorkeuren Opslaan"
          color="primary"
          @click="savePreferences"
          class="q-px-md"
        />
        <q-btn
          unelevated
          label="Alles Accepteren"
          color="primary"
          @click="acceptAll"
          class="q-px-md q-ml-sm"
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
    message: 'Uw cookie voorkeuren zijn opgeslagen',
    position: 'top',
    timeout: 2000
  });

  if (analyticsCookies.value) {
    // Initialize analytics here if needed
    console.log('Analytics cookies accepted');
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
  border-radius: 12px 12px 0 0;

  .q-item {
    border: 1px solid #e5e7eb;
    padding: 16px;

    &:hover {
      background: #f9fafb;
    }
  }

  @media (max-width: 599px) {
    max-width: none;
    margin: 0;
  }
}
</style> 