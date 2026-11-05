<script setup lang="ts">
import { type WTone, wiToneFill, wiToneSurface } from '../utils/wi-app'

/** Status pill: a colored dot or an icon, then a short label. `quiet` keeps only the outline. */
withDefaults(defineProps<{ label: string; tone?: WTone; icon?: string; quiet?: boolean }>(), {
  tone: 'neutral',
  icon: undefined,
  quiet: false,
})
</script>

<template>
  <span
    class="inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none ring-1 ring-inset"
    :class="quiet ? 'bg-transparent text-muted ring-default' : wiToneSurface[tone]"
  >
    <UIcon v-if="icon" :name="icon" class="size-3.5 shrink-0" aria-hidden="true" />
    <span
      v-else
      class="size-1.5 shrink-0 rounded-full"
      :class="quiet ? 'bg-neutral-400' : wiToneFill[tone]"
      aria-hidden="true"
    />
    <span class="truncate">{{ label }}</span>
  </span>
</template>
