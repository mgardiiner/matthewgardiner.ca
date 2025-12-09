<template>
  <article v-if="project">
    <h1>{{ project.title }}</h1>
    <p>{{ project.description }}</p>
  </article>
  <p v-else>Project not found.</p>
</template>

<script setup lang="ts">
const route = useRoute();
const { project } = useProjects().getBySlug(route.params.slug as string);
</script>
