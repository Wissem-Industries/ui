<script setup lang="ts">
const toast = useToast()
const modalOpen = ref(false)
const slideoverOpen = ref(false)
const menu = [
  [
    { label: 'Profile', icon: 'i-ri-user-line' },
    { label: 'Settings', icon: 'i-ri-settings-3-line' },
  ],
  [{ label: 'Sign out', icon: 'i-ri-logout-box-r-line' }],
]
const levels = [
  {
    name: 'Clear',
    hint: 'Small controls over an image',
    class: 'wi-glass--clear',
  },
  { name: 'Regular', hint: 'Bars and menus', class: '' },
  { name: 'Thick', hint: 'Dialogs and forms', class: 'wi-glass--thick' },
]

function showToast() {
  toast.add({
    title: 'Saved',
    description: 'Toasts use the regular material.',
    icon: 'i-ri-checkbox-circle-line',
  })
}
</script>

<template>
  <UContainer class="pb-24">
    <header class="max-w-3xl space-y-3 py-16">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">Material</p>
      <h1 class="text-5xl font-semibold tracking-[-0.05em] text-highlighted">Liquid Glass</h1>
      <p class="text-lg leading-8 text-muted">
        A translucent material for the layers that float above the content:
        navigation, menus, dialogs and toasts. It blurs and saturates what is
        behind it and catches light on its edge. It falls back to an opaque
        surface for visitors who ask for reduced transparency or more contrast.
      </p>
    </header>

    <ShowcaseSection
      id="levels"
      title="Three levels"
      description="Shown over a colorful backdrop, where the blur has something to work on."
    >
      <div class="relative isolate overflow-hidden rounded-2xl p-6 sm:p-10">
        <ShowcaseBackdrop />
        <div class="grid gap-5 sm:grid-cols-3">
          <div
            v-for="level in levels"
            :key="level.name"
            class="wi-glass rounded-2xl p-6"
            :class="level.class"
          >
            <p class="text-lg font-semibold text-highlighted">{{ level.name }}</p>
            <p class="mt-1 text-sm text-default">{{ level.hint }}</p>
            <p class="mt-4 text-xs text-muted">Muted text stays readable.</p>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="before-after"
      title="Before and after"
      description="The previous surface against the new material, on a plain page and over a backdrop."
    >
      <div class="grid gap-5 lg:grid-cols-2">
        <div v-for="kind in ['plain', 'backdrop']" :key="kind" class="relative isolate overflow-hidden rounded-2xl p-6">
          <ShowcaseBackdrop v-if="kind === 'backdrop'" />
          <p v-else class="sr-only">Plain page background</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="legacy-glass rounded-xl p-5">
              <p class="text-sm font-semibold text-highlighted">Before</p>
              <p class="mt-1 text-xs text-muted">18 px blur, 58% opacity.</p>
            </div>
            <div class="wi-glass rounded-xl p-5">
              <p class="text-sm font-semibold text-highlighted">After</p>
              <p class="mt-1 text-xs text-muted">Blur, saturation, rim light.</p>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="floating"
      title="Floating layers"
      description="Menus, popovers, tooltips, dialogs and toasts pick the material up through the layer configuration, with no wrapper."
    >
      <div class="relative isolate overflow-hidden rounded-2xl p-6 sm:p-10">
        <ShowcaseBackdrop />
        <div class="flex flex-wrap items-center gap-3">
          <UDropdownMenu :items="menu">
            <UButton label="Menu" icon="i-ri-menu-line" color="neutral" variant="solid" />
          </UDropdownMenu>
          <UPopover>
            <UButton label="Popover" icon="i-ri-chat-1-line" color="neutral" variant="solid" />
            <template #content>
              <div class="w-64 space-y-1 p-4">
                <p class="text-sm font-semibold text-highlighted">Popover</p>
                <p class="text-sm text-muted">Same material, regular level.</p>
              </div>
            </template>
          </UPopover>
          <UTooltip text="Clear level, short and quiet">
            <UButton label="Tooltip" icon="i-ri-information-line" color="neutral" variant="solid" />
          </UTooltip>
          <UButton label="Modal" icon="i-ri-window-line" color="neutral" variant="solid" @click="modalOpen = true" />
          <UButton label="Slideover" icon="i-ri-layout-right-line" color="neutral" variant="solid" @click="slideoverOpen = true" />
          <UButton label="Toast" icon="i-ri-notification-3-line" color="neutral" variant="solid" @click="showToast" />
        </div>
      </div>

      <UModal v-model:open="modalOpen" title="Thick material" description="Dialogs hold forms, so they are the most opaque level.">
        <template #body>
          <UFormField label="Name">
            <UInput class="w-full" placeholder="Type something..." />
          </UFormField>
        </template>
      </UModal>
      <USlideover v-model:open="slideoverOpen" title="Slideover" description="Same thick material.">
        <template #body>
          <p class="text-sm text-muted">Content of the panel.</p>
        </template>
      </USlideover>
    </ShowcaseSection>

    <ShowcaseSection
      id="featured"
      title="Featured card"
      description="Cards in a list stay flat. Only a featured card gets real glass, over an ambient halo drawn from its own image."
    >
      <div class="grid gap-8 md:grid-cols-2">
        <WAmbient src="/cover.svg" :intensity="0.35">
          <WGlassCard class="h-full">
            <div class="space-y-3">
              <img src="/cover.svg" alt="" width="64" height="64" class="size-16 rounded-xl">
              <h3 class="text-lg font-semibold text-highlighted">Featured project</h3>
              <p class="text-sm leading-6 text-muted">
                The halo takes its colors from the cover and follows the pointer
                on hover. The card itself blurs it.
              </p>
            </div>
          </WGlassCard>
        </WAmbient>
        <WAmbient>
          <WGlassCard :halo="false" class="h-full">
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-highlighted">Without an image</h3>
              <p class="text-sm leading-6 text-muted">
                With no image, the ambient layer uses the primary color.
              </p>
            </div>
          </WGlassCard>
        </WAmbient>
      </div>
    </ShowcaseSection>
  </UContainer>
</template>

<style scoped>
.legacy-glass {
  border: 1px solid color-mix(in srgb, var(--ui-border) 38%, transparent);
  background: color-mix(in srgb, var(--ui-bg-elevated) 58%, transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, white 7%, transparent),
    0 12px 32px color-mix(in srgb, black 12%, transparent);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
  backdrop-filter: blur(18px) saturate(120%);
}
</style>
