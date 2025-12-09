export default defineNuxtConfig({
  srcDir: 'app/',
  ssr: false,

  app: {
    baseURL: '/',
  },

  nitro: {
    preset: 'github-pages',
  },

  modules: ['@nuxtjs/tailwindcss'],
})