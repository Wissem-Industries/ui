<script setup lang="ts">
/** Empty list, missing item or failed load. Buttons go in the default slot. */
withDefaults(
  defineProps<{ icon: string; title: string; description?: string; error?: boolean }>(),
  {
    description: undefined,
    error: false,
  },
)
</script>

<template>
  <div
    class="flex flex-col items-center rounded-2xl border border-dashed px-6 py-12 text-center sm:py-16"
    :class="error ? 'border-error/40 bg-error/5' : 'border-default'"
    :role="error ? 'alert' : 'status'"
  >
    <span
      class="mb-4 flex size-12 items-center justify-center rounded-full"
      :class="error ? 'bg-error/10 text-error' : 'bg-muted text-muted'"
    >
      <UIcon :name="icon" class="size-6" aria-hidden="true" />
    </span>
    <h2 class="text-base font-semibold text-highlighted">{{ title }}</h2>
    <p v-if="description" class="mt-1 max-w-sm text-pretty text-sm leading-6 text-muted">{{ description }}</p>
    <div v-if="$slots.default" class="mt-5 flex flex-wrap justify-center gap-2">
      <slot />
    </div>
  </div>
</template>
