<script setup lang="ts">
definePageMeta({
  layout: "default",
});

import { computed, ref } from "vue";
import { portfolioData } from "@/constants/portfolioData";

const route = useRoute();
const slug = route.params.slug as string;
const project = portfolioData.projects.find((item) => item.slug === slug) || null;
const playerRef = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);
const isHoveringPlayer = ref(false);
const hasStarted = ref(false);
const hasEnded = ref(false);
const isVideo = project?.hoverVideo
  ? !/\.gif(?:$|\?)/i.test(project.hoverVideo)
  : false;

const toggleVideo = () => {
  if (!playerRef.value) {
    return;
  }

  if (playerRef.value.paused) {
    hasStarted.value = true;
    hasEnded.value = false;
    playerRef.value.playbackRate = 1;
    playerRef.value.play().catch(() => {});
  } else {
    playerRef.value.pause();
  }
};

const handleVideoEnded = () => {
  hasEnded.value = true;
  isPlaying.value = false;
};

const showThumbnail = computed(() => !hasStarted.value || hasEnded.value);
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-14 md:py-20">
    <div v-if="project" class="space-y-10">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-sm font-medium text-slate-400">Project</p>
          <h1 class="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {{ project.title }}
          </h1>
        </div>
        <div class="flex gap-3">
          <a
            v-if="project.live"
            :href="project.live"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]"
          >
            Live demo
          </a>
          <NuxtLink
            to="/projects"
            class="inline-flex items-center justify-center rounded-xl border border-slate-800 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900"
          >
            Back to projects
          </NuxtLink>
        </div>
      </div>

      <p class="max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
        {{ project.excerpt }}
      </p>

      <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div class="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <div
            v-if="isVideo"
            class="relative aspect-[16/10] bg-black"
            @mouseenter="isHoveringPlayer = true"
            @mouseleave="isHoveringPlayer = false"
          >
            <video
              ref="playerRef"
              :src="project.hoverVideo"
              :poster="project.image || undefined"
              class="h-full w-full object-cover"
              playsinline
              preload="metadata"
              @play="isPlaying = true"
              @pause="isPlaying = false"
              @ended="handleVideoEnded"
            ></video>
            <img
              v-if="project.image && showThumbnail"
              :src="project.image"
              :alt="project.title"
              class="absolute inset-0 h-full w-full object-cover"
            />
            <button
              type="button"
              class="absolute inset-0 flex items-center justify-center bg-black/35 text-white transition hover:bg-black/50"
              :class="{ 'opacity-0 pointer-events-none': isPlaying && !isHoveringPlayer }"
              @click="toggleVideo"
              aria-label="Play or pause video"
            >
              <svg
                v-if="!isPlaying"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-12 w-12 fill-current"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-12 w-12 fill-current"
              >
                <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
              </svg>
            </button>
          </div>
          <img
            v-else-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="h-full w-full object-cover"
          />
          <div
            v-else
            class="flex h-64 items-center justify-center text-sm text-slate-500 md:h-80"
          >
            Project image
          </div>
        </div>

        <div class="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <div v-if="project.metric">
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Impact</p>
            <p class="mt-2 text-lg font-semibold text-white">
              {{ project.metric }}
            </p>
          </div>

          <div v-if="project.tags?.length">
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Stack</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="border-t border-slate-800 pt-4">
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Details</p>
            <dl class="mt-3 space-y-2 text-sm text-slate-300">
              <div class="flex items-center justify-between gap-2">
                <dt class="text-slate-400">Date</dt>
                <dd class="text-right text-slate-200">{{ project.date }}</dd>
              </div>
              <div v-if="project.url" class="flex items-center justify-between gap-2">
                <dt class="text-slate-400">Project URL</dt>
                <dd class="text-right">
                  <a
                    :href="project.url"
                    target="_blank"
                    rel="noreferrer"
                    class="text-slate-200 hover:text-[var(--accent)] hover:underline"
                  >
                    Visit
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-slate-300">
      Project not found.
    </div>
  </section>
</template>
