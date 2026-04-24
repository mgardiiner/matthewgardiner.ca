<template>
  <section id="projects" class="relative overflow-hidden bg-slate-950 py-24">

    <!-- Dot canvas — top-left fragment -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 overflow-hidden"
      style="mask-image: radial-gradient(ellipse at 8% 12%, black 0%, transparent 52%); -webkit-mask-image: radial-gradient(ellipse at 8% 12%, black 0%, transparent 52%);"
    >
      <DotCanvas :spacing="38" :opacity="0.5" />
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-4">

      <!-- Section label — same pattern as About -->
      <div ref="sectionRef" class="mb-12 text-center">
        <span class="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-cyan-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Projects
        </span>
        <h2 class="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Selected <span class="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Work</span>
        </h2>
        <p class="mx-auto mt-3 max-w-xl text-slate-400">
          A range across UI engineering, backend systems, and product thinking.
        </p>
      </div>

      <!-- Cards grid -->
      <ProjectGrid :items="topProjects" :visible="visible" />

      <!-- View all — same ghost button as About's CTAs -->
      <div class="mt-10 text-center">
        <NuxtLink
          to="/projects"
          class="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors duration-200 hover:border-cyan-500/40 hover:bg-slate-800"
        >
          View all projects
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { portfolioData } from "@/constants/portfolioData";

const topProjects = portfolioData.projects.filter((p) => p.top);

const sectionRef = ref<HTMLElement | null>(null);
const { visible } = useVisibilityOnce(sectionRef, 0.1);
</script>
