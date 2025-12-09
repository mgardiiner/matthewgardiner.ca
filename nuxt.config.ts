export default defineNuxtConfig({
  ssr: false,
  router: {
    base: '/'
  },
  nitro: {
    preset: 'github-pages'
  }
})
