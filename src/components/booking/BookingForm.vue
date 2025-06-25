<template>
  <div class="booking-form-section" ref="bookingFormRef">
    <!-- Live region for screen reader announcements -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      {{ liveAnnouncement }}
    </div>
    
    <div class="booking-form-card">
      <h3 class="text-h4 font-playfair text-primary q-mb-xl text-center">Maak je reservering</h3>
      
      <form @submit.prevent="handleSubmit" class="q-gutter-md">
        <!-- Honeypot field for spam protection -->
        <input 
          type="text" 
          name="website" 
          v-model="honeypot"
          style="position: absolute; left: -9999px; opacity: 0;" 
          tabindex="-1" 
          autocomplete="off"
        >

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
                label="Je voornaam"
                :rules="[val => !!val || 'Voornaam is verplicht']"
                :aria-describedby="formErrors.firstName ? 'firstName-error' : undefined"
                :aria-invalid="!!formErrors.firstName"
                @focus="handleFormInteraction"
                outlined
                required
              />
              <div v-if="formErrors.firstName" id="firstName-error" role="alert" class="text-negative text-caption q-mt-xs">
                {{ formErrors.firstName }}
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.lastName"
                label="Je achternaam"
                :rules="[val => !!val || 'Achternaam is verplicht']"
                :aria-describedby="formErrors.lastName ? 'lastName-error' : undefined"
                :aria-invalid="!!formErrors.lastName"
                @focus="handleFormInteraction"
                outlined
                required
              />
              <div v-if="formErrors.lastName" id="lastName-error" role="alert" class="text-negative text-caption q-mt-xs">
                {{ formErrors.lastName }}
              </div>
            </div>
            <div class="col-12">
              <q-input
                v-model="form.email"
                label="Je e-mailadres"
                type="email"
                hint="Voor de bevestiging van je boeking"
                :rules="[
                  val => !!val || 'E-mailadres is verplicht',
                  val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Ongeldig e-mailadres'
                ]"
                :aria-describedby="formErrors.email ? 'email-error' : undefined"
                :aria-invalid="!!formErrors.email"
                @focus="handleFormInteraction"
                outlined
                required
              />
              <div v-if="formErrors.email" id="email-error" role="alert" class="text-negative text-caption q-mt-xs">
                {{ formErrors.email }}
              </div>
            </div>
            <div class="col-12">
              <q-input
                v-model="form.emailConfirm"
                label="Bevestig e-mailadres"
                type="email"
                hint="Typ je e-mailadres opnieuw om typefouten te voorkomen"
                :rules="[
                  val => !!val || 'Bevestiging e-mailadres is verplicht',
                  val => val === form.email || 'E-mailadressen komen niet overeen'
                ]"
                :aria-describedby="formErrors.emailConfirm ? 'emailConfirm-error' : undefined"
                :aria-invalid="!!formErrors.emailConfirm"
                outlined
                required
              />
              <div v-if="formErrors.emailConfirm" id="emailConfirm-error" role="alert" class="text-negative text-caption q-mt-xs">
                {{ formErrors.emailConfirm }}
              </div>
            </div>
            <div class="col-12">
              <q-input
                v-model="form.phone"
                label="Je telefoonnummer"
                placeholder="+31 6 1234 5678 of 06 1234 5678"
                hint="Voor snelle communicatie over je boeking"
                :rules="[val => !!val || 'Telefoonnummer is verplicht']"
                :aria-describedby="formErrors.phone ? 'phone-error' : undefined"
                :aria-invalid="!!formErrors.phone"
                outlined
                required
              />
              <div v-if="formErrors.phone" id="phone-error" role="alert" class="text-negative text-caption q-mt-xs">
                {{ formErrors.phone }}
              </div>
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
                hint="Personen van 18 jaar en ouder"
                :rules="adultValidationRules"
                :aria-describedby="formErrors.adults ? 'adults-error' : undefined"
                :aria-invalid="!!formErrors.adults"
                outlined
                required
              />
              <div v-if="formErrors.adults" id="adults-error" role="alert" class="text-negative text-caption q-mt-xs">
                {{ formErrors.adults }}
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.children"
                label="Aantal kinderen"
                type="number"
                hint="Personen onder de 18 jaar"
                :rules="childrenValidationRules"
                :aria-describedby="formErrors.children ? 'children-error' : undefined"
                :aria-invalid="!!formErrors.children"
                outlined
              />
              <div v-if="formErrors.children" id="children-error" role="alert" class="text-negative text-caption q-mt-xs">
                {{ formErrors.children }}
              </div>
            </div>
            <div class="col-12" v-if="totalGuests > 4">
              <q-banner class="bg-negative text-white q-mb-md" rounded>
                <template v-slot:avatar>
                  <q-icon name="warning" color="white" />
                </template>
                <span class="text-weight-medium">
                  Er kunnen maximaal 4 personen in het huis verblijven. 
                  Je hebt nu {{ totalGuests }} personen ingevoerd. 
                  Pas je boeking aan.
                </span>
              </q-banner>
            </div>
            <div class="col-12">
              <q-input
                v-model="form.message"
                label="Opmerkingen (optioneel)"
                type="textarea"
                hint="Bijzondere wensen, vragen of opmerkingen"
                outlined
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
            :aria-describedby="formErrors.termsAccepted ? 'terms-error' : undefined"
            :aria-invalid="!!formErrors.termsAccepted"
            required
          >
            <span class="text-body2">
              Ik ga akkoord met de <a href="/terms" class="text-primary" target="_blank">algemene voorwaarden</a>
              en het <a href="/privacy" class="text-primary" target="_blank">privacybeleid</a>
            </span>
          </q-checkbox>
          <div v-if="formErrors.termsAccepted" id="terms-error" role="alert" class="text-negative text-caption q-mt-xs">
            {{ formErrors.termsAccepted }}
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <q-btn
            type="submit"
            :loading="loading"
            :disable="totalGuests > 4"
            color="primary"
            label="Bevestig reservering"
            class="cms-btn cms-btn-cta"
            unelevated
          >
            <template v-slot:loading>
              <div class="row items-center">
                <div class="branded-spinner q-mr-sm"></div>
                Bezig met versturen...
              </div>
            </template>
          </q-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import { PriceDetails } from 'src/utils/types/supabase';

const props = defineProps<{
  priceDetails: PriceDetails | null;
  selectedDates: Date[] | null;
}>();

const emit = defineEmits(['booking-submitted', 'form-active']);

const $q = useQuasar();
const loading = ref(false);
const bookingFormRef = ref<HTMLElement | null>(null);
const honeypot = ref('');
const liveAnnouncement = ref('');

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
  emailConfirm: '',
  phone: '',
  adults: 2,
  children: 0,
  message: '',
  termsAccepted: false
});

const formErrors = ref({
  firstName: '',
  lastName: '',
  email: '',
  emailConfirm: '',
  phone: '',
  adults: '',
  children: '',
  termsAccepted: ''
});

const totalGuests = computed(() => {
  const adults = Number(form.value.adults) || 0;
  const children = Number(form.value.children) || 0;
  return adults + children;
});

// Watch for guest limit changes and announce to screen readers
watch(totalGuests, (newTotal) => {
  if (newTotal > 4) {
    liveAnnouncement.value = `Let op: Er kunnen maximaal 4 personen in het huis verblijven. Je hebt nu ${newTotal} personen ingevoerd.`;
  }
}, { immediate: true });

// Watch for form activity to update progress
watch(() => props.selectedDates, (newDates) => {
  if (newDates && newDates.length === 2) {
    // Don't emit form-active immediately, let user interaction trigger it
    liveAnnouncement.value = 'Formulier geladen. Vul je gegevens in om je reservering te voltooien.';
  }
}, { immediate: true });

// Emit form-active when user starts interacting with form fields
const handleFormInteraction = () => {
  if (!formIsActive.value) {
    formIsActive.value = true;
    emit('form-active');
  }
};

const formIsActive = ref(false);

// Simplified validation rules (individual field validation only)
const adultValidationRules = [
  (val: number) => !!val || 'Aantal volwassenen is verplicht',
  (val: number) => val > 0 || 'Minimaal 1 volwassene',
  (val: number) => val <= 4 || 'Maximaal 4 volwassenen'
];

const childrenValidationRules = [
  (val: number) => val >= 0 || 'Minimaal 0 kinderen',
  (val: number) => val <= 3 || 'Maximaal 3 kinderen'
];

const validateForm = () => {
  const errors = {
    firstName: '',
    lastName: '',
    email: '',
    emailConfirm: '',
    phone: '',
    adults: '',
    children: '',
    termsAccepted: ''
  };

  // Validate required fields
  if (!form.value.firstName) errors.firstName = 'Voornaam is verplicht';
  if (!form.value.lastName) errors.lastName = 'Achternaam is verplicht';
  if (!form.value.email) errors.email = 'E-mailadres is verplicht';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) errors.email = 'Ongeldig e-mailadres';
  if (!form.value.emailConfirm) errors.emailConfirm = 'Bevestiging e-mailadres is verplicht';
  else if (form.value.email !== form.value.emailConfirm) errors.emailConfirm = 'E-mailadressen komen niet overeen';
  if (!form.value.phone) errors.phone = 'Telefoonnummer is verplicht';
  if (!form.value.adults || form.value.adults < 1) errors.adults = 'Minimaal 1 volwassene';
  if (form.value.children < 0) errors.children = 'Minimaal 0 kinderen';
  if (!form.value.termsAccepted) errors.termsAccepted = 'Je moet akkoord gaan met de voorwaarden';

  formErrors.value = errors;
  return Object.values(errors).every(error => !error);
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    liveAnnouncement.value = 'Bezig met versturen van je reservering...';
    
    // Check for honeypot (spam protection)
    if (honeypot.value) {
      console.log('Spam detected');
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      liveAnnouncement.value = 'Er zijn fouten in het formulier. Controleer je gegevens.';
      return;
    }
    
    // Check guest limit
    if (totalGuests.value > 4) {
      liveAnnouncement.value = 'Er kunnen maximaal 4 personen in het huis verblijven. Pas je boeking aan.';
      return;
    }
    
    // Check environment variables
    if (!import.meta.env.VITE_SUPABASE_URL) {
      throw new Error('VITE_SUPABASE_URL environment variable is missing');
    }
    
    if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
      throw new Error('VITE_SUPABASE_ANON_KEY environment variable is missing');
    }
    
    if (!props.selectedDates || props.selectedDates.length !== 2) {
      throw new Error('Selecteer alstublieft uw aankomst- en vertrekdatum');
    }
    
    // Combine name
    const fullName = `${form.value.firstName} ${form.value.lastName}`;
    
    // Get function URL from Supabase
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-email`;
    
    // Submit form data (send ISO strings for dates as backend expects)
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        name: fullName,
        email: form.value.email,
        phone: form.value.phone || undefined,
        message: form.value.message || 'Geen specifieke opmerkingen',
        numberOfGuests: Number(totalGuests.value),
        adults: Number(form.value.adults || 0),
        children: Number(form.value.children || 0),
        startDate: props.selectedDates[0].toISOString(),
        endDate: props.selectedDates[1].toISOString()
      })
    });

    // Try to get response text first to see what we're dealing with
    const responseText = await response.text();
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      console.error('Raw response:', responseText);
      throw new Error(`Server returned invalid response: ${responseText.substring(0, 100)}`);
    }
    
    if (!response.ok) {
      throw new Error(result.message || 'Er is een fout opgetreden bij het verzenden van uw reservering');
    }
    
    liveAnnouncement.value = 'Je reservering is succesvol verzonden! Je ontvangt een bevestigingsmail.';
    
    $q.notify({
      type: 'positive',
      message: 'Je reservering is succesvol verzonden! Je ontvangt een bevestigingsmail en we nemen zo snel mogelijk contact met je op.',
      timeout: 5000
    });
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      emailConfirm: '',
      phone: '',
      adults: 2,
      children: 0,
      message: '',
      termsAccepted: false
    };
    
    formErrors.value = {
      firstName: '',
      lastName: '',
      email: '',
      emailConfirm: '',
      phone: '',
      adults: '',
      children: '',
      termsAccepted: ''
    };
    
    emit('booking-submitted');
  } catch (error) {
    console.error('Error submitting booking:', error);
    liveAnnouncement.value = 'Er is een fout opgetreden bij het versturen van je reservering.';
    $q.notify({
      type: 'negative',
      message: error instanceof Error ? error.message : 'Er is iets misgegaan. Probeer het later opnieuw of neem contact met ons op.',
      timeout: 8000
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
    min-height: 48px; // Improved touch targets
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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Branded loading spinner
.branded-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style> 