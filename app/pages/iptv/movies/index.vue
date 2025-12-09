<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

definePageMeta({
  middleware: "iptv-auth",
  layout: "minimal",
});

type VodCategory = {
  category_id: string;
  category_name: string;
};

type VodStream = {
  num: number;
  name: string;
  stream_type: "movie";
  stream_id: number;
  stream_icon?: string | null;
  rating?: string;
  rating_5based?: number;
  tmdb?: string;
  added?: string;
  is_adult?: number;
  category_id?: string;
  container_extension?: string;
};

const { xtreamFetch } = useXtreamClient();

// ===== CATEGORY FILTERING =====

// prefixes to completely hide (case-insensitive, startsWith)
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
].map((s) => s.toLowerCase());

const isBlockedCategory = (name: string) => {
  const lower = name.toLowerCase();
  return blockedPrefixes.some((prefix) => lower.startsWith(prefix));
};

// service keyword groups (case-insensitive, contains)
const netflixKeywords = ["netflix"].map((s) => s.toLowerCase());
const amazonKeywords = ["amazon", "prime"].map((s) => s.toLowerCase());
const disneyKeywords = ["disney"].map((s) => s.toLowerCase());
const appleKeywords = ["apple+"].map((s) => s.toLowerCase());
const discoveryKeywords = ["discovery+"].map((s) => s.toLowerCase());
const paramountKeywords = ["paramount"].map((s) => s.toLowerCase());

const categories = ref<VodCategory[]>([]);
const movies = ref<VodStream[]>([]);
const selectedCategoryId = ref<string | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

// which "mode" is active: generic OR one of the services
type SourceMode = "generic" | "netflix" | "amazon" | "disney" | "apple+" | "discovery+" | "paramount";
const sourceMode = ref<SourceMode>("generic");

const visibleCategories = computed(() =>
  categories.value.filter((c) => !isBlockedCategory(c.category_name))
);

const categoryMatches = (cat: VodCategory, keywords: string[]) => {
  const lower = cat.category_name.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
};

const netflixCategories = computed(() =>
  visibleCategories.value.filter((c) => categoryMatches(c, netflixKeywords))
);

const amazonCategories = computed(() =>
  visibleCategories.value.filter((c) => categoryMatches(c, amazonKeywords))
);

const disneyCategories = computed(() =>
  visibleCategories.value.filter((c) => categoryMatches(c, disneyKeywords))
);

const appleCategories = computed(() =>
  visibleCategories.value.filter((c) => c.category_name.includes("APPLE+"))
);

const discoveryCategories = computed(() =>
  visibleCategories.value.filter((c) => c.category_name.includes("DISCOVERY+"))
);

const paramountCategories = computed(() =>
  visibleCategories.value.filter((c) => c.category_name.includes("PARAMOUNT"))
);

// generic = everything *not* Netflix/Amazon/Disney and not blocked
const genericCategories = computed(() =>
  visibleCategories.value.filter(
    (c) =>
      !categoryMatches(c, netflixKeywords) &&
      !categoryMatches(c, amazonKeywords) &&
      !categoryMatches(c, disneyKeywords) &&
      !categoryMatches(c, appleKeywords) &&
      !categoryMatches(c, discoveryKeywords) &&
      !categoryMatches(c, paramountKeywords)
  )
);

// the list shown in the dropdown depends on the current sourceMode
const currentCategoryList = computed(() => {
  switch (sourceMode.value) {
    case "netflix":
      return netflixCategories.value;
    case "amazon":
      return amazonCategories.value;
    case "disney":
      return disneyCategories.value;
    case "apple+":
      return appleCategories.value;
    case "discovery+":
      return discoveryCategories.value;
    case "paramount":
      return paramountCategories.value;
    case "generic":
    default:
      return genericCategories.value;
  }
});

const selectedCategory = computed(
  () =>
    visibleCategories.value.find((c) => c.category_id === selectedCategoryId.value) ||
    null
);

const loadCategories = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await xtreamFetch<VodCategory[]>({
      action: "get_vod_categories",
    });

    categories.value = data;

    // after we have categories, pick an initial category for the current mode
    await selectSourceMode("generic"); // default to generic EN-, PL-, etc.
  } catch (err) {
    console.error(err);
    error.value = "Failed to load movie categories.";
  } finally {
    loading.value = false;
  }
};

const loadMoviesForCategory = async (categoryId: string) => {
  loading.value = true;
  error.value = null;
  try {
    const data = await xtreamFetch<VodStream[]>({
      action: "get_vod_streams",
      category_id: categoryId,
    });
    movies.value = data;
  } catch (err) {
    console.error(err);
    error.value = "Failed to load movies for this category.";
  } finally {
    loading.value = false;
  }
};

const onCategoryChange = async (id: string) => {
  if (!id) return;
  selectedCategoryId.value = id;
  await loadMoviesForCategory(id);
};

// when you click Netflix / Amazon / Disney buttons
const selectSourceMode = async (mode: SourceMode) => {
  sourceMode.value = mode;

  const list = currentCategoryList.value;
  if (!list.length) {
    movies.value = [];
    return;
  }

  // if previously selected category is still in this list, keep it
  const existing = list.find((c) => c.category_id === selectedCategoryId.value);
  const target = existing || list[0];

  selectedCategoryId.value = target.category_id;
  await loadMoviesForCategory(target.category_id);
};

// ===== MOVIE HELPERS =====

const displayYear = (movie: VodStream) => {
  const match = movie.name.match(/\((\d{4})\)/);
  return match ? match[1] : "";
};

// use rating as-is (0–10)
const ratingNumber = (movie: VodStream) => {
  const r = Number(movie.rating);
  return Number.isNaN(r) ? 0 : r;
};

const ratingBadgeClass = (rating: number) => {
  if (rating >= 8) return "bg-emerald-100 text-emerald-700";
  if (rating >= 6) return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
};

// ===== FILTERS =====

const search = ref("");
const minRating = ref(0); // 0–10
const yearFrom = ref<number | null>(null);

const filteredMovies = computed(() => {
  return movies.value.filter((movie) => {
    const name = movie.name?.toLowerCase() || "";
    const searchMatch = !search.value || name.includes(search.value.toLowerCase());

    const rating10 = ratingNumber(movie);
    const ratingMatch = rating10 >= minRating.value;

    let yearMatch = true;
    if (yearFrom.value) {
      const m = movie.name.match(/\((\d{4})\)/);
      const year = m ? Number(m[1]) : null;
      yearMatch = !year || year >= yearFrom.value;
    }

    return searchMatch && ratingMatch && yearMatch;
  });
});

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100"
  >
    <div class="max-w-6xl mx-auto px-4 pb-12 pt-6">
      <!-- header row -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-semibold tracking-tight">Movies</h1>
          <p class="text-sm text-slate-400 mt-1">
            {{ selectedCategory?.category_name || "Loading categories…" }}
          </p>
        </div>

        <NuxtLink
          to="/iptv/dashboard"
          class="text-sm text-sky-300 hover:text-sky-200 underline underline-offset-2"
        >
          Back to dashboard
        </NuxtLink>
      </div>

      <!-- controls -->
      <div
        class="mb-6 flex flex-col gap-3 bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 backdrop-blur"
      >
        <!-- source mode buttons -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Source
          </span>

          <button
            type="button"
            @click="selectSourceMode('generic')"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-medium border transition',
              sourceMode === 'generic'
                ? 'bg-sky-600 border-sky-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500',
            ]"
          >
            Generic (EN / PL / etc.)
          </button>

          <button
            type="button"
            @click="selectSourceMode('netflix')"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-medium border transition',
              sourceMode === 'netflix'
                ? 'bg-sky-600 border-sky-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500',
            ]"
          >
            Netflix
          </button>

          <button
            type="button"
            @click="selectSourceMode('amazon')"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-medium border transition',
              sourceMode === 'amazon'
                ? 'bg-sky-600 border-sky-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500',
            ]"
          >
            Amazon
          </button>

          <button
            type="button"
            @click="selectSourceMode('disney')"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-medium border transition',
              sourceMode === 'disney'
                ? 'bg-sky-600 border-sky-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500',
            ]"
          >
            Disney
          </button>

          <button
            type="button"
            @click="selectSourceMode('apple+')"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-medium border transition',
              sourceMode === 'apple+'
                ? 'bg-sky-600 border-sky-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500',
            ]"
          >
            Apple+
          </button>

          <button
            type="button"
            @click="selectSourceMode('discovery+')"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-medium border transition',
              sourceMode === 'discovery+'
                ? 'bg-sky-600 border-sky-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500',
            ]"
          >
            Discovery+
          </button>

          <button
            type="button"
            @click="selectSourceMode('paramount')"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-medium border transition',
              sourceMode === 'paramount'
                ? 'bg-sky-600 border-sky-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500',
            ]"
          >
            Paramount
          </button>
        </div>



        <!-- category dropdown + filters -->
        <div class="flex flex-wrap gap-4 items-center">
          <!-- category dropdown that changes with sourceMode -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Category
            </span>
            <select
              v-if="currentCategoryList.length"
              :value="selectedCategoryId || ''"
              @change="onCategoryChange(($event.target as HTMLSelectElement).value)"
              class="bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option
                v-for="cat in currentCategoryList"
                :key="cat.category_id"
                :value="cat.category_id"
              >
                {{ cat.category_name }}
              </option>
            </select>
            <span v-else class="text-xs text-slate-500">
              No categories for this source.
            </span>
          </div>

          <!-- search + rating filters -->
          <div class="flex flex-wrap gap-3 items-center ml-auto">
            <!-- search -->
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Search
              </span>
              <input
                v-model="search"
                type="text"
                placeholder="Title…"
                class="bg-slate-900/70 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <!-- rating -->
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Rating
              </span>
              <select
                v-model.number="minRating"
                class="bg-slate-900/70 border border-slate-700 rounded-full px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                <option :value="0">Any</option>
                <option :value="5">5+</option>
                <option :value="6">6+</option>
                <option :value="7">7+</option>
                <option :value="8">8+</option>
              </select>
            </div>
          </div>

          <!-- counts -->
          <p
            v-if="movies.length"
            class="w-full text-xs text-slate-500 mt-2 flex justify-end"
          >
            Showing
            <span class="font-medium text-slate-200 mx-1">
              {{ filteredMovies.length }}
            </span>
            of
            <span class="font-medium text-slate-200 mx-1">
              {{ movies.length }}
            </span>
            movies
          </p>
        </div>
      </div>

      <!-- messages -->
      <p v-if="error" class="text-red-400 mb-4">
        {{ error }}
      </p>

      <p v-if="loading" class="text-slate-400 mb-4">Loading movies…</p>

      <!-- grid -->
      <div
        v-if="!loading && filteredMovies.length"
        class="grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
      >
        <NuxtLink
          v-for="movie in filteredMovies"
          :key="movie.stream_id"
          :to="`/iptv/movies/${movie.stream_id}`"
          class="group bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden hover:border-sky-500/70 transition-all duration-200"
        >
          <!-- poster -->
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

          <!-- text -->
          <div class="p-2 space-y-1">
            <h2 class="text-[11px] font-semibold leading-snug line-clamp-2 text-slate-50">
              {{ movie.name }}
            </h2>
            <div class="flex flex-wrap items-center gap-1 text-[10px] text-slate-400">
              <span v-if="displayYear(movie)">{{ displayYear(movie) }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <p v-else-if="!loading" class="text-slate-400">No movies match your filters.</p>
    </div>
  </div>
</template>
