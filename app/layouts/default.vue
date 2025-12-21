<template>
  <div
    class="min-h-screen bg-slate-950 text-slate-100 [--accent:#22d3ee] [--accent2:#a78bfa]"
  >
    <LandingHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import LandingHeader from "~/components/home/LandingHeader.vue";
import SiteFooter from "~/components/home/SiteFooter.vue";
</script>
