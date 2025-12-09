<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/common/Navbar.vue";
import SiteFooter from "~/components/common/SiteFooter.vue";
</script>
