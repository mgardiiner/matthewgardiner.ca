<template>
    <header class="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <NuxtLink to="/" class="flex items-center gap-2 font-semibold tracking-tight text-slate-100 hover:text-white">
                <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-900 ring-2 ring-[var(--accent)]/40">
                  {{ initials }}
                </span>
                <span>{{ name }}</span>
            </NuxtLink>
    
            <nav class="hidden items-center gap-6 md:flex">
                <a v-for="item in nav" :key="item.href" :href="item.href" class="text-sm text-slate-300 hover:text-white">
                  {{ item.label }}
                </a>
    
                <a href="#contact" class="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]">
                  Let&#8217;s talk
                </a>
            </nav>
    
            <button type="button" class="inline-flex items-center justify-center rounded-xl border border-slate-800 p-2 text-slate-200 hover:bg-slate-900 md:hidden" @click="open = true" aria-label="Open menu">
                <span class="h-5 w-5">☰</span>
              </button>
        </div>
    
        <!-- Mobile drawer -->
        <div v-if="open" class="fixed inset-0 z-50 md:hidden">
            <div class="absolute inset-0 bg-black/60" @click="open = false"></div>
    
            <div class="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-slate-800 bg-slate-950 p-4 shadow-2xl">
                <div class="flex items-center justify-between">
                    <div class="font-semibold text-slate-100">{{ name }}</div>
                    <button type="button" class="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900" @click="open = false">
                    Close
                  </button>
                </div>
    
                <div class="mt-6 flex flex-col gap-3">
                    <a v-for="item in nav" :key="item.href" :href="item.href" class="rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white" @click="open = false">
                    {{ item.label }}
                  </a>
    
                    <a href="#contact" class="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:bg-slate-200 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]" @click="open = false">
                    Let&#8217;s talk
                  </a>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed, ref } from "vue";

const open = ref(false);

const name = "Matthew Gardiner";
const initials = computed(() =>
    name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("")
);

const nav = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];
</script>
