<template>
  <section id="projects" class="mx-auto max-w-6xl px-4 py-14 md:py-20">
    <div class="flex items-end justify-between gap-6">
      <div>
        <h2
          class="text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          Featured Projects
        </h2>
        <p class="mt-2 max-w-2xl text-slate-300">
          A few projects that highlight my range across UI, engineering, and
          product thinking.
        </p>
      </div>
      <NuxtLink
        to="/projects"
        class="hidden text-sm font-medium text-slate-300 hover:text-[var(--accent)] hover:underline md:inline"
      >
        View All →
      </NuxtLink>
    </div>

    <div class="mt-8">
      <ProjectGrid :items="topProjects" />
    </div>

    <div class="mt-8 md:hidden">
      <NuxtLink
        to="/projects"
        class="text-sm font-medium text-slate-300 hover:text-[var(--accent)] hover:underline"
      >
        View All →
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { portfolioData } from "@/constants/portfolioData";
import ProjectGrid from "@/components/projects/ProjectGrid.vue";

const topProjects = portfolioData.projects.filter((project) => project.top);
</script>
