<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'iptv-auth',
  layout: 'minimal',
})

type FavouriteMovie = {
  stream_id: number
  name: string
  stream_icon?: string | null
  rating?: string
  container_extension?: string
}

const { xtreamFetch } = useXtreamClient()
const { favs } = useFavourites()

const loading = ref(false)
const error = ref<string | null>(null)
const movies = ref<FavouriteMovie[]>([])

const ratingNumber = (movie: FavouriteMovie) => {
  const r = Number(movie.rating)
  return Number.isNaN(r) ? 0 : r
}

const ratingBadgeClass = (rating: number) => {
  if (rating >= 8) return 'bg-emerald-100 text-emerald-700'
  if (rating >= 6) return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-600'
}

onMounted(async () => {
  if (!favs.value.length) return

  loading.value = true
  error.value = null

  try {
    const results: FavouriteMovie[] = []

    for (const id of favs.value) {
      try {
        const data = await xtreamFetch<any>({
          action: 'get_vod_info',
          vod_id: id,
        })

        const info = data?.info
        const movieData = data?.movie_data

        results.push({
          stream_id: Number(id),
          name: info?.name || movieData?.name || `Stream ${id}`,
          stream_icon: info?.movie_image || info?.cover,
          rating: info?.rating,
          container_extension:
            movieData?.container_extension || info?.container_extension,
        })
      } catch (innerErr) {
        console.warn('Failed to load favourite', id, innerErr)
      }
    }

    movies.value = results
  } catch (err: any) {
    console.error('[favourites] error:', err)
    error.value = err?.message || 'Unable to load favourites.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100"
  >
    <div class="max-w-6xl mx-auto px-4 pb-12 pt-6">
      <!-- header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-semibold tracking-tight">Favourites</h1>
          <p class="text-sm text-slate-400 mt-1">
            Your saved movies from any category.
          </p>
        </div>

        <NuxtLink
          to="/iptv/movies"
          class="text-sm text-sky-300 hover:text-sky-200 underline underline-offset-2"
        >
          Back to all movies
        </NuxtLink>
      </div>

      <p v-if="error" class="text-red-400 mb-4">
        {{ error }}
      </p>

      <p v-if="loading" class="text-slate-400 mb-4">Loading favourites…</p>

      <p v-if="!loading && !favs.length" class="text-slate-400">
        You haven't favourited any movies yet.
      </p>

      <div
        v-if="!loading && movies.length"
        class="grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
      >
        <NuxtLink
          v-for="movie in movies"
          :key="movie.stream_id"
          :to="`/iptv/movies/${movie.stream_id}`"
          class="group bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden hover:border-sky-500/70 transition-all duration-200"
        >
          <div class="relative w-full overflow-hidden">
            <img
              v-if="movie.stream_icon"
              :src="movie.stream_icon"
              :alt="movie.name"
              class="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div
              v-else
              class="w-full aspect-[4/5] bg-slate-800 flex items-center justify-center text-slate-500 text-[10px]"
            >
              No Art
            </div>

            <div
              v-if="ratingNumber(movie) > 0"
              class="absolute top-1 left-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow"
              :class="ratingBadgeClass(ratingNumber(movie))"
            >
              ★ {{ ratingNumber(movie).toFixed(1) }}
            </div>
          </div>

          <div class="p-2 space-y-1">
            <h2
              class="text-[11px] font-semibold leading-snug line-clamp-2 text-slate-50"
            >
              {{ movie.name }}
            </h2>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
