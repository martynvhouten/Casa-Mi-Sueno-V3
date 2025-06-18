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
        <h2 class="font-playfair q-mb-lg">Heeft u een vraag?</h2>
        <p class="text-h6 text-grey-8 q-mx-auto" style="max-width: 800px;">
          Wij helpen u graag verder met al uw vragen over ons familiehuis. 
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
              <h3 class="font-playfair q-mb-lg">Direct Contact</h3>
              
              <div class="q-mb-lg">
                <h4 class="text-h6 font-playfair q-mb-sm">Email</h4>
                <a href="mailto:esversteeg@hotmail.com" class="text-body1 text-dark">
                  esversteeg@hotmail.com
                </a>
              </div>

              <div class="q-mb-lg">
                <h4 class="text-h6 font-playfair q-mb-sm">Telefoon</h4>
                <a href="tel:+31683645489" class="text-body1 text-dark">
                  06 - 8364 5489 (Netherlands)
                </a>
                <p class="text-body2 q-mt-sm">WhatsApp beschikbaar</p>
              </div>

              <div class="q-mb-lg">
                <h4 class="text-h6 font-playfair q-mb-sm">Adres</h4>
                <p class="text-body1 q-mb-none">Carrer de les Petúnies 16</p>
                <p class="text-body1 q-mb-none">03580 L'Alfàs del Pi</p>
                <p class="text-body1">Alicante, Spain</p>
              </div>

              <div>
                <h4 class="text-h6 font-playfair q-mb-sm">Direct Boeken</h4>
                <p class="text-body1">Direct boeken bij de eigenaren</p>
              </div>

              <div>
                <h4 class="text-h6 font-playfair q-mb-sm">Volg ons</h4>
                <div class="row q-gutter-sm">
                  <a href="#" target="_blank" rel="noopener noreferrer" class="text-dark">
                    <q-icon name="fab fa-facebook" size="24px" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" class="text-dark">
                    <q-icon name="fab fa-instagram" size="24px" />
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

<style scoped>
.contact-info {
  background: var(--cms-sand);
  border-radius: var(--radius-lg);
  height: 100%;
}

.contact-info a {
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-info a:hover {
  color: var(--cms-deep-terracotta) !important;
}
</style> 