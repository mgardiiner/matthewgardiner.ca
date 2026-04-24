<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-gray-100">

    <!-- Interactive dot canvas -->
    <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 z-0 opacity-70" />

    <!-- Gradient overlay -->
    <div class="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />

    <!-- Glow blobs -->
    <div class="pointer-events-none absolute inset-0 z-[1]">
      <div class="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-500/10 blur-3xl" />
      <div class="absolute bottom-1/3 right-1/4 h-96 w-96 animate-pulse rounded-full bg-violet-500/10 blur-3xl" style="animation-delay:1.5s" />
    </div>

    <!-- Content -->
    <main class="relative z-10 flex flex-grow flex-col items-center justify-center px-6 py-20 text-center">
      <div class="max-w-4xl space-y-8">

        <!-- Employment badge -->
        <div class="hero-enter d1 inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-white/[0.03] px-4 py-2">
          <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
          <span class="text-sm tracking-wide text-slate-400">Currently @ Trend Hunter</span>
        </div>

        <!-- Name -->
        <h1 class="hero-enter d2 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
          Matthew Gardiner
        </h1>

        <!-- Animated role switcher -->
        <div class="flex h-12 items-center justify-center sm:h-14">
          <Transition name="role" mode="out-in">
            <span
              :key="currentRoleIndex"
              class="inline-block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl lg:text-4xl"
            >
              {{ roles[currentRoleIndex] }}
            </span>
          </Transition>
        </div>

        <!-- Bio -->
        <p class="hero-enter d3 mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl">
          Crafting robust web applications with modern PHP and Vue.js. Specialized in
          building scalable APIs and elegant user interfaces.
        </p>

        <!-- CTAs -->
        <div class="hero-enter d4 flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <a
            href="#projects"
            class="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-cyan-500/50"
            @click.prevent="scrollTo('#projects')"
          >
            <!-- Shimmer -->
            <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <!-- Eye icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="relative h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span class="relative">View Work</span>
          </a>

          <a
            :href="resumeUrl"
            class="group flex cursor-pointer items-center gap-2 rounded-lg border-2 border-violet-400 bg-slate-800 px-8 py-3 font-semibold text-violet-400 shadow-lg transition-all duration-300 hover:bg-violet-400 hover:text-white hover:shadow-violet-400/50"
          >
            <!-- Download icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>
        </div>

        <!-- Social links -->
        <div class="hero-enter d5 flex items-center justify-center gap-6 pt-8">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            :target="s.external ? '_blank' : undefined"
            :rel="s.external ? 'noreferrer' : undefined"
            :aria-label="s.label"
            class="cursor-pointer rounded-full border border-cyan-400/30 bg-slate-800/50 p-3 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10"
          >
            <component :is="s.icon" class="h-6 w-6 text-cyan-400" />
          </a>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

type Dot = {
  x: number; y: number;
  r: number; g: number; b: number;
  targetOpacity: number; currentOpacity: number; opacitySpeed: number;
  currentRadius: number;
};

const resumeUrl = "/MatthewGardinerResume2026.docx";
const { socials } = useSocials();

// ── Role switcher ───────────────────────────────────────
const roles = ["Full-Stack Developer", "PHP Specialist", "AI Integrations", "UI Engineer", "API Architect", "Technical Lead"];
const currentRoleIndex = ref(0);
let roleTimer: ReturnType<typeof setInterval> | null = null;

// ── Canvas dot grid ─────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null);
const DOT_SPACING = 30;
const BASE_OPACITY_MIN = 0.3;
const BASE_OPACITY_MAX = 0.5;
const BASE_RADIUS = 1.5;
const INTERACTION_RADIUS = 180;
const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
const OPACITY_BOOST = 0.7;
const RADIUS_BOOST = 3;
const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

let dots: Dot[] = [];
let grid: Record<string, number[]> = {};
let canvasSize = { width: 0, height: 0 };
let mousePos: { x: number | null; y: number | null } = { x: null, y: null };
let rafId: number | null = null;

const createDots = () => {
  const { width, height } = canvasSize;
  if (!width || !height) return;
  dots = [];
  grid = {};
  const cols = Math.ceil(width / DOT_SPACING);
  const rows = Math.ceil(height / DOT_SPACING);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * DOT_SPACING + DOT_SPACING / 2;
      const y = j * DOT_SPACING + DOT_SPACING / 2;
      const cellKey = `${Math.floor(x / GRID_CELL_SIZE)}_${Math.floor(y / GRID_CELL_SIZE)}`;
      if (!grid[cellKey]) grid[cellKey] = [];
      grid[cellKey].push(dots.length);
      const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
      const useViolet = Math.random() > 0.5;
      dots.push({
        x, y,
        r: useViolet ? 167 : 34,
        g: useViolet ? 139 : 211,
        b: useViolet ? 250 : 238,
        targetOpacity: baseOpacity,
        currentOpacity: baseOpacity,
        opacitySpeed: Math.random() * 0.005 + 0.002,
        currentRadius: BASE_RADIUS,
      });
    }
  }
};

const handleResize = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const w = canvas.parentElement?.clientWidth || window.innerWidth;
  const h = canvas.parentElement?.clientHeight || window.innerHeight;
  if (canvas.width === w && canvas.height === h) return;
  canvas.width = w;
  canvas.height = h;
  canvasSize = { width: w, height: h };
  createDots();
};

const handleMouseMove = (e) => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
};

const handleMouseLeave = () => { mousePos = { x: null, y: null }; };

const animate = () => {
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");
  if (!ctx || !canvasSize.width) { rafId = requestAnimationFrame(animate); return; }

  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  // Collect nearby dots via spatial grid
  const active = new Set();
  if (mousePos.x !== null) {
    const mcx = Math.floor(mousePos.x / GRID_CELL_SIZE);
    const mcy = Math.floor(mousePos.y / GRID_CELL_SIZE);
    const sr = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE);
    for (let i = -sr; i <= sr; i++) {
      for (let j = -sr; j <= sr; j++) {
        const key = `${mcx + i}_${mcy + j}`;
        grid[key]?.forEach(idx => active.add(idx));
      }
    }
  }

  dots.forEach((dot, idx) => {
    // Twinkle
    dot.currentOpacity += dot.opacitySpeed;
    if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
      dot.opacitySpeed = -dot.opacitySpeed;
      dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX));
      dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
    }

    // Mouse interaction
    let factor = 0;
    if (mousePos.x !== null && active.has(idx)) {
      const dx = dot.x - mousePos.x;
      const dy = dot.y - mousePos.y;
      const dSq = dx * dx + dy * dy;
      if (dSq < INTERACTION_RADIUS_SQ) {
        const t = 1 - Math.sqrt(dSq) / INTERACTION_RADIUS;
        factor = t * t;
      }
    }

    const finalOpacity = Math.min(1, dot.currentOpacity + factor * OPACITY_BOOST);
    dot.currentRadius = BASE_RADIUS + factor * RADIUS_BOOST;

    ctx.beginPath();
    ctx.fillStyle = `rgba(${dot.r},${dot.g},${dot.b},${finalOpacity.toFixed(3)})`;
    ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  rafId = requestAnimationFrame(animate);
};

const scrollTo = (hash: string) => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });

onMounted(() => {
  handleResize();
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("resize", handleResize);
  document.documentElement.addEventListener("mouseleave", handleMouseLeave);
  rafId = requestAnimationFrame(animate);

  roleTimer = setInterval(() => {
    currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length;
  }, 3000);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("resize", handleResize);
  document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
  if (rafId) cancelAnimationFrame(rafId);
  clearInterval(roleTimer);
});
</script>

<style scoped>
/* Role slide + blur transition */
.role-enter-active,
.role-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
}
.role-enter-from {
  opacity: 0;
  transform: translateY(-16px);
  filter: blur(8px);
}
.role-enter-to {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
.role-leave-from {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
.role-leave-to {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(8px);
}
</style>
