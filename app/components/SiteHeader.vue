<template>
  <header class="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <NuxtLink to="/" class="flex items-center gap-2.5 font-semibold tracking-tight text-slate-100 transition-colors duration-200 hover:text-white">
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
          {{ initials }}
        </span>
        <span>{{ name }}</span>
      </NuxtLink>

      <nav class="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          :class="[
            'text-sm transition-colors duration-200',
            activeHash === item.hash
              ? 'text-cyan-400 font-medium'
              : 'text-slate-400 hover:text-white',
          ]"
          @click.prevent="handleNavClick(item.href)"
        >
          {{ item.label }}
        </a>

        <a
          href="/#contact"
          class="inline-flex cursor-pointer items-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:from-cyan-400 hover:to-violet-500 hover:shadow-lg hover:shadow-violet-500/30"
          @click.prevent="handleNavClick('/#contact')"
        >
          Let&#8217;s talk
        </a>
      </nav>

      <button
        type="button"
        class="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-800 p-2 text-slate-200 transition-colors duration-200 hover:border-slate-700 hover:bg-slate-900 md:hidden"
        aria-label="Open navigation menu"
        @click="open = true"
      >
        <!-- Hamburger icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Mobile drawer -->
    <div v-if="open" class="fixed inset-0 z-50 md:hidden">
      <div class="absolute inset-0 bg-black/60" @click="open = false"></div>

      <div class="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-slate-800 bg-slate-950 p-4 shadow-2xl">
        <div class="flex items-center justify-between">
          <div class="font-semibold text-slate-100">{{ name }}</div>
          <button
            type="button"
            class="cursor-pointer rounded-xl border border-slate-800 p-2 text-slate-200 transition-colors duration-200 hover:bg-slate-900"
            aria-label="Close navigation menu"
            @click="open = false"
          >
            <!-- X icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div class="mt-6 flex flex-col gap-3">
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            :class="[
              'rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-slate-900 hover:text-white',
              activeHash === item.hash ? 'text-white bg-slate-900' : 'text-slate-300',
            ]"
            @click.prevent="handleNavClick(item.href, true)"
          >
            {{ item.label }}
          </a>

          <a
            href="/#contact"
            class="mt-2 inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-cyan-400 hover:to-violet-500"
            @click.prevent="handleNavClick('/#contact', true)"
          >
            Let&#8217;s talk
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";

const open = ref(false);
const route = useRoute();
const router = useRouter();
const activeHash = ref("");

const name = "Matthew Gardiner";
const initials = computed(() =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("")
);

const nav = [
  { label: "About", href: "/#about", hash: "about" },
  { label: "Projects", href: "/#projects", hash: "projects" },
  { label: "Testimonials", href: "/#testimonials", hash: "testimonials" },
  { label: "Contact", href: "/#contact", hash: "contact" },
];

// Active section tracking via IntersectionObserver
let observer: IntersectionObserver | null = null;

const setupObserver = () => {
  if (typeof IntersectionObserver === "undefined") return;

  const sections = document.querySelectorAll("section[id]");
  if (!sections.length) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeHash.value = entry.target.id;
        }
      }
    },
    { threshold: 0.35 }
  );

  sections.forEach((s) => observer.observe(s));
};

onMounted(() => {
  setupObserver();
});

onUnmounted(() => {
  observer?.disconnect();
});

const scrollToHash = (hash) => {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const handleNavClick = (href, closeMenu = false) => {
  if (closeMenu) {
    open.value = false;
  }

  const [, hash = ""] = href.split("#");
  const hashTarget = hash ? `#${hash}` : "";
  if (route.path === "/" && hashTarget) {
    scrollToHash(hashTarget);
    return;
  }

  router.push(href);
};
</script>
