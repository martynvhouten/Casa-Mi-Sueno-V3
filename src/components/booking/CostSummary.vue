<template>
  <div class="cost-summary-card" v-if="priceDetails">
    <h4 class="text-h6 font-playfair q-mb-md">Kostenoverzicht</h4>
    
    <!-- Base Price -->
    <div class="price-row q-mb-sm">
      <span class="text-body2">Basis prijs per nacht</span>
      <span class="text-body2 text-weight-medium">€{{ priceDetails.pricePerNight.toLocaleString('nl-NL') }}</span>
    </div>
    
    <!-- Number of Nights -->
    <div class="price-row q-mb-sm">
      <span class="text-body2">Aantal nachten</span>
      <span class="text-body2 text-weight-medium">{{ priceDetails.totalNights }}</span>
    </div>

    <!-- Base Total -->
    <div class="price-row q-mb-sm">
      <span class="text-body2">Subtotaal</span>
      <span class="text-body2 text-weight-medium">€{{ priceDetails.basePrice.toLocaleString('nl-NL') }}</span>
    </div>

    <!-- Discount if applicable -->
    <div v-if="priceDetails.discount.percentage > 0" class="price-row q-mb-sm">
      <span class="text-body2">
        Korting ({{ priceDetails.discount.percentage }}% voor {{ priceDetails.totalNights }}+ nachten)
      </span>
      <span class="text-body2 text-weight-medium text-negative">
        -€{{ priceDetails.discount.amount.toLocaleString('nl-NL') }}
      </span>
    </div>

    <!-- Cleaning Fee -->
    <div class="price-row q-mb-sm">
      <span class="text-body2">Eindschoonmaak</span>
      <span class="text-body2 text-weight-medium">€{{ priceDetails.cleaningFee.toLocaleString('nl-NL') }}</span>
    </div>

    <!-- Total -->
    <div class="price-row total-row q-mt-md q-pb-md">
      <span class="text-subtitle1 text-weight-bold">Totaal</span>
      <span class="text-subtitle1 text-weight-bold text-primary">€{{ priceDetails.totalPrice.toLocaleString('nl-NL') }}</span>
    </div>

    <q-btn
      color="primary"
      :label="`Reserveer voor €${priceDetails.totalPrice.toLocaleString('nl-NL')}`"
      class="cms-btn cms-btn-cta full-width q-mt-md"
      @click="scrollToBookingForm"
      unelevated
      size="md"
    />
    
    <div class="text-caption text-grey-7 text-center q-mt-sm">
      * Exclusief borg (€500) en toeristenbelasting
    </div>
  </div>
  <div v-else class="cost-summary-card text-center">
    <q-icon name="event" size="48px" color="grey-4" class="q-mb-md" />
    <h4 class="text-subtitle1 font-playfair q-mb-sm">Selecteer je data</h4>
    <p class="text-body2 text-grey-7">Kies je in- en uitcheckdatum in de kalender om de totaalprijs te zien.</p>
  </div>
</template>

<script setup lang="ts">
import { PriceDetails } from 'src/utils/types/supabase';

defineProps<{
  priceDetails: PriceDetails | null;
}>();

const emit = defineEmits(['show-booking-form']);

const scrollToBookingForm = () => {
  emit('show-booking-form');
};
</script>

<style scoped>
.cost-summary-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 100px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.total-row {
  border-top: 1px solid #e0e0e0;
  padding-top: 1.5rem;
}
</style> 