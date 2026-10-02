<script setup lang="ts">
/**
 * Blurred, saturated copy of an image behind the content, for a glass surface
 * laid on top. Pass a small image: the blur is static, without backdrop-filter.
 */
withDefaults(
  defineProps<{
    /** Image that provides the colors. Falls back to the primary color. */
    src?: string
    /** Opacity of the halo in light mode, between 0 and 1. */
    intensity?: number
    as?: string
  }>(),
  { src: undefined, intensity: 0.3, as: 'div' },
)
</script>

<template>
  <component
    :is="as"
    class="relative isolate"
    :style="{
      '--wi-ambient-opacity': intensity,
      '--wi-ambient-opacity-dark': Math.min(intensity * 1.7, 0.85),
    }"
  >
    <img
      v-if="src"
      :src="src"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      class="wi-ambient__halo"
    >
    <span v-else class="wi-ambient__fallback" aria-hidden="true" />
    <slot />
  </component>
</template>
