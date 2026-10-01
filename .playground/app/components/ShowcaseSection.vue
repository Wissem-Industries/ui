<script setup lang="ts">
defineProps<{ id: string; title: string; description?: string }>()
</script>

<template>
  <section :id="id" class="space-y-6 border-t border-default py-12">
    <div class="max-w-2xl space-y-2">
      <h2 class="text-2xl font-semibold tracking-tight text-highlighted">{{ title }}</h2>
      <p v-if="description" class="text-sm leading-6 text-muted">{{ description }}</p>
    </div>
    <slot />
  </section>
</template>
