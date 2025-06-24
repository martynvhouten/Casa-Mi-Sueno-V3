<template>
  <section class="hero-section" :style="{ minHeight: '500px' }">
    <q-img
      :src="image"
      :alt="altText"
      class="hero-image"
      fit="cover"
      position="center"
      height="100%"
      :placeholder-src="placeholderImage"
    >
      <div class="hero-overlay"></div>
      <div class="hero-content text-center">
        <div class="animate-fade-in-up">
          <h1 class="text-h2 font-playfair text-sand text-shadow-strong q-mb-md">{{ title }}</h1>
          <p v-if="subtitle" class="text-h5 text-shadow-light text-accent">{{ subtitle }}</p>
        </div>
      </div>
    </q-img>
  </section>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  placeholderImage: {
    type: String,
    default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', // 1x1 transparent gif
  },
});
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 60vh;
  min-height: 500px;
  width: 100%;
  overflow: hidden;
}

.hero-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-image :deep(img) {
  object-fit: cover !important;
  object-position: center !important;
  min-height: 100% !important;
  min-width: 100% !important;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    165deg,
    rgba(250, 243, 224, 0.1) 0%,
    rgba(244, 162, 97, 0.3) 30%,
    rgba(231, 111, 81, 0.5) 60%,
    rgba(42, 157, 143, 0.7) 100%
  );
  z-index: 1;
}

.hero-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    transparent 30%,
    rgba(231, 111, 81, 0.2) 100%
  );
}

.hero-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(38, 70, 83, 0.4) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.text-sand {
  color: #FAF3E0;
}

.text-shadow-light {
  text-shadow: 2px 2px 6px rgba(38, 70, 83, 0.7);
}

.text-shadow-strong {
  text-shadow: 
    2px 2px 8px rgba(38, 70, 83, 0.8),
    0 0 30px rgba(38, 70, 83, 0.4);
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 0.3s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 