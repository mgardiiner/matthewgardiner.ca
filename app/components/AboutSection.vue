<template>
  <section id="about" class="relative overflow-hidden bg-slate-950 py-24">
    <!-- Dot canvas — right edge fragment -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
      style="mask-image: radial-gradient(ellipse at 100% 50%, black 0%, transparent 55%); -webkit-mask-image: radial-gradient(ellipse at 100% 50%, black 0%, transparent 55%);"
    >
      <DotCanvas :spacing="38" :opacity="0.55" />
    </div>

    <!-- Floating colour blobs -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-8 top-16 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" style="animation:aurora-float 14s ease-in-out infinite 0s;" />
      <div class="absolute bottom-16 right-8 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" style="animation:aurora-float 18s ease-in-out infinite -5s;" />
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-4">
      <!-- Section label -->
      <div ref="sectionRef" class="mb-12 text-center">
        <span class="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-cyan-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          About
        </span>
        <h2 class="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Craft. Speed. <span class="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Precision.</span>
        </h2>
      </div>

      <!-- Bento grid -->
      <div class="grid gap-5 md:grid-cols-12">

        <!-- Bio card — large -->
        <div
          class="about-card md:col-span-7 rounded-2xl border border-slate-800/60 bg-slate-900/50 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-500/30"
          :class="{ 'is-visible': visible }"
          style="--delay: 0s"
        >
          <div class="mb-5 flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <h3 class="text-xl font-semibold text-white">About Me</h3>
          </div>
          <div class="space-y-3 text-sm leading-relaxed text-slate-300">
            <p>
              I'm a full-stack developer who cares about craft, usability, and speed to value.
              I partner with teams to design and ship product experiences — from early prototypes
              to production-ready applications.
            </p>
            <p>
              My sweet spot is bridging design and engineering: clean interfaces, scalable
              systems, and performance you can measure. Currently shipping at
              <span class="font-medium text-white">Trend Hunter</span>.
            </p>
          </div>

          <!-- Mini social row -->
          <div class="mt-6 flex gap-3">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              :target="s.external ? '_blank' : undefined"
              :rel="s.external ? 'noreferrer' : undefined"
              :aria-label="s.label"
              class="cursor-pointer rounded-lg border border-slate-700/60 bg-slate-800/50 p-2.5 text-slate-400 transition-colors duration-200 hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <component :is="s.icon" class="h-4 w-4" />
            </a>
          </div>

          <!-- CTA buttons -->
          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLink
              to="/about"
              class="cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:from-cyan-400 hover:to-violet-500 hover:shadow-lg hover:shadow-violet-500/30"
            >
              Full bio
            </NuxtLink>
            <a
              href="#contact"
              class="cursor-pointer rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors duration-200 hover:border-violet-500/40 hover:bg-slate-800"
              @click.prevent="scrollTo('#contact')"
            >
              Work with me
            </a>
          </div>
        </div>

        <!-- Skills card -->
        <div
          class="about-card md:col-span-5 rounded-2xl border border-slate-800/60 bg-slate-900/50 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/30"
          :class="{ 'is-visible': visible }"
          style="--delay: 0.15s"
        >
          <div class="mb-5 flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 class="text-xl font-semibold text-white">Skills</h3>
          </div>
          <div class="flex flex-wrap gap-2.5">
            <span
              v-for="(skill, i) in skills"
              :key="skill"
              class="skill-badge rounded-full border border-slate-700/60 bg-slate-800/60 px-3.5 py-1.5 text-xs font-medium text-slate-200"
              :style="`animation-delay: ${i * 0.18}s; animation-duration: ${3.5 + (i % 4) * 0.7}s`"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Stats row -->
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="about-card rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-500/25 md:col-span-3"
          :class="{ 'is-visible': visible }"
          :style="`--delay: ${0.25 + i * 0.1}s`"
        >
          <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-cyan-400">
            <component :is="stat.icon" class="h-4.5 w-4.5" />
          </div>
          <div class="text-3xl font-bold text-white">
            {{ stat.display }}{{ stat.suffix }}
          </div>
          <div class="mt-1 text-sm text-slate-400">{{ stat.label }}</div>
          <!-- Accent left bar -->
          <div class="absolute left-0 top-0 h-full w-px rounded-l-2xl bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent, h, watch } from "vue";
import { portfolioData } from "@/constants/portfolioData";

const sectionRef = ref<HTMLElement | null>(null);
const { visible } = useVisibilityOnce(sectionRef, 0.2);
const { socials } = useSocials();

const skills = portfolioData.skills;

// ── Stat icons (stroke SVGs) ────────────────────────────
const IconTrophy  = defineComponent({ render: () => h("svg", { xmlns:"http://www.w3.org/2000/svg", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true" }, [h("path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6"}),h("path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18"}),h("path",{d:"M4 22h16"}),h("path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"}),h("path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"}),h("path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z"})]) });
const IconPackage = defineComponent({ render: () => h("svg", { xmlns:"http://www.w3.org/2000/svg", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true" }, [h("path",{d:"m7.5 4.27 9 5.15"}),h("path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}),h("path",{d:"m3.3 7 8.7 5 8.7-5"}),h("path",{d:"M12 22V12"})]) });
const IconClock   = defineComponent({ render: () => h("svg", { xmlns:"http://www.w3.org/2000/svg", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true" }, [h("circle",{cx:"12",cy:"12",r:"10"}),h("polyline",{points:"12 6 12 12 16 14"})]) });
const IconZap     = defineComponent({ render: () => h("svg", { xmlns:"http://www.w3.org/2000/svg", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true" }, [h("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})]) });

const statDefs = [
  { target: 5,  suffix: "+",  label: "Years experience",  icon: IconTrophy  },
  { target: 20, suffix: "+",  label: "Tools shipped",      icon: IconPackage },
  { target: 100, suffix: "+", label: "Features shipped",  icon: IconClock   },
  { target: 12, suffix: "+",  label: "AI features built", icon: IconZap     },
];

const stats = reactive(statDefs.map(s => ({ ...s, display: 0 })));
const { start: startCountUp } = useCountUp(stats);

watch(visible, (v) => { if (v) startCountUp(); });

const scrollTo = (hash: string) => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
</script>

<style scoped>
/* Bento card reveal */
.about-card {
  position: relative;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease var(--delay, 0s), transform 0.6s ease var(--delay, 0s);
}
.about-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Floating skill badges */
.skill-badge {
  animation: badge-float var(--dur, 4s) ease-in-out infinite;
  transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.skill-badge:hover {
  border-color: rgba(167, 139, 250, 0.5);
  color: #c4b5fd;
  box-shadow: 0 0 16px rgba(167, 139, 250, 0.25);
}
</style>
