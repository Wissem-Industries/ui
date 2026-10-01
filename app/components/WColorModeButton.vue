<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), {
  label: 'Toggle color mode',
})

const colorMode = useColorMode()
const button = useTemplateRef<{ $el: HTMLElement }>('button')

async function toggle(event: MouseEvent) {
  const next = colorMode.value === 'dark' ? 'light' : 'dark'
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!document.startViewTransition || reduceMotion) {
    colorMode.preference = next
    return
  }

  // Pointer position for a click, button center for the keyboard.
  const bounds = button.value?.$el.getBoundingClientRect()
  const x = event.detail > 0 ? event.clientX : (bounds?.left ?? 0) + (bounds?.width ?? 0) / 2
  const y = event.detail > 0 ? event.clientY : (bounds?.top ?? 0) + (bounds?.height ?? 0) / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const root = document.documentElement
  root.dataset.wiThemeTransition = ''
  const transition = document.startViewTransition(async () => {
    colorMode.preference = next
    await nextTick()
  })
  transition.finished.finally(() => delete root.dataset.wiThemeTransition)
  await transition.ready
  root.animate(
    {
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
    },
    {
      duration: 560,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}
</script>

<template>
  <UButton
    ref="button"
    :aria-label="label"
    color="neutral"
    variant="ghost"
    size="sm"
    class="size-11 justify-center rounded-full p-0 sm:size-9"
    @click="toggle"
  >
    <UIcon name="i-ri-moon-line" class="size-4.5 dark:hidden" aria-hidden="true" />
    <UIcon name="i-ri-sun-line" class="hidden size-4.5 dark:block" aria-hidden="true" />
  </UButton>
</template>
