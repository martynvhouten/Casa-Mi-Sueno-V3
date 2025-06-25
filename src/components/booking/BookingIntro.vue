<template>
  <!-- Introduction -->
  <section class="section bg-sand">
    <div class="container q-pa-xl">
      <div class="row justify-center q-col-gutter-xl">
        <div class="col-12 col-md-10 col-lg-8 text-center">
          <h2 class="text-h5 font-playfair q-mb-lg text-primary">Plan je verblijf</h2>
          <p class="text-body1 text-grey-8" style="line-height: 1.8; max-width: 800px; margin: 0 auto;">
            Kies je ideale vakantieperiode in ons mediterrane vakantiehuis. We hanteren eerlijke prijzen en 
            een persoonlijke benadering. Bekijk direct de beschikbaarheid en tarieven.
          </p>
        </div>
      </div>

      <div class="row justify-center q-mt-xl q-col-gutter-lg">
        <div class="col-12 col-sm-6 col-md-4">
          <div class="intro-feature-card">
            <q-icon name="schedule" color="terracotta" size="32px" class="q-mb-md" />
            <h3 class="text-subtitle1 font-playfair q-mb-md">Check-in & Check-out</h3>
            <p class="text-body2 text-grey-8 q-mb-none">Aankomst vanaf 16:00 uur, vertrek voor 10:00 uur. In het hoogseizoen (jul-aug) alleen aankomst op zaterdag.</p>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <div class="intro-feature-card">
            <q-icon name="date_range" color="terracotta" size="32px" class="q-mb-md" />
            <h3 class="text-subtitle1 font-playfair q-mb-md">Minimaal verblijf</h3>
            <p class="text-body2 text-grey-8 q-mb-none">
              Hoogseizoen (jul-aug): 7 nachten, za-za<br>
              Middenseizoen (apr-jun, sep): 5 nachten<br>
              Laagseizoen (okt-mrt): 3 nachten
            </p>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <div class="intro-feature-card">
            <q-icon name="euro" color="terracotta" size="32px" class="q-mb-md" />
            <h3 class="text-subtitle1 font-playfair q-mb-md">Prijzen & Kortingen</h3>
            <p class="text-body2 text-grey-8 q-mb-none">
              Weekkorting: 5% vanaf 7 nachten<br>
              Maandkorting: 15% vanaf 28 nachten<br>
              Eindschoonmaak: €150
            </p>
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
.intro-feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  height: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}
</style> 