<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section relative">
      <q-img
        src="/images/Tuin_zwembad.jpg"
        class="absolute-full"
        style="min-height: 400px"
      >
        <div class="absolute-full bg-black" style="opacity: 0.4"></div>
        <div class="absolute-full flex flex-center column">
          <div class="text-center text-white">
            <h1 class="text-h2 font-playfair q-mb-md">Reserveren</h1>
            <p class="text-h5 q-mb-xl font-poppins">
              Plan je verblijf in ons familiehuis
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container q-pa-xl text-center">
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <h2 class="text-h3 font-playfair q-mb-lg">Boek je vakantie</h2>
            <p class="text-h6 text-grey-8">
              Selecteer je gewenste data in de kalender hieronder. We verhuren alleen aan gasten die ons huis met dezelfde zorg en respect behandelen als wij.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Booking Calendar Section -->
    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <!-- Calendar -->
          <div class="col-12 col-lg-8">
            <div v-if="loading" class="text-center">
              <q-spinner-dots color="primary" size="40px" />
              <p>Beschikbaarheid laden...</p>
            </div>
            <div v-else class="calendar-container">
              <Datepicker
                v-model="dates"
                :key="columns"
                range
                inline
                auto-apply
                multi-calendars
                :min-date="today"
                :disabled-dates="bookedDates"
                :enable-time-picker="false"
                :columns="columns"
                locale="nl"
                :dark="false"
                :clearable="false"
                format="dd MMMM yyyy"
                class="airbnb-style-calendar"
                @update:model-value="handleDateSelect"
                :month-change-on-scroll="false"
                :preset-ranges="false"
                :flow="['calendar']"
                :partial-range="false"
                :prevent-min-max-navigation="false"
                :disable-date="isDateDisabled"
                :calendar-cell-class-name="(cell: CalendarCell) => isDateDisabled(cell.value) ? 'dp__disabled' : ''"
              />
              <div class="calendar-legend q-mt-md">
                <div class="legend-item">
                  <span class="legend-color today-dot"></span>
                  <span>Vandaag</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color selected-range"></span>
                  <span>Geselecteerd</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color booked-day-legend"></span>
                  <span>Geboekt</span>
                </div>
              </div>
              <div v-if="showLongStayMessage" class="long-stay-message q-mt-md">
                <q-banner class="bg-accent text-white" style="background: rgba(38, 70, 83, 0.9) !important">
                  <template v-slot:avatar>
                    <q-icon name="info" color="white" />
                  </template>
                  <span class="text-weight-medium">Voor verblijven langer dan 3 weken maken we graag een speciale prijsafspraak. Neem gerust contact op.</span>
                </q-banner>
              </div>
            </div>
          </div>

          <!-- Cost Summary -->
          <div class="col-12 col-lg-4">
            <div class="cost-summary-card" v-if="priceDetails">
              <h4 class="text-h6 font-playfair q-mb-md">Kostenoverzicht</h4>
              
              <!-- Base Price -->
              <div class="price-row q-mb-sm">
                <span>Basis prijs per nacht</span>
                <span class="text-weight-medium">€{{ priceDetails.pricePerNight.toLocaleString('nl-NL') }}</span>
              </div>
              
              <!-- Number of Nights -->
              <div class="price-row q-mb-sm">
                <span>Aantal nachten</span>
                <span class="text-weight-medium">{{ priceDetails.totalNights }}</span>
              </div>

              <!-- Base Total -->
              <div class="price-row q-mb-sm">
                <span>Subtotaal</span>
                <span class="text-weight-medium">€{{ priceDetails.basePrice.toLocaleString('nl-NL') }}</span>
              </div>

              <!-- Short Stay Surcharge if applicable -->
              <div v-if="priceDetails.shortStaySurcharge > 0" class="price-row q-mb-sm">
                <span>Toeslag kort verblijf</span>
                <span class="text-weight-medium">€{{ priceDetails.shortStaySurcharge.toLocaleString('nl-NL') }}</span>
              </div>

              <!-- Total -->
              <div class="price-row total-row q-mt-md q-pb-md">
                <span class="text-weight-bold">Totaal</span>
                <span class="text-weight-bold text-h6">€{{ priceDetails.totalPrice.toLocaleString('nl-NL') }}</span>
              </div>

              <q-btn
                color="primary"
                :label="`Reserveer voor €${priceDetails.totalPrice.toLocaleString('nl-NL')}`"
                class="full-width q-mt-md"
                @click="goToContact"
                unelevated
              />
            </div>
            <div v-else class="cost-summary-card text-center text-grey-7">
              <h4 class="text-h6 font-playfair q-mb-sm">Selecteer data</h4>
              <p>Kies je in- en uitcheckdatums om de prijs te zien.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="section bg-sand">
      <div class="container q-pa-xl">
        <div class="row q-col-gutter-xl">
          <!-- Important Information -->
          <div class="col-12 col-md-6">
            <div class="feature-card q-pa-xl bg-white rounded-borders">
              <h3 class="text-h4 font-playfair q-mb-xl">Goed om te weten</h3>
              <div class="row q-col-gutter-lg">
                <div class="col-12">
                  <div v-for="(info, index) in importantInfo" :key="index" class="feature-item q-mb-md">
                    <div class="row items-center">
                      <q-icon name="arrow_right" color="terracotta" size="sm" class="q-mr-sm" />
                      <span class="text-subtitle1">{{ info }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- For Who -->
          <div class="col-12 col-md-6">
            <div class="feature-card q-pa-xl bg-white rounded-borders">
              <h3 class="text-h4 font-playfair q-mb-xl">Voor wie is Casa Mi Sueño?</h3>
              <p class="text-subtitle1 q-mb-xl">
                Ons huis is perfect voor gasten die houden van rust, natuur en authenticiteit. 
                We verhuren graag aan koppels, families of kleine groepen vrienden die onze liefde 
                voor deze bijzondere plek delen.
              </p>
              <div class="bg-sand rounded-borders q-pa-lg">
                <h4 class="text-h6 font-playfair q-mb-md">Borg</h4>
                <p class="text-body1 q-mb-none">
                  We vragen een borg van €500, die we na je verblijf terugstorten als alles in goede orde is achtergelaten. 
                  De borg ontvang je binnen 5-7 werkdagen na vertrek terug op je rekening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section bg-white">
      <div class="container q-pa-xl">
        <div class="row q-col-gutter-xl">
          <!-- Included Services -->
          <div class="col-12 col-md-6">
            <div class="feature-card q-pa-xl bg-white rounded-borders">
              <h3 class="text-h4 font-playfair q-mb-xl">Inbegrepen Services</h3>
              <div class="row q-col-gutter-lg">
                <div class="col-12 col-sm-6">
                  <div v-for="(service, index) in includedServices.slice(0, 4)" :key="index" class="feature-item q-mb-md">
                    <div class="row items-center">
                      <q-icon name="check_circle" color="positive" size="sm" class="q-mr-sm" />
                      <span class="text-subtitle1">{{ service }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6">
                  <div v-for="(service, index) in includedServices.slice(4)" :key="index" class="feature-item q-mb-md">
                    <div class="row items-center">
                      <q-icon name="check_circle" color="positive" size="sm" class="q-mr-sm" />
                      <span class="text-subtitle1">{{ service }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Costs -->
          <div class="col-12 col-md-6">
            <div class="feature-card q-pa-xl bg-white rounded-borders">
              <h3 class="text-h4 font-playfair q-mb-xl">Extra Kosten</h3>
              <div class="row q-col-gutter-lg">
                <div class="col-12">
                  <div v-for="(cost, index) in additionalCosts" :key="index" class="feature-item q-mb-md">
                    <div class="row items-center">
                      <q-icon name="info" color="terracotta" size="sm" class="q-mr-sm" />
                      <span class="text-subtitle1">{{ cost }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Icons -->
    <section class="section bg-sand">
      <div class="container q-pa-xl">
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4">
            <div class="text-center">
              <q-icon name="support_agent" size="48px" color="terracotta" class="q-mb-md" />
              <h4 class="text-h5 font-playfair q-mb-md">Persoonlijke Service</h4>
              <p class="text-body1">
                We delen graag onze lokale tips en helpen je bij het plannen
                van je verblijf. Voel je thuis in ons huis.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="text-center">
              <q-icon name="groups" size="48px" color="terracotta" class="q-mb-md" />
              <h4 class="text-h5 font-playfair q-mb-md">Voor Rustzoekers</h4>
              <p class="text-body1">
                Ons huis is perfect voor wie houdt van rust en authenticiteit. 
                Ideaal voor koppels, families of kleine groepen vrienden.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="text-center">
              <q-icon name="home" size="48px" color="terracotta" class="q-mb-md" />
              <h4 class="text-h5 font-playfair q-mb-md">Comfortabel Verblijf</h4>
              <p class="text-body1">
                Geniet van alle comfort en voorzieningen die ons huis te bieden heeft.
                We zorgen ervoor dat het je aan niets ontbreekt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section bg-white">
      <div class="container q-pa-xl text-center">
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <h2 class="text-h3 font-playfair q-mb-lg">Klaar om te boeken?</h2>
            <p class="text-h6 text-grey-8 q-mb-xl">
              Heb je nog vragen of wil je direct reserveren? Neem contact met ons op.
            </p>
            <q-btn
              class="q-px-xl q-py-sm text-subtitle1"
              color="terracotta"
              to="/contact"
              label="Neem contact op"
              unelevated
            />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { fetchBookedDates } from '../utils/googleSheets';
import type { BookedDate } from '../utils/googleSheets';

const router = useRouter();
const $q = useQuasar();

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface PriceDetails {
  basePrice: number;
  shortStaySurcharge: number;
  totalNights: number;
  totalPrice: number;
  isLongStay: boolean;
  pricePerNight: number;
}

interface CalendarCell {
  value: Date;
}

const selectedRange = ref<DateRange>({ start: null, end: null });
const dates = ref<[Date, Date] | []>([]);
const bookedDates = ref<Date[]>([]);
const loading = ref(true);
const showLongStayMessage = ref(false);
const columns = computed(() => ($q.screen.gt.sm ? 2 : 1));

const today = new Date();
today.setHours(0, 0, 0, 0);

// Add a refresh interval for booked dates
let refreshInterval: number | null = null;

// Determine if a date is in high season (May-Sept + July/August)
const isHighSeason = (date: Date): boolean => {
  const month = date.getMonth();
  return month >= 4 && month <= 8; // May (4) through September (8)
};

// Get base price for a specific date
const getBasePrice = (date: Date): number => {
  const month = date.getMonth();
  
  // High season (May-Sept)
  if (isHighSeason(date)) {
    return 225;
  }
  
  // Mid season (Mar, Apr, Oct)
  if ([2, 3, 9].includes(month)) {
    return 185;
  }
  
  // Low season (Jan, Feb, Nov, Dec)
  return 165;
};

const validateDateRange = (start: Date, end: Date): { isValid: boolean; message?: string } => {
  const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
  // Check minimum stay requirements
  if (isHighSeason(start) || isHighSeason(end)) {
    if (nights < 10) {
      return {
        isValid: false,
        message: 'Minimaal 10 nachten in het hoogseizoen'
      };
    }
  } else if (nights < 5) {
    return {
      isValid: false,
      message: 'Minimaal 5 nachten verblijf'
    };
  }

  return { isValid: true };
};

const calculatePriceDetails = (start: Date, end: Date): PriceDetails => {
  const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  let totalPrice = 0;
  let basePrice = 0;
  
  // Calculate total base price
  let currentDate = new Date(start);
  for (let i = 0; i < nights; i++) {
    basePrice += getBasePrice(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate short stay surcharge
  const shortStaySurcharge = (nights >= 5 && nights <= 6) ? nights * 25 : 0;
  
  // Calculate total
  totalPrice = basePrice + shortStaySurcharge;

  return {
    basePrice,
    shortStaySurcharge,
    totalNights: nights,
    totalPrice,
    isLongStay: nights > 21,
    pricePerNight: Math.round(basePrice / nights)
  };
};

const fetchBookedDatesFromSheet = async () => {
  loading.value = true;
  try {
    const dates = await fetchBookedDates();
    
    if (!dates.length) {
      console.warn('No dates returned from sheet');
      return;
    }
    
    // Convert to Date objects and normalize to local midnight
    const processedDates = dates.map((d: BookedDate) => {
      const date = new Date(d.geboekte_datum);
      // Convert UTC date to a local date at midnight to avoid timezone-off-by-one errors.
      const localDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
      return localDate;
    });
    
    bookedDates.value = processedDates;
  } catch (error) {
    console.error('Error in fetchBookedDatesFromSheet:', error);
    $q.notify({
      type: 'negative',
      message: 'Fout bij ophalen van geboekte data.',
      position: 'top',
    });
  } finally {
    loading.value = false;
  }
};

// Refresh booked dates every 5 minutes
onMounted(() => {
  fetchBookedDatesFromSheet();
  refreshInterval = window.setInterval(fetchBookedDatesFromSheet, 5 * 60 * 1000);
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

const isDateDisabled = (date: Date): boolean => {
  if (!date || !bookedDates.value.length) return false;
  
  const testDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  
  return bookedDates.value.some(bookedDate => {
    const compareDateTime = new Date(bookedDate.getFullYear(), bookedDate.getMonth(), bookedDate.getDate()).getTime();
    return testDateTime === compareDateTime;
  });
};

const handleDateSelect = (newDates: [Date, Date] | []) => {
  dates.value = newDates;
  if (newDates.length === 2) {
    const [start, end] = newDates;
    
    // Validate date range
    const validation = validateDateRange(start, end);
    if (!validation.isValid) {
      $q.notify({
        type: 'warning',
        message: validation.message,
        position: 'top',
      });
      selectedRange.value = { start: null, end: null };
      dates.value = [];
      return;
    }

    // Check if any date in the range is booked
    const range = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      range.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const hasBookedDate = range.some(isDateDisabled);
    if (hasBookedDate) {
      $q.notify({
        type: 'negative',
        message: 'Een of meer geselecteerde data zijn niet beschikbaar.',
        position: 'top',
      });
      selectedRange.value = { start: null, end: null };
      dates.value = [];
      return;
    }

    selectedRange.value = { start, end };
    
    // Check for long stay message
    const priceDetails = calculatePriceDetails(start, end);
    showLongStayMessage.value = priceDetails.isLongStay;
  } else {
    selectedRange.value = { start: null, end: null };
    showLongStayMessage.value = false;
  }
};

const priceDetails = computed(() => {
  if (!selectedRange.value.start || !selectedRange.value.end) {
    return null;
  }

  return calculatePriceDetails(
    selectedRange.value.start,
    selectedRange.value.end
  );
});

const goToContact = () => {
  if (!selectedRange.value.start || !selectedRange.value.end) return;

  const from = selectedRange.value.start.toISOString().split('T')[0];
  const to = selectedRange.value.end.toISOString().split('T')[0];

  router.push({
    name: 'contact',
    query: { from, to }
  });
};

const includedServices = [
  'Eindschoonmaak',
  'Bed- en badlinnen',
  'Koffie, thee en basis voorraad',
  'Zwembadonderhoud',
  'Gas, water, elektra & WiFi',
  'Tuinonderhoud',
  'Lokale contactpersoon',
  'Strandlakens'
];

const additionalCosts = [
  'Borg: €500 (krijg je terug)',
  'Toeristenbelasting: €2,50 p.p.p.n.',
  'Extra schoonmaak mogelijk: €75',
  'Huisdieren welkom (graag even overleggen)'
];

const importantInfo = [
  'Minimaal verblijf: 5-7 nachten (zie tarieven)',
  'Geen korte weekendverblijven mogelijk',
  'Aankomst vanaf 16:00 uur',
  'Vertrek voor 10:00 uur',
  'Aanbetaling: 30% bij reservering',
  'Rest: 8 weken voor aankomst',
  'Annuleringsverzekering is handig',
  'Perfect voor koppels en families',
  'Maximaal 4 personen',
  'Geen feesten of evenementen'
];
</script>

<style lang="scss">
.hero-section {
  height: 400px;
  position: relative;
}

.section {
  padding: 4rem 0;
  margin: 0;
}

.bg-sand {
  background-color: #fdf6ec;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.calendar-container {
  width: 100%;
  overflow: hidden;
  margin-bottom: 2rem;
  
  .airbnb-style-calendar {
    width: 100%;
    
    :deep(.dp__instance_calendar) {
      width: 100% !important;
    }
  }
}

.calendar-legend {
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #555;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  display: inline-block;

  &.today-dot {
    border: 2px solid #e76f51;
    background-color: transparent;
  }

  &.selected-range {
    background-color: #e76f51;
    border: none;
  }

  &.booked-day-legend {
    background-color: #e0e0e0;
    border: 1px solid #ccc;
  }
}

.cost-summary-card {
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 2rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.total-row {
  border-top: 1px solid #e0e0e0;
  margin-top: 1rem;
  padding-top: 1rem;
}

.long-stay-message {
  border-radius: 8px;
  overflow: hidden;
}

// Responsive styles
@media (max-width: 1023px) {
  .calendar-container {
    margin-right: 0;
  }
  
  .container {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }

  .cost-summary-card {
    position: static;
    margin-top: 2rem;
  }
}
</style> 