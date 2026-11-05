<script setup lang="ts">
/** Page title with a short eyebrow, an optional description and actions on the right. */
withDefaults(defineProps<{ eyebrow?: string; title: string; description?: string }>(), {
  eyebrow: undefined,
  description: undefined,
})
</script>

<template>
  <header class="flex items-start justify-between gap-4 sm:items-end sm:gap-6">
    <div class="min-w-0">
      <p v-if="eyebrow" class="text-xs font-semibold uppercase tracking-widest text-primary">{{ eyebrow }}</p>
      <h1 class="mt-1 text-pretty text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">{{ title }}</h1>
      <p v-if="description" class="mt-2 max-w-prose text-pretty text-sm leading-6 text-muted">{{ description }}</p>
    </div>
    <div v-if="$slots.default" class="flex shrink-0 flex-wrap items-center justify-end gap-2">
      <slot />
    </div>
  </header>
</template>
