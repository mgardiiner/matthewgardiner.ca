<template>
    <section id="work" class="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div class="flex items-end justify-between gap-6">
            <div>
                <h2 class="text-2xl font-semibold tracking-tight text-white md:text-3xl">Featured work</h2>
                <p class="mt-2 max-w-2xl text-slate-300">
                    A few projects that highlight my range across UI, engineering, and product thinking.
                </p>
            </div>
            <NuxtLink to="/work" class="hidden text-sm font-medium text-slate-300 hover:text-[var(--accent)] hover:underline md:inline">
                View all →
            </NuxtLink>
        </div>
    
        <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <article v-for="p in projects" :key="p.slug" class="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:shadow-md">
                <div class="aspect-[16/10] bg-slate-900">
                    <img v-if="p.image" :src="p.image" :alt="p.title" class="h-full w-full object-cover" />
                    <div v-else class="flex h-full items-center justify-center text-sm text-slate-500">
                        Project image
                    </div>
                </div>
    
                <div class="p-5">
                    <div class="flex items-start justify-between gap-3">
                        <div>
                            <h3 class="text-lg font-semibold text-white">{{ p.title }}</h3>
                            <p class="mt-1 text-sm text-slate-300">{{ p.excerpt }}</p>
                        </div>
    
                        <span v-if="p.metric" class="shrink-0 rounded-full border border-[var(--accent)]/30 bg-slate-950 px-3 py-1 text-xs text-slate-200">
                  {{ p.metric }}
                </span>
                    </div>
    
                    <div class="mt-4 flex flex-wrap gap-2">
                        <span v-for="t in p.tags" :key="t" class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                  {{ t }}
                </span>
                    </div>
    
                    <div class="mt-5 flex gap-3">
                        <NuxtLink :to="`/work/${p.slug}`" class="flex-1 rounded-xl bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]">
                            Case study
                        </NuxtLink>
    
                        <a v-if="p.live" :href="p.live" target="_blank" rel="noreferrer" class="flex-1 rounded-xl border border-slate-800 px-4 py-2 text-center text-sm font-medium text-slate-100 hover:bg-slate-900 hover:border-[var(--accent)]/40">
                  Live
                </a>
                    </div>
                </div>
            </article>
        </div>
    
        <div class="mt-8 md:hidden">
            <NuxtLink to="/work" class="text-sm font-medium text-slate-300 hover:text-[var(--accent)] hover:underline">
                View all →
            </NuxtLink>
        </div>
    </section>
</template>

<script setup>
const projects = [{
        slug: "thgpt",
        title: "Trend Hunter GPT",
        excerpt: "Hunt hidden opportunities about any topic in any industry. Get insights, trends, downloadable reports and generated product ideas.",
        date: "2025-01-12",
        tags: ["TrendHunter", "UI", "AI", "PHP", "Design"],
        url: "https://www.trendhunter.ai/gpt",
        metric: "+60% conversions",
        image: "",
        live: "https://www.trendhunter.ai/gpt",
    },
    {
        slug: "trendtangle",
        title: "TrendTangle",
        excerpt: "Find real-time trending articles from Facebook, Reddit, Twitter and more utilizing the Newswhip API.",
        date: "2025-02-03",
        tags: ["TrendHunter", "UI", "AI", "PHP", "Design"],
        metric: "+40% CTR",
        image: "",
        live: "",
    },
    {
        slug: "innovation-assessment",
        title: "Innovation Assessment",
        excerpt: "Discover your Innovation Archetype & specific tactics to realize your potential, faster.",
        date: "2023-08-15",
        tags: ["TrendHunter", "UI", "PHP", "Redesign"],
        url: "https://www.innovationassessment.com",
        metric: "Cleaner UX & improved security",
        image: "",
        live: "https://www.innovationassessment.com",
    },
];
</script>
