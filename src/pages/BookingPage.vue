<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_zwembad.jpg"
      alt-text="Zwembad en tuin van het vakantiehuis"
      title="Reserveer je verblijf"
      subtitle="Plan je perfecte vakantie in ons mediterrane familiehuis met privézwembad en geniet van een onvergetelijk verblijf in l'Alfàs del Pi"
    />

    <BookingIntro />

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

    <section class="section bg-sand">
      <div class="container">
        <InfoAndServices />
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
const bookingFormRef = ref<InstanceType<typeof BookingForm> | null>(null);
const bookingFormSection = ref<HTMLElement | null>(null);

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

function calculateDiscount(nights: number): { percentage: number; amount: number } {
  if (nights >= 28) {
    return { percentage: 15, amount: 0 }; // Amount will be calculated after base price
  }
  if (nights >= 7) {
    return { percentage: 5, amount: 0 }; // Amount will be calculated after base price
  }
  return { percentage: 0, amount: 0 };
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
  
  // Calculate discount
  const discount = calculateDiscount(totalNights);
  const discountAmount = Math.round((basePrice * discount.percentage) / 100);
  
  // Calculate total
  const totalPrice = basePrice - discountAmount + CLEANING_FEE;

  return {
    pricePerNight,
    totalNights,
    basePrice,
    cleaningFee: CLEANING_FEE,
    discount: {
      percentage: discount.percentage,
      amount: discountAmount
    },
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

const handleBookingSubmitted = () => {
  showBookingForm.value = false;
  selectedDates.value = null;
};

// Reset booking form when dates change
watch(selectedDates, () => {
  showBookingForm.value = false;
});
</script>

<style lang="scss" scoped>
.section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.booking-placeholder {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (max-width: 599px) {
  .section {
    padding: 2rem 0;
  }
}
</style> 