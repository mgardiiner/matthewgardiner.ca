<script setup lang="ts">
import { computed } from "vue"; // 👈 this was missing before

definePageMeta({
  middleware: "iptv-auth",
  layout: "minimal",
});

const channels = ref<any[]>([]);

const { creds } = useXtreamAuth()

onMounted(async () => {
  if (!creds.value) return;

  const url = `${creds.value.serverUrl}/player_api.php`;

  channels.value = await $fetch(url, {
    method: "GET",
    params: {
      username: creds.value.username,
      password: creds.value.password,
      action: "get_live_streams",
    },
  });
});
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

      <NuxtLink
        to="/iptv/movies"
        class="inline-block mt-4 px-4 py-2 rounded bg-blue-600 text-white text-sm"
      >
        View Movies
      </NuxtLink>
    </div>
  </div>
</template>
