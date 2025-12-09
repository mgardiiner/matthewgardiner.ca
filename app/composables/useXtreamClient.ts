// app/composables/useXtreamClient.ts
export const useXtreamClient = () => {
  const { creds } = useXtreamAuth()

  const requireCreds = () => {
    if (!creds.value) {
      throw new Error('Not logged in to Xtream')
    }
    return creds.value
  }

  async function xtreamFetch<T = any>(params: Record<string, any>): Promise<T> {
    const c = requireCreds()
    const base = c.serverUrl.replace(/\/+$/, '') // trim trailing slash

    console.log('[xtreamFetch] calling', `${base}/player_api.php`, params)

    return await $fetch<T>(`${base}/player_api.php`, {
      method: 'GET',
      params: {
        username: c.username,
        password: c.password,
        ...params,
      },
    })
  }

  return { xtreamFetch }
}
