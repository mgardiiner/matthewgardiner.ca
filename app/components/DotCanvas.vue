<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  spacing?: number;
  opacity?: number;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const SPACING = props.spacing ?? 40;
const BASE_MIN = 0.15;
const BASE_MAX = 0.35;
const BASE_R = 1.2;

type Dot = {
  x: number; y: number;
  r: number; g: number; b: number;
  current: number; target: number; speed: number;
};

let dots: Dot[] = [];
let size = { w: 0, h: 0 };
let rafId: number | null = null;
let active = false;

const build = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const w = canvas.parentElement?.clientWidth || canvas.offsetWidth;
  const h = canvas.parentElement?.clientHeight || canvas.offsetHeight;
  if (!w || !h) return;
  canvas.width = w;
  canvas.height = h;
  size = { w, h };
  dots = [];
  const cols = Math.ceil(w / SPACING);
  const rows = Math.ceil(h / SPACING);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const base = Math.random() * (BASE_MAX - BASE_MIN) + BASE_MIN;
      const violet = Math.random() > 0.5;
      dots.push({
        x: i * SPACING + SPACING / 2,
        y: j * SPACING + SPACING / 2,
        r: violet ? 167 : 34,
        g: violet ? 139 : 211,
        b: violet ? 250 : 238,
        current: base,
        target: base,
        speed: Math.random() * 0.003 + 0.001,
      });
    }
  }
};

const draw = () => {
  if (!active) return;
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");
  if (!ctx || !size.w) { rafId = requestAnimationFrame(draw); return; }

  ctx.clearRect(0, 0, size.w, size.h);
  dots.forEach((d) => {
    d.current += d.speed;
    if (d.current >= d.target || d.current <= BASE_MIN) {
      d.speed = -d.speed;
      d.current = Math.max(BASE_MIN, Math.min(d.current, BASE_MAX));
      d.target = Math.random() * (BASE_MAX - BASE_MIN) + BASE_MIN;
    }
    ctx.beginPath();
    ctx.fillStyle = `rgba(${d.r},${d.g},${d.b},${d.current.toFixed(3)})`;
    ctx.arc(d.x, d.y, BASE_R, 0, Math.PI * 2);
    ctx.fill();
  });

  rafId = requestAnimationFrame(draw);
};

const stop = () => {
  active = false;
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
};

const start = () => {
  if (active) return;
  active = true;
  rafId = requestAnimationFrame(draw);
};

let observer: IntersectionObserver | null = null;
const onResize = () => { build(); };

onMounted(() => {
  build();
  observer = new IntersectionObserver(
    ([entry]) => { entry.isIntersecting ? start() : stop(); },
    { threshold: 0 }
  );
  if (canvasRef.value) observer.observe(canvasRef.value);
  window.addEventListener("resize", onResize, { passive: true });
});

onUnmounted(() => {
  stop();
  observer?.disconnect();
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none absolute inset-0 z-0"
    :style="`opacity: ${props.opacity ?? 1}`"
    aria-hidden="true"
  />
</template>
