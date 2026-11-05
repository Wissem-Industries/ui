<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { type WTone, wiToneFill } from '../utils/wi-app'

export interface WStatTile {
  label: string
  value: number | string
  icon?: string
  /** Small line under the value. */
  hint?: string
  /** Makes the tile a link to the matching list. */
  to?: RouteLocationRaw
  /** Dot before the label, used when there is no icon. */
  tone?: WTone
}

/** Row of key figures. Tiles with `to` are links; zero values are dimmed. */
defineProps<{ items: WStatTile[]; label: string }>()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <nav v-if="items.length" :aria-label="label">
    <ul class="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <li v-for="t in items" :key="t.label">
        <component
          :is="t.to ? NuxtLink : 'div'"
          :to="t.to"
          class="group flex h-full flex-col rounded-xl bg-elevated p-4 shadow-sm ring ring-default/70 outline-none"
          :class="
            t.to &&
            'transition duration-(--wi-duration-base) ease-(--wi-ease-out) hover:-translate-y-px hover:shadow-md hover:ring-primary/40 focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none'
          "
        >
          <span class="flex items-center gap-1.5 text-xs text-muted">
            <UIcon v-if="t.icon" :name="t.icon" class="size-4" aria-hidden="true" />
            <span v-else-if="t.tone" class="size-2 rounded-full" :class="wiToneFill[t.tone]" aria-hidden="true" />
            {{ t.label }}
          </span>
          <span
            class="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight"
            :class="t.value ? ['text-highlighted', t.to && 'group-hover:text-primary'] : 'text-muted'"
          >
            {{ t.value }}
          </span>
          <span v-if="t.hint" class="mt-0.5 truncate text-xs text-muted">{{ t.hint }}</span>
        </component>
      </li>
    </ul>
  </nav>
</template>
