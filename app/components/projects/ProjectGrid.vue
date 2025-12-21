<script setup lang="ts">
type Project = {
  slug: string;
  title: string;
  excerpt?: string;
  metric?: string;
  tags?: string[];
  image?: string;
  hoverVideo?: string;
  live?: string;
};

const props = defineProps<{
  items: Project[];
}>();

const hoverVideoRefs = new Map<string, HTMLVideoElement>();
const gifExtension = /\.gif(?:$|\?)/i;

const setHoverVideoRef = (el: HTMLVideoElement | null, slug: string) => {
  if (el) {
    hoverVideoRefs.set(slug, el);
  } else {
    hoverVideoRefs.delete(slug);
  }
};

const isGif = (src: string) => gifExtension.test(src);

const setPlaybackRate = (event: Event) => {
  const video = event.target as HTMLVideoElement | null;
  if (video) {
    video.playbackRate = 2;
  }
};

const playHoverVideo = (slug: string) => {
  const video = hoverVideoRefs.get(slug);
  if (!video) {
    return;
  }

  video.playbackRate = 2;
  video.play().catch(() => {});
};

const pauseHoverVideo = (slug: string) => {
  const video = hoverVideoRefs.get(slug);
  if (!video) {
    return;
  }

  video.pause();
};
</script>

<template>
  <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
    <article
      v-for="p in props.items"
      :key="p.slug"
      class="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:shadow-md"
      @mouseenter="playHoverVideo(p.slug)"
      @mouseleave="pauseHoverVideo(p.slug)"
    >
      <div class="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          v-if="p.image"
          :src="p.image"
          :alt="p.title"
          class="h-full w-full object-cover"
        />
        <div
          v-else
          class="flex h-full items-center justify-center text-sm text-slate-500"
        >
          Project image
        </div>
        <video
          v-if="p.hoverVideo && !isGif(p.hoverVideo)"
          :ref="(el) => setHoverVideoRef(el, p.slug)"
          :src="p.hoverVideo"
          class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          muted
          loop
          playsinline
          preload="metadata"
          @loadedmetadata="setPlaybackRate"
        ></video>
        <img
          v-else-if="p.hoverVideo"
          :src="p.hoverVideo"
          :alt="`${p.title} preview`"
          class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div class="p-5">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-lg font-semibold text-white">{{ p.title }}</h3>
            <p v-if="p.excerpt" class="mt-1 text-sm text-slate-300 h-[60px]">
              {{ p.excerpt }}
            </p>
          </div>

          <span
            v-if="p.metric"
            class="shrink-0 rounded-full border border-[var(--accent)]/30 bg-slate-950 px-3 py-1 text-xs text-slate-200"
          >
            {{ p.metric }}
          </span>
        </div>

        <div v-if="p.tags?.length" class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="t in p.tags"
            :key="t"
            class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
          >
            {{ t }}
          </span>
        </div>

        <div class="mt-5 flex gap-3">
          <NuxtLink
            :to="`/projects/${p.slug}`"
            class="flex-1 rounded-xl bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]"
          >
            Learn More
          </NuxtLink>

          <a
            v-if="p.live"
            :href="p.live"
            target="_blank"
            rel="noreferrer"
            class="flex-1 rounded-xl border border-slate-800 px-4 py-2 text-center text-sm font-medium text-slate-100 hover:bg-slate-900 hover:border-[var(--accent)]/40"
          >
            Live
          </a>
        </div>
      </div>
    </article>
  </div>
</template>
