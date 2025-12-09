<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
      <h1 class="text-2xl font-semibold mb-6 text-center">Xtream Login</h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Server URL</label>
          <input
            v-model="serverUrl"
            type="text"
            placeholder="http://example.com:8080"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <p v-if="error" class="mt-4 text-red-500 text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "minimal",
});

const serverUrl = ref("");
const username = ref("");
const password = ref("");
const error = ref<string | null>(null);
const loading = ref(false);

const { login } = useXtreamAuth();

const submitForm = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Normalize server URL (remove trailing slash)
    const base = serverUrl.value.trim().replace(/\/+$/, "");
    const user = username.value.trim();

    if (!base || !user || !password.value) {
      throw new Error("Missing fields");
    }

    const apiUrl = `${base}/player_api.php`;

    // Call Xtream API
    const data: any = await $fetch(apiUrl, {
      method: "GET",
      params: {
        username: user,
        password: password.value,
      },
    });

    // Basic validity check
    const auth = Number(data?.user_info?.auth ?? 0);
    if (!data?.user_info || auth !== 1) {
      throw new Error("Invalid Xtream credentials");
    }

    // Store credentials in global state
    login({
      serverUrl: base,
      username: user,
      password: password.value,
    });

    // Go to dashboard
    await navigateTo("/iptv/dashboard");
  } catch (err) {
    console.error(err);
    error.value = "Login failed. Please check your Xtream details.";
  } finally {
    loading.value = false;
  }
};
</script>
