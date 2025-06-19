<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';

// Types
interface DateRange {
  from: string;
  to: string;
}

interface ApiResponse {
  geboekte_datum: string;
}

const $q = useQuasar();

// Component state
const dateRange = ref<DateRange>({ from: '', to: '' });
const bookedDates = ref<string[]>([]); // Stored in YYYY/MM/DD format
const loading = ref(false);

// Current date handling
const todayStr = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
});

// Maximum date (1 year from now)
const maxDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date;
});

// Navigation limits for the calendar in YYYY/MM format to fix console warnings
const navigationMin = computed(() => todayStr.value.slice(0, 7).replace('-', '/'));
const navigationMax = computed(() => {
  const d = maxDate.value;
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`;
});

// Dutch locale for the calendar
const dutchLocale = {
  days: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
  daysShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
  months: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
};

// Function to disable dates that cannot be selected
const isDateAvailable = (dateStr: string) => { // dateStr is YYYY/MM/DD
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Disable past dates
  if (date < today) return false;

  // Disable dates that are in the bookedDates array
  if (bookedDates.value.includes(dateStr)) return false;

  return true;
};

// Handle date range selection
const handleDateRangeSelect = (range: { from: string, to: string } | null) => {
  if (!range || !range.from || !range.to) {
    dateRange.value = { from: '', to: '' };
    return;
  }

  const start = new Date(range.from);
  const end = new Date(range.to);

  // Check if any date in the range is booked
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const formattedDate = d.toISOString().split('T')[0].replace(/-/g, '/');
    if (bookedDates.value.includes(formattedDate)) {
      $q.notify({
        type: 'negative',
        message: 'Een of meer geselecteerde dagen zijn al geboekt.',
        position: 'top',
        timeout: 5000
      });
      dateRange.value = { from: '', to: '' };
      return;
    }
  }

  // Check minimum nights requirement
  const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const minNights = getMinNights();
  
  if (nights < minNights) {
    $q.notify({
      type: 'negative',
      message: `Minimaal verblijf is ${minNights} nachten in deze periode.`,
      position: 'top',
      timeout: 5000
    });
    dateRange.value = { from: '', to: '' };
    return;
  }

  dateRange.value = range;
};

// Fetch booked dates from Google Sheet
const fetchBookedDates = async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await fetch(import.meta.env.VITE_SHEETBEST_API_URL);
    if (!response.ok) throw new Error('Failed to fetch booked dates');
    
    const data = await response.json() as ApiResponse[];
    
    bookedDates.value = data
      .map((row: ApiResponse) => {
        let date = row.geboekte_datum;
        if (!date) return null;

        if (date.includes('-')) {
          const parts = date.split('-');
          if (parts.length === 3 && parts[0].length === 2) {
            date = `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert DD-MM-YYYY to YYYY-MM-DD
          }
        }
        
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return null;
        
        return parsedDate.toISOString().split('T')[0].replace(/-/g, '/'); // Return as YYYY/MM/DD
      })
      .filter((d): d is string => !!d);

  } catch (error) {
    console.error('Error fetching booked dates:', error);
    $q.notify({
      type: 'negative',
      message: 'Er is een fout opgetreden bij het ophalen van de geboekte data.',
      position: 'top'
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBookedDates();
});

// Computed properties and other methods
const checkInDate = computed(() => dateRange.value?.from || null);
const checkOutDate = computed(() => dateRange.value?.to || null);

const MIN_NIGHTS = { default: 10, peak: 14 };
const PRICES = { low: 165, mid: 195, high: 225, peak: 275 };
const CLEANING_FEE = 75;
const TOURIST_TAX = 2.50;

const getPriceForDate = (dateStr: string): number => {
  const month = new Date(dateStr).getMonth() + 1;
  if (month >= 7 && month <= 8) return PRICES.peak;
  if (month === 6 || month === 9) return PRICES.high;
  if (month === 4 || month === 5 || month === 10) return PRICES.mid;
  return PRICES.low;
};

const getMinNights = (): number => {
  if (!checkInDate.value) return MIN_NIGHTS.default;
  const month = new Date(checkInDate.value).getMonth() + 1;
  return (month >= 7 && month <= 8) ? MIN_NIGHTS.peak : MIN_NIGHTS.default;
};

const formatDate = (dateStr: string): string => new Date(dateStr).toLocaleDateString('nl-NL', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const formatDateRange = (): string => checkInDate.value && checkOutDate.value ? `${checkInDate.value} tot ${checkOutDate.value}` : '';

const calculateNights = (): number => checkInDate.value && checkOutDate.value ? Math.round(
  (new Date(checkOutDate.value).getTime() - new Date(checkInDate.value).getTime()) / (1000 * 60 * 60 * 24)
) : 0;

const calculateSubtotal = (): string => {
  if (!checkInDate.value) return '€0';
  const nights = calculateNights();
  let total = 0;
  const d = new Date(checkInDate.value);
  for (let i = 0; i < nights; i++) {
    total += getPriceForDate(d.toISOString().split('T')[0]);
    d.setDate(d.getDate() + 1);
  }
  return `€${Math.round(total).toLocaleString('nl-NL')}`;
};

const calculateTouristTax = (): string => `€${Math.round(TOURIST_TAX * 8 * calculateNights()).toLocaleString('nl-NL')}`;

const hasEarlyBookingDiscount = computed(() => {
  if (!checkInDate.value) return false;
  const monthsDiff = (new Date(checkInDate.value).getFullYear() - new Date().getFullYear()) * 12 + (new Date(checkInDate.value).getMonth() - new Date().getMonth());
  return monthsDiff >= 6;
});

const calculateDiscount = (): string => {
  if (!hasEarlyBookingDiscount.value) return '€0';
  const subtotal = parseFloat(calculateSubtotal().replace('€', '').replace('.', '').replace(',', '.'));
  return `€${Math.round(subtotal * 0.1).toLocaleString('nl-NL')}`;
};

const calculateTotalPrice = (): string => {
  if (!checkInDate.value) return '€0';
  const subtotal = parseFloat(calculateSubtotal().replace('€', '').replace('.', '').replace(',', '.'));
  const touristTax = parseFloat(calculateTouristTax().replace('€', '').replace('.', '').replace(',', '.'));
  let total = subtotal + CLEANING_FEE + touristTax;
  if (hasEarlyBookingDiscount.value) {
    total -= parseFloat(calculateDiscount().replace('€', '').replace('.', '').replace(',', '.'));
  }
  return `€${Math.round(total).toLocaleString('nl-NL')}`;
};
</script>

<template>
  <div class="booking-calendar">
    <div class="calendar-container q-pa-md q-pa-sm-xl">
      <div class="calendar-header q-mb-xl">
        <h4 class="text-h4 font-playfair text-center q-mb-md">Beschikbaarheid & Prijzen</h4>
      </div>

      <div class="row q-col-gutter-xl">
        <!-- Calendar -->
        <div class="col-12 col-lg-7">
          <div class="calendar-wrapper q-pa-lg rounded-borders bg-white shadow-3">
            <div class="text-subtitle1 text-weight-medium q-mb-sm">Selecteer je verblijfsperiode</div>
            <q-date
              v-model="dateRange"
              range
              mask="YYYY-MM-DD"
              :min="todayStr"
              :max="maxDate.toISOString().split('T')[0]"
              :options="isDateAvailable"
              :events="bookedDates"
              :event-color="'red'"
              :navigation-min-year-month="navigationMin"
              :navigation-max-year-month="navigationMax"
              today-btn
              multiple-months
              :months="2"
              flat
              bordered
              class="full-width"
              @update:model-value="handleDateRangeSelect"
              :locale="dutchLocale"
            />

            <!-- Calendar Legend -->
            <div class="calendar-legend q-mt-lg">
              <div class="legend-item"><div class="legend-color available"></div><span class="text-caption">Beschikbaar</span></div>
              <div class="legend-item"><div class="legend-color selected"></div><span class="text-caption">Geselecteerd</span></div>
              <div class="legend-item"><div class="legend-color booked"></div><span class="text-caption">Bezet</span></div>
            </div>

            <div class="text-caption q-mt-md text-grey-8">
              * Minimaal verblijf: {{ getMinNights() }} nachten in deze periode
            </div>
          </div>
        </div>

        <!-- Booking Details -->
        <div class="col-12 col-lg-5">
          <div class="booking-details q-pa-lg rounded-borders bg-white shadow-3">
            <template v-if="checkInDate && checkOutDate">
              <h5 class="text-h5 font-playfair q-mb-lg">Je Selectie</h5>
              
              <div class="selected-dates q-mb-xl">
                <div class="date-row q-mb-md">
                  <q-icon name="login" class="text-cms-deep-terracotta" size="24px" />
                  <div class="date-content">
                    <div class="text-subtitle1 text-weight-medium">Check-in</div>
                    <div class="text-body1">{{ formatDate(checkInDate) }}</div>
                  </div>
                </div>
                <div class="date-row">
                  <q-icon name="logout" class="text-cms-deep-terracotta" size="24px" />
                  <div class="date-content">
                    <div class="text-subtitle1 text-weight-medium">Check-out</div>
                    <div class="text-body1">{{ formatDate(checkOutDate) }}</div>
                  </div>
                </div>
              </div>

              <div class="price-details bg-sand q-pa-lg rounded-borders q-mb-xl">
                <div class="price-row q-mb-md"><span class="text-subtitle1">Aantal nachten</span><span class="text-subtitle1 text-weight-medium">{{ calculateNights() }}</span></div>
                <div class="price-row q-mb-md"><span class="text-subtitle1">Prijs per nacht</span><span class="text-subtitle1 text-weight-medium">€{{ getPriceForDate(checkInDate) }}</span></div>
                <div class="price-row q-mb-md"><span class="text-subtitle1">Subtotaal verblijf</span><span class="text-subtitle1 text-weight-medium">{{ calculateSubtotal() }}</span></div>
                <div class="price-row q-mb-md"><span class="text-subtitle1">Schoonmaakkosten</span><span class="text-subtitle1 text-weight-medium">€{{ CLEANING_FEE }}</span></div>
                <div class="price-row q-mb-md">
                  <div class="flex items-center">
                    <span class="text-subtitle1">Toeristenbelasting</span>
                    <q-icon name="info" size="16px" class="q-ml-sm cursor-pointer text-grey-7"><q-tooltip>€{{ TOURIST_TAX }} per persoon per nacht</q-tooltip></q-icon>
                  </div>
                  <span class="text-subtitle1 text-weight-medium">{{ calculateTouristTax() }}</span>
                </div>
                
                <template v-if="hasEarlyBookingDiscount">
                  <q-separator class="q-my-lg" />
                  <div class="price-row text-positive q-mb-md"><span class="text-subtitle1">Early booking korting (10%)</span><span class="text-subtitle1 text-weight-medium">-{{ calculateDiscount() }}</span></div>
                </template>

                <q-separator class="q-my-lg" />
                <div class="price-row total"><span class="text-h6">Totaalprijs</span><span class="text-h6 text-cms-deep-terracotta">{{ calculateTotalPrice() }}</span></div>
              </div>

              <div class="booking-actions">
                <q-btn unelevated color="cms-deep-terracotta" class="full-width booking-button" :to="{ name: 'contact', query: { dates: formatDateRange() }}">
                  <div class="column items-center"><span class="text-subtitle1 q-mb-xs">Reservering aanvragen</span><span class="text-caption">Minimaal {{ getMinNights() }} nachten in deze periode</span></div>
                </q-btn>
              </div>
            </template>

            <template v-else>
              <div class="empty-state text-center q-pa-xl">
                <q-icon name="calendar_today" size="64px" class="text-grey-5 q-mb-lg" />
                <h6 class="text-h6 font-playfair q-mb-md">Selecteer je data</h6>
                <p class="text-body1 q-mb-lg">Selecteer je check-in en check-out datum om de beschikbaarheid en totaalprijs te bekijken. Het minimale verblijf is {{ MIN_NIGHTS.default }} nachten, in juli en augustus {{ MIN_NIGHTS.peak }} nachten.</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-dots size="50px" color="cms-deep-terracotta" />
    </q-inner-loading>
  </div>
</template>

<style lang="scss">
.booking-calendar {
  .calendar-wrapper {
    :deep() {
      .q-date__calendar-item {
        position: relative;
        
        &.q-date__calendar-item--selected {
          background: var(--cms-deep-terracotta) !important;
          color: white !important;
        }
        
        &.q-date__calendar-item--out {
          opacity: 0.4;
          pointer-events: none;
        }
      }

      .q-date__calendar-item-today {
        border: 1px solid var(--cms-deep-terracotta);
      }

      // Style for event dates (booked dates)
      .q-date__calendar-item--event {
        cursor: not-allowed !important;
        pointer-events: none !important;
        background: rgba(239, 68, 68, 0.08) !important;
        
        > div {
          text-decoration: line-through !important;
          text-decoration-thickness: 2px !important;
          text-decoration-color: #ef4444 !important;
          color: #9ca3af !important;
        }

        &::after {
          content: "Bezet" !important;
          position: absolute !important;
          bottom: -18px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          font-size: 10px !important;
          color: #ef4444 !important;
          white-space: nowrap !important;
          pointer-events: none !important;
        }
      }

      // Add spacing for the "Bezet" label
      .q-date__calendar-days-container {
        margin-bottom: 20px;
      }
    }
  }

  .calendar-legend {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .legend-color {
        width: 20px;
        height: 20px;
        border-radius: 4px;

        &.available { border: 1px solid #e5e7eb; }
        &.selected { background: var(--cms-deep-terracotta); }
        &.booked {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid #ef4444;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 2px;
            right: 2px;
            height: 2px;
            background: #ef4444;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .date-row { display: flex; align-items: center; gap: 1rem; }
  .price-row { display: flex; justify-content: space-between; align-items: center; }
  .total { font-weight: 600; }
  .booking-button { padding: 1rem; }
}
</style>