<template>
  <section id="contact" class="relative overflow-hidden bg-slate-950 py-24">

    <div ref="sectionRef" class="relative z-10 mx-auto max-w-6xl px-4">
      <div
        class="contact-item relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16"
        :class="{ 'is-visible': visible }"
        style="background: linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(109,40,217,0.15) 100%);"
      >
        <!-- Border -->
        <div class="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />

        <!-- Glow blobs -->
        <div aria-hidden="true" class="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div aria-hidden="true" class="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

        <!-- Dot canvas — scattered across card -->
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
          style="mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%);"
        >
          <DotCanvas :spacing="44" :opacity="0.4" />
        </div>

        <div class="relative z-10">
          <span class="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contact
          </span>
          <h2 class="mt-1 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Let's <span class="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p class="mx-auto mt-4 max-w-md text-slate-400">
            Have a project in mind or just want to talk shop? I'm always open to interesting conversations.
          </p>
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              :href="`mailto:${portfolioData.email}?subject=${encodeURIComponent('Project inquiry')}`"
              class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:from-cyan-400 hover:to-violet-500 hover:shadow-lg hover:shadow-violet-500/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Email me
            </a>
            <a
              :href="portfolioData.linkedin"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              :href="portfolioData.github"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { portfolioData } from "@/constants/portfolioData";

const sectionRef = ref<HTMLElement | null>(null);
const { visible } = useVisibilityOnce(sectionRef, 0.1);
</script>

<style scoped>
.contact-item {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.contact-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
