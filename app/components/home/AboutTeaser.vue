<template>
  <section id="about" class="mx-auto max-w-6xl px-4 py-14 md:py-20">
    <div class="grid items-start gap-8 md:grid-cols-12">
      <div class="md:col-span-5">
        <h2
          class="text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          About
        </h2>
        <p class="mt-2 text-slate-300">
          I’m a full-stack developer who cares about craft, usability, and speed
          to value.
        </p>
      </div>

      <div class="md:col-span-7">
        <div
          class="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm"
        >
          <p class="text-sm leading-relaxed text-slate-300">
            I partner with teams to design and ship product experiences—from
            early prototypes to production-ready applications. My sweet spot is
            bridging design and engineering: clean interfaces, scalable systems,
            and performance you can measure.
          </p>

          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="s in portfolioData.skills"
              :key="s"
              class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 ring-1 ring-[var(--accent2)]/15"
            >
              {{ s }}
            </span>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLink
              to="/about"
              class="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(167,139,250,0.14)]"
            >
              Read more
            </NuxtLink>
            <a
              href="#contact"
              class="inline-flex items-center rounded-xl border border-slate-800 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-900 hover:border-[var(--accent2)]/35"
            >
              Work with me
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { portfolioData } from "@/constants/portfolioData";
</script>
