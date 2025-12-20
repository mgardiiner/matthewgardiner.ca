<template>
  <section id="services" class="mx-auto max-w-6xl px-4 py-14 md:py-20">
    <div>
      <h2 class="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        What I do
      </h2>
      <p class="mt-2 max-w-2xl text-slate-300">
        Focused services that move product teams faster without sacrificing quality.
      </p>
    </div>

    <div class="mt-8 grid gap-5 md:grid-cols-3">
      <div
        v-for="s in services"
        :key="s.title"
        class="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm transition hover:border-[var(--accent)]/40"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-slate-950">
            <span class="text-sm font-semibold">{{ s.icon }}</span>
          </div>
          <h3 class="text-lg font-semibold text-white">
            {{ s.title }}
          </h3>
        </div>

        <p class="mt-3 text-sm leading-relaxed text-slate-300">
          {{ s.summary }}
        </p>

        <ul class="mt-4 space-y-2 text-sm text-slate-200">
          <li v-for="b in s.bullets" :key="b" class="flex gap-2">
            <span class="mt-1 text-slate-500">•</span>
            <span>{{ b }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: "BE",
    title: "Backend development",
    summary: "Reliable PHP backends that power real production systems.",
    bullets: [
      "API & data modeling",
      "Business logic & integrations",
      "Performance and maintainability",
    ],
  },
  {
    icon: "FS",
    title: "Full-stack web apps",
    summary: "End-to-end development from database to user interface.",
    bullets: [
      "PHP + frontend integration",
      "Feature development & iteration",
      "Debugging and refactoring",
    ],
  },
  {
    icon: "PR",
    title: "Production & delivery",
    summary: "Code that’s built to ship, scale, and be maintained by teams.",
    bullets: [
      "Production-ready releases",
      "Bug fixes & technical debt cleanup",
      "Collaboration with product teams",
    ],
  },
];
</script>
