<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section relative">
      <q-img
        src="/images/Tuin_zwembad.jpg"
        class="absolute-full"
        style="min-height: 600px"
      >
        <div class="absolute-full bg-gradient" style="background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))"></div>
        <div class="absolute-full flex flex-center column q-px-md">
          <div class="text-center text-white" style="max-width: 800px;">
            <h1 class="text-h2 font-playfair q-mb-xl" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.4); line-height: 1.3;">
              Reserveer je Verblijf
            </h1>
            <p class="text-h5 q-mb-none font-poppins" style="max-width: 700px; margin: 0 auto; line-height: 1.8; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); opacity: 0.95;">
              Plan je perfecte vakantie in ons mediterrane familiehuis met privézwembad en geniet van een onvergetelijk verblijf in l'Alfàs del Pi
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container q-pa-xl">
        <div class="row justify-center q-col-gutter-xl">
          <div class="col-12 col-md-10 col-lg-8 text-center">
            <h2 class="text-h3 font-playfair q-mb-lg text-primary">Plan je Verblijf</h2>
            <p class="text-h6 text-grey-8" style="line-height: 1.8; max-width: 800px; margin: 0 auto;">
              Kies je ideale vakantieperiode in ons mediterrane vakantiehuis. We hanteren eerlijke prijzen en 
              een persoonlijke benadering. Bekijk direct de beschikbaarheid en tarieven.
            </p>
          </div>
        </div>

        <div class="row justify-center q-mt-xl q-col-gutter-lg">
          <div class="col-12 col-sm-6 col-md-4">
            <div class="feature-card">
              <div class="feature-icon">
                <q-icon name="calendar_today" size="32px" color="white" />
              </div>
              <div class="feature-content">
                <h6 class="text-h6 q-mb-sm font-playfair">Flexibele Data</h6>
                <p class="text-body1 text-grey-8 q-mb-none">Minimaal verblijf van 5-7 nachten. Aankomst vanaf 16:00 uur, vertrek voor 10:00 uur.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-sm-6 col-md-4">
            <div class="feature-card">
              <div class="feature-icon">
                <q-icon name="euro" size="32px" color="white" />
              </div>
              <div class="feature-content">
                <h6 class="text-h6 q-mb-sm font-playfair">Transparante Prijzen</h6>
                <p class="text-body1 text-grey-8 q-mb-none">Duidelijke tarieven inclusief eindschoonmaak, linnen en alle voorzieningen. Geen verborgen kosten.</p>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-sm-6 col-md-4">
            <div class="feature-card">
              <div class="feature-icon">
                <q-icon name="support_agent" size="32px" color="white" />
              </div>
              <div class="feature-content">
                <h6 class="text-h6 q-mb-sm font-playfair">Persoonlijke Service</h6>
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
            <div class="calendar-wrapper bg-white rounded-borders q-pa-lg">
              <h3 class="text-h4 font-playfair q-mb-lg text-center">Selecteer je Data</h3>
              <div v-if="loading" class="text-center q-pa-xl">
                <q-spinner-dots color="primary" size="40px" />
                <p class="text-subtitle1 q-mt-sm">Beschikbaarheid laden...</p>
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
                class="full-width q-mt-lg"
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
              <h4 class="text-h6 font-playfair q-mb-sm">Selecteer je Data</h4>
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
            <div class="feature-card q-pa-xl bg-white rounded-borders">
              <h3 class="text-h4 font-playfair q-mb-xl text-primary">Goed om te Weten</h3>
              <div class="row q-col-gutter-lg">
                <div class="col-12">
                  <div v-for="(info, index) in importantInfo" :key="index" class="feature-item q-mb-lg">
                    <div class="row items-center no-wrap">
                      <div class="col-auto">
                        <q-icon name="check_circle" color="terracotta" size="24px" class="q-mr-md" />
                      </div>
                      <div class="col">
                        <span class="text-subtitle1 text-weight-medium">{{ info }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- For Who -->
          <div class="col-12 col-md-6">
            <div class="feature-card q-pa-xl bg-white rounded-borders">
              <h3 class="text-h4 font-playfair q-mb-xl text-primary">Voor wie is Casa Mi Sueño?</h3>
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
                    <h4 class="text-h6 font-playfair q-mb-md">Borg & Betalingen</h4>
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
            <div class="feature-card q-pa-xl bg-white rounded-borders">
              <h3 class="text-h4 font-playfair q-mb-xl text-primary">Inbegrepen Services</h3>
              <div class="row q-col-gutter-xl">
                <div class="col-12 col-sm-6">
                  <div v-for="(service, index) in includedServices.slice(0, 4)" :key="index" class="feature-item q-mb-lg">
                    <div class="row items-center no-wrap">
                      <div class="col-auto">
                        <q-icon name="check_circle" color="positive" size="24px" class="q-mr-md" />
                      </div>
                      <div class="col">
                        <span class="text-subtitle1 text-weight-medium">{{ service }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6">
                  <div v-for="(service, index) in includedServices.slice(4)" :key="index" class="feature-item q-mb-lg">
                    <div class="row items-center no-wrap">
                      <div class="col-auto">
                        <q-icon name="check_circle" color="positive" size="24px" class="q-mr-md" />
                      </div>
                      <div class="col">
                        <span class="text-subtitle1 text-weight-medium">{{ service }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Costs -->
          <div class="col-12 col-md-6">
            <div class="feature-card q-pa-xl bg-white rounded-borders">
              <h3 class="text-h4 font-playfair q-mb-xl text-primary">Extra Kosten</h3>
              <div class="row q-col-gutter-lg">
                <div class="col-12">
                  <div v-for="(cost, index) in additionalCosts" :key="index" class="feature-item q-mb-lg">
                    <div class="row items-center no-wrap">
                      <div class="col-auto">
                        <q-icon name="info" color="terracotta" size="24px" class="q-mr-md" />
                      </div>
                      <div class="col">
                        <span class="text-subtitle1 text-weight-medium">{{ cost }}</span>
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
              <h4 class="text-h5 font-playfair q-mb-md">Persoonlijke Service</h4>
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
              <h4 class="text-h5 font-playfair q-mb-md">Voor Rustzoekers</h4>
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
              <h4 class="text-h5 font-playfair q-mb-md">Comfortabel Verblijf</h4>
              <p class="text-body1 text-grey-8" style="line-height: 1.6;">
                Geniet van alle comfort en voorzieningen die ons huis te bieden heeft.
                We zorgen ervoor dat het je aan niets ontbreekt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Combined Call to Action & Contact Form -->
    <section id="contact-form" class="section bg-white">
      <div class="container q-pa-xl">
        <div class="row justify-center q-mb-xl">
          <div class="col-12 col-md-8 text-center">
            <h2 class="text-h3 font-playfair q-mb-lg text-primary">Klaar om te Boeken?</h2>
            <p class="text-h6 text-grey-8" style="line-height: 1.6;">
              Vul het formulier hieronder in en we helpen je graag verder met het plannen van je droomvakantie.
            </p>
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
import ContactForm from '../components/ContactForm.vue';

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
  if (!dates.value?.[0] || !dates.value?.[1]) {
    $q.notify({
      type: 'warning',
      message: 'Selecteer eerst je gewenste verblijfsdata'
    });
    return;
  }

  // Format dates for URL in a more readable way
  const formatDateForUrl = (date: Date) => {
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  // Navigate to contact form with dates
  router.push({
    name: 'booking',
    hash: '#contact-form',
    query: {
      from: formatDateForUrl(dates.value[0]),
      to: formatDateForUrl(dates.value[1])
    }
  });

  // Scroll to contact form
  setTimeout(() => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
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
  height: 500px;
  position: relative;
  overflow: hidden;
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
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  border: 1px solid #e9ecef;
}

.calendar-container {
  width: 100%;
  overflow: hidden;
  
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
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
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

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);

    .feature-icon {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(var(--cms-deep-terracotta-rgb), 0.2);
    }
  }
}

.feature-icon {
  background: var(--cms-deep-terracotta);
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(var(--cms-deep-terracotta-rgb), 0.15);
}

.feature-content {
  flex: 1;
  
  h6 {
    color: var(--cms-gray-900);
    transition: color 0.3s ease;
  }
  
  p {
    line-height: 1.6;
  }
}

.feature-highlight {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
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

  .feature-card {
    padding: 1.5rem !important;
  }
}

.contact-form-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  overflow: hidden;
}
</style> 