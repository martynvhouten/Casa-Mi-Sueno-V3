<template>
  <div class="booking-calendar">
    <div class="calendar-container q-pa-md q-pa-sm-xl">
      <!-- Calendar Header -->
      <div class="calendar-header q-mb-xl">
        <h4 class="text-h4 font-playfair text-center q-mb-md">Beschikbaarheid & Prijzen</h4>
      </div>

      <div class="row q-col-gutter-xl">
        <!-- Calendar -->
        <div class="col-12 col-lg-7">
          <div class="calendar-wrapper q-pa-lg rounded-borders bg-white shadow-3">
            <div class="text-subtitle1 text-weight-medium q-mb-sm">Selecteer uw verblijfsperiode</div>
            <q-date
              v-model="dateRange"
              range
              mask="YYYY-MM-DD"
              :min="new Date().toISOString().split('T')[0]"
              :max="maxDate"
              :options="availableDatesFilter"
              :navigation-min-year-month="new Date().toISOString().slice(0, 7)"
              :navigation-max-year-month="maxDate.toISOString().slice(0, 7)"
              today-btn
              multiple-months
              :months="2"
              flat
              bordered
              class="full-width"
              @update:model-value="handleDateRangeSelect"
              :locale="dutchLocale"
            />

            <div class="text-caption q-mt-md text-grey-8">
              * Minimaal verblijf: {{ getMinNights() }} nachten in deze periode
            </div>
          </div>
        </div>

        <!-- Booking Details -->
        <div class="col-12 col-lg-5">
          <div class="booking-details q-pa-lg rounded-borders bg-white shadow-3">
            <template v-if="checkInDate && checkOutDate">
              <h5 class="text-h5 font-playfair q-mb-lg">Uw Selectie</h5>
              
              <div class="selected-dates q-mb-xl">
                <div class="date-row q-mb-md">
                  <div class="date-icon">
                    <q-icon name="login" class="text-cms-deep-terracotta" size="24px" />
                  </div>
                  <div class="date-content">
                    <div class="text-subtitle1 text-weight-medium">Check-in</div>
                    <div class="text-body1">{{ formatDate(checkInDate) }}</div>
                  </div>
                </div>
                <div class="date-row">
                  <div class="date-icon">
                    <q-icon name="logout" class="text-cms-deep-terracotta" size="24px" />
                  </div>
                  <div class="date-content">
                    <div class="text-subtitle1 text-weight-medium">Check-out</div>
                    <div class="text-body1">{{ formatDate(checkOutDate) }}</div>
                  </div>
                </div>
              </div>

              <div class="price-details bg-sand q-pa-lg rounded-borders q-mb-xl">
                <div class="price-row q-mb-md">
                  <span class="text-subtitle1">Aantal nachten</span>
                  <span class="text-subtitle1 text-weight-medium">{{ calculateNights() }}</span>
                </div>
                <div class="price-row q-mb-md">
                  <span class="text-subtitle1">Prijs per nacht</span>
                  <span class="text-subtitle1 text-weight-medium">€{{ getPriceForDate(checkInDate) }}</span>
                </div>
                <div class="price-row q-mb-md">
                  <span class="text-subtitle1">Subtotaal verblijf</span>
                  <span class="text-subtitle1 text-weight-medium">{{ calculateSubtotal() }}</span>
                </div>
                <div class="price-row q-mb-md">
                  <span class="text-subtitle1">Schoonmaakkosten</span>
                  <span class="text-subtitle1 text-weight-medium">€{{ CLEANING_FEE }}</span>
                </div>
                <div class="price-row q-mb-md">
                  <div class="flex items-center">
                    <span class="text-subtitle1">Toeristenbelasting</span>
                    <q-icon 
                      name="info"
                      size="16px"
                      class="q-ml-sm cursor-pointer text-grey-7"
                    >
                      <q-tooltip>
                        €{{ TOURIST_TAX }} per persoon per nacht
                      </q-tooltip>
                    </q-icon>
                  </div>
                  <span class="text-subtitle1 text-weight-medium">{{ calculateTouristTax() }}</span>
                </div>
                
                <template v-if="hasEarlyBookingDiscount">
                  <q-separator class="q-my-lg" />
                  <div class="price-row text-positive q-mb-md">
                    <span class="text-subtitle1">Early booking korting (10%)</span>
                    <span class="text-subtitle1 text-weight-medium">-{{ calculateDiscount() }}</span>
                  </div>
                </template>

                <q-separator class="q-my-lg" />
                <div class="price-row total">
                  <span class="text-h6">Totaalprijs</span>
                  <span class="text-h6 text-cms-deep-terracotta">{{ calculateTotalPrice() }}</span>
                </div>
              </div>

              <div class="booking-actions">
                <q-btn
                  unelevated
                  color="cms-deep-terracotta"
                  class="full-width booking-button"
                  :to="{ name: 'contact', query: { dates: formatDateRange() }}"
                >
                  <div class="column items-center">
                    <span class="text-subtitle1 q-mb-xs">Reservering aanvragen</span>
                    <span class="text-caption">Minimaal {{ getMinNights() }} nachten in deze periode</span>
                  </div>
                </q-btn>
              </div>
            </template>

            <template v-else>
              <div class="empty-state text-center q-pa-xl">
                <q-icon name="calendar_today" size="64px" class="text-grey-5 q-mb-lg" />
                <h6 class="text-h6 font-playfair q-mb-md">Selecteer uw data</h6>
                <p class="text-grey-8">
                  Selecteer uw check-in en check-out datum om de beschikbaarheid en totaalprijs te bekijken.
                  Het minimale verblijf is {{ MIN_NIGHTS.default }} nachten, in juli en augustus {{ MIN_NIGHTS.peak }} nachten.
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <q-inner-loading :showing="loading">
      <q-spinner-dots size="50px" color="cms-deep-terracotta" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

interface DateLocale {
  days: string[];
  daysShort: string[];
  months: string[];
  monthsShort: string[];
  firstDayOfWeek: number;
  format24h: boolean;
  headerTitle: (date: Date, model: any) => string;
  headerSubtitle: (date: Date) => string;
  pluralDay: string;
  today: string;
}

// Add Dutch locale configuration
const dutchLocale: DateLocale = {
  days: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
  daysShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
  months: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
  firstDayOfWeek: 1,
  format24h: true,
  headerTitle(date: Date, model: any) {
    if (model?.mode === 'months' || model?.mode === 'years') {
      return new Date(date).getFullYear().toString();
    }
    return `${this.months[date.getMonth()]} ${date.getFullYear()}`;
  },
  headerSubtitle(date: Date) {
    return this.days[date.getDay()];
  },
  pluralDay: 'Dagen',
  today: 'Vandaag'
};

interface ApiResponse {
  geboekte_datum: string;
  [key: string]: unknown;
}

interface DateRange {
  from: string;
  to: string;
}

const dateRange = ref<DateRange>({ from: '', to: '' });
const bookedDates = ref<string[]>([]);
const loading = ref<boolean>(false);

// Computed properties for easier access to selected dates
const checkInDate = computed(() => dateRange.value.from || null);
const checkOutDate = computed(() => dateRange.value.to || null);

const MIN_NIGHTS = {
  default: 10,
  peak: 14 // July and August
};

const PRICES = {
  low: 165,    // Nov-Mar
  mid: 195,    // Apr, May, Oct
  high: 225,    // Jun, Sep
  peak: 275    // Jul, Aug
};

const CLEANING_FEE = 75;
const TOURIST_TAX = 2.50; // per person per night

// Calculate max date (2 years from now)
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 2);

// Filter available dates
const availableDatesFilter = (dateStr: string) => {
  return !bookedDates.value.includes(dateStr);
};

// Handle date range selection
const handleDateRangeSelect = (value: DateRange) => {
  if (!value.from || !value.to) return;

  const start = new Date(value.from);
  const end = new Date(value.to);
  const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const minNights = getMinNights();

  // Check for minimum stay requirement
  if (nights < minNights) {
    $q.notify({
      type: 'negative',
      message: `Het minimale verblijf in deze periode is ${minNights} nachten.`,
      position: 'top',
      timeout: 5000
    });
    dateRange.value = { from: '', to: '' };
    return;
  }

  // Check for booked dates within range
  let hasBookedDates = false;
  const currentDate = new Date(start);
  while (currentDate < end) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (bookedDates.value.includes(dateStr)) {
      hasBookedDates = true;
      break;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (hasBookedDates) {
    $q.notify({
      type: 'negative',
      message: 'De geselecteerde periode bevat reeds geboekte data.',
      position: 'top',
      timeout: 5000
    });
    dateRange.value = { from: '', to: '' };
    return;
  }

  dateRange.value = value;
};

// Calculate price per night based on date
const getPriceForDate = (dateStr: string): number => {
  const month = new Date(dateStr).getMonth() + 1; // 1-12

  if (month >= 7 && month <= 8) return PRICES.peak;        // Jul-Aug
  if (month === 6 || month === 9) return PRICES.high;      // Jun, Sep
  if (month === 4 || month === 5 || month === 10) return PRICES.mid; // Apr-May, Oct
  return PRICES.low; // Nov-Mar
};

// Get minimum nights for the selected period
const getMinNights = (): number => {
  if (!checkInDate.value) return MIN_NIGHTS.default;
  const month = new Date(checkInDate.value).getMonth() + 1;
  return (month >= 7 && month <= 8) ? MIN_NIGHTS.peak : MIN_NIGHTS.default;
};

// Format a single date
const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format date range for URL
const formatDateRange = (): string => {
  if (!checkInDate.value || !checkOutDate.value) return '';
  return `${checkInDate.value} tot ${checkOutDate.value}`;
};

// Calculate number of nights
const calculateNights = (): number => {
  if (!checkInDate.value || !checkOutDate.value) return 0;
  return Math.round(
    (new Date(checkOutDate.value).getTime() - new Date(checkInDate.value).getTime()) / (1000 * 60 * 60 * 24)
  );
};

// Calculate subtotal before fees and discounts
const calculateSubtotal = (): string => {
  if (!checkInDate.value || !checkOutDate.value) return '€0';
  
  const nights = calculateNights();
  let totalPrice = 0;
  const currentDate = new Date(checkInDate.value);
  
  for (let i = 0; i < nights; i++) {
    totalPrice += getPriceForDate(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return `€${Math.round(totalPrice).toLocaleString('nl-NL')}`;
};

// Calculate tourist tax
const calculateTouristTax = (): string => {
  const nights = calculateNights();
  const tax = TOURIST_TAX * 8 * nights; // Assuming max occupancy
  return `€${Math.round(tax).toLocaleString('nl-NL')}`;
};

// Check if eligible for early booking discount
const hasEarlyBookingDiscount = computed(() => {
  if (!checkInDate.value) return false;
  
  const bookingDate = new Date();
  const checkIn = new Date(checkInDate.value);
  const monthsDiff = (checkIn.getFullYear() - bookingDate.getFullYear()) * 12 + 
                    (checkIn.getMonth() - bookingDate.getMonth());
  
  return monthsDiff >= 6;
});

// Calculate early booking discount amount
const calculateDiscount = (): string => {
  if (!hasEarlyBookingDiscount.value) return '€0';
  
  const subtotal = parseFloat(calculateSubtotal().replace('€', '').replace('.', '').replace(',', '.'));
  const discount = subtotal * 0.1;

  return `€${Math.round(discount).toLocaleString('nl-NL')}`;
};

// Calculate total price
const calculateTotalPrice = (): string => {
  if (!checkInDate.value || !checkOutDate.value) return '€0';
  
  const subtotal = parseFloat(calculateSubtotal().replace('€', '').replace('.', '').replace(',', '.'));
  const touristTax = parseFloat(calculateTouristTax().replace('€', '').replace('.', '').replace(',', '.'));
  let total = subtotal + CLEANING_FEE + touristTax;
  
  if (hasEarlyBookingDiscount.value) {
    const discount = parseFloat(calculateDiscount().replace('€', '').replace('.', '').replace(',', '.'));
    total -= discount;
  }

  return `€${Math.round(total).toLocaleString('nl-NL')}`;
};

// Fetch booked dates from Google Sheet via SheetBest API
const fetchBookedDates = async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await fetch('https://api.sheetbest.com/sheets/821c7f96-b3a5-4916-b146-7aaee27c6076');
    if (!response.ok) {
      throw new Error('Failed to fetch booked dates');
    }
    const data = await response.json() as ApiResponse[];
    
    // Filter and format the dates
    bookedDates.value = data
      .map((row: ApiResponse) => {
        let date = row.geboekte_datum;
        
        // Handle different date formats
        if (date.includes('-')) {
          // Handle DD-MM-YYYY format
          if (date.match(/^\d{2}-\d{2}-\d{4}$/)) {
            const [day, month, year] = date.split('-');
            date = `${year}-${month}-${day}`;
          }
        }
        
        // Ensure date is in YYYY-MM-DD format
        return new Date(date).toISOString().split('T')[0];
      })
      .filter((date: string) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate >= new Date();
      });

    console.log('Fetched booked dates:', bookedDates.value);
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    $q.notify({
      type: 'negative',
      message: 'Er is een fout opgetreden bij het ophalen van de geboekte data.',
      position: 'top',
      timeout: 5000
    });
    bookedDates.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBookedDates();
});
</script>

<style lang="scss">
.booking-calendar {
  .calendar-wrapper {
    background: white;
    border-radius: 12px;
    overflow: hidden;

    :deep() {
      .q-date {
        box-shadow: none;
        background: transparent;

        &__content {
          width: 100%;
    }

        &__calendar-item {
          &.q-date__calendar-item--range {
            background: var(--cms-deep-terracotta);
      opacity: 0.3;
    }
          &.q-date__calendar-item--selected {
            background: var(--cms-deep-terracotta) !important;
            color: white;
          }
          &.q-date__calendar-item--disabled {
        color: #d1d5db;
        text-decoration: line-through;
        text-decoration-thickness: 1.5px;
            opacity: 0.5;
    }
  }

        &__calendar-days-container {
          min-height: 285px;
        }

        &__calendar {
          width: 100%;
          min-width: unset;
        }

        &__months-container {
          width: 100%;
          gap: 24px;
        }
      }
    }
  }

  .date-row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .total {
    font-weight: 600;
      }

  .booking-button {
    padding: 1rem;
  }
}
</style>