// app/composables/useXtreamAuth.ts
export type XtreamCreds = {
  serverUrl: string
  username: string
  password: string
}

export const useXtreamAuth = () => {
  // shared state across the app
  const creds = useState<XtreamCreds | null>('xtreamCreds', () => null)

  const isLoggedIn = computed(() => !!creds.value)

  function login(newCreds: XtreamCreds) {
    creds.value = newCreds
  }

  function logout() {
    creds.value = null
  }

  return { creds, isLoggedIn, login, logout }
}
