<template>
    <section class="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div class="grid gap-8 md:grid-cols-12">
            <div class="md:col-span-5">
                <h2 class="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    Proof, not hype
                </h2>
                <p class="mt-2 text-slate-300">
                    A snapshot of outcomes and how teams describe working with me.
                </p>
    
                <div class="mt-6 grid grid-cols-2 gap-4">
                    <div v-for="stat in stats" :key="stat.label" class="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-5 shadow-sm">
                        <div class="absolute left-0 top-0 h-full w-px bg-[var(--accent)]/60"></div>
                        <div class="text-2xl font-semibold text-white">{{ stat.value }}</div>
                        <div class="mt-1 text-sm text-slate-300">{{ stat.label }}</div>
                    </div>
                </div>
            </div>
    
            <div class="md:col-span-7">
                <div class="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-white">Testimonials</h3>
                        <div class="flex gap-2">
                            <button class="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 hover:border-[var(--accent)]/40" @click="prev" aria-label="Previous">
                    ←
                  </button>
                            <button class="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 hover:border-[var(--accent)]/40" @click="next" aria-label="Next">
                    →
                  </button>
                        </div>
                    </div>
    
                    <div class="mt-5">
                        <p class="text-sm leading-relaxed text-slate-200">
                            “{{ active.quote }}”
                        </p>
    
                        <div class="mt-4 flex items-center justify-between gap-4">
                            <div>
                                <div class="text-sm font-medium text-white">{{ active.name }}</div>
                                <div class="text-xs text-slate-400">{{ active.title }}</div>
                            </div>
                            <div class="text-xs text-slate-500">({{ index + 1 }} / {{ testimonials.length }})</div>
                        </div>
                    </div>
                </div>
    
                <div class="mt-5 rounded-3xl border border-slate-800 bg-slate-900/30 p-6">
                    <h4 class="text-sm font-semibold text-white">Typical engagement</h4>
                    <p class="mt-2 text-sm text-slate-300">
                        2–6 weeks for an MVP, 6–12 weeks for a full redesign + build. Clear milestones, weekly demos, no surprises.
                    </p>
                    <div class="mt-4 h-px w-full bg-gradient-to-r from-[var(--accent2)]/0 via-[var(--accent2)]/40 to-[var(--accent2)]/0"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, ref } from "vue";

const stats = [
    { value: "+18%", label: "Conversion uplift (avg.)" },
    { value: "1.8s", label: "LCP on recent launch" },
    { value: "40+", label: "Reusable components shipped" },
    { value: "3–10d", label: "Typical iteration cycles" },
];

const testimonials = [{
        quote: "Fast, thoughtful, and shipped a design system we actually use. The UI quality jumped immediately.",
        name: "Alex Kim",
        title: "Product Lead, Company",
    },
    {
        quote: "Took a messy frontend and turned it into a clean Nuxt codebase with real performance wins.",
        name: "Sam Rivera",
        title: "Engineering Manager, Company",
    },
    {
        quote: "Great product instincts—helped us clarify what mattered and execute quickly.",
        name: "Jordan Lee",
        title: "Founder, Startup",
    },
];

const index = ref(0);
const active = computed(() => testimonials[index.value]);

function prev() {
    index.value = (index.value - 1 + testimonials.length) % testimonials.length;
}

function next() {
    index.value = (index.value + 1) % testimonials.length;
}
</script>
