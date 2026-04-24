<template>
  <section id="testimonials" class="relative overflow-hidden bg-slate-950 py-24">

    <!-- Floating blobs -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-8 top-16 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" style="animation:aurora-float 18s ease-in-out infinite -5s;" />
      <div class="absolute bottom-16 right-8 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" style="animation:aurora-float 22s ease-in-out infinite -9s;" />
    </div>

    <!-- Dot canvas — bottom-center fragment -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
      style="mask-image: radial-gradient(ellipse at 50% 100%, black 0%, transparent 50%); -webkit-mask-image: radial-gradient(ellipse at 50% 100%, black 0%, transparent 50%);"
    >
      <DotCanvas :spacing="42" :opacity="0.45" />
    </div>

    <div ref="sectionRef" class="relative z-10 mx-auto max-w-6xl px-4">

      <!-- Section label -->
      <div class="mb-12 text-center">
        <span class="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-cyan-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Testimonials
        </span>
        <h2 class="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Proof, <span class="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Not Hype</span>
        </h2>
        <p class="mx-auto mt-3 max-w-xl text-slate-400">
          Outcomes and how teams describe working with me.
        </p>
      </div>

      <!-- Scrolling strip -->
      <div
        class="scroll-fade-mask overflow-hidden"
        :class="{ 'strip-visible': visible }"
      >
        <div class="scroll-track flex gap-6" style="width: max-content;">
          <div
            v-for="(t, i) in doubled"
            :key="i"
            class="flex h-72 w-80 flex-none flex-col rounded-2xl border border-slate-800/60 bg-slate-900/50 p-7 backdrop-blur-sm"
          >
            <svg class="mb-4 h-5 w-5 shrink-0 text-cyan-500/60" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <p class="flex-1 text-sm leading-relaxed text-slate-300">"{{ t.quote }}"</p>
            <div class="mt-5 shrink-0 border-t border-slate-800 pt-4">
              <div class="text-sm font-semibold text-white">{{ t.author }}</div>
              <div class="mt-0.5 text-xs text-slate-400">{{ t.jobTitle }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { portfolioData } from "@/constants/portfolioData";

const testimonials = portfolioData.testimonials;
const doubled = computed(() => [...testimonials, ...testimonials]);

const sectionRef = ref<HTMLElement | null>(null);
const { visible } = useVisibilityOnce(sectionRef, 0.1);
</script>

<style scoped>
/* Edge fade masks */
.scroll-fade-mask {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}

/* Section entrance */
.scroll-track {
  opacity: 0;
  transition: opacity 0.8s ease;
}
.strip-visible .scroll-track {
  opacity: 1;
  animation: marquee 60s linear infinite;
}
.strip-visible .scroll-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
