<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section">
      <q-img
        src="/images/Tuin_veranda.jpg"
        class="absolute-full"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="animate-fade-in-up text-center text-white">
            <h1 class="text-shadow q-mb-md font-playfair">Contact</h1>
            <p class="text-h5 text-shadow q-mb-xl font-poppins">
              Neem contact met ons op
            </p>
          </div>
        </div>
      </q-img>
    </section>

    <!-- Introduction -->
    <section class="section bg-sand">
      <div class="container text-center">
        <h2 class="font-playfair q-mb-lg">Heb je een vraag?</h2>
        <p class="text-body1 q-mb-xl">
          Wij helpen je graag verder met al je vragen over ons familiehuis. 
          Vul het contactformulier in of neem direct contact met ons op.
        </p>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="section bg-white">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <!-- Contact Form -->
          <div class="col-12 col-md-8">
            <ContactForm />
          </div>

          <!-- Contact Info -->
          <div class="col-12 col-md-4">
            <div class="contact-card">
              <h3 class="font-playfair q-mb-lg text-h4">Direct Contact</h3>
              
              <div class="contact-item">
                <q-icon name="phone" size="24px" color="primary" />
                <div class="contact-content">
                  <h4 class="text-h6 font-playfair">Telefoon</h4>
                  <a href="tel:+31683645489" class="text-body1 text-dark">
                    06 - 8364 5489 (Netherlands)
                  </a>
                  <p class="text-caption text-grey-8">WhatsApp beschikbaar</p>
                </div>
              </div>

              <div class="contact-item">
                <q-icon name="place" size="24px" color="primary" />
                <div class="contact-content">
                  <h4 class="text-h6 font-playfair">Adres</h4>
                  <p class="text-body1 q-mb-none">Carrer de les Petúnies 16</p>
                  <p class="text-body1 q-mb-none">03580 L'Alfàs del Pi</p>
                  <p class="text-body1">Alicante, Spain</p>
                </div>
              </div>

              <div class="contact-item">
                <q-icon name="calendar_today" size="24px" color="primary" />
                <div class="contact-content">
                  <h4 class="text-h6 font-playfair">Beschikbaarheid</h4>
                  <p class="text-body1">Bekijk de kalender en reserveer direct</p>
                </div>
              </div>

              <div class="contact-item">
                <q-icon name="public" size="24px" color="primary" />
                <div class="contact-content">
                  <h4 class="text-h6 font-playfair">Volg ons</h4>
                  <div class="social-links">
                    <a href="#" target="_blank" rel="noopener noreferrer">
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
import ContactForm from '../components/ContactForm.vue';
</script>

<style lang="scss" scoped>
.contact-card {
  background: var(--cms-sand);
  border-radius: 16px;
  padding: 2rem;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .q-icon {
    background: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
}

.contact-content {
  flex: 1;

  h4 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
  }
}

a {
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--cms-deep-terracotta);
  }
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  a {
    color: var(--cms-gray-800);
    transition: all 0.2s ease;

    &:hover {
      color: var(--cms-deep-terracotta);
      transform: translateY(-2px);
    }
  }
}
</style> 