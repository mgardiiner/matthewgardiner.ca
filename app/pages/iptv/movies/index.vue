<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { VodCategory, VodStream, MovieRow } from "~/composables/useMovieLibrary";

definePageMeta({
  middleware: "iptv-auth",
  layout: "minimal",
});

type SortMode = "newest" | "rating" | "az";

const { categories, rows, lastSync, loadFromCache } = useMovieLibrary();
const { isFavourite, toggleFavourite, favs } = useFavourites();
const { recentIds } = useRecentlyViewed();

const loading = ref(false);
const error = ref<string | null>(null);
const search = ref("");
const sortMode = ref<SortMode>("newest");

// used by the "Suggested for you" skeleton section
const suggestionsLoading = ref(true);

// ===== CATEGORY FILTERING (only for hiding blocked) =====

const blockedPrefixes = [
  "SOCCER",
  "DE -",
  "BE -",
  "PT/BR -",
  "ES -",
  "FR -",
  "LA -",
  "AF -",
  "QC -",
  "IT -",
  "NL -",
  "GR -",
  "NORDIC",
  "SVENSKA",
  "DANSKE",
  "NORGE",
  "MT -",
  "BG -",
  "AL -",
  "EX -",
  "TR -",
  "IR -",
  "SO -",
  "IN -",
  "BN -",
  "PK -",
  "BR -",
  "PL -",
  "EN - ITALIAN SUB ENG",
].map((s) => s.toLowerCase());

const isBlockedCategory = (name: string) => {
  const lower = name.toLowerCase();
  return blockedPrefixes.some((prefix) => lower.startsWith(prefix));
};

// Only visible (non-blocked) categories, in original order
const visibleCategories = computed(() =>
  categories.value.filter((c) => !isBlockedCategory(c.category_name))
);

// ===== Rows in "sync order" =====

// We keep the order of rows.value (which comes from syncFromXtream),
// but filter out any whose category is blocked.
const orderedRows = computed<MovieRow[]>(() => {
  if (!rows.value.length) return [];

  const visibleIds = new Set(visibleCategories.value.map((c) => c.category_id));

  const visibleRows = rows.value.filter((row) =>
    visibleIds.has(row.category.category_id)
  );

  // EN - rows (keep sync order)
  const enRows = visibleRows.filter((row) =>
    row.category.category_name.trim().toLowerCase().startsWith("en -")
  );

  // Non-EN rows (keep sync order)
  const otherRows = visibleRows.filter(
    (row) => !row.category.category_name.trim().toLowerCase().startsWith("en -")
  );

  return [...enRows, ...otherRows];
});

// ===== Hero =====

const heroMovie = computed<VodStream | null>(() => {
  for (const row of orderedRows.value) {
    if (row.movies.length > 0) return row.movies[0];
  }
  return null;
});

const heroPoster = computed(() => heroMovie.value?.stream_icon || null);
const heroTitle = computed(() => heroMovie.value?.name ?? "");
const heroId = computed(() => heroMovie.value?.stream_id ?? null);

// ===== Helpers / sorting / suggestions =====

const extractYearFromTitle = (name?: string): number | null => {
  if (!name) return null;
  const match = name.match(/\((\d{4})\)/);
  if (!match) return null;
  const year = Number(match[1]);
  return Number.isNaN(year) ? null : year;
};

const ratingNumber = (movie: VodStream) => {
  if (typeof movie.rating_5based === "number") {
    return movie.rating_5based * 2;
  }
  const r = Number(movie.rating);
  return Number.isNaN(r) ? 0 : r;
};

const ratingBadgeClass = (rating: number) => {
  if (rating >= 8) return "bg-emerald-100 text-emerald-700";
  if (rating >= 6) return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
};

const addedTimestamp = (movie: VodStream): number => {
  const n = Number(movie.added);
  if (!Number.isNaN(n) && n > 0) return n;
  const year = extractYearFromTitle(movie.name);
  if (!year) return 0;
  return year * 1_000_000_000;
};

const sortMovies = (list: VodStream[]): VodStream[] => {
  const copy = list.slice();
  switch (sortMode.value) {
    case "newest":
      copy.sort((a, b) => addedTimestamp(b) - addedTimestamp(a));
      break;
    case "rating":
      copy.sort((a, b) => ratingNumber(b) - ratingNumber(a));
      break;
    case "az":
      copy.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", undefined, {
          sensitivity: "base",
        })
      );
      break;
  }
  return copy;
};

const filteredRowMovies = (movies: VodStream[]) => {
  let list = movies;
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter((m) => m.name?.toLowerCase().includes(q));
  }
  return sortMovies(list);
};

// ===== Suggestions =====

const buildSuggestions = (rowData: MovieRow[]): VodStream[] => {
  const movieIndex = new Map<
    number,
    { movie: VodStream; category: VodCategory | null }
  >();

  for (const row of rowData) {
    for (const m of row.movies) {
      if (!movieIndex.has(m.stream_id)) {
        movieIndex.set(m.stream_id, { movie: m, category: row.category });
      }
    }
  }

  const favSet = new Set<number>(favs.value);
  const recentSet = new Set<number>(recentIds.value);

  const favCategoryCounts = new Map<string, number>();
  const recentCategoryCounts = new Map<string, number>();

  const inc = (map: Map<string, number>, key?: string) => {
    if (!key) return;
    map.set(key, (map.get(key) || 0) + 1);
  };

  for (const id of favs.value) {
    const entry = movieIndex.get(id);
    if (entry?.category?.category_id) {
      inc(favCategoryCounts, entry.category.category_id);
    }
  }

  for (const id of recentIds.value) {
    const entry = movieIndex.get(id);
    if (entry?.category?.category_id) {
      inc(recentCategoryCounts, entry.category.category_id);
    }
  }

  const isEnCategoryName = (name?: string) =>
    !!name && name.trim().toLowerCase().startsWith("en -");

  const maxRecentRank = Math.max(recentIds.value.length, 1);
  const nowYear = new Date().getFullYear();

  const scored: { movie: VodStream; score: number }[] = [];

  for (const [id, { movie, category }] of movieIndex.entries()) {
    let score = 0;

    // rating
    let r10 = ratingNumber(movie);
    if (r10 < 0) r10 = 0;
    if (r10 > 10) r10 = 10;
    score += (r10 / 10) * 0.35;

    // favourite
    if (favSet.has(id)) {
      score += 0.5;
    }

    // category affinity
    if (category?.category_id) {
      const favWeight = favCategoryCounts.get(category.category_id) || 0;
      const recentWeight = recentCategoryCounts.get(category.category_id) || 0;
      score += Math.min(favWeight * 0.15, 0.6);
      score += Math.min(recentWeight * 0.1, 0.4);
    }

    // viewing recency
    if (recentSet.has(id)) {
      const idx = recentIds.value.indexOf(id);
      const recencyScore = (maxRecentRank - idx) / maxRecentRank;
      score += recencyScore * 0.2;
    }

    // year-based newness
    const year = extractYearFromTitle(movie.name);
    if (year) {
      const age = nowYear - year;

      if (age <= 1) score += 0.4;
      else if (age <= 3) score += 0.3;
      else if (age <= 5) score += 0.2;
      else if (age <= 10) score += 0.1;
      else score -= 0.05;
    }

    // EN bump
    if (category?.category_name && isEnCategoryName(category.category_name)) {
      score += 0.1;
    }

    // penalty for no rating & no art
    if (!movie.rating && !movie.stream_icon) {
      score -= 0.1;
    }

    if (score < 0) score = 0;
    scored.push({ movie, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.movie);
};

const suggestions = computed(() => {
  if (!orderedRows.value.length) return [];
  const base = buildSuggestions(orderedRows.value);
  const q = search.value.trim().toLowerCase();
  const filtered = q ? base.filter((m) => m.name?.toLowerCase().includes(q)) : base;
  return filtered.slice(0, 24);
});

// ===== Lifecycle =====

onMounted(async () => {
  loading.value = true;
  error.value = null;
  suggestionsLoading.value = true;

  await loadFromCache();

  if (!rows.value.length) {
    error.value =
      "No movie library synced yet. Go to the Dashboard and press “Sync Library”.";
  }

  loading.value = false;
  suggestionsLoading.value = false;
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100"
  >
    <div class="max-w-6xl mx-auto px-4 pb-12 pt-4 space-y-8">
      <!-- top bar -->
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-semibold tracking-tight">Movies</h1>
          <p class="text-sm text-slate-400 mt-1">
            Browse by service, EN categories, and smart suggestions.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <input
            v-model="search"
            type="text"
            placeholder="Search titles..."
            class="bg-slate-900/80 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 w-40 sm:w-56"
          />
          <!-- <NuxtLink
            to="/iptv/dashboard"
            class="text-sm text-sky-300 hover:text-sky-200 underline underline-offset-2"
          >
            Dashboard
          </NuxtLink> -->
          <select
            v-model="sortMode"
            class="bg-slate-900/80 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="newest">Newest</option>
            <option value="rating">Rating</option>
            <option value="az">A–Z</option>
          </select>
        </div>
      </header>

      <!-- hero -->
      <section
        v-if="heroMovie"
        class="relative w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 min-h-[220px]"
      >
        <div class="absolute inset-0 overflow-hidden">
          <img
            v-if="heroPoster"
            v-lazy="heroPoster"
            :alt="heroTitle"
            class="w-full h-full object-cover opacity-40"
          />
          <div
            class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"
          />
        </div>

        <div
          class="relative z-10 flex flex-col sm:flex-row items-center sm:items-end px-5 py-6 gap-4"
        >
          <div class="flex-1 space-y-3">
            <p class="text-xs uppercase tracking-[0.2em] text-sky-300/80">Featured</p>
            <h2 class="text-2xl sm:text-3xl font-bold leading-tight max-w-xl">
              {{ heroTitle }}
            </h2>
            <p class="text-xs text-slate-300 max-w-md line-clamp-2">
              Click through for details and a launchable stream URL in your favourite
              external player.
            </p>

            <div class="flex flex-wrap gap-2 pt-1">
              <NuxtLink
                v-if="heroId"
                :to="`/iptv/movies/${heroId}`"
                class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white shadow-sm"
              >
                Open details
              </NuxtLink>
            </div>
          </div>

          <div
            class="hidden sm:block w-28 h-40 rounded-2xl overflow-hidden border border-slate-700 shadow-lg"
          >
            <img
              v-if="heroPoster"
              v-lazy="heroPoster"
              :alt="heroTitle"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <!-- status -->
      <p v-if="error" class="text-red-400 text-sm">
        {{ error }}
      </p>

      <!-- suggestions loading placeholder -->
      <section v-if="suggestionsLoading" class="space-y-2">
        <div class="flex items-baseline justify-between">
          <h3 class="text-base font-semibold">Suggested for you</h3>
          <p class="text-[11px] text-slate-500">Building suggestions…</p>
        </div>

        <div class="relative -mx-4 px-4">
          <div class="flex gap-2 overflow-x-hidden pb-2">
            <div
              v-for="n in 8"
              :key="n"
              class="flex-none w-[120px] sm:w-[140px] md:w-[160px]"
            >
              <div
                class="w-full h-[180px] sm:h-[200px] md:h-[220px] rounded-xl bg-slate-800/80 animate-pulse"
              />
              <div class="mt-1.5 h-3 rounded bg-slate-800/80 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <!-- suggestions -->
      <section v-if="!suggestionsLoading && suggestions.length" class="space-y-2">
        <div class="flex items-baseline justify-between">
          <h3 class="text-base font-semibold">Suggested for you</h3>
          <p class="text-[11px] text-slate-500">
            Based on what you've watched and favourited
          </p>
        </div>

        <div class="relative -mx-4 px-4">
          <div
            class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
          >
            <NuxtLink
              v-for="movie in suggestions"
              :key="movie.stream_id"
              :to="`/iptv/movies/${movie.stream_id}`"
              class="group flex-none w-[120px] sm:w-[140px] md:w-[160px]"
            >
              <div
                class="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-sky-500/70"
              >
                <img
                  v-if="movie.stream_icon"
                  v-lazy="movie.stream_icon"
                  :alt="movie.name"
                  class="w-full h-[180px] sm:h-[200px] md:h-[220px] object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div
                  v-else
                  class="w-full h-[180px] sm:h-[200px] md:h-[220px] bg-slate-800 flex items-center justify-center text-slate-500 text-[10px]"
                >
                  No Art
                </div>

                <!-- favourite star -->
                <button
                  type="button"
                  @click.stop="toggleFavourite(movie.stream_id)"
                  class="absolute top-1 right-1 z-10 rounded-full bg-slate-900/80 p-1 shadow border border-slate-700/80 hover:border-amber-400"
                >
                  <span
                    :class="[
                      'text-[11px]',
                      isFavourite(movie.stream_id) ? 'text-amber-400' : 'text-slate-400',
                    ]"
                  >
                    ★
                  </span>
                </button>

                <!-- rating -->
                <div
                  v-if="ratingNumber(movie) > 0"
                  class="absolute top-1 left-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow"
                  :class="ratingBadgeClass(ratingNumber(movie))"
                >
                  ★ {{ ratingNumber(movie).toFixed(1) }}
                </div>

                <div
                  class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
                />
              </div>

              <div class="mt-1.5 space-y-0.5">
                <p
                  class="text-[11px] font-medium leading-snug line-clamp-2 text-slate-50"
                >
                  {{ movie.name }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- skeleton rows while movies are loading -->
      <section v-if="loading && !orderedRows.length" class="space-y-6">
        <div v-for="rowIndex in 4" :key="rowIndex" class="space-y-2">
          <div class="flex items-baseline justify-between">
            <div class="h-4 w-32 bg-slate-800/80 rounded animate-pulse" />
            <div class="h-3 w-16 bg-slate-800/80 rounded animate-pulse" />
          </div>

          <div class="relative -mx-4 px-4">
            <div class="flex gap-2 overflow-x-hidden pb-2">
              <div
                v-for="cardIndex in 8"
                :key="cardIndex"
                class="flex-none w-[120px] sm:w-[140px] md:w-[160px]"
              >
                <div
                  class="w-full h-[180px] sm:h-[200px] md:h-[220px] rounded-xl bg-slate-800/80 animate-pulse"
                />
                <div class="mt-1.5 h-3 rounded bg-slate-800/80 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- rows -->
      <section v-if="!loading && orderedRows.length" class="space-y-6">
        <div v-for="row in orderedRows" :key="row.category.category_id" class="space-y-2">
          <div class="flex items-baseline justify-between">
            <h3 class="text-base font-semibold">
              {{ row.category.category_name }}
            </h3>
            <p class="text-[11px] text-slate-500">
              {{ filteredRowMovies(row.movies).length }} titles
            </p>
          </div>

          <div class="relative -mx-4 px-4">
            <div
              class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
            >
              <NuxtLink
                v-for="movie in filteredRowMovies(row.movies)"
                :key="movie.stream_id"
                :to="`/iptv/movies/${movie.stream_id}`"
                class="group flex-none w-[120px] sm:w-[140px] md:w-[160px]"
              >
                <div
                  class="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-sky-500/70"
                >
                  <img
                    v-if="movie.stream_icon"
                    v-lazy="movie.stream_icon"
                    :alt="movie.name"
                    class="w-full h-[180px] sm:h-[200px] md:h-[220px] object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div
                    v-else
                    class="w-full h-[180px] sm:h-[200px] md:h-[220px] bg-slate-800 flex items-center justify-center text-slate-500 text-[10px]"
                  >
                    No Art
                  </div>

                  <!-- favourite star -->
                  <button
                    type="button"
                    @click.stop="toggleFavourite(movie.stream_id)"
                    class="absolute top-1 right-1 z-10 rounded-full bg-slate-900/80 p-1 shadow border border-slate-700/80 hover:border-amber-400"
                  >
                    <span
                      :class="[
                        'text-[11px]',
                        isFavourite(movie.stream_id)
                          ? 'text-amber-400'
                          : 'text-slate-400',
                      ]"
                    >
                      ★
                    </span>
                  </button>

                  <!-- rating -->
                  <div
                    v-if="ratingNumber(movie) > 0"
                    class="absolute top-1 left-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow"
                    :class="ratingBadgeClass(ratingNumber(movie))"
                  >
                    ★ {{ ratingNumber(movie).toFixed(1) }}
                  </div>

                  <div
                    class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
                  />
                </div>

                <div class="mt-1.5 space-y-0.5">
                  <p
                    class="text-[11px] font-medium leading-snug line-clamp-2 text-slate-50"
                  >
                    {{ movie.name }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <p v-else-if="!loading" class="text-slate-400 text-sm">No movies available.</p>
    </div>
  </div>
</template>
