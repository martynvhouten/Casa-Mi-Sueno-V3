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
import { trackPricingCalculation } from 'src/utils/analytics';

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
  Regular = 'regular',
  Winter = 'winter',
  Unavailable = 'unavailable'
}

interface SeasonConfig {
  basePrice: number;
  weeklyPrice: number;
  monthlyPrice?: number;
  minNights: number;
  minMonths?: number;
  name: string;
}

const seasonConfigs: Record<Season, SeasonConfig> = {
  [Season.Regular]: {
    basePrice: 160,
    weeklyPrice: 1120, // 7 * 160
    minNights: 10,
    name: 'Reguliere verhuur'
  },
  [Season.Winter]: {
    basePrice: 40, // €1200/month = €40/day
    weeklyPrice: 280,
    monthlyPrice: 1200,
    minNights: 28, // Hele maand minimum (28 dagen = kortste maand)
    minMonths: 1,
    name: 'Overwinteren'
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



function getSeason(date: Date): Season {
  const month = date.getMonth();
  
  // December: not available for rental
  if (month === 11) {
    return Season.Unavailable;
  }
  
  // Winter/Overwinteren season: November, January, February, March
  if (month === 10 || month === 0 || month === 1 || month === 2) {
    return Season.Winter;
  }
  
  // Regular rental: April through October
  if (month >= 3 && month <= 9) {
    return Season.Regular;
  }
  
  // Fallback (shouldn't happen)
  return Season.Unavailable;
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
    
    // Calculate price for this season part
    let seasonPrice = 0;
    let isSpecialRate = false;
    
    if (currentSeason === Season.Winter) {
      // For winter parts in mixed seasons, check if this covers a complete winter month
      const currentMonth = partStartDate.getMonth();
      const currentYear = partStartDate.getFullYear();
      
      // Calculate the 1st and last day of this winter month
      const monthStart = new Date(currentYear, currentMonth, 1);
      
      // Check if this winter month part covers the complete available month
      
      // For a complete winter month overwinter price, we need:
      // 1. Overall booking starts on/before 1st of month  
      // 2. For November: checkout on 30 Nov (since Dec unavailable) OR later 
      // 3. For other winter months: checkout on 1st of next month OR later
      
             // For November: accept checkout on 30 Nov as complete month (since Dec unavailable)
       // For other winter months: checkout on 1st of next month = complete month
       const isCompleteMonth = currentMonth === 10 
         ? (startDate.getTime() <= monthStart.getTime() && endDate.getTime() >= new Date(currentYear, 10, 30).getTime())
         : (startDate.getTime() <= monthStart.getTime() && endDate.getTime() >= new Date(currentYear, currentMonth + 1, 1).getTime());
      
      if (isCompleteMonth) {
        // Complete winter month covered: use special monthly rate
        seasonPrice = currentConfig.monthlyPrice!;
        isSpecialRate = true;
      } else {
        // Partial month: use regular daily rate (€160/night)
        seasonPrice = nightsInSeason * seasonConfigs[Season.Regular].basePrice;
      }
    } else {
      // Regular season calculation
      const fullWeeks = Math.floor(nightsInSeason / 7);
      const remainingDays = nightsInSeason % 7;
      seasonPrice = (fullWeeks * currentConfig.weeklyPrice) + (remainingDays * currentConfig.basePrice);
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
    
    if (part.season === Season.Winter && part.isSpecialRate) {
      displayName = `${monthName} (hele maand - overwinteren)`;
      pricePerNight = Math.round(part.price / part.nights); // Show actual price per night
    } else if (part.season === Season.Winter && !part.isSpecialRate) {
      displayName = `${monthName} (gedeeltelijk - regulier tarief)`;
      pricePerNight = seasonConfigs[Season.Regular].basePrice; // Show regular daily rate
    } else {
      displayName = `${monthName} (regulier tarief)`;
      pricePerNight = seasonConfigs[part.season].basePrice;
    }
    
    return {
      season: part.season as 'regular' | 'winter' | 'unavailable',
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
  
  // Calculate pricing based on season
  if (season === Season.Winter) {
    // For winter season, check if it's a complete month for special pricing
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();
    
    // Complete month: check based on which winter month this is
    const monthStart = new Date(startYear, startMonth, 1);
    
         // For November: accept checkout on 30 Nov as complete month (since Dec unavailable)
     // For other winter months: checkout on 1st of next month = complete month  
     const isCompleteMonth = startMonth === 10 
       ? (startDate.getTime() <= monthStart.getTime() && endDate.getTime() >= new Date(startYear, 10, 30).getTime())
       : (startDate.getTime() <= monthStart.getTime() && endDate.getTime() >= new Date(startYear, startMonth + 1, 1).getTime());
    
    if (isCompleteMonth) {
      // Complete winter month: use special monthly rate
      basePrice = config.monthlyPrice!;
    } else {
      // Partial winter month: use regular daily rate
      basePrice = totalNights * seasonConfigs[Season.Regular].basePrice;
    }
  } else {
    // Regular season pricing
    const fullWeeks = Math.floor(totalNights / 7);
    const remainingDays = totalNights % 7;
    
    // Use weekly rate for full weeks, daily rate for remaining days
    basePrice = (fullWeeks * config.weeklyPrice) + (remainingDays * config.basePrice);
    
    // If it's all daily pricing (less than 7 nights), use daily rate
    if (fullWeeks === 0) {
      basePrice = totalNights * config.basePrice;
    }
  }

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
    season: season as 'regular' | 'winter' | 'unavailable'
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
                   result.season === 'winter' ? 'overwinter' : 'regular'
    });
  }
  
  return result;
});



const handleMinimumNightsError = (errorDetails: { selected: number; minimum: number; season: string; }) => {
  // Special handling for December (unavailable period)
  if (errorDetails.season === 'December niet beschikbaar') {
    $q.notify({
      type: 'negative',
      message: 'December is niet beschikbaar voor verhuur. Kies een datum in een andere maand.',
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