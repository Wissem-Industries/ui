<script setup lang="ts">
defineOptions({ inheritAttrs: false })

// Static card: a violet halo follows the pointer. Interactive card (it leads somewhere or
// holds the actions of an item): it lifts and its edge turns violet, without the halo.
const props = withDefaults(
  defineProps<{
    halo?: boolean
    interactive?: boolean
    bodyClass?: string
  }>(),
  {
    halo: true,
    interactive: false,
    bodyClass: undefined,
  },
)

const showHalo = computed(() => props.halo && !props.interactive)

function updateHalo(event: PointerEvent) {
  if (!showHalo.value) return
  const element = event.currentTarget as HTMLElement
  const bounds = element.getBoundingClientRect()
  element.style.setProperty('--wi-glass-x', `${event.clientX - bounds.left}px`)
  element.style.setProperty('--wi-glass-y', `${event.clientY - bounds.top}px`)
}
</script>

<template>
  <div
    v-bind="$attrs"
    class="wi-glass-card"
    :class="{ 'wi-glass-card--halo': showHalo, 'wi-glass-card--interactive': interactive }"
    @pointermove="updateHalo"
  >
    <UCard class="wi-glass h-full rounded-2xl" :ui="{ body: bodyClass }">
      <slot />
    </UCard>
  </div>
</template>
