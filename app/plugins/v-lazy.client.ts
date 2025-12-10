// plugins/v-lazy.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("lazy", {
    mounted(el: HTMLImageElement, binding) {
      const imageUrl: string = binding.value;
      if (!imageUrl) return;

      // Set a tiny transparent placeholder to avoid immediate load
      el.src =
        el.getAttribute("data-placeholder") ||
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.src = imageUrl;
              observer.unobserve(el);
            }
          });
        },
        {
          rootMargin: "200px", // start loading a bit before it appears
          threshold: 0.01,
        }
      );

      observer.observe(el);
    },
  });
});
