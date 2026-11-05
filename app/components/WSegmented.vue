<script setup lang="ts">
export interface WSegment {
  label: string
  value: string
  icon?: string
}

/** Switch between two to four views of the same list. */
defineProps<{ items: WSegment[]; label: string }>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <div role="group" :aria-label="label" class="inline-flex shrink-0 gap-1 rounded-full bg-muted p-1">
    <button
      v-for="s in items"
      :key="s.value"
      type="button"
      :aria-pressed="model === s.value"
      class="inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors duration-(--wi-duration-fast) focus-visible:outline-2 focus-visible:outline-primary sm:h-8"
      :class="model === s.value ? 'bg-elevated text-highlighted shadow-sm' : 'text-muted hover:text-highlighted'"
      @click="model = s.value"
    >
      <UIcon v-if="s.icon" :name="s.icon" class="size-4" aria-hidden="true" />
      {{ s.label }}
    </button>
  </div>
</template>
