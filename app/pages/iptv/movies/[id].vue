<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

definePageMeta({
  middleware: "iptv-auth",
  layout: "minimal",
});

const route = useRoute();
const movieId = computed(() => route.params.id as string);

const { xtreamFetch } = useXtreamClient();
const { creds } = useXtreamAuth();

const loading = ref(true);
const error = ref<string | null>(null);
const info = ref<any | null>(null);

const serverBase = computed(() =>
  creds.value ? creds.value.serverUrl.replace(/\/+$/, "") : ""
);

onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    console.log("[movie] loading info for", movieId.value);

    const data = await xtreamFetch<any>({
      action: "get_vod_info",
      vod_id: movieId.value,
    });

    console.log("[movie] get_vod_info response:", data);
    info.value = data;
  } catch (err: any) {
    console.error("[movie] error loading movie:", err);
    error.value = err?.message || "Unable to load this movie.";
  } finally {
    loading.value = false;
  }
});

// display helpers
const title = computed(() => info.value?.info?.name || "Movie");

const year = computed(() => {
  const name: string | undefined = info.value?.info?.name;
  if (!name) return "";
  const match = name.match(/\((\d{4})\)/);
  return match ? match[1] : "";
});

const poster = computed(() => info.value?.info?.movie_image || info.value?.info?.cover);

// best guess external URL (for VLC / IPTV apps)
const externalUrl = computed(() => {
  if (!info.value) return null;

  const candidates = [
    info.value?.info?.movie_url,
    info.value?.info?.direct_source,
    info.value?.movie_data?.movie_url,
    info.value?.movie_data?.direct_source,
  ].filter((u: any) => typeof u === "string" && u.length > 0);

  if (candidates.length) {
    return candidates[0] as string;
  }

  // fallback Xtream pattern – may not work in browser, but useful for external players
  if (!creds.value || !serverBase.value) return null;

  const ext =
    info.value?.movie_data?.container_extension ||
    info.value?.info?.container_extension ||
    "mkv";

  return `${serverBase.value}/movie/${creds.value.username}/${creds.value.password}/${movieId.value}.${ext}`;
});
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-50">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <!-- top bar -->
      <div class="flex items-center justify-between mb-4">
        <NuxtLink
          to="/iptv/movies"
          class="text-sm text-sky-300 hover:text-sky-200 underline underline-offset-2"
        >
          ← Back to movies
        </NuxtLink>
        <p class="text-xs text-slate-400">Stream ID: {{ movieId }}</p>
      </div>

      <!-- main content -->
      <div class="grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
        <!-- “player” box now used for external player launch -->
        <div>
          <div
            class="w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-800 mb-3 flex items-center justify-center"
          >
            <div class="px-4 text-center">
              <p class="text-sm text-slate-200 mb-2">
                In-browser playback isn’t available for this provider.
              </p>

              <p class="text-xs text-slate-400 mb-3">
                Use the button below to open this stream in an external player (like VLC
                or a dedicated IPTV app).
              </p>

              <a
                v-if="externalUrl"
                :href="externalUrl"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white shadow-sm"
              >
                Open in external player
              </a>

              <p v-else class="text-xs text-slate-500 mt-2">
                No external player URL could be generated for this movie.
              </p>

              <p
                v-if="externalUrl"
                class="mt-3 text-[11px] text-slate-500 break-all text-left max-h-24 overflow-y-auto"
              >
                {{ externalUrl }}
              </p>
            </div>
          </div>

          <p v-if="error" class="text-red-400 text-sm mb-2">
            {{ error }}
          </p>

          <p v-if="loading && !error" class="text-slate-400 text-sm">Loading movie…</p>
        </div>

        <!-- details -->
        <aside class="space-y-3">
          <div class="flex gap-3">
            <img
              v-if="poster"
              :src="poster"
              :alt="title"
              class="w-24 h-32 rounded-lg object-cover border border-slate-700"
            />
            <div>
              <h1 class="text-xl font-semibold leading-tight">
                {{ title }}
              </h1>
              <p v-if="year" class="text-sm text-slate-400">
                {{ year }}
              </p>
              <p v-if="info?.info?.releasedate" class="text-xs text-slate-500 mt-1">
                Released: {{ info.info.releasedate }}
              </p>
            </div>
          </div>

          <div v-if="info?.info" class="text-sm text-slate-300 space-y-1">
            <p v-if="info.info.genre">
              <span class="font-medium text-slate-400">Genre:</span>
              {{ info.info.genre }}
            </p>
            <p v-if="info.info.duration">
              <span class="font-medium text-slate-400">Duration:</span>
              {{ info.info.duration }}
            </p>
            <p v-if="info.info.director">
              <span class="font-medium text-slate-400">Director:</span>
              {{ info.info.director }}
            </p>
            <p v-if="info.info.actors">
              <span class="font-medium text-slate-400">Cast:</span>
              {{ info.info.actors }}
            </p>
            <p v-if="info.info.plot" class="pt-2 text-slate-200 text-sm">
              <span class="block font-medium text-slate-400 mb-1">Plot</span>
              {{ info.info.plot }}
            </p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
