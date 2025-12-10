// app/composables/useRecentlyViewed.ts
export const useRecentlyViewed = () => {
  const recentIds = useState<number[]>('recentMovies', () => {
    if (process.client) {
      try {
        const raw = localStorage.getItem('recentMovies')
        return raw ? JSON.parse(raw) : []
      } catch {
        return []
      }
    }
    return []
  })

  const addRecent = (id: number) => {
    const current = recentIds.value.filter(x => x !== id)
    current.unshift(id)
    // limit to last N
    recentIds.value = current.slice(0, 50)

    if (process.client) {
      localStorage.setItem('recentMovies', JSON.stringify(recentIds.value))
    }
  }

  return { recentIds, addRecent }
}
