<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

export interface WAction {
  key: string
  label: string
  icon?: string
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  disabled?: boolean
  loading?: boolean
  onClick: () => void
}

/**
 * Main actions of a detail page: a floating bar within thumb reach on phones, an inline row
 * from `md`. Keep it to three or four actions; leave room under the page for the bar.
 */
defineProps<{ actions: WAction[]; label: string }>()
</script>

<template>
  <div
    role="group"
    :aria-label="label"
    class="wi-glass fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-2 rounded-2xl p-2 md:hidden"
  >
    <UButton
      v-for="a in actions"
      :key="a.key"
      :label="a.label"
      :icon="a.icon"
      :color="a.color"
      :variant="a.variant"
      :disabled="a.disabled"
      :loading="a.loading"
      size="lg"
      class="min-h-11 min-w-0 flex-1 justify-center px-2"
      @click="a.onClick"
    />
  </div>
  <div role="group" :aria-label="label" class="hidden flex-wrap gap-2 md:flex">
    <UButton
      v-for="a in actions"
      :key="a.key"
      :label="a.label"
      :icon="a.icon"
      :color="a.color"
      :variant="a.variant"
      :disabled="a.disabled"
      :loading="a.loading"
      @click="a.onClick"
    />
  </div>
</template>
