<template>
  <div class="cost-summary-card" v-if="priceDetails">
    <h4 class="text-h6 font-playfair q-mb-md">Kostenoverzicht</h4>
    
    <!-- Season Badge -->
    <div class="season-badge q-mb-md">
      <q-chip
        :color="getSeasonColor(priceDetails.season)"
        text-color="white"
        icon="schedule"
        size="sm"
      >
        {{ getSeasonName(priceDetails.season) }}
      </q-chip>
    </div>
    
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
      <span class="text-body2">Eindschoonmaak</span>
      <span class="text-body2 text-weight-medium">€{{ priceDetails.cleaningFee.toLocaleString('nl-NL') }}</span>
    </div>

    <!-- Subtotal without tourist tax -->
    <div class="price-row q-mb-sm" v-if="priceDetails.touristTax">
      <span class="text-body2 text-weight-medium">Subtotaal</span>
      <span class="text-body2 text-weight-medium">€{{ priceDetails.totalPrice.toLocaleString('nl-NL') }}</span>
    </div>

    <!-- Tourist Tax -->
    <div v-if="priceDetails.touristTax" class="price-row q-mb-sm tourist-tax-row">
      <span class="text-body2">
        <q-icon name="location_city" size="sm" class="q-mr-xs" />
        Toeristenbelasting ({{ priceDetails.touristTax.totalGuests }} {{ priceDetails.touristTax.totalGuests === 1 ? 'persoon' : 'personen' }})
      </span>
      <span class="text-body2 text-weight-medium">€{{ priceDetails.touristTax.totalAmount.toLocaleString('nl-NL') }}</span>
    </div>

    <!-- Total -->
    <div class="price-row total-row q-mt-md q-pb-md">
      <span class="text-subtitle1 text-weight-bold">{{ priceDetails.touristTax ? 'Totaal' : 'Totaal' }}</span>
      <span class="text-subtitle1 text-weight-bold text-primary">€{{ (priceDetails.totalPriceWithTax || priceDetails.totalPrice).toLocaleString('nl-NL') }}</span>
    </div>

    <!-- Long Stay Message -->
    <div v-if="priceDetails.showLongStayMessage" class="long-stay-note q-mb-md">
      <q-banner class="bg-orange-1 text-orange-8" rounded>
        <template v-slot:avatar>
          <q-icon name="schedule" color="orange" />
        </template>
        <div class="text-body2">
          <strong>Langer dan 3 weken?</strong><br>
          <span class="text-body2">Voor speciale tarieven bij lange verblijven kun je direct contact opnemen.</span>
        </div>
        <template v-slot:action>
          <q-btn 
            flat 
            color="orange" 
            label="Contact" 
            size="sm" 
            @click="router.push('/contact')"
            class="q-ml-sm"
          />
        </template>
      </q-banner>
    </div>

    <q-btn
      color="primary"
      :label="`Reserveer voor €${(priceDetails.totalPriceWithTax || priceDetails.totalPrice).toLocaleString('nl-NL')}`"
      class="cms-btn cms-btn-cta full-width q-mt-md"
      @click="scrollToBookingForm"
      unelevated
      size="md"
    />
    
    <div class="text-caption text-grey-7 text-center q-mt-sm">
      <div v-if="priceDetails.touristTax">
        * Borg (€{{ priceDetails.securityDeposit.toLocaleString('nl-NL') }}) wordt bij aankomst betaald<br>
        * Toeristenbelasting wordt ter plaatse in contanten betaald
      </div>
      <div v-else>
        * Exclusief borg (€{{ priceDetails.securityDeposit.toLocaleString('nl-NL') }}) en toeristenbelasting (€2,50 p.p.p.n.)
      </div>
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
import { useRouter } from 'vue-router';

const props = defineProps<{
  priceDetails: PriceDetails | null;
}>();

const emit = defineEmits(['show-booking-form']);
const router = useRouter();

const scrollToBookingForm = () => {
  emit('show-booking-form');
};

const getSeasonColor = (season: 'low' | 'mid' | 'high' | 'holiday'): string => {
  switch (season) {
    case 'low': return 'blue-grey';
    case 'mid': return 'orange';
    case 'high': return 'red';
    case 'holiday': return 'purple';
    default: return 'primary';
  }
};

const getSeasonName = (season: 'low' | 'mid' | 'high' | 'holiday'): string => {
  switch (season) {
    case 'low': return 'Laagseizoen';
    case 'mid': return 'Middenseizoen';
    case 'high': return 'Hoogseizoen';
    case 'holiday': return 'Vakantieperiode';
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

.long-stay-note {
  margin-top: 0.5rem;
}
</style> 