<script setup lang="ts">
definePageMeta({
  middleware: "iptv-auth",
  layout: "minimal",
});

const { creds, logout } = useXtreamAuth();

const {
  categories,
  rows,
  lastSync,
  isSyncing,
  syncError,
  loadFromCache,
  syncFromXtream,
} = useMovieLibrary();

const syncing = computed(() => isSyncing.value);

const lastSyncDisplay = computed(() => {
  if (!lastSync.value) return "Never synced";
  return new Date(lastSync.value).toLocaleString();
});

onMounted(async () => {
  await loadFromCache();
});

const handleSync = async () => {
  await syncFromXtream();
};
</script>



<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-3xl mx-auto py-10 px-4">
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold">Xtream Dashboard</h1>
        <button
          @click="
            logout();
            $router.push('/iptv');
          "
          class="px-3 py-1 rounded bg-gray-800 text-white text-sm"
        >
          Logout
        </button>
      </header>

      <section
        class="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-100"
      >
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="font-semibold">Movie Library</p>
            <p class="text-xs text-slate-400">
              Last sync:
              <span class="font-medium">{{ lastSyncDisplay }}</span>
            </p>
            <p v-if="rows.length" class="text-[11px] text-slate-500 mt-1">
              Cached rows: {{ rows.length }} categories
            </p>
          </div>

          <button
            type="button"
            @click="handleSync"
            :disabled="syncing"
            class="px-3 py-1.5 rounded-full text-xs font-semibold border border-sky-500 bg-sky-600 text-white hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ syncing ? "Syncing…" : "Sync Library" }}
          </button>
        </div>

        <p v-if="syncError" class="text-xs text-red-400 mt-1">
          {{ syncError }}
        </p>
      </section>

      <NuxtLink
        to="/iptv/movies"
        class="inline-block mt-4 px-4 py-2 rounded bg-blue-600 text-white text-sm"
      >
        View Movies
      </NuxtLink>
    </div>
  </div>
</template>
