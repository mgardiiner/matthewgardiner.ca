<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

definePageMeta({
  middleware: "iptv-auth",
  layout: "minimal",
});

const route = useRoute();
const movieId = computed(() => route.params.id as string);

const { recentIds, addRecent } = useRecentlyViewed();
const { xtreamFetch } = useXtreamClient();
const { creds } = useXtreamAuth();
const { isFavourite, toggleFavourite } = useFavourites();

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
    const data = await xtreamFetch<any>({
      action: "get_vod_info",
      vod_id: movieId.value,
    });

    console.log("[movie] get_vod_info response:", data);
    info.value = data;

    // mark as recently viewed
    addRecent(Number(movieId.value));
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

// Best-guess external URL for any player (VLC, IPTV app, etc.)
const externalUrl = computed(() => {
  // If we *do* have info, try to use any direct URL the panel gives us
  const candidates = info.value
    ? [
        info.value?.info?.movie_url,
        info.value?.info?.direct_source,
        info.value?.movie_data?.movie_url,
        info.value?.movie_data?.direct_source,
      ].filter((u: any) => typeof u === "string" && u.length > 0)
    : [];

  if (candidates.length) {
    return candidates[0] as string;
  }

  // Fallback: construct URL from creds + movieId, even if get_vod_info failed
  if (!creds.value || !serverBase.value) return null;

  const ext =
    info.value?.movie_data?.container_extension ||
    info.value?.info?.container_extension ||
    "mkv"; // best guess if we know nothing

  return `${serverBase.value}/movie/${creds.value.username}/${creds.value.password}/${movieId.value}.${ext}`;
});

// QR code image URL
const qrUrl = computed(() => {
  if (!externalUrl.value) return null;
  const base = "https://api.qrserver.com/v1/create-qr-code/";
  const query = `?size=200x200&data=${encodeURIComponent(externalUrl.value)}`;
  return base + query;
});

// copy-to-clipboard UX
const copyState = ref<"idle" | "copied" | "error">("idle");

const copyLink = async () => {
  if (!externalUrl.value || !process.client) return;
  try {
    await navigator.clipboard.writeText(externalUrl.value);
    copyState.value = "copied";
    setTimeout(() => {
      copyState.value = "idle";
    }, 2000);
  } catch (e) {
    console.error("clipboard error", e);
    copyState.value = "error";
    setTimeout(() => {
      copyState.value = "idle";
    }, 2000);
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-50">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <!-- top bar -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/iptv/movies"
            class="text-sm text-sky-300 hover:text-sky-200 underline underline-offset-2"
          >
            ← Back to movies
          </NuxtLink>
          <button
            type="button"
            @click="toggleFavourite(Number(movieId))"
            class="px-2 py-1 rounded-full text-xs border border-slate-700 bg-slate-900/70 flex items-center gap-1"
          >
            <span
              :class="[
                'text-sm',
                isFavourite(Number(movieId)) ? 'text-amber-400' : 'text-slate-400',
              ]"
            >
              ★
            </span>
            <span>
              {{ isFavourite(Number(movieId)) ? "Favourited" : "Favourite" }}
            </span>
          </button>
        </div>
        <p class="text-xs text-slate-400">Stream ID: {{ movieId }}</p>
      </div>

      <!-- main content -->
      <div class="grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
        <!-- launcher card -->
        <div>
          <div
            class="w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-800 mb-3 p-4 flex flex-col gap-3"
          >
            <p class="text-sm text-slate-200">
              This page is a launcher. Use the button below to open the stream in any
              external player installed on your device (VLC, IPTV app, etc.). Browser
              playback isn’t supported for this provider.
            </p>

            <div class="flex flex-wrap items-center gap-3 mt-1">
              <!-- Main external-player link: plain HTTP(S) URL -->
              <a
                v-if="externalUrl"
                :href="externalUrl"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white shadow-sm"
              >
                Open in external player
              </a>

              <!-- Copy -->
              <button
                v-if="externalUrl"
                type="button"
                @click="copyLink"
                class="inline-flex items-center justify-center px-3 py-2 rounded-full border border-slate-600 bg-slate-900/80 text-xs text-slate-100 hover:border-sky-500"
              >
                <span v-if="copyState === 'idle'">Copy URL</span>
                <span v-else-if="copyState === 'copied'">Copied!</span>
                <span v-else>Copy failed</span>
              </button>
            </div>

            <p v-if="!externalUrl" class="text-xs text-slate-500 mt-1">
              No external URL could be generated for this movie.
            </p>

            <!-- debug URL -->
            <p
              v-if="externalUrl"
              class="mt-3 text-[11px] text-slate-500 break-all max-h-24 overflow-y-auto"
            >
              {{ externalUrl }}
            </p>
          </div>

          <!-- QR code -->
          <div
            v-if="qrUrl"
            class="mt-4 inline-flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3"
          >
            <img
              :src="qrUrl"
              alt="Stream QR code"
              class="w-24 h-24 rounded bg-white p-1"
            />
            <div class="text-xs text-slate-300 max-w-xs">
              <p class="font-semibold text-slate-100 mb-1">Scan on another device</p>
              <p>
                Open your camera or QR app on a TV/phone and scan this code to open the
                stream in an IPTV player or VLC on that device.
              </p>
            </div>
          </div>

          <p v-if="error" class="text-red-400 text-sm mt-4">
            {{ error }}
          </p>

          <p v-if="loading && !error" class="text-slate-400 text-sm mt-2">
            Loading movie…
          </p>
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
