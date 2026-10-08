<script setup lang="ts">
import type { WStatusKind } from '../utils/wi-status'

/**
 * Full-page status screen: not found, access errors, server errors, maintenance,
 * offline and coming soon. The text is built in (French and English) and can be
 * replaced prop by prop. The layer's `error.vue` renders it for every Nuxt error.
 */
const props = withDefaults(
  defineProps<{
    kind?: WStatusKind
    /** Code shown in the badge. Defaults to the code of the kind; kinds without one show the label. */
    code?: number | string
    title?: string
    description?: string
    /** Mono line under the text, usually the requested path. */
    detail?: string
    /** `fr` or `en`. Detected from the i18n module, the `wsm_locale` cookie or the browser. */
    locale?: string
    homeTo?: string
    /** Show the home button. Default depends on the kind. */
    home?: boolean
    /** Show the back button when the visitor has a previous page. Default depends on the kind. */
    back?: boolean
    /** Show the retry button. Default depends on the kind. */
    retry?: boolean
    /** Seconds before the retry button is enabled. */
    retryAfter?: number
    /** Planned end of a maintenance. */
    until?: Date | string | number
    /** Color mode button in the corner. */
    chrome?: boolean
    /** Fill the viewport. Turn off to place the screen inside a page. */
    fullscreen?: boolean
    /** Root element. Use `section` when the page already has a `main`. */
    as?: string
  }>(),
  {
    kind: 'not-found',
    code: undefined,
    title: undefined,
    description: undefined,
    detail: undefined,
    locale: undefined,
    homeTo: '/',
    home: undefined,
    back: undefined,
    retry: undefined,
    retryAfter: 0,
    until: undefined,
    chrome: true,
    fullscreen: true,
    as: 'main',
  },
)

const emit = defineEmits<{
  /** Click on the home button. Call `preventDefault()` to handle the navigation yourself. */
  home: [event: MouseEvent]
  /** Click on the retry button. Without a listener the page reloads. */
  retry: []
}>()

const instance = getCurrentInstance()
const headingId = useId()

const lang = useWiStatusLocale()
const activeLang = computed(() => (props.locale ? wiStatusLocale(props.locale) : lang.value))
const meta = computed(() => wiStatusKinds[props.kind])
const strings = computed(() => wiStatusCopy(props.kind, activeLang.value))
const ui = computed(() => wiStatusUi(activeLang.value))

const codeText = computed(() => String(props.code ?? meta.value.code ?? ''))
const eyebrow = computed(() =>
  codeText.value ? ui.value.code(codeText.value) : strings.value.eyebrow,
)

const accessProblem = ['unauthorized', 'forbidden', 'not-found', 'bad-request']
const showHome = computed(() => props.home ?? !['maintenance', 'offline'].includes(props.kind))
const showRetry = computed(() => props.retry ?? meta.value.retry)
const wantsBack = computed(() => props.back ?? accessProblem.includes(props.kind))

const buttonColor = computed(() =>
  meta.value.accent === 'neutral' ? 'primary' : meta.value.accent,
)
const canGoBack = ref(false)
const remaining = ref(props.retryAfter)
const online = ref(false)
const untilText = ref('')

function formatUntil() {
  if (props.until === undefined) return ''
  const date = new Date(props.until)
  if (Number.isNaN(date.getTime())) return ''
  const today = date.toDateString() === new Date().toDateString()
  const text = new Intl.DateTimeFormat(activeLang.value, {
    dateStyle: today ? undefined : 'long',
    timeStyle: 'short',
  }).format(date)
  return ui.value.until(text, today)
}

function goBack() {
  window.history.back()
}

function retry() {
  if (instance?.vnode.props?.onRetry) emit('retry')
  else window.location.reload()
}

let timer: ReturnType<typeof setInterval> | undefined
let reloadTimer: ReturnType<typeof setTimeout> | undefined

function onOnline() {
  online.value = true
  reloadTimer = setTimeout(retry, 900)
}

onMounted(() => {
  canGoBack.value = window.history.length > 1
  untilText.value = formatUntil()
  if (remaining.value > 0) {
    timer = setInterval(() => {
      remaining.value -= 1
      if (remaining.value <= 0) clearInterval(timer)
    }, 1000)
  }
  if (props.kind === 'offline') window.addEventListener('online', onOnline)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  clearTimeout(reloadTimer)
  window.removeEventListener('online', onOnline)
})

const codeBox = useTemplateRef<HTMLElement>('codeBox')
let frame = 0

// The lit copy of the code follows the pointer. Touch screens keep the idle drift.
function onPointerMove(event: PointerEvent) {
  const box = codeBox.value
  if (!box || event.pointerType !== 'mouse') return
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    const bounds = box.getBoundingClientRect()
    box.style.setProperty('--wi-spot-x', `${event.clientX - bounds.left}px`)
    box.style.setProperty('--wi-spot-y', `${event.clientY - bounds.top}px`)
    box.dataset.active = 'true'
  })
}

function onPointerLeave() {
  cancelAnimationFrame(frame)
  if (codeBox.value) delete codeBox.value.dataset.active
}

const stars = [
  [8, 14, 2, 0],
  [17, 62, 1, 2.1],
  [24, 28, 1.5, 0.7],
  [33, 8, 1, 3.4],
  [41, 71, 2, 1.2],
  [52, 18, 1, 2.6],
  [61, 80, 1.5, 0.3],
  [69, 10, 2, 1.8],
  [77, 36, 1, 3.1],
  [84, 66, 1.5, 0.9],
  [91, 22, 2, 2.3],
  [95, 78, 1, 1.5],
  [12, 86, 1, 2.8],
  [47, 44, 1, 0.5],
  [73, 54, 1, 3.7],
] as const

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <component
    :is="as"
    class="wi-status"
    :class="fullscreen ? 'wi-status--full' : 'wi-status--inline'"
    :data-kind="kind"
    :data-accent="meta.accent"
    :aria-labelledby="headingId"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="wi-status__backdrop" aria-hidden="true">
      <div class="wi-status__glow" />
      <div class="wi-status__floor" />
      <span
        v-for="([x, y, size, delay], index) in stars"
        :key="index"
        class="wi-status__star"
        :style="{ left: `${x}%`, top: `${y}%`, '--size': `${size}px`, '--delay': `${delay}s` }"
      />
    </div>

    <div
      v-if="chrome"
      class="wi-glass wi-glass--pill wi-status__chrome absolute right-3 top-3 z-20 p-1 sm:right-4 sm:top-4"
    >
      <WColorModeButton :label="ui.theme" />
    </div>

    <div class="wi-status__body">
      <div class="wi-enter" style="--wi-enter-step: 0">
        <UBadge
          :icon="meta.icon"
          :label="eyebrow"
          :color="meta.accent"
          variant="subtle"
          class="font-mono text-xs uppercase tracking-[0.18em]"
        />
      </div>

      <div ref="codeBox" class="wi-status__code" aria-hidden="true">
        <span class="wi-status__glyphs wi-status__glyphs--base">
          <UIcon :name="meta.hero" class="wi-status__icon wi-enter" style="--wi-enter-step: 1" />
          <i v-if="kind === 'not-found'" class="wi-status__moon" />
        </span>
        <span class="wi-status__glyphs wi-status__glyphs--lit">
          <UIcon :name="meta.hero" class="wi-status__icon wi-enter" style="--wi-enter-step: 1" />
        </span>
        <span class="wi-status__scan" />
      </div>

      <div class="wi-status__text">
        <h1
          :id="headingId"
          class="wi-enter text-balance text-3xl font-semibold tracking-tight text-highlighted sm:text-4xl"
          style="--wi-enter-step: 4"
        >
          {{ title ?? strings.title }}
        </h1>
        <p
          class="wi-enter max-w-md text-pretty text-base leading-7 text-muted sm:text-lg"
          style="--wi-enter-step: 5"
        >
          {{ description ?? strings.description }}
        </p>
      </div>

      <div
        v-if="detail || kind === 'maintenance' || untilText || online"
        class="wi-enter flex w-full flex-col items-center gap-3"
        style="--wi-enter-step: 6"
      >
        <p
          v-if="detail"
          class="wi-glass wi-glass--clear flex max-w-full items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-toned"
          :title="`${ui.requested} : ${detail}`"
        >
          <UIcon name="i-ri-map-pin-line" class="size-3.5 shrink-0 text-(--wi-accent)" />
          <span class="sr-only">{{ ui.requested }} :</span>
          <span class="truncate">{{ detail }}</span>
        </p>
        <UProgress
          v-if="kind === 'maintenance'"
          animation="carousel"
          size="xs"
          :color="meta.accent"
          class="w-56"
          aria-hidden="true"
        />
        <p v-if="untilText" class="font-mono text-xs text-muted">{{ untilText }}</p>
        <p v-if="online" class="font-mono text-xs text-success" role="status">
          {{ ui.backOnline }}
        </p>
      </div>

      <div class="wi-enter w-full" style="--wi-enter-step: 7">
        <slot />
        <slot name="actions">
          <div class="flex flex-col items-stretch justify-center gap-2 sm:flex-row">
            <UButton
              v-if="showRetry"
              :label="remaining > 0 ? ui.retryIn(remaining) : ui.retry"
              :disabled="remaining > 0"
              icon="i-ri-refresh-line"
              size="lg"
              variant="solid"
              :color="buttonColor"
              @click="retry"
            />
            <UButton
              v-if="showHome"
              :label="ui.home"
              :to="homeTo"
              icon="i-ri-home-4-line"
              size="lg"
              :variant="showRetry ? 'subtle' : 'solid'"
              :color="buttonColor"
              @click="emit('home', $event)"
            />
            <UButton
              v-if="wantsBack && canGoBack"
              :label="ui.back"
              icon="i-ri-arrow-left-line"
              size="lg"
              variant="subtle"
              :color="buttonColor"
              @click="goBack"
            />
          </div>
        </slot>
      </div>
    </div>
  </component>
</template>
