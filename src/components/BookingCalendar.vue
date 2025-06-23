<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useQuasar } from 'quasar';
import { useScreens } from 'vue-screen-utils';
import { fetchBookedDates, BookedDate } from '../utils/googleSheets';

const props = defineProps<{
  modelValue: [Date | null, Date | null];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: [Date | null, Date | null]): void;
}>();

const $q = useQuasar();
const bookedDates = ref<Date[]>([]);
const loading = ref(true);
const localDates = ref<[Date | null, Date | null]>([null, null]);

const today = new Date();
today.setHours(0, 0, 0, 0);

// Format date consistently across components
const formatDate = (date: Date) => {
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
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
    bookedDates.value = dates.map((d: BookedDate) => {
      const date = new Date(d.geboekte_datum);
      // Convert UTC date to a local date at midnight to avoid timezone-off-by-one errors
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    });
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    $q.notify({
      type: 'negative',
      message: 'Fout bij ophalen van geboekte data.',
      position: 'top',
    });
  } finally {
    loading.value = false;
  }
};

const isDateDisabled = (date: Date) => {
  return bookedDates.value.some(bookedDate => 
    bookedDate.getTime() === new Date(date).setHours(0, 0, 0, 0)
  );
};

// Handle date selection
const handleDateSelect = (dates: [Date | null, Date | null]) => {
  localDates.value = dates;
  
  if (dates[0] && dates[1]) {
    // Check if any date in the range is disabled
    const start = new Date(dates[0]);
    const end = new Date(dates[1]);
    const range = [];
    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      range.push(new Date(dt));
    }
    
    const hasDisabledDate = range.some(isDateDisabled);
    if (hasDisabledDate) {
      $q.notify({
        type: 'negative',
        message: 'Een of meer geselecteerde data zijn niet beschikbaar.',
        position: 'top',
      });
      localDates.value = [null, null];
      emit('update:modelValue', [null, null]);
      return;
    }

    // Validate minimum stay requirements
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const isHighSeason = start.getMonth() >= 4 && start.getMonth() <= 8; // May through September

    if (isHighSeason && nights < 10) {
      $q.notify({
        type: 'warning',
        message: 'Minimaal 10 nachten verblijf in het hoogseizoen.',
        position: 'top',
      });
      localDates.value = [null, null];
      emit('update:modelValue', [null, null]);
      return;
    } else if (!isHighSeason && nights < 5) {
      $q.notify({
        type: 'warning',
        message: 'Minimaal 5 nachten verblijf.',
        position: 'top',
      });
      localDates.value = [null, null];
      emit('update:modelValue', [null, null]);
      return;
    }
  }
  
  emit('update:modelValue', dates);
};

// Responsive layout
const { mapCurrent } = useScreens({
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
});

const columns = mapCurrent({ lg: 2 }, 1);

watch(() => props.modelValue, (newValue) => {
  localDates.value = newValue;
}, { deep: true });

onMounted(() => {
  localDates.value = props.modelValue;
  fetchBookedDatesFromSheet();
});
</script>

<template>
  <div class="booking-calendar-container">
    <div v-if="loading" class="text-center">
      <q-spinner-dots color="primary" size="40px" />
      <p>Beschikbaarheid laden...</p>
    </div>
    <div v-else>
      <Datepicker
        :model-value="(localDates as any)"
        @update:model-value="handleDateSelect"
        range
        :min-date="today"
        :disabled-dates="bookedDates"
        :enable-time-picker="false"
        :columns="columns"
        locale="nl"
        auto-apply
        :clearable="false"
        format="dd MMMM yyyy"
        class="airbnb-style-calendar"
        :preview-format="(date: Date) => formatDate(date)"
        :month-change-on-scroll="false"
        :preset-ranges="false"
        :flow="['calendar']"
        :partial-range="false"
        :prevent-min-max-navigation="false"
        :disable-date="isDateDisabled"
      />
      <div class="calendar-legend">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.booking-calendar-container {
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.airbnb-style-calendar {
  --dp-font-family: inherit;
  --dp-border-radius: 8px;
  --dp-cell-border-radius: 50%;
  --dp-day-width: 38px;
  --dp-day-height: 38px;
  --dp-row-margin: 5px 0;
  --dp-selected-date-color: #fff;
  --dp-selected-date-bg-color: #0053b3;
  --dp-hover-color: #0053b3;
  --dp-hover-bg-color: rgba(0, 83, 179, 0.1);
  --dp-disabled-color: #d32f2f;
  --dp-disabled-color-text: #fff;
  --dp-disabled-bg-color: #d32f2f;
  --dp-primary-color: #0053b3;
  --dp-menu-border-radius: 12px;
  --dp-border-color: #ddd;
  --dp-menu-min-width: 300px;
  
  :deep(.dp__calendar_header) {
    padding: 10px 18px;
    font-weight: 600;
  }
  
  :deep(.dp__month_year_row) {
    margin-bottom: 20px;
  }

  :deep(.dp__today) {
    border: 2px solid var(--dp-primary-color);
  }

  :deep(.dp__range_start),
  :deep(.dp__range_end) {
    background-color: var(--dp-selected-date-bg-color) !important;
    color: var(--dp-selected-date-color) !important;
  }

  :deep(.dp__range_between) {
    background-color: var(--dp-hover-bg-color) !important;
    color: var(--dp-hover-color) !important;
  }

  :deep(.dp__disabled) {
    background-color: var(--dp-disabled-bg-color) !important;
    color: var(--dp-disabled-color-text) !important;
    text-decoration: none !important;
  }
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;

  &.today-dot {
    border: 2px solid #0053b3;
    background-color: transparent;
  }

  &.selected-range {
    background-color: #0053b3;
  }

  &.booked-day-legend {
    background-color: #d32f2f;
  }
}

// Responsive styles
@media (max-width: 640px) {
  .calendar-legend {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style> 