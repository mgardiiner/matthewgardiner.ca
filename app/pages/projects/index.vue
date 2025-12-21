<script setup lang="ts">
definePageMeta({
  layout: "default",
});

import { portfolioData } from "@/constants/portfolioData";
import ProjectGrid from "@/components/projects/ProjectGrid.vue";

const projects = portfolioData.projects;
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-14 md:py-20">
    <div class="flex flex-wrap items-end justify-between gap-6">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          All projects
        </h1>
        <p class="mt-2 max-w-2xl text-slate-300">
          A full catalog of work across product design, UI engineering, and
          automation.
        </p>
      </div>
      <NuxtLink
        to="/"
        class="text-sm font-medium text-slate-300 hover:text-[var(--accent)] hover:underline"
      >
        Back to home →
      </NuxtLink>
    </div>

    <div class="mt-8">
      <ProjectGrid :items="projects" />
    </div>
  </section>
</template>
