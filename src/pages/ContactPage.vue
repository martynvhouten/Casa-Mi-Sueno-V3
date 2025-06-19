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
            <div class="contact-info q-pa-lg">
              <h3 class="font-playfair q-mb-lg text-h4">Direct Contact</h3>
              
              <div class="contact-item q-mb-md">
                <div class="contact-icon q-mb-sm">
                  <q-icon name="phone" size="24px" color="primary" />
                </div>
                <h4 class="text-h6 font-playfair q-mb-xs">Telefoon</h4>
                <a href="tel:+31683645489" class="text-body1 text-dark">
                  06 - 8364 5489 (Netherlands)
                </a>
                <p class="text-body2 q-mt-xs text-grey-8">WhatsApp beschikbaar</p>
              </div>

              <div class="contact-item q-mb-md">
                <div class="contact-icon q-mb-sm">
                  <q-icon name="place" size="24px" color="primary" />
                </div>
                <h4 class="text-h6 font-playfair q-mb-xs">Adres</h4>
                <p class="text-body1 q-mb-none">Carrer de les Petúnies 16</p>
                <p class="text-body1 q-mb-none">03580 L'Alfàs del Pi</p>
                <p class="text-body1">Alicante, Spain</p>
              </div>

              <div class="contact-item q-mb-md">
                <div class="contact-icon q-mb-sm">
                  <q-icon name="calendar_today" size="24px" color="primary" />
                </div>
                <h4 class="text-h6 font-playfair q-mb-xs">Beschikbaarheid</h4>
                <p class="text-body1">Bekijk de kalender en reserveer direct</p>
              </div>

              <div class="contact-item">
                <div class="contact-icon q-mb-sm">
                  <q-icon name="public" size="24px" color="primary" />
                </div>
                <h4 class="text-h6 font-playfair q-mb-xs">Volg ons</h4>
                <div class="row q-gutter-md">
                  <a href="#" target="_blank" rel="noopener noreferrer" class="social-link">
                    <q-icon name="fab fa-instagram" size="28px" />
                  </a>
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
.contact-info {
  background: var(--cms-sand);
  border-radius: var(--radius-lg);
  height: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.contact-item {
  position: relative;
  padding-left: 0;
}

.contact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.contact-info a {
  text-decoration: none;
  transition: color 0.3s ease;
  display: inline-block;
  
  &:hover {
    color: var(--cms-deep-terracotta) !important;
  }
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--cms-gray-800);
  transition: all 0.3s ease;

  &:hover {
    color: var(--cms-deep-terracotta);
    transform: translateY(-1px);
  }
}
</style> 