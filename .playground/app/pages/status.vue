<script setup lang="ts">
import type { WStatusKind } from '../../../app/utils/wi-status'

const kinds: { value: WStatusKind; label: string }[] = [
  { value: 'not-found', label: '404' },
  { value: 'unauthorized', label: '401' },
  { value: 'forbidden', label: '403' },
  { value: 'too-many-requests', label: '429' },
  { value: 'server-error', label: '500' },
  { value: 'maintenance', label: '503' },
  { value: 'offline', label: 'Offline' },
  { value: 'coming-soon', label: 'Soon' },
]

const route = useRoute()
const initial = kinds.find((item) => item.value === route.query.kind)
const kind = ref<WStatusKind>(initial?.value ?? 'not-found')
const locale = ref<'fr' | 'en'>(route.query.lang === 'en' ? 'en' : 'fr')
const until = new Date(Date.now() + 1000 * 60 * 42)

function fail(statusCode: number) {
  showError({ statusCode })
}
</script>

<template>
  <UContainer class="pb-24">
    <header class="max-w-3xl space-y-3 py-16">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">Pages</p>
      <h1 class="text-5xl font-semibold tracking-[-0.05em] text-highlighted">Status screens</h1>
      <p class="text-lg leading-8 text-muted">
        <code>WStatusPage</code> and the layer's <code>error.vue</code>. Move the pointer over the
        code.
      </p>
    </header>

    <div class="mb-6 flex flex-wrap items-center gap-3">
      <UTabs
        v-model="kind"
        :items="kinds.map((item) => ({ label: item.label, value: item.value }))"
        :content="false"
        size="sm"
        class="w-auto"
      />
      <USelect
        v-model="locale"
        :items="['fr', 'en']"
        class="w-24"
        aria-label="Language of the screen"
      />
    </div>

    <WStatusPage
      :key="`${kind}-${locale}`"
      as="section"
      :kind="kind"
      :locale="locale"
      :fullscreen="false"
      :chrome="false"
      :detail="kind === 'not-found' ? '/projects/missing-page' : undefined"
      :until="kind === 'maintenance' ? until : undefined"
      :retry-after="kind === 'too-many-requests' ? 8 : 0"
    />

    <section class="mt-10 space-y-3">
      <h2 class="text-xl font-semibold text-highlighted">Real error page</h2>
      <p class="text-muted">
        These replace the whole app, like an error thrown by a page. Use the link in the screen to
        come back.
      </p>
      <div class="flex flex-wrap gap-2">
        <UButton label="Missing route" to="/this-page-does-not-exist" color="neutral" variant="outline" />
        <UButton label="Throw 403" color="neutral" variant="outline" @click="fail(403)" />
        <UButton label="Throw 500" color="neutral" variant="outline" @click="fail(500)" />
        <UButton label="Throw 503" color="neutral" variant="outline" @click="fail(503)" />
      </div>
    </section>
  </UContainer>
</template>
