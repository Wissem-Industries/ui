<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <UApp>
    <header class="border-b border-default">
      <UContainer class="flex h-16 items-center justify-between gap-4">
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-highlighted">
          <img src="/favicon.ico" alt="" width="20" height="20">
          Wissem UI
        </NuxtLink>
        <div class="flex items-center gap-1">
          <UButton
            to="/"
            label="Foundations"
            color="neutral"
            variant="ghost"
            size="sm"
          />
          <UButton
            :icon="isDark ? 'i-ri-sun-line' : 'i-ri-moon-line'"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="toggleColorMode"
          />
        </div>
      </UContainer>
    </header>
    <NuxtPage />
  </UApp>
</template>
