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
      <div v-if="showLongStayMessage" class="long-stay-message q-mt-lg">
        <q-banner class="bg-accent text-white" style="background: rgba(38, 70, 83, 0.9) !important; border-radius: 8px;">
          <template v-slot:avatar>
            <q-icon name="info" color="white" />
          </template>
          <span class="text-weight-medium">Voor verblijven langer dan 4 weken maken we graag een speciale prijsafspraak. Neem gerust contact op.</span>
        </q-banner>
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
  Low = 'low'
}

interface SeasonConfig {
  minNights: number;
  requiresSaturday: boolean;
  name: string;
}

const seasonConfigs: Record<Season, SeasonConfig> = {
  [Season.High]: {
    minNights: 7,
    requiresSaturday: true,
    name: 'Hoogseizoen'
  },
  [Season.Mid]: {
    minNights: 5,
    requiresSaturday: false,
    name: 'Middenseizoen'
  },
  [Season.Low]: {
    minNights: 3,
    requiresSaturday: false,
    name: 'Laagseizoen'
  }
};

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

const currentSeason = computed(() => getSeason(new Date()));

const currentSeasonInfo = computed(() => {
  const config = seasonConfigs[currentSeason.value];
  let info = `${config.name}: minimaal ${config.minNights} nachten`;
  if (config.requiresSaturday) {
    info += ', aankomst op zaterdag';
  }
  return info;
});

function isValidCheckInDay(date: Date): boolean {
  const season = getSeason(date);
  if (season === Season.High) {
    return date.getDay() === 6; // Saturday
  }
  return true;
}

function isDateDisabled(date: Date): boolean {
  const dateString = date.toISOString().split('T')[0];
  
  // Check if date is booked
  if (bookedDates.value.includes(dateString)) {
    return true;
  }

  // If it's a potential check-in date
  if (!dates.value || dates.value.length === 0) {
    return !isValidCheckInDay(date);
  }

  // If start date is selected, enforce minimum stay and Saturday check-out in high season
  if (dates.value.length === 1) {
    const startDate = dates.value[0];
    const season = getSeason(startDate);
    const config = seasonConfigs[season];
    
    const diffDays = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < config.minNights) {
      return true;
    }

    if (config.requiresSaturday && date.getDay() !== 6) {
      return true;
    }
  }

  return false;
}

function getCellClassName(cell: CalendarCell): string {
  if (isDateDisabled(cell.value)) {
    return 'dp__disabled';
  }
  if (isValidCheckInDay(cell.value) && (!dates.value || dates.value.length === 0)) {
    return 'checkin-available';
  }
  return '';
}

const showLongStayMessage = computed(() => {
  if (!dates.value || dates.value.length !== 2) return false;
  const diffTime = Math.abs(dates.value[1].getTime() - dates.value[0].getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 28;
});

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

const handleDateSelect = (modelData: Date[] | null) => {
  if (modelData && modelData.length === 2) {
    const startDate = modelData[0];
    const endDate = modelData[1];
    const season = getSeason(startDate);
    const config = seasonConfigs[season];
    
    const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < config.minNights) {
      calendarAnnouncement.value = `Minimum verblijf van ${config.minNights} nachten niet behaald. Selecteer een langere periode.`;
      $q.notify({
        type: 'warning',
        message: `In ${config.name.toLowerCase()} geldt een minimum verblijf van ${config.minNights} nachten.`,
        position: 'top',
        timeout: 3000
      });
      return;
    }
  }
  
  emit('update:modelValue', modelData);
};

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
  padding: 2rem;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  background-color: #f8f9fa;
  border-radius: 12px;
  
  &.mobile {
    padding: 1rem;
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
    }
  }

  .calendar-legend {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      gap: 1rem;
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
  }
  
  :deep(.dp__calendar_header) {
    font-weight: 600;
    color: var(--cms-deep-terracotta);
  }
  
  :deep(.dp__day_num) {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  
  :deep(.dp__range_start),
  :deep(.dp__range_end) {
    background: var(--cms-deep-terracotta) !important;
    color: white !important;
    border-radius: 50%;
  }

  :deep(.dp__range_between) {
    background: rgba(231, 111, 81, 0.1) !important;
    border-radius: 0;
  }

  :deep(.dp__active_date) {
    background: var(--cms-deep-terracotta);
    color: white;
  }

  :deep(.dp__today) {
    border: 2px solid var(--cms-light-terracotta);
  }

  :deep(.dp__disabled) {
    color: #dcdcdc !important;
    background-color: #f5f5f5 !important;
    text-decoration: line-through;
    cursor: not-allowed;
  }

  :deep(.checkin-available) {
    border: 2px dashed var(--cms-deep-terracotta);
    border-radius: 50%;
  }
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.today-dot {
  border: 2px solid var(--cms-light-terracotta);
}

.selected-range {
  background-color: var(--cms-deep-terracotta);
}

.booked-day-legend {
  background-color: #f5f5f5;
  border: 1px solid #dcdcdc;
  text-decoration: line-through;
}

.checkin-day {
  border: 2px dashed var(--cms-deep-terracotta);
}

.season-info {
  :deep(.q-chip) {
    font-size: 0.9rem;
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
  width: 48px;
  height: 48px;
  border: 4px solid var(--cms-sand);
  border-radius: 50%;
  border-top-color: var(--cms-deep-terracotta);
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style> 