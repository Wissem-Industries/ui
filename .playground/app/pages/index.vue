<script setup lang="ts">
const name = ref('')
const message = ref('')
const motionKey = ref(0)

const surfaces = [
  { token: 'bg', label: 'Page', class: 'bg-default' },
  { token: 'bg-muted', label: 'Recessed', class: 'bg-muted' },
  { token: 'bg-elevated', label: 'Elevated', class: 'bg-elevated' },
  { token: 'bg-accented', label: 'Accented', class: 'bg-accented' },
]

const radii = [
  { label: 'Control', hint: 'rounded-md', class: 'rounded-md' },
  { label: 'Card', hint: 'rounded-xl', class: 'rounded-xl' },
  { label: 'Panel', hint: 'rounded-2xl', class: 'rounded-2xl' },
  { label: 'Pill', hint: 'rounded-full', class: 'rounded-full' },
]

const durations = ['instant', 'fast', 'base', 'slow', 'slower']
const eases = ['standard', 'out', 'in-out', 'spring']
const colors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
  'neutral',
] as const
</script>

<template>
  <UContainer class="pb-24">
    <header class="max-w-3xl space-y-3 py-16">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        Design system
      </p>
      <h1 class="text-5xl font-semibold tracking-[-0.05em] text-highlighted">
        Foundations
      </h1>
      <p class="text-lg leading-8 text-muted">
        Surfaces, radii, motion and shared components of Wissem UI. This page
        is the reference used to review the layer in light and dark mode before
        a release.
      </p>
    </header>

    <ShowcaseSection
      id="surfaces"
      title="Surfaces"
      description="Four steps from the page outwards. Cards sit visibly above the page instead of relying on their border."
    >
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="surface in surfaces"
          :key="surface.token"
          class="space-y-1 rounded-xl p-5 ring ring-default"
          :class="surface.class"
        >
          <p class="text-sm font-medium text-highlighted">{{ surface.label }}</p>
          <p class="font-mono text-xs text-muted">{{ surface.token }}</p>
        </div>
      </div>
      <UCard>
        <p class="text-sm text-muted">
          A card on the page background: the surface, not only the border,
          separates it from the page.
        </p>
      </UCard>
    </ShowcaseSection>

    <ShowcaseSection
      id="colors"
      title="Colors"
      description="Violet is the brand color. In light mode it uses the 600 step, which keeps 4.5:1 for text on the page."
    >
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="color in colors"
          :key="color"
          :label="color"
          :color="color"
          variant="subtle"
        />
      </div>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="color in colors"
          :key="color"
          :label="color"
          :color="color"
          variant="solid"
        />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="radii"
      title="Radii"
      description="Concentric steps: an element inside a padded parent uses the step below its parent's."
    >
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="radius in radii"
          :key="radius.label"
          class="flex h-28 flex-col items-center justify-center gap-1 bg-elevated ring ring-default"
          :class="radius.class"
        >
          <p class="text-sm font-medium text-highlighted">{{ radius.label }}</p>
          <p class="font-mono text-xs text-muted">{{ radius.hint }}</p>
        </div>
      </div>
      <div class="rounded-2xl bg-elevated p-3 ring ring-default">
        <div class="rounded-xl bg-muted p-3">
          <div class="rounded-md bg-default p-3 text-sm text-muted ring ring-default">
            Panel, card and control nested with matching corners.
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      id="motion"
      title="Motion"
      description="Duration and easing tokens. Everything collapses to near-zero when the visitor prefers reduced motion."
    >
      <div class="space-y-6">
        <div class="space-y-3">
          <p class="font-mono text-xs uppercase tracking-widest text-muted">
            Durations
          </p>
          <div
            v-for="duration in durations"
            :key="`${duration}-${motionKey}`"
            class="flex items-center gap-4"
          >
            <span class="w-20 font-mono text-xs text-muted">{{ duration }}</span>
            <div class="h-2 flex-1 rounded-full bg-muted">
              <div
                class="demo-bar h-2 rounded-full bg-primary"
                :style="{ '--demo-duration': `var(--wi-duration-${duration})` }"
              />
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <p class="font-mono text-xs uppercase tracking-widest text-muted">
            Easings
          </p>
          <div
            v-for="ease in eases"
            :key="`${ease}-${motionKey}`"
            class="flex items-center gap-4"
          >
            <span class="w-20 font-mono text-xs text-muted">{{ ease }}</span>
            <div class="relative h-8 flex-1 rounded-full bg-muted">
              <div
                class="demo-dot absolute left-0 size-8 rounded-full bg-primary"
                :style="{ '--demo-ease': `var(--wi-ease-${ease})` }"
              />
            </div>
          </div>
        </div>

        <UButton
          label="Replay"
          icon="i-ri-restart-line"
          color="neutral"
          variant="outline"
          size="sm"
          @click="motionKey++"
        />
      </div>
    </ShowcaseSection>

    <ShowcaseSection id="components" title="Components">
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
              <UButton label="Secondary action" variant="outline" />
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
  </UContainer>
</template>

<style scoped>
.demo-bar {
  width: 0;
  animation: demo-fill var(--demo-duration) var(--wi-ease-standard) forwards;
  animation-delay: 150ms;
}

.demo-dot {
  animation: demo-slide 1.2s var(--demo-ease) forwards;
  animation-delay: 150ms;
}

@keyframes demo-fill {
  to {
    width: 100%;
  }
}

@keyframes demo-slide {
  to {
    left: calc(100% - 2rem);
  }
}
</style>
