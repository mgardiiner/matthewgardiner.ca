<script setup lang="ts">
import { ref } from "vue";
import { portfolioData } from "@/constants/portfolioData";

definePageMeta({ layout: "default" });

const projects = portfolioData.projects;

const sectionRef = ref<HTMLElement | null>(null);
const { visible } = useVisibilityOnce(sectionRef, 0.05);
</script>

<template>
  <section class="relative overflow-hidden bg-slate-950 py-24">

    <!-- Floating blobs -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute right-8 top-16 h-64 w-64 rounded-full bg-violet-500/8 blur-3xl" style="animation:aurora-float 16s ease-in-out infinite -3s;" />
      <div class="absolute bottom-16 left-8 h-80 w-80 rounded-full bg-cyan-500/8 blur-3xl" style="animation:aurora-float 20s ease-in-out infinite -7s;" />
    </div>

    <!-- Dot canvas — top-right fragment -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
      style="mask-image: radial-gradient(ellipse at 95% 8%, black 0%, transparent 50%); -webkit-mask-image: radial-gradient(ellipse at 95% 8%, black 0%, transparent 50%);"
    >
      <DotCanvas :spacing="38" :opacity="0.5" />
    </div>

    <div ref="sectionRef" class="relative z-10 mx-auto max-w-6xl px-4">

      <!-- Header -->
      <div class="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span class="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            All Projects
          </span>
          <h1 class="text-4xl font-bold tracking-tight text-white md:text-5xl">
            The Full <span class="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Catalog</span>
          </h1>
          <p class="mt-3 max-w-xl text-slate-400">
            Every project across product design, UI engineering, and backend systems.
          </p>
        </div>

        <NuxtLink
          to="/"
          class="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/50 px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors duration-200 hover:border-cyan-500/40 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back home
        </NuxtLink>
      </div>

      <!-- All projects grid -->
      <ProjectGrid :items="projects" :visible="visible" />

    </div>
  </section>
</template>
