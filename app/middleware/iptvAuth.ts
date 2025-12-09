// app/middleware/iptvAuth.ts
export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useXtreamAuth()

  if (!isLoggedIn.value) {
    return navigateTo('/iptv')
  }
})
