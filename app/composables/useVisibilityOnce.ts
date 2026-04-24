import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

export function useVisibilityOnce(target: Ref<HTMLElement | null>, threshold = 0.1) {
  const visible = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (typeof IntersectionObserver === "undefined") return;
    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        visible.value = true;
        observer?.disconnect();
      },
      { threshold }
    );
    if (target.value) observer.observe(target.value);
  });

  onUnmounted(() => observer?.disconnect());

  return { visible };
}
