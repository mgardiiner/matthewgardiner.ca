<script setup>
import { onMounted } from "vue";

definePageMeta({
  layout: "default",
});

onMounted(() => {
  if (typeof IntersectionObserver === "undefined") return;

  const targets = document.querySelectorAll(".fade-up");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
});
</script>

<template>
  <HeroSection />
  <AboutSection class="fade-up" />
  <FeaturedProjects class="fade-up delay-1" />
  <TestimonialsSection class="fade-up delay-1" />
  <ContactSection class="fade-up" />
</template>
