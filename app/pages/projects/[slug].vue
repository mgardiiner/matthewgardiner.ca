<script setup lang="ts">
definePageMeta({ layout: "default" });

import { computed, ref, onMounted, onUnmounted } from "vue";
import { portfolioData } from "@/constants/portfolioData";

const route = useRoute();
const slug = route.params.slug as string;
const project = portfolioData.projects.find((p) => p.slug === slug) || null;

const allImages = computed(() => project?.images?.filter(Boolean) ?? []);
const currentIndex = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const prev = () => { currentIndex.value = (currentIndex.value - 1 + allImages.value.length) % allImages.value.length; };
const next = () => { currentIndex.value = (currentIndex.value + 1) % allImages.value.length; };
const goTo = (i: number) => { currentIndex.value = i; stopTimer(); startTimer(); };
const stopTimer = () => { if (timer) { clearInterval(timer); timer = null; } };
const startTimer = () => { if (allImages.value.length > 1) timer = setInterval(next, 4000); };

onMounted(startTimer);
onUnmounted(stopTimer);

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "long" });

const formattedDate = computed(() => (project?.date ? formatDate(project.date) : null));
const formattedLastUpdated = computed(() => (project?.lastUpdated ? formatDate(project.lastUpdated) : null));

const relatedProjects = computed(() => {
  if (!project) return [];
  if (project.related?.length) {
    return project.related
      .map((s) => portfolioData.projects.find((p) => p.slug === s))
      .filter(Boolean);
  }
  return portfolioData.projects
    .filter((p) => p.slug !== project.slug && p.tags?.some((t) => project.tags?.includes(t)))
    .sort((a, b) => {
      const aMatches = a.tags?.filter((t) => project.tags?.includes(t)).length ?? 0;
      const bMatches = b.tags?.filter((t) => project.tags?.includes(t)).length ?? 0;
      return bMatches - aMatches;
    })
    .slice(0, 3);
});
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-slate-950">

    <!-- Background -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/6 blur-3xl" />
      <div class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/6 blur-3xl" />
    </div>

    <div v-if="project" class="relative z-10 mx-auto max-w-6xl px-4 py-14 md:py-20">

      <!-- Breadcrumb -->
      <div class="mb-10 flex items-center justify-between gap-4">
        <nav class="flex items-center gap-2 text-sm text-slate-500">
          <NuxtLink to="/projects" class="transition-colors hover:text-slate-300">Projects</NuxtLink>
          <svg class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          <span class="truncate text-slate-400">{{ project.title }}</span>
        </nav>
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          All projects
        </NuxtLink>
      </div>

      <!-- Hero -->
      <div class="mb-10">
        <div class="mb-4 flex flex-wrap items-center gap-2">
          <span v-if="formattedDate" class="text-xs text-slate-500">{{ formattedDate }}</span>
          <span v-if="formattedDate" class="text-slate-700">·</span>
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400 ring-1 ring-white/10"
          >{{ tag }}</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight text-white md:text-5xl">{{ project.title }}</h1>
        <p class="mt-5 max-w-3xl text-base leading-relaxed text-slate-400 md:text-lg">{{ project.excerpt }}</p>
      </div>

      <!-- Media -->
      <div class="mb-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
        <div
          v-if="allImages.length"
          class="relative"
          @mouseenter="stopTimer"
          @mouseleave="startTimer"
        >
          <Transition name="img-fade" mode="out-in">
            <img
              :key="currentIndex"
              :src="allImages[currentIndex]"
              :alt="project.title"
              class="max-h-[420px] w-full object-cover"
            />
          </Transition>

          <template v-if="allImages.length > 1">
            <button type="button" class="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60" aria-label="Previous image" @click="prev">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60" aria-label="Next image" @click="next">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              <button
                v-for="(_, i) in allImages"
                :key="i"
                type="button"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="i === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'"
                :aria-label="`Image ${i + 1}`"
                @click="goTo(i)"
              />
            </div>
          </template>
        </div>
        <div v-else class="flex h-64 items-center justify-center text-sm text-slate-600">
          No preview available
        </div>
      </div>

      <!-- Live demo -->
      <a
        v-if="project.live"
        :href="project.live"
        target="_blank"
        rel="noreferrer"
        class="mb-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:from-cyan-400 hover:to-violet-500 hover:shadow-lg hover:shadow-violet-500/25"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Live demo
      </a>

      <!-- Problem / Solution -->
      <div v-if="project.problem || project.solution" class="mb-6 grid gap-4 sm:grid-cols-2">
        <div v-if="project.problem" class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <p class="text-xs font-medium uppercase tracking-widest text-slate-400">Problem</p>
          <p class="mt-3 text-sm leading-relaxed text-slate-300">{{ project.problem }}</p>
        </div>
        <div v-if="project.solution" class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <p class="text-xs font-medium uppercase tracking-widest text-slate-400">Solution</p>
          <p class="mt-3 text-sm leading-relaxed text-slate-300">{{ project.solution }}</p>
        </div>
      </div>

      <!-- Details + Stakeholders -->
      <div class="grid gap-6 md:grid-cols-[1fr_320px]">

        <!-- Left: project details -->
        <div class="flex flex-col gap-6">
          <div v-if="project.metric" class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <p class="text-xs font-medium uppercase tracking-widest text-cyan-400">Impact</p>
            <p class="mt-2 text-2xl font-bold text-white">{{ project.metric }}</p>
          </div>

          <div class="flex-1 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <p class="text-xs font-medium uppercase tracking-widest text-slate-400">Project Info</p>
            <dl class="mt-4 divide-y divide-slate-800">
              <div class="flex items-center justify-between py-3">
                <dt class="text-sm text-slate-500">Employer</dt>
                <dd class="text-sm text-slate-300">{{ project.employer }}</dd>
              </div>
              <div class="flex items-center justify-between py-3">
                <dt class="text-sm text-slate-500">Built for</dt>
                <dd class="text-sm text-slate-300">{{ project.company }} · {{ project.department }}</dd>
              </div>
              <div v-if="formattedDate" class="flex items-center justify-between py-3">
                <dt class="text-sm text-slate-500">Date Started</dt>
                <dd class="text-sm text-slate-300">{{ formattedDate }}</dd>
              </div>
              <div v-if="formattedLastUpdated" class="flex items-center justify-between py-3">
                <dt class="text-sm text-slate-500">Last Updated</dt>
                <dd class="text-sm text-slate-300">{{ formattedLastUpdated }}</dd>
              </div>
              <div v-if="project.duration" class="flex items-center justify-between py-3">
                <dt class="text-sm text-slate-500">Duration</dt>
                <dd class="text-sm text-slate-300">{{ project.duration }}</dd>
              </div>
              <div class="flex items-center justify-between py-3">
                <dt class="text-sm text-slate-500">Link</dt>
                <dd class="text-sm">
                  <a
                    v-if="project.live || project.url"
                    :href="project.live || project.url"
                    target="_blank"
                    rel="noreferrer"
                    class="text-cyan-400 transition-colors hover:text-cyan-300"
                  >Visit ↗</a>
                  <span v-else class="text-slate-600">—</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Right: stakeholders -->
        <div class="flex flex-col">
          <div v-if="project.stakeholders?.length" class="flex-1 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <p class="text-xs font-medium uppercase tracking-widest text-slate-400">Stakeholders</p>
            <ul class="mt-4 divide-y divide-slate-800">
              <li
                v-for="s in project.stakeholders"
                :key="s.name"
                class="flex flex-col py-3 first:pt-0 last:pb-0"
              >
                <span class="text-sm font-medium text-white">{{ s.name }}</span>
                <span class="mt-0.5 text-xs text-slate-500">{{ s.role }}</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      <!-- Related projects -->
      <div v-if="relatedProjects.length" class="mt-16">
        <h2 class="mb-6 text-sm font-medium uppercase tracking-widest text-slate-400">Related Projects</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="p in relatedProjects"
            :key="p.slug"
            :to="`/projects/${p.slug}`"
            class="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-slate-700 hover:bg-slate-900"
          >
            <div v-if="p.images?.[0]" class="mb-4 overflow-hidden rounded-xl">
              <img :src="p.images[0]" :alt="p.title" class="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div v-else class="mb-4 flex h-36 items-center justify-center rounded-xl bg-slate-800 text-xs text-slate-600">No preview</div>
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span
                v-for="tag in p.tags?.slice(0, 3)"
                :key="tag"
                class="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-slate-500 ring-1 ring-white/10"
              >{{ tag }}</span>
            </div>
            <p class="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{{ p.title }}</p>
            <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{{ p.excerpt }}</p>
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- Not found -->
    <div v-else class="relative z-10 mx-auto max-w-6xl px-4 py-20">
      <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
        <p class="text-slate-400">Project not found.</p>
        <NuxtLink to="/projects" class="mt-4 inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          Back to projects
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<style scoped>
.img-fade-enter-active,
.img-fade-leave-active {
  transition: opacity 0.35s ease;
}
.img-fade-enter-from,
.img-fade-leave-to {
  opacity: 0;
}
</style>
