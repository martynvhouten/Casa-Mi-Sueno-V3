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
import { ref } from 'vue';
import { useQuasar, QForm } from 'quasar';

const $q = useQuasar();
const formRef = ref<QForm | null>(null);
const loading = ref(false);

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    
    // Validate form
    const isValid = await formRef.value?.validate();
    if (!isValid) {
      throw new Error('Vul alsjeblieft alle verplichte velden correct in');
    }

    // Show success message
    $q.notify({
      type: 'positive',
      message: 'Bedankt voor je bericht! We nemen zo spoedig mogelijk contact met je op.',
      position: 'top',
      timeout: 5000
    });

    // Reset form
    formRef.value?.reset();
    form.value = {
      name: '',
      email: '',
      phone: '',
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

<style scoped>
.contact-form {
  max-width: 800px;
  margin: 0 auto;
}

.q-field {
  margin-bottom: 1.5rem;
}

:deep(.q-field__label) {
  padding-left: 2.5rem;
}

:deep(.q-field__control) {
  padding-left: 0.5rem;
}

:deep(.q-field__prepend) {
  padding-right: 0.5rem;
}
</style> 