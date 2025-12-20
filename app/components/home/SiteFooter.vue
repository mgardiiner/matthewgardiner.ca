<template>
    <footer class="border-t border-slate-800">
        <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
            <p class="text-sm text-slate-400">
                © {{ new Date().getFullYear() }} {{ name }}. All rights reserved.
            </p>
    
            <div class="flex flex-wrap gap-4 text-sm">
                <NuxtLink to="/work" class="text-slate-400 hover:text-[var(--accent)]">Work</NuxtLink>
                <NuxtLink to="/about" class="text-slate-400 hover:text-[var(--accent)]">About</NuxtLink>
                <NuxtLink to="/projects" class="text-slate-400 hover:text-[var(--accent)]">Projects</NuxtLink>
                <a href="#contact" class="text-slate-400 hover:text-[var(--accent)]">Contact</a>
            </div>
        </div>
    </footer>
</template>

<script setup>
const name = "Matthew Gardiner";
</script>
