<script setup>
definePageMeta({
  layout: "default",
});

import HeroSection from "~/components/home/HeroSection.vue";
import FeaturedProjects from "~/components/home/FeaturedProjects.vue";
import ServicesRow from "~/components/home/ServicesRow.vue";
import ProofSection from "~/components/home/ProofSection.vue";
import AboutTeaser from "~/components/home/AboutTeaser.vue";
import ContactSection from "~/components/home/ContactSection.vue";
</script>

<template>
  <HeroSection />
      <FeaturedProjects />
  <ServicesRow />
  <ProofSection />
  <AboutTeaser />
  <ContactSection />
</template>
