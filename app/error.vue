<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const route = useRoute()
const kind = computed(() => wiStatusKind(props.error.statusCode))
const showsPath = computed(() => ['not-found', 'forbidden', 'unauthorized'].includes(kind.value))

// An application with @nuxtjs/i18n gets its prefixed home page.
const localePath = Reflect.get(useNuxtApp(), '$localePath')
const homeTo = typeof localePath === 'function' ? String(localePath('/')) : '/'

const code = computed(() => props.error.statusCode)
const locale = useWiStatusLocale()
const strings = computed(() => wiStatusCopy(kind.value, locale.value))

useHead({ title: () => `${code.value} · ${strings.value.eyebrow}` })
useSeoMeta({ robots: 'noindex, nofollow' })

function goHome(event: MouseEvent) {
  event.preventDefault()
  clearError({ redirect: homeTo })
}
</script>

<template>
  <UApp>
    <WStatusPage
      :kind="kind"
      :code="code"
      :detail="showsPath ? route.path : undefined"
      :home-to="homeTo"
      @home="goHome"
    />
  </UApp>
</template>
