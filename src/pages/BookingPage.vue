<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_zwembad.jpg"
      alt-text="Zwembad en tuin van het vakantiehuis"
      title="Jouw mediterrane ontsnapping"
      subtitle="Rust, zon en privézwembad in het hart van de Costa Blanca"
    />

    <BookingIntro />

    <!-- Progress Indicator -->
    <section class="section bg-white q-py-md">
      <div class="container">
        <div class="booking-progress">
          <div class="progress-step" :class="{ 'active': currentStep >= 1, 'completed': currentStep > 1 }">
            <div class="step-icon">
              <q-icon :name="currentStep > 1 ? 'check' : 'event'" />
            </div>
            <span class="step-label">Selecteer data</span>
          </div>
          <div class="progress-connector" :class="{ 'active': currentStep > 1 }"></div>
          <div class="progress-step" :class="{ 'active': currentStep >= 2, 'completed': currentStep > 2 }">
            <div class="step-icon">
              <q-icon :name="currentStep > 2 ? 'check' : 'euro'" />
            </div>
            <span class="step-label">Bekijk prijs</span>
          </div>
          <div class="progress-connector" :class="{ 'active': currentStep > 2 }"></div>
          <div class="progress-step" :class="{ 'active': currentStep >= 3, 'completed': currentStep > 3 }">
            <div class="step-icon">
              <q-icon :name="currentStep > 3 ? 'check' : 'edit'" />
            </div>
            <span class="step-label">Bevestig boeking</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-7 col-lg-8">
            <BookingCalendar v-model="selectedDates" @long-stay="handleLongStay" />
          </div>
          <div class="col-12 col-md-5 col-lg-4">
            <CostSummary :price-details="priceDetails" @show-booking-form="scrollToBookingForm" />
          </div>
        </div>
      </div>
    </section>

    <!-- Collapsible Info & Services Section -->
    <section class="section bg-sand">
      <div class="container">
        <div class="info-services-toggle">
          <q-btn
            flat
            no-caps
            :icon="showInfoServices ? 'expand_less' : 'expand_more'"
            :label="showInfoServices ? 'Verberg aanvullende informatie' : 'Bekijk aanvullende informatie'"
            class="full-width text-primary"
            @click="showInfoServices = !showInfoServices"
            size="lg"
          />
        </div>
        <q-slide-transition>
          <div v-show="showInfoServices">
            <InfoAndServices />
          </div>
        </q-slide-transition>
      </div>
    </section>

    <!-- Booking Form Section -->
    <section class="section bg-white" ref="bookingFormSection">
      <div class="container">
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <div v-if="!selectedDates || selectedDates.length !== 2" class="booking-placeholder text-center q-pa-xl">
              <q-icon name="event" color="grey-6" size="48px" class="q-mb-md" />
              <h4 class="text-h5 font-playfair text-primary q-mb-md">Selecteer je verblijfsdata</h4>
              <p class="text-subtitle1 text-grey-8">
                Kies je aankomst- en vertrekdatum in de kalender hierboven om je reservering te maken.
              </p>
            </div>
            <BookingForm
              v-else
              ref="bookingFormRef"
              :price-details="priceDetails"
              :selected-dates="selectedDates"
              @booking-submitted="handleBookingSubmitted"
              @form-active="handleFormActive"
            />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import HeroSection from 'src/components/HeroSection.vue';
import BookingIntro from 'src/components/booking/BookingIntro.vue';
import BookingCalendar from 'src/components/booking/BookingCalendar.vue';
import CostSummary from 'src/components/booking/CostSummary.vue';
import InfoAndServices from 'src/components/booking/InfoAndServices.vue';
import BookingForm from 'src/components/booking/BookingForm.vue';
import { PriceDetails } from 'src/utils/types/supabase';

const $q = useQuasar();
const router = useRouter();
const selectedDates = ref<Date[] | null>(null);
const showBookingForm = ref(false);
const showInfoServices = ref(false);
const formIsActive = ref(false);
const bookingFormRef = ref<InstanceType<typeof BookingForm> | null>(null);
const bookingFormSection = ref<HTMLElement | null>(null);

// Progress tracking
const currentStep = computed(() => {
  if (!selectedDates.value || selectedDates.value.length !== 2) return 1;
  if (!priceDetails.value) return 1;
  // Only advance to step 3 when the form is actually visible and being used
  if (formIsActive.value && (selectedDates.value && selectedDates.value.length === 2)) return 3;
  return 2;
});

enum Season {
  High = 'high',
  Mid = 'mid',
  Low = 'low'
}

interface SeasonConfig {
  basePrice: number;
  minNights: number;
  requiresSaturday: boolean;
}

const seasonConfigs: Record<Season, SeasonConfig> = {
  [Season.High]: {
    basePrice: 220,
    minNights: 7,
    requiresSaturday: true
  },
  [Season.Mid]: {
    basePrice: 180,
    minNights: 5,
    requiresSaturday: false
  },
  [Season.Low]: {
    basePrice: 150,
    minNights: 3,
    requiresSaturday: false
  }
};

const CLEANING_FEE = 150;

function getSeason(date: Date): Season {
  const month = date.getMonth();
  // High season: July and August
  if (month >= 6 && month <= 7) {
    return Season.High;
  }
  // Mid season: April-June, September
  if ((month >= 3 && month <= 5) || month === 8) {
    return Season.Mid;
  }
  // Low season: October-March
  return Season.Low;
}

function calculatePrice(startDate: Date, endDate: Date): PriceDetails | null {
  if (!startDate || !endDate) return null;

  const totalNights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  if (totalNights <= 0) return null;

  const season = getSeason(startDate);
  const config = seasonConfigs[season];
  
  // Base price calculation
  const pricePerNight = config.basePrice;
  const basePrice = totalNights * pricePerNight;
  
  // Calculate total
  const totalPrice = basePrice + CLEANING_FEE;

  return {
    pricePerNight,
    totalNights,
    basePrice,
    cleaningFee: CLEANING_FEE,
    totalPrice
  };
}

const priceDetails = computed<PriceDetails | null>(() => {
  if (!selectedDates.value || selectedDates.value.length !== 2) return null;
  return calculatePrice(selectedDates.value[0], selectedDates.value[1]);
});

const handleLongStay = () => {
    $q.notify({
    type: 'info',
    message: 'Voor verblijven langer dan 4 weken, neem contact op voor een speciale prijs.',
      position: 'top',
    timeout: 7000,
    actions: [{ label: 'Contact', color: 'white', handler: () => { router.push('/contact') } }]
  });
};

const scrollToBookingForm = () => {
  showBookingForm.value = true;
  // Wait for the form to be rendered
  setTimeout(() => {
    bookingFormRef.value?.bookingFormRef?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
};

const handleFormActive = () => {
  formIsActive.value = true;
};

const handleBookingSubmitted = () => {
  showBookingForm.value = false;
  formIsActive.value = false;
  selectedDates.value = null;
};

// Reset booking form when dates change
watch(selectedDates, () => {
  showBookingForm.value = false;
  formIsActive.value = false;
});
</script>

<style lang="scss" scoped>
.booking-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem 0;

  @media (max-width: 768px) {
    max-width: 100%;
    flex-direction: column;
    gap: 1rem;
    
    .progress-connector {
      display: none;
    }
  }
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0.5;
  transition: all 0.3s ease;

  &.active {
    opacity: 1;
  }

  &.completed {
    opacity: 1;
    
    .step-icon {
      background: var(--cms-olive);
      color: white;
    }
  }

  .step-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--cms-gray-200);
    color: var(--cms-gray-600);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
  }

  &.active .step-icon {
    background: var(--cms-deep-terracotta);
    color: white;
  }

  .step-label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--cms-gray-800);
  }
}

.progress-connector {
  flex: 1;
  height: 2px;
  background: var(--cms-gray-200);
  margin: 0 1rem;
  transition: all 0.3s ease;

  &.active {
    background: var(--cms-deep-terracotta);
  }
}

.info-services-toggle {
  text-align: center;
  margin-bottom: 1rem;
}
</style> 