<template>
  <q-page>
    <!-- Hero Section -->
    <HeroSection
      image="/images/Tuin_veranda.jpg"
      alt-text="De veranda van het vakantiehuis"
      :title="isBookingInquiry ? 'Heb je vragen over je verblijf?' : 'Laten we kennis maken'"
      :subtitle="isBookingInquiry ? 'We helpen je graag met al je vragen over Casa Mi Sueño' : 'Persoonlijk contact voor een persoonlijke ervaring'"
    />

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">{{ isBookingInquiry ? 'We zijn er voor je' : 'Zeg maar gewoon hallo' }}</h2>
        <p class="text-body1 q-mb-xl" style="max-width: 600px; margin: 0 auto;">
          {{ isBookingInquiry 
            ? 'Twijfel je nog over data, heb je speciale wensen of gewoon een vraag? Stuur ons een berichtje en we zorgen dat alles perfect geregeld wordt.' 
            : 'Nieuwsgierig naar Casa Mi Sueño? Wil je meer weten over de omgeving? Of heb je gewoon een vraag? We horen graag van je!' }}
        </p>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <!-- Contact Form -->
          <div class="col-12 col-md-8">
            <div class="contact-form-wrapper">
              <ContactForm />
            </div>
          </div>

          <!-- Contact Info -->
          <div class="col-12 col-md-4">
            <div class="contact-card">
              <h3 class="font-playfair q-mb-lg text-h4 text-center">Direct contact</h3>
              
              <div class="contact-item">
                <q-icon name="phone" size="24px" color="primary" />
                <div class="contact-content">
                  <h4 class="text-h6 font-playfair">Telefoon</h4>
                  <a href="tel:+31683645489" class="text-body1 text-dark hover-primary">
                    +31 6 8364 5489
                  </a>
                  <p class="text-caption text-grey-8">Ook bereikbaar via WhatsApp</p>
                </div>
              </div>

              <div class="contact-item">
                <q-icon name="place" size="24px" color="primary" />
                <div class="contact-content">
                  <h4 class="text-h6 font-playfair">Locatie</h4>
                  <p class="text-body1 q-mb-none">Carrer de les Petúnies 16</p>
                  <p class="text-body1 q-mb-none">03580 L'Alfàs del Pi</p>
                  <p class="text-body1">Alicante, Spanje</p>
                </div>
              </div>

              <div class="contact-item">
                <q-icon name="public" size="24px" color="primary" />
                <div class="contact-content">
                  <h4 class="text-h6 font-playfair">Social media</h4>
                  <div class="social-links">
                    <a href="#" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
                      <q-icon name="fab fa-instagram" size="24px" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ContactForm from '../components/ContactForm.vue';
import HeroSection from 'src/components/HeroSection.vue';

const route = useRoute();

const isBookingInquiry = computed(() => {
  return route.query.from !== undefined || route.query.to !== undefined;
});
</script>

<style lang="scss" scoped>
.section {
  padding: 5rem 0;
  transition: background-color 0.3s ease;
}

.bg-sand {
  background: var(--cms-sand);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.contact-form-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 28px rgba(0, 0, 0, 0.08);
  }
}

.contact-card {
  background: var(--cms-sand);
  border-radius: 16px;
  padding: 2.5rem;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 28px rgba(0, 0, 0, 0.1);
  }
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .q-icon {
    background: white;
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
  }
}

.contact-content {
  flex: 1;

  h4 {
    margin: 0 0 0.75rem;
    color: var(--cms-gray-900);
  }

  p {
    margin: 0;
    color: var(--cms-gray-700);
  }
}

a {
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--cms-deep-terracotta);
  }
}

.hover-primary:hover {
  color: var(--cms-deep-terracotta);
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
}

.social-link {
  color: var(--cms-gray-800);
  background: white;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    color: var(--cms-deep-terracotta);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style> 