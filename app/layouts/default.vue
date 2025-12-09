<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import NavBar from "~/components/common/NavBar.vue";
import SiteFooter from "~/components/common/SiteFooter.vue";
</script>
