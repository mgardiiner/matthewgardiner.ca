<template>
  <section class="mx-auto max-w-6xl px-4 pt-14 pb-10 md:pt-20 md:pb-16">
    <div class="grid items-center gap-10 md:grid-cols-12">
      <div class="md:col-span-7">
        <p class="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-300">
          <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
          Available for select projects
        </p>

        <h1 class="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
          I design & build
          <span class="underline decoration-[var(--accent)] decoration-8 underline-offset-4">fast</span>,
          polished web applications.
        </h1>

        <div class="mt-5 h-px w-40 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/70 to-[var(--accent)]/0"></div>

        <p class="mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
          PHP-focused Full-stack Developer. I turn product goals into clean interfaces, scalable design systems, and production-ready code.
        </p>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#work"
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
            <a :href="social.github" target="_blank" class="hover:text-[var(--accent)]">GitHub</a>
            <span class="text-slate-600">•</span>
            <a :href="social.linkedin" target="_blank" class="hover:text-[var(--accent)]">LinkedIn</a>
            <span class="text-slate-600">•</span>
            <a :href="`mailto:${email}`" class="hover:text-[var(--accent)]">Email</a>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-300">Current Employer:</span>
            <span>Trend Hunter</span>
          </div>
        </div>
      </div>

      <div class="md:col-span-5">
        <div class="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-medium text-slate-400">Featured project</p>
              <h2 class="mt-1 text-lg font-semibold text-white">Project Name</h2>
              <p class="mt-1 text-sm text-slate-300">A short one-liner about the outcome.</p>
            </div>
            <span class="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300">
              Nuxt 3
            </span>
          </div>

          <div class="mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div class="flex h-full items-center justify-center text-sm text-slate-500">
              Screenshot / mockup
            </div>
          </div>

          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="t in tags"
              :key="t"
              class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100 ring-1 ring-[var(--accent)]/15"
            >
              {{ t }}
            </span>
          </div>

          <div class="mt-5 flex gap-3">
            <a
              href="#work"
              class="flex-1 rounded-xl bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]"
            >
              Case study
            </a>
            <a
              href="#"
              class="flex-1 rounded-xl border border-slate-800 px-4 py-2 text-center text-sm font-medium text-slate-100 hover:bg-slate-900"
            >
              Live demo
            </a>
          </div>
        </div>

        <div class="mt-4 h-px w-full bg-gradient-to-r from-[var(--accent2)]/0 via-[var(--accent2)]/40 to-[var(--accent2)]/0"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const email = "matthew_gardiner@hotmail.com";
const resumeUrl = "/resume.pdf";

const social = {
  github: "https://github.com/mgardiiner",
  linkedin: "https://www.linkedin.com/in/matthew-gardiner-046115119/",
};

const tags = ["UI", "AI", "PHP", "Design Systems", "API"];
</script>
