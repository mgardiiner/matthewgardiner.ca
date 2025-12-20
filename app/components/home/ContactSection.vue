<template>
    <section id="contact" class="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div class="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-sm md:p-10">
            <div class="grid gap-8 md:grid-cols-12 md:items-center">
                <div class="md:col-span-7">
                    <h2 class="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        Let’s build something great
                    </h2>
                    <p class="mt-2 max-w-xl text-slate-300">
                        Tell me what you’re working on—I'll reply with next steps, timelines, and a clear plan.
                    </p>
    
                    <div class="mt-6 flex flex-wrap gap-3">
                        <a :href="`mailto:${email}?subject=${encodeURIComponent(subject)}`" class="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.18)]">
                  Email me
                </a>
                        <a :href="social.linkedin" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-xl border border-slate-800 px-6 py-3 text-sm font-medium text-slate-100 hover:bg-slate-900 hover:border-[var(--accent)]/35">
                  LinkedIn
                </a>
                        <a :href="social.github" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-xl border border-slate-800 px-6 py-3 text-sm font-medium text-slate-100 hover:bg-slate-900 hover:border-[var(--accent)]/35">
                  GitHub
                </a>
                    </div>
                </div>
    
                <div class="md:col-span-5">
                    <div class="rounded-3xl border border-[var(--accent)]/25 bg-slate-950 p-6">
                        <h3 class="text-sm font-semibold text-white">Quick details</h3>
                        <dl class="mt-4 space-y-3 text-sm">
                            <div class="flex items-start justify-between gap-4">
                                <dt class="text-slate-400">Email</dt>
                                <dd class="font-medium text-slate-200">
                                    <a :href="`mailto:${email}`" class="hover:underline hover:text-[var(--accent)]">
                        {{ email }}
                      </a>
                                </dd>
                            </div>
                            <div class="flex items-start justify-between gap-4">
                                <dt class="text-slate-400">Location</dt>
                                <dd class="font-medium text-slate-200">Remote / Toronto, ON</dd>
                            </div>
                            <div class="flex items-start justify-between gap-4">
                                <dt class="text-slate-400">Focus</dt>
                                <dd class="font-medium text-slate-200">Full-stack PHP Developer</dd>
                            </div>
                            <div class="flex items-start justify-between gap-4">
                                <dt class="text-slate-400">Employment</dt>
                                <dd class="font-medium text-slate-200">Trend Hunter</dd>
                            </div>
                        </dl>
                    </div>
    
                    <div class="mt-4 h-px w-full bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/40 to-[var(--accent)]/0"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const email = "matthew_gardiner@hotmail.com";
const subject = "Project inquiry";

const social = {
    github: "https://github.com/mgardiiner",
    linkedin: "https://www.linkedin.com/in/matthew-gardiner-046115119/",
};
</script>
