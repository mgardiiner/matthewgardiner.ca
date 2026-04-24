<script setup lang="ts">
type Project = {
  slug: string;
  employer: string;
  company: string;
  department: string;
  title: string;
  excerpt?: string;
  metric?: string;
  tags?: string[];
  images: string[];
  live?: string;
  url?: string;
};

const props = defineProps<{
  items: Project[];
  visible?: boolean;
}>();
</script>

<template>
  <div class="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
    <NuxtLink
      v-for="(p, i) in props.items"
      :key="p.slug"
      :to="`/projects/${p.slug}`"
      class="project-card group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#080d16] transition-all duration-500 hover:border-cyan-500/40"
      :class="{ 'is-visible': props.visible }"
      :style="`--delay: ${i * 0.15}s`"
    >
      <!-- Top sweep bar -->
      <div class="absolute left-0 top-0 z-20 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <!-- Image block — full width, fixed height -->
      <div class="relative h-52 w-full overflow-hidden">
        <img
          v-if="p.images[0]"
          :src="p.images[0]"
          :alt="p.title"
          class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center bg-slate-900 text-sm text-slate-600"
        >
          No preview
        </div>

        <!-- Cyan/violet glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <!-- Deep gradient — covers bottom 70% of image, blending into card body -->
        <div class="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-[#080d16] via-[#080d16]/80 to-transparent" />
      </div>

      <!-- Card body -->
      <div class="flex flex-1 flex-col space-y-4 px-6 pb-7 pt-0">

        <div>
          <p class="mb-1 text-xs font-medium text-slate-500">{{ p.company }} · {{ p.department }}</p>
          <h3 class="line-clamp-2 text-2xl font-bold leading-tight text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-violet-400 group-hover:bg-clip-text group-hover:text-transparent">
            {{ p.title }}
          </h3>
        </div>

        <p class="line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-slate-400">
          {{ p.excerpt }}
        </p>

        <!-- Tags — outlined pills, max 4 -->
        <div class="flex min-h-[4rem] flex-wrap content-start gap-2">
          <span
            v-for="t in p.tags?.slice(0, 4)"
            :key="t"
            class="rounded-full border border-slate-700 px-3.5 py-1 text-xs font-medium text-cyan-400"
          >
            {{ t }}
          </span>
        </div>

        <!-- Details button -->
        <div class="!mt-auto pt-1">
          <div class="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:from-cyan-400 group-hover:to-violet-500 group-hover:shadow-lg group-hover:shadow-violet-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Details
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>

      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.project-card {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
              transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
}
.project-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
