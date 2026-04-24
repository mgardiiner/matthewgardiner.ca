<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { portfolioData } from "@/constants/portfolioData";

definePageMeta({ layout: "default" });

const sectionRef = ref<HTMLElement | null>(null);
const { visible } = useVisibilityOnce(sectionRef, 0.1);
const { socials } = useSocials();

const skills = portfolioData.skills;
const experience = portfolioData.experience;

const statDefs = [
  { target: 5,  suffix: "+",  label: "Years experience"  },
  { target: 20, suffix: "+",  label: "Tools shipped"      },
  { target: 100, suffix: "+", label: "Features shipped"  },
  { target: 12, suffix: "+",  label: "AI features built" },
];
const stats = reactive(statDefs.map(s => ({ ...s, display: 0 })));
const { start: startCountUp } = useCountUp(stats);

watch(visible, (v) => { if (v) startCountUp(); });
</script>

<template>
  <section class="relative overflow-hidden bg-slate-950 py-24">

    <!-- Floating blobs -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-8 top-16 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" style="animation:aurora-float 14s ease-in-out infinite 0s;" />
      <div class="absolute bottom-16 right-8 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" style="animation:aurora-float 18s ease-in-out infinite -5s;" />
    </div>

    <!-- Dot canvas — left edge fragment -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
      style="mask-image: radial-gradient(ellipse at 0% 40%, black 0%, transparent 52%); -webkit-mask-image: radial-gradient(ellipse at 0% 40%, black 0%, transparent 52%);"
    >
      <DotCanvas :spacing="38" :opacity="0.5" />
    </div>

    <div ref="sectionRef" class="relative z-10 mx-auto max-w-6xl px-4">

      <!-- Header -->
      <div class="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span class="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            About
          </span>
          <h1 class="text-4xl font-bold tracking-tight text-white md:text-5xl">
            The Full <span class="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Picture</span>
          </h1>
          <p class="mt-3 max-w-xl text-slate-400">
            Full-stack developer focused on craft, speed, and outcomes that matter.
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

      <!-- Bio + Skills -->
      <div class="grid gap-6 md:grid-cols-12">

        <!-- Bio -->
        <div
          class="about-card md:col-span-7 rounded-2xl border border-slate-800/60 bg-slate-900/50 p-8 backdrop-blur-sm"
          :class="{ 'is-visible': visible }"
          style="--delay: 0s"
        >
          <h2 class="mb-5 text-xl font-bold text-white">Who I am</h2>
          <div class="space-y-4 text-sm leading-relaxed text-slate-300">
            <p>
              I'm a full-stack developer who cares deeply about craft, usability, and speed to value.
              I partner with teams to design and ship product experiences — from early prototypes
              to production-ready applications.
            </p>
            <p>
              My sweet spot is bridging design and engineering: clean interfaces, scalable
              systems, and performance you can measure. I believe great products come from
              tight feedback loops, honest communication, and relentless iteration.
            </p>
            <p>
              Currently building AI-powered tools and internal platforms at
              <span class="font-semibold text-white">Trend Hunter</span> in Toronto.
            </p>
          </div>
          <div class="mt-8 flex gap-3">
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
        </div>

        <!-- Skills -->
        <div
          class="about-card md:col-span-5 rounded-2xl border border-slate-800/60 bg-slate-900/50 p-8 backdrop-blur-sm"
          :class="{ 'is-visible': visible }"
          style="--delay: 0.12s"
        >
          <h2 class="mb-5 text-xl font-bold text-white">Skills</h2>
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

        <!-- Stats -->
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="about-card relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6 backdrop-blur-sm md:col-span-3"
          :class="{ 'is-visible': visible }"
          :style="`--delay: ${0.24 + i * 0.1}s`"
        >
          <div class="text-3xl font-bold text-white">{{ stat.display }}{{ stat.suffix }}</div>
          <div class="mt-1 text-sm text-slate-400">{{ stat.label }}</div>
          <div class="absolute left-0 top-0 h-full w-px rounded-l-2xl bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
        </div>

      </div>

      <!-- Experience -->
      <div class="mt-10">
        <h2
          class="about-card mb-6 text-xl font-bold text-white"
          :class="{ 'is-visible': visible }"
          style="--delay: 0.6s"
        >
          Experience
        </h2>
        <div class="space-y-5">
          <div
            v-for="(job, i) in experience"
            :key="job.company"
            class="about-card rounded-2xl border border-slate-800/60 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30"
            :class="{ 'is-visible': visible }"
            :style="`--delay: ${0.7 + i * 0.12}s`"
          >
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-bold text-white">{{ job.role }}</h3>
                <p class="mt-0.5 text-sm font-medium text-cyan-400">{{ job.company }}</p>
              </div>
              <span class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">{{ job.period }}</span>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-slate-400">{{ job.description }}</p>
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in job.tags"
                :key="tag"
                class="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-cyan-400"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about-card {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
              transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
}
.about-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
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
