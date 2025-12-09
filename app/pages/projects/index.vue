<script setup lang="ts">
const { projects } = useProjects();
</script>

<template>
  <section>
    <h1>Projects</h1>
    <ProjectList :items="projects" />
  </section>
</template>
