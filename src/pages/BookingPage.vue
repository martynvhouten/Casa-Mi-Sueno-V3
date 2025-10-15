<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_eetgedeelte.webp"
      alt-text="Volledig overzicht van het zwembad en terras"
      title="Reserveer je verblijf"
      subtitle="Kies je perfecte data en maak direct een reservering"
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
            <BookingCalendar v-model="selectedDates" @minimum-nights-error="handleMinimumNightsError" />
          </div>
          <div class="col-12 col-md-5 col-lg-4">
            <CostSummary :price-details="priceDetails" @show-booking-form="scrollToBookingForm" />
          </div>
        </div>
      </div>
    </section>

    <!-- Info & Services Section -->
    <section class="section bg-sand">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="font-playfair">Aanvullende informatie</h2>
          <p class="text-body1 text-grey-7">Alles wat je moet weten voor je verblijf</p>
        </div>
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
import { PriceDetails } from 'src/types/booking';
import { trackPricingCalculation } from 'src/utils/analytics';

const $q = useQuasar();
const selectedDates = ref<Date[] | null>(null);
const showBookingForm = ref(false);
const formIsActive = ref(false);
const bookingFormRef = ref<InstanceType<typeof BookingForm> | null>(null);
const bookingFormSection = ref<HTMLElement | null>(null);

// Status tracking for the new status banner
// Uses existing formIsActive, selectedDates, and priceDetails

enum Season {
  High = 'high',
  Mid = 'mid', 
  Low = 'low',
  Unavailable = 'unavailable'
}

interface SeasonConfig {
  basePrice: number;
  weeklyPrice: number;
  twoWeekPrice?: number;
  threeWeekPrice?: number;
  monthlyPrice?: number;
  minNights: number;
  name: string;
}

const seasonConfigs: Record<Season, SeasonConfig> = {
  [Season.High]: {
    basePrice: 165,
    weeklyPrice: 1150,
    twoWeekPrice: 2100,
    minNights: 1,
    name: 'Hoogseizoen'
  },
  [Season.Mid]: {
    basePrice: 100,
    weeklyPrice: 700,
    twoWeekPrice: 1300,
    threeWeekPrice: 1900,
    monthlyPrice: 2300,
    minNights: 1,
    name: 'Middenseizoen'
  },
  [Season.Low]: {
    basePrice: 85,
    weeklyPrice: 600,
    twoWeekPrice: 1000,
    monthlyPrice: 1300,
    minNights: 1,
    name: 'Laagseizoen'
  },
  [Season.Unavailable]: {
    basePrice: 0,
    weeklyPrice: 0,
    minNights: 0,
    name: 'Niet beschikbaar'
  }
};

const CLEANING_FEE = 150;
const SECURITY_DEPOSIT = 400;

// Helper function to calculate the most cost-effective price for a given number of nights
function calculateOptimalPrice(nights: number, config: SeasonConfig): number {
  if (nights === 0) return 0;
  
  // Try different pricing options and pick the cheapest
  const options: number[] = [];
  
  // Daily rate
  options.push(nights * config.basePrice);
  
  // Weekly combinations
  if (nights >= 7) {
    const fullWeeks = Math.floor(nights / 7);
    const remainingDays = nights % 7;
    options.push((fullWeeks * config.weeklyPrice) + (remainingDays * config.basePrice));
  }
  
  // Two week combinations
  if (nights >= 14 && config.twoWeekPrice) {
    const fullTwoWeeks = Math.floor(nights / 14);
    const remainingNights = nights % 14;
    options.push((fullTwoWeeks * config.twoWeekPrice) + calculateOptimalPrice(remainingNights, config));
  }
  
  // Three week combinations (only for mid season)
  if (nights >= 21 && config.threeWeekPrice) {
    const fullThreeWeeks = Math.floor(nights / 21);
    const remainingNights = nights % 21;
    options.push((fullThreeWeeks * config.threeWeekPrice) + calculateOptimalPrice(remainingNights, config));
  }
  
  // Monthly combinations
  if (nights >= 30 && config.monthlyPrice) {
    const fullMonths = Math.floor(nights / 30);
    const remainingNights = nights % 30;
    options.push((fullMonths * config.monthlyPrice) + calculateOptimalPrice(remainingNights, config));
  }
  
  return Math.min(...options);
}

function getSeason(date: Date): Season {
  const month = date.getMonth();
  
  // High season: July - August (months 6-7)
  if (month === 6 || month === 7) {
    return Season.High;
  }
  
  // Mid season: April, May, June, September (months 3, 4, 5, 8)
  if (month === 3 || month === 4 || month === 5 || month === 8) {
    return Season.Mid;
  }
  
  // Low season: January, February, March, October, November, December (months 0, 1, 2, 9, 10, 11)
  if (month === 0 || month === 1 || month === 2 || month === 9 || month === 10 || month === 11) {
    return Season.Low;
  }
  
  // Fallback (shouldn't happen)
  return Season.Low;
}



// Mixed season pricing calculation
function calculateMixedSeasonPrice(startDate: Date, endDate: Date, totalNights: number): PriceDetails | null {
  let totalBasePrice = 0;
  let currentDate = new Date(startDate);
  const endDateTime = endDate.getTime();
  
  const seasonParts: Array<{season: Season, nights: number, price: number, isSpecialRate?: boolean, month: number, startDate: Date}> = [];
  
  while (currentDate.getTime() < endDateTime) {
    const currentSeason = getSeason(currentDate);
    const currentConfig = seasonConfigs[currentSeason];
    const partStartDate = new Date(currentDate);
    
    // Find end of current season or end of booking
    let seasonEndDate = new Date(currentDate);
    let nightsInSeason = 0;
    
    while (seasonEndDate.getTime() < endDateTime && getSeason(seasonEndDate) === currentSeason) {
      seasonEndDate.setDate(seasonEndDate.getDate() + 1);
      nightsInSeason++;
    }
    
    // Calculate price for this season part using new pricing structure
    let seasonPrice = 0;
    let isSpecialRate = false;
    
    // Use the most cost-effective pricing option for the number of nights
    if (nightsInSeason >= 30 && currentConfig.monthlyPrice) {
      // Monthly rate (if available and >= 30 nights)
      const fullMonths = Math.floor(nightsInSeason / 30);
      const remainingNights = nightsInSeason % 30;
      seasonPrice = (fullMonths * currentConfig.monthlyPrice) + calculateOptimalPrice(remainingNights, currentConfig);
      isSpecialRate = fullMonths > 0;
    } else {
      seasonPrice = calculateOptimalPrice(nightsInSeason, currentConfig);
    }
    
    seasonParts.push({
      season: currentSeason, 
      nights: nightsInSeason, 
      price: seasonPrice,
      isSpecialRate,
      month: partStartDate.getMonth(),
      startDate: partStartDate
    });
    totalBasePrice += seasonPrice;
    
    currentDate = new Date(seasonEndDate);
  }
  
  // Create season breakdown for display with clear month names
  const monthNames = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 
                     'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
  
  const seasonBreakdown = seasonParts.map(part => {
    let displayName: string;
    let pricePerNight: number;
    const monthName = monthNames[part.month];
    const config = seasonConfigs[part.season];
    
    if (part.isSpecialRate) {
      displayName = `${monthName} (${config.name.toLowerCase()} - speciale tarieven)`;
      pricePerNight = Math.round(part.price / part.nights);
    } else {
      displayName = `${monthName} (${config.name.toLowerCase()})`;
      pricePerNight = Math.round(part.price / part.nights);
    }
    
    return {
      season: part.season as 'high' | 'mid' | 'low' | 'unavailable',
      nights: part.nights,
      pricePerNight,
      totalPrice: part.price,
      name: displayName
    };
  });
  
  const finalPrice = totalBasePrice;
  const totalPrice = finalPrice + CLEANING_FEE;
  
  return {
    pricePerNight: Math.round(totalBasePrice / totalNights), // Average price per night
    totalNights,
    basePrice: finalPrice,
    cleaningFee: CLEANING_FEE,
    securityDeposit: SECURITY_DEPOSIT,
    discount: undefined,
    totalPrice,
    season: 'mixed',
    seasonBreakdown
  };
}

// NO DISCOUNTS
function calculateDiscount(): { percentage: number; reason: string } | null {
  return null;
}

function calculatePrice(startDate: Date, endDate: Date): PriceDetails | null {
  if (!startDate || !endDate) return null;

  const totalNights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  if (totalNights <= 0) return null;

  // Check if booking spans multiple seasons
  const startSeason = getSeason(startDate);
  const endSeason = getSeason(new Date(endDate.getTime() - 24 * 60 * 60 * 1000)); // Check day before end date
  
  // If spanning multiple seasons, use mixed pricing
  if (startSeason !== endSeason) {
    return calculateMixedSeasonPrice(startDate, endDate, totalNights);
  }
  
  // Single season booking
  const season = startSeason;
  const config = seasonConfigs[season];
  
  let basePrice = 0;
  
  // Calculate pricing using the most cost-effective option
  basePrice = calculateOptimalPrice(totalNights, config);

  const pricePerNight = config.basePrice;
  
  // Calculate discount
  const discountInfo = calculateDiscount();
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
  
  // No special messages needed

  return {
    pricePerNight,
    totalNights,
    basePrice: finalPrice,
    cleaningFee: CLEANING_FEE,
    securityDeposit: SECURITY_DEPOSIT,
    discount,
    totalPrice,
    season: season as 'high' | 'mid' | 'low' | 'unavailable'
  };
}

const priceDetails = computed<PriceDetails | null>(() => {
  if (!selectedDates.value || selectedDates.value.length !== 2) return null;
  
  const result = calculatePrice(selectedDates.value[0], selectedDates.value[1]);
  
  // Track pricing calculation when valid result is obtained
  if (result) {
    trackPricingCalculation({
      check_in_date: selectedDates.value[0].toISOString().split('T')[0],
      check_out_date: selectedDates.value[1].toISOString().split('T')[0],
      nights: result.totalNights,
      guests: 2, // Default value, actual guests selected in form
      total_price: result.totalPrice,
      season: result.season,
      booking_type: result.season === 'mixed' ? 'mixed' : 
                   result.season === 'high' ? 'high_season' : 
                   result.season === 'mid' ? 'mid_season' : 'low_season'
    });
  }
  
  return result;
});



const handleMinimumNightsError = (errorDetails: { selected: number; minimum: number; season: string; }) => {
  // Special handling for booked dates between selection
  if (errorDetails.season === 'Er zijn geboekte datums binnen de geselecteerde periode') {
    $q.notify({
      type: 'negative',
      message: 'De geselecteerde periode bevat al geboekte datums. Kies een andere periode zonder geboekte datums ertussen.',
      position: 'top',
      timeout: 6000,
      actions: [{ label: 'OK', color: 'white', handler: () => {} }]
    });
    return;
  }
  
  $q.notify({
    type: 'negative',
    message: `${errorDetails.season}: minimaal ${errorDetails.minimum} nachten vereist. Je hebt ${errorDetails.selected} ${errorDetails.selected === 1 ? 'nacht' : 'nachten'} geselecteerd.`,
    position: 'top',
    timeout: 6000,
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