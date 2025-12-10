// app/composables/useSmartSuggestions.ts
type VodStream = {
  stream_id: number
  name: string
  rating?: string
  rating_5based?: number
  category_id?: string
}

type VodCategory = {
  category_id: string
  category_name: string
}

export const useSmartSuggestions = () => {
  const { favs } = useFavourites()
  const { recentIds } = useRecentlyViewed()

  // Helper: build suggestions from all movies + categories
  const buildSuggestions = (rows: { category: VodCategory; movies: VodStream[] }[]) => {
    const movieIndex = new Map<number, { movie: VodStream; category: VodCategory | null }>()

    // index all movies by id
    for (const row of rows) {
      for (const m of row.movies) {
        if (!movieIndex.has(m.stream_id)) {
          movieIndex.set(m.stream_id, { movie: m, category: row.category })
        }
      }
    }

    const categoryById = new Map<string, VodCategory>()
    for (const row of rows) {
      categoryById.set(row.category.category_id, row.category)
    }

    // derive the "taste profile" from recents + favs
    const recentSet = new Set<number>(recentIds.value)
    const favSet = new Set<number>(favs.value)

    const favCategoryCounts = new Map<string, number>()
    const recentCategoryCounts = new Map<string, number>()

    const inc = (map: Map<string, number>, key: string | undefined) => {
      if (!key) return
      map.set(key, (map.get(key) || 0) + 1)
    }

    for (const id of favs.value) {
      const entry = movieIndex.get(id)
      if (entry?.category?.category_id) {
        inc(favCategoryCounts, entry.category.category_id)
      }
    }
    for (const id of recentIds.value) {
      const entry = movieIndex.get(id)
      if (entry?.category?.category_id) {
        inc(recentCategoryCounts, entry.category.category_id)
      }
    }

    // small helper
    const isEnCategoryName = (name: string | undefined) =>
      !!name && name.trim().toLowerCase().startsWith('en -')

    // score each movie
    const scored: { movie: VodStream; score: number }[] = []

    const maxRecentRank = Math.max(recentIds.value.length, 1)

    for (const [id, { movie, category }] of movieIndex.entries()) {
      let score = 0

      // 1) base on rating (0–10 scaled)
      let rating10 = 0
      if (typeof movie.rating_5based === 'number') {
        rating10 = movie.rating_5based * 2
      } else if (movie.rating) {
        const r = Number(movie.rating)
        rating10 = Number.isNaN(r) ? 0 : r
      }
      score += (rating10 / 10) * 0.4 // up to +0.4

      // 2) boost if it's in favourites already (but don't push too hard)
      if (favSet.has(id)) {
        score += 0.5
      }

      // 3) boost if same category as fav-heavy categories
      if (category?.category_id) {
        const favWeight = favCategoryCounts.get(category.category_id) || 0
        const recentWeight = recentCategoryCounts.get(category.category_id) || 0
        score += Math.min(favWeight * 0.15, 0.6) // up to +0.6
        score += Math.min(recentWeight * 0.1, 0.4) // up to +0.4
      }

      // 4) very recent views: if this movie itself was viewed recently,
      // give a small recency-based bump (but not too much to avoid loops).
      if (recentSet.has(id)) {
        const index = recentIds.value.indexOf(id)
        const recencyScore = (maxRecentRank - index) / maxRecentRank // 1..0
        score += recencyScore * 0.2 // up to +0.2
      }

      // 5) small bump for EN - categories (often main content)
      if (category?.category_name && isEnCategoryName(category.category_name)) {
        score += 0.1
      }

      // 6) tiny penalty if it has no art (often lower quality)
      if (!movie.rating && !movie.stream_icon) {
        score -= 0.1
      }

      // ignore obviously bad scores
      if (score < 0) score = 0
      scored.push({ movie, score })
    }

    // order by score descending
    scored.sort((a, b) => b.score - a.score)

    // return just the movies
    return scored.map((s) => s.movie)
  }

  return { buildSuggestions }
}
