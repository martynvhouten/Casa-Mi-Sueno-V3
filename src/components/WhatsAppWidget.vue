<template>
  <div class="whatsapp-widget" :class="{ 'mobile': $q.platform.is.mobile }">
    <q-btn
      round
      class="whatsapp-button"
      size="lg"
      color="green-7"
      icon="fab fa-whatsapp"
      @click="openWhatsApp"
    >
      <q-tooltip v-if="!$q.platform.is.mobile">
        Contact ons via WhatsApp
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { WHATSAPP_CONFIG } from '../utils/whatsapp';

const $q = useQuasar();

const openWhatsApp = () => {
  const whatsappUrl = WHATSAPP_CONFIG.getWhatsAppUrl($q.platform.is.mobile);
  window.open(whatsappUrl, '_blank');
};
</script>

<style lang="scss" scoped>
.whatsapp-widget {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 1000;

  &.mobile {
    right: 1rem;
    bottom: 1rem;
  }

  .whatsapp-button {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    font-size: 1.8rem;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
  }
}
</style> 