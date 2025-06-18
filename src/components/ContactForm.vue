<template>
  <div class="contact-form">
    <q-form
      @submit="handleSubmit"
      class="max-w-2xl mx-auto"
      ref="formRef"
    >
      <div class="row q-col-gutter-md">
        <!-- Name -->
        <div class="col-12 col-sm-6">
          <q-input
            v-model="form.name"
            label="Naam"
            :rules="[
              val => !!val || 'Naam is verplicht',
              val => val.length >= 2 || 'Naam moet minimaal 2 karakters bevatten'
            ]"
            lazy-rules
            outlined
            class="full-width"
            :disable="loading"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>

        <!-- Email -->
        <div class="col-12 col-sm-6">
          <q-input
            v-model="form.email"
            label="E-mail"
            type="email"
            :rules="[
              val => !!val || 'E-mail is verplicht',
              val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || 'Ongeldig e-mailadres'
            ]"
            lazy-rules
            outlined
            class="full-width"
            :disable="loading"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>

        <!-- Phone -->
        <div class="col-12 col-sm-6">
          <q-input
            v-model="form.phone"
            label="Telefoonnummer"
            type="tel"
            :rules="[
              val => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val) || 'Ongeldig telefoonnummer'
            ]"
            mask="(+##) ### ### ####"
            outlined
            class="full-width"
            :disable="loading"
          >
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
        </div>

        <!-- Dates -->
        <div class="col-12 col-sm-6">
          <q-input
            v-model="formattedDates"
            label="Gewenste periode"
            outlined
            readonly
            class="full-width"
            :disable="loading"
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="form.dates"
                    range
                    mask="YYYY-MM-DD"
                    :min="minDate"
                    :max="maxDate"
                    today-btn
                    multiple-months
                    :months="2"
                    :locale="dutchLocale"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <!-- Message -->
        <div class="col-12">
          <q-input
            v-model="form.message"
            label="Bericht"
            type="textarea"
            rows="4"
            :rules="[
              val => !!val || 'Bericht is verplicht',
              val => val.length >= 10 || 'Bericht moet minimaal 10 karakters bevatten'
            ]"
            lazy-rules
            outlined
            class="full-width"
            :disable="loading"
          >
            <template v-slot:prepend>
              <q-icon name="message" />
            </template>
          </q-input>
      </div>

      <!-- Submit Button -->
        <div class="col-12 text-center q-mt-lg">
        <q-btn
          type="submit"
            label="Verstuur Bericht"
            color="primary"
          :loading="loading"
            size="lg"
            unelevated
            class="q-px-xl"
          >
            <template v-slot:loading>
              <q-spinner-dots />
            </template>
          </q-btn>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { date } from 'quasar';
import { useRoute } from 'vue-router';

const route = useRoute();
const $q = useQuasar();
const formRef = ref<any>(null);
const loading = ref(false);

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

// Add Dutch locale configuration for the date picker
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

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  dates: {
    from: string;
    to: string;
  };
  message: string;
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  phone: '',
  dates: {
    from: '',
    to: ''
  },
  message: ''
});

// Set min date to today and max date to 2 years from now
const minDate = date.formatDate(new Date(), 'YYYY-MM-DD');
const maxDate = date.formatDate(date.addToDate(new Date(), { year: 2 }), 'YYYY-MM-DD');

// Format dates for display
const formattedDates = computed(() => {
  if (!form.value.dates.from || !form.value.dates.to) return '';
  const fromDate = new Date(form.value.dates.from);
  const toDate = new Date(form.value.dates.to);
  return `${fromDate.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })} tot ${toDate.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}`;
});

// Initialize form with dates from query params if available
onMounted(() => {
  const datesParam = route.query.dates as string;
  if (datesParam) {
    const [from, to] = datesParam.split(' tot ');
    form.value.dates = { from, to };
  }
});

const handleSubmit = async () => {
  try {
  loading.value = true;
  
    // Validate form
    const isValid = await formRef.value?.validate();
    if (!isValid) {
      throw new Error('Vul alsjeblieft alle verplichte velden correct in');
    }

    // Add selected dates to SheetBest API
    if (form.value.dates.from && form.value.dates.to) {
      const startDate = new Date(form.value.dates.from);
      const endDate = new Date(form.value.dates.to);
      const dateRange: string[] = [];
      
      // Generate array of all dates in range
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dateRange.push(date.formatDate(d, 'YYYY-MM-DD'));
      }

      // Add each date to SheetBest
      const sheetBestUrl = import.meta.env.VITE_SHEETBEST_API_URL;
      await Promise.all(dateRange.map(async (geboekte_datum) => {
        await fetch(sheetBestUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ geboekte_datum })
        });
      }));
    }

    // Show success message
    $q.notify({
      type: 'positive',
      message: 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.',
      position: 'top',
      timeout: 5000
    });

    // Reset form
    formRef.value?.reset();
    form.value = {
      name: '',
      email: '',
      phone: '',
      dates: { from: '', to: '' },
      message: ''
    };

  } catch (error) {
    // Show error message
    $q.notify({
      type: 'negative',
      message: error instanceof Error ? error.message : 'Er is iets misgegaan. Probeer het later opnieuw.',
      position: 'top',
      timeout: 5000
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.contact-form {
  .q-field {
    &--outlined {
      .q-field__control {
        border-radius: 8px;
      }
    }
  }

  .q-btn {
    border-radius: 8px;
  }
}
</style> 