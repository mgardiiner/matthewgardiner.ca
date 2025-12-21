<template>
  <section class="mx-auto max-w-6xl px-4 pt-14 pb-10 md:pt-20 md:pb-16">
    <div class="grid items-center gap-10 md:grid-cols-12">
      <div class="md:col-span-7">
        <h1
          class="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl"
        >
          I design & build
          <span
            class="underline decoration-[var(--accent)] decoration-8 underline-offset-4"
            >fast</span
          >, polished web applications.
        </h1>

        <div
          class="mt-5 h-px w-40 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/70 to-[var(--accent)]/0"
        ></div>

        <p
          class="mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
        >
          PHP-focused Full-stack Developer. I turn product goals into clean
          interfaces, scalable design systems, and production-ready code.
        </p>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]"
          >
            View work
          </a>

          <a
            :href="resumeUrl"
            class="inline-flex items-center justify-center rounded-xl border border-slate-800 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-900"
          >
            Download resume
          </a>

          <div class="flex items-center gap-3 text-sm text-slate-400">
            <a
              :href="portfolioData.github"
              target="_blank"
              class="hover:text-[var(--accent)]"
              >GitHub</a
            >
            <span class="text-slate-600">•</span>
            <a
              :href="portfolioData.linkedin"
              target="_blank"
              class="hover:text-[var(--accent)]"
              >LinkedIn</a
            >
            <span class="text-slate-600">•</span>
            <a
              :href="`mailto:${portfolioData.email}`"
              class="hover:text-[var(--accent)]"
              >Email</a
            >
          </div>
        </div>

        <div
          class="mt-10 flex flex-wrap items-center gap-6 text-xs text-slate-400"
        >
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-300">Current Employer:</span>
            <span>Trend Hunter</span>
          </div>
        </div>
      </div>

      <div class="md:col-span-5">
        <div
          v-if="featuredProject"
          class="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 shadow-sm"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-medium text-slate-400">Featured project</p>
              <h2 class="mt-1 text-lg font-semibold text-white">
                {{ featuredProject.title }}
              </h2>
              <p class="mt-1 text-sm text-slate-300">
                {{ featuredProject.excerpt }}
              </p>
            </div>
          </div>

          <div
            class="mt-5 relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 group"
            @mouseenter="playFeaturedVideo"
            @mouseleave="pauseFeaturedVideo"
          >
            <img
              v-if="featuredProject.image"
              :src="featuredProject.image"
              :alt="featuredProject.title"
              class="h-full w-full object-cover"
            />
            <div
              v-else
              class="flex h-full items-center justify-center text-sm text-slate-500"
            >
              Screenshot / mockup
            </div>
            <video
              v-if="featuredProject.hoverVideo && !isFeaturedGif"
              ref="featuredVideoRef"
              :src="featuredProject.hoverVideo"
              class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              muted
              loop
              playsinline
              preload="metadata"
              @loadedmetadata="setFeaturedPlaybackRate"
            ></video>
            <img
              v-else-if="featuredProject.hoverVideo"
              :src="featuredProject.hoverVideo"
              :alt="`${featuredProject.title} preview`"
              class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>

          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="t in featuredTags"
              :key="t"
              class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100 ring-1 ring-[var(--accent)]/15"
            >
              {{ t }}
            </span>
          </div>

          <div class="mt-5 flex gap-3">
            <NuxtLink
              :to="`/work/${featuredProject.slug}`"
              class="flex-1 rounded-xl bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]"
            >
              Learn More
            </NuxtLink>
            <a
              v-if="featuredDemoUrl"
              :href="featuredDemoUrl"
              target="_blank"
              rel="noreferrer"
              class="flex-1 rounded-xl border border-slate-800 px-4 py-2 text-center text-sm font-medium text-slate-100 hover:bg-slate-900"
            >
              Live demo
            </a>
          </div>
        </div>

        <div
          class="mt-4 h-px w-full bg-gradient-to-r from-[var(--accent2)]/0 via-[var(--accent2)]/40 to-[var(--accent2)]/0"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { portfolioData } from "@/constants/portfolioData";

const resumeUrl = "/resume.pdf";
const featuredProject =
  portfolioData.projects.find((project) => project.featured) ||
  portfolioData.projects[0] ||
  null;
const featuredTags =
  featuredProject && featuredProject.tags && featuredProject.tags.length
    ? featuredProject.tags
    : ["UI", "AI", "PHP", "Design Systems", "API"];
const featuredDemoUrl =
  (featuredProject && (featuredProject.live || featuredProject.url)) || "";
const featuredVideoRef = ref(null);
const isFeaturedGif = computed(() =>
  featuredProject?.hoverVideo
    ? /\.gif(?:$|\?)/i.test(featuredProject.hoverVideo)
    : false
);

const setFeaturedPlaybackRate = (event) => {
  event.target.playbackRate = 2;
};

const playFeaturedVideo = () => {
  if (!featuredVideoRef.value) {
    return;
  }

  featuredVideoRef.value.playbackRate = 2;
  featuredVideoRef.value.play().catch(() => {});
};

const pauseFeaturedVideo = () => {
  if (!featuredVideoRef.value) {
    return;
  }

  featuredVideoRef.value.pause();
};
</script>
