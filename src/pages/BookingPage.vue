<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_zwembad.jpg"
      alt-text="Zwembad en tuin van het vakantiehuis"
      title="Plan je verblijf"
      subtitle="Ontdek wanneer Casa Mi Sueño beschikbaar is"
    />

    <BookingIntro />

    <!-- Simple Status Banner -->
    <section class="section bg-sand q-py-lg">
      <div class="container">
        <div class="booking-status text-center">
          <div v-if="!selectedDates || selectedDates.length !== 2" class="status-message">
            <q-icon name="event" size="32px" class="text-primary q-mb-sm" />
            <h3 class="text-h5 font-playfair text-primary q-mb-sm">Plan je verblijf</h3>
            <p class="text-subtitle1 text-grey-8">Selecteer je aankomst- en vertrekdatum in de kalender</p>
          </div>
          <div v-else-if="!formIsActive" class="status-message">
            <q-icon name="calculate" size="32px" class="text-positive q-mb-sm" />
            <h3 class="text-h5 font-playfair text-positive q-mb-sm">Perfecte keuze!</h3>
            <p class="text-subtitle1 text-grey-8">
              {{ priceDetails?.totalNights }} nachten geselecteerd 
              <span class="text-weight-medium">• €{{ priceDetails?.totalPrice.toLocaleString('nl-NL') }}</span>
              <span class="text-caption text-grey-6"> + toeristenbelasting</span>
            </p>
          </div>
          <div v-else class="status-message">
            <q-icon name="edit_note" size="32px" class="text-terracotta q-mb-sm" />
            <h3 class="text-h5 font-playfair text-terracotta q-mb-sm">Bijna klaar!</h3>
            <p class="text-subtitle1 text-grey-8">Vul je gegevens in om je reservering af te ronden</p>
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
import HeroSection from 'src/components/HeroSection.vue';
import BookingIntro from 'src/components/booking/BookingIntro.vue';
import BookingCalendar from 'src/components/booking/BookingCalendar.vue';
import CostSummary from 'src/components/booking/CostSummary.vue';
import InfoAndServices from 'src/components/booking/InfoAndServices.vue';
import BookingForm from 'src/components/booking/BookingForm.vue';
import { PriceDetails } from 'src/utils/types/supabase';

const $q = useQuasar();
const selectedDates = ref<Date[] | null>(null);
const showBookingForm = ref(false);
const showInfoServices = ref(false);
const formIsActive = ref(false);
const bookingFormRef = ref<InstanceType<typeof BookingForm> | null>(null);
const bookingFormSection = ref<HTMLElement | null>(null);

// Status tracking for the new status banner
// Uses existing formIsActive, selectedDates, and priceDetails

enum Season {
  High = 'high',
  Mid = 'mid',
  Low = 'low',
  Holiday = 'holiday'
}

interface SeasonConfig {
  basePrice: number;
  weeklyPrice: number;
  minNights: number;
  name: string;
}

const seasonConfigs: Record<Season, SeasonConfig> = {
  [Season.High]: {
    basePrice: 160,
    weeklyPrice: 1120,
    minNights: 7,
    name: 'Hoogseizoen'
  },
  [Season.Mid]: {
    basePrice: 135,
    weeklyPrice: 945,
    minNights: 5,
    name: 'Middenseizoen'
  },
  [Season.Low]: {
    basePrice: 110,
    weeklyPrice: 770,
    minNights: 7,
    name: 'Laagseizoen'
  },
  [Season.Holiday]: {
    basePrice: 170,
    weeklyPrice: 1190,
    minNights: 7,
    name: 'Vakantieperiode'
  }
};

const CLEANING_FEE = 100;
const SECURITY_DEPOSIT = 300;

// Holiday periods (Christmas, New Year's, Easter)
const holidayPeriods = [
  // Christmas/New Year period
  { start: new Date(2024, 11, 20), end: new Date(2025, 0, 6) }, // Dec 20 - Jan 6
  { start: new Date(2025, 11, 20), end: new Date(2026, 0, 6) }, // Dec 20 - Jan 6
  // Easter periods (approximate - would need to be updated yearly)
  { start: new Date(2024, 2, 25), end: new Date(2024, 3, 8) }, // Easter 2024
  { start: new Date(2025, 3, 14), end: new Date(2025, 3, 28) }, // Easter 2025
];

function isHolidayPeriod(date: Date): boolean {
  return holidayPeriods.some(period => 
    date >= period.start && date <= period.end
  );
}

function getSeason(date: Date): Season {
  // Check for holiday periods first
  if (isHolidayPeriod(date)) {
    return Season.Holiday;
  }

  const month = date.getMonth();
  
  // High season: June, July, August, September
  if (month >= 5 && month <= 8) {
    return Season.High;
  }
  
  // Mid season: March, April, May, October
  if ((month >= 2 && month <= 4) || month === 9) {
    return Season.Mid;
  }
  
  // Low season: January, February, November, December
  return Season.Low;
}

// DISCOUNT STRATEGY OPTIONS - Choose one by commenting/uncommenting:

// Option 1: NO DISCOUNTS (Simplest)
/*
function calculateDiscount(totalNights: number): { percentage: number; reason: string } | null {
  return null;
}
*/

// Option 2: SIMPLE 2-TIER DISCOUNTS (Recommended)
function calculateDiscount(totalNights: number): { percentage: number; reason: string } | null {
  if (totalNights >= 28) { // 4+ weeks
    return { percentage: 15, reason: '4+ weken verblijf' };
  } else if (totalNights >= 14) { // 2+ weeks
    return { percentage: 10, reason: '2+ weken verblijf' };
  }
  return null;
}

// Option 3: PROGRESSIVE 4-TIER DISCOUNTS (Original)
/*
function calculateDiscount(totalNights: number): { percentage: number; reason: string } | null {
  if (totalNights > 28) { // Over 4 weeks
    return { percentage: 20, reason: '4+ weken verblijf' };
  } else if (totalNights >= 28) { // 4 weeks
    return { percentage: 15, reason: '4 weken verblijf' };
  } else if (totalNights >= 21) { // 3 weeks
    return { percentage: 10, reason: '3 weken verblijf' };
  } else if (totalNights >= 14) { // 2 weeks
    return { percentage: 5, reason: '2 weken verblijf' };
  }
  return null;
}
*/

function calculatePrice(startDate: Date, endDate: Date, totalGuests?: number): PriceDetails | null {
  if (!startDate || !endDate) return null;

  const totalNights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  if (totalNights <= 0) return null;

  // Determine the primary season (based on check-in date)
  const season = getSeason(startDate);
  const config = seasonConfigs[season];
  
  // Calculate weekly and daily pricing
  const fullWeeks = Math.floor(totalNights / 7);
  const remainingDays = totalNights % 7;
  
  // Use weekly rate for full weeks, daily rate for remaining days
  let basePrice = (fullWeeks * config.weeklyPrice) + (remainingDays * config.basePrice);
  
  // If it's all daily pricing (less than 7 nights), use daily rate
  if (fullWeeks === 0) {
    basePrice = totalNights * config.basePrice;
  }

  const pricePerNight = config.basePrice;
  
  // Calculate discount
  const discountInfo = calculateDiscount(totalNights);
  let discount = undefined;
  let finalPrice = basePrice;
  
  if (discountInfo) {
    const discountAmount = Math.round(basePrice * (discountInfo.percentage / 100));
    finalPrice = basePrice - discountAmount;
    discount = {
      percentage: discountInfo.percentage,
      amount: discountAmount,
      reason: discountInfo.reason
    };
  }

  // Calculate total with fees
  const totalPrice = finalPrice + CLEANING_FEE;
  
  // Calculate tourist tax if guest count provided
  const TOURIST_TAX_PER_PERSON_PER_NIGHT = 2.50;
  let touristTax = undefined;
  let totalPriceWithTax = totalPrice;
  
  if (totalGuests && totalGuests > 0) {
    const touristTaxAmount = totalGuests * totalNights * TOURIST_TAX_PER_PERSON_PER_NIGHT;
    touristTax = {
      perPersonPerNight: TOURIST_TAX_PER_PERSON_PER_NIGHT,
      totalGuests,
      totalAmount: touristTaxAmount
    };
    totalPriceWithTax = totalPrice + touristTaxAmount;
  }
  
  // Show special message for stays longer than 3 weeks
  const showLongStayMessage = totalNights > 21;

  return {
    pricePerNight,
    totalNights,
    basePrice: finalPrice,
    cleaningFee: CLEANING_FEE,
    securityDeposit: SECURITY_DEPOSIT,
    touristTax,
    discount,
    totalPrice,
    totalPriceWithTax,
    season: season as 'low' | 'mid' | 'high' | 'holiday',
    showLongStayMessage
  };
}

const priceDetails = computed<PriceDetails | null>(() => {
  if (!selectedDates.value || selectedDates.value.length !== 2) return null;
  return calculatePrice(selectedDates.value[0], selectedDates.value[1]);
});

const handleLongStay = () => {
    $q.notify({
    type: 'info',
    message: 'Lange verblijven: bekijk het kostenoverzicht voor meer informatie over speciale tarieven.',
      position: 'top',
    timeout: 5000,
    actions: [{ label: 'OK', color: 'white', handler: () => {} }]
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
.booking-status {
  max-width: 600px;
  margin: 0 auto;
}

.status-message {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  border: 1px solid rgba(231, 111, 81, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0;
  }

  p {
    margin: 0;
    max-width: 500px;
    margin: 0 auto;
  }

  .q-icon {
    opacity: 0.9;
  }
}

.info-services-toggle {
  text-align: center;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .status-message {
    padding: 1.5rem 1rem;
    margin: 0 1rem;
  }
}
</style> 