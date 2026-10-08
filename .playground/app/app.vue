<script setup lang="ts">
const items = [
  { label: 'Foundations', to: '/', icon: 'i-ri-palette-line' },
  { label: 'Glass', to: '/glass', icon: 'i-ri-drop-line' },
  { label: 'Components', to: '/components', icon: 'i-ri-layout-grid-line' },
  { label: 'Status', to: '/status', icon: 'i-ri-error-warning-line' },
]

const locales = [
  { code: 'en', label: 'English', icon: 'i-circle-flags-gb' },
  { code: 'fr', label: 'Français', icon: 'i-circle-flags-fr' },
]
const locale = ref('en')
</script>

<template>
  <UApp>
    <WNavbar :items="items" label="Primary navigation">
      <template #trailing>
        <WLocaleSelect
          :locales="locales"
          :current="locale"
          label="Language"
          @select="locale = $event"
        />
        <WColorModeButton label="Toggle color mode" />
      </template>
    </WNavbar>
    <main class="relative overflow-hidden pb-12 pt-24 sm:pt-20">
      <WGridBackground />
      <div class="relative">
        <NuxtPage />
      </div>
    </main>
  </UApp>
</template>
