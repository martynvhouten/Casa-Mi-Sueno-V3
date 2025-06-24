<template>
  <div class="contact-form-section">
    <!-- Modern Header -->
    <div class="text-center q-mb-xl">
      <h2 class="text-h4 font-playfair q-mb-md">{{ isBookingInquiry ? 'Plan je verblijf' : 'Contactformulier' }}</h2>
      <p class="text-subtitle1 text-grey-8 max-w-lg mx-auto" v-if="isBookingInquiry">
        Laat ons weten wanneer je wilt komen en we zorgen ervoor dat alles perfect geregeld is voor je verblijf.
      </p>
    </div>

    <q-form
      @submit="handleSubmit"
      class="form-container"
      ref="formRef"
      aria-label="Contact formulier"
    >
      <div class="form-grid">
        <!-- Selected Dates Display (Booking Only) -->
        <div v-if="isBookingInquiry && internalDates[0] && internalDates[1]" class="col-12 selected-dates-card q-mb-lg">
          <div class="row items-center q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <div class="date-display">
                <q-icon name="flight_takeoff" class="q-mr-sm" size="sm" color="primary" />
                <div class="date-info">
                  <div class="label">Aankomst</div>
                  <div class="date">{{ formatDate(internalDates[0]) }}</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="date-display">
                <q-icon name="flight_land" class="q-mr-sm" size="sm" color="primary" />
                <div class="date-info">
                  <div class="label">Vertrek</div>
                  <div class="date">{{ formatDate(internalDates[1]) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="col-12">
          <h3 class="text-h5 font-playfair q-mb-lg">Persoonlijke gegevens</h3>
          <div class="row q-col-gutter-md">
            <!-- Name -->
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.name"
                label="Naam"
                :rules="nameRules"
                lazy-rules
                outlined
                class="modern-input"
                :disable="loading"
                aria-required="true"
              >
                <template v-slot:prepend>
                  <q-icon name="person" color="primary" aria-hidden="true" />
                </template>
              </q-input>
            </div>

            <!-- Email -->
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.email"
                label="E-mail"
                type="email"
                :rules="emailRules"
                lazy-rules
                outlined
                class="modern-input"
                :disable="loading"
                aria-required="true"
              >
                <template v-slot:prepend>
                  <q-icon name="email" color="primary" aria-hidden="true" />
                </template>
              </q-input>
            </div>

            <!-- Phone -->
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.phone"
                label="Telefoonnummer"
                type="tel"
                :rules="phoneRules"
                mask="(+##) ### ### ####"
                outlined
                class="modern-input"
                :disable="loading"
              >
                <template v-slot:prepend>
                  <q-icon name="phone" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- Number of Guests -->
            <div v-if="isBookingInquiry" class="col-12 col-sm-6">
              <q-input
                v-model="form.guests"
                label="Aantal gasten"
                type="number"
                :rules="guestsRules"
                min="1"
                max="4"
                outlined
                class="modern-input"
                :disable="loading"
              >
                <template v-slot:prepend>
                  <q-icon name="group" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- Message -->
            <div class="col-12">
              <q-input
                v-model="form.message"
                :label="isBookingInquiry ? 'Extra wensen of opmerkingen' : 'Je bericht'"
                type="textarea"
                rows="4"
                :rules="messageRules"
                lazy-rules
                outlined
                class="modern-input"
                :disable="loading"
              >
                <template v-slot:prepend>
                  <q-icon name="message" color="primary" />
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="col-12 text-center q-mt-xl q-mb-xl">
          <q-btn
            type="submit"
            :label="isBookingInquiry ? 'Verstuur aanvraag' : 'Verstuur bericht'"
            color="primary"
            :loading="loading"
            class="cms-btn cms-btn-cta"
            :aria-label="loading ? 'Bezig met versturen...' : (isBookingInquiry ? 'Verstuur Aanvraag' : 'Verstuur Bericht')"
            unelevated
          >
            <template v-slot:loading>
              <q-spinner-dots />
            </template>
          </q-btn>
        </div>
      </div>
    </q-form>

    <!-- Success Dialog -->
    <q-dialog v-model="showSuccessDialog">
      <q-card class="thank-you-card">
        <q-card-section class="text-center">
          <q-icon name="check_circle" color="positive" size="64px" />
          <h4 class="text-h5 q-mt-md font-playfair">Bedankt voor je {{ isBookingInquiry ? 'aanvraag' : 'bericht' }}!</h4>
          <p class="q-mt-md">
            {{ isBookingInquiry 
              ? 'We nemen zo spoedig mogelijk contact met je op om je verblijf te bespreken.' 
              : 'We nemen zo spoedig mogelijk contact met je op.' }}
          </p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="Sluiten" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useQuasar, QForm } from 'quasar';
import { useRoute } from 'vue-router';
import DOMPurify from 'dompurify';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  guests?: number;
}

interface ValidationError {
  field: string;
  message: string;
}

const props = defineProps<{
  selectedDates?: [Date, Date] | []
}>();

const route = useRoute();
const $q = useQuasar();

const loading = ref(false);
const formRef = ref<QForm | null>(null);
const internalDates = ref<[Date | null, Date | null]>([null, null]);
const isBookingInquiry = computed(() => route.name === 'booking');
const showSuccessDialog = ref(false);
const validationErrors = ref<ValidationError[]>([]);

// Form data
const form = ref<FormData>({
  name: '',
  email: '',
  phone: '',
  message: '',
  guests: undefined
});

// Validation rules
const nameRules = [
  (val: string) => !!val.trim() || 'Naam is verplicht',
  (val: string) => val.trim().length >= 2 || 'Naam moet minimaal 2 karakters bevatten',
  (val: string) => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(val.trim()) || 'Naam mag alleen letters bevatten'
];

const emailRules = [
  (val: string) => !!val.trim() || 'E-mail is verplicht',
  (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) || 'Ongeldig e-mailadres'
];

const phoneRules = [
  (val: string) => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val.trim()) || 'Ongeldig telefoonnummer'
];

const messageRules = [
  (val: string) => !!val.trim() || 'Bericht is verplicht',
  (val: string) => val.trim().length >= 10 || 'Bericht moet minimaal 10 karakters bevatten',
  (val: string) => val.trim().length <= 1000 || 'Bericht mag maximaal 1000 karakters bevatten'
];

const guestsRules = [
  (val: number) => (isBookingInquiry.value ? !!val : true) || 'Aantal gasten is verplicht',
  (val: number) => (isBookingInquiry.value ? val > 0 && val <= 4 : true) || 'Maximaal 4 gasten toegestaan'
];

// Sanitize input
const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

// Handle form submission
const handleSubmit = async () => {
  validationErrors.value = [];
  loading.value = true;

  try {
    // Validate form
    const isValid = await formRef.value?.validate();
    
    if (!isValid) {
      throw new Error('Validatie mislukt');
    }

    // Sanitize all inputs
    const sanitizedForm = {
      name: sanitizeInput(form.value.name),
      email: sanitizeInput(form.value.email),
      phone: sanitizeInput(form.value.phone),
      message: sanitizeInput(form.value.message),
      guests: form.value.guests
    };

    // Additional validation
    if (sanitizedForm.name !== form.value.name ||
        sanitizedForm.email !== form.value.email ||
        sanitizedForm.phone !== form.value.phone ||
        sanitizedForm.message !== form.value.message) {
      throw new Error('Ongeldige karakters gedetecteerd');
    }

    // Validate dates for booking inquiries
    if (isBookingInquiry.value && (!internalDates.value[0] || !internalDates.value[1])) {
      throw new Error('Selecteer alstublieft uw gewenste verblijfsdata');
    }

    // Get function URL from your Supabase project settings
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-email`;

    // Submit form data
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        name: sanitizedForm.name,
        email: sanitizedForm.email,
        phone: sanitizedForm.phone || undefined,
        message: sanitizedForm.message,
        numberOfGuests: sanitizedForm.guests,
        startDate: internalDates.value[0],
        endDate: internalDates.value[1]
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Er is een fout opgetreden bij het verzenden van uw aanvraag');
    }

    // Show success message
    showSuccessDialog.value = true;
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      message: '',
      guests: undefined
    };
    internalDates.value = [null, null];
    formRef.value?.resetValidation();

  } catch (error: Error | unknown) {
    console.error('Error sending form:', error);
    const errorMessage = error instanceof Error ? error.message : 'Er is een onverwachte fout opgetreden';
    $q.notify({
      type: 'negative',
      message: errorMessage,
      position: 'top'
    });
    loading.value = false;
  }
};

// Watch for changes in the selectedDates prop
watch(() => props.selectedDates, (newDates) => {
  if (newDates && newDates.length === 2) {
    internalDates.value = newDates;
  }
}, { immediate: true });

// Format date for display
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

onMounted(() => {
  // Initialize form with route query params if they exist
  if (isBookingInquiry.value && route.query.from && route.query.to) {
    try {
      const fromDate = new Date(route.query.from as string);
      const toDate = new Date(route.query.to as string);
      
      if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
        internalDates.value = [fromDate, toDate];
      }
    } catch (error) {
      console.error('Error parsing dates from URL:', error);
    }
  }
});
</script>

<style lang="scss" scoped>
.contact-form-section {
  .modern-input {
    .q-field__control {
      border-radius: 12px;
      transition: all 0.2s ease;
      border: 2px solid transparent;
      background: var(--cms-sand);

      &:hover {
        background: var(--cms-sand-light);
      }

      &:focus-within {
        border-color: var(--cms-deep-terracotta);
        background: white;
      }
    }

    .q-field__label {
      font-weight: 500;
    }

    .q-icon {
      transition: color 0.2s ease;
    }

    &:focus-within {
      .q-icon {
        color: var(--cms-deep-terracotta) !important;
      }
    }
  }
}

.form-grid {
  max-width: 800px;
  margin: 0 auto;
}

.selected-dates-card {
  background: var(--cms-sand-light);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid var(--cms-sand);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--cms-deep-terracotta);
  }

  .date-display {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .date-info {
      .label {
        font-size: 0.875rem;
        color: var(--cms-gray-600);
        margin-bottom: 0.25rem;
      }

      .date {
        font-weight: 500;
        color: var(--cms-gray-900);
      }
    }
  }
}

.thank-you-card {
  border-radius: 16px;
  max-width: 400px;
  padding: 1rem;

  .q-icon {
    animation: scaleIn 0.5s ease-out forwards;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.max-w-lg {
  max-width: 32rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

// Add focus styles
:deep(.q-field__native),
:deep(.q-field__control) {
  &:focus-visible {
    outline: 3px solid var(--q-primary);
    outline-offset: 2px;
  }
}

// Error state styling
:deep(.q-field--error) {
  .q-field__bottom {
    padding: 8px 12px;
    background: rgba(211, 47, 47, 0.1);
    border-radius: 0 0 8px 8px;
    color: #d32f2f;
    font-weight: 500;
  }
}
</style> 