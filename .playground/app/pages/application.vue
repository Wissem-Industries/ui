<script setup lang="ts">
import type { WAction } from '../../../app/components/WActionBar.vue'
import type { WTone } from '../../../app/utils/wi-app'

const view = ref('todo')
const search = ref('')
const open = ref(false)
const sort = ref('score')
const tones: WTone[] = ['primary', 'success', 'warning', 'error', 'info', 'neutral']

const tiles = [
  {
    label: 'To sort',
    value: 12,
    icon: 'i-ri-inbox-2-line',
    to: '/application',
    hint: '3 new in 24 h',
  },
  { label: 'To review', value: 2, icon: 'i-ri-file-search-line', to: '/application' },
  { label: 'To send', value: 0, icon: 'i-ri-send-plane-line', hint: 'Nothing waits' },
  { label: 'Sources down', value: 1, tone: 'error' as const, hint: 'Since 10 min' },
]

const actions: WAction[] = [
  {
    key: 'keep',
    label: 'Keep',
    icon: 'i-ri-check-line',
    color: 'primary',
    variant: 'solid',
    onClick: () => {},
  },
  {
    key: 'discard',
    label: 'Discard',
    icon: 'i-ri-close-line',
    color: 'neutral',
    variant: 'outline',
    onClick: () => {},
  },
]
</script>

<template>
  <UContainer class="space-y-10 pb-24 pt-16">
    <WPageHeader
      eyebrow="Application"
      title="Application building blocks"
      description="Header, figures, filters, pills, sections, action bar, empty states and sign-in screen shared by the private applications."
    >
      <UButton icon="i-ri-refresh-line" color="neutral" variant="outline" label="Refresh" />
    </WPageHeader>

    <WStatTiles :items="tiles" label="To do" />

    <WFilterBar v-model:search="search" v-model:open="open" placeholder="Title, employer, city" :active="sort === 'score' ? 0 : 1" @reset="sort = 'score'; search = ''">
      <template #leading>
        <WSegmented
          v-model="view"
          label="View"
          :items="[
            { label: 'To sort', value: 'todo', icon: 'i-ri-inbox-2-line' },
            { label: 'All', value: 'all', icon: 'i-ri-stack-line' },
          ]"
        />
      </template>
      <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
        <USelect
          v-model="sort"
          :items="[
            { label: 'Best score', value: 'score' },
            { label: 'Newest', value: 'recent' },
          ]"
          aria-label="Sort"
          class="w-full"
        />
      </div>
    </WFilterBar>

    <div class="flex flex-wrap gap-2">
      <WPill v-for="t in tones" :key="t" :label="t" :tone="t" />
      <WPill label="With icon" tone="success" icon="i-ri-check-double-line" />
      <WPill label="Quiet" quiet />
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <WSection id="demo-section" title="Section" icon="i-ri-file-text-line">
        <template #action>
          <UButton label="Edit" size="xs" color="neutral" variant="ghost" />
        </template>
        <p class="text-sm text-muted">Block of a detail page.</p>
        <div class="mt-5 border-t border-default/70 pt-5">
          <WActionBar :actions="actions" label="Actions" />
        </div>
      </WSection>
      <div class="space-y-6">
        <WEmptyState icon="i-ri-checkbox-circle-line" title="All sorted" description="New items appear here after each collection." />
        <WEmptyState error icon="i-ri-cloud-off-line" title="Loading failed" description="The server answered with an error (500).">
          <UButton label="Retry" icon="i-ri-refresh-line" />
        </WEmptyState>
      </div>
    </div>

    <div class="flex min-h-96 flex-col overflow-hidden rounded-2xl ring ring-default/70">
      <WAuthGate title="Stages" icon="i-ri-briefcase-line" />
    </div>
  </UContainer>
</template>
