<template>
  <div class="fullscreen bg-blue-1 text-blue-10 flex flex-center">
    <div class="text-center">
      <div style="font-size: 8rem" class="text-blue-8">
        404
      </div>

      <div class="text-h2 text-blue-9 q-mb-md">
        {{ t('error404.title') }}
      </div>

      <div class="text-h5 text-blue-8 q-mb-xl">
        {{ t('error404.description') }}
      </div>

      <q-btn
        color="blue-8"
        text-color="white"
        unelevated
        to="/"
        :label="t('error404.goHome')"
        no-caps
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
  width: 100vw;
  height: 100vh;
}
</style> 