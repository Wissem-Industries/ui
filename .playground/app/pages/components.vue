<script setup lang="ts">
const name = ref('')
const message = ref('')
const choice = ref('Nuxt')
const accepted = ref(true)
const copy = ref(false)
const notify = ref(true)
const view = ref('list')
</script>

<template>
  <UContainer class="pb-24">
    <header class="max-w-3xl space-y-3 py-16">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">Library</p>
      <h1 class="text-5xl font-semibold tracking-[-0.05em] text-highlighted">Components</h1>
      <p class="text-lg leading-8 text-muted">
        Nuxt UI components with the Wissem defaults.
      </p>
    </header>

    <ShowcaseSection id="base" title="Base">
      <div class="grid gap-6 lg:grid-cols-2">
        <UCard>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <UBadge label="Default" />
              <UBadge label="Neutral" color="neutral" />
              <UBadge label="Outline" color="neutral" variant="outline" />
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <UButton label="Primary action" />
              <UButton label="Secondary action" color="secondary" />
              <UButton label="Outline" color="neutral" variant="outline" />
              <UButton label="Ghost action" color="neutral" variant="ghost" />
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <UButton icon="i-ri-arrow-right-line" trailing label="With icon" />
              <UButton icon="i-ri-github-line" color="neutral" variant="outline" aria-label="GitHub" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="space-y-4">
            <UFormField label="Example input">
              <UInput v-model="name" class="w-full" placeholder="Type something..." />
            </UFormField>
            <UFormField label="Example message">
              <UTextarea v-model="message" class="w-full" placeholder="Write a message..." />
            </UFormField>
          </div>
        </UCard>
      </div>
    </ShowcaseSection>

    <ShowcaseSection id="controls" title="Form controls">
      <UCard>
        <div class="grid gap-6 sm:grid-cols-2">
          <div class="space-y-3">
            <UCheckbox v-model="accepted" label="Checked" />
            <UCheckbox v-model="copy" label="Unchecked" />
            <USwitch v-model="notify" label="Notifications" />
          </div>
          <div class="space-y-4">
            <URadioGroup
              v-model="view"
              :items="[{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }]"
            />
            <UProgress :model-value="72" />
            <UProgress :model-value="35" size="sm" />
          </div>
        </div>
      </UCard>
    </ShowcaseSection>
  </UContainer>
</template>
