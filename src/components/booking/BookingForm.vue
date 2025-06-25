<template>
  <div class="booking-form-section" ref="bookingFormRef">
    <div class="booking-form-card">
      <h3 class="text-h4 font-playfair text-primary q-mb-xl text-center">Maak je reservering</h3>
      
      <form @submit.prevent="handleSubmit" class="q-gutter-md">
        <!-- Travel Dates -->
        <div class="form-section q-mb-xl">
          <h4 class="text-h6 font-playfair q-mb-lg">Reisdata</h4>
          <div class="travel-dates bg-sand q-pa-lg rounded-borders" v-if="selectedDates">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <div class="date-display">
                  <q-icon name="flight_takeoff" color="primary" size="24px" class="q-mr-sm" />
                  <div>
                    <div class="text-subtitle2 text-grey-8">Aankomst</div>
                    <div class="text-h6">{{ formatDate(selectedDates[0]) }}</div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="date-display">
                  <q-icon name="flight_land" color="primary" size="24px" class="q-mr-sm" />
                  <div>
                    <div class="text-subtitle2 text-grey-8">Vertrek</div>
                    <div class="text-h6">{{ formatDate(selectedDates[1]) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="travel-dates-placeholder bg-sand q-pa-lg rounded-borders text-center">
            <q-icon name="event" color="grey-6" size="32px" class="q-mb-sm" />
            <div class="text-subtitle1 text-grey-8">Selecteer eerst je aankomst- en vertrekdatum in de kalender</div>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="form-section q-mb-xl">
          <h4 class="text-h6 font-playfair q-mb-lg">Persoonlijke gegevens</h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.firstName"
                label="Voornaam"
                :rules="[val => !!val || 'Voornaam is verplicht']"
                outlined
                dense
                required
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.lastName"
                label="Achternaam"
                :rules="[val => !!val || 'Achternaam is verplicht']"
                outlined
                dense
                required
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.email"
                label="E-mailadres"
                type="email"
                :rules="[
                  val => !!val || 'E-mailadres is verplicht',
                  val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Ongeldig e-mailadres'
                ]"
                outlined
                dense
                required
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.phone"
                label="Telefoonnummer"
                :rules="[val => !!val || 'Telefoonnummer is verplicht']"
                outlined
                dense
                required
              />
            </div>
          </div>
        </div>

        <!-- Stay Details -->
        <div class="form-section q-mb-xl">
          <h4 class="text-h6 font-playfair q-mb-lg">Verblijfsdetails</h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.adults"
                label="Aantal volwassenen"
                type="number"
                :rules="[
                  val => !!val || 'Aantal volwassenen is verplicht',
                  val => val > 0 || 'Minimaal 1 volwassene',
                  val => val <= 6 || 'Maximaal 6 volwassenen'
                ]"
                outlined
                dense
                required
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.children"
                label="Aantal kinderen"
                type="number"
                :rules="[
                  val => val >= 0 || 'Minimaal 0 kinderen',
                  val => val <= 4 || 'Maximaal 4 kinderen'
                ]"
                outlined
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.message"
                label="Opmerkingen (optioneel)"
                type="textarea"
                outlined
                dense
                autogrow
              />
            </div>
          </div>
        </div>

        <!-- Price Summary -->
        <div class="form-section q-mb-xl" v-if="priceDetails">
          <h4 class="text-h6 font-playfair q-mb-lg">Prijsoverzicht</h4>
          <div class="price-summary bg-sand q-pa-lg rounded-borders">
            <div class="price-row q-mb-sm">
              <span>Verblijf ({{ priceDetails.totalNights }} nachten)</span>
              <span>€{{ priceDetails.basePrice.toLocaleString('nl-NL') }}</span>
            </div>
            <div v-if="priceDetails.shortStaySurcharge > 0" class="price-row q-mb-sm">
              <span>Toeslag kort verblijf</span>
              <span>€{{ priceDetails.shortStaySurcharge.toLocaleString('nl-NL') }}</span>
            </div>
            <div class="price-row total-row q-mt-md">
              <span class="text-weight-bold">Totaal</span>
              <span class="text-weight-bold">€{{ priceDetails.totalPrice.toLocaleString('nl-NL') }}</span>
            </div>
            <div class="text-caption text-grey-7 q-mt-sm">
              * Exclusief borg (€500) en toeristenbelasting
            </div>
          </div>
        </div>

        <!-- Terms -->
        <div class="form-section q-mb-xl">
          <q-checkbox
            v-model="form.termsAccepted"
            :rules="[(val: boolean) => val || 'Je moet akkoord gaan met de voorwaarden']"
            required
          >
            <span class="text-body2">
              Ik ga akkoord met de <a href="/terms" class="text-primary" target="_blank">algemene voorwaarden</a>
              en het <a href="/privacy" class="text-primary" target="_blank">privacybeleid</a>
            </span>
          </q-checkbox>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <q-btn
            type="submit"
            :loading="loading"
            color="primary"
            label="Bevestig reservering"
            class="cms-btn cms-btn-cta"
            unelevated
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { PriceDetails } from 'src/utils/types/supabase';

defineProps<{
  priceDetails: PriceDetails | null;
  selectedDates: Date[] | null;
}>();

const emit = defineEmits(['booking-submitted']);

const $q = useQuasar();
const loading = ref(false);
const bookingFormRef = ref<HTMLElement | null>(null);

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  adults: 2,
  children: 0,
  message: '',
  termsAccepted: false
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    // TODO: Implement booking submission logic
    
    $q.notify({
      type: 'positive',
      message: 'Je reservering is succesvol verzonden! We nemen zo snel mogelijk contact met je op.'
    });
    
    emit('booking-submitted');
  } catch (error) {
    console.error('Error submitting booking:', error);
    $q.notify({
      type: 'negative',
      message: 'Er is iets misgegaan. Probeer het later opnieuw of neem contact met ons op.'
    });
  } finally {
    loading.value = false;
  }
};

defineExpose({
  bookingFormRef
});
</script>

<style lang="scss" scoped>
.booking-form-section {
  scroll-margin-top: 100px;
}

.booking-form-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}

.total-row {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 1rem;
  margin-top: 0.5rem;
}

:deep(.q-field) {
  .q-field__control {
    height: 44px;
  }
}

.date-display {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
}

.travel-dates-placeholder {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style> 