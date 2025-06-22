<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useQuasar } from 'quasar';
import { useScreens } from 'vue-screen-utils';

interface BookedDate {
  geboekte_datum: string;
}

const $q = useQuasar();

const selectedRange = ref<[Date | null, Date | null]>([null, null]);
const bookedDates = ref<Date[]>([]);
const loading = ref(true);

const today = new Date();
today.setHours(0, 0, 0, 0);

const fetchBookedDates = async () => {
  loading.value = true;
  try {
    // This is a placeholder for your actual API endpoint
    // const response = await fetch(import.meta.env.VITE_SHEETBEST_API_URL);
    // if (!response.ok) throw new Error('Failed to fetch booked dates');
    // const data = await response.json() as BookedDate[];
    
    // MOCK DATA
    const mockData: BookedDate[] = [
      { geboekte_datum: new Date(new Date().setDate(today.getDate() + 5)).toISOString().split('T')[0] },
      { geboekte_datum: new Date(new Date().setDate(today.getDate() + 6)).toISOString().split('T')[0] },
      { geboekte_datum: new Date(new Date().setDate(today.getDate() + 10)).toISOString().split('T')[0] },
    ];
    
    bookedDates.value = mockData
      .map(row => {
        if (!row.geboekte_datum) return null;
        if (/^\d{2}-\d{2}-\d{4}$/.test(row.geboekte_datum)) {
          const [day, month, year] = row.geboekte_datum.split('-');
          return new Date(`${year}-${month}-${day}`);
        }
        return new Date(row.geboekte_datum);
      })
      .filter((date): date is Date => date !== null && !isNaN(date.getTime()));

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
      selectedRange.value = [null, null];
      return;
    }
  }
  selectedRange.value = dates;
};

// Responsive layout
const { mapCurrent } = useScreens({
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
});

const columns = mapCurrent({ lg: 2 }, 1);

onMounted(fetchBookedDates);
</script>

<template>
  <div class="booking-calendar-container">
    <div v-if="loading" class="text-center">
      <q-spinner-dots color="primary" size="40px" />
      <p>Beschikbaarheid laden...</p>
    </div>
    <div v-else>
      <Datepicker
        v-model="selectedRange"
        range
        :min-date="new Date()"
        :disabled-dates="bookedDates"
        :enable-time-picker="false"
        :columns="columns"
        locale="nl"
        auto-apply
        :clearable="false"
        text-input
        :format="{ month: 'long', year: 'numeric', weekday: 'short' }"
        class="airbnb-style-calendar"
        @update:model-value="handleDateSelect"
        :preview-format="(date) => new Date(date).toLocaleDateString('nl-NL', { 
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })"
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