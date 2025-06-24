<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_zwembad.jpg"
      alt-text="Zwembad en tuin van het vakantiehuis"
      title="Reserveer je verblijf"
      subtitle="Plan je perfecte vakantie in ons mediterrane familiehuis met privézwembad en geniet van een onvergetelijk verblijf in l'Alfàs del Pi"
    />

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container q-pa-xl">
        <div class="row justify-center q-col-gutter-xl">
          <div class="col-12 col-md-10 col-lg-8 text-center">
            <h2 class="text-h3 font-playfair q-mb-lg text-primary">Plan je verblijf</h2>
            <p class="text-h6 text-grey-8" style="line-height: 1.8; max-width: 800px; margin: 0 auto;">
              Kies je ideale vakantieperiode in ons mediterrane vakantiehuis. We hanteren eerlijke prijzen en 
              een persoonlijke benadering. Bekijk direct de beschikbaarheid en tarieven.
            </p>
          </div>
        </div>

        <div class="row justify-center q-mt-xl q-col-gutter-lg">
          <div class="col-12 col-sm-6 col-md-4">
            <div class="intro-feature-card">
              <div class="feature-icon bg-primary">
                <q-icon name="calendar_today" size="32px" color="white" />
              </div>
              <div class="feature-content">
                <h6 class="text-h6 q-mb-sm font-playfair text-primary">Flexibele data</h6>
                <p class="text-body1 text-grey-8 q-mb-none">Minimaal verblijf van 5-7 nachten. Aankomst vanaf 16:00 uur, vertrek voor 10:00 uur.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-sm-6 col-md-4">
            <div class="intro-feature-card">
              <div class="feature-icon bg-primary">
                <q-icon name="euro" size="32px" color="white" />
              </div>
              <div class="feature-content">
                <h6 class="text-h6 q-mb-sm font-playfair text-primary">Transparante prijzen</h6>
                <p class="text-body1 text-grey-8 q-mb-none">Duidelijke tarieven inclusief eindschoonmaak, linnen en alle voorzieningen. Geen verborgen kosten.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-sm-6 col-md-4">
            <div class="intro-feature-card">
              <div class="feature-icon bg-primary">
                <q-icon name="support_agent" size="32px" color="white" />
              </div>
              <div class="feature-content">
                <h6 class="text-h6 q-mb-sm font-playfair text-primary">Persoonlijke service</h6>
                <p class="text-body1 text-grey-8 q-mb-none">Direct contact met ons als eigenaren en een lokale contactpersoon voor tijdens je verblijf.</p>
              </div>
            </div>
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
            <div class="calendar-wrapper" :class="{ 'mobile': isMobile }">
              <h3 class="text-h4 font-playfair q-mb-lg text-center">Selecteer je data</h3>
              <div v-if="loading" class="text-center q-pa-xl">
                <q-spinner-dots color="primary" size="40px" />
                <p class="text-subtitle1 q-mt-sm">Beschikbaarheid laden...</p>
              </div>
              <div v-else class="calendar-container">
                <Datepicker
                  v-model="dates"
                  range
                  inline
                  auto-apply
                  :multi-calendars="!isMobile"
                  :min-date="today"
                  :disabled-dates="bookedDates"
                  :enable-time-picker="false"
                  :columns="calendarColumns"
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
                <div class="calendar-legend q-mt-lg">
                  <div class="legend-item">
                    <span class="legend-color today-dot"></span>
                    <span class="text-subtitle2">Vandaag</span>
                  </div>
                  <div class="legend-item">
                    <span class="legend-color selected-range"></span>
                    <span class="text-subtitle2">Geselecteerd</span>
                  </div>
                  <div class="legend-item">
                    <span class="legend-color booked-day-legend"></span>
                    <span class="text-subtitle2">Geboekt</span>
                  </div>
                </div>
                <div v-if="showLongStayMessage" class="long-stay-message q-mt-lg">
                  <q-banner class="bg-accent text-white" style="background: rgba(38, 70, 83, 0.9) !important; border-radius: 8px;">
                    <template v-slot:avatar>
                      <q-icon name="info" color="white" />
                    </template>
                    <span class="text-weight-medium">Voor verblijven langer dan 3 weken maken we graag een speciale prijsafspraak. Neem gerust contact op.</span>
                  </q-banner>
                </div>
              </div>
            </div>
          </div>

          <!-- Cost Summary -->
          <div class="col-12 col-lg-4">
            <div class="cost-summary-card" v-if="priceDetails">
              <h4 class="text-h5 font-playfair q-mb-lg">Kostenoverzicht</h4>
              
              <!-- Base Price -->
              <div class="price-row q-mb-md">
                <span class="text-subtitle1">Basis prijs per nacht</span>
                <span class="text-subtitle1 text-weight-medium">€{{ priceDetails.pricePerNight.toLocaleString('nl-NL') }}</span>
              </div>
              
              <!-- Number of Nights -->
              <div class="price-row q-mb-md">
                <span class="text-subtitle1">Aantal nachten</span>
                <span class="text-subtitle1 text-weight-medium">{{ priceDetails.totalNights }}</span>
              </div>

              <!-- Base Total -->
              <div class="price-row q-mb-md">
                <span class="text-subtitle1">Subtotaal</span>
                <span class="text-subtitle1 text-weight-medium">€{{ priceDetails.basePrice.toLocaleString('nl-NL') }}</span>
              </div>

              <!-- Short Stay Surcharge if applicable -->
              <div v-if="priceDetails.shortStaySurcharge > 0" class="price-row q-mb-md">
                <span class="text-subtitle1">Toeslag kort verblijf</span>
                <span class="text-subtitle1 text-weight-medium">€{{ priceDetails.shortStaySurcharge.toLocaleString('nl-NL') }}</span>
              </div>

              <!-- Total -->
              <div class="price-row total-row q-mt-lg q-pb-lg">
                <span class="text-h6 text-weight-bold">Totaal</span>
                <span class="text-h6 text-weight-bold text-primary">€{{ priceDetails.totalPrice.toLocaleString('nl-NL') }}</span>
              </div>

              <q-btn
                color="primary"
                :label="`Reserveer voor €${priceDetails.totalPrice.toLocaleString('nl-NL')}`"
                class="cms-btn cms-btn-cta full-width q-mt-lg"
                @click="goToContact"
                unelevated
                size="lg"
              />
              
              <div class="text-caption text-grey-7 text-center q-mt-sm">
                * Exclusief borg (€500) en toeristenbelasting
              </div>
            </div>
            <div v-else class="cost-summary-card text-center">
              <q-icon name="event" size="48px" color="grey-4" class="q-mb-md" />
              <h4 class="text-h6 font-playfair q-mb-sm">Selecteer je data</h4>
              <p class="text-body1 text-grey-7">Kies je in- en uitcheckdatum in de kalender om de totaalprijs te zien.</p>
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
            <div class="feature-card">
              <h3 class="text-h4 font-playfair text-primary">Goed om te weten</h3>
              <div class="row q-col-gutter-lg">
                <div class="col-12">
                  <div v-for="(info, index) in importantInfo" :key="index" class="feature-item">
                    <div class="row items-center no-wrap">
                      <div class="col-auto">
                        <q-icon name="check_circle" color="terracotta" size="20px" />
                      </div>
                      <div class="col">
                        <span class="text-weight-medium">{{ info }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- For Who -->
          <div class="col-12 col-md-6">
            <div class="feature-card">
              <h3 class="text-h4 font-playfair text-primary">Voor wie is Casa Mi Sueño?</h3>
              <p class="text-subtitle1 q-mb-xl" style="line-height: 1.8;">
                Ons huis is perfect voor gasten die houden van rust, natuur en authenticiteit. 
                We verhuren graag aan koppels, families of kleine groepen vrienden die onze liefde 
                voor deze bijzondere plek delen.
              </p>
              <div class="bg-sand rounded-borders q-pa-xl" style="border: 1px solid rgba(0,0,0,0.05);">
                <div class="row items-center q-col-gutter-lg">
                  <div class="col-auto">
                    <q-icon name="security" color="terracotta" size="48px" />
                  </div>
                  <div class="col">
                    <h4 class="text-h6 font-playfair q-mb-md">Borg & betalingen</h4>
                    <p class="text-body1 q-mb-sm">
                      • Borg: €500 (teruggestort binnen 5-7 werkdagen na vertrek)
                    </p>
                    <p class="text-body1 q-mb-none">
                      • Aanbetaling: 30% bij reservering<br>
                      • Restbetaling: 8 weken voor aankomst
                    </p>
                  </div>
                </div>
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
            <div class="feature-card">
              <h3 class="text-h4 font-playfair text-primary">Inbegrepen services</h3>
              <div class="row q-col-gutter-xl">
                <div class="col-12 col-sm-6">
                  <div v-for="(service, index) in includedServices.slice(0, 4)" :key="index" class="feature-item">
                    <div class="row items-center no-wrap">
                      <div class="col-auto">
                        <q-icon name="check_circle" color="positive" size="20px" />
                      </div>
                      <div class="col">
                        <span class="text-weight-medium">{{ service }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6">
                  <div v-for="(service, index) in includedServices.slice(4)" :key="index" class="feature-item">
                    <div class="row items-center no-wrap">
                      <div class="col-auto">
                        <q-icon name="check_circle" color="positive" size="20px" />
                      </div>
                      <div class="col">
                        <span class="text-weight-medium">{{ service }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Costs -->
          <div class="col-12 col-md-6">
            <div class="feature-card">
              <h3 class="text-h4 font-playfair text-primary">Extra kosten</h3>
              <div class="row q-col-gutter-lg">
                <div class="col-12">
                  <div v-for="(cost, index) in additionalCosts" :key="index" class="feature-item">
                    <div class="row items-center no-wrap">
                      <div class="col-auto">
                        <q-icon name="info" color="terracotta" size="20px" />
                      </div>
                      <div class="col">
                        <span class="text-weight-medium">{{ cost }}</span>
                      </div>
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
            <div class="text-center feature-box">
              <div class="icon-wrapper q-mb-lg">
                <q-icon name="support_agent" size="48px" color="terracotta" />
              </div>
              <h4 class="text-h5 font-playfair q-mb-md">Persoonlijke service</h4>
              <p class="text-body1 text-grey-8" style="line-height: 1.6;">
                We delen graag onze lokale tips en helpen je bij het plannen
                van je verblijf. Voel je thuis in ons huis.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="text-center feature-box">
              <div class="icon-wrapper q-mb-lg">
                <q-icon name="groups" size="48px" color="terracotta" />
              </div>
              <h4 class="text-h5 font-playfair q-mb-md">Voor rustzoekers</h4>
              <p class="text-body1 text-grey-8" style="line-height: 1.6;">
                Ons huis is perfect voor wie houdt van rust en authenticiteit. 
                Ideaal voor koppels, families of kleine groepen vrienden.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="text-center feature-box">
              <div class="icon-wrapper q-mb-lg">
                <q-icon name="home" size="48px" color="terracotta" />
              </div>
              <h4 class="text-h5 font-playfair q-mb-md">Comfortabel verblijf</h4>
              <p class="text-body1 text-grey-8" style="line-height: 1.6;">
                Geniet van alle comfort en voorzieningen die ons huis te bieden heeft.
                We zorgen ervoor dat het je aan niets ontbreekt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="section bg-white">
      <div class="container q-pa-xl">
        <!-- Show this when no dates are selected -->
        <div v-if="!dates.length" class="row justify-center q-mb-xl">
          <div class="col-12 col-md-8 text-center">
            <h2 class="text-h3 font-playfair q-mb-lg text-primary">Plan je verblijf</h2>
            <p class="text-h6 text-grey-8" style="line-height: 1.6;">
              Selecteer je gewenste data in de kalender hierboven om de beschikbaarheid en prijzen te bekijken.
            </p>
            <q-btn
              flat
              color="primary"
              class="q-mt-md"
              icon="arrow_upward"
              label="Bekijk kalender"
              @click="scrollToCalendar"
            />
          </div>
        </div>

        <!-- Show booking form when dates are selected -->
        <div v-else>
        <div class="row justify-center q-mb-xl">
          <div class="col-12 col-md-8 text-center">
              <h2 class="text-h3 font-playfair q-mb-lg text-primary">Klaar om te boeken?</h2>
            <p class="text-h6 text-grey-8" style="line-height: 1.6;">
              Vul het formulier hieronder in en we helpen je graag verder met het plannen van je droomvakantie.
            </p>
              <div class="selected-dates q-mt-md">
                <q-chip
                  color="primary"
                  text-color="white"
                  icon="event"
                >
                  {{ formatDateRange(dates[0], dates[1]) }}
                </q-chip>
                <q-chip
                  color="accent"
                  text-color="white"
                  icon="euro"
                >
                  {{ priceDetails ? `€${priceDetails.totalPrice.toLocaleString('nl-NL')}` : '' }}
                </q-chip>
              </div>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-12 col-md-10">
            <div class="contact-form-wrapper">
              <ContactForm :selected-dates="dates" />
              </div>
            </div>
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
import { fetchBookedDates } from '../utils/googleSheets';
import type { BookedDate } from '../utils/googleSheets';
import ContactForm from '../components/ContactForm.vue';
import HeroSection from 'src/components/HeroSection.vue';

const $q = useQuasar();

// Add date formatting function
const formatDateRange = (start: Date, end: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  const startStr = start.toLocaleDateString('nl-NL', options);
  const endStr = end.toLocaleDateString('nl-NL', options);
  return `${startStr} - ${endStr}`;
};

const scrollToCalendar = () => {
  const element = document.querySelector('.calendar-wrapper');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

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
const isMobile = computed(() => $q.screen.lt.sm);
const calendarColumns = computed(() => isMobile.value ? 1 : 2);

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
      $q.notify({
        type: 'warning',
        message: 'Geen beschikbaarheidsdata gevonden.',
        position: 'top',
      });
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
    $q.notify({
      type: 'negative',
      message: 'Fout bij ophalen van geboekte data. Probeer het later opnieuw.',
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

    // Show success notification with price
    $q.notify({
      type: 'positive',
      message: `Prijs voor ${formatDateRange(start, end)}: €${priceDetails.totalPrice.toLocaleString('nl-NL')}`,
      position: 'top',
      timeout: 3000
    });
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
  if (!dates.value?.[0] || !dates.value?.[1]) {
    $q.notify({
      type: 'warning',
      message: 'Selecteer eerst je gewenste verblijfsdata'
    });
    return;
  }

  // Scroll to contact form
    const element = document.getElementById('contact-form');
    if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

<style lang="scss" scoped>
.hero-section {
  position: relative;
  height: 60vh;
  min-height: 500px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5));
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 1;
}

.section {
  padding: 5rem 0;
  margin: 0;
}

.bg-sand {
  background-color: #fdf6ec;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.calendar-wrapper {
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  
  &.mobile {
    padding: 1rem;
    background-color: white;
    box-shadow: none;
    
    .calendar-container {
      padding: 0;
      background-color: transparent;
      
      :deep(.dp__calendar_header) {
        padding: 8px 12px;
        font-size: 0.9rem;
      }
      
      :deep(.dp__month_year_row) {
        margin: 8px 0 16px;
        padding: 8px;
        
        button {
          font-size: 1rem;
        }
      }
      
      :deep(.dp__cell_inner) {
        font-size: 0.9rem;
      }
    }
    
    .calendar-legend {
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;
      margin-top: 1rem;
      justify-content: flex-start;
      
      .legend-item {
        font-size: 0.9rem;
        
        .legend-color {
          width: 20px;
          height: 20px;
        }
      }
    }
}

.calendar-container {
  width: 100%;
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    
    :deep(.dp__main) {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      
      @media (max-width: 599px) {
        flex-direction: column;
        gap: 0;
      }
    }
    
    :deep(.dp__calendar_wrap) {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      display: flex;
      gap: 1rem;
      
      @media (max-width: 599px) {
        flex-direction: column;
        gap: 0;
      }
    }
    
    :deep(.dp__calendar) {
      flex: 1;
      min-width: 0;
      
      @media (max-width: 599px) {
        width: 100% !important;
      }
    }
    
    :deep(.dp__instance_calendar) {
      width: 100% !important;
      min-width: 0 !important;
    }

    :deep(.dp__month_year_row) {
      width: 100% !important;
    }

    :deep(.dp__calendar_header) {
      width: 100% !important;
    }

    :deep(.dp__calendar_row) {
      width: 100% !important;
      justify-content: space-between;
      padding: 0 0.5rem;
      margin: 0;
      
      @media (max-width: 599px) {
        padding: 0 0.25rem;
      }
    }

    :deep(.dp__calendar_item) {
      flex: 1;
  display: flex;
      justify-content: center;
      min-width: auto;
      padding: 0;
      margin: 2px;
      
      @media (max-width: 599px) {
        margin: 1px;
      }
    }
  }
}

.airbnb-style-calendar {
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  --dp-font-family: inherit;
  --dp-border-radius: 12px;
  --dp-cell-border-radius: 50%;
  --dp-day-width: 40px;
  --dp-day-height: 40px;
  --dp-row-margin: 8px 0;
  --dp-selected-date-color: #fff;
  --dp-selected-date-bg-color: var(--q-primary);
  --dp-hover-color: var(--q-primary);
  --dp-hover-bg-color: rgba(var(--q-primary-rgb), 0.1);
  --dp-disabled-color: #ffffff;
  --dp-disabled-color-text: #ffffff;
  --dp-disabled-bg-color: #ff6b6b;
  --dp-primary-color: var(--q-primary);
  --dp-menu-border-radius: 12px;
  --dp-border-color: #e0e0e0;
  --dp-menu-min-width: none;
  --dp-menu-max-width: none;
  background-color: #ffffff;
  
  @media (max-width: 599px) {
    --dp-day-width: 35px;
    --dp-day-height: 35px;
  }
  
  :deep(.dp__calendar_header) {
    padding: 12px 24px;
    font-weight: 600;
    color: var(--q-primary);
    font-size: 1rem;
    background-color: rgba(var(--q-primary-rgb), 0.03);
    margin-bottom: 1rem;
  border-radius: 8px;
}
  
  :deep(.dp__month_year_row) {
    margin: 16px 0 24px;
    padding: 0 16px;
    background-color: rgba(var(--q-primary-rgb), 0.02);
    border-radius: 8px;
    padding: 0.5rem;

    button {
      font-weight: 600;
      color: var(--q-primary);
      font-size: 1.1rem;
    }
  }

  :deep(.dp__today) {
    border: 2px solid var(--q-primary);
    font-weight: 600;
    background-color: rgba(var(--q-primary-rgb), 0.05);
    
    &:hover {
      background-color: rgba(var(--q-primary-rgb), 0.1);
    }
  }

  :deep(.dp__cell_inner) {
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba(var(--q-primary-rgb), 0.1);
      transform: scale(1.1);
    }
  }

  :deep(.dp__range_start),
  :deep(.dp__range_end) {
    background-color: var(--q-primary) !important;
    color: #ffffff !important;
    font-weight: 600;
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(var(--q-primary-rgb), 0.3);
    
    &:hover {
      transform: scale(1.15);
    }
  }

  :deep(.dp__range_between) {
    background-color: rgba(var(--q-primary-rgb), 0.1) !important;
    color: var(--q-primary) !important;
    font-weight: 500;
    
    &:hover {
      background-color: rgba(var(--q-primary-rgb), 0.15) !important;
    }
  }
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(var(--q-primary-rgb), 0.03);
  border-radius: 12px;

.legend-item {
  display: flex;
  align-items: center;
    gap: 0.75rem;

.legend-color {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
      
      &:hover {
        transform: scale(1.1);
      }

  &.today-dot {
        border: 2.5px solid var(--q-primary);
        background: transparent;
  }

  &.selected-range {
        background-color: var(--q-primary);
  }

  &.booked-day-legend {
        background-color: var(--dp-disabled-bg-color);
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 140%;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }

    span {
      font-weight: 500;
      color: var(--q-primary);
    }
  }
}

.cost-summary-card {
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e9ecef;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  background: white;
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

.intro-feature-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
    width: 48px;
    height: 48px;
    min-width: 48px;
    border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
    
    .q-icon {
      font-size: 24px;
    }
    
    &:hover {
      transform: scale(1.1);
    }
}

.feature-content {
  flex: 1;
  
  h6 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    transition: color 0.3s ease;
      line-height: 1.4;
    }
    
    p {
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 0;
      color: var(--q-dark);
    }
  }
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h3 {
    margin-bottom: 2rem;
  }

  .feature-item {
    margin-bottom: 1.25rem;
    
    &:last-child {
      margin-bottom: 0;
    }

    .row {
      align-items: center;
    }

    .q-icon {
      margin-right: 1rem;
      font-size: 20px;
    }

    span {
      line-height: 1.5;
      font-size: 0.95rem;
    }
  }

  // Adjust text size in the "Voor wie" section
  p.text-subtitle1 {
    font-size: 0.95rem;
  }

  // Adjust text in the payment info box
  .bg-sand {
    p.text-body1 {
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
}

.feature-box {
  padding: 2rem;
  height: 100%;
  transition: all 0.3s ease;

  .icon-wrapper {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

  &:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
  }

  h4 {
    margin-bottom: 1rem;
  }

  p {
    color: var(--q-dark);
    line-height: 1.6;
    margin: 0;
  }
}

// Responsive styles
@media (max-width: 1023px) {
  .section {
    padding: 3rem 0;
  }

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

  .feature-box {
    margin-bottom: 2rem;
  }
}

@media (max-width: 599px) {
  .hero-section {
    height: 400px;
  }

  .section {
    padding: 3rem 0;
  }

  .intro-feature-card {
    padding: 1.25rem;
    gap: 0.875rem;
    
    .feature-icon {
      width: 40px;
      height: 40px;
      min-width: 40px;
      border-radius: 10px;
      
      .q-icon {
        font-size: 20px;
      }
    }
    
    .feature-content {
      h6 {
        font-size: 1rem;
        margin-bottom: 0.375rem;
      }
      
      p {
        font-size: 0.9rem;
      }
    }
  }
}

.contact-form-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  overflow: hidden;
}

.bg-light-beige {
  background-color: #fcf9f6;  // Lighter than sand color for better distinction
}

.selected-dates {
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  .q-chip {
    font-size: 1rem;
  }
}
</style> 