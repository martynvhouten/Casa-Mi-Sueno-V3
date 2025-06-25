<template>
  <!-- Introduction -->
  <section class="section bg-sand">
    <div class="container">
      <div class="row justify-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">
          <h2 class="text-h3 font-playfair q-mb-lg text-primary">Kies je ideale periode</h2>
          <p class="text-h6 text-grey-8 q-mb-xl" style="line-height: 1.6; max-width: 600px; margin: 0 auto;">
            Bekijk direct de beschikbaarheid en tarieven. Selecteer je aankomst- en vertrekdatum om te beginnen.
          </p>
          
          <div class="booking-highlights">
            <div class="highlight-item">
              <q-icon name="pool" color="terracotta" size="20px" />
              <span>Privé zwembad</span>
            </div>
            <div class="highlight-item">
              <q-icon name="location_on" color="terracotta" size="20px" />
              <span>L'Alfàs del Pi</span>
            </div>
            <div class="highlight-item">
              <q-icon name="groups" color="terracotta" size="20px" />
              <span>Tot 4 personen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this component as it's purely presentational
</script>

<style lang="scss" scoped>
.section {
  padding: 3rem 0;
}

.booking-highlights {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--cms-gray-800);
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  span {
    font-size: 0.9rem;
    white-space: nowrap;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 2rem 0;
  }
  
  .booking-highlights {
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .highlight-item {
    padding: 0.4rem 0.8rem;
    
    span {
      font-size: 0.85rem;
    }
  }
  
  h2 {
    font-size: 1.8rem !important;
  }
}
</style> 