<script setup lang="ts">
export interface WNavbarItem {
  label: string
  to: string
  icon?: string
  /** Active only on this exact path. Always the case for the root path. */
  exact?: boolean
}

const props = defineProps<{
  items: WNavbarItem[]
  /** Accessible name of the navigation landmark. */
  label: string
}>()

const route = useRoute()
const list = useTemplateRef<HTMLElement>('list')
const ready = ref(false)
function normalize(path: string) {
  return path.replace(/\/+$/, '') || '/'
}

function isActive(item: WNavbarItem) {
  const path = normalize(route.path)
  const target = normalize(item.to)
  // `/en` is a prefix of `/en/projects`: an entry that has siblings below it is exact.
  const hasChildren = props.items.some(
    (other) => other !== item && normalize(other.to).startsWith(`${target}/`),
  )
  if (item.exact || target === '/' || hasChildren) return path === target
  return path === target || path.startsWith(`${target}/`)
}

function placeIndicator() {
  const element = list.value
  if (!element) return
  const active = element.querySelector<HTMLElement>('[aria-current="page"]')
  element.style.setProperty('--wi-nav-w', active ? `${active.offsetWidth}px` : '0px')
  element.style.setProperty('--wi-nav-x', active ? `${active.offsetLeft}px` : '0px')
  element.dataset.empty = active ? 'false' : 'true'
}

let observer: ResizeObserver | undefined

onMounted(() => {
  placeIndicator()
  // The first placement must not slide in from the left edge.
  requestAnimationFrame(() => {
    ready.value = true
  })
  if (list.value) {
    observer = new ResizeObserver(placeIndicator)
    observer.observe(list.value)
    for (const link of list.value.querySelectorAll('a')) observer.observe(link)
  }
})

onBeforeUnmount(() => observer?.disconnect())

watch(
  () => route.path,
  () => nextTick(placeIndicator),
)
watch(
  () => props.items,
  () => nextTick(placeIndicator),
  { deep: true },
)
</script>

<template>
  <header
    class="pointer-events-none fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex justify-center px-3 sm:top-4"
  >
    <nav
      :aria-label="label"
      class="wi-navbar wi-glass wi-glass--pill pointer-events-auto flex max-w-full items-center gap-0.5 p-1"
    >
      <ul ref="list" class="wi-navbar__list relative flex items-center gap-0.5" :data-ready="ready">
        <li class="wi-navbar__indicator" role="presentation" aria-hidden="true" />
        <li v-for="item in items" :key="item.to">
          <NuxtLink
            :to="item.to"
            :aria-current="isActive(item) ? 'page' : undefined"
            class="wi-navbar__link relative flex size-11 items-center justify-center rounded-full text-sm font-medium text-toned outline-none transition-[color,scale] duration-(--wi-duration-base) ease-wi-spring hover:text-highlighted focus-visible:outline-2 focus-visible:outline-primary active:scale-95 aria-[current=page]:text-primary sm:h-9 sm:w-auto sm:min-w-20 sm:px-4"
          >
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              aria-hidden="true"
              class="size-5 shrink-0 sm:hidden"
            />
            <span class="wi-navbar__label leading-none" :class="item.icon && 'max-sm:sr-only'">
              {{ item.label }}
            </span>
          </NuxtLink>
        </li>
      </ul>

      <div
        v-if="$slots.trailing"
        class="ml-0.5 flex shrink-0 items-center gap-0.5 border-l border-default/60 pl-1"
      >
        <slot name="trailing" />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.wi-navbar__indicator {
  position: absolute;
  inset-block: 0;
  left: 0;
  width: var(--wi-nav-w, 0px);
  translate: var(--wi-nav-x, 0px) 0;
  border-radius: var(--wi-radius-pill);
  background: color-mix(in oklab, var(--ui-primary) 13%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--ui-primary) 24%, transparent);
  opacity: 1;
  pointer-events: none;
}

.wi-navbar__list[data-empty="true"] .wi-navbar__indicator {
  opacity: 0;
}

.wi-navbar__list[data-ready="true"] .wi-navbar__indicator {
  transition:
    translate var(--wi-duration-slow) var(--wi-ease-spring),
    width var(--wi-duration-slow) var(--wi-ease-spring),
    opacity var(--wi-duration-fast) var(--wi-ease-standard);
}

/* Until the indicator is placed, the active link carries the highlight. */
.wi-navbar__list[data-ready="false"] [aria-current="page"] {
  background: color-mix(in oklab, var(--ui-primary) 13%, transparent);
}
</style>
