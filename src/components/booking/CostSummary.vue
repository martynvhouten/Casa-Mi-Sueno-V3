<template>
  <div class="cost-summary-card" v-if="priceDetails">
    <h4 class="text-h6 font-playfair q-mb-md">Kostenoverzicht</h4>
    
    <!-- Season Badge(s) -->
    <div class="season-badge q-mb-md">
      <div v-if="priceDetails.season === 'mixed' && priceDetails.seasonBreakdown" class="row q-col-gutter-sm justify-center">
        <div v-for="breakdown in priceDetails.seasonBreakdown" :key="breakdown.season" class="col-auto">
          <q-chip
            :color="getSeasonColor(breakdown.season)"
            text-color="white"
            icon="schedule"
            size="sm"
          >
            {{ breakdown.name }}
          </q-chip>
        </div>
      </div>
      <q-chip
        v-else
        :color="getSeasonColor(priceDetails.season)"
        text-color="white"
        icon="schedule"
        size="sm"
      >
        {{ getSeasonName(priceDetails.season) }}
      </q-chip>
    </div>
    
    <!-- Mixed Season Breakdown -->
    <div v-if="priceDetails.season === 'mixed' && priceDetails.seasonBreakdown" class="mixed-season-breakdown q-mb-md">
      <div v-for="breakdown in priceDetails.seasonBreakdown" :key="breakdown.season" class="season-breakdown q-mb-sm">
        <div class="season-breakdown-header q-mb-xs">
          <span class="text-body2 text-weight-medium text-grey-7">{{ breakdown.name }}</span>
        </div>
        <div class="price-row q-mb-xs">
          <span class="text-body2">{{ breakdown.nights }} nachten × €{{ breakdown.pricePerNight }}</span>
          <span class="text-body2 text-weight-medium">€{{ breakdown.totalPrice.toLocaleString('nl-NL') }}</span>
        </div>
      </div>
      <q-separator class="q-my-md" />
      <div class="price-row q-mb-sm">
        <span class="text-body2 text-weight-medium">Totaal verblijf ({{ priceDetails.totalNights }} nachten)</span>
        <span class="text-body2 text-weight-medium">€{{ calculateOriginalPrice().toLocaleString('nl-NL') }}</span>
      </div>
    </div>
    
    <!-- Single Season Display -->
    <div v-else>
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

      <!-- Base Total (before discount) -->
      <div class="price-row q-mb-sm">
        <span class="text-body2">Subtotaal verblijf</span>
        <span class="text-body2 text-weight-medium">€{{ calculateOriginalPrice().toLocaleString('nl-NL') }}</span>
      </div>
    </div>

    <!-- Discount (if applicable) -->
    <div v-if="priceDetails.discount" class="price-row q-mb-sm discount-row">
      <span class="text-body2 text-positive">
        <q-icon name="percent" size="sm" class="q-mr-xs" />
        Korting {{ priceDetails.discount.reason }} ({{ priceDetails.discount.percentage }}%)
      </span>
      <span class="text-body2 text-weight-medium text-positive">-€{{ priceDetails.discount.amount.toLocaleString('nl-NL') }}</span>
    </div>

    <!-- Discounted Subtotal -->
    <div class="price-row q-mb-sm" v-if="priceDetails.discount">
      <span class="text-body2">Subtotaal na korting</span>
      <span class="text-body2 text-weight-medium">€{{ priceDetails.basePrice.toLocaleString('nl-NL') }}</span>
    </div>

    <!-- Cleaning Fee -->
    <div class="price-row q-mb-sm">
      <span class="text-body2">Schoonmaak (incl. in- en uitchecken)</span>
      <span class="text-body2 text-weight-medium">€{{ priceDetails.cleaningFee.toLocaleString('nl-NL') }}</span>
    </div>

    <!-- Total -->
    <div class="price-row total-row q-mt-md q-pb-md">
      <span class="text-subtitle1 text-weight-bold">Totaal</span>
      <span class="text-subtitle1 text-weight-bold text-primary">€{{ priceDetails.totalPrice.toLocaleString('nl-NL') }}</span>
    </div>

    <div class="text-center q-mt-md">
      <q-btn
        color="primary"
        :label="`Reserveer voor €${priceDetails.totalPrice.toLocaleString('nl-NL')}`"
        class="cms-btn cms-btn-primary full-width"
        @click="scrollToBookingForm"
        unelevated
        size="md"
      />
    </div>
    
    <div class="text-caption text-grey-7 text-center q-mt-sm">
      * Borg (€{{ priceDetails.securityDeposit.toLocaleString('nl-NL') }}) wordt binnen 5-7 werkdagen na vertrek teruggestort
    </div>
  </div>
  <div v-else class="cost-summary-card text-center">
    <q-icon name="event" size="48px" color="grey-4" class="q-mb-md" />
    <h4 class="text-subtitle1 font-playfair q-mb-sm">Selecteer je data</h4>
    <p class="text-body2 text-grey-7">Kies je in- en uitcheckdatum in de kalender om de totaalprijs te zien.</p>
  </div>
</template>

<script setup lang="ts">
import { PriceDetails } from 'src/types/booking';

const props = defineProps<{
  priceDetails: PriceDetails | null;
}>();

const emit = defineEmits(['show-booking-form']);

const scrollToBookingForm = () => {
  emit('show-booking-form');
};

const getSeasonColor = (season: 'high' | 'mid' | 'low' | 'unavailable' | 'mixed'): string => {
  switch (season) {
    case 'high': return 'red';
    case 'mid': return 'primary';
    case 'low': return 'green';
    case 'unavailable': return 'grey';
    case 'mixed': return 'purple';
    default: return 'primary';
  }
};

const getSeasonName = (season: 'high' | 'mid' | 'low' | 'unavailable' | 'mixed'): string => {
  switch (season) {
    case 'high': return 'Hoogseizoen';
    case 'mid': return 'Middenseizoen';
    case 'low': return 'Laagseizoen';
    case 'unavailable': return 'Niet beschikbaar';
    case 'mixed': return 'Gecombineerd tarief';
    default: return '';
  }
};

const calculateOriginalPrice = (): number => {
  if (!props.priceDetails) return 0;
  
  if (props.priceDetails.discount) {
    return props.priceDetails.basePrice + props.priceDetails.discount.amount;
  }
  return props.priceDetails.basePrice;
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

.discount-row {
  background: rgba(76, 175, 80, 0.1);
  margin: 0.5rem -1rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
}

.tourist-tax-row {
  background: rgba(74, 144, 226, 0.05);
  margin: 0.5rem -1rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid rgba(74, 144, 226, 0.1);
}

.total-row {
  border-top: 1px solid #e0e0e0;
  padding-top: 1.5rem;
}

.season-badge {
  text-align: center;
}

.mixed-season-breakdown {
  background: rgba(156, 39, 176, 0.05);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(156, 39, 176, 0.1);
}

.season-breakdown-header {
  font-weight: 500;
  color: #666;
}


</style> 