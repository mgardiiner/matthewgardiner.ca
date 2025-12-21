const scrollToHash = (hash: string) => {
  if (!hash) {
    return;
  }

  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  nuxtApp.hook("page:finish", () => {
    scrollToHash(router.currentRoute.value.hash);
  });

  router.afterEach((to) => {
    scrollToHash(to.hash);
  });
});
