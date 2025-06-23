<template>
  <div class="contact-form-section">
    <!-- Modern Header -->
    <div class="text-center q-mb-xl">
      <h2 class="text-h4 font-playfair q-mb-md">{{ isBookingInquiry ? 'Plan je verblijf' : 'Neem contact op' }}</h2>
      <p class="text-subtitle1 text-grey-8 max-w-lg mx-auto">
        {{ isBookingInquiry 
          ? 'Laat ons weten wanneer je wilt komen en we zorgen ervoor dat alles perfect geregeld is voor je verblijf.'
          : 'Heb je vragen over ons vakantiehuis? We helpen je graag verder.' }}
      </p>
    </div>

    <q-form
      @submit="handleSubmit"
      class="form-container"
      ref="formRef"
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
                :rules="[
                  val => !!val || 'Naam is verplicht',
                  val => val.length >= 2 || 'Naam moet minimaal 2 karakters bevatten'
                ]"
                lazy-rules
                outlined
                class="modern-input"
                :disable="loading"
              >
                <template v-slot:prepend>
                  <q-icon name="person" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- Email -->
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.email"
                label="E-mail"
                type="email"
                :rules="[
                  val => !!val || 'E-mail is verplicht',
                  val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || 'Ongeldig e-mailadres'
                ]"
                lazy-rules
                outlined
                class="modern-input"
                :disable="loading"
              >
                <template v-slot:prepend>
                  <q-icon name="email" color="primary" />
                </template>
              </q-input>
            </div>

            <!-- Phone -->
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.phone"
                label="Telefoonnummer"
                type="tel"
                :rules="[
                  val => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val) || 'Ongeldig telefoonnummer'
                ]"
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
                :rules="[
                  val => !!val || 'Aantal gasten is verplicht',
                  val => val > 0 && val <= 4 || 'Maximaal 4 gasten toegestaan'
                ]"
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
                :rules="[
                  val => !!val || 'Bericht is verplicht',
                  val => val.length >= 10 || 'Bericht moet minimaal 10 karakters bevatten'
                ]"
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
        <div class="col-12 text-center q-mt-xl">
          <q-btn
            type="submit"
            :label="isBookingInquiry ? 'Verstuur Aanvraag' : 'Verstuur Bericht'"
            color="primary"
            :loading="loading"
            size="lg"
            unelevated
            class="submit-button"
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
import { useRoute, useRouter } from 'vue-router';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  guests?: number;
}

const props = defineProps<{
  selectedDates?: [Date, Date] | []
}>();

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const loading = ref(false);
const formRef = ref<QForm | null>(null);
const internalDates = ref<[Date | null, Date | null]>([null, null]);
const isBookingInquiry = computed(() => route.name === 'booking');
const showSuccessDialog = ref(false);

// Watch for changes in the selectedDates prop
watch(() => props.selectedDates, (newDates) => {
  if (newDates && newDates.length === 2) {
    internalDates.value = newDates;
  }
}, { immediate: true });

// Form data
const form = ref<FormData>({
  name: '',
  email: '',
  phone: '',
  message: '',
  guests: undefined
});

// Format date for display
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Initialize form with route query params if they exist
onMounted(() => {
  if (isBookingInquiry.value && route.query.from && route.query.to) {
    try {
      const fromDate = new Date(route.query.from as string);
      const toDate = new Date(route.query.to as string);
      
      // Only set dates if they are valid
      if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
        internalDates.value = [fromDate, toDate];
      } else {
        // If dates are invalid, redirect back to booking page
        router.push({ name: 'booking' });
      }
    } catch (error) {
      console.error('Error parsing dates:', error);
      // If there's an error parsing dates, redirect back to booking page
      router.push({ name: 'booking' });
    }
  }
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    
    // Validate form
    const isValid = await formRef.value?.validate();
    if (!isValid) {
      throw new Error('Vul alsjeblieft alle verplichte velden correct in');
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
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone || undefined,
        message: form.value.message,
        numberOfGuests: form.value.guests,
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

  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Er is een fout opgetreden',
      position: 'top',
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.contact-form-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.form-container {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.form-grid {
  display: grid;
  gap: 2rem;
}

.modern-input {
  :deep(.q-field__control) {
    border-radius: 8px;
    min-height: 56px;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--q-primary);
    }
  }

  :deep(.q-field__label) {
    font-size: 0.95rem;
    font-weight: 500;
    color: #495057;
  }

  :deep(.q-field--focused) {
    .q-field__control {
      border-color: var(--q-primary);
      box-shadow: 0 0 0 4px rgba(0, 83, 179, 0.1);
    }
  }
}

.selected-dates-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.date-display {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .date-info {
    .label {
      font-size: 0.85rem;
      color: #6c757d;
      margin-bottom: 0.25rem;
    }

    .date {
      font-weight: 500;
      color: #212529;
    }
  }
}

.submit-button {
  min-width: 200px;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 8px;
  padding: 12px 32px;
  transition: transform 0.2s ease;

  &:not(:disabled):hover {
    transform: translateY(-2px);
  }
}

.thank-you-card {
  border-radius: 16px;
  max-width: 400px;
  padding: 2rem;
}

// Responsive adjustments
@media (max-width: 599px) {
  .contact-form-section {
    padding: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  .date-display {
    margin-bottom: 1rem;
  }
}
</style> 