// app/composables/useXtreamAuth.ts
export type XtreamCreds = {
  serverUrl: string
  username: string
  password: string
}

export const useXtreamAuth = () => {
  // Cookie to persist across refreshes
  const credsCookie = useCookie<XtreamCreds | null>('xtream_creds', {
    default: () => null,
    sameSite: 'lax',
  })

  // In-app reactive state, initialised from cookie
  const creds = useState<XtreamCreds | null>('xtreamCreds', () => credsCookie.value)

  // Keep state + cookie in sync
  watch(
    creds,
    (val) => {
      credsCookie.value = val
    },
    { deep: true }
  )

  const isLoggedIn = computed(() => !!creds.value)

  function login(newCreds: XtreamCreds) {
    creds.value = {
      serverUrl: newCreds.serverUrl.trim().replace(/\/+$/, ''),
      username: newCreds.username.trim(),
      password: newCreds.password,
    }
  }

  function logout() {
    creds.value = null
    credsCookie.value = null
  }

  return { creds, isLoggedIn, login, logout }
}
