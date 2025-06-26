<template>
  <div class="calendar-wrapper" :class="{ 'mobile': isMobile }">
    <!-- Live region for screen reader announcements -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      {{ calendarAnnouncement }}
    </div>
    
    <h3 class="text-h4 font-playfair q-mb-lg text-center">Selecteer je data</h3>
    <div v-if="loading" class="text-center q-pa-xl">
      <div class="branded-calendar-spinner"></div>
      <p class="text-subtitle1 q-mt-sm">Beschikbaarheid laden...</p>
    </div>
    <div v-else class="calendar-container">
      <div class="season-info q-mb-md text-center">
        <q-chip
          color="primary"
          text-color="white"
          icon="info"
        >
          {{ currentSeasonInfo }}
        </q-chip>
      </div>
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
        :calendar-cell-class-name="getCellClassName"
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

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { fetchBookedDates } from 'src/utils/googleSheets';

interface CalendarCell {
  value: Date;
}

enum Season {
  High = 'high',
  Mid = 'mid',
  Low = 'low',
  Holiday = 'holiday'
}

interface SeasonConfig {
  minNights: number;
  name: string;
}

const seasonConfigs: Record<Season, SeasonConfig> = {
  [Season.High]: {
    minNights: 7,
    name: 'Hoogseizoen'
  },
  [Season.Mid]: {
    minNights: 5,
    name: 'Middenseizoen'
  },
  [Season.Low]: {
    minNights: 7,
    name: 'Laagseizoen'
  },
  [Season.Holiday]: {
    minNights: 7,
    name: 'Vakantieperiode'
  }
};

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

const currentSeason = computed(() => getSeason(new Date()));

const currentSeasonInfo = computed(() => {
  const config = seasonConfigs[currentSeason.value];
  return `${config.name}: minimaal ${config.minNights} nachten`;
});

function isDateDisabled(date: Date): boolean {
  const dateString = date.toISOString().split('T')[0];
  
  // Check if date is booked
  if (bookedDates.value.includes(dateString)) {
    return true;
  }

  // If it's a potential check-in date, no special restrictions for check-in days
  if (!dates.value || dates.value.length === 0) {
    return false;
  }

  // If start date is selected, enforce minimum stay
  if (dates.value.length === 1) {
    const startDate = dates.value[0];
    const season = getSeason(startDate);
    const config = seasonConfigs[season];
    
    const diffDays = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < config.minNights) {
      return true;
    }
  }

  return false;
}

function getCellClassName(cell: CalendarCell): string {
  if (isDateDisabled(cell.value)) {
    return 'dp__disabled';
  }
  return '';
}

const showLongStayMessage = computed(() => {
  if (!dates.value || dates.value.length !== 2) return false;
  const totalNights = Math.ceil((dates.value[1].getTime() - dates.value[0].getTime()) / (1000 * 60 * 60 * 24));
  return totalNights > 21;
});

function handleDateSelect(value: Date[] | null) {
  dates.value = value;
  emit('update:modelValue', value);
  
  if (value && value.length === 2) {
    const totalNights = Math.ceil((value[1].getTime() - value[0].getTime()) / (1000 * 60 * 60 * 24));
    if (totalNights > 21) {
      emit('long-stay');
    }
  }
}

const props = defineProps<{
  modelValue: Date[] | null;
}>();

const emit = defineEmits(['update:modelValue', 'long-stay']);

const dates = ref<Date[] | null>(props.modelValue);
const loading = ref(true);
const bookedDates = ref<string[]>([]);
const calendarAnnouncement = ref('');
const $q = useQuasar();

const isMobile = computed(() => $q.screen.lt.md);
const today = computed(() => new Date());
const calendarColumns = computed(() => (isMobile.value ? 1 : 2));

// Watch for date changes and announce to screen readers
watch(dates, (newDates) => {
  if (newDates && newDates.length === 2) {
    const formatDate = (date: Date) => new Intl.DateTimeFormat('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
    
    const diffTime = Math.abs(newDates[1].getTime() - newDates[0].getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    calendarAnnouncement.value = `Geselecteerd: ${formatDate(newDates[0])} tot ${formatDate(newDates[1])}, ${diffDays} nachten`;
  } else if (newDates && newDates.length === 1) {
    const formatDate = (date: Date) => new Intl.DateTimeFormat('nl-NL', {
      day: 'numeric',
      month: 'long'
    }).format(date);
    
    calendarAnnouncement.value = `Aankomstdatum geselecteerd: ${formatDate(newDates[0])}. Selecteer nu je vertrekdatum.`;
  }
}, { immediate: true });

watch(showLongStayMessage, (isLongStay) => {
  if (isLongStay) {
    emit('long-stay');
    calendarAnnouncement.value = 'Verblijf langer dan 4 weken geselecteerd. Voor speciale prijzen neem contact op.';
  }
});

watch(() => props.modelValue, (newDates) => {
  dates.value = newDates;
});

onMounted(async () => {
  try {
    calendarAnnouncement.value = 'Beschikbaarheid wordt geladen...';
    const fetchedBookedDates = await fetchBookedDates();
    bookedDates.value = fetchedBookedDates.map(d => d.geboekte_datum.toISOString().split('T')[0]);
    calendarAnnouncement.value = 'Kalender geladen. Selecteer je aankomst- en vertrekdatum.';
  } catch (error) {
    console.error('Failed to load booked dates:', error);
    calendarAnnouncement.value = 'Fout bij laden van beschikbaarheid. Probeer het later opnieuw.';
    $q.notify({
      type: 'negative',
      message: 'Kon de beschikbaarheid niet laden. Probeer het later opnieuw.'
    });
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  background: white;
  padding: 2.5rem;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  border-radius: 16px;
  border: 1px solid rgba(231, 111, 81, 0.1);
  
  &.mobile {
    padding: 1.5rem;
  }

  .calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .airbnb-style-calendar {
    width: 100%;
    display: flex;
    justify-content: center;

    :deep(.dp__main) {
      width: fit-content;
      margin: 0 auto;
      
      // Make calendar larger on desktop/tablet
      @media (min-width: 768px) {
        transform: scale(1.15);
        transform-origin: center;
        margin: 2rem auto;
      }
      
      @media (min-width: 1024px) {
        transform: scale(1.25);
        margin: 3rem auto;
      }
    }
  }

  .calendar-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: 700px;
    margin: 2rem auto 0;
    padding: 1.5rem;
    background: rgba(248, 249, 250, 0.8);
    border-radius: 12px;
    border: 1px solid rgba(231, 111, 81, 0.1);
    
    @media (max-width: 768px) {
      gap: 1rem;
      margin-top: 1rem;
      padding: 1rem;
      .legend-item {
        font-size: 0.9rem;
      }
    }
  }
}

.calendar-container {
  width: 100%;
}

.airbnb-style-calendar {
  font-family: 'Poppins', sans-serif;
  
  :deep(.dp__main) {
    font-size: 16px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(231, 111, 81, 0.15);
  }
  
  // Calendar header styling
  :deep(.dp__calendar_header) {
    font-weight: 600;
    color: var(--cms-deep-terracotta);
    background: linear-gradient(135deg, #fdf2f0 0%, #fcf8f7 100%);
    padding: 1rem;
    border-bottom: 2px solid rgba(231, 111, 81, 0.1);
  }
  
  :deep(.dp__calendar_header_item) {
    color: var(--cms-deep-terracotta);
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.75rem 0;
  }
  
  // Month navigation
  :deep(.dp__month_year_select) {
    color: var(--cms-deep-terracotta);
    font-weight: 700;
    font-size: 1.1rem;
  }
  
  :deep(.dp__prev),
  :deep(.dp__next) {
    color: var(--cms-deep-terracotta);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(231, 111, 81, 0.1);
      transform: scale(1.1);
    }
  }
  
  // Day cells
  :deep(.dp__calendar) {
    background: white;
  }
  
  :deep(.dp__calendar_row) {
    margin: 0;
  }
  
  :deep(.dp__day_num) {
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 8px;
    margin: 2px;
    transition: all 0.2s ease;
    cursor: pointer;
    
    &:hover:not(.dp__disabled) {
      background: rgba(231, 111, 81, 0.1);
      transform: scale(1.05);
    }
  }
  
  // Selected range styling
  :deep(.dp__range_start),
  :deep(.dp__range_end) {
    background: linear-gradient(135deg, var(--cms-deep-terracotta) 0%, #d63031 100%) !important;
    color: white !important;
    border-radius: 8px !important;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(231, 111, 81, 0.3);
    transform: scale(1.05);
  }

  :deep(.dp__range_between) {
    background: linear-gradient(135deg, rgba(231, 111, 81, 0.15) 0%, rgba(231, 111, 81, 0.1) 100%) !important;
    border-radius: 0 !important;
    color: var(--cms-deep-terracotta);
  }

  :deep(.dp__active_date) {
    background: var(--cms-deep-terracotta);
    color: white;
    border-radius: 8px;
    font-weight: 600;
  }

  // Today indicator
  :deep(.dp__today) {
    border: 2px solid var(--cms-light-terracotta);
    border-radius: 8px;
    font-weight: 600;
    color: var(--cms-deep-terracotta);
    background: rgba(231, 111, 81, 0.05);
  }

  // Disabled dates (booked)
  :deep(.dp__disabled) {
    color: #bbb !important;
    background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%) !important;
    text-decoration: line-through;
    cursor: not-allowed;
    border-radius: 8px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6px;
      height: 6px;
      background: #ff6b6b;
      border-radius: 50%;
    }
  }

  // Weekend highlighting
  :deep(.dp__calendar_item:nth-child(7n)),
  :deep(.dp__calendar_item:nth-child(7n-1)) {
    .dp__day_num:not(.dp__disabled):not(.dp__range_start):not(.dp__range_end):not(.dp__range_between) {
      background: rgba(74, 144, 226, 0.05);
      color: #4a90e2;
    }
  }
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.legend-color {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.today-dot {
  border: 2px solid var(--cms-light-terracotta);
  background: rgba(231, 111, 81, 0.05);
}

.selected-range {
  background: linear-gradient(135deg, var(--cms-deep-terracotta) 0%, #d63031 100%);
  border: none;
}

.booked-day-legend {
  background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%);
  border: 1px solid #dcdcdc;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: #ff6b6b;
    border-radius: 50%;
  }
}

.season-info {
  margin-bottom: 1.5rem;
  
  :deep(.q-chip) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Branded loading spinner for calendar
.branded-calendar-spinner {
  width: 64px;
  height: 64px;
  border: 5px solid rgba(231, 111, 81, 0.1);
  border-radius: 50%;
  border-top-color: var(--cms-deep-terracotta);
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(231, 111, 81, 0.2);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// Responsive adjustments
@media (max-width: 767px) {
  .calendar-wrapper {
    .airbnb-style-calendar :deep(.dp__main) {
      transform: none !important;
      margin: 1rem auto !important;
    }
  }
}
</style> 