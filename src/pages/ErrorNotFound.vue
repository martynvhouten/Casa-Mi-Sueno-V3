<template>
  <div class="fullscreen bg-secondary text-dark flex flex-center">
    <div class="text-center">
      <div class="text-h2 font-playfair q-mb-md">{{ t('error404.title') }}</div>
      <div class="text-h5 q-mb-xl">{{ t('error404.description') }}</div>
      <q-btn
        color="primary"
        unelevated
        :to="{ name: 'home' }"
        :label="t('error404.goHome')"
        class="q-px-xl q-py-sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.fullscreen {
  min-height: 100vh;
}
</style> 